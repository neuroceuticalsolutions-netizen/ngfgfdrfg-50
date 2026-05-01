import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "@/components/ScrollToTop";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationSchema, WebSiteSchema } from "@/components/StructuredData";
import { useEffect } from "react";
import { installCtaClickTracker } from "@/lib/analytics";
import Index from "./pages/Index";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Science from "./pages/Science";
import Newsletter from "./pages/Newsletter";
import Guides from "./pages/Guides";
import Contact from "./pages/Contact";
import GetStarted from "./pages/GetStarted";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import ArticleDetail from "./pages/ArticleDetail";
import PartnerApply from "./pages/PartnerApply";
import AdminLogin from "./pages/AdminLogin";
import AdminApplications from "./pages/AdminApplications";
import Unsubscribe from "./pages/Unsubscribe";
import AdminEmailPreview from "./pages/AdminEmailPreview";
import AdminRobotsTxt from "./pages/AdminRobotsTxt";
import AdminAuthEmailPreview from "./pages/AdminAuthEmailPreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    installCtaClickTracker();
  }, []);

  return (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <OrganizationSchema />
        <WebSiteSchema />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/science" element={<Science />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/partners/apply" element={<PartnerApply />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/email-preview" element={<AdminEmailPreview />} />
          <Route path="/admin/robots-txt" element={<AdminRobotsTxt />} />
          <Route path="/admin/auth-email-preview" element={<AdminAuthEmailPreview />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
  );
};

export default App;
