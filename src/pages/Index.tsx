import { useState, useEffect } from "react"
import { Navigation } from "@/components/sections/navigation"
import { HeroSection } from "@/components/sections/hero-section"
import { AudienceSelector } from "@/components/sections/audience-selector"
import { AboutSection } from "@/components/sections/about-section"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { ScienceBenefits } from "@/components/sections/science-benefits"
import { Testimonials } from "@/components/sections/testimonials"
import { Newsletter } from "@/components/sections/newsletter"
import { Footer } from "@/components/sections/footer"
import { HomeSkeleton } from "@/components/sections/home-skeleton"
import { SEOHead } from "@/components/SEOHead"
import { FAQSchema } from "@/components/StructuredData"
import { PageDisclaimer } from "@/components/PageDisclaimer"

const homeFaqs = [
  {
    question: "What are nootropics?",
    answer: "Nootropics are supplements and compounds that may support cognitive functions such as focus, memory, mental clarity and energy. Neuroceutical Solutions distributes science-backed nootropic products in South Africa."
  },
  {
    question: "Are nootropics legal in South Africa?",
    answer: "The nootropic and cognitive enhancement products distributed by Neuroceutical Solutions comply with applicable South African regulations, including SAHPRA guidelines for health supplements."
  },
  {
    question: "Where does Neuroceutical Solutions ship?",
    answer: "We work with brand partners to make their products available to consumers across South Africa. Availability depends on the individual brand and product."
  }
];

const Index = () => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    const minDelay = new Promise((resolve) => setTimeout(resolve, 600))
    const fontsReady = document.fonts.ready

    Promise.all([minDelay, fontsReady]).then(() => {
      if (!cancelled) setIsReady(true)
    })

    return () => { cancelled = true }
  }, [])

  if (!isReady) {
    return (
      <main className="min-h-screen bg-background">
        <SEOHead
          title="Nootropics South Africa | Brain Supplements SA"
          description="Premium nootropics in South Africa. Science-backed brain supplements for focus, memory & mental clarity. Trusted SA distributor of cognitive enhancers."
          path="/"
          keywords="nootropics south africa, brain supplements south africa, cognitive enhancement SA, focus supplements johannesburg, memory supplements cape town, mental clarity, neuroceuticals SA, smart drugs south africa, ZYN nicotine pouches SA, EU Natural south africa"
        />
        <HomeSkeleton />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background animate-fade-in">
      <SEOHead
        title="Nootropics South Africa | Brain Supplements SA"
        description="Premium nootropics in South Africa. Science-backed brain supplements for focus, memory & mental clarity. Trusted SA distributor of cognitive enhancers."
        path="/"
        keywords="nootropics south africa, brain supplements south africa, cognitive enhancement SA, focus supplements johannesburg, memory supplements cape town, mental clarity, neuroceuticals SA, smart drugs south africa, ZYN nicotine pouches SA, EU Natural south africa"
      />
      <FAQSchema faqs={homeFaqs} />
      <Navigation />
      <HeroSection />
      <AudienceSelector />
      <AboutSection />
      <FeaturedProducts />
      <ScienceBenefits />
      <Testimonials />
      <Newsletter />
      <PageDisclaimer variant="home" />
      <Footer />
    </main>
  );
};

export default Index;
