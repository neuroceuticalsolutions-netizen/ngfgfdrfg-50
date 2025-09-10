import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-subtle-gradient">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-24 h-24 bg-hero-gradient rounded-full mx-auto mb-8 flex items-center justify-center">
          <span className="text-4xl text-white">🔍</span>
        </div>
        <h1 className="heading-lg text-royal-purple mb-4">Page Not Found</h1>
        <p className="body-md text-grey-600 mb-8">
          Oops! The page you're looking for doesn't exist or may have been moved.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center px-6 py-3 bg-royal-purple text-white rounded-lg hover:bg-fresh-teal transition-colors duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
