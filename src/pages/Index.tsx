import { Navigation } from "@/components/sections/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AudienceSelector } from "@/components/sections/audience-selector"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { ScienceBenefits } from "@/components/sections/science-benefits"
import { Testimonials } from "@/components/sections/testimonials"
import { Newsletter } from "@/components/sections/newsletter"
import { Footer } from "@/components/sections/footer"

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AudienceSelector />
      <AboutSection />
      <FeaturedProducts />
      <ScienceBenefits />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
