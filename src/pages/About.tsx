import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Link } from "react-router-dom";
const About = () => {
  return <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              About Neuroceutical Solutions
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              Your trusted source for premium, science-backed neuroceutical products in South Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-royal-purple mb-6 text-center">Our Mission</h2>
            <p className="body-lg text-grey-600 mb-6 text-center">
              Bringing premium neuroceutical products to South African consumers through rigorous evaluation and trusted partnerships.
            </p>
            <p className="body-md text-grey-600 mb-8">
              At Neuroceutical Solutions, we're passionate about making cutting-edge cognitive enhancement accessible to you. 
              We partner with leading international brands to bring you science-backed products that have been thoroughly 
              evaluated for quality, safety, and effectiveness. Every product in our catalog meets our strict standards, 
              so you can trust that you're getting the very best for your mental performance.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-medium">
              <h3 className="heading-sm text-royal-purple mb-4">Why Trust Us?</h3>
              <ul className="space-y-3 text-grey-700">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fresh-teal mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Thorough product evaluation process ensuring only premium quality products</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fresh-teal mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Partnerships with trusted international brands backed by science</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fresh-teal mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Based in South Africa, serving our local community with premium cognitive solutions</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-fresh-teal mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Commitment to transparency, quality, and your cognitive wellness journey</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Distribution Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-lg text-royal-purple mb-6">Supporting Partner Businesses</h2>
              <p className="body-lg text-grey-600">
                We help brands expand their reach in South Africa through strategic sample distribution partnerships.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-subtle rounded-2xl p-8">
                <div className="w-12 h-12 bg-royal-purple rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="heading-sm text-grey-900 mb-3">Sample Distribution</h3>
                <p className="body-md text-grey-600">
                  We manage end-to-end sample distribution programs, connecting your products with targeted South African consumers through our established network.
                </p>
              </div>

              <div className="bg-gradient-subtle rounded-2xl p-8">
                <div className="w-12 h-12 bg-fresh-teal rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-grey-900 mb-3">Market Insights</h3>
                <p className="body-md text-grey-600">
                  Gain valuable feedback and market insights from South African consumers to help refine your products and marketing strategies.
                </p>
              </div>

              <div className="bg-gradient-subtle rounded-2xl p-8">
                <div className="w-12 h-12 bg-royal-purple rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-grey-900 mb-3">Targeted Reach</h3>
                <p className="body-md text-grey-600">
                  Access our curated audience of health-conscious consumers interested in cognitive enhancement and premium wellness products.
                </p>
              </div>

              <div className="bg-gradient-subtle rounded-2xl p-8">
                <div className="w-12 h-12 bg-fresh-teal rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="heading-sm text-grey-900 mb-3">Brand Trust</h3>
                <p className="body-md text-grey-600">
                  Leverage our reputation for quality and scientific rigor to build credibility with South African consumers from day one.
                </p>
              </div>
            </div>

            <div className="bg-hero-gradient rounded-2xl p-8 text-white text-center">
              <h3 className="heading-md mb-4">Interested in Partnering With Us?</h3>
              <p className="body-lg mb-6 opacity-90">
                Join leading brands in reaching South Africa's most engaged wellness consumers.
              </p>
              <HeroButton asChild className="bg-white text-royal-purple hover:bg-white/90">
                <Link to="/get-started">Become a Partner</Link>
              </HeroButton>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Meet the Founder</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Dedicated to bridging the gap between cutting-edge neuroscience research 
              and accessible cognitive enhancement solutions.
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-medium">
              <div className="w-24 h-24 bg-royal-purple/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-3xl font-bold text-royal-purple">TD</span>
              </div>
              <h3 className="heading-md text-grey-900 mb-2">Tapelo Daniel</h3>
              <p className="text-royal-purple mb-4 font-medium">Founder</p>
              <p className="body-md text-grey-600">
                Passionate entrepreneur dedicated to connecting innovative sample products with consumers through 
                a careful evaluation process and strategic distribution partnerships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Our Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-royal-purple/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="heading-sm text-grey-900 mb-4">Science-First Approach</h3>
              <p className="body-md text-grey-600">
                Every product is backed by peer-reviewed research and clinical studies.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-fresh-teal/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-fresh-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="heading-sm text-grey-900 mb-4">Quality Excellence</h3>
              <p className="body-md text-grey-600">
                Rigorous testing and quality control ensure consistent, effective results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-royal-purple/10 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-8 h-8 text-royal-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="heading-sm text-grey-900 mb-4">Customer Focus</h3>
              <p className="body-md text-grey-600">
                Your cognitive goals drive everything we do, from product selection to support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>;
};
export default About;