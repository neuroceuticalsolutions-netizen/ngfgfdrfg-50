import { HeroButton } from "@/components/ui/hero-button";
import { MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer className="bg-grey-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="heading-sm text-fresh-teal mb-4">Neuroceutical Solutions</h3>
            <p className="text-sm sm:body-sm text-grey-300 mb-6 leading-relaxed">
              South Africa's trusted partner for science-backed neuroceutical solutions. 
              We connect you with premium cognitive enhancement products from leading international brands.
            </p>
            <div className="flex flex-row gap-2">
              
              <HeroButton variant="ghost" size="sm" className="text-grey-300 hover:text-fresh-teal p-2">
                <Facebook size={20} />
              </HeroButton>
              <HeroButton variant="ghost" size="sm" className="text-grey-300 hover:text-fresh-teal p-2">
                <Instagram size={20} />
              </HeroButton>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="heading-sm mb-4">Contact Info</h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start">
                <Mail className="text-fresh-teal mr-2" size={16} />
                <div>
                  <p className="text-grey-300">Email</p>
                  <a href="mailto:info@neuroceuticalsolutions.co.za" className="text-white hover:text-fresh-teal">
                    info@neuroceuticalsolutions.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="text-white mr-2" size={16} />
                <div>
                  <p className="text-grey-300">Phone</p>
                  <a href="tel:+27123456789" className="text-white hover:text-fresh-teal">+27 62 476 7535</a>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="text-fresh-teal mr-2" size={16} />
                <div>
                  <p className="text-grey-300">Address</p>
                  <p className="text-white">Pietermaritzburg<br />KwaZulu-Natal, South Africa</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links - Consumers & Partners */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="heading-sm mb-4">For Consumers</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link to="/products" className="text-grey-300 hover:text-fresh-teal">Products</Link></li>
                <li><Link to="/science" className="text-grey-300 hover:text-fresh-teal">Science</Link></li>
                <li><Link to="/about" className="text-grey-300 hover:text-fresh-teal">About Us</Link></li>
                <li><Link to="/newsletter" className="text-grey-300 hover:text-fresh-teal">Newsletter</Link></li>
                <li><Link to="/contact" className="text-grey-300 hover:text-fresh-teal">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="heading-sm mb-4">For Partners</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li><Link to="/get-started" className="text-grey-300 hover:text-fresh-teal">Distribution Opportunities</Link></li>
                <li><Link to="/get-started#requirements" className="text-grey-300 hover:text-fresh-teal">Partner Requirements</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-grey-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-xs sm:text-sm text-grey-400 text-center md:text-left">
              <p>© 2024 Neuroceutical Solution. All rights reserved.</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4">
                <Link to="/privacy" className="hover:text-fresh-teal">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-fresh-teal">Terms of Service</Link>
                <Link to="/disclaimer" className="hover:text-fresh-teal">Disclaimer</Link>
              </div>
            </div>
            <div className="text-sm text-grey-400">
              <p>Designed for South African distribution</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-grey-800 rounded-lg">
          <p className="text-xs sm:text-sm text-grey-400 leading-relaxed">
            <strong>Disclaimer:</strong> These statements have not been evaluated by the South African Health Products Regulatory Authority (SAHPRA). 
            These products are not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a healthcare professional before starting any new supplement regimen.
          </p>
        </div>
      </div>
    </footer>;
};