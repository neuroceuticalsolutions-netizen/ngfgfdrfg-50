import { Link, Navigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import { getPeptideBySlug } from "@/data/peptides";
import { useCart, parsePrice } from "@/context/CartContext";
import { useState } from "react";
import { Check } from "lucide-react";

const BASE_URL = "https://neuroceutical.lovable.app";

const PeptideDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return <Navigate to="/peptides/products" replace />;
  const product = getPeptideBySlug(slug);
  if (!product) return <Navigate to="/peptides/products" replace />;

  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ slug: product.slug, name: product.name, price: parsePrice(product.price), image: product.image });
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title={`${product.name} | Peptide Skincare South Africa`}
        description={`${product.shortDescription} Cosmetic peptide skincare from Neuroceutical Peptides, South Africa.`}
        path={`/peptides/products/${slug}`}
        type="product"
        image={product.image}
        keywords={`${product.name} south africa, ${product.categoryLabel} peptide serum, peptide skincare SA`}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Peptides", url: `${BASE_URL}/peptides` },
          { name: "Products", url: `${BASE_URL}/peptides/products` },
          { name: product.name, url: `${BASE_URL}/peptides/products/${slug}` },
        ]}
      />
      <Navigation />

      {/* Breadcrumb */}
      <section className="pt-32 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-sm text-grey-500">
            <Link to="/" className="hover:text-royal-purple">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/peptides" className="hover:text-royal-purple">Peptides</Link>
            <span className="mx-2">/</span>
            <Link to="/peptides/products" className="hover:text-royal-purple">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-grey-700">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="aspect-square bg-grey-100 rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-full h-full object-contain p-8" />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="secondary">{product.categoryLabel}</Badge>
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
              </div>

              <h1 className="heading-xl text-royal-purple mb-4 break-words">{product.name}</h1>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && "☆"}
                </div>
                <span className="text-sm text-grey-500">({product.rating})</span>
                <span className="text-royal-purple font-bold text-xl ml-2">{product.price}</span>
              </div>

              <p className="body-lg text-grey-600 mb-8">{product.fullDescription}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {product.benefits.map((b, i) => (
                  <Badge key={i} variant="secondary" className="text-sm">{b}</Badge>
                ))}
              </div>

              <div className="flex gap-4">
                <HeroButton variant="hero" className="flex-1" onClick={handleAdd}>
                  {added ? (
                    <span className="inline-flex items-center gap-1"><Check className="w-4 h-4" /> Added!</span>
                  ) : (
                    "Add to Cart"
                  )}
                </HeroButton>
                <HeroButton variant="outline" className="flex-1" asChild>
                  <Link to="/peptides/science">Learn More</Link>
                </HeroButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingredients & usage */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="heading-sm text-royal-purple mb-6">Key Ingredients</h3>
                <ul className="space-y-3">
                  {product.keyIngredients.map((ing, i) => (
                    <li key={i} className="flex items-start">
                      <span className="w-2 h-2 bg-royal-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <span className="body-md text-grey-700">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="heading-sm text-royal-purple mb-6">How to Use</h3>
                <p className="body-md text-grey-700">{product.usage}</p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="heading-sm text-royal-purple mb-6">Scientific Research</h3>
              <p className="body-md text-grey-700">{product.scientificResearch}</p>
            </div>

            <div className="mt-12 p-8 bg-white rounded-2xl shadow-medium">
              <div className="flex items-center gap-6 mb-2">
                <div className="w-20 h-20 rounded-xl bg-royal-purple/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-10 h-10 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 9h-6L8 4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="heading-sm text-royal-purple mb-2">About {product.aboutIngredient.name}</h3>
                  <p className="body-md text-grey-700">{product.aboutIngredient.description}</p>
                </div>
              </div>
            </div>
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
              advice. This cosmetic product is not intended to diagnose, treat, cure or
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

export default PeptideDetail;