import { useState, useEffect } from "react"
import { Play, Pause } from "lucide-react"
const mentalFatigueImg = "/lovable-uploads/acfd35d1-9f1e-4abe-b81c-ad583c4da27a.png"
const cognitivePerformanceImg = "/lovable-uploads/25278d29-bf36-4f39-b847-ffe92ebff9ef.png"
const naturalStressReliefImg = "/lovable-uploads/0d343316-5888-4919-9490-4dc374ddbd70.png"
const mentalClarityImg = "/lovable-uploads/170f0ca5-f56c-4acc-a19f-c62162cc5370.png"

const benefits = [
  {
    title: "Reduce Mental Fatigue",
    description: "Combat cognitive exhaustion with scientifically formulated compounds that support sustained mental energy throughout demanding tasks.",
    image: mentalFatigueImg,
    bulletPoints: ["Sustained energy", "Cognitive support", "Mental endurance", "Task optimization"]
  },
  {
    title: "Enhance Cognitive Performance", 
    description: "Boost focus, memory, and processing speed with research-backed ingredients that optimize brain function and mental acuity.",
    image: cognitivePerformanceImg,
    bulletPoints: ["Improved focus", "Memory enhancement", "Processing speed", "Brain optimization"]
  },
  {
    title: "Natural Stress Relief",
    description: "Find calm and balance with natural adaptogens and compounds that help regulate cortisol and promote mental resilience.",
    image: naturalStressReliefImg,
    bulletPoints: ["Natural adaptogens", "Cortisol regulation", "Mental resilience", "Stress balance"]
  },
  {
    title: "Sustain Mental Clarity",
    description: "Maintain sharp, clear thinking with formulations designed to support long-term cognitive health and mental performance.",
    image: mentalClarityImg,
    bulletPoints: ["Sharp thinking", "Long-term health", "Mental performance", "Cognitive clarity"]
  }
]

export const ScienceBenefits = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % benefits.length)
    }, 6000) // 6 seconds per slide

    return () => clearInterval(interval)
  }, [isPlaying])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const currentBenefit = benefits[currentIndex]

  return (
    <section className="py-20 bg-subtle-gradient">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="heading-lg text-royal-purple mb-6 animate-fade-in-up">
            Science-Backed Benefits
          </h2>
          <p className="body-lg text-grey-600 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Every product we offer is supported by peer-reviewed research and clinical studies, 
            ensuring you receive effective solutions for cognitive enhancement.
          </p>
        </div>

        {/* Main diagonal split layout */}
        <div className="relative max-w-7xl mx-auto mb-16">
          <div className="relative h-[500px] md:h-[500px] h-auto min-h-[400px] overflow-hidden border-2 border-grey-200 md:border-grey-200 border-transparent">
            {/* Left side - Text content */}
            <div className="absolute inset-0 bg-white md:bg-white bg-transparent flex items-center">
              <div className="w-full md:w-1/2 p-6 md:p-12 relative z-10">
                {/* All bullet points with dynamic description */}
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index}>
                      <div className="flex items-center mb-2">
                        <button
                          onClick={() => {
                            setCurrentIndex(index)
                            setIsPlaying(false) // Pause auto-play when user interacts
                          }}
                          className={`w-8 md:w-12 h-1 mr-4 md:mr-8 transition-all duration-300 hover:h-2 hover:scale-110 cursor-pointer ${
                            index === currentIndex 
                              ? 'bg-royal-purple shadow-sm' 
                              : 'bg-grey-300 hover:bg-royal-purple/70'
                          }`}
                          aria-label={`Navigate to ${benefit.title}`}
                          title={`Navigate to ${benefit.title}`}
                        />
                        <div className="flex-1">
                          {index === currentIndex && (
                            <span className="text-sm md:text-base text-white md:text-grey-600 font-semibold md:font-normal">{benefit.title}</span>
                          )}
                        </div>
                      </div>
                      {index === currentIndex && (
                        <div className="mb-4">
                          <h5 className="text-sm md:text-lg text-white md:text-grey-900 leading-tight font-medium md:font-semibold">
                            {benefit.description}
                          </h5>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Background image for mobile, right side image for desktop */}
            <div className="absolute inset-0">
              {/* Mobile: Full background image with overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center md:hidden"
                style={{
                  backgroundImage: `url(${currentBenefit.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>
              
              {/* Desktop: Right side image with diagonal clip */}
              <div 
                className="absolute right-0 top-0 w-1/2 h-full bg-cover bg-center hidden md:block"
                style={{
                  backgroundImage: `url(${currentBenefit.image})`,
                  clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)'
                }}
              >
                {/* Play/Pause button overlay */}
                <div 
                  className="absolute inset-0 flex items-center justify-center group opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  onClick={togglePlayPause}
                >
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-300 backdrop-blur-sm pointer-events-none"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Mobile: Play/Pause button */}
              <div 
                className="absolute top-4 right-4 md:hidden z-20"
                onClick={togglePlayPause}
              >
                <button
                  className="bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center mt-6 space-x-2 relative z-10">
            {benefits.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
                  index === currentIndex 
                    ? 'bg-royal-purple border-royal-purple' 
                    : 'bg-white/80 md:bg-grey-300 border-white md:border-grey-300 hover:bg-white md:hover:bg-grey-400'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-medium max-w-4xl mx-auto">
            <h3 className="heading-sm text-royal-purple mb-4">Research-Driven Approach</h3>
            <p className="body-md text-grey-600 mb-6">
              Our solutions are sourced from trusted brands and backed by peer-reviewed research. 
              We believe in transparency and evidence-based formulations that deliver real results.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="bg-grey-100 px-4 py-2 rounded-lg text-grey-700">Peer-Reviewed Studies</span>
              <span className="bg-grey-100 px-4 py-2 rounded-lg text-grey-700">Clinical Research</span>
              <span className="bg-grey-100 px-4 py-2 rounded-lg text-grey-700">Third-Party Testing</span>
              <span className="bg-grey-100 px-4 py-2 rounded-lg text-grey-700">Quality Assurance</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}