import Link from "next/link";
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

      {/* Tactical Bar - Espace Jury */}
      <Link href="/competences" className="w-full bg-[#F5F5F0] border-y border-black/5 py-4 overflow-hidden group hover:bg-primary hover:text-white transition-all cursor-pointer">
        <div className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
          <span className="w-2 h-2 bg-primary group-hover:bg-white rounded-none animate-pulse" />
          <span className="font-semibold">Espace Évaluation // Jury BUT</span>
          <span className="hidden md:inline opacity-40 ml-4 group-hover:opacity-80 transition-opacity">
            Accéder au référentiel des compétences ↗
          </span>
        </div>
      </Link>
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
