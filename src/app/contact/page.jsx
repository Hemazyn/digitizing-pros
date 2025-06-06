"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Notiflix from "notiflix";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSending(true);
    Notiflix.Loading.dots("Sending...");

    const templateParams = {
      fullName: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone || "",
      message: data.message,
    };

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      Notiflix.Loading.remove();
      Notiflix.Notify.success("Message sent successfully!");
      reset();
    } catch (error) {
      console.error("EmailJS error:", error);
      Notiflix.Loading.remove();
      Notiflix.Notify.failure(`Failed to send message: ${error.text || error.message}`);
    } finally {
      setIsSending(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <div className="bg-headBg flex h-80 w-full flex-col justify-center px-3 text-center md:px-0">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-[48px]">Contact Us</h1>
        <p className="text-btext">Have a question about our embroidery services? Get in touch with our team.</p>
      </div>

      <main className="mx-auto grid max-w-6xl flex-grow gap-10 px-6 py-12 md:grid-cols-2">
        <div className="space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-primary text-3xl font-bold">Send us a message</h2>
            <p className="text-btext text-sm font-medium">Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="text-primary block text-sm font-medium">First Name</label>
                <input {...register("firstName", { required: true })} placeholder="Sidiat" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" />
                {errors.firstName && <span className="text-xs text-red-500">First name is required</span>}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-primary block text-sm font-medium">Last Name</label>
                <input {...register("lastName", { required: true })} placeholder="Bruma" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" />
                {errors.lastName && <span className="text-xs text-red-500">Last name is required</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <label className="text-primary block text-sm font-medium">Phone Number (optional)</label>
                <input {...register("phone")} placeholder="Your number" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-primary block text-sm font-medium">Email Address</label>
                <input type="email" {...register("email", { required: true })} placeholder="Sidiatbruma@gmail.com" className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium" />
                {errors.email && <span className="text-xs text-red-500">Email is required</span>}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-primary block text-sm font-medium">Your Message</label>
              <textarea {...register("message", { required: true })} placeholder="Tell us about your project or inquiry" rows={5} className="border-sLine w-full rounded-lg border px-4 py-2 outline-0 placeholder:text-sm placeholder:font-medium"></textarea>
              {errors.message && <span className="text-xs text-red-500">Message is required</span>}
            </div>

            <button type="submit" disabled={isSending} className="cursor-pointer rounded-md btn-bg px-6 py-2 font-semibold text-white">
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="border-tLine h-fit space-y-4 rounded-lg border p-6 shadow-sm">
          <h2 className="text-primary text-xl font-semibold">Contact Information</h2>
          <div>
            <p className="text-primary text-base font-semibold">Our Location</p>
            <p className="text-btext text-sm font-medium">233 E Wacker Dr, Suite 1207 Chicago, IL 60601</p>
          </div>
          <div>
            <p className="text-primary text-base font-semibold">Phone</p>
            <p className="text-btext text-sm font-medium">1 (219) 716-0757</p>
          </div>
          <div>
            <p className="text-primary text-base font-semibold">Email Address</p>
            <p className="text-btext text-sm font-medium">info@thedigitizingpros.com</p>
          </div>
        </div>
      </main>

      <div className="w-full">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.4494132319835!2d-87.6374303241692!3d41.878876171270286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cae6e37ef75%3A0x2a8b53e226a5a2a4!2sWillis%20Tower!5e0!3m2!1sen!2sus!4v1685154898983!5m2!1sen!2sus" width="100%" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0"></iframe>
      </div>

      <CTA />
      <Footer />
    </div>
  );
}