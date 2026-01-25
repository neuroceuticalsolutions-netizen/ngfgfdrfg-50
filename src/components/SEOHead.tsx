import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  keywords?: string;
}

const BASE_URL = "https://neuroceutical.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/lovable-uploads/927e818d-632e-49e4-bdad-c04fa319a4d1.png`;

export const SEOHead = ({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  type = "website",
  keywords = "neuroceuticals, cognitive enhancement, mental clarity, focus supplements, stress relief, South Africa, nootropics, brain health",
}: SEOHeadProps) => {
  const fullTitle = `${title} | Neuroceutical Solutions`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Neuroceutical Solutions" />
      <meta property="og:locale" content="en_ZA" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
