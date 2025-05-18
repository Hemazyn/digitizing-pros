import Image from "next/image";

export default function Portfolio() {
     const images = [
          "/portfolio/port1.png",
          "/portfolio/port2.png",
          "/portfolio/port3.png",
          "/portfolio/port4.png",
          "/portfolio/port5.png",
          "/portfolio/port6.png",
          "/portfolio/port7.png",
          "/portfolio/port8.png",
          "/portfolio/port9.png",
          "/portfolio/port10.png",
          "/portfolio/port11.png",
          "/portfolio/port12.png",
     ];

     return (
          <section className="w-full bg-transparent">
               <div className="max-w-6xl mx-auto my-10 px-4 flex flex-col gap-10">
                    <header className="flex flex-col gap-2 text-center md:text-left">
                         <h3 className="font-bold text-3xl text-primary">Our Portfolio</h3>
                         <p className="text-base text-btext">
                              Browse our recent work to see the quality of our <br className="hidden sm:inline" />
                              digitizing services
                         </p>
                    </header>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-theadBg rounded-lg p-4">
                         {images.map((src, idx) => (
                              <div key={idx} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" >
                                   <Image src={src} alt={`Portfolio ${idx + 1}`} width={334} height={310} className="w-full h-[310px] object-cover rounded-lg" priority={idx < 3} />
                              </div>
                         ))}
                    </div>
               </div>
          </section>
     );
}