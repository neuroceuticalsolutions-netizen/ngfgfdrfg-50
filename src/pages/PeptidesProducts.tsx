import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { peptideProducts, peptideCategories, type PeptideCategory } from "@/data/peptides";
import { useCart, parsePrice } from "@/context/CartContext";
import { Check } from "lucide-react";

const BASE_URL = "https://neuroceutical.lovable.app";

const PeptidesProducts = () => {
  const [searchParams] = useSearchParams();
  const initialCat = (searchParams.get("category") as PeptideCategory) || "all";
  const [active, setActive] = useState<"all" | PeptideCategory>(initialCat);
  const [query, setQuery] = useState("");
  const { addItem, openCart } = useCart();
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  const handleAdd = (p: typeof peptideProducts[number]) => {
    addItem({ slug: p.slug, name: p.name, price: parsePrice(p.price), image: p.image });
    setAddedSlug(p.slug);
    openCart();
    setTimeout(() => setAddedSlug((s) => (s === p.slug ? null : s)), 1500);
  };

  const filtered = peptideProducts.filter((p) => {
    const catMatch = active === "all" || p.category === active;
    const q = query.trim().toLowerCase();
    const queryMatch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.benefits.some((b) => b.toLowerCase().includes(q));
    return catMatch && queryMatch;
  });

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Peptide Skincare Products | Neuroceutical Peptides SA"
        description="Premium cosmetic peptide skincare verified for safety and efficacy under SAHPRA cosmetics guidelines. GHK-Cu, Argireline, Matrixyl, Eyeliss & Syn-Coll."
        path="/peptides/products"
        keywords="peptide serum south africa, GHK-Cu serum, argireline matrixyl serum, eyeliss eye contour, syn-coll firming, copper zinc brightening serum"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Peptides", url: `${BASE_URL}/peptides` },
          { name: "Products", url: `${BASE_URL}/peptides/products` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6">Premium Peptide Skincare</h1>
            <p className="body-lg text-grey-600 mb-8">
              Every formulation verified for safety and efficacy under SAHPRA cosmetics guidelines.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="secondary">Science-Backed</Badge>
              <Badge variant="secondary">Third-Party Tested</Badge>
              <Badge variant="secondary">Premium Quality</Badge>
              <Badge variant="secondary">Trusted Ingredients</Badge>
            </div>

            <form role="search" onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto mb-6">
              <label htmlFor="peptide-search" className="sr-only">Search peptide products</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-grey-500" />
                <Input
                  id="peptide-search"
                  type="search"
                  placeholder="Search peptide products…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-11 h-12 rounded-full bg-white border-grey-300"
                />
              </div>
            </form>

            <div className="flex flex-wrap justify-center gap-3">
              {peptideCategories.map((c) => (
                <button
                  key={c.key}
                  onClick={() => setActive(c.key)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    active === c.key
                      ? "bg-royal-purple text-white shadow-medium"
                      : "bg-white text-grey-700 hover:bg-grey-100 border border-grey-300"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {filtered.length === 0 ? (
            <p className="text-center body-md text-grey-600">No peptide products match your filters.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filtered.map((p) => (
                <div key={p.slug} className="bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-large transition-shadow duration-300">
                  <div className="aspect-video bg-grey-100 relative overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain p-8" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90">{p.brand}</Badge>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="heading-sm text-grey-900">{p.name}</h3>
                      <span className="text-royal-purple font-bold">{p.price}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400 text-sm">
                        {"★".repeat(Math.floor(p.rating))}
                        {p.rating % 1 !== 0 && "☆"}
                      </div>
                      <span className="text-xs text-grey-500">({p.rating})</span>
                    </div>
                    <p className="body-md text-grey-600 mb-6">{p.shortDescription}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.benefits.map((b, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{b}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <HeroButton
                        variant="hero"
                        className="flex-1"
                        onClick={() => handleAdd(p)}
                      >
                        {addedSlug === p.slug ? (
                          <span className="inline-flex items-center gap-1"><Check className="w-4 h-4" /> Added!</span>
                        ) : (
                          "Add to Cart"
                        )}
                      </HeroButton>
                      <Link to={`/peptides/products/${p.slug}`}>
                        <HeroButton variant="outline">Learn More</HeroButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why choose */}
      <section className="py-20 bg-royal-purple text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Why Choose Our Peptides?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              "SAHPRA Cosmetics Compliant",
              "Third-Party Ingredient Verified",
              "No Prohibited Substances",
              "30-Day Satisfaction Guarantee",
            ].map((label, i) => (
              <div key={i}>
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-fresh-teal/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-fresh-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="body-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-grey-100 border-t border-grey-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="body-sm text-grey-500">
              <strong>Disclaimer:</strong> The information on this page is for educational
              purposes only. These cosmetic products are not intended to diagnose, treat,
              cure or prevent any disease. Always consult a qualified healthcare professional
              before starting any new skincare regimen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PeptidesProducts;