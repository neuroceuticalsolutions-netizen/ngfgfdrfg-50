import { useState } from "react"
import { HeroButton } from "@/components/ui/hero-button"
import { Input } from "@/components/ui/input"

export const Newsletter = () => {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would integrate with your newsletter service
    console.log("Newsletter signup:", email)
    setIsSubscribed(true)
    setEmail("")
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-accent-gradient">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto text-white">
            <div className="text-6xl mb-6">✓</div>
            <h2 className="heading-lg mb-4">Thank You!</h2>
            <p className="body-lg opacity-90">
              You've successfully subscribed to our newsletter. 
              Stay tuned for updates on free samples and new partnerships.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-accent-gradient">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto text-white">
          <h2 className="heading-lg mb-6 animate-fade-in-up">
            Be the First to Know
          </h2>
          
          <p className="body-lg mb-8 opacity-90 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Sign up to get updates on free sample campaigns, new partnerships, 
            and product launches across South Africa.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:border-white focus:ring-white"
              />
              <HeroButton 
                type="submit" 
                variant="teal" 
                size="default"
                className="bg-white text-fresh-teal hover:bg-grey-100 hover:scale-105"
              >
                Subscribe
              </HeroButton>
            </div>
          </form>

          <div className="mt-8 text-sm opacity-75 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p>Get exclusive access to:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-3">
              <span className="bg-white/10 px-3 py-1 rounded-full">Free Sample Campaigns</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">New Product Launches</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Partnership Announcements</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">Educational Content</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}