import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { seoContent } from "@lib/content";
import type { JsonLdData } from "@lib/types";

interface SEOProps {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly type?: "website" | "article";
  /** JSON-LD structured data for rich results */
  readonly jsonLd?: JsonLdData;
}

/**
 * SEO component for dynamic meta tags.
 * Sets title, description, Open Graph, Twitter Card, and JSON-LD structured data.
 */
export function SEOComponent({
  title,
  description = seoContent.defaultDescription,
  image = "/og-image.png",
  type = "website",
  jsonLd,
}: SEOProps) {
  const location = useLocation();
  const fullTitle = title
    ? `${title} | ${seoContent.siteName}`
    : seoContent.defaultTitle;

  // Directly set document.title as reliable fallback for SPA navigation
  // react-helmet-async can be flaky during route changes
  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  const fullImageUrl = image.startsWith("http")
    ? image
    : `${seoContent.siteUrl}${image}`;

  const fullUrl = `${seoContent.siteUrl}${location.pathname}`;

  const isDefaultDescription = description === seoContent.defaultDescription;
  const isDefaultImage = image === "/og-image.png";
  const isDefaultType = type === "website";

  return (
    <Helmet>
      {/* Use fullTitle as key to force Helmet DOM update on SPA navigation */}
      <title key={fullTitle}>{fullTitle}</title>

      {!isDefaultDescription && (
        <meta name="description" content={description} />
      )}

      <meta name="theme-color" content="#09090b" />

      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {!isDefaultType && <meta property="og:type" content={type} />}
      <meta property="og:title" content={fullTitle} />
      {!isDefaultDescription && (
        <meta property="og:description" content={description} />
      )}
      {!isDefaultImage && <meta property="og:image" content={fullImageUrl} />}
      <meta property="og:url" content={fullUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
