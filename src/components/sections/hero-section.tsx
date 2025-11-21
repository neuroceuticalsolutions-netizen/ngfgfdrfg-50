import { HeroButton } from "@/components/ui/hero-button"
import heroImage from "@/assets/hero-banner.jpg"

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Focused professionals in South African office environment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-royal-purple/80 via-royal-purple/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto md:mx-0">
          <h1 className="heading-xl text-white mb-6 animate-fade-in-up">
            Scientifically Proven Formulas for 
            <span className="block text-fresh-teal mt-2">Mental Clarity & Fortitude</span>
          </h1>
          
          <p className="body-lg text-grey-100 mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Bringing premium, science-backed neuroceutical products to South African consumers 
            through trusted partnerships with innovative brands worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <HeroButton 
              variant="hero" 
              size="lg"
              asChild
            >
              <a href="/products">
                Explore Products
              </a>
            </HeroButton>
            <HeroButton 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-royal-purple"
              asChild
            >
              <a href="/get-started">
                Partner With Us
              </a>
            </HeroButton>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}