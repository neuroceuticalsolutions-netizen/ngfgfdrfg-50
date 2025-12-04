import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"
import { Hand, Check } from "lucide-react"

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
        <div className="text-center mb-12">
          <h2 className="heading-lg text-royal-purple mb-4 animate-fade-in-up">
            Featured Products & Partners
          </h2>
          <p className="body-md text-grey-600 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Discover our carefully curated selection of neuroceutical solutions, 
            sourced from trusted partners and backed by scientific research.
          </p>
        </div>

        <div className="relative mb-8">
          <Carousel className="w-full max-w-md mx-auto" setApi={setApi}>
            <CarouselContent>
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="bg-grey-50 rounded-2xl p-6 shadow-soft">
                    <h3 className="text-xl font-bold text-royal-purple mb-1 text-center">
                      {product.name}
                    </h3>
                    <p className="text-fresh-teal font-medium mb-4 text-center text-sm">
                      Partner: {product.brand}
                    </p>
                    
                    <p className="text-grey-600 text-sm mb-5 text-center leading-relaxed">
                      {product.shortDescription}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {product.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-grey-700 text-sm">
                          <Check className="w-4 h-4 text-fresh-teal mr-2 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-center">
                      <Link 
                        to={`/products/${product.slug}`}
                        className="px-6 py-2.5 bg-white text-royal-purple font-semibold text-sm rounded-lg border border-grey-200 hover:bg-grey-100 transition-colors shadow-sm"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 bg-white hover:bg-grey-50 border-grey-200 shadow-soft" />
            <CarouselNext className="hidden sm:flex -right-12 bg-white hover:bg-grey-50 border-grey-200 shadow-soft" />
            
            {/* Swipe indicator for mobile */}
            {showIndicator && !hasInteracted && (
              <div className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <div className="bg-white/90 rounded-full p-3 shadow-large animate-swipe-hint">
                  <Hand className="w-6 h-6 text-royal-purple" />
                </div>
              </div>
            )}
          </Carousel>

          {/* Slider indicator dots */}
          <div className="flex justify-center gap-2 mt-6">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  api?.scrollTo(index)
                  setHasInteracted(true)
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-6 bg-royal-purple' 
                    : 'w-2 bg-grey-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trusted Partners */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center gap-2 items-center mb-4">
            <span className="text-sm text-grey-500 mr-1">Trusted Partners:</span>
            <button 
              className="bg-grey-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-royal-purple hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(0)}
            >
              ZYN
            </button>
            <button 
              className="bg-grey-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-royal-purple hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(1)}
            >
              EU Natural
            </button>
            <button 
              className="bg-grey-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-royal-purple hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(2)}
            >
              USN
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-2 items-center mb-6">
            <button 
              className="bg-grey-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-royal-purple hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(3)}
            >
              Naoki
            </button>
            <span className="bg-grey-100 px-3 py-1.5 rounded-lg text-xs font-semibold text-grey-400">
              More Soon...
            </span>
          </div>
          <p className="text-sm text-grey-600">
            More partnerships coming soon. Join our{' '}
            <Link to="/newsletter" className="text-royal-purple hover:underline font-medium">
              newsletter
            </Link>{' '}
            to stay updated.
          </p>
        </div>
      </div>
    </section>
  )
}
