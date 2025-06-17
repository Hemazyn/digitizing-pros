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
          <p>
            Effective Date: [Insert Date]
            <br />
            Business Name: The Digitizing Pros, LLC
            <br />
            Location: Chicago, Illinois, USA
          </p>
        </section>
        <section>
          <h2 className="font-bold">1. Information We Collect</h2>
          <p>We collect information when you place an order or interact with our site, including name, email, contact info, billing, file uploads, website usage data (browser, IP address, device type), etc.</p>
        </section>
        <section>
          <h2 className="font-bold">2. How We Use Your Information</h2>
          <p>We use your info to fulfill orders, support, send updates/promotions (if opted in), and improve our services. We do not share personal info with third parties for marketing.</p>
        </section>
        <section>
          <h2 className="font-bold">3. Data Protection & Security</h2>
          <p>All transactions are encrypted via SSL. Access to personal data is limited to authorized personnel.</p>
        </section>
        <section>
          <h2 className="font-bold">4. Cookies & Website Tracking</h2>
          <p>We use cookies for a better user experience and traffic analysis. Users can adjust settings via their browser.</p>
        </section>
        <section>
          <h2 className="font-bold">5. Third-Party Services</h2>
          <p>We use third-party services like Stripe, PayPal, and Google Analytics. Their privacy policies apply accordingly.</p>
        </section>
        <section>
          <h2 className="font-bold">6. Your Rights</h2>
          <p>You may access, update, or delete your data, opt out of emails, or contact us regarding your data at any time.</p>
        </section>
        <section>
          <h2 className="font-bold">7. Children's Privacy</h2>
          <p>Our services are not directed toward children under 13. We do not knowingly collect info from them.</p>
        </section>
        <section>
          <h2 className="font-bold">8. Changes to This Policy</h2>
          <p>We may update this policy periodically. The latest version will be on our site with the effective date.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
