import { useState, useRef, useEffect, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SEOHead } from "@/components/SEOHead";
import { useCart, formatPrice } from "@/context/CartContext";
import { Loader2, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/safe-client";

const SA_PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
  "Free State",
];

type FormKey =
  | "fullName"
  | "email"
  | "phone"
  | "street"
  | "suburb"
  | "city"
  | "province"
  | "postalCode";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\+0][0-9\s]{9,14}$/;

function validateField(key: FormKey, value: string): string | null {
  if (!value.trim()) return "Required";
  if (key === "email" && !EMAIL_RE.test(value.trim())) return "Enter a valid email";
  if (key === "phone" && !PHONE_RE.test(value.trim())) return "Enter a valid SA phone number";
  if (key === "postalCode" && !/^\d{4}$/.test(value.trim())) return "Enter a 4-digit postal code";
  return null;
}

function loadGoogleMaps(apiKey: string): Promise<typeof google | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  const w = window as unknown as { google?: typeof google; __gmapsPromise?: Promise<typeof google | null> };
  if (w.google?.maps?.places) return Promise.resolve(w.google);
  if (w.__gmapsPromise) return w.__gmapsPromise;
  w.__gmapsPromise = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve((window as unknown as { google: typeof google }).google);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
  return w.__gmapsPromise;
}

const Checkout = () => {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Record<FormKey, string>>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    suburb: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [touched, setTouched] = useState<Record<FormKey, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    street: false,
    suburb: false,
    city: false,
    province: false,
    postalCode: false,
  });
  const payformRef = useRef<HTMLFormElement>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  const handleChange = (k: FormKey) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleBlur = (k: FormKey) => () => setTouched((t) => ({ ...t, [k]: true }));

  // Google Places Autocomplete
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
    if (!apiKey || !streetRef.current) return;
    let ac: google.maps.places.Autocomplete | null = null;
    let cancelled = false;
    loadGoogleMaps(apiKey).then((g) => {
      if (cancelled || !g || !streetRef.current) return;
      ac = new g.maps.places.Autocomplete(streetRef.current, {
        componentRestrictions: { country: "za" },
        fields: ["address_components"],
      });
      ac.addListener("place_changed", () => {
        const place = ac!.getPlace();
        const comps = place.address_components ?? [];
        const get = (types: string[]) =>
          comps.find((c) => types.some((t) => c.types.includes(t)))?.long_name ?? "";
        const streetNumber = get(["street_number"]);
        const route = get(["route"]);
        const street = [streetNumber, route].filter(Boolean).join(" ");
        const suburb = get(["sublocality_level_1", "neighborhood", "sublocality"]);
        const city = get(["locality", "postal_town"]);
        const province = get(["administrative_area_level_1"]);
        const postalCode = get(["postal_code"]);
        setForm((f) => ({
          ...f,
          street: street || f.street,
          suburb: suburb || f.suburb,
          city: city || f.city,
          province: province || f.province,
          postalCode: postalCode || f.postalCode,
        }));
        setTouched((t) => ({ ...t, street: true, suburb: true, city: true, province: true, postalCode: true }));
      });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const fieldKeys: FormKey[] = ["fullName", "email", "phone", "street", "suburb", "city", "province", "postalCode"];
  const errors = fieldKeys.reduce<Record<FormKey, string | null>>((acc, k) => {
    acc[k] = validateField(k, form[k]);
    return acc;
  }, {} as Record<FormKey, string | null>);
  const isFormValid = fieldKeys.every((k) => !errors[k]);

  const fieldClass = (k: FormKey) => {
    if (!touched[k]) return "";
    return errors[k]
      ? "border-red-400 focus-visible:ring-red-300"
      : "border-green-400 focus-visible:ring-green-300";
  };

  const FieldError = ({ k }: { k: FormKey }) =>
    touched[k] && errors[k] ? <p className="text-xs text-red-600 mt-1">{errors[k]}</p> : null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(fieldKeys.reduce((acc, k) => ({ ...acc, [k]: true }), {} as Record<FormKey, boolean>));
    if (!isFormValid) return;
    setLoading(true);
    setError(null);

    const address = `${form.street}, ${form.suburb}, ${form.city}, ${form.province}, ${form.postalCode}`;
    const customer = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      address,
    };

    try {
      const { data, error: fnError } = await supabase.functions.invoke("create-payfast-payment", {
        body: { items, subtotal, customer },
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
                  <Input
                    id="fullName"
                    required
                    value={form.fullName}
                    onChange={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    className={fieldClass("fullName")}
                  />
                  <FieldError k="fullName" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      className={fieldClass("email")}
                    />
                    <FieldError k="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      placeholder="+27 XX XXX XXXX"
                      pattern="[\+0][0-9\s]{9,14}"
                      value={form.phone}
                      onChange={handleChange("phone")}
                      onBlur={handleBlur("phone")}
                      className={fieldClass("phone")}
                    />
                    <p className="text-xs text-grey-500 mt-1">Format: +27 82 123 4567 or 082 123 4567</p>
                    <FieldError k="phone" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">Street Address (South Africa only)</Label>
                  <Input
                    id="street"
                    ref={streetRef}
                    required
                    autoComplete="street-address"
                    placeholder="Start typing your address…"
                    value={form.street}
                    onChange={handleChange("street")}
                    onBlur={handleBlur("street")}
                    className={fieldClass("street")}
                  />
                  <FieldError k="street" />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suburb">Suburb</Label>
                    <Input
                      id="suburb"
                      required
                      value={form.suburb}
                      onChange={handleChange("suburb")}
                      onBlur={handleBlur("suburb")}
                      className={fieldClass("suburb")}
                    />
                    <FieldError k="suburb" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      value={form.city}
                      onChange={handleChange("city")}
                      onBlur={handleBlur("city")}
                      className={fieldClass("city")}
                    />
                    <FieldError k="city" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="province">Province</Label>
                    <select
                      id="province"
                      required
                      value={form.province}
                      onChange={handleChange("province")}
                      onBlur={handleBlur("province")}
                      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${fieldClass("province")}`}
                    >
                      <option value="">Select province</option>
                      {SA_PROVINCES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <FieldError k="province" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      value={form.postalCode}
                      onChange={handleChange("postalCode")}
                      onBlur={handleBlur("postalCode")}
                      className={fieldClass("postalCode")}
                    />
                    <FieldError k="postalCode" />
                  </div>
                </div>

                {error && (
                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <HeroButton variant="hero" type="submit" className="w-full" disabled={loading || !isFormValid}>
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