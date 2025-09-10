import { HeroButton } from "@/components/ui/hero-button"
import { Link } from "react-router-dom"

export const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-grey-200">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/">
              <img 
                src="/lovable-uploads/808eb30a-9764-43b9-8484-c2cd5ac5164c.png"
                alt="Neuroceutical Solutions logo" 
                className="h-16 w-auto cursor-pointer"
              />
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              About
            </Link>
            <Link to="/products" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              Products
            </Link>
            <Link to="/science" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              Science
            </Link>
            <Link to="/newsletter" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              Newsletter
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/get-started">
              <HeroButton variant="hero" size="sm">
                Get Started
              </HeroButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-grey-700 hover:text-royal-purple">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}