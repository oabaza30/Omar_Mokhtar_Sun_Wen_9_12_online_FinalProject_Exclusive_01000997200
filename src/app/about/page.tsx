import React from "react";
import { HiOutlineShoppingBag, HiOutlineCurrencyDollar } from "react-icons/hi";
import { BsShop } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiSealCheckBold } from "react-icons/pi";
import aboutImg from "@/assets/images/about-girls.png";
import Image from 'next/image';
import TeamSlider from "@/components/home/teamSlider";



const AboutPage = () => {
    return (
        <div className="container">
            <div className="py-12 space-y-20 ">
            <div className="grid md:grid-cols-2 items-center w-full">
                <div className="">
                    <h2 className="text-6xl font-semibold mb-6">Our Story</h2>
                    <p className="text-gray-600 mb-5 leading-[2rem]">
                        Launced in 2015, Exclusive is South Asia’s premier online shopping marketplace
                        with an active presence in Bangladesh. Supported by wide range of tailored marketing,
                        data and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3
                        million customers across the region.
                    </p>
                    <p className="text-gray-600 mb-5 leading-[2rem]">
                        Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a
                        diverse assortment in categories ranging from consumer.
                    </p>
                </div>
                <div className="w-full h-auto relative">
                    <Image src={aboutImg} alt="About" className=" object-cover object-right w-full xl:translate-x-40 lg:translate-x-70 md:translate-x-50" />
                </div>
            </div>

            {/* Stats */}
            <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

                <div className=" border-1 rounded-md py-14 w-s">
                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto">
                    <BsShop />
                </div>
                <h3 className="text-xl font-bold">10.5k</h3>
                <p className="text-sm text-gray-500">Sellers active our site</p>
                </div>

                <div className="bg-red-500 text-white border-1 rounded-md py-14 w-s">
                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-white text-black mx-auto">
                    <HiOutlineCurrencyDollar />
                </div>
                <h3 className="text-xl font-bold">33k</h3>
                <p className="text-sm">Monthly Product Sale</p>
                </div>

                <div className=" border-1 rounded-md py-14 w-s">
                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto">
                    <HiOutlineShoppingBag />
                </div>
                <h3 className="text-xl font-bold">45.5k</h3>
                <p className="text-sm text-gray-500">Customer active in our site</p>
                </div>

                <div className=" border-1 rounded-md py-14 w-s">
                <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mx-auto">
                    <HiOutlineCurrencyDollar />
                </div>
                <h3 className="text-xl font-bold">25k</h3>
                <p className="text-sm text-gray-500">Annual gross sale in our site</p>
                </div>
            </div>
            </div>


            {/* Team */}
            <div className="container py-6">
                <TeamSlider />
            </div>

            {/* Features */}
            <div className="container py-15">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                    <div className="text-4xl mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
                        <LiaShippingFastSolid />
                    </div>
                    <h4 className="font-bold">FREE AND FAST DELIVERY</h4>
                    <p className="text-sm text-gray-500">Free delivery for all orders over $140</p>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
                        <BiSupport />
                    </div>
                    <h4 className="font-bold">24/7 CUSTOMER SERVICE</h4>
                    <p className="text-sm text-gray-500">Friendly 24/7 customer support</p>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-200">
                        <PiSealCheckBold />
                    </div>
                    <h4 className="font-bold">MONEY BACK GUARANTEE</h4>
                    <p className="text-sm text-gray-500">We return money within 30 days</p>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AboutPage;