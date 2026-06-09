import { Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { XCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const CheckoutCancel = () => (
  <main className="min-h-screen bg-background">
    <SEOHead title="Payment Cancelled | Neuroceutical Peptides" description="Your payment was cancelled." path="/checkout/cancel" />
    <Navigation />
    <section className="pt-32 pb-16">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-medium p-12">
          <div className="w-16 h-16 rounded-full bg-red-100 mx-auto mb-6 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="heading-lg text-royal-purple mb-4">Payment Cancelled</h1>
          <p className="body-md text-grey-700 mb-8">
            Your payment was cancelled. Your cart has been saved — you can try again when you're ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/checkout">
              <HeroButton variant="hero">Try Again</HeroButton>
            </Link>
            <Link to="/peptides/products">
              <HeroButton variant="outline">Browse Products</HeroButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </main>
);

export default CheckoutCancel;