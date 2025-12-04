import { useState } from "react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { HeroButton } from "@/components/ui/hero-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getSelectedProductNames = () => {
    if (selectedProducts.length === 0) return null;
    if (selectedProducts.length === 1) {
      const product = products.find(p => p.id === selectedProducts[0]);
      return product ? `${product.brand} - ${product.name}` : null;
    }
    return `${selectedProducts.length} products selected`;
  };
  return <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl text-royal-purple mb-6">Contact Us</h1>
            <p className="body-lg text-grey-600 mb-12">
              Have questions about our products? Want to learn more about cognitive enhancement? Get in touch with us today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-royal-purple">Get Product Information</CardTitle>
                <CardDescription>
                  Interested in our products? Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product">Product Interest</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                          !selectedProducts.length && "text-muted-foreground"
                        )}
                      >
                        <span className="truncate">
                          {getSelectedProductNames() || "Select products..."}
                        </span>
                        <ChevronDown className="h-4 w-4 opacity-50 flex-shrink-0" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-2 max-h-60 overflow-y-auto" align="start">
                      <div className="space-y-2">
                        {products.map(product => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                            onClick={() => toggleProduct(product.id)}
                          >
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProduct(product.id)}
                            />
                            <span className="text-sm">{product.brand} - {product.name}</span>
                          </div>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us about your interest in our products or any questions you have..." rows={5} />
                </div>
                <HeroButton variant="hero" className="w-full">
                  Send Message
                </HeroButton>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-royal-purple">Get in Touch</CardTitle>
                  <CardDescription>
                    Reach out to us through any of these channels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-royal-purple" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-grey-600">info@neuroceuticalsolutions.co.za</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-royal-purple" />
                    <div>
                      <p className="font-semibold">Phone</p>
                      <p className="text-grey-600">+27 (0) 62 476 7535</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-royal-purple" />
                    <div>
                      <p className="font-semibold">Location</p>
                      <p className="text-grey-600">South Africa</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-royal-purple">Business Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-grey-600">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-grey-600">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-grey-600">Closed</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>;
};
export default Contact;