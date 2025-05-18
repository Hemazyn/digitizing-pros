import Image from "next/image";
import Logo from "./components/Logo";
import Header from "./components/Header";
import Main from "./components/Main";
import { steps } from '@/app/constants';
import WhyChooseUs from "./components/WhyChooseUs";
import PricingSection from "./components/PricingSection";
import FileTypes from "./components/FileTypes";
import Portfolio from "./components/Portfolio";
import Testimonies from "./components/Testimonies";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <div id="how-it-works" className="w-full bg-white py-6 md:py-16 lg:py-24">
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2 items-center text-center">
              <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-primary">How it Works</h1>
              <p className="text-btext text-sm sm:text-base max-w-xl">
                Our simple 3-step process makes digitizing your embroidery
                <br className="hidden md:block" />
                designs quick and easy.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mt-10 md:mt-14 lg:mt-16 w-full">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center px-4">
                  <Image src={step.img} alt={step.title} width={300} height={240} className="w-full max-w-[280px] h-auto object-contain" />
                  <div className="flex flex-col gap-2 mt-4 sm:mt-5">
                    <h2 className="font-semibold text-lg sm:text-xl text-primary">{step.title}</h2>
                    <p className="text-btext text-sm sm:text-base whitespace-pre-line">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs />
      <PricingSection />
      <FileTypes />
      <Portfolio />
      <Testimonies />
      <CTA />
      <Footer />
    </div>
  );
}
