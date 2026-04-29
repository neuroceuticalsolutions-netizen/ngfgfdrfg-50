import { useState } from "react"
import { Link } from "react-router-dom"
import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { Badge } from "@/components/ui/badge"
import { SEOHead } from "@/components/SEOHead"
import { BreadcrumbSchema, FAQSchema } from "@/components/StructuredData"
import { articles, type ArticleCategory } from "@/data/articles"

const BASE_URL = "https://neuroceutical.lovable.app"

const categories: { key: "all" | ArticleCategory; label: string }[] = [
  { key: "all", label: "All Guides" },
  { key: "stress-relief", label: "Stress Relief" },
  { key: "mental-fatigue", label: "Mental Fatigue" },
  { key: "cognitive-performance", label: "Cognitive Performance" },
  { key: "nootropic-science", label: "Nootropic Science" },
]

const guidesFaqs = [
  {
    question: "Are these guides relevant to South African readers?",
    answer:
      "Yes. Every guide is written with the South African context in mind — from load-shedding's effect on sleep to where to find quality nootropic and adaptogen supplements locally.",
  },
  {
    question: "Do you cite scientific research?",
    answer:
      "Our guides reference established science on nootropics, adaptogens and cognitive performance. We use soft, evidence-informed language and avoid unverified claims, in line with SAHPRA-aligned guidance.",
  },
  {
    question: "Can these guides replace medical advice?",
    answer:
      "No. Our content is educational only and does not constitute medical advice. Always consult a qualified healthcare professional before starting any supplement, especially if you are pregnant, breastfeeding or on chronic medication.",
  },
]

const Guides = () => {
  const [active, setActive] = useState<"all" | ArticleCategory>("all")
  const filtered = active === "all" ? articles : articles.filter(a => a.category === active)

  return (
    <main className="min-h-screen bg-background">
      <SEOHead
        title="Science & Guides | Nootropics South Africa"
        description="Evidence-informed guides on stress relief, mental fatigue and cognitive performance for South Africans. Practical, SA-localized nootropic insights."
        path="/guides"
        keywords="nootropics guides south africa, stress relief SA, mental fatigue south africa, cognitive performance johannesburg, brain fog cape town, focus supplements SA, nootropic science"
      />
      <FAQSchema faqs={guidesFaqs} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: BASE_URL },
          { name: "Science & Guides", url: `${BASE_URL}/guides` },
        ]}
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">SA-Localized · Evidence-Informed</Badge>
            <h1 className="heading-xl text-royal-purple mb-4 animate-fade-in-up">
              Science &amp; Guides
            </h1>
            <p className="body-lg text-grey-600 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Practical, research-led guides on stress relief, mental fatigue and cognitive performance —
              written for South African readers, students and professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setActive(cat.key)}
                className={`px-5 py-2 rounded-full text-sm transition-all ${
                  active === cat.key
                    ? "bg-royal-purple text-white shadow-medium"
                    : "bg-white text-grey-700 hover:bg-grey-100 border border-grey-300"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article grid */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {filtered.length === 0 ? (
            <p className="text-center body-md text-grey-600">No guides in this category yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map(article => (
                <Link
                  key={article.slug}
                  to={`/articles/${article.slug}`}
                  className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-shadow duration-300 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline">{article.date}</Badge>
                    <span className="text-sm text-grey-500">{article.readTime}</span>
                  </div>
                  {article.category && (
                    <Badge variant="secondary" className="self-start mb-3 capitalize">
                      {article.category.replace(/-/g, " ")}
                    </Badge>
                  )}
                  <h2 className="heading-sm text-grey-900 mb-3 line-clamp-2">{article.title}</h2>
                  <p className="body-md text-grey-600 mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
                  <span className="text-royal-purple font-medium">Read guide →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Medical disclaimer (SAHPRA-aligned) */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-grey-100 border border-grey-200 rounded-2xl p-6">
            <h2 className="heading-xs text-grey-900 mb-2">Medical disclaimer</h2>
            <p className="body-sm text-grey-600">
              Content on this page is for educational purposes only and is not intended to diagnose, treat,
              cure or prevent any disease. It does not constitute medical advice. Always consult a
              qualified healthcare professional before starting any supplement, particularly if you are
              pregnant, breastfeeding, or on chronic medication. Information is provided in line with
              SAHPRA-aligned guidance for South African consumers.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Guides
