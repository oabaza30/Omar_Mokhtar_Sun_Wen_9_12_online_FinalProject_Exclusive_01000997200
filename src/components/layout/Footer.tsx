import React from "react";
import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import  googlePlay  from '@/assets/images/google-play.png';
import  appStore  from '@/assets/images/app-store.png';
import  qr  from '@/assets/images/qr-code.png';


const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-20 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10">
        {/* Exclusive */}
        <div>
          <h3 className="text-lg font-bold mb-4">Exclusive</h3>
          <p className="mb-2 font-medium">Subscribe</p>
          <p className="text-sm mb-4">Get 10% off your first order</p>
          <div className="flex items-center border border-white rounded px-3 py-2 w-full max-w-[250px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent text-white text-sm placeholder-white outline-none flex-1"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 6.75L21 12m0 0l-3.75 5.25M21 12H3"
              />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Support</h3>
          <p className="text-sm mb-2">111 Bijoy sarani, Dhaka,</p>
          <p className="text-sm mb-2">DH 1515, Bangladesh.</p>
          <p className="text-sm mb-2">exclusive@gmail.com</p>
          <p className="text-sm">+88015-88888-9999</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Account</h3>
          <ul className="space-y-2 text-sm">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Quick Link</h3>
          <ul className="space-y-2 text-sm">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Download App</h3>
          <p className="text-sm mb-2">Save $3 with App New User Only</p>
          <div className="flex items-center mb-4 gap-4">
            <Image src={qr} alt="QR" width={85} height={85} />
            <div className="flex flex-col gap-2">
              <Image src={googlePlay} alt="Google Play" width={120} height={40} />
              <Image src={appStore} alt="App Store" width={120} height={40} />
            </div>
          </div>
          <div className="flex gap-8 text-white text-xl">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-900 mt-10 pt-6 text-center text-sm text-gray-800">
        © Copyright Rimel 2025. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
