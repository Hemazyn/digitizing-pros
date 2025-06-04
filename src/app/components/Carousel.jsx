"use client";
import Image from "next/image";

const images = ["/carousel/Rectangle1.png", "/carousel/Rectangle2.png", "/carousel/Rectangle3.png", "/carousel/Rectangle4.png", "/carousel/Rectangle5.png", "/carousel/Rectangle6.png", "/carousel/Rectangle7.png", "/carousel/Rectangle8.png"];

export default function Gallery() {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="no-scrollbar flex gap-4 overflow-x-auto scroll-smooth md:gap-6">
          {images.map((src, idx) => (
            <div key={idx} className="flex-shrink-0 rounded-[16px] bg-white p-1 shadow-md" style={{ width: 240, height: 240 }}>
              <Image src={src} alt={`Embroidery ${idx + 1}`} width={240} height={240} loading={idx === 0 ? "eager" : "lazy"} priority={idx === 0} className="h-full w-full rounded-xl object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
