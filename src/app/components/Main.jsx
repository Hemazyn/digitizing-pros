import Image from "next/image";
import Carousel from "../components/Carousel";

export default function Main() {
  return (
    <div id="main" className="bg-svg flex min-h-screen w-full items-center justify-center px-4 py-12 text-center md:px-12">
      <div className="flex w-full max-w-6xl flex-col">
        <div className="mt-10 flex flex-col gap-9 md:mt-20">
          {/* Headline and CTA */}
          <div className="flex flex-col items-center gap-9 px-2 text-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl leading-tight font-semibold md:text-5xl lg:text-6xl">
                Professional Embroidery <br className="hidden md:block" />
                Digitizing
              </h1>
              <p className="text-gray text-base font-medium md:text-lg lg:text-xl">Flat Rate, Fast Turnaround, 100% Satisfaction Guaranteed.</p>
            </div>
            <button className="md:text-md cursor-pointer rounded-lg bg-gradient-to-r from-[#5749E9] to-[#372DA2] px-4 py-2 text-sm font-semibold text-white md:px-6">Upload Your Design</button>
          </div>
          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-5">
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
              <Image src="/time.svg" alt="24hr" width={20} height={20} />
              <span className="text-primary text-sm font-medium md:text-base">24hr Delivery</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
              <Image src="/money.svg" alt="Money-back" width={20} height={20} />
              <span className="text-primary text-sm font-medium md:text-base">Money-Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5">
              <Image src="/secure.svg" alt="Secure" width={20} height={20} />
              <span className="text-primary text-sm font-medium md:text-base">Secure Checkout</span>
            </div>
          </div>
        </div>
        <Carousel />
      </div>
    </div>
  );
}
