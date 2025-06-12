"use client";
import Image from "next/image";
import { features } from "../constants";

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-6 sm:px-6 sm:py-16 md:px-12 md:py-12 lg:px-20">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Heading */}
        <h2 className="mb-3 text-xl font-semibold text-black sm:mb-4 sm:text-2xl md:text-3xl">Why Choose The Digitizing Pros</h2>
        <p className="text-btext mb-8 max-w-3xl text-sm sm:mb-10 sm:text-base">The Digitizing Pros deliver premium embroidery digitizing with fast turnaround, competitive pricing, and dependable support to meet your brand’s highest standards.</p>
        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 rounded-xl border border-gray-200 bg-white p-6 sm:grid-cols-2 sm:gap-8 sm:p-8 md:gap-10 md:p-10">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-4 rounded-md bg-white p-4 transition-all duration-300 hover:shadow-md">
              <Image src={feature.icon} alt={feature.title} width={32} height={32} />
              <div>
                <h3 className="text-base font-semibold text-black sm:text-lg">{feature.title}</h3>
                <p className="text-btext mt-1 text-sm sm:text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
