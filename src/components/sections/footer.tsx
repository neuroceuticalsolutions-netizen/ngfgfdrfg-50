import { HeroButton } from "@/components/ui/hero-button";
import { MapPin } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-grey-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="heading-sm text-fresh-teal mb-4">Neuroceutical Solutions</h3>
            <p className="body-sm text-grey-300 mb-6 leading-relaxed">
              South Africa's trusted partner for science-backed neuroceutical solutions. 
              We connect you with premium cognitive enhancement products from leading international brands.
            </p>
            <div className="flex gap-4">
              
              <HeroButton variant="ghost" size="sm" className="text-grey-300 hover:text-fresh-teal">
                Facebook
              </HeroButton>
              <HeroButton variant="ghost" size="sm" className="text-grey-300 hover:text-fresh-teal">
                Instagram
              </HeroButton>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="heading-sm mb-4">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-fresh-teal mr-2">📧</span>
                <div>
                  <p className="text-grey-300">Email</p>
                  <a href="mailto:info@neuroceuticalsolutions.co.za" className="text-white hover:text-fresh-teal">
                    info@neuroceuticalsolutions.co.za
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-fresh-teal mr-2">📞</span>
                <div>
                  <p className="text-grey-300">Phone</p>
                  <a href="tel:+27123456789" className="text-white hover:text-fresh-teal">
                    +27 12 345 6789
                  </a>
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

          {/* Quick Links */}
          <div>
            <h4 className="heading-sm mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="text-grey-300 hover:text-fresh-teal">About Us</a></li>
              <li><a href="#products" className="text-grey-300 hover:text-fresh-teal">Products</a></li>
              <li><a href="#partners" className="text-grey-300 hover:text-fresh-teal">Partners</a></li>
              <li><a href="#science" className="text-grey-300 hover:text-fresh-teal">Science</a></li>
              <li><a href="#newsletter" className="text-grey-300 hover:text-fresh-teal">Newsletter</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-grey-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row gap-4 text-sm text-grey-400">
              <p>© 2024 Neuroceutical Solution. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="/privacy" className="hover:text-fresh-teal">Privacy Policy</a>
                <a href="/terms" className="hover:text-fresh-teal">Terms of Service</a>
                <a href="/disclaimer" className="hover:text-fresh-teal">Disclaimer</a>
              </div>
            </div>
            <div className="text-sm text-grey-400">
              <p>Designed for South African distribution</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-grey-800 rounded-lg">
          <p className="text-xs text-grey-400 leading-relaxed">
            <strong>Disclaimer:</strong> These statements have not been evaluated by the South African Health Products Regulatory Authority (SAHPRA). 
            These products are not intended to diagnose, treat, cure, or prevent any disease. 
            Always consult with a healthcare professional before starting any new supplement regimen.
          </p>
        </div>
      </div>
    </footer>;
};