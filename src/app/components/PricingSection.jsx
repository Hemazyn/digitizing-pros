"use client";
import { useState } from "react";
import Image from "next/image";
import { Digitizing, Patches, Vector } from "./PriceSelect";

const tabs = ["Embroidery Digitizing", "Vector Services", "Embroidery Patches"];

export default function PricingSection() {
     const [activeTab, setActiveTab] = useState(tabs[0]);

     return (
          <section id="pricing" className="w-full bg-white py-8 md:py-16">
               <div className="max-w-6xl w-full mx-auto px-6 md:px-12 lg:px-20 text-center">
                    <h2 className="text-2xl md:text-3xl font-semibold text-black mb-3">Digitizing Service Pricing</h2>
                    <p className="text-btext text-base mb-8">
                         Professional embroidery digitizing with unlimited revisions and quick turnaround times.
                    </p>
                    <div className="tab-bg flex justify-center items-center gap-1.5 mb-12 px-1 py-1 w-fit mx-auto rounded-full">
                         {tabs.map((tab) => (
                              <div key={tab} className={`p-[2px] rounded-full ${activeTab === tab ? "bg-gradient-to-r from-[#EEEDFF] to-[#EAE8FF]" : ""}`}>
                                   <button onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 cursor-pointer ${activeTab === tab ? "bg-white text-black" : "text-black"}`}>
                                        {tab}
                                   </button>
                              </div>
                         ))}
                    </div>
                    {activeTab === "Embroidery Digitizing" && (
                         <Digitizing />
                    )}
                    {activeTab === "Vector Services" && (
                         <Vector />
                    )}
                    {activeTab === "Embroidery Patches" && (
                         <Patches />
                    )}
               </div>
          </section>
     );
}