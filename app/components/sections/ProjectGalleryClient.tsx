'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '../ui/ProjectCard';
import ReturnButton from '../ui/ReturnButton';

interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_validation?: string[];
    image?: string;
    filter?: 'Tech' | 'Art';
}

interface ProjectGalleryClientProps {
    projects: Project[];
}

const CATEGORIES = ['All', 'Tech', 'Art'];

export default function ProjectGalleryClient({ projects }: ProjectGalleryClientProps) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = projects.filter(project =>
        activeFilter === 'All' || project.filter === activeFilter
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <div className="mb-12">
                <ReturnButton href="/" label="Home" />
            </div>

            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-[0.5px] border-foreground/10 pb-6 gap-6">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground mb-2 tracking-tighter">
                        Projects
                        <span className="text-primary text-6xl">.</span>
                    </h1>
                    <p className="font-mono text-foreground/60">// Archive & Experiments</p>
                </div>

                <div className="flex flex-wrap gap-4">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-300 border-[0.5px]
                                ${activeFilter === cat
                                    ? 'bg-foreground text-background border-foreground'
                                    : 'bg-transparent text-foreground/60 border-foreground/20 hover:border-foreground hover:text-foreground'
                                }
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Gallery List */}
            <div className="flex flex-col gap-32">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <div key={project.slug}>
                            <ProjectCard project={project} index={index} />
                        </div>
                    ))}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 opacity-50 font-mono">
                        No projects found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
