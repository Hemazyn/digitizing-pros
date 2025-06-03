"use client";
import Image from "next/image";

const images = ["/carousel/Rectangle1.png", "/carousel/Rectangle2.png", "/carousel/Rectangle3.png", "/carousel/Rectangle4.png", "/carousel/Rectangle5.png", "/carousel/Rectangle6.png", "/carousel/Rectangle7.png", "/carousel/Rectangle8.png"];

export default function Gallery() {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth md:gap-6">
          {images.map((src, idx) => (
            <div key={idx} className="h-[160px] min-w-[160px] flex-shrink-0 overflow-hidden rounded-xl md:h-[200px] md:min-w-[200px] lg:h-[240px] lg:min-w-[240px]">
              <Image src={src} alt={`Embroidery ${idx + 1}`} width={240} height={240} loading={idx === 0 ? "eager" : "lazy"} priority={idx === 0} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
