import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "product";
  keywords?: string;
  /** Optional metadata used when type="article" */
  publishedTime?: string;
  author?: string;
}

const BASE_URL = "https://neuroceutical.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_IMAGE_ALT =
  "Neuroceutical Solutions — premium nootropics & cognitive enhancement, South Africa";
const TWITTER_HANDLE = "@neuroceutical_za";

export const SEOHead = ({
  title,
  description,
  path = "",
  image = DEFAULT_IMAGE,
  imageAlt = DEFAULT_IMAGE_ALT,
  type = "website",
  keywords = "neuroceuticals, cognitive enhancement, mental clarity, focus supplements, stress relief, South Africa, nootropics, brain health",
  publishedTime,
  author,
}: SEOHeadProps) => {
  const fullTitle = `${title} | Neuroceutical Solutions`;
  const url = `${BASE_URL}${path}`;
  // Resolve relative image paths (e.g. /lovable-uploads/...) to absolute URLs,
  // which is required by OpenGraph / Twitter Card crawlers.
  const absoluteImage = image.startsWith("http") ? image : `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;

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
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:type" content={absoluteImage.endsWith(".jpg") || absoluteImage.endsWith(".jpeg") ? "image/jpeg" : "image/png"} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Neuroceutical Solutions" />
      <meta property="og:locale" content="en_ZA" />

      {/* Article-specific OpenGraph */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && (
        <meta property="article:section" content="Nootropics & Cognitive Health" />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};
