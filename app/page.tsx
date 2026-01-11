import Image from "next/image";
import Hero from "./components/Hero";
import SkillsStickers from "./components/SkillsStickers";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <SkillsStickers />
      <FeaturedProjects />
    </main>
  );
}
