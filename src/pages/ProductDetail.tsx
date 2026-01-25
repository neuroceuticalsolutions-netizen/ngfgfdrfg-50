import { useParams, Navigate, Link } from "react-router-dom";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/data/products";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SEOHead } from "@/components/SEOHead";
import { ProductSchema, BreadcrumbSchema } from "@/components/StructuredData";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/products" replace />;
  }
  
  const product = getProductBySlug(slug);
  
  if (!product) {
    return <Navigate to="/products" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title={product.name}
        description={product.shortDescription}
        path={`/products/${slug}`}
        type="product"
      />
      <ProductSchema 
        name={product.name}
        description={product.shortDescription}
        image={product.productImage}
        brand={product.brand}
        category={product.category}
        rating={product.rating}
        reviewCount={product.reviewCount}
        slug={slug}
      />
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: "https://neuroceutical.lovable.app/" },
          { name: "Products", url: "https://neuroceutical.lovable.app/products" },
          { name: product.name, url: `https://neuroceutical.lovable.app/products/${slug}` }
        ]}
      />
      <Navigation />
      
      {/* Breadcrumb */}
      <section className="pt-32 pb-8">
          <div className="container mx-auto px-4 sm:px-6">
          <nav className="text-sm text-grey-500">
            <Link to="/" className="hover:text-royal-purple">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/products#${slug}`} className="hover:text-royal-purple">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-grey-700">{product.name}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Product Image Carousel */}
            <div className="aspect-square bg-grey-100 rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
                className="w-full h-full"
              >
                <CarouselContent className="h-full">
                  {product.carouselImages.map((image, index) => (
                    <CarouselItem key={index}>
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className="w-full h-full object-contain p-8"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
            
            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="secondary">{product.category}</Badge>
                {product.inStock && <Badge className="bg-green-100 text-green-800">In Stock</Badge>}
              </div>
              
              <h1 className="heading-xl text-royal-purple mb-4 break-words">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-6">
                <div className="flex text-yellow-400">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && "☆"}
                </div>
                <span className="text-sm text-grey-500">({product.reviewCount} reviews)</span>
              </div>
              
              <p className="body-lg text-grey-600 mb-8">{product.fullDescription}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.benefits.map((benefit, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {benefit}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-4">
                <HeroButton variant="hero" className="flex-1" asChild>
                  <Link to="/contact">Contact to Order</Link>
                </HeroButton>
                <HeroButton variant="outline" className="flex-1" asChild>
                  <a href={product.newsUrl} target="_blank" rel="noopener noreferrer">
                    News Blog
                  </a>
                </HeroButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20 bg-grey-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Key Ingredients */}
              <div>
                <h3 className="heading-sm text-royal-purple mb-6">Key Ingredients</h3>
                <ul className="space-y-3">
                  {product.keyIngredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-royal-purple rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="body-md text-grey-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Usage Instructions */}
              <div>
                <h3 className="heading-sm text-royal-purple mb-6">How to Use</h3>
                <p className="body-md text-grey-700">{product.usage}</p>
              </div>
            </div>
            
            {/* Scientific Backing */}
            <div className="mt-12">
              <h3 className="heading-sm text-royal-purple mb-6">Scientific Research</h3>
              <p className="body-md text-grey-700">{product.scientificBacking}</p>
            </div>
            
            {/* Partner Information */}
            <div className="mt-12 p-8 bg-white rounded-2xl shadow-medium">
              <div className="flex items-center gap-6 mb-6">
                <img 
                  src={product.logo} 
                  alt={`${product.brand} logo`}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="heading-sm text-royal-purple mb-2">About {product.brand}</h3>
                  <p className="body-md text-grey-700">{product.partnerInfo}</p>
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
              <strong>Disclaimer:</strong> The information provided on this page is for educational and informational purposes only and is not intended as medical advice. 
              It should not be used to diagnose, treat, cure, or prevent any disease. Always consult with a qualified healthcare professional before starting any new supplement regimen.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProductDetail;