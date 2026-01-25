import { Helmet } from "react-helmet-async";

interface OrganizationSchemaProps {
  includeFull?: boolean;
}

export const OrganizationSchema = ({ includeFull = true }: OrganizationSchemaProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Neuroceutical Solutions",
    "url": "https://neuroceutical.lovable.app",
    "logo": "https://neuroceutical.lovable.app/lovable-uploads/927e818d-632e-49e4-bdad-c04fa319a4d1.png",
    "description": "Premium science-backed neuroceutical products for cognitive enhancement in South Africa",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pietermaritzburg",
      "addressRegion": "KwaZulu-Natal",
      "addressCountry": "ZA"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+27-62-476-7535",
      "contactType": "customer service",
      "email": "info@neuroceuticalsolutions.co.za",
      "availableLanguage": "English"
    },
    "sameAs": []
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Neuroceutical Solutions",
    "url": "https://neuroceutical.lovable.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://neuroceutical.lovable.app/products?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {includeFull && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}
    </Helmet>
  );
};

interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  brand: string;
  category: string;
  rating: number;
  reviewCount: number;
  slug: string;
}

export const ProductSchema = ({
  name,
  description,
  image,
  brand,
  category,
  rating,
  reviewCount,
  slug,
}: ProductSchemaProps) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "category": category,
    "url": `https://neuroceutical.lovable.app/products/${slug}`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": rating.toString(),
      "reviewCount": reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "ZAR",
      "seller": {
        "@type": "Organization",
        "name": "Neuroceutical Solutions"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
    </Helmet>
  );
};

interface FAQSchemaProps {
  faqs: Array<{ question: string; answer: string }>;
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};
