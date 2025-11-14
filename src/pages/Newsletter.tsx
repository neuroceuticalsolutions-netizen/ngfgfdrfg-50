import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { Newsletter as NewsletterSection } from "@/components/sections/newsletter"
import { Badge } from "@/components/ui/badge"

const Newsletter = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
      title: "Free Sample Campaigns",
      description: "Get notified when new free sample campaigns launch and be among the first to try products"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Early Product Access",
      description: "Be first to know about new product launches before they hit the market"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Partnership Announcements",
      description: "Stay updated on new brand partnerships and exclusive collaborations across South Africa"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Exclusive Offers",
      description: "Receive subscriber-only discounts and special promotions on cognitive enhancement products"
    }
  ]

  const recentNewsletters = [
    {
      title: "The Science of Neuroplasticity: How Your Brain Adapts",
      date: "December 2024",
      excerpt: "Discover how specific compounds can enhance your brain's ability to form new neural connections and adapt to challenges.",
      readTime: "5 min read"
    },
    {
      title: "Caffeine + L-theanine: The Perfect Cognitive Combination",
      date: "November 2024", 
      excerpt: "Breaking down the research behind this popular nootropic stack and how to optimize dosing for maximum benefit.",
      readTime: "4 min read"
    },
    {
      title: "Managing Stress for Better Cognitive Performance",
      date: "October 2024",
      excerpt: "Evidence-based strategies for reducing cortisol and improving mental resilience through natural adaptogens.",
      readTime: "6 min read"
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
              Get Free Samples & Early Product Access
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Stay informed about free sample campaigns, new product launches, and partnership 
              announcements across South Africa. Be first to try innovative cognitive enhancement products.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary">Weekly Updates</Badge>
              <Badge variant="secondary">Evidence-Based</Badge>
              <Badge variant="secondary">Expert Curated</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">What You'll Get</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Our newsletter keeps you connected to the latest free samples, product launches, 
              and exclusive opportunities to try cognitive enhancement products across South Africa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300">
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
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Recent Newsletters</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Get a taste of what our subscribers receive with these recent newsletter highlights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {recentNewsletters.map((newsletter, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-medium hover:shadow-large transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline">{newsletter.date}</Badge>
                  <span className="text-sm text-grey-500">{newsletter.readTime}</span>
                </div>
                
                <h3 className="heading-sm text-grey-900 mb-4 line-clamp-2">{newsletter.title}</h3>
                <p className="body-md text-grey-600 mb-6 line-clamp-3">{newsletter.excerpt}</p>
                
                <button className="text-royal-purple font-medium hover:text-royal-purple/80 transition-colors">
                  Read Sample →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg text-royal-purple mb-6">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-grey-900 mb-4">How often will I receive newsletters?</h3>
                <p className="body-md text-grey-600">
                  We send out our newsletter weekly, typically on Wednesdays. Each edition is carefully 
                  curated to provide you with the most relevant and actionable cognitive enhancement insights.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-grey-900 mb-4">Can I unsubscribe at any time?</h3>
                <p className="body-md text-grey-600">
                  Absolutely! We believe in providing value, not inbox clutter. You can unsubscribe 
                  with one click at the bottom of any newsletter, and we'll respect your decision immediately.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-grey-900 mb-4">Do you share subscriber information?</h3>
                <p className="body-md text-grey-600">
                  Never. Your privacy is paramount to us. We don't share, sell, or rent your email 
                  address to anyone. Your information is used solely to deliver our newsletter content.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-medium">
                <h3 className="heading-sm text-grey-900 mb-4">What makes your newsletter different?</h3>
                <p className="body-md text-grey-600">
                  Our newsletter focuses specifically on evidence-based cognitive enhancement. 
                  Every tip, product recommendation, and insight is backed by peer-reviewed research 
                  and curated by experts in neuroscience and cognitive psychology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Newsletter;