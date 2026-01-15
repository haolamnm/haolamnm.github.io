import Hero from "@components/Hero";
import ParticleField from "@components/ParticleField";
import { SEO } from "@components/SEO";
import { buildHomeJsonLd } from "@lib/content";

/** Landing page with hero section and particle animation */
export default function HomePage() {
    return (
        <>
            <SEO jsonLd={buildHomeJsonLd()} />
            <ParticleField />
            <Hero />
        </>
    );
}
