import { Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { peptideProducts } from "@/data/peptides";

const BASE_URL = "https://neuroceutical.lovable.app";

const research = [
  {
    title: "Signal Peptides",
    description:
      "Send messages to skin cells to support collagen and elastin production.",
    findings: [
      "Argireline studied for the appearance of expression lines",
      "Matrixyl 3000 evaluated in cosmetic trials for firmness support",
    ],
  },
  {
    title: "Carrier Peptides",
    description:
      "Help transport trace elements like copper deeper into the skin to support repair.",
    findings: [
      "GHK-Cu researched in dermatology for over 50 years",
      "Associated with improvements in skin density and firmness",
    ],
  },
  {
    title: "Enzyme-Inhibiting Peptides",
    description:
      "Help slow the breakdown of collagen and structural proteins in the skin.",
    findings: [
      "Leuphasyl studied for muscle micro-contractions at the skin surface",
      "Often used synergistically with Argireline in cosmetic formulas",
    ],
  },
];

const benefits = [
  "Reduce the appearance of fine lines",
  "Improve skin firmness and elasticity",
  "Support long-term skin health",
];

const testimonials = [
  {
    quote:
      "After eight weeks of using the GHK-Cu serum, my skin looks visibly smoother and more even.",
    name: "Lerato M.",
    location: "Johannesburg",
  },
  {
    quote:
      "The Argireline + Matrixyl serum has become a non-negotiable in my evening routine.",
    name: "Anika P.",
    location: "Cape Town",
  },
  {
    quote:
      "Eyeliss has genuinely made a visible difference to puffiness in the morning.",
    name: "Nadia K.",
    location: "Pretoria",
  },
];

const Peptides = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Cosmetic Peptide Skincare South Africa | GHK-Cu, Argireline & Matrixyl"
        description="Clinically active cosmetic peptide skincare for South African skin. SAHPRA-aligned, science-formulated serums with GHK-Cu, Argireline and Matrixyl 3000."
        path="/peptides"
        keywords="peptide skincare south africa, GHK-Cu south africa, argireline SA, matrixyl 3000, cosmetic peptides, anti-ageing serum south africa, copper peptide serum SA, eyeliss eye contour"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Peptides", url: `${BASE_URL}/peptides` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <Badge variant="secondary">SA-Compliant</Badge>
              <Badge variant="secondary">SAHPRA Cosmetics</Badge>
              <Badge variant="secondary">Science-Backed</Badge>
            </div>
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              Clinically Active Peptides for Visible Results
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up">
              Science-formulated topical skincare backed by peer-reviewed research —
              made for South African skin.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/peptides/products">
                <HeroButton variant="hero" size="lg">Shop Peptide Range</HeroButton>
              </Link>
              <Link to="/peptides/science">
                <HeroButton variant="outline" size="lg">Learn the Science</HeroButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How can peptides help you */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-4">How Can Peptides Help You?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-medium">
              <h3 className="heading-sm text-grey-900 mb-3">I Want Younger-Looking Skin</h3>
              <p className="body-md text-grey-600 mb-6">
                Browse our anti-ageing peptide serums and firming treatments designed
                to support smoother, firmer-looking skin.
              </p>
              <Link to="/peptides/products?category=anti-ageing">
                <HeroButton variant="hero">Shop Anti-Ageing</HeroButton>
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-medium">
              <h3 className="heading-sm text-grey-900 mb-3">I Want to Understand Peptides</h3>
              <p className="body-md text-grey-600 mb-6">
                Explore the science behind clinically active peptide ingredients and how
                they work on the skin.
              </p>
              <Link to="/peptides/science">
                <HeroButton variant="outline">Read the Science</HeroButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How peptides work */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-4">How Peptides Work</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {research.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-grey-900 mb-3">{r.title}</h3>
                <p className="body-md text-grey-600 mb-6">{r.description}</p>
                <h4 className="text-sm font-semibold text-royal-purple mb-3">Key Findings:</h4>
                <div className="space-y-3">
                  {r.findings.map((f, j) => (
                    <div key={j} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-fresh-teal rounded-full mt-2 flex-shrink-0" />
                      <p className="body-sm text-grey-600">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-royal-purple mb-4">Featured Peptide Products</h2>
            <p className="body-lg text-grey-600 max-w-2xl mx-auto">
              Each formulation is selected for its peer-reviewed cosmetic backing and
              ingredient transparency.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {peptideProducts.slice(0, 3).map((p) => (
              <div key={p.slug} className="bg-white rounded-2xl shadow-medium overflow-hidden">
                <div className="aspect-video bg-grey-100 relative">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain p-8" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-white/90">{p.brand}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="heading-sm text-grey-900 mb-2">{p.name}</h3>
                  <p className="body-sm text-grey-600 mb-4">{p.shortDescription}</p>
                  <Link to={`/peptides/products/${p.slug}`}>
                    <HeroButton variant="hero" className="w-full">View Product</HeroButton>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/peptides/products">
              <HeroButton variant="outline" size="lg">View All Peptide Products</HeroButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Trusted ingredients */}
      <section className="py-12 bg-grey-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-grey-700 tracking-wide">PEPTIDE INGREDIENTS</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["GHK-Cu", "Argireline", "Matrixyl", "Eyeliss", "Syn-Coll"].map((n) => (
              <Badge key={n} variant="outline" className="text-sm py-2 px-4">{n}</Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Science-backed benefits */}
      <section className="py-20 bg-royal-purple text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-4">Science-Backed Benefits</h2>
            <p className="body-lg opacity-90">
              Every peptide formulation is supported by peer-reviewed dermatology research
              and complies with SAHPRA cosmetics guidelines.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <div key={i} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-fresh-teal/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-fresh-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="body-md">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-royal-purple mb-4">Trusted by South Africans</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-medium">
                <div className="flex text-yellow-400 mb-4">{"★★★★★"}</div>
                <p className="body-md text-grey-700 mb-4 italic">"{t.quote}"</p>
                <p className="text-sm text-grey-500">— {t.name}, {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality commitment */}
      <section className="py-20 bg-royal-purple text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">Our Commitment to Quality</h2>
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
              <strong>Disclaimer:</strong> The information provided on this page is for
              educational and informational purposes only and is not intended as medical
              advice. These cosmetic products are not intended to diagnose, treat, cure or
              prevent any disease. Always consult with a qualified healthcare professional
              before starting any new skincare regimen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Peptides;