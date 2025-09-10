import { HeroButton } from "@/components/ui/hero-button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel"
import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import { products } from "@/data/products"

export const FeaturedProducts = () => {
  const [api, setApi] = useState<CarouselApi>()

  const scrollToSlide = useCallback((index: number) => {
    api?.scrollTo(index)
  }, [api])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-royal-purple mb-6 animate-fade-in-up">
            Featured Products & Partners
          </h2>
          <p className="body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Discover our carefully curated selection of neuroceutical solutions, 
            sourced from trusted partners and backed by scientific research.
          </p>
        </div>

        <div className="relative mb-12">
          <Carousel className="w-full max-w-4xl mx-auto group" setApi={setApi}>
            <CarouselContent className="p-4">
              {products.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-medium relative min-h-[300px] transition-shadow duration-200 hover:shadow-large">
                    <div className="flex h-full">
                      {/* Left side - Product Info */}
                      <div className="w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-3xl font-bold text-primary mb-2 text-center">{product.name}</h3>
                        <p className="text-accent font-semibold mb-6 text-center">Partner: {product.brand}</p>
                        
                        <p className="text-muted-foreground text-lg mb-8 leading-relaxed max-w-xl">
                          {product.shortDescription}
                        </p>

                        <ul className="space-y-4 mb-10">
                          {product.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-center text-foreground text-lg">
                              <span className="w-6 h-6 bg-accent rounded-full mr-4 flex-shrink-0 flex items-center justify-center">
                                <span className="text-accent-foreground font-bold text-sm">✓</span>
                              </span>
                              {benefit}
                            </li>
                          ))}
                        </ul>

                        <Link 
                          to={`/products/${product.slug}`}
                          className="self-center px-8 py-3 text-primary font-semibold text-lg hover:bg-secondary transition-colors rounded-lg"
                        >
                          Learn More
                        </Link>
                      </div>
                      
                      {/* Right side - Logo with gradient and diagonal edge */}
                      <div 
                        className="w-1/2 flex items-center justify-center relative"
                        style={{
                          backgroundColor: product.backgroundColor,
                          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
                          willChange: 'auto'
                        }}
                      >
                        <img 
                          src={product.logo} 
                          alt={`${product.brand} logo`} 
                          className="w-40 h-40 object-contain transition-transform duration-200 hover:scale-105" 
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
            <CarouselPrevious className="left-8 z-20 bg-white/90 hover:bg-white border-border shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CarouselNext className="right-8 z-20 bg-white/90 hover:bg-white border-border shadow-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Carousel>
        </div>

        <div className="text-center">
          <p className="body-md text-grey-600 mb-6">
            More partnerships coming soon. Join our newsletter to stay updated.
          </p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <span className="text-sm text-grey-500">Trusted Partners:</span>
            <div 
              className="bg-grey-100 px-4 py-2 rounded-lg text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(0)}
            >
              ZYN
            </div>
            <div 
              className="bg-grey-100 px-4 py-2 rounded-lg text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(1)}
            >
              EU Natural
            </div>
            <div 
              className="bg-grey-100 px-4 py-2 rounded-lg text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(2)}
            >
              USN
            </div>
            <div 
              className="bg-grey-100 px-4 py-2 rounded-lg text-sm font-semibold text-royal-purple cursor-pointer hover:bg-grey-200 transition-colors" 
              onClick={() => scrollToSlide(3)}
            >
              Naoki
            </div>
            <div className="bg-grey-100 px-4 py-2 rounded-lg text-sm font-semibold text-grey-400">More Soon...</div>
          </div>
        </div>
      </div>
    </section>
  )
}