import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <div className="relative flex flex-col bg-white text-gray-800">
      <Header />
      <div className="h50 bg-headBg flex h-80 w-full flex-col justify-center">
        <h1 className="text-center text-2xl font-semibold md:text-3xl lg:text-[48px]">Terms of Services</h1>
        <p className="text-center text-gray-600">Please read these terms carefully before using our embroidery services.</p>
      </div>
      <main className="mx-auto max-w-4xl flex-grow px-6 py-12">
        <div className="text-btext space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="font-bold">Terms of Agreement</h2>
          </section>
          <section>
            <h2 className="font-bold">1. Services Provided</h2>
            <p>The Digitizing Pros, LLC ("we", "our", "us") offers embroidery digitizing, vector conversion, custom design creation, and patch production services. We deliver files compatible with major embroidery software and machines, including DST, EMB, PES, PXF, JEF, CND, HUS, NGS, and EXP. We utilize Wilcom (EMB), Tajima Pulse (PXF), and Wings XP (NGS) for optimal output quality.</p>
          </section>
          <section>
            <h2 className="font-bold">2. Order Placement & Payment</h2>
            <p>All orders must be submitted through our official website. Payment is required upfront. We accept Stripe, Google Pay, and Apple Pay..</p>
          </section>
          <section>
            <h2 className="font-bold">3. Turnaround Time</h2>
            <ul>
              <li>Simple to Moderately Complex Logos: 12-24 hours</li>
              <li>Complex Logos: 2-3 business days</li>
              <li>Patches: 10-15 business days with free shipping</li>
            </ul>
          </section>
          <section>
            <h2 className="font-bold">4. Client Responsibilities</h2>
            <p>Clients must submit high-resolution images and accurate sizing. Design previews are provided for approval before final delivery.</p>
          </section>
          <section>
            <h2 className="font-bold">5. Revisions & Refund Policy</h2>
            <p>Unlimited minimal revisions are included. We offer a 100% money-back guarantee before final file delivery. No refunds are issued after delivery. No returns or refunds are accepted on patch orders.</p>
          </section>
          <section>
            <h2 className="font-bold">6. Ownership & Usage Rights</h2>
            <p>Clients retain full rights to delivered files. We may showcase work for promotional purposes unless otherwise requested in writing.</p>
          </section>
          <section>
            <h2 className="font-bold">7. Limitation of Liability</h2>
            <p>We are not liable for any damages resulting from the use or inability to use our services.</p>
          </section>
          <section>
            <h2 className="font-bold">8. Changes to This Agreement</h2>
            <p>We may update these terms at any time. Changes will be posted on our website.</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
