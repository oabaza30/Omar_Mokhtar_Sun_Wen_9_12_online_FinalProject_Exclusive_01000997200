"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { removeFromCart, removeUseCart, updateQtyProductCart } from '@/services/cart.service'
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { toast } from 'sonner'

export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();


  async function removeCartItems() {
    const res = await removeUseCart();
    if (res?.message === "Success") {
      toast.success("Cart removed successfully", {
        position: "top-center",
      });
      setCartDetails(null);
    } else {
      toast.error(res?.message || "Something went wrong", {
        position: "top-center",
      });
    }
  }

  async function removeProductFromCart(productId: string) {
    const res = await removeFromCart(productId);

    if (res.success) {
      toast.success(res.message, { position: "top-center" });

    } else {
      toast.error(res.message, { position: "top-center" });
    }

  }

async function updateQuantityProductCart(productId: string, count: number) {
    const res = await updateQtyProductCart(productId, count);
    if (res.success) {
      toast.success(res.message, { position: "top-center" });
    } else {
      toast.error(res.message, { position: "top-center" });
    }
}


  return (
    <section className="py-20">
      <div className="container mx-auto">
        {cartDetails && cartDetails.data.products.length > 0 ? (
          <>
            <section className='mb-20'>
              <Table className='mb-6 '>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    cartDetails.data.products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell className="font-medium">
                          <div className=" flex items-center gap-x-5 relative">
                            <div className="relative">
                              <Badge
                                onClick={() => removeProductFromCart(product.product._id)}
                                className="absolute cursor-pointer -top-2 -end-2 h-5 min-w-5 rounded-full px-1 font-mono font-semibold text-sm tabular-nums"
                                variant="destructive"
                              >
                                <X />
                              </Badge>
                              <Image
                                src={product.product.imageCover}
                                alt={product.product.title}
                                width={54}
                                height={54}
                                className="object-contain bg-gray-100 mb-4"
                              />
                            </div>

                            <h2>{product.product.title}</h2>
                          </div>
                        </TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <Button size={"sm"} variant={'outline'} className="cursor-pointer" onClick={() => updateQuantityProductCart(product.product._id, product.count - 1)}>-</Button>
                            {product.count}
                            <Button size={"sm"} variant={'outline'} className="cursor-pointer" onClick={() => updateQuantityProductCart(product.product._id, product.count + 1)} >+</Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">${product.price * product.count}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
              <div className="flex justify-between">
                <Button variant={'outline'} className="">
                  <Link href={'/products'}>
                    Return to Shop</Link>
                </Button>
                <Button onClick={removeCartItems} variant={'destructive'} className="cursor-pointer">
                  Remove All
                </Button>
              </div>
            </section>
            <section className='flex justify-between'>
              <div className="flex items-center gap-4 w-4/12 ">
                <Input placeholder='Coupon Code' />
                <Button variant={'destructive'} className='w-1/2'>Apply Coupon</Button>
              </div>
              <div className="w-5/12 py-8 px-6 border border-gray-950 ">
                <h3 className='font-bold mb-6 text-xl'>Cart Total</h3>
                <ul className='divide-y divide-gray-950'>
                  <li className='py-6 flex justify-between'>
                    <span>Total Items:</span> <span>{cartDetails.data.products.reduce((total, product) => total + product.count, 0)}</span>
                  </li>
                  <li className='py-6 flex justify-between'>
                    <span>Shipping</span> <span>Free</span>
                  </li>
                  <li className='py-6 flex justify-between'>
                    <span>Total:</span> <span>{cartDetails.data.totalCartPrice}</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <Button variant={'destructive'} asChild className=''>
                    <Link href={'/checkout'}>Proceed to checkout</Link></Button>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-12">Your cart is empty</h2>
            <Button variant={'outline'} className="">
              <Link href={'/products'}>
                Return to Shop</Link>
            </Button>
          </div>
        )
        }
      </div>
    </section>

  )
}
