import Hero from "@components/Hero";
import ParticleField from "@components/ParticleField";
import { SEO } from "@components/SEO";

/** Landing page with hero section and particle animation */
export default function HomePage() {
    return (
        <>
            <SEO />
            <ParticleField />
            <Hero />
        </>
    );
}
