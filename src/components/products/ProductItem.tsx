import React from 'react'
import Image from 'next/image';
import { Star } from 'lucide-react';
import { IProduct } from '@/interface/product.interface';
import Link from 'next/link';
import AddToCartBtn from './AddToCartBtn';
export default function Productltem({ product }: { product: IProduct }) {
    return (
        <div>
            <picture className='relative group overflow-hidden'>
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        width={1920}
                        height={344}
                        loading='lazy'
                        className='w-full h-[15.625rem] object-contain bg-gray-100 mb-4'
                    />
                </Link>
                <AddToCartBtn productId={product._id} className='bg-black text-white rounded-md h-8 cursor-pointer w-full absolute bottom-0 translate-y-full group-hover:translate-y-0 invisible group-hover:visible group-hover:delay-150 group-hover:duration-200' />
            </picture>
            <h3 className='font-medium mb-2 line-clamp-1'>
                <Link href={`/products/${product.id}`}>{product.title}</Link>
            </h3>
            <div className="flex items-center gap-x-4">
                <span className='font-medium text-red-500'>{product.price} EGP</span>
                <div className='flex items-center gap-x-1'>
                    <Star className=' text-yellow-400 fill-yellow-400' />
                    <span className='text-sm font-semibold text-gray-500'>
                        {product.ratingsAverage}
                    </span>
                </div>
            </div>
        </div>
    )
}
