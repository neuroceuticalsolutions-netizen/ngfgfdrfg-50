import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { HeroButton } from "@/components/ui/hero-button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { useState } from "react"
import { SEOHead } from "@/components/SEOHead"
import { BreadcrumbSchema } from "@/components/StructuredData"

const BASE_URL = "https://neuroceutical.lovable.app"

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const cognitiveProducts = products.filter(p => p.category === 'cognitive');
  const energyProducts = products.filter(p => p.category === 'energy');
  const performanceProducts = products.filter(p => p.category === 'performance');
  
  const getFilteredProducts = () => {
    if (selectedCategory === 'all') return products;
    return products.filter(p => p.category === selectedCategory);
  };
  
  const filteredProducts = getFilteredProducts();
  
  const productCategories = [
    {
      name: "Nootropics & Cognitive Enhancement",
      description: "Science-backed brain-enhancing supplements for focus, memory, and mental clarity",
      products: cognitiveProducts,
      category: 'cognitive'
    },
    {
      name: "Energy Optimization", 
      description: "Natural energy supplements without the crash",
      products: energyProducts,
      category: 'energy'
    },
    {
      name: "Performance Enhancement", 
      description: "Products designed to optimize physical and mental performance",
      products: performanceProducts,
      category: 'performance'
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Premium Nootropics & Brain Enhancement Products"
        description="Discover our carefully curated selection of science-backed nootropics and brain-enhancing supplements from trusted manufacturers in South Africa."
        path="/products"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE_URL },
        { name: "Products", url: `${BASE_URL}/products` }
      ]} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              Premium Nootropics & Brain Enhancement
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Discover our carefully curated selection of science-backed nootropics and brain-enhancing supplements from 
              trusted manufacturers, designed to optimize your cognitive performance and mental clarity.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary">Science-Backed</Badge>
              <Badge variant="secondary">Third-Party Tested</Badge>
              <Badge variant="secondary">Premium Quality</Badge>
              <Badge variant="secondary">Trusted Brands</Badge>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-royal-purple text-white shadow-medium'
                    : 'bg-white text-grey-700 hover:bg-grey-100 border border-grey-300'
                }`}
              >
                All Products
              </button>
              <button
                onClick={() => setSelectedCategory('cognitive')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === 'cognitive'
                    ? 'bg-royal-purple text-white shadow-medium'
                    : 'bg-white text-grey-700 hover:bg-grey-100 border border-grey-300'
                }`}
              >
                Nootropics
              </button>
              <button
                onClick={() => setSelectedCategory('energy')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === 'energy'
                    ? 'bg-royal-purple text-white shadow-medium'
                    : 'bg-white text-grey-700 hover:bg-grey-100 border border-grey-300'
                }`}
              >
                Energy
              </button>
              <button
                onClick={() => setSelectedCategory('performance')}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === 'performance'
                    ? 'bg-royal-purple text-white shadow-medium'
                    : 'bg-white text-grey-700 hover:bg-grey-100 border border-grey-300'
                }`}
              >
                Performance
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Products Display */}
      {selectedCategory === 'all' ? (
        productCategories.map((category, categoryIndex) => (
        <section key={categoryIndex} className={`pt-10 pb-20 ${categoryIndex % 2 === 1 ? 'bg-subtle-gradient' : ''}`}>
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-royal-purple mb-4">{category.name}</h2>
              <p className="body-lg text-grey-600 max-w-2xl mx-auto">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {category.products.map((product, productIndex) => (
                <div id={product.slug} key={productIndex} className="bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-large transition-shadow duration-300">
                  <div className="aspect-video bg-grey-100 relative overflow-hidden">
                    <img 
                      src={product.productImage} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90">
                        {product.brand}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="heading-sm text-grey-900">{product.name}</h3>
                    </div>
                    
                    <p className="body-md text-grey-600 mb-6">{product.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link to={`/products/${product.slug}`} className="flex-1">
                        <HeroButton variant="hero" className="w-full">
                          Get Product Info
                        </HeroButton>
                      </Link>
                      <Link to="/newsletter#recent-newsletters">
                        <HeroButton variant="outline" size="default">
                          Learn More
                        </HeroButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))
      ) : (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-royal-purple mb-4">
                {selectedCategory === 'cognitive' && 'Nootropics & Cognitive Enhancement'}
                {selectedCategory === 'energy' && 'Energy Optimization'}
                {selectedCategory === 'performance' && 'Performance Enhancement'}
              </h2>
              <p className="body-lg text-grey-600 max-w-2xl mx-auto">
                {selectedCategory === 'cognitive' && 'Science-backed brain-enhancing supplements for focus, memory, and mental clarity'}
                {selectedCategory === 'energy' && 'Natural energy supplements without the crash'}
                {selectedCategory === 'performance' && 'Products designed to optimize physical and mental performance'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredProducts.map((product, productIndex) => (
                <div id={product.slug} key={productIndex} className="bg-white rounded-2xl shadow-medium overflow-hidden hover:shadow-large transition-shadow duration-300">
                  <div className="aspect-video bg-grey-100 relative overflow-hidden">
                    <img 
                      src={product.productImage} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90">
                        {product.brand}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="heading-sm text-grey-900">{product.name}</h3>
                    </div>
                    
                    <p className="body-md text-grey-600 mb-6">{product.shortDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <Badge key={benefitIndex} variant="secondary" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3">
                      <Link to={`/products/${product.slug}`} className="flex-1">
                        <HeroButton variant="hero" className="w-full">
                          Get Product Info
                        </HeroButton>
                      </Link>
                      <Link to="/newsletter#recent-newsletters">
                        <HeroButton variant="outline" size="default">
                          Learn More
                        </HeroButton>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Our Products */}
      <section className="py-20 bg-royal-purple text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-6">Why Choose Our Products?</h2>
            <p className="body-lg opacity-90 max-w-3xl mx-auto">
              Every product in our catalog has been rigorously evaluated and meets our 
              strict standards for quality, efficacy, and safety.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-xs mb-3">Clinically Tested</h3>
              <p className="body-sm opacity-80">Backed by peer-reviewed research</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="heading-xs mb-3">Premium Quality</h3>
              <p className="body-sm opacity-80">Only the finest ingredients</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="heading-xs mb-3">Third-Party Verified</h3>
              <p className="body-sm opacity-80">Independent quality testing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="heading-xs mb-3">Customer Satisfaction</h3>
              <p className="body-sm opacity-80">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Products;