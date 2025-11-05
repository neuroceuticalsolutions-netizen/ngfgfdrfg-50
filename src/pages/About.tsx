import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
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
              We're a sample distribution company connecting innovative products with consumers 
              through a rigorous evaluation and distribution process.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="heading-lg text-royal-purple mb-6">How to Get Your Products Distributed</h2>
              <p className="body-md text-grey-600 mb-8">
                At Neuroceutical Solutions, we make the distribution process simple and transparent. 
                Here's how we work with brands to bring their sample products to market:
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-royal-purple/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-royal-purple">1</span>
                  </div>
                  <div>
                    <h3 className="heading-sm text-grey-900 mb-2">Reach Out to Us</h3>
                    <p className="body-md text-grey-600">
                      Contact us via email or direct call to start the conversation about distributing your sample products.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-royal-purple/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-royal-purple">2</span>
                  </div>
                  <div>
                    <h3 className="heading-sm text-grey-900 mb-2">Product Evaluation</h3>
                    <p className="body-md text-grey-600">
                      We'll thoroughly evaluate your product for market safety, quality standards, and consumer appeal.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-royal-purple/10 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-royal-purple">3</span>
                  </div>
                  <div>
                    <h3 className="heading-sm text-grey-900 mb-2">Decision & Next Steps</h3>
                    <p className="body-md text-grey-600">
                      We'll communicate our decision and work with you to determine the best approach for distributing your product samples.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-grey-100 rounded-2xl p-8 text-center">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-royal-purple mb-2">50+</div>
                  <div className="text-sm text-grey-600">Research Studies</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-royal-purple mb-2">10+</div>
                  <div className="text-sm text-grey-600">Partner Brands</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-royal-purple mb-2">1000+</div>
                  <div className="text-sm text-grey-600">Satisfied Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-royal-purple mb-2">99%</div>
                  <div className="text-sm text-grey-600">Quality Rating</div>
                </div>
              </div>
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