"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function NewOrder() {
     const [dropdownOpen, setDropdownOpen] = useState(false);
     const dropdownRef = useRef();

     useEffect(() => {
          function handleClickOutside(event) {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setDropdownOpen(false);
               }
          }

          document.addEventListener("mousedown", handleClickOutside);
          return () => {
               document.removeEventListener("mousedown", handleClickOutside);
          };
     }, []);

     return (
          <section className="border-btGray bg-theadBg relative flex w-2/5 flex-col items-center space-y-3 rounded-[18px] border p-0.5 font-semibold">
               <div className="mx-auto mt-2 flex w-[92%] flex-row items-start justify-between gap-1">
                    <div className="flex flex-col">
                         <h3 className="text-sm font-semibold text-primary">Upload Your Design</h3>
                         <p className="font-medium text-btext text-xxs">Upload your artwork and we'll digitize it for embroidery within 24 hours</p>
                    </div>
                    <Image src="/cancel.svg" width={20} height={20} alt="close new order" className="absolute right-2.5 cursor-pointer" />
               </div>
               <section className="border-btGray max-h-full w-full rounded-[10px] border bg-white">
                    <div className="mx-auto flex w-[92%] flex-col space-y-5 py-5">
                         {/* info */}
                         <div className="flex flex-col gap-3">
                              <div className="flex flex-col w-full space-y-2">
                                   <p className="text-xs font-semibold text-primary">Select Your Plan</p>
                                   <div className="flex flex-row items-center justify-between">
                                        <button className="border-btBlue text-primary text-xxs hover:text-btBlue w-40 rounded-md border px-3 py-2.5 font-semibold shadow hover:font-semibold">Embroidery Digitizing</button>
                                        <button className="border-btGray text-primary text-xxs hover:border-btBlue focus:border-btBlue hover:text-btBlue w-40 cursor-pointer rounded-md border px-3 py-2.5 font-semibold hover:font-semibold">Vector Services</button>
                                        <button className="border-btGray text-primary text-xxs hover:border-btBlue focus:border-btBlue hover:text-btBlue w-40 cursor-pointer rounded-md border px-3 py-2.5 font-semibold hover:font-semibold">Embroidery Patches</button>
                                   </div>
                              </div>
                              <div className="flex flex-col w-full space-y-2">
                                   <p className="text-xs font-semibold text-primary">Upload Your Artwork</p>
                                   <div className="flex flex-col items-center justify-center gap-2 p-4 border border-dotted rounded-md cursor-pointer border-btGray">
                                        <Image src="/file2.svg" width={28} height={28} alt="file upload" />
                                        <p className="font-medium text-center text-xxs text-btext">
                                             <span className="font-semibold cursor-pointer text-primary hover:text-btBlue">Upload a file</span> or drag and drop <br /> JPG, PNG, GIF, SVG, AI, PDF up to 10MB
                                        </p>
                                   </div>
                              </div>
                              <div className="flex flex-col w-full space-y-2">
                                   <p className="text-xs font-semibold text-primary">Design Size</p>
                                   <div className="flex flex-row items-center gap-3">
                                        <div className="flex flex-col gap-1 rounded-md border px-3.5 py-2.5 border-btBlue cursor-pointer">
                                             <p className="text-xs font-medium text-primary">Under 5 Inches</p>
                                             <span className="font-medium text-xxs text-btext">For chest logos, hat fronts, shirt sleeves, small patches</span>
                                        </div>
                                        <div className="border-btGray flex flex-col gap-1 rounded-md border px-3.5 py-2.5 hover:border-btBlue cursor-pointer">
                                             <p className="text-xs font-medium text-primary">Over 5 Inches</p>
                                             <span className="font-medium text-xxs text-btext">For back of jackets, large tote bags, big patches</span>
                                        </div>
                                   </div>
                              </div>
                              <div className="flex flex-col w-full space-y-2">
                                   <p className="text-xs font-semibold text-primary">Design Complexity</p>
                                   <div className="relative" ref={dropdownRef}>
                                        <button onClick={() => setDropdownOpen((prev) => !prev)} className="flex items-center gap-1.5 p-1 border w-full justify-between">
                                             <span className="text-sm font-semibold cursor-pointer text-primary">Design Complexity</span>
                                             {dropdownOpen ? <ChevronUp size={16} className="cursor-pointer" /> : <ChevronDown size={16} className="cursor-pointer" />}
                                        </button>
                                        {dropdownOpen && (
                                             <div className="absolute right-0 z-50 mt-2 bg-white border border-btGray w-30 rounded-xl">
                                                  <div className="flex flex-col divide-y divide-btGray">
                                                       <Link href="#" className="relative flex flex-row items-center justify-start gap-3 px-3 py-2 cursor-pointer hover:bg-headBg rounded-t-xl">
                                                            <Image src="/user.svg" width={16} height={16} alt="dashboard" />
                                                            <span className="text-sm">Profile</span>
                                                       </Link>
                                                       <Link href="#" className="relative flex flex-row items-center justify-start gap-3 px-3 py-2 cursor-pointer hover:bg-headBg">
                                                            <Image src="/setting.svg" width={16} height={16} alt="orders" />
                                                            <span className="text-sm">Setting</span>
                                                       </Link>
                                                       <button className="relative flex flex-row items-center justify-start gap-3 px-3 py-2 cursor-pointer hover:bg-headBg rounded-b-xl">
                                                            <Image src="/logout.svg" width={16} height={16} alt="logout" />
                                                            <span className="text-sm">Logout</span>
                                                       </button>
                                                  </div>
                                             </div>
                                        )}
                                   </div>
                              </div>
                         </div>
                         <div className="w-full h-px bg-btGray"></div> {/* divider */}
                         {/* price */}
                    </div>
               </section>
          </section>
     );
}
