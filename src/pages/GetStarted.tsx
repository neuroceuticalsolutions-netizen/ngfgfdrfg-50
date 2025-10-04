import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { HeroButton } from "@/components/ui/hero-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Brain, Target, Zap, Calendar } from "lucide-react"
import { Link } from "react-router-dom"

const GetStarted = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-royal-purple/10 to-fresh-teal/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="heading-xl text-royal-purple mb-6">
            Start Your Journey to Mental Clarity
          </h1>
          <p className="body-lg text-grey-600 max-w-2xl mx-auto mb-8">
            Take the first step towards enhanced focus, reduced stress, and improved cognitive performance with our science-backed neuroceutical solutions.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="heading-lg text-center text-royal-purple mb-12">
            How to Get Started
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center border-grey-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-royal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-8 h-8 text-royal-purple" />
                </div>
                <CardTitle className="text-royal-purple">1. Identify Your Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Determine what you want to achieve - better focus, stress relief, or enhanced mental performance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-grey-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-fresh-teal/10 rounded-full flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-fresh-teal" />
                </div>
                <CardTitle className="text-royal-purple">2. Choose Your Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Explore our carefully selected products from leading neuroceutical brands.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-grey-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-royal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-royal-purple" />
                </div>
                <CardTitle className="text-royal-purple">3. Start Your Journey</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Begin with our recommended protocols and track your progress.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg text-royal-purple mb-6">
                What You'll Experience
              </h2>
              <div className="space-y-4">
                {[
                  "Enhanced focus and mental clarity",
                  "Reduced stress and anxiety",
                  "Improved cognitive performance",
                  "Better energy levels throughout the day",
                  "Science-backed, safe formulations",
                  "Expert guidance and support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-fresh-teal flex-shrink-0" />
                    <span className="text-grey-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="p-8 border-grey-200">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-royal-purple mb-2">Ready to Connect?</CardTitle>
                <CardDescription>
                  Speak with our team about accessing premium cognitive enhancement products and exclusive partnerships.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HeroButton variant="hero" size="lg" className="w-full" asChild>
                  <Link to="/contact">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Call
                  </Link>
                </HeroButton>
                <HeroButton variant="outline" size="lg" className="w-full" asChild>
                  <a href="/#featured-products">
                    View Our Partners
                  </a>
                </HeroButton>
                <p className="text-sm text-grey-500 text-center">
                  Exclusive access • Premium sourcing • Partnership opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="heading-lg text-center text-royal-purple mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Are these products safe?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Yes, all our partner brands use scientifically researched ingredients with proven safety profiles and third-party testing.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">How long before I see results?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Most users notice improvements within 1-2 weeks, with optimal benefits typically achieved after 4-6 weeks of consistent use.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
               <CardHeader>
                 <CardTitle className="text-lg text-royal-purple">How do I access these products?</CardTitle>
               </CardHeader>
               <CardContent>
                 <CardDescription className="text-grey-600">
                   Contact our team to discuss product availability, pricing, and access to our exclusive partner network. We'll connect you with the right solutions.
                 </CardDescription>
               </CardContent>
            </Card>

            <Card className="border-grey-200">
               <CardHeader>
                 <CardTitle className="text-lg text-royal-purple">What makes your sourcing special?</CardTitle>
               </CardHeader>
               <CardContent>
                 <CardDescription className="text-grey-600">
                   We have exclusive partnerships with premium brands and can provide access to products not widely available in South Africa, with verified quality and authenticity.
                 </CardDescription>
               </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default GetStarted