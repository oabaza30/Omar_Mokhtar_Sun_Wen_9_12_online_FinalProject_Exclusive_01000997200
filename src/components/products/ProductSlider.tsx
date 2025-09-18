"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/thumbs";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex gap-4">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        spaceBetween={16}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Thumbs]}
        className="w-[170px] h-[600px]"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`thumb-${idx}`}
              width={170}
              height={104}
              className="w-full h-[138px] object-contain bg-white rounded cursor-pointer border hover:border-gray-400"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        spaceBetween={0}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs]}
        className="w-[500px] h-[600px]"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={img}
              alt={`image-${idx}`}
              width={500}
              height={600}
              className="w-full h-full object-contain bg-gray-50 rounded"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
