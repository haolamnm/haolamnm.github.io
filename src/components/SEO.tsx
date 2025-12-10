import { Helmet } from "react-helmet-async";
import { seoContent } from "@lib/content";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    type?: "website" | "article";
}

/**
 * @description Reusable SEO component for dynamic meta tags
 * @details Each page needs unique title/description for search engine visibility
 */
export function SEO({
    title,
    description = seoContent.defaultDescription,
    image = "/og-image.png",
    type = "website",
}: SEOProps) {
    const fullTitle = title
        ? `${title} | ${seoContent.siteName}`
        : seoContent.defaultTitle;

    const fullImageUrl = image.startsWith("http")
        ? image
        : `${seoContent.siteUrl}${image}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:url" content={seoContent.siteUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
        </Helmet>
    );
}
