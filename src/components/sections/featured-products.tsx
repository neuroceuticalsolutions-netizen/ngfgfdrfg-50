import { HeroButton } from "@/components/ui/hero-button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { Hand } from "lucide-react"

export const FeaturedProducts = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showIndicator, setShowIndicator] = useState(true)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap())
      setHasInteracted(true)
    }

    api.on('select', onSelect)
    onSelect()

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIndicator(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  const scrollToSlide = useCallback((index: number) => {
    api?.scrollTo(index)
    setHasInteracted(true)
  }, [api])

  return (
    <section id="featured-products" className="py-12 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="heading-lg text-royal-purple mb-3 sm:mb-6 animate-fade-in-up">
            Featured Products & Partners
          </h2>
          <p className="body-md sm:body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Discover our carefully curated selection of neuroceutical solutions, 
            sourced from trusted partners and backed by scientific research.
          </p>
        </div>

        <div className="relative mb-6 sm:mb-12">
          <Carousel className="w-full max-w-7xl mx-auto group" setApi={setApi}>
            <CarouselContent className="p-2 sm:p-4">
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-medium relative min-h-[320px] sm:min-h-[350px] lg:min-h-[400px] transition-shadow duration-200 hover:shadow-large">
                    
                    <div className="flex flex-col sm:flex-row h-full">
                      {/* Left side - Product Info */}
                      <div className="w-full sm:w-1/2 lg:w-[55%] p-4 sm:p-8 lg:p-12 flex flex-col justify-center relative z-10">
                        <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 lg:mb-3 text-center sm:text-left">{product.name}</h3>
                        <p className="text-accent font-semibold mb-4 sm:mb-6 text-center sm:text-left">Partner: {product.brand}</p>
                        
                        <p className="text-muted-foreground text-sm sm:text-lg mb-4 sm:mb-8 leading-relaxed max-w-xl">
                          {product.shortDescription}
                        </p>

                        <ul className="space-y-2 sm:space-y-3 lg:space-y-4 mb-4 sm:mb-8 lg:mb-10">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-foreground text-sm sm:text-base lg:text-lg">
                              <span className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-accent rounded-full mr-2 sm:mr-3 lg:mr-4 flex-shrink-0 flex items-center justify-center">
                                <span className="text-accent-foreground font-bold text-xs sm:text-sm">✓</span>
                              </span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <Link 
                          to={`/products/${product.slug}`}
                          className="self-center sm:self-start px-4 sm:px-8 py-2 sm:py-3 text-primary font-semibold text-sm sm:text-lg bg-secondary hover:bg-secondary/80 transition-colors rounded-lg"
                        >
                          Learn More
                        </Link>
                      </div>
                      
                      {/* Right side - Logo with gradient and diagonal edge */}
                      <div 
                        className="hidden sm:flex sm:w-1/2 lg:w-[45%] items-center justify-center relative min-h-[200px] sm:min-h-auto"
                        style={{
                          backgroundColor: product.backgroundColor,
                          clipPath: window.innerWidth >= 640 ? 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'none',
                          willChange: 'auto'
                        }}
                      >
                        <img 
                          src={product.logo} 
                          alt={`${product.brand} logo`} 
                          className="w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 object-contain transition-transform duration-200 hover:scale-105"
                          style={{
                            transform: 'translate3d(0, 0, 0)',
                            filter: 'drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.2))'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-8 lg:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-royal-purple/20 hover:bg-royal-purple/40 border-0 text-royal-purple hover:text-white backdrop-blur-sm shadow-lg transition-all duration-300" />
            <CarouselNext className="hidden sm:flex right-8 lg:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 bg-royal-purple/20 hover:bg-royal-purple/40 border-0 text-royal-purple hover:text-white backdrop-blur-sm shadow-lg transition-all duration-300" />
            
            {/* Swipe indicator for mobile */}
            {showIndicator && !hasInteracted && (
              <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white/90 rounded-full p-3 shadow-large animate-swipe-hint">
                  <Hand className="w-6 h-6 text-royal-purple" />
                </div>
              </div>
            )}
          </Carousel>

          {/* Mobile partner badges navigation */}
          <div className="flex sm:hidden flex-wrap justify-center gap-2 mt-6">
            <span className="text-sm text-grey-500 w-full text-center mb-2">Trusted Partners:</span>
            {products.map((product, index) => (
              <button 
                key={product.slug}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                  currentSlide === index 
                    ? 'bg-royal-purple text-white' 
                    : 'bg-grey-100 text-royal-purple hover:bg-grey-200'
                }`}
                onClick={() => scrollToSlide(index)}
              >
                {product.brand}
              </button>
            ))}
            <span className="px-3 py-1.5 rounded-lg text-xs font-semibold text-grey-400 bg-grey-100">More Soon...</span>
          </div>
        </div>

        <div className="text-center">
          <p className="body-md text-grey-600 mb-6">
            More partnerships coming soon. Join our newsletter to stay updated.
          </p>
          {/* Desktop partner badges with active state */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4 items-center">
            <span className="text-sm text-grey-500">Trusted Partners:</span>
            {products.map((product, index) => (
              <button 
                key={product.slug}
                className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                  currentSlide === index 
                    ? 'bg-royal-purple text-white' 
                    : 'bg-grey-100 text-royal-purple hover:bg-grey-200'
                }`}
                onClick={() => scrollToSlide(index)}
              >
                {product.brand}
              </button>
            ))}
            <span className="px-4 py-2 rounded-lg text-sm font-semibold text-grey-400 bg-grey-100">More Soon...</span>
          </div>
        </div>
      </div>
    </section>
  )
}