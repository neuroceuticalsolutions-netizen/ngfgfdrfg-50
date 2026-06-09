import { useSearchParams, Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { CheckCircle2 } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

const CheckoutSuccess = () => {
  const [params] = useSearchParams();
  const orderId = params.get("order_id");

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Order Confirmed | Neuroceutical Peptides" description="Your order has been placed successfully." path="/checkout/success" />
      <Navigation />
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-medium p-12">
            <div className="w-16 h-16 rounded-full bg-fresh-teal/20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-fresh-teal" />
            </div>
            <h1 className="heading-lg text-royal-purple mb-4">Payment Confirmed</h1>
            <p className="body-md text-grey-700 mb-2">
              Thank you for your order! Your payment has been received.
            </p>
            {orderId && (
              <p className="text-sm text-grey-500 mb-8">Order reference: <span className="font-mono text-royal-purple">{orderId}</span></p>
            )}
            <p className="body-md text-grey-700 mb-8">
              We will be in touch within 1–2 business days to confirm your delivery details.
            </p>
            <Link to="/peptides/products">
              <HeroButton variant="hero">Continue Shopping</HeroButton>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default CheckoutSuccess;