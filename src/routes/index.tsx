import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/hooks/use-reveal";
import { PortfolioNav } from "@/components/portfolio/PortfolioNav";
import { Hero } from "@/components/portfolio/Hero";
import { About, Experience, Projects, Skills, Testimonials } from "@/components/portfolio/Sections";
import { Contact, PortfolioFooter } from "@/components/portfolio/Contact";

const TITLE = "Sesihle Athi Mpela | Facilitator & AI Enthusiast";
const DESCRIPTION =
  "Portfolio of Sesihle Athi Mpela — Cape Town based facilitator, team manager, AI enthusiast and environmentalist. Projects, skills, experience and contact.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sesihle Athi Mpela",
          jobTitle: "Facilitator & AI Enthusiast",
          email: "mailto:sampela7@gmail.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressCountry: "ZA",
          },
          knowsAbout: [
            "Facilitation",
            "Artificial Intelligence",
            "Team Management",
            "Nature Conservation",
            "Instructional Design",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  useReveal();

  return (
    <>
      <PortfolioNav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <PortfolioFooter />
    </>
  );
}
