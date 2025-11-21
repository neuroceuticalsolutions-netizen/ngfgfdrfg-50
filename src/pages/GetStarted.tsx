import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Brain, Target, Zap, Calendar, Mail, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { PartnerContactForm } from "@/components/sections/partner-contact-form";
const GetStarted = () => {
  return <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-royal-purple to-royal-purple/80">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block px-4 py-2 bg-fresh-teal/20 rounded-full mb-6">
            <span className="text-white font-semibold text-sm">FOR BRANDS & DISTRIBUTORS</span>
          </div>
          <h1 className="heading-xl text-white mb-6">
            Partner With Us for Distribution
          </h1>
          <p className="body-lg text-white/90 max-w-2xl mx-auto mb-8">
            Get your premium neuroceutical products distributed in South Africa's growing cognitive enhancement market. 
            We connect innovative brands with consumers through our trusted distribution network.
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
                  <Mail className="w-8 h-8 text-royal-purple" />
                </div>
                <CardTitle className="text-royal-purple">1. Reach Out to Us</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Contact us via email or direct call to start the conversation about distributing your sample products.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-grey-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-fresh-teal/10 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-fresh-teal" />
                </div>
                <CardTitle className="text-royal-purple">2. Product Evaluation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  We'll thoroughly evaluate your product for market safety, quality standards, and consumer appeal.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-grey-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-royal-purple/10 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-royal-purple" />
                </div>
                <CardTitle className="text-royal-purple">3. Decision & Next Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  We'll communicate our decision and work with you to determine the best approach for distributing your product samples.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-grey-50">
        <div className="container mx-auto px-6">
          <h2 className="heading-lg text-center text-royal-purple mb-4">
            Partner Requirements
          </h2>
          <p className="body-lg text-grey-600 text-center max-w-2xl mx-auto mb-12">
            To ensure we maintain the highest standards for our distribution network, we look for partners who meet the following criteria.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Quality Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Products must have relevant quality certifications (e.g., GMP, ISO, or equivalent standards) to ensure safety and efficacy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Product Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Complete ingredient lists, third-party testing results, and compliance documentation for South African market regulations.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Minimum Order Quantities</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Ability to fulfill minimum order quantities for distribution partnerships and maintain consistent supply chain.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Safety & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Full compliance with South African health regulations and proper product labeling in accordance with local laws.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Market Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Products should be market-ready with professional packaging, branding, and consumer-facing materials.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-grey-200">
              <CardHeader>
                <CardTitle className="text-lg text-royal-purple">Brand Values Alignment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-grey-600">
                  Commitment to transparency, quality, and ethical business practices that align with our distribution standards.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Checklist */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="heading-lg text-royal-purple mb-6">
                What You'll Get
              </h2>
              <div className="space-y-4">
                {["Access to premium distribution network", "Comprehensive product evaluation and feedback", "Market insights and consumer analytics", "Partnership with established retail channels", "Expert guidance on product positioning", "Increased brand visibility in South Africa"].map((benefit, index) => <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-fresh-teal flex-shrink-0" />
                    <span className="text-grey-700">{benefit}</span>
                  </div>)}
              </div>
            </div>
            
            <Card className="p-8 border-grey-200">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-royal-purple mb-2">Ready to Partner?</CardTitle>
                <CardDescription>
                  Connect with our distribution team to discuss getting your products into the South African market.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HeroButton variant="hero" size="lg" className="w-full" asChild>
                  
                </HeroButton>
                <HeroButton variant="outline" size="lg" className="w-full" asChild>
                  <Link to="/#featured-products">
                    View Our Partners
                  </Link>
                </HeroButton>
                <p className="text-sm text-grey-500 text-center">
                  Premium distribution • Market access • Partnership opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <PartnerContactForm />

      {/* FAQ Section */}
      <section className="py-16 bg-grey-50">
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
    </main>;
};
export default GetStarted;