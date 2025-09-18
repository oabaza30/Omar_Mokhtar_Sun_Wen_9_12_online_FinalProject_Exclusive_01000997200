"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';
import { ICategory } from '@/interface/category.interface';

const swiperOptions = {
    slidesPerView: 1,
    breakpoints: {
        640: {
            slidesPerView: 2,
            spaceBetween: 5,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 15,
        },
        1280: {
            slidesPerView: 6,
            spaceBetween: 30,
        },
        1600: {
            slidesPerView: 6,
            spaceBetween: 30,
        },
        1920: {
            slidesPerView: 6,
            spaceBetween: 30,
        },
    },
    pagination: {
        clickable: true,
        bulletClass: "swiper-pagination-bullet !size-3 border-2",
        bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 border-white"
    },
    loop: true,
    modules: [Pagination],
};

export default function CategoriesSlider({
    categories
}: {
    categories: ICategory[];
}) {
    return (
        <Swiper className='categories-slider mb-20' {...swiperOptions}>
            {categories && categories.map((cat) => (
                <SwiperSlide key={cat._id} className='mb-8'>
                    <Image
                        src={cat.image}
                        alt={cat.name}
                        width={1920}
                        height={344}
                        loading='lazy'
                        className='w-full h-[15.625rem] object-contain bg-gray-100 mb-4'
                    />
                    <h3 className='font-medium'>{cat.name}</h3>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
