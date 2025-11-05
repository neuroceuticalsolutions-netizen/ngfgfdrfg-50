const southAfricaFlag = "/lovable-uploads/81129481-4b53-4d73-9ae5-6204bcf39f93.png";

export const AboutSection = () => {
  return <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="heading-lg text-royal-purple mb-8 animate-fade-in-up">
            About Neuroceutical Solutions
          </h2>
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-12 shadow-medium hover-lift">
            <p className="body-lg text-grey-700 leading-relaxed animate-fade-in-up" style={{
            animationDelay: '0.2s'
          }}>
              Based in <span className="font-semibold text-royal-purple">South Africa</span>, 
              Neuroceutical Solutions connects you with scientifically formulated solutions designed to enhance 
              mental performance and overall well-being.
            </p>
            
            <p className="body-md text-grey-600 mt-6 animate-fade-in-up" style={{
            animationDelay: '0.4s'
          }}>
              We partner with trusted neuroceutical brands to bring you evidence-based formulations 
              that support cognitive function, reduce mental fatigue, and promote sustained focus throughout your day.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8 animate-fade-in-up" style={{
            animationDelay: '0.6s'
          }}>
              <div className="text-center">
                <div className="w-6 h-4 sm:w-8 sm:h-6 flex items-center justify-center mx-auto">
                  <img src={southAfricaFlag} alt="South African Flag" className="w-full h-full object-cover rounded-sm" />
                </div>
                <p className="text-xs sm:text-sm text-grey-600 mt-1">South African Based</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-fresh-teal">🧬</div>
                <p className="text-xs sm:text-sm text-grey-600 mt-1">Science Backed</p>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-fresh-teal">🤝</div>
                <p className="text-xs sm:text-sm text-grey-600 mt-1">Trusted Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};