import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { seoContent } from "@lib/content";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
}

/**
 * SEO component for dynamic meta tags.
 * Sets title, description, Open Graph, Twitter Card, and JSON-LD structured data.
 */
export function SEO({
    title,
    description = seoContent.defaultDescription,
    image = "/og-image.png",
    type = "website",
}: SEOProps) {
    const location = useLocation();
    const fullTitle = title
        ? `${title} | ${seoContent.siteName}`
        : seoContent.defaultTitle;

    const fullImageUrl = image.startsWith("http")
        ? image
        : `${seoContent.siteUrl}${image}`;

    const fullUrl = `${seoContent.siteUrl}${location.pathname}`;

    const isDefaultTitle = fullTitle === seoContent.defaultTitle;
    const isDefaultDescription = description === seoContent.defaultDescription;
    const isDefaultImage = image === "/og-image.png";
    const isDefaultType = type === "website";

    return (
        <Helmet>
            {!isDefaultTitle && <title>{fullTitle}</title>}

            {!isDefaultDescription && (
                <meta name="description" content={description} />
            )}

            <meta name="theme-color" content="#09090b" />

            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullUrl} />

            {!isDefaultType && <meta property="og:type" content={type} />}
            {!isDefaultTitle && <meta property="og:title" content={fullTitle} />}
            {!isDefaultDescription && (
                <meta property="og:description" content={description} />
            )}
            {!isDefaultImage && <meta property="og:image" content={fullImageUrl} />}
            <meta property="og:url" content={fullUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
        </Helmet>
    );
}
