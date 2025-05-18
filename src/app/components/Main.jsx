import Image from "next/image";
import Carousel from "../components/Carousel";

export default function Main() {
     return (
          <div id="main" className="flex items-center justify-center w-full min-h-screen text-center bg-svg px-4 md:px-12 py-12">
               <div className="flex flex-col w-full max-w-6xl">
                    <div className="flex flex-col gap-9 mt-10 md:mt-20">
                         {/* Headline and CTA */}
                         <div className="flex flex-col gap-9 items-center text-center px-2">
                              <div className="flex flex-col gap-6">
                                   <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl leading-tight">
                                        Professional Embroidery <br className="hidden md:block" />
                                        Digitizing
                                   </h1>
                                   <p className="text-gray font-medium text-base md:text-lg lg:text-xl">
                                        Flat Rate, Fast Turnaround, 100% Satisfaction Guaranteed.
                                   </p>
                              </div>
                              <button className="bg-gradient-to-b from-[#5749E9]/90 to-[#372DA2]/90 font-semibold text-sm md:text-md py-2 px-4 md:px-6 rounded-lg text-white cursor-pointer">
                                   Upload Your Design
                              </button>
                         </div>

                         {/* Feature Badges */}
                         <div className="flex flex-wrap justify-center gap-3 md:gap-5">
                              <div className="flex items-center gap-2 bg-white rounded-full border py-1.5 px-3">
                                   <Image src="/time.svg" alt="24hr" width={20} height={20} />
                                   <span className="font-medium text-sm md:text-base text-primary">24hr Delivery</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white rounded-full border py-1.5 px-3">
                                   <Image src="/money.svg" alt="Money-back" width={20} height={20} />
                                   <span className="font-medium text-sm md:text-base text-primary">Money-Back Guarantee</span>
                              </div>
                              <div className="flex items-center gap-2 bg-white rounded-full border py-1.5 px-3">
                                   <Image src="/secure.svg" alt="Secure" width={20} height={20} />
                                   <span className="font-medium text-sm md:text-base text-primary">Secure Checkout</span>
                              </div>
                         </div>
                    </div>
                    <Carousel />
               </div>
          </div>
     );
}