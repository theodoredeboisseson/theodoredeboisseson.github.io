'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Crosshair } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';

interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_validation?: string[];
    image?: string;
}

interface FeaturedProjectsProps {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {

    return (
        <section className="relative w-full py-12 px-6 md:px-12 lg:px-24 bg-background overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                <h2 className="section-title">
                    Featured projects<span className="text-primary">.</span>
                </h2>
                <Link href="/projects" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-4 md:mt-0">
                    Index
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            <div className="flex flex-col gap-32 w-full max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <ProjectCard key={project.slug} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}
