import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const BASE_URL = "https://neuroceutical.lovable.app";

const Privacy = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Privacy Policy | POPIA Compliance | Neuroceutical SA"
        description="How Neuroceutical Solutions collects, uses and protects your personal data in full compliance with South Africa's POPIA regulations."
        path="/privacy"
        keywords="POPIA privacy policy south africa, neuroceutical privacy, data protection SA, nootropics website privacy"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE_URL },
        { name: "Privacy Policy", url: `${BASE_URL}/privacy` }
      ]} />
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
              <strong>Last Updated:</strong> May 2026
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

            <h2 className="heading-md text-royal-purple mb-4">6. Email Log Retention</h2>
            <p className="text-grey-700 mb-4">
              When we send you an email (such as a newsletter, partnership update, or account notification), we keep a short delivery record so we can troubleshoot bounces, prevent spam, and prove that consented messages were actually sent. Each record contains:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-6 space-y-2">
              <li>The template name (e.g. <em>partner-application-submitted</em>)</li>
              <li>The recipient email address</li>
              <li>A salted SHA-256 hash of the originating IP address — <strong>never the raw IP</strong></li>
              <li>The delivery status (pending, sent, failed, bounced, complained, suppressed)</li>
              <li>Any error message returned by the email provider</li>
              <li>The timestamp of the delivery attempt</li>
            </ul>
            <p className="text-grey-700 mb-4">
              <strong>Retention period:</strong> Email log entries are automatically and permanently deleted <strong>90 days</strong> after they are created. A scheduled cleanup job runs every day at 03:15 UTC and removes any entry older than 90 days. Records are append-only until then — we do not modify entries after they are written.
            </p>
            <p className="text-grey-700 mb-4">
              <strong>How deletion works:</strong>
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-6 space-y-2">
              <li><strong>Automatic purge:</strong> A daily database job permanently deletes any log entry older than 90 days. Once deleted, entries cannot be recovered.</li>
              <li><strong>Right-to-erasure requests:</strong> If you ask us to delete your personal data, we will remove your entries from the email log and unsubscribe-token records alongside any account data, even if they are not yet 90 days old.</li>
              <li><strong>Suppression list:</strong> If your address has bounced, complained, or unsubscribed, we keep it on a separate suppression list for as long as needed to prevent us from emailing you again. This is required to honour your opt-out and is retained even if the corresponding log entry has been purged.</li>
            </ul>
            <p className="text-grey-700 mb-8">
              Email log records are visible only to authorised administrators. To request deletion of your email log entries, contact us using the details in section 8.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">7. Your Rights</h2>
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

            <h2 className="heading-md text-royal-purple mb-4">8. Contact Us</h2>
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