import { useState, useRef, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { useCart, formatPrice } from "@/context/CartContext";
import { Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/safe-client";

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "" });
  const payformRef = useRef<HTMLFormElement>(null);

  const handleChange = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-payfast-payment", {
        body: { items, subtotal, customer: form },
      });

      if (fnError) throw new Error(fnError.message);
      if (!data?.payfast_url || !data?.payload) throw new Error("Invalid response from payment server.");

      const form_el = payformRef.current!;
      form_el.action = data.payfast_url;
      form_el.method = "POST";
      form_el.innerHTML = "";
      for (const [key, value] of Object.entries(data.payload as Record<string, string>)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form_el.appendChild(input);
      }

      clearCart();
      form_el.submit();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead title="Checkout | Neuroceutical Peptides" description="Complete your peptide skincare order." path="/checkout" />
      <Navigation />

      <form ref={payformRef} style={{ display: "none" }} />

      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="heading-xl text-royal-purple mb-8">Checkout</h1>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-medium p-12 text-center max-w-2xl mx-auto">
              <h2 className="heading-sm text-royal-purple mb-4">Your cart is empty</h2>
              <p className="body-md text-grey-600 mb-6">Browse our peptide products to get started.</p>
              <Link to="/peptides/products">
                <HeroButton variant="hero">Browse Peptides</HeroButton>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
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

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <HeroButton variant="hero" type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Redirecting to payment…
                    </span>
                  ) : (
                    "Pay Now with PayFast"
                  )}
                </HeroButton>

                <p className="text-xs text-grey-500 text-center">
                  You will be redirected to PayFast to complete your payment securely. We accept card, EFT, and SnapScan.
                </p>
              </form>

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
                <p className="text-xs text-grey-500 mt-2">Shipping calculated at delivery confirmation.</p>
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