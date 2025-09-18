"use client";

import Image from "next/image";
import { FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import tom from "@/assets/images/team-tom.png";
import emma from "@/assets/images/team-emma.png";
import will from "@/assets/images/team-will.png";

import "swiper/css";
import "swiper/css/pagination";

const teamMembers = [
  {
    img: tom,
    name: "Tom Cruise",
    role: "Founder & Chairman",
  },
  {
    img: emma,
    name: "Emma Watson",
    role: "Managing Director",
  },
  {
    img: will,
    name: "Will Smith",
    role: "Product Designer",
  },
];

const TeamSlider = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-10">Meet Our Team</h2>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !size-3 border-2",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-red-500 border-white",
        }}
        modules={[Pagination]}
      >
        {teamMembers.map((member, idx) => (
          <SwiperSlide key={idx}>
            <div className="text-center px-4">
              <Image
                src={member.img}
                alt={member.name}
                className="mx-auto rounded w-full aspect-[1/1.25] object-contain max-w-[300px]"
              />
              <h4 className="mt-4 text-lg font-semibold">{member.name}</h4>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <div className="flex gap-4 justify-center text-lg text-gray-600">
                <FaTwitter />
                <FaInstagram />
                <FaLinkedinIn />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamSlider;
