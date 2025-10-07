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
    <section id="featured-products" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-royal-purple mb-6 animate-fade-in-up">
            Featured Products & Partners
          </h2>
          <p className="body-md sm:body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Discover our carefully curated selection of neuroceutical solutions, 
            sourced from trusted partners and backed by scientific research.
          </p>
        </div>

        <div className="relative mb-12">
          <Carousel className="w-full max-w-6xl mx-auto group" setApi={setApi}>
            <CarouselContent className="p-4">
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-medium relative min-h-[400px] sm:min-h-[300px] transition-shadow duration-200 hover:shadow-large">
                    {/* Mobile background image */}
                    <div 
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-20 sm:hidden"
                      style={{
                        backgroundImage: `url(${product.logo})`,
                        backgroundColor: product.backgroundColor,
                        backgroundBlendMode: 'overlay'
                      }}
                    />
                    {/* Mobile overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/20 sm:hidden" />
                    
                    <div className="flex flex-col sm:flex-row h-full">
                      {/* Left side - Product Info */}
                      <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center relative z-10">
                        <h3 className="text-xl sm:text-3xl font-bold text-white sm:text-primary mb-2 text-center">{product.name}</h3>
                        <p className="text-white/90 sm:text-accent font-semibold mb-6 text-center">Partner: {product.brand}</p>
                        
                        <p className="text-white/80 sm:text-muted-foreground text-sm sm:text-lg mb-6 sm:mb-8 leading-relaxed max-w-xl">
                          {product.shortDescription}
                        </p>

                        <ul className="space-y-2 sm:space-y-4 mb-6 sm:mb-10">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-white sm:text-foreground text-sm sm:text-lg">
                              <span className="w-4 h-4 sm:w-6 sm:h-6 bg-white/80 sm:bg-accent rounded-full mr-2 sm:mr-4 flex-shrink-0 flex items-center justify-center">
                                <span className="text-black sm:text-accent-foreground font-bold text-xs sm:text-sm">✓</span>
                              </span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <Link 
                          to={`/products/${product.slug}`}
                          className="self-center px-4 sm:px-8 py-2 sm:py-3 text-white sm:text-primary font-semibold text-sm sm:text-lg bg-white/20 sm:bg-transparent hover:bg-white/30 sm:hover:bg-secondary transition-colors rounded-lg border border-white/40 sm:border-transparent"
                        >
                          Learn More
                        </Link>
                      </div>
                      
                      {/* Right side - Logo with gradient and diagonal edge */}
                      <div 
                        className="hidden sm:flex sm:w-1/2 items-center justify-center relative min-h-[200px] sm:min-h-auto"
                        style={{
                          backgroundColor: product.backgroundColor,
                          clipPath: window.innerWidth >= 640 ? 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' : 'none',
                          willChange: 'auto'
                        }}
                      >
                        <img 
                          src={product.logo} 
                          alt={`${product.brand} logo`} 
                          className="w-24 h-24 sm:w-40 sm:h-40 object-contain transition-transform duration-200 hover:scale-105" 
                          style={{
                            filter: 'brightness(0) invert(1)',
                            transform: 'translate3d(0, 0, 0)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex left-16 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-border shadow-medium opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="hidden sm:flex left-auto right-[calc(55%-310px)] top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white border-border shadow-medium opacity-70 hover:opacity-100 transition-opacity duration-300" />
            
            {/* Swipe indicator for mobile */}
            {showIndicator && !hasInteracted && (
              <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white/90 rounded-full p-3 shadow-large animate-swipe-hint">
                  <Hand className="w-6 h-6 text-royal-purple" />
                </div>
              </div>
            )}
          </Carousel>

          {/* Mobile slider indicator */}
          <div className="flex sm:hidden justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index)
                  setHasInteracted(true)
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-8 bg-royal-purple' 
                    : 'w-2 bg-grey-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="body-md text-grey-600 mb-6">
            More partnerships coming soon. Join our newsletter to stay updated.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center">
            <span className="text-sm text-grey-500">Trusted Partners:</span>
            <div 
              className="bg-grey-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(0)}
            >
              ZYN
            </div>
            <div 
              className="bg-grey-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(1)}
            >
              EU Natural
            </div>
            <div 
              className="bg-grey-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(2)}
            >
              USN
            </div>
            <div 
              className="bg-grey-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(3)}
            >
              Naoki
            </div>
            <div className="bg-grey-100 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold text-grey-400">More Soon...</div>
          </div>
        </div>
      </div>
    </section>
  )
}