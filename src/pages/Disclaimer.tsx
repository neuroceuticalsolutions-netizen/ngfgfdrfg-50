import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const Disclaimer = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Disclaimer"
        description="Important information about Neuroceutical Solutions products, health disclaimers, and SAHPRA compliance notices."
        path="/disclaimer"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-royal-purple to-royal-purple/80">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-xl text-white mb-4">Disclaimer</h1>
          <p className="body-lg text-white/90 max-w-2xl mx-auto">
            Important information about our products and the content on this website.
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

            {/* Important Notice Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-10">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Health Notice</h3>
                  <p className="text-amber-700">
                    The information provided on this website is for educational and informational purposes only and is not intended as medical advice. Always consult with a qualified healthcare professional before starting any supplement regimen.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="heading-md text-royal-purple mb-4">Health & Medical Disclaimer</h2>
            <p className="text-grey-700 mb-6">
              The products featured on this website are neuroceutical supplements intended to support cognitive function and mental well-being. These statements have not been evaluated by the South African Health Products Regulatory Authority (SAHPRA).
            </p>
            <p className="text-grey-700 mb-8">
              <strong>These products are not intended to diagnose, treat, cure, or prevent any disease.</strong> If you have a medical condition or are taking medication, consult your healthcare provider before using any supplements.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Educational Content</h2>
            <p className="text-grey-700 mb-8">
              All scientific information, research references, and educational content on this website are provided for informational purposes only. While we strive to present accurate and up-to-date information, the science of neuroceuticals is continuously evolving. We encourage readers to conduct their own research and consult healthcare professionals for personalised advice.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Product Information</h2>
            <p className="text-grey-700 mb-6">
              Product descriptions, ingredient lists, and benefits are provided by our partner brands and are presented in good faith. However:
            </p>
            <ul className="list-disc pl-6 text-grey-700 mb-8 space-y-2">
              <li>Formulations may change without notice</li>
              <li>Individual results may vary significantly</li>
              <li>Not all products may be suitable for all individuals</li>
              <li>Some ingredients may interact with medications or medical conditions</li>
              <li>Product availability and specifications may differ from what is displayed</li>
            </ul>

            <h2 className="heading-md text-royal-purple mb-4">Sample Distribution</h2>
            <p className="text-grey-700 mb-8">
              Neuroceutical Solutions is a sample distribution company. We facilitate the distribution of free product samples from partner brands and do not make any direct sales to consumers. By accepting samples, you acknowledge that you are doing so at your own risk and that you have reviewed all product information and consulted with healthcare professionals as appropriate.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Age Restrictions</h2>
            <p className="text-grey-700 mb-8">
              The products featured on this website are intended for adults aged 18 and older. Some products may have additional age restrictions. Keep all supplements out of reach of children.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Allergens & Sensitivities</h2>
            <p className="text-grey-700 mb-8">
              Some products may contain allergens or ingredients that could cause adverse reactions in sensitive individuals. Always read product labels carefully and consult with a healthcare provider if you have allergies, sensitivities, or dietary restrictions.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Third-Party Content</h2>
            <p className="text-grey-700 mb-8">
              This website may contain links to third-party websites, scientific studies, or external resources. We are not responsible for the content, accuracy, or practices of these external sites. Inclusion of any link does not imply endorsement.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Limitation of Liability</h2>
            <p className="text-grey-700 mb-8">
              Neuroceutical Solutions, its directors, employees, and affiliates shall not be held liable for any adverse effects, damages, or consequences arising from the use or misuse of products distributed through our network or information provided on this website. Use of any products is at your own risk.
            </p>

            <h2 className="heading-md text-royal-purple mb-4">Contact Us</h2>
            <p className="text-grey-700 mb-4">
              If you have questions or concerns about this disclaimer, please contact us:
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

export default Disclaimer;