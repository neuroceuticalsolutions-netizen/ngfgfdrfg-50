import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { Newsletter as NewsletterSection } from "@/components/sections/newsletter"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SEOHead } from "@/components/SEOHead"
import { FAQSchema, BreadcrumbSchema } from "@/components/StructuredData"
import { articles } from "@/data/articles"
import { Link } from "react-router-dom"

const BASE_URL = "https://neuroceutical.lovable.app"

const newsletterFaqs = [
  {
    question: "How often will I receive newsletters?",
    answer: "We send out our newsletter weekly, typically on Wednesdays. Each edition is carefully curated to provide you with the most relevant and actionable cognitive enhancement insights."
  },
  {
    question: "Can I unsubscribe at any time?",
    answer: "Absolutely! We believe in providing value, not inbox clutter. You can unsubscribe with one click at the bottom of any newsletter, and we'll respect your decision immediately."
  },
  {
    question: "Do you share subscriber information?",
    answer: "Never. Your privacy is paramount to us. We don't share, sell, or rent your email address to anyone. Your information is used solely to deliver our newsletter content."
  },
  {
    question: "What makes your newsletter different?",
    answer: "Our newsletter focuses specifically on evidence-based cognitive enhancement. Every tip, product recommendation, and insight is backed by peer-reviewed research and curated by experts in neuroscience and cognitive psychology."
  }
]

const Newsletter = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Free Sample Campaigns",
      description: "Get notified when new nootropics and brain-enhancing product samples launch in South Africa"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Early Product Access",
      description: "Be first to know about new cognitive enhancement and nootropic product launches"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "New Brand & Product Launches",
      description: "Discover new brands and products as they become available in South Africa"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Exclusive Offers",
      description: "Receive subscriber-only discounts and special promotions on nootropics and brain-enhancing supplements"
    }
  ]

  const recentNewsletters = articles;

  return (
    <main className="min-h-screen bg-background">
      <SEOHead 
        title="Get Free Samples & Early Product Access"
        description="Subscribe to our newsletter for free sample campaigns, new nootropics launches, and exclusive product announcements in South Africa."
        path="/newsletter"
      />
      <FAQSchema faqs={newsletterFaqs} />
      <BreadcrumbSchema items={[
        { name: "Home", url: BASE_URL },
        { name: "Newsletter", url: `${BASE_URL}/newsletter` }
      ]} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-28 pb-12 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-4 animate-fade-in-up">
              Get Free Samples & Early Product Access
            </h1>
            <p className="body-lg text-grey-600 mb-6 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Stay informed about free sample campaigns, new nootropics launches, and product 
              announcements across South Africa. Be first to try brain-enhancing products designed to optimize your cognitive performance.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              <Badge variant="secondary">Weekly Updates</Badge>
              <Badge variant="secondary">Free Samples</Badge>
              <Badge variant="secondary">Product Launches</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="heading-lg text-royal-purple mb-4">What You'll Get</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Our newsletter keeps you connected to the latest free samples, nootropics launches, and exclusive 
              opportunities to try brain-enhancing products that optimize mental performance across South Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-royal-purple/10 rounded-xl flex items-center justify-center text-royal-purple flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="heading-sm text-grey-900 mb-3">{benefit.title}</h3>
                    <p className="body-md text-grey-600">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <NewsletterSection />

      {/* Recent Newsletters */}
      <section id="recent-newsletters" className="py-12 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="heading-lg text-royal-purple mb-4">Recent Newsletters</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Get a taste of what our subscribers receive with these recent newsletter highlights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {recentNewsletters.map((newsletter, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-medium hover:shadow-large transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{newsletter.date}</Badge>
                  <span className="text-sm text-grey-500">{newsletter.readTime}</span>
                </div>
                
                <h3 className="heading-sm text-grey-900 mb-3 line-clamp-2">{newsletter.title}</h3>
                <p className="body-md text-grey-600 mb-4 line-clamp-3">{newsletter.excerpt}</p>
                
                <Link to={`/articles/${newsletter.slug}`} className="text-royal-purple font-medium hover:text-royal-purple/80 transition-colors">
                  Read Article →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="heading-lg text-royal-purple mb-4">Frequently Asked Questions</h2>
            </div>

            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="bg-white rounded-2xl border border-grey-200 px-6">
                <AccordionTrigger className="text-left text-grey-900 font-medium py-5 hover:no-underline hover:text-royal-purple transition-colors">
                  How often will I receive newsletters?
                </AccordionTrigger>
                <AccordionContent className="text-grey-600 pb-5">
                  We send out our newsletter weekly, typically on Wednesdays. Each edition is carefully 
                  curated to provide you with the most relevant and actionable cognitive enhancement insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-white rounded-2xl border border-grey-200 px-6">
                <AccordionTrigger className="text-left text-grey-900 font-medium py-5 hover:no-underline hover:text-royal-purple transition-colors">
                  Can I unsubscribe at any time?
                </AccordionTrigger>
                <AccordionContent className="text-grey-600 pb-5">
                  Absolutely! We believe in providing value, not inbox clutter. You can unsubscribe 
                  with one click at the bottom of any newsletter, and we'll respect your decision immediately.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-white rounded-2xl border border-grey-200 px-6">
                <AccordionTrigger className="text-left text-grey-900 font-medium py-5 hover:no-underline hover:text-royal-purple transition-colors">
                  Do you share subscriber information?
                </AccordionTrigger>
                <AccordionContent className="text-grey-600 pb-5">
                  Never. Your privacy is paramount to us. We don't share, sell, or rent your email 
                  address to anyone. Your information is used solely to deliver our newsletter content.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-white rounded-2xl border border-grey-200 px-6">
                <AccordionTrigger className="text-left text-grey-900 font-medium py-5 hover:no-underline hover:text-royal-purple transition-colors">
                  What makes your newsletter different?
                </AccordionTrigger>
                <AccordionContent className="text-grey-600 pb-5">
                  Our newsletter focuses specifically on evidence-based cognitive enhancement. 
                  Every tip, product recommendation, and insight is backed by peer-reviewed research 
                  and curated by experts in neuroscience and cognitive psychology.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Newsletter;