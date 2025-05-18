import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
     return (
          <div className="flex flex-col min-h-screen bg-white text-gray-800">
               <Header />
               <div className="flex flex-col justify-center w-full h50 h-80 bg-headBg">
                    <h1 className="text-2xl md:text-3xl lg:text-[48px] font-semibold text-center">Terms of Services</h1>
                    <p className="text-center text-gray-600">
                         Please read these terms carefully before using our embroidery services.
                    </p>
               </div>
               <main className="flex-grow max-w-4xl mx-auto px-6 py-12">

                    <div className="text-sm space-y-6 leading-relaxed text-btext">
                         <section>
                              <h2 className="font-bold">Terms of Agreement</h2>
                              <p>Digitizing Pros LLC<br />contact@digitizingpros.com<br />123 Embroidery Lane, Threads Town, USA</p>
                         </section>
                         <section>
                              <h2 className="font-bold">1. Services Provided</h2>
                              <p>
                                   Digitizing Pros LLC ("we", "our", or "us") provides embroidery digitizing, vector conversion, custom design, and patch creation services.
                                   We support multiple file types and deliver designs compatible with major embroidery machines.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">2. Order Placement & Payment</h2>
                              <p>
                                   All orders must be submitted via our official website. Full payment is required at the time of order.
                                   We accept all major credit cards and PayPal.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">3. Turnaround Time</h2>
                              <p>
                                   Standard turnaround time is 24–48 hours. Rush services may be available on request.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">4. Client Responsibilities</h2>
                              <p>
                                   Clients are responsible for providing accurate specifications. We provide design approval before final delivery.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">5. Revisions & Refund Policy</h2>
                              <p>
                                   Limited revisions are included. Refunds are not issued after final delivery unless part of our Satisfaction Guarantee.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">6. Ownership & Usage Rights</h2>
                              <p>
                                   Clients retain rights to the delivered files. We reserve the right to use completed work for promotional purposes unless clients opt out.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">7. Limitation of Liability</h2>
                              <p>
                                   Digitizing Pros LLC is not liable for damages from the use or inability to use our services.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">8. Changes to Agreement</h2>
                              <p>
                                   We reserve the right to update these terms at any time. Clients will be notified via our website or email.
                              </p>
                         </section>
                         <section>
                              <h2 className="font-bold">Contact Us</h2>
                              <p>
                                   support@digitizingpros.com<br />+1 (234) 567-8901
                              </p>
                         </section>
                    </div>
               </main>
               <Footer />
          </div>
     );
}
