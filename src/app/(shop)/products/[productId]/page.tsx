import ProductSlider from '@/components/products/ProductSlider';
import { IProduct } from '@/interface/product.interface';
import { getProductDetails } from '@/services/products.service';
import { Star, Minus, Plus, Heart, Truck, Undo2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from "@/components/ui/separator"
import AddToCartBtn from '@/components/products/AddToCartBtn';

export default async function productDetails({ params: { productId } }: { params: { productId: string } }) {
    const { data: product }: { data: IProduct } = await getProductDetails(productId);


    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <div className='flex items-center gap-1'>
                {Array.from({ length: fullStars }).map((_, i) => (
                    <Star key={`full-${i}`} className='fill-[#FDB241] text-[#FDB241] size-5' />
                ))}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <Star key={`empty-${i}`} className='text-gray-300 size-5' />
                ))}
            </div>
        );
    };

    return (
        <section className='py-20'>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                    <div className="lg:col-span-2">
                        <ProductSlider images={product.images} />
                    </div>

                    {/* RIGHT SIDE INFO */}
                    <div className="product-info h-[600px] flex flex-col justify-between w-[400px]">
                        <div>
                            <h1 className='font-semibold text-2xl mb-2'>{product.title}</h1>
                            <div className='flex items-center gap-4 text-sm mb-4'>
                                {renderStars(product.ratingsAverage)}
                                <span className='text-gray-500'>(150 Reviews)</span>
                                <span className='text-gray-400'>|</span>
                                <span className='text-green-400 font-medium'>In Stock</span>
                            </div>
                            <span className='text-2xl font-medium block mb-4'>{product.price} EGP</span>
                            <p className='text-sm text-gray-700 mb-4'>{product.description}</p>
                            <Separator className='bg-gray-950 mb-6' />

                            <div className="flex items-center gap-6 mb-5">
                                <span className='font-medium'>Colours:</span>
                                <div className="flex items-center gap-3">
                                    <span className="w-2.5 h-2.5 rounded-full border border-black p-[2.5px]">
                                        <span className='block w-full h-full bg-[#D1DCF2] rounded-full' />
                                    </span>
                                    <span className='w-2.5 h-2.5 rounded-full bg-red-500' />
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-6">
                                <span className='font-medium'>Size:</span>
                                <div className='flex gap-3'>
                                    {['XS', 'S', 'M', 'L', 'XL'].map((size, i) => (
                                        <button
                                            key={i}
                                            className={cn(
                                                'w-10 h-8 border border-black/50 rounded-md text-sm font-medium',
                                                size === 'M' && 'bg-red-500 text-white border-none'
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className='flex items-center gap-3 mb-4'>
                                <div className='flex w-[159px] h-[40px] rounded-md overflow-hidden border'>
                                    <button className='flex-1 flex items-center justify-center text-xl'>
                                        <Minus className='w-4 h-4' />
                                    </button>
                                    <div className='flex-1 flex items-center justify-center text-lg font-medium'>2</div>
                                    <button className='flex-1 flex items-center justify-center bg-red-500 text-white'>
                                        <Plus className='w-4 h-4' />
                                    </button>
                                </div>
                                <AddToCartBtn productId={product._id} className='cursor-pointer grow-1 h-[40px] w-[165px] rounded-md bg-red-500 text-white font-medium' />
                                
                                <button className='w-10 h-10 border border-black/50 rounded-md flex items-center justify-center'>
                                    <Heart className='w-5 h-5' />
                                </button>
                            </div>
                        </div>

                        <div className='border border-black/50 rounded-md text-sm'>
                            <div className='flex items-center gap-4 px-4 py-4 border-b border-black/50'>
                                <Truck className='w-6 h-4' />
                                <div>
                                    <h3 className='font-semibold'>Free Delivery</h3>
                                    <p className='underline'>Enter your postal code for Delivery Availability</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-4 px-4 py-4'>
                                <Undo2 className='w-6 h-4' />
                                <div>
                                    <h3 className='font-semibold'>Return Delivery</h3>
                                    <p>
                                        Free 30 Days Delivery Returns.{' '}
                                        <span className='underline cursor-pointer'>Details</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
