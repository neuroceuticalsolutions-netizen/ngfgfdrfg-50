import zynLogo from "@/assets/partners/zyn-logo-new.png"
import euNaturalLogo from "@/assets/partners/eu-natural-logo-new.jpg"
import usnLogo from "@/assets/partners/usn-logo-new.png"
import naokiLogo from "@/assets/partners/naoki-matcha-logo-new.jpg"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    quote: "So far I've enjoyed Zyn. Just trying to find the right flavours and strength. What has stood out so far is that Zyn placed a follow up call for my order to ask how I was doing with the product. Really nice lady Lily called and checked how I liked the product.",
    name: "Don H.",
    location: "United Kingdom",
    role: "Verified Customer",
    logo: zynLogo,
    brand: "ZYN"
  },
  {
    quote: "Absolutely love this product. The caffeine is gradual and it actually works. I use it when I'm about to workout or when I need to focus at work. It's the real deal.",
    name: "Tiffany C.",
    location: "United States", 
    role: "Verified Customer",
    logo: euNaturalLogo,
    brand: "EU Natural"
  },
  {
    quote: "Great! This creatine is a game-changer. It gives you a great entrance for the workout by noticeably improving my strength and endurance from the first set.",
    name: "Bayanda",
    location: "South Africa",
    role: "Verified Reviewer",
    logo: usnLogo,
    brand: "USN"
  },
  {
    quote: "I appreciated Naoki Matcha's aesthetic for one simple reason. They appeared to be a no-nonsense matcha company. They told it like it was, and provided all the necessary information about the products they offered.",
    name: "Greg",
    location: "LazyLiteratus",
    role: "Tea Enthusiast",
    logo: naokiLogo,
    brand: "Naoki Matcha"
  }
]

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-royal-purple mb-6 animate-fade-in-up">
            Testimonials & Brand Trust
          </h2>
          <p className="body-md sm:body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Hear from satisfied customers across South Africa who have experienced 
            the benefits of our science-backed neuroceutical solutions.
          </p>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden mb-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div 
                    className="bg-grey-50 rounded-2xl p-6 sm:p-8 hover-lift relative"
                  >
                    <img 
                      src={testimonial.logo} 
                      alt={`${testimonial.brand} logo`}
                      className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 object-contain"
                    />
                    <div className="mb-6">
                      <div className="flex text-fresh-teal text-lg sm:text-xl mb-4">
                        {"★".repeat(5)}
                      </div>
                      <p className="body-md text-grey-700 italic leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-hero-gradient rounded-full flex items-center justify-center mr-3 sm:mr-4">
                        <span className="text-white font-semibold text-sm sm:text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-royal-purple text-sm sm:text-base">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-grey-600">{testimonial.role}</p>
                        <p className="text-xs text-fresh-teal">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-grey-50 rounded-2xl p-6 sm:p-8 hover-lift animate-fade-in-up relative"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <img 
                src={testimonial.logo} 
                alt={`${testimonial.brand} logo`}
                className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 object-contain"
              />
              <div className="mb-6">
                <div className="flex text-fresh-teal text-lg sm:text-xl mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="body-md text-grey-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-hero-gradient rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-white font-semibold text-sm sm:text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-royal-purple text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-grey-600">{testimonial.role}</p>
                  <p className="text-xs text-fresh-teal">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-hero-gradient rounded-2xl p-6 sm:p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="heading-md mb-4">Our Commitment to Quality</h3>
            <p className="body-md sm:body-lg mb-6 sm:mb-8 opacity-90">
              Our solutions are sourced from trusted brands and backed by peer-reviewed research. 
              We're committed to transparency, quality, and delivering real results to our South African customers.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl mb-2">🔬</div>
                <p className="font-semibold">Scientific Evidence</p>
                <p className="text-xs sm:text-sm opacity-80">Research-backed formulations</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl mb-2">🏆</div>
                <p className="font-semibold">Quality Partners</p>
                <p className="text-xs sm:text-sm opacity-80">Trusted international brands</p>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl mb-2">🇿🇦</div>
                <p className="font-semibold">Local Expertise</p>
                <p className="text-xs sm:text-sm opacity-80">South African distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}