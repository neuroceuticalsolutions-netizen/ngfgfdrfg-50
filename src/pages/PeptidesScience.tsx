import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SEOHead } from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const BASE_URL = "https://neuroceutical.lovable.app";

const research = [
  {
    title: "Collagen Stimulation",
    description: "Peptides that may support the skin's natural collagen processes.",
    findings: [
      "Signal peptides studied for fibroblast collagen output support",
      "Matrixyl 3000 evaluated in double-blind cosmetic trials",
      "GHK-Cu associated with improvements in skin density",
    ],
  },
  {
    title: "Skin Barrier Repair",
    description: "How peptide-lipid complexes may reinforce barrier resilience.",
    findings: [
      "Peptide-lipid complexes studied for barrier integrity support",
      "Carrier peptides help deliver zinc and copper into the dermis",
      "Cosmetic trials suggest reduced transepidermal water loss",
    ],
  },
  {
    title: "Anti-Ageing Mechanisms",
    description: "Peptides explored for their effects on the appearance of ageing.",
    findings: [
      "Argireline studied for the appearance of expression lines",
      "Eyeliss researched for under-eye appearance support",
      "Enzyme-inhibiting peptides may help slow collagen breakdown",
    ],
  },
];

const methodology = [
  { step: "1", title: "Literature Review", description: "Comprehensive analysis of peer-reviewed dermatology and cosmetic science journals." },
  { step: "2", title: "Ingredient Evaluation", description: "Assessment of bioavailability, skin penetration and safety profiles per INCI standards." },
  { step: "3", title: "Quality Testing", description: "Third-party verification of ingredient purity and formulation stability." },
  { step: "4", title: "Efficacy Validation", description: "Consumer trial feedback and before/after assessment protocols." },
];

const benefitBlocks = [
  {
    title: "Sustain Skin Clarity",
    body: "Peptide complexes may help support a more even-looking complexion through cosmetic mechanisms associated with skin tone and radiance.",
  },
  {
    title: "Enhance Structural Integrity",
    body: "Selected peptides are studied for their role in supporting firmer, more resilient-looking skin over consistent topical use.",
  },
  {
    title: "Protect Against Oxidative Damage",
    body: "Copper and zinc peptide complexes have antioxidant-supporting roles documented in cosmetic literature.",
  },
];

const faqs = [
  { q: "Are these peptides safe for sensitive skin?", a: "Our peptide formulations are designed with cosmetic safety profiles in mind. We recommend a 24-hour patch test before introducing any new product." },
  { q: "How long before I see results?", a: "Many consumers report visible changes in skin texture and firmness after consistent twice-daily use over 6 to 12 weeks." },
  { q: "Are these products SAHPRA cosmetics compliant?", a: "Yes. All formulations comply with SAHPRA cosmetics guidelines and use INCI-listed ingredients." },
  { q: "Can I layer peptide serums with other actives?", a: "Most peptides layer well with hyaluronic acid, niacinamide and SPF. Avoid layering with strong acids in the same routine." },
  { q: "What is the difference between a signal and carrier peptide?", a: "Signal peptides communicate with skin cells to support collagen-related processes. Carrier peptides help deliver trace elements like copper deeper into the skin." },
  { q: "Do you use any prohibited ingredients?", a: "No. Our formulations exclude SAHPRA-prohibited cosmetic ingredients and are independently verified." },
];

const PeptidesScience = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="The Science of Topical Peptides | Cosmetic Skincare Research SA"
        description="Peer-reviewed research behind topical cosmetic peptides — collagen stimulation, barrier repair and anti-ageing mechanisms — for South African skin."
        path="/peptides/science"
        keywords="peptide science, GHK-Cu research, argireline study, matrixyl 3000 research, cosmetic peptide evidence, SAHPRA cosmetics"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Peptides", url: `${BASE_URL}/peptides` },
          { name: "Science", url: `${BASE_URL}/peptides/science` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              The Science Behind Topical Peptides
            </h1>
            <p className="body-lg text-grey-600 mb-8">
              Our peptide formulations are selected using the same evidence standards
              applied across the Neuroceutical Solutions range.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary">Peer-Reviewed Sources</Badge>
              <Badge variant="secondary">Clinical Research</Badge>
              <Badge variant="secondary">Third-Party Testing</Badge>
              <Badge variant="secondary">Quality Assurance</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Research overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Research Overview</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {research.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300">
                <h3 className="heading-sm text-grey-900 mb-4">{r.title}</h3>
                <p className="body-md text-grey-600 mb-6">{r.description}</p>
                <h4 className="text-sm font-semibold text-royal-purple mb-3">Key Findings:</h4>
                <div className="space-y-3">
                  {r.findings.map((f, j) => (
                    <div key={j} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-fresh-teal rounded-full mt-2 flex-shrink-0" />
                      <p className="body-sm text-grey-600">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science-backed benefits */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-4">Science-Backed Benefits</h2>
          </div>
          <div className="max-w-5xl mx-auto space-y-12">
            {benefitBlocks.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-royal-purple mb-3">{b.title}</h3>
                <p className="body-md text-grey-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Our Research Methodology</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {methodology.map((step, i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-medium">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-royal-purple text-white rounded-xl flex items-center justify-center font-bold text-lg mr-4">{step.step}</div>
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
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="heading-lg text-royal-purple mb-6">Clinical Evidence Standards</h2>
                <p className="body-md text-grey-600 mb-6">
                  We only recommend peptide ingredients that have demonstrated efficacy in
                  peer-reviewed cosmetic science literature, with established safety profiles
                  for topical use.
                </p>
                <div className="space-y-4">
                  {[
                    "Peer-reviewed cosmetic dermatology publication required",
                    "Human skin studies with adequate sample sizes",
                    "Reproducible results across independent studies",
                    "Established topical safety profile",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-fresh-teal flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="body-md text-grey-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-royal-purple text-white rounded-2xl p-8">
                <h3 className="heading-sm mb-6">Our Commitment</h3>
                <div className="grid grid-cols-2 gap-6">
                  {["Peer-Reviewed Sources", "Quality Verified", "Safety Focused", "Transparent Process"].map((label, i) => (
                    <div key={i} className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-sm opacity-90">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-royal-purple text-center mb-10">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-grey-200 rounded-2xl px-6">
                  <AccordionTrigger className="text-left text-grey-900 font-semibold">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-grey-600 body-md">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Medical disclaimer */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-grey-100 border border-grey-200 rounded-2xl p-6">
            <h2 className="heading-xs text-grey-900 mb-2">Medical disclaimer</h2>
            <p className="body-sm text-grey-600">
              Content on this page is for educational purposes only and is not intended to
              diagnose, treat, cure or prevent any disease. It does not constitute medical
              advice. Always consult a qualified healthcare professional before starting any
              new skincare regimen, particularly if you are pregnant, breastfeeding or have
              a known skin condition. Information is provided in line with SAHPRA-aligned
              guidance for South African consumers.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PeptidesScience;