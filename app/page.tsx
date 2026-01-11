import Image from "next/image";
import Hero from "./components/Hero";
import StickerWall from "./components/StickerWall";
import FeaturedProjects from "./components/FeaturedProjects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <StickerWall />
      <FeaturedProjects />
    </main>
  );
}
