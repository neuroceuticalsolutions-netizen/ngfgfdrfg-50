import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Handshake } from "lucide-react";
import { HeroButton } from "@/components/ui/hero-button";
export const AudienceSelector = () => {
  return <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How Can We Help You?</h2>
          <p className="text-lg text-muted-foreground">
            Choose your path to cognitive enhancement
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Consumer Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
            <CardHeader className="text-center pt-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I Want to Buy Products</CardTitle>
              <CardDescription className="text-base">
                Explore our curated selection of premium nootropics and cognitive enhancers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>✓ Browse verified products</li>
                <li>✓ Read science-backed benefits</li>
                <li>✓ Find where to purchase</li>
              </ul>
              <Link to="/products">
                <HeroButton variant="hero" size="lg" className="w-full">
                  Explore Products
                </HeroButton>
              </Link>
            </CardContent>
          </Card>

          {/* Partner Card */}
          <Card className="hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
            <CardHeader className="text-center pt-8">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">I Want to Distribute Products</CardTitle>
              <CardDescription className="text-base">
                Partner with us to bring premium nootropics to South African consumers
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <ul className="text-sm text-muted-foreground mb-6 space-y-2">
                <li>✓ Thorough evaluation process</li>
                <li>✓ Full support & guidance</li>
                <li>✓ Expand your product line</li>
              </ul>
              <Link to="/get-started">
                <HeroButton variant="outline" size="lg" className="w-full">
                  Partner With Us
                </HeroButton>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};