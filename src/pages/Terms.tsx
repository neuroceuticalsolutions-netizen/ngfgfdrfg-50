import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const BASE_URL = "https://neuroceutical.lovable.app";

const Terms = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Terms of Service"
        description="Read the terms and conditions for using the Neuroceutical Solutions website and services."
        path="/terms"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE_URL },
        { name: "Terms of Service", url: `${BASE_URL}/terms` }
      ]} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-royal-purple to-royal-purple/80">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-xl text-white mb-4">Terms of Service</h1>
          <p className="body-lg text-white/90 max-w-2xl mx-auto">
            Please read these terms carefully before using our website and services.
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

            <h2 className="heading-md text-royal-purple mb-4">1. Acceptance of Terms</h2>
            <p className="text-grey-700 mb-8">
              By accessing and using the Neuroceutical Solutions website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">2. Description of Services</h2>
            <p className="text-grey-700 mb-8">
              Neuroceutical Solutions is a sample distribution company that connects premium neuroceutical brands with South African consumers. We facilitate the distribution of free product samples and do not directly sell products to consumers. Our services include product evaluation, partnership facilitation, and market insights for partner brands.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">3. User Responsibilities</h2>
            <p className="text-grey-700 mb-6">
              When using our website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-8 space-y-2">
              <li>Provide accurate and complete information when submitting enquiries</li>
              <li>Use the website only for lawful purposes</li>
              <li>Not interfere with the proper functioning of the website</li>
              <li>Not attempt to gain unauthorised access to any part of the website</li>
              <li>Not use the website to transmit harmful or malicious content</li>
            </ul>

            <h2 className="heading-md text-royal-purple mb-4">4. Intellectual Property</h2>
            <p className="text-grey-700 mb-8">
              All content on this website, including text, graphics, logos, images, and software, is the property of Neuroceutical Solutions or its partners and is protected by South African and international copyright laws. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">5. Partner Brand Content</h2>
            <p className="text-grey-700 mb-8">
              Product information, images, and branding displayed on our website belong to their respective partner brands. We display this content with permission for informational purposes only. All trademarks and brand names are the property of their respective owners.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">6. Limitation of Liability</h2>
            <p className="text-grey-700 mb-8">
              Neuroceutical Solutions provides this website and its content on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of the information provided. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">7. Product Information</h2>
            <p className="text-grey-700 mb-8">
              While we strive to provide accurate product information, all product details are provided for informational purposes only. We recommend consulting with healthcare professionals before using any neuroceutical products. Product availability and formulations may vary.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">8. Partnership Terms</h2>
            <p className="text-grey-700 mb-8">
              Partnerships with Neuroceutical Solutions are subject to separate agreements. Submission of partnership enquiries does not guarantee acceptance. All partnership decisions are at our sole discretion based on product quality, market fit, and regulatory compliance.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">9. Modifications</h2>
            <p className="text-grey-700 mb-8">
              We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website following any changes constitutes acceptance of the modified terms.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">10. Governing Law</h2>
            <p className="text-grey-700 mb-8">
              These Terms of Service are governed by the laws of the Republic of South Africa. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the South African courts.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">11. Contact Information</h2>
            <p className="text-grey-700 mb-4">
              For questions about these Terms of Service, please contact us:
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

export default Terms;