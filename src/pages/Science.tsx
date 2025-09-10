import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { ScienceBenefits } from "@/components/sections/science-benefits"
import { Badge } from "@/components/ui/badge"

const Science = () => {
  const researchAreas = [
    {
      title: "Cognitive Enhancement",
      studies: "12+ Studies",
      description: "Research on nootropics and their effects on memory, focus, and mental clarity",
      keyFindings: [
        "L-theanine + caffeine improves attention by 40%",
        "Lion's Mane mushroom enhances neuroplasticity",
        "Bacopa Monnieri improves memory recall by 25%"
      ]
    },
    {
      title: "Stress Adaptation",
      studies: "8+ Studies", 
      description: "Clinical trials on adaptogens and their role in stress management and resilience",
      keyFindings: [
        "Ashwagandha reduces cortisol levels by 30%",
        "Rhodiola improves stress tolerance",
        "Ginseng enhances physical and mental endurance"
      ]
    },
    {
      title: "Neuroprotection",
      studies: "15+ Studies",
      description: "Long-term studies on compounds that support brain health and cognitive longevity",
      keyFindings: [
        "Omega-3 fatty acids protect against cognitive decline",
        "Curcumin reduces neuroinflammation",
        "Green tea catechins support brain health"
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
              <Badge variant="secondary">35+ Clinical Studies</Badge>
              <Badge variant="secondary">Peer-Reviewed Research</Badge>
              <Badge variant="secondary">Evidence-Based</Badge>
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
                <div className="flex items-center justify-between mb-6">
                  <h3 className="heading-sm text-grey-900">{area.title}</h3>
                  <Badge variant="outline">{area.studies}</Badge>
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
                <h3 className="heading-sm mb-6">Research Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">35+</div>
                    <div className="text-sm opacity-80">Studies Reviewed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">15k+</div>
                    <div className="text-sm opacity-80">Study Participants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">98%</div>
                    <div className="text-sm opacity-80">Safety Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">85%</div>
                    <div className="text-sm opacity-80">Efficacy Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Science;