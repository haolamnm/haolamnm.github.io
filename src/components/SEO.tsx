import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { seoContent } from "@lib/content";
import { siteConfig, socialLinks } from "@lib/config";

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

    // JSON-LD structured data for Google Knowledge Panels
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: siteConfig.name,
        url: `https://${siteConfig.domain}`,
        jobTitle: siteConfig.role,
        description: siteConfig.description,
        image: fullImageUrl,
        sameAs: socialLinks
            .map((link) => link.href)
            .filter((href) => href.startsWith("https://")),
    };

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Theme color for mobile browser chrome */}
            <meta name="theme-color" content="#09090b" />

            {/* Robots and canonical URL */}
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:url" content={fullUrl} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            {/* JSON-LD structured data */}
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        </Helmet>
    );
}
