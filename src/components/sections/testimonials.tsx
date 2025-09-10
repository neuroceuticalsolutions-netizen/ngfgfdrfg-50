const testimonials = [
  {
    quote: "The L-Theanine blend has completely transformed my daily focus without the crash I used to get from regular coffee.",
    name: "Sarah M.",
    location: "Cape Town",
    role: "Marketing Executive"
  },
  {
    quote: "As someone working in high-pressure finance, these formulations help me maintain clarity during long trading sessions.",
    name: "Michael K.",
    location: "Johannesburg", 
    role: "Financial Analyst"
  },
  {
    quote: "The quality and effectiveness of these products exceeded my expectations. Truly science-backed solutions.",
    name: "Dr. Priya N.",
    location: "Durban",
    role: "Research Scientist"
  },
  {
    quote: "Finally found a South African distributor I can trust for premium cognitive enhancement supplements.",
    name: "James R.",
    location: "Pretoria",
    role: "Software Developer"
  }
]

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-royal-purple mb-6 animate-fade-in-up">
            Testimonials & Brand Trust
          </h2>
          <p className="body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Hear from satisfied customers across South Africa who have experienced 
            the benefits of our science-backed neuroceutical solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-grey-50 rounded-2xl p-8 hover-lift animate-fade-in-up"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <div className="mb-6">
                <div className="flex text-fresh-teal text-xl mb-4">
                  {"★".repeat(5)}
                </div>
                <p className="body-md text-grey-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-hero-gradient rounded-full flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-royal-purple">{testimonial.name}</p>
                  <p className="text-sm text-grey-600">{testimonial.role}</p>
                  <p className="text-xs text-fresh-teal">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-hero-gradient rounded-2xl p-8 md:p-12 text-white max-w-4xl mx-auto">
            <h3 className="heading-md mb-4">Our Commitment to Quality</h3>
            <p className="body-lg mb-8 opacity-90">
              Our solutions are sourced from trusted brands and backed by peer-reviewed research. 
              We're committed to transparency, quality, and delivering real results to our South African customers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🔬</div>
                <p className="font-semibold">Scientific Evidence</p>
                <p className="text-sm opacity-80">Research-backed formulations</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🏆</div>
                <p className="font-semibold">Quality Partners</p>
                <p className="text-sm opacity-80">Trusted international brands</p>
              </div>
              <div>
                <div className="text-3xl mb-2">🇿🇦</div>
                <p className="font-semibold">Local Expertise</p>
                <p className="text-sm opacity-80">South African distribution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}