import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { ScienceBenefits } from "@/components/sections/science-benefits"
import { Badge } from "@/components/ui/badge"
import { SEOHead } from "@/components/SEOHead"

const Science = () => {
  const researchAreas = [
    {
      title: "Cognitive Enhancement",
      description: "Research on nootropics and their effects on memory, focus, and mental clarity",
      keyFindings: [
        "L-theanine and caffeine may support attention and focus",
        "Lion's Mane mushroom is studied for neuroplasticity support",
        "Bacopa Monnieri is traditionally used to support memory function"
      ]
    },
    {
      title: "Stress Adaptation",
      description: "Clinical trials on adaptogens and their role in stress management and resilience",
      keyFindings: [
        "Ashwagandha is an adaptogen studied for stress management",
        "Rhodiola may help support stress tolerance",
        "Ginseng is traditionally used for physical and mental endurance"
      ]
    },
    {
      title: "Neuroprotection",
      description: "Long-term studies on compounds that support brain health and cognitive longevity",
      keyFindings: [
        "Omega-3 fatty acids are studied for cognitive health support",
        "Curcumin is researched for its anti-inflammatory properties",
        "Green tea catechins may support overall brain health"
      ]
    }
  ]

  const methodology = [
    {
      step: "1",
      title: "Literature Review",
      description: "Comprehensive analysis of peer-reviewed research and clinical studies"
    },
    {
      step: "2", 
      title: "Ingredient Evaluation",
      description: "Assessment of bioavailability, dosage, and safety profiles"
    },
    {
      step: "3",
      title: "Quality Testing",
      description: "Third-party verification and purity testing of all ingredients"
    },
    {
      step: "4",
      title: "Efficacy Validation",
      description: "Real-world testing and customer feedback analysis"
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="The Science Behind Cognitive Enhancement"
        description="Explore the peer-reviewed research and clinical studies that validate our approach to cognitive optimization and brain health."
        path="/science"
      />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              The Science Behind Cognitive Enhancement
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Our commitment to evidence-based solutions drives every product recommendation. 
              Explore the research that validates our approach to cognitive optimization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary">Quality Focused</Badge>
              <Badge variant="secondary">Peer-Reviewed Sources</Badge>
              <Badge variant="secondary">Third-Party Tested</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Research Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Research Overview</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Our product selection is based on extensive research across multiple domains 
              of cognitive science and neuropharmacology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {researchAreas.map((area, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300">
                <div className="mb-6">
                  <h3 className="heading-sm text-grey-900">{area.title}</h3>
                </div>
                
                <p className="body-md text-grey-600 mb-6">{area.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-royal-purple mb-3">Key Findings:</h4>
                  {area.keyFindings.map((finding, findingIndex) => (
                    <div key={findingIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-fresh-teal rounded-full mt-2 flex-shrink-0"></div>
                      <p className="body-sm text-grey-600">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Benefits Component */}
      <ScienceBenefits />

      {/* Research Methodology */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Our Research Methodology</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              We follow a rigorous four-step process to ensure every product meets 
              our standards for safety, efficacy, and quality.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {methodology.map((step, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-medium">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-royal-purple text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4">
                      {step.step}
                    </div>
                    <h3 className="heading-sm text-grey-900">{step.title}</h3>
                  </div>
                  <p className="body-md text-grey-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Evidence */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="heading-lg text-royal-purple mb-6">Clinical Evidence Standards</h2>
                <p className="body-md text-grey-600 mb-6">
                  We only recommend ingredients that have demonstrated efficacy in 
                  randomized, double-blind, placebo-controlled trials—the gold standard 
                  of scientific research.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-fresh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="body-md text-grey-600">Peer-reviewed publication required</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-fresh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="body-md text-grey-600">Human studies with adequate sample sizes</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-fresh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="body-md text-grey-600">Reproducible results across studies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-fresh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="body-md text-grey-600">Established safety profile</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-royal-purple text-white rounded-2xl p-8">
                <h3 className="heading-sm mb-6">Our Commitment</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <div className="text-sm opacity-90">Peer-Reviewed Sources</div>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <div className="text-sm opacity-90">Quality Verified</div>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div className="text-sm opacity-90">Safety Focused</div>
                  </div>
                  <div className="text-center">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <div className="text-sm opacity-90">Transparent Process</div>
                  </div>
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

export default Science;