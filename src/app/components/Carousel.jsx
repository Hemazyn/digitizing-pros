"use client";
import Image from "next/image";

const images = [
     "/carousel/Rectangle1.png",
     "/carousel/Rectangle2.png",
     "/carousel/Rectangle3.png",
     "/carousel/Rectangle4.png",
     "/carousel/Rectangle5.png",
     "/carousel/Rectangle6.png",
     "/carousel/Rectangle7.png",
     "/carousel/Rectangle8.png",
];

export default function Gallery() {
     return (
          <div className="relative w-full overflow-hidden py-10">
               <div className="mx-auto max-w-7xl px-4 relative">
                    {/* Carousel Container */}
                    <div className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth">
                         {images.map((src, idx) => (
                              <div key={idx} className="min-w-[160px] md:min-w-[200px] lg:min-w-[240px] h-[160px] md:h-[200px] lg:h-[240px] flex-shrink-0 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform duration-300">
                                   <Image src={src} alt={`Embroidery ${idx + 1}`} width={240} height={240} className="w-full h-full object-cover" priority />
                              </div>
                         ))}
                    </div>
                    {/* Optional: Fading left/right gradient for aesthetic */}
                    <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 rounded-l-2xl" />
                    <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 rounded-r-2xl" />
               </div>
          </div>
     );
}
