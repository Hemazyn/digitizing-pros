import Image from "next/image";
import Logo from "./components/Logo";
import Header from "./components/Header";
import Main from "./components/Main";
import { steps } from "@/app/constants";
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
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-12 lg:px-20">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <h1 className="text-primary text-2xl font-bold sm:text-3xl lg:text-4xl">How it Works</h1>
              <p className="text-btext max-w-xl text-sm sm:text-base">
                Our simple 3-step process makes digitizing your embroidery
                <br className="hidden md:block" />
                designs quick and easy.
              </p>
            </div>
            <div className="mt-10 grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 md:mt-14 md:grid-cols-3 lg:mt-16 lg:gap-12">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center px-4 text-center">
                  <Image src={step.img} alt={step.title} width={300} height={240} className="h-auto w-full max-w-[280px] object-contain" />
                  <div className="mt-4 flex flex-col gap-2 sm:mt-5">
                    <h2 className="text-primary text-lg font-semibold sm:text-xl">{step.title}</h2>
                    <p className="text-btext text-sm whitespace-pre-line sm:text-base">{step.description}</p>
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
