"use client"
import { useCart } from '@/context/CartContext';
import { addToCart } from '@/services/cart.service';
import {LoaderCircle } from 'lucide-react';
import React, { useTransition } from 'react'
import { toast } from 'sonner';


export default function AddToCartBtn({productId, ...props}: {productId: string;
    [key: string]: string;
} & {
    
}) {
  const [isPending, startTransition] =  useTransition()
const {getCartDetails} = useCart()
        async function addProductToCart(productId: string) {
          startTransition(async () => {
                    const res = await addToCart(productId);

        if(res?.success) {
            toast.success(res.message,{position: "top-center"});
            getCartDetails();
        }else {
            toast.error(res.message,{position: "top-center"});
        }
          })
        
    }
  return (
    <button disabled={isPending} onClick={() => addProductToCart(productId)} {...props} >{isPending ? <LoaderCircle className='animate-spin'/> : "Add to cart"}</button>
  )
}
