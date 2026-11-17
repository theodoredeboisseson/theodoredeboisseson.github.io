import Hero from "@/app/components/sections/Hero";
import AboutSection from "@/app/components/sections/AboutSection";
import SkillsArsenal from "@/app/components/sections/SkillsArsenal";
import FeaturedProjects from "@/app/components/sections/FeaturedProjects";
import ExperienceSection from "@/app/components/sections/ExperienceSection";
import ContactSection from "@/app/components/sections/ContactSection";
import SiteFooter from "@/app/components/sections/SiteFooter";
import { getAllProjects, getProjectSummary } from "@/lib/mdx";
import { Project, Experience } from '@/app/types';
import bioData from '@/data/bio.json';
import skillsData from '@/data/skills.json';
import SectionNavigator from "@/app/components/ui/navigation/SectionNavigator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Portfolio de Théodore de Boisseson, développeur full-stack ayant terminé son BUT Informatique. Découvrez mes projets et mon parcours.",
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

      <AboutSection
        id="about"
        seeking={bioData.about.seeking}
        languages={bioData.about.languages}
        softSkills={bioData.about.soft_skills}
        hobbies={bioData.about.hobbies}
      />
      <FeaturedProjects id="projects" projects={featuredProjects} />
      <SkillsArsenal
        id="arsenal"
        projects={allProjects}
        skills={skillsData}
      />
      <ExperienceSection id="parcours" education={bioData.education} experiences={bioData.experiences as Experience[]} skills={skillsData} projects={allProjects} />
      <ContactSection
        id="contact"
        contact={bioData.contact}
        socials={bioData.socials}
        cvUrl={bioData.cv_file}
      />
      <SiteFooter email={bioData.contact.email} github={bioData.socials.github} linkedin={bioData.socials.linkedin} cvUrl={bioData.cv_file} />
    </main>
  );
}
