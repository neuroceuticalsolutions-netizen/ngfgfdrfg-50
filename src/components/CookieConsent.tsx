import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

const COOKIE_CONSENT_KEY = "neuroceutical-cookie-consent";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(necessaryOnly));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-in-up">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-2xl shadow-large border border-grey-200 overflow-hidden">
          {!showPreferences ? (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-royal-purple/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-royal-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-grey-900 mb-2">We value your privacy</h3>
                  <p className="text-sm text-grey-600 mb-4">
                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                    By clicking "Accept All", you consent to our use of cookies. Read our{" "}
                    <Link to="/privacy" className="text-royal-purple hover:underline font-medium">
                      Privacy Policy
                    </Link>{" "}
                    for more information.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={handleAcceptAll}
                      className="bg-royal-purple hover:bg-royal-purple/90"
                    >
                      Accept All
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleAcceptNecessary}
                    >
                      Necessary Only
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setShowPreferences(true)}
                      className="text-grey-600"
                    >
                      Manage Preferences
                    </Button>
                  </div>
                </div>
                <button
                  onClick={handleAcceptNecessary}
                  className="text-grey-400 hover:text-grey-600 transition-colors"
                  aria-label="Close cookie banner"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-grey-900">Cookie Preferences</h3>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-grey-400 hover:text-grey-600 transition-colors"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-4 bg-grey-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-grey-900">Necessary</h4>
                    <p className="text-sm text-grey-600">Required for the website to function properly</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5 accent-royal-purple"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-grey-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-grey-900">Analytics</h4>
                    <p className="text-sm text-grey-600">Help us understand how visitors interact with our site</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-5 h-5 accent-royal-purple cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 bg-grey-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-grey-900">Marketing</h4>
                    <p className="text-sm text-grey-600">Used to deliver personalized advertisements</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    className="w-5 h-5 accent-royal-purple cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={handleSavePreferences}
                  className="bg-royal-purple hover:bg-royal-purple/90"
                >
                  Save Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPreferences(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
