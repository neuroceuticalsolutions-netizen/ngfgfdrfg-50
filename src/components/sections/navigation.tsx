import { useState } from "react"
import { HeroButton } from "@/components/ui/hero-button"
import { Link, useLocation } from "react-router-dom"
import { ChevronDown, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/CartContext"

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHiddenMenuOpen, setIsHiddenMenuOpen] = useState(false)
  const { itemCount, openCart } = useCart()
  const location = useLocation()
  const showCart = location.pathname.startsWith("/peptides") || location.pathname === "/checkout"
  const dropdownLabel = (location.pathname.startsWith("/peptides") || location.pathname === "/checkout") ? "Nootropics" : "Peptides"

  const CartButton = ({ className = "" }: { className?: string }) => (
    <button
      type="button"
      onClick={openCart}
      aria-label={`Open cart${itemCount ? ` (${itemCount} items)` : ""}`}
      className={`relative p-2 text-grey-700 hover:text-royal-purple transition-colors ${className}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-royal-purple text-white text-[10px] font-bold flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-grey-200">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-1 relative">
            <Link to="/">
              <img 
                src="/lovable-uploads/808eb30a-9764-43b9-8484-c2cd5ac5164c.png"
                alt="Neuroceutical Solutions logo" 
                className="h-12 sm:h-16 w-auto cursor-pointer"
              />
            </Link>
            <button
              type="button"
              onClick={() => setIsHiddenMenuOpen(!isHiddenMenuOpen)}
              aria-label="More options"
              aria-expanded={isHiddenMenuOpen}
              className="p-1 text-grey-700 hover:text-royal-purple transition-colors"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${isHiddenMenuOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {isHiddenMenuOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-grey-200 rounded-md shadow-lg py-2 min-w-[160px] z-50">
                <Link
                  to="/peptides"
                  onClick={() => setIsHiddenMenuOpen(false)}
                  className="flex items-center gap-1.5 px-4 py-2 text-grey-700 hover:text-royal-purple hover:bg-grey-50 transition-colors font-medium text-sm"
                >
                  {dropdownLabel}
                  <span className="w-1.5 h-1.5 rounded-full bg-fresh-teal" aria-hidden="true" />
                </Link>
              </div>
            )}
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
            <Link to="/guides" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              Guides
            </Link>
            <Link to="/newsletter" className="text-grey-700 hover:text-royal-purple transition-colors font-medium">
              Newsletter
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-2">
            {showCart && <CartButton />}
            <Link to="/get-started">
              <HeroButton
                variant="hero"
                size="sm"
                data-analytics-cta="nav_partner_with_us"
                data-analytics-location="navigation_desktop"
                data-analytics-audience="b2b"
              >
                Partner With Us
              </HeroButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-1">
            {showCart && <CartButton />}
            <button
              className="p-2 text-grey-700 hover:text-royal-purple"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-grey-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link 
                to="/about" 
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/products" 
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/science" 
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Science
              </Link>
              <Link
                to="/guides"
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Guides
              </Link>
              <Link 
                to="/newsletter" 
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
              <Link
                to="/peptides"
                className="text-grey-700 hover:text-royal-purple transition-colors font-medium px-2 py-1 flex items-center gap-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dropdownLabel}
                <span className="w-1.5 h-1.5 rounded-full bg-fresh-teal" aria-hidden="true" />
              </Link>
              <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                <HeroButton
                  variant="hero"
                  size="sm"
                  className="w-full mt-2"
                  data-analytics-cta="nav_partner_with_us"
                  data-analytics-location="navigation_mobile"
                  data-analytics-audience="b2b"
                >
                  Partner With Us
                </HeroButton>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}