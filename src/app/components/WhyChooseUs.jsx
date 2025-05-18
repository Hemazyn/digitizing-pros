"use client";
import Image from "next/image";
import { features } from "@/app/constants";

export default function WhyChooseUs() {
     return (
          <section className="bg-white py-6 md:py-12 sm:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
               <div className="max-w-6xl w-full mx-auto">
                    {/* Section Heading */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-black mb-3 sm:mb-4">Why Choose The Digitizing Pros</h2>
                    <p className="text-btext text-sm sm:text-base mb-8 sm:mb-10 max-w-3xl">
                         The Digitizing Pros deliver premium embroidery digitizing with fast turnaround,
                         competitive pricing, and dependable support to meet your brand’s highest standards.
                    </p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 border border-gray-200 rounded-xl p-6 sm:p-8 md:p-10 bg-white">
                         {features.map((feature, idx) => (
                              <div key={idx} className="flex gap-4 items-start bg-white rounded-md p-4 hover:shadow-md transition-all duration-300">
                                   <Image src={feature.icon} alt={feature.title} width={32} height={32} />
                                   <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-black">{feature.title}</h3>
                                        <p className="text-btext text-sm sm:text-base mt-1">{feature.description}</p>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}