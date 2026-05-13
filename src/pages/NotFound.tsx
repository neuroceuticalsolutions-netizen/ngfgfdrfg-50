import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { SEOHead } from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-subtle-gradient">
      <SEOHead
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Explore Neuroceutical Solutions for nootropics, cognitive enhancers, stress relief and mental fatigue support in South Africa."
        path={location.pathname}
        keywords="neuroceuticals, cognitive enhancers, stress relief, mental fatigue, nootropics south africa"
      />
      <Helmet>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-24 h-24 bg-hero-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
          <span className="text-4xl text-white">🔍</span>
        </div>
        <h1 className="heading-lg text-royal-purple mb-4">Page Not Found</h1>
        <p className="body-md text-grey-600 mb-8">
          Oops! The page you're looking for doesn't exist or may have been moved.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-royal-purple text-white rounded-lg hover:bg-fresh-teal transition-colors duration-300"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
