import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { useCart, formatPrice } from "@/context/CartContext";
import { CheckCircle2, Info } from "lucide-react";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "" });

  const handleChange = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Checkout | Neuroceutical Peptides" description="Complete your peptide skincare order." path="/checkout" />
      <Navigation />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="heading-xl text-royal-purple mb-8">Checkout</h1>

          {submitted ? (
            <div className="bg-white rounded-2xl shadow-medium p-12 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-fresh-teal/20 mx-auto mb-6 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-fresh-teal" />
              </div>
              <h2 className="heading-lg text-royal-purple mb-4">Order Received</h2>
              <p className="body-md text-grey-700 mb-8">
                Thank you! We have received your order and will contact you within 24 hours to
                confirm payment and delivery.
              </p>
              <Link to="/peptides/products">
                <HeroButton variant="hero">Continue Shopping</HeroButton>
              </Link>
            </div>
          ) : items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-medium p-12 text-center max-w-2xl mx-auto">
              <h2 className="heading-sm text-royal-purple mb-4">Your cart is empty</h2>
              <p className="body-md text-grey-600 mb-6">Browse our peptide products to get started.</p>
              <Link to="/peptides/products">
                <HeroButton variant="hero">Browse Peptides</HeroButton>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl shadow-medium p-8 space-y-6">
                <h2 className="heading-sm text-royal-purple">Delivery Details</h2>

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" required value={form.fullName} onChange={handleChange("fullName")} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required value={form.email} onChange={handleChange("email")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" required value={form.phone} onChange={handleChange("phone")} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address (South Africa only)</Label>
                  <Textarea id="address" required rows={4} value={form.address} onChange={handleChange("address")} />
                </div>

                <div className="rounded-xl bg-fresh-teal/10 border border-fresh-teal/30 p-4 flex gap-3">
                  <Info className="w-5 h-5 text-fresh-teal flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-grey-900 text-sm">Payment coming soon</p>
                    <p className="text-sm text-grey-700">
                      Online payment is being set up. We will contact you within 24 hours to confirm your
                      order and arrange payment and delivery.
                    </p>
                  </div>
                </div>

                <HeroButton variant="hero" type="submit" className="w-full">Submit Order</HeroButton>
              </form>

              {/* Summary */}
              <aside className="bg-white rounded-2xl shadow-medium p-6 h-fit">
                <h2 className="heading-sm text-royal-purple mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {items.map((i) => (
                    <div key={i.slug} className="flex justify-between text-sm gap-4">
                      <span className="text-grey-700">
                        {i.name} <span className="text-grey-500">× {i.quantity}</span>
                      </span>
                      <span className="font-medium text-grey-900 whitespace-nowrap">
                        {formatPrice(i.price * i.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-grey-200 pt-4 flex justify-between">
                  <span className="font-medium text-grey-900">Subtotal</span>
                  <span className="font-bold text-royal-purple text-lg">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-grey-500 mt-2">Shipping confirmed on contact.</p>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Checkout;