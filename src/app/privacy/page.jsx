import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="relative flex flex-col bg-white text-gray-800">
      <Header />
      <div className="bg-headBg flex h-80 w-full flex-col justify-center text-center">
        <h1 className="text-2xl font-semibold md:text-3xl lg:text-[48px]">Privacy Policy</h1>
        <p className="text-gray-600">Please read these terms carefully before using our embroidery services.</p>
      </div>

      <main className="text-btext mx-auto max-w-4xl flex-grow space-y-6 px-6 py-12 text-sm leading-relaxed">
        <section>
          <h2 className="font-bold">Privacy Policy</h2>
          <p>Effective Date: June 21, 2025</p>
        </section>
        <section>
          <h2 className="font-bold">1. Information We Collect</h2>
          <p>We collect personal info (name, email, address, payment info), technical info (IP, browser), and design files you upload.</p>
        </section>
        <section>
          <h2 className="font-bold">2. How We Use Your Information</h2>
          <p>We use your data to process orders, communicate, improve services, and prevent fraud.</p>
        </section>
        <section>
          <h2 className="font-bold">3. Payment Information</h2>
          <p>Payments are processed securely via Stripe, Google Pay, or Apple Pay. We do not store payment data.</p>
        </section>
        <section>
          <h2 className="font-bold">4. Sharing of Information</h2>
          <p>We do not sell or rent your data. We share only with trusted service providers as needed.</p>
        </section>
        <section>
          <h2 className="font-bold">5. Data Security</h2>
          <p>We protect your data with appropriate technical and organizational measures.</p>
        </section>
        <section>
          <h2 className="font-bold">6. Your Rights</h2>
          <p>You may request access, update, or deletion of your data by emailing info@thedigitizingpros.com.</p>
        </section>
        <section>
          <h2 className="font-bold">7. Cookies & Tracking</h2>
          <p>We use cookies to enhance your experience. You may disable cookies in your browser.</p>
        </section>
        <section>
          <h2 className="font-bold">8. Third-Party Links</h2>
          <p>We are not responsible for the privacy practices of third-party websites.</p>
        </section>
        <section>
          <h2 className="font-bold">9. Children's Privacy</h2>
          <p>We do not knowingly collect data from individuals under 18.</p>
        </section>
        <section>
          <h2 className="font-bold">10. Changes to This Policy</h2>
          <p>We may update this policy at any time. Updates will be posted with a new effective date.</p>
        </section>
        <section>
          <h2 className="font-bold">Contact Us</h2>
          <p>
            info@thedigitizingpros.com
            <br />
            233 E Wacker Dr, Suite 1207, Chicago, IL 60601
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
