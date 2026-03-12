import React from 'react';
import { BsPaypal } from 'react-icons/bs';
import { FaGamepad, FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaYoutube } from 'react-icons/fa';
import { ImPaypal } from 'react-icons/im';
import { LuSend } from 'react-icons/lu';
import {  RiVisaLine } from 'react-icons/ri';
import { SiMastercard, SiRazorpay } from 'react-icons/si';

const Footer = () => {
    return (
        <footer className="bg-white text-gray-950 border-t border-gray-300 ">
            {/*  Branding */}
            <div className="max-w-7xl mx-auto px-6 py-18 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Brand & Mission */}
                <div className="space-y-6">
                    <div className="flex  items-center gap-2 cursor-pointer group">
                        <div className=" rounded-xl  transition-transform group-hover:scale-110">
                            <FaGamepad className="text-4xl text-green-600" />
                        </div>
                        <h1 className="font-black text-2xl  uppercase ">
                            Gamer <span className="text-green-500 logo text-3xl">Zone</span>
                        </h1>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed text-justify ">
                        Your ultimate destination for the latest games, exclusive gear, and a thriving gaming community. Level up your library with Gamer Zone.
                    </p>
                    <div className="flex gap-4">
                        {[FaFacebook, FaTwitter, FaInstagram, FaDiscord, FaYoutube].map((Icon, i) => (
                            <a key={i} href="#" className="h-7 w-8  md:w-10 md:h-10 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white hover:border-green-600 transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="font-bold  text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full"></span> Quick Links
                    </h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Store Home', 'Trending Now', 'New Arrivals', 'Special Offers', 'Gift Cards'].map(link => (
                            <li key={link}>
                                <a href="#" className="hover:text-green-500 transition-colors cursor-pointer">/ {link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full"></span> Support
                    </h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        {['Help Center', 'Track Order', 'Returns & Refunds', 'Privacy Policy', 'Terms of Service'].map(link => (
                            <li key={link}>
                                <a href="#" className="hover:text-green-500 transition-colors cursor-pointer">/ {link}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <span className="w-1 h-5 bg-green-500 rounded-full"></span> Join the Quest
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">Get the latest game drops and discounts directly in your inbox.</p>
                    <div className="relative group">
                        <input 
                            type="email" 
                            placeholder="Enter your email..." 
                            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:border-green-600 transition-all"
                        />
                        <button className="absolute right-2 top-1.5 bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-all active:scale-95">
                            <LuSend size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/*  Copyright & Payments */}
            <div className="bg-black py-8 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs font-medium">
                        © 2026 <span className="text-green-500">GAMER ZONE</span>. All rights reserved. 
                        Designed by <a className='text-gray-200' href='https://www.linkedin.com/in/gokulakrishnan-a-g8608' target='_blank'>Gokulaksrishnan</a>.
                    </p>
                    <div className="flex items-center gap-6 opacity-40 grayscale hover:grayscale-0 transition-all duration-500 text-white">
                        {/*payment icons */}
                        <span className="text-[25px] hover:text-green-400 hover:opacity-100 hover:brightness-125 font-black tracking-widest uppercase border border-gray-700 px-2 rounded"><RiVisaLine /></span>
                        <span className="text-[25px] hover:text-green-400 hover:opacity-100 hover:brightness-125 font-black tracking-widest uppercase border border-gray-700 px-2 rounded"><SiMastercard/></span>
                        <span className="text-[25px] hover:text-green-400 hover:opacity-100 hover:brightness-125 font-black tracking-widest uppercase border border-gray-700 px-2 rounded"><ImPaypal/></span>
                        <span className="text-[25px] hover:text-green-400 hover:opacity-100 hover:brightness-125 font-black tracking-widest uppercase border border-gray-700 px-2 rounded"><SiRazorpay /></span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
