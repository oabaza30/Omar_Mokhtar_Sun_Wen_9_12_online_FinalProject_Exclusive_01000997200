"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addressFormSchema, addressFormState, addressFormType } from "@/app/schema/address.schema";
import { handlePayment } from "@/services/order.service";
import { useCart } from "@/context/CartContext";
import visa from "@/assets/images/visa.png";
import mastercard from "@/assets/images/mastercard.png";
import amex from "@/assets/images/amex.png";
import paypal from "@/assets/images/paypal.png";




export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();
  const [action, formAction] = useActionState(handlePayment, addressFormState);
  const router = useRouter();

  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      streetaddress: "",
      apartment: "",
      email: "",
      city: "",
      Phone: "",
      paymentMethod: "cash",
      cartId: "",

    },
  });

  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);


  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (form.getValues("paymentMethod") === "cash" && action.message) {
        if (form.getValues("paymentMethod") === "cash") {
          toast.success(action.message, { position: "top-center" });
          setCartDetails(null);
          timeout = setTimeout(() => router.push(action.callbackUrl ||"/allorders"), 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }

      } else if (!action.success && action.message) {
        toast.error(action.message, { position: "top-center" });

      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };


  }, [action, router, setCartDetails, form]);



  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg overflow-hidden shadow-lg">
        {/* Left Side - Image */}
        <div className="p-6 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Billing Details</h1>
          <p className="text-sm text-gray-700 mb-6">Enter your Address details below</p>

          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="cartId"
                render={({ field }) => (
                  <FormItem hidden>
                    <FormControl>
                      <Input {...field} value={cartDetails?.cartId} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.firstname?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.lastname?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetaddress"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder=" Street Address" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.streetaddress?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="Apartment, floor, etc. (optional)" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.apartment?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="Town / City" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.city?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="Phone Number " type="tel" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.Phone?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="h-12 bg-gray-100 border-2 border-gray-200 focus:border-blue-300" placeholder="Email Address" {...field} />
                    </FormControl>
                    <FormMessage>
                      {action.error?.email?.[0]}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="w-full">
              </div>
            </form>
          </Form>
        </div>


        {/* Right Side - Form */}
<div className="md:pl-8 flex justify-center items-center flex-col">
  <div className="relative w-full md:h-auto hidden md:block justify-center items-center">
    {cartDetails?.data.products.map((product) => (
      <div key={product._id} className="flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <Image
            src={product.product.imageCover}
            alt={product.product.title}
            width={60}
            height={60}
            className="object-cover rounded"
          />
          <span className="text-sm">
            {product.product.title} x {product.count}
          </span>
        </div>
        <span className="text-sm font-medium">
          {product.price * product.count}
        </span>
      </div>
    ))}
    <hr className="border-gray-300 my-3" />
    <div className="flex justify-between text-sm py-1">
      <span>Subtotal:</span>
      <span>{cartDetails?.data.totalCartPrice || 0}</span>
    </div>
    <div className="flex justify-between text-sm py-1">
      <span>Shipping:</span>
      <span className="font-medium text-green-600">Free</span>
    </div>
    <hr className="border-gray-300 my-3" />
    <div className="flex justify-between text-base font-semibold py-1">
      <span>Total:</span>
      <span>{cartDetails?.data.totalCartPrice || 0}</span>
    </div>
  </div>

  <div className="w-full mt-6">
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-lg font-semibold">Payment Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={"cash"}
                  name={field.name}
                  className="space-y-4"
                >
                  <FormItem className="flex items-center justify-between">
                    <RadioGroupItem value="bank" id="bank" className="h-4 w-4" />
                    <FormLabel htmlFor="bank" className="w-full font-normal ">
                      <div className="flex items-center justify-between w-full">
                        <span>Bank</span>
                        <div className="flex items-center gap-4">
                          <Image src={visa} alt="Visa" width={35} height={20} />
                          <Image src={mastercard} alt="Mastercard" width={35} height={20} />
                          <Image src={amex} alt="Amex" width={35} height={20} />
                          <Image src={paypal} alt="Paypal" width={35} height={20} />
                        </div>
                      </div>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center gap-3">
                    <FormControl>
                      <RadioGroupItem value="cash" className="h-4 w-4" />
                    </FormControl>
                    <FormLabel className="font-normal">Cash on delivery</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="flex gap-2">
          <Input
            placeholder="Coupon Code"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-5"
          >
            Apply Coupon
          </Button>
        </FormItem>

        <div>
          <Button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 text-sm font-medium"
          >
            Place Order
          </Button>
        </div>
      </form>
    </Form>
  </div>
</div>


      </div>
    </section>
  )
}




