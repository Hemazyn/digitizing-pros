"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const images = ["/carousel/Rectangle1.png", "/carousel/Rectangle2.png", "/carousel/Rectangle3.png", "/carousel/Rectangle4.png", "/carousel/Rectangle5.png", "/carousel/Rectangle6.png", "/carousel/Rectangle7.png", "/carousel/Rectangle8.png"];

export default function Gallery() {
  const duplicatedImages = [...images, ...images];

  return (
    <div className="relative w-full overflow-hidden mt-5 rounded-lg">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />
      <motion.div className="flex gap-4 md:gap-6" style={{ whiteSpace: "nowrap" }} animate={{ x: ["0%", "-50%"] }} transition={{ repeat: Infinity, repeatType: "loop", duration: 20, ease: "linear" }}>
        {duplicatedImages.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 rounded-[16px] bg-white p-1 shadow-md" style={{ width: 240, height: 240 }}>
            <Image src={src} alt={`Embroidery ${idx + 1}`} width={240} height={240} loading={idx === 0 ? "eager" : "lazy"} priority={idx === 0} className="h-full w-full rounded-xl object-cover" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}