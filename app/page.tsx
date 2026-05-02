import Link from "next/link";
import Hero from "@/app/components/sections/Hero";
import AboutSection from "@/app/components/sections/AboutSection";
import SkillsArsenal from "@/app/components/sections/SkillsArsenal";
import FeaturedProjects from "@/app/components/sections/FeaturedProjects";
import FormationSection from "@/app/components/sections/FormationSection";
import ExperienceSection from "@/app/components/sections/ExperienceSection";
import ContactSection from "@/app/components/sections/ContactSection";
import { getAllProjects, getProjectSummary } from "@/lib/mdx";
import { Project, Experience } from '@/app/types';
import bioData from '@/data/bio.json';
import skillsData from '@/data/skills.json';
import SectionNavigator from "@/app/components/ui/navigation/SectionNavigator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Bienvenue sur mon portfolio. Je suis étudiant en informatique, passionné par le développement web et la création numérique. Découvrez mes projets et mon parcours.",
};

export default function Home() {
  const allProjects = getAllProjects();
  const featuredProjects: Project[] = allProjects
    .filter(p => p.featured)
    .map(getProjectSummary);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <SectionNavigator />

      <Hero id="hero"
        title={bioData.hero.title}
        subtitle={bioData.hero.subtitle}
        description={bioData.hero.description}
        profileImage="/images/profile_picture.jpg"
        availability={bioData.hero.availability}
      />

      {/* Tactical Bar - Espace Jury */}
      <Link href="/competences" className="w-full bg-background border-y border-black/5 py-4 overflow-hidden group hover:bg-primary hover:text-white transition-all cursor-pointer">
        <div className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-technical">
          <span className="w-2 h-2 bg-primary group-hover:bg-white rounded-none animate-pulse" />
          <span className="font-semibold">Espace Évaluation // Jury BUT</span>
          <span className="hidden md:inline opacity-40 ml-4 group-hover:opacity-80 transition-opacity">
            Accéder au portfolio d&#39;apprentissage ↗
          </span>
        </div>
      </Link>
      <AboutSection
        id="about"
        seeking={bioData.about.seeking}
        languages={bioData.about.languages}
        softSkills={bioData.about.soft_skills}
        hobbies={bioData.about.hobbies}
      />
      <SkillsArsenal
        id="arsenal"
        projects={allProjects}
        skills={skillsData}
      />
      <FeaturedProjects id="projects" projects={featuredProjects} />
      <FormationSection id="formation" education={bioData.education} />
      <ExperienceSection id="experience" experiences={bioData.experiences as Experience[]} skills={skillsData} projects={allProjects} />
      <ContactSection
        id="contact"
        contact={bioData.contact}
        socials={bioData.socials}
        cvUrl={bioData.cv_file}
      />
    </main>
  );
}
