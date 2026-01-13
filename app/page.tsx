import Image from "next/image";
import Hero from "./components/sections/Hero";
import SkillsStickers from "./components/sections/SkillsStickers";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import FormationSection from "./components/sections/FormationSection";
import ContactSection from "./components/sections/ContactSection";
import { getAllProjects } from "../lib/mdx";

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects
    .filter(p => p.featured)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      under_the_hood: p.description,
      ac_validation: p.ac_list,
      image: p.image
    }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SkillsStickers projects={allProjects} />
      <FeaturedProjects projects={featuredProjects} />
      <FormationSection />
      <ContactSection />
    </main>
  );
}
