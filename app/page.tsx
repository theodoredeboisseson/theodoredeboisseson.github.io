import Image from "next/image";
import Hero from "./components/sections/Hero";
import SkillsStickers from "./components/sections/SkillsArsenal";
import FeaturedProjects from "./components/sections/FeaturedProjects";
import FormationSection from "./components/sections/FormationSection";
import ContactSection from "./components/sections/ContactSection";
import { getAllProjects } from "../lib/mdx";
import { Project } from "./Interfaces";
import bioData from '@/data/bio.json';
import skillsData from '@/data/skills.json';

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects: Project[] = allProjects
    .filter(p => p.featured)
    .map(p => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      date: p.date,
      under_the_hood: p.description,
      ac_validation: p.ac_list,
      image: p.image,
      usedSkills: p.usedSkills
    }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero
        issueText="Issue 01 — 2026"
        title="THÉODORE"
        subtitle="STUDENT DEVELOPER"
        description="Based in Montpellier. Studying in 3rd year computer science. Crafting digital projects in my free time."
        profileImage="/images/profile_picture.jpg"
      />
      <SkillsStickers
        projects={allProjects}
        skills={skillsData}
      />
      <FeaturedProjects projects={featuredProjects} />
      <FormationSection education={bioData.education} />
      <ContactSection
        contact={bioData.contact}
        socials={bioData.socials}
        cvUrl={bioData.cv_file}
      />
    </main>
  );
}
