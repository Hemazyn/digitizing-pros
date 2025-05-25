"use client"
import { useRef } from 'react';
import Notiflix from 'notiflix';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CTA from '../components/CTA';

export default function ContactPage() {
     const formRef = useRef(null);

     const handleSubmit = (e) => {
          e.preventDefault();

          const form = formRef.current;
          const firstName = form['firstName'].value.trim();
          const lastName = form['lastName'].value.trim();
          const email = form['email'].value.trim();
          const message = form['message'].value.trim();

          if (!firstName || !lastName || !email || !message) {
               Notiflix.Notify.failure('Please fill in all required fields.');
               return;
          }

          Notiflix.Loading.dots('Sending...');
          fetch("https://formspree.io/f/mnndwvlb", {
               method: "POST",
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ firstName, lastName, email, message }),
          })
               .then((res) => {
                    if (res.ok) {
                         Notiflix.Loading.remove();
                         Notiflix.Notify.success('Message sent successfully!');
                         form.reset();
                    } else {
                         throw new Error("Submission failed");
                    }
               })
               .catch((err) => {
                    Notiflix.Loading.remove();
                    Notiflix.Notify.failure('Something went wrong. Try again later.');
               });
     };

     return (
          <div className="flex flex-col min-h-screen bg-white">
               <Header />
               <div className="flex flex-col justify-center w-full h-80 bg-headBg text-center px-3 md:px-0">
                    <h1 className="text-2xl md:text-3xl lg:text-[48px] font-semibold">Contact Us</h1>
                    <p className="text-btext">Have a question about our embroidery services? Get in touch with our team.</p>
               </div>
               <main className="flex-grow max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                         <div className="flex flex-col gap-2">
                              <h2 className="text-3xl font-bold text-primary">Send us a message</h2>
                              <p className="text-sm text-btext font-medium">
                                   Fill out the form below and we'll get back to you as soon as possible.
                              </p>
                         </div>
                         <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="flex flex-col gap-3">
                                        <label className="block text-sm font-medium text-primary">First Name</label>
                                        <input type="text" name="firstName" placeholder="Sidiat" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" />
                                   </div>
                                   <div className="flex flex-col gap-3">
                                        <label className="block text-sm font-medium text-primary">Last Name</label>
                                        <input type="text" name="lastName" placeholder="Bruma" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" />
                                   </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                   <div className="flex flex-col gap-3">
                                        <label className="block text-sm font-medium text-primary">Phone Number (optional)</label>
                                        <input type="text" placeholder="Your number" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" />
                                   </div>
                                   <div className="flex flex-col gap-3">
                                        <label className="block text-sm font-medium text-primary">Email Address</label>
                                        <input type="email" name="email" placeholder="Sidiatbruma@gmail.com" className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium" />
                                   </div>
                              </div>

                              <div className="flex flex-col gap-3">
                                   <label className="block text-sm font-medium text-primary">Your Message</label>
                                   <textarea name="message" placeholder="Tell us about your project or inquiry" rows={5}
                                        className="w-full px-4 py-2 border border-sLine rounded-lg outline-0 placeholder:text-sm placeholder:font-medium"></textarea>
                              </div>

                              <button type="submit" className="bg-gradient-to-b from-[#5749E9]/90 to-[#372DA2]/90 text-white font-semibold px-6 py-2 rounded-md cursor-pointer">
                                   Send Message
                              </button>
                         </form>
                    </div>

                    <div className="h-fit p-6 shadow-sm space-y-4 border border-tLine rounded-lg">
                         <h2 className="font-semibold text-xl text-primary">Contact Information</h2>
                         <div>
                              <p className="font-semibold text-base text-primary">Our Location</p>
                              <p className="text-sm text-btext font-medium">233 E Wacker Dr, Suite 1207 Chicago, IL 60601</p>
                         </div>
                         <div>
                              <p className="font-semibold text-base text-primary">Phone</p>
                              <p className="text-sm text-btext font-medium">1 (219) 716-0757</p>
                         </div>
                         <div>
                              <p className="font-semibold text-base text-primary">Email Address</p>
                              <p className="text-sm text-btext font-medium">info@thedigitizingpros.com</p>
                         </div>
                    </div>
               </main>
               <div className="w-full">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.4494132319835!2d-87.6374303241692!3d41.878876171270286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2cae6e37ef75%3A0x2a8b53e226a5a2a4!2sWillis%20Tower!5e0!3m2!1sen!2sus!4v1685154898983!5m2!1sen!2sus"
                         width="100%" height="400" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0" >
                    </iframe>
               </div>
               <CTA />
               <Footer />
          </div>
     );
}