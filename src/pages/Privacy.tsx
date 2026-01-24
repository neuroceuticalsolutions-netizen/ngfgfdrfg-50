import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-royal-purple to-royal-purple/80">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-xl text-white mb-4">Privacy Policy</h1>
          <p className="body-lg text-white/90 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-grey-600 mb-8">
              <strong>Last Updated:</strong> January 2024
            </p>

            <h2 className="heading-md text-royal-purple mb-4">1. Information We Collect</h2>
            <p className="text-grey-700 mb-6">
              We collect information you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-8 space-y-2">
              <li>Contact information (name, email address, phone number)</li>
              <li>Business information for partnership enquiries</li>
              <li>Communication preferences and newsletter subscriptions</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h2 className="heading-md text-royal-purple mb-4">2. How We Use Your Information</h2>
            <p className="text-grey-700 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-8 space-y-2">
              <li>Respond to your enquiries and provide customer support</li>
              <li>Send newsletters and marketing communications (with your consent)</li>
              <li>Process partnership applications and sample distribution requests</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="heading-md text-royal-purple mb-4">3. Information Sharing</h2>
            <p className="text-grey-700 mb-8">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as required by law or to trusted partners who assist us in operating our website and conducting our business, provided they agree to keep this information confidential.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">4. Data Security</h2>
            <p className="text-grey-700 mb-8">
              We implement appropriate security measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">5. Cookies</h2>
            <p className="text-grey-700 mb-8">
              Our website may use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, though this may affect certain functionality of our website.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">6. Your Rights</h2>
            <p className="text-grey-700 mb-6">
              Under the Protection of Personal Information Act (POPIA), you have the right to:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-8 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to the processing of your information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>

            <h2 className="heading-md text-royal-purple mb-4">7. Contact Us</h2>
            <p className="text-grey-700 mb-4">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <p className="text-grey-700 mb-8">
              Email: <a href="mailto:info@neuroceuticalsolutions.co.za" className="text-fresh-teal hover:underline">info@neuroceuticalsolutions.co.za</a><br />
              Phone: +27 62 476 7535<br />
              Address: Pietermaritzburg, KwaZulu-Natal, South Africa
            </p>

            <div className="mt-12 pt-8 border-t border-grey-200">
              <Link to="/" className="text-royal-purple hover:text-fresh-teal font-medium">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Privacy;