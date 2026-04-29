import { AlertTriangle, ShieldCheck, Info } from "lucide-react";
import { Link } from "react-router-dom";

type Variant = "home" | "products" | "partners" | "newsletter";

interface PageDisclaimerProps {
  variant: Variant;
}

const CONTENT: Record<Variant, { title: string; body: React.ReactNode; icon: React.ReactNode; tone: "amber" | "teal" | "grey" }> = {
  home: {
    icon: <AlertTriangle className="w-5 h-5" />,
    tone: "amber",
    title: "Health & Privacy Notice",
    body: (
      <>
        <p className="mb-2">
          <strong>SAHPRA notice:</strong> The nootropic and cognitive support products featured on this site are
          complementary health products. Statements made on this website have not been evaluated by the South African
          Health Products Regulatory Authority (SAHPRA) and are not intended to diagnose, treat, cure or prevent any
          disease. Always consult a qualified healthcare professional before starting any new supplement, particularly
          if you are pregnant, breastfeeding, under 18, on chronic medication, or living with a medical condition.
        </p>
        <p>
          <strong>POPIA notice:</strong> Neuroceutical Solutions processes personal information in line with the
          Protection of Personal Information Act, 2013 (POPIA). See our{" "}
          <Link to="/privacy" className="underline hover:text-fresh-teal">Privacy Policy</Link> and{" "}
          <Link to="/disclaimer" className="underline hover:text-fresh-teal">full Disclaimer</Link> for details.
        </p>
      </>
    ),
  },
  products: {
    icon: <Info className="w-5 h-5" />,
    tone: "amber",
    title: "Product & SAHPRA Disclaimer",
    body: (
      <>
        <p className="mb-2">
          Products listed on this page are complementary health products distributed in South Africa. Claims have not
          been evaluated by SAHPRA and these products are <strong>not intended to diagnose, treat, cure or prevent any
          disease</strong>. Individual results may vary. Always read the product label, follow the recommended dosage,
          and consult your healthcare provider before use — especially if you are pregnant, breastfeeding, under 18,
          taking prescription medication, or have a pre-existing medical condition.
        </p>
        <p>
          Ingredient lists, formulations and availability are supplied by partner brands and may change without notice.
          Nicotine-containing products (where listed) are intended for adult use only (18+) and contain a highly
          addictive substance.
        </p>
      </>
    ),
  },
  partners: {
    icon: <ShieldCheck className="w-5 h-5" />,
    tone: "teal",
    title: "Partner Compliance & Data Protection Notice",
    body: (
      <>
        <p className="mb-2">
          <strong>Regulatory compliance:</strong> Brand partners are responsible for ensuring that their products
          comply with all applicable South African regulations, including SAHPRA requirements for complementary
          medicines and health supplements, the Foodstuffs, Cosmetics and Disinfectants Act, and any product-specific
          legislation (for example, the Tobacco Products Control Act for nicotine products). Neuroceutical Solutions
          facilitates free sample distribution and does not make therapeutic claims on behalf of partner brands.
        </p>
        <p>
          <strong>POPIA — partner data:</strong> Information you submit through our partner application is processed
          as a Responsible Party under POPIA solely to evaluate distribution suitability and communicate with your
          team. We do not sell or share partner data with unrelated third parties. See our{" "}
          <Link to="/privacy" className="underline hover:text-fresh-teal">Privacy Policy</Link> for retention and
          access rights.
        </p>
      </>
    ),
  },
  newsletter: {
    icon: <ShieldCheck className="w-5 h-5" />,
    tone: "grey",
    title: "POPIA Consent & Health Information Notice",
    body: (
      <>
        <p className="mb-2">
          <strong>POPIA consent:</strong> By subscribing, you consent in terms of the Protection of Personal
          Information Act, 2013 to Neuroceutical Solutions processing your email address to send educational content,
          product updates and free sample announcements. You may withdraw consent and unsubscribe at any time using
          the link in any email. We do not sell or share your information with third parties.
        </p>
        <p>
          <strong>Health content:</strong> Newsletter content is provided for educational purposes only, is not
          medical advice, and has not been evaluated by SAHPRA. Always consult a qualified healthcare professional
          before acting on any supplement or wellness information.
        </p>
      </>
    ),
  },
};

const TONE_CLASSES: Record<"amber" | "teal" | "grey", string> = {
  amber: "bg-amber-50 border-amber-200 text-amber-900",
  teal: "bg-fresh-teal/5 border-fresh-teal/30 text-grey-800",
  grey: "bg-grey-50 border-grey-200 text-grey-800",
};

const ICON_TONE: Record<"amber" | "teal" | "grey", string> = {
  amber: "text-amber-600",
  teal: "text-fresh-teal",
  grey: "text-grey-600",
};

export const PageDisclaimer = ({ variant }: PageDisclaimerProps) => {
  const { title, body, icon, tone } = CONTENT[variant];
  return (
    <section aria-label="Compliance disclaimer" className="py-10 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className={`rounded-lg border p-5 sm:p-6 ${TONE_CLASSES[tone]}`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 mt-0.5 ${ICON_TONE[tone]}`}>{icon}</div>
            <div className="text-xs sm:text-sm leading-relaxed">
              <h2 className="font-semibold text-sm sm:text-base mb-2">{title}</h2>
              {body}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageDisclaimer;