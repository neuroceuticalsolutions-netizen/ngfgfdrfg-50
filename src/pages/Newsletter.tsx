import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { Newsletter as NewsletterSection } from "@/components/sections/newsletter"
import { Badge } from "@/components/ui/badge"

const Newsletter = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Latest Research Updates",
      description: "Stay informed about breakthrough studies in cognitive enhancement and neuroscience"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Expert Insights & Tips",
      description: "Get practical advice from neuroscientists and cognitive enhancement experts"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      title: "Exclusive Product Access",
      description: "Be first to know about new products and exclusive subscriber discounts"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 00-2-2z" />
        </svg>
      ),
      title: "Performance Tracking",
      description: "Learn how to measure and optimize your cognitive performance over time"
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
              Stay Ahead with Cognitive Science Insights
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Join thousands of cognitive enhancement enthusiasts who rely on our newsletter 
              for the latest research, expert insights, and practical tips.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Badge variant="secondary">10,000+ Subscribers</Badge>
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
              Our newsletter delivers actionable insights that help you optimize your 
              cognitive performance and stay informed about the latest developments.
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