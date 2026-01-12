import Image from "next/image";
import Hero from "./components/Hero";
import SkillsStickers from "./components/SkillsStickers";
import FeaturedProjects from "./components/FeaturedProjects";
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
    </main>
  );
}
