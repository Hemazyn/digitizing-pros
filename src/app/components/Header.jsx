"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

export default function Header() {
     const [isOpen, setIsOpen] = useState(false);
     const [scrolled, setScrolled] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               if (window.scrollY > 10) {
                    setScrolled(true);
               } else {
                    setScrolled(false);
               }
          };
          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     }, []);

     return (
          <header className={`fixed w-full z-50 transition-colors duration-300 ${scrolled ? "bg-white border-b border-btGray" : "bg-transparent"
               }`}>
               <div className="flex justify-between items-center py-3 px-4 md:px-20">
                    <Logo />
                    <nav className="hidden md:flex items-center gap-8">
                         <a href="#main" className="font-medium text-sm cursor-pointer">Home</a>
                         <a href="#how-it-works" className="font-medium text-sm cursor-pointer">How it Works</a>
                         <a href="#pricing" className="font-medium text-sm cursor-pointer">Pricing</a>
                         <Link href="/contact" className="font-medium text-sm cursor-pointer">Contact</Link>
                    </nav>
                    <div className="hidden md:flex gap-2.5">
                         {/* <Link href="/" className="py-2 px-2.5 rounded-lg bg-btGray font-medium text-sm">Client Portal</Link> */}
                         <Link href="/login" className="py-2 px-2.5 rounded-lg shadow font-medium text-sm">Login</Link>
                         <Link href="/register" className="py-2 px-2.5 rounded-lg bg-gradient-to-b from-[#5749E9]/90 to-[#372DA2]/90 text-white font-medium text-sm">Shop Now</Link>
                    </div>
                    <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                         {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
               </div>
               {isOpen && (
                    <div className="md:hidden flex flex-col gap-6 px-6 py-5 border-t border-btGray rounded-b-lg shadow-md
                  bg-gradient-to-b from-[#E0E7FF] to-white">
                         <nav className="flex flex-col gap-4">
                              {["Home", "How it Works", "Pricing"].map((item) => (
                                   <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="font-medium text-base text-gray-800 hover:text-btBlue transition-colors"  >
                                        {item}
                                   </a>
                              ))}
                              <a href="/contact" className="font-medium text-base text-gray-800 hover:text-btBlue transition-colors">
                                   Contact
                              </a>
                         </nav>
                         <div className="flex flex-col gap-3">
                              {/* <Link href="/" className="py-2 px-4 rounded-lg bg-btGray font-medium text-sm text-gray-700 hover:bg-gray-300 transition">
                                   Client Portal
                              </Link> */}
                              <Link href="/login" className="py-2 px-4 rounded-lg shadow font-medium text-sm text-gray-900 hover:bg-gray-100 transition">
                                   Login
                              </Link>
                              <Link href="/register" className="py-2 px-4 rounded-lg bg-gradient-to-b from-[#5749E9]/90 to-[#372DA2]/90 text-white font-medium text-sm hover:bg-blue-600 transition">
                                   Shop Now
                              </Link>
                         </div>
                    </div>
               )}
          </header>
     );
}