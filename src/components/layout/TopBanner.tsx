"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";

const TopBanner = () => {
  return (
    <div className="w-full bg-black text-gray-300 text-sm">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <p className="font-extralightlight text-center w-full md:w-auto">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link
            href="/products"
            className="font-bold underline cursor-pointer hover:text-red-500 transition"
          >
            ShopNow
          </Link>
        </p>
        <div className="hidden md:flex items-center gap-1 text-sm cursor-pointer">
          English
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
