import { Navigation } from "@/components/sections/navigation"
import { Footer } from "@/components/sections/footer"
import { HeroButton } from "@/components/ui/hero-button"

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6 animate-fade-in-up">
              About Neuroceutical Solutions
            </h1>
            <p className="body-lg text-grey-600 mb-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              We're pioneering the future of cognitive enhancement through science-backed formulations 
              and partnerships with leading supplement manufacturers.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="heading-lg text-royal-purple mb-6">Our Mission</h2>
              <p className="body-md text-grey-600 mb-6">
                At Neuroceutical Solutions, we believe that optimal cognitive performance shouldn't be left to chance. 
                Our mission is to bridge the gap between cutting-edge neuroscience research and accessible, 
                effective cognitive enhancement solutions.
              </p>
              <p className="body-md text-grey-600 mb-8">
                We work exclusively with established manufacturers who share our commitment to quality, 
                transparency, and scientific rigor, ensuring every product we offer meets the highest standards.
              </p>
              <HeroButton variant="hero">
                Learn More About Our Process
              </HeroButton>
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

      {/* Team Section */}
      <section className="py-20 bg-subtle-gradient">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-royal-purple mb-6">Our Team</h2>
            <p className="body-lg text-grey-600 max-w-3xl mx-auto">
              Our diverse team combines expertise in neuroscience, nutrition, and business 
              to deliver exceptional cognitive enhancement solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center shadow-medium">
              <div className="w-20 h-20 bg-royal-purple/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-royal-purple">Dr</span>
              </div>
              <h3 className="heading-sm text-grey-900 mb-2">Dr. Sarah Chen</h3>
              <p className="text-fresh-teal mb-4 font-medium">Chief Scientific Officer</p>
              <p className="body-sm text-grey-600">
                PhD in Neuroscience from MIT with 15+ years in cognitive research and supplement development.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-medium">
              <div className="w-20 h-20 bg-fresh-teal/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-fresh-teal">MB</span>
              </div>
              <h3 className="heading-sm text-grey-900 mb-2">Michael Rodriguez</h3>
              <p className="text-royal-purple mb-4 font-medium">CEO & Founder</p>
              <p className="body-sm text-grey-600">
                Former pharmaceutical executive with a passion for making cognitive enhancement accessible to all.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center shadow-medium">
              <div className="w-20 h-20 bg-royal-purple/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-royal-purple">AK</span>
              </div>
              <h3 className="heading-sm text-grey-900 mb-2">Amanda Kim</h3>
              <p className="text-fresh-teal mb-4 font-medium">Head of Quality Assurance</p>
              <p className="body-sm text-grey-600">
                Ensures every product meets our rigorous standards through comprehensive testing and validation.
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
    </main>
  );
};

export default About;