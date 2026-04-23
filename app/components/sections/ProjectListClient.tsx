'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import ProjectCard from '@/app/components/ui/cards/ProjectCard';
import ReturnButton from '@/app/components/ui/navigation/ReturnButton';
import TacticalFilter from '@/app/components/ui/navigation/TacticalFilter';
import { ProjectListClientProps } from '@/app/types';

const CATEGORIES = ['All', 'Tech', 'Art'];

export default function ProjectListClient({ projects }: ProjectListClientProps) {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredProjects = projects.filter(project =>
        activeFilter === 'All' || (project.filter && project.filter.includes(activeFilter))
    );

    return (
        <div className="max-w-7xl mx-auto">
            {/* Navigation */}
            <ReturnButton href="/#projects" label="Accueil" className='mb-6 md:mb-12' />

            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-[0.5px] border-foreground/10 pb-6 gap-6">
                <div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase text-foreground mb-2 tracking-tighter">
                        Projets
                        <span className="text-primary text-6xl">.</span>
                    </h1>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <p className="font-mono text-foreground/60">// Archives & Expérimentations</p>
                </div>

                <TacticalFilter 
                    options={CATEGORIES}
                    activeOptions={activeFilter}
                    onChange={setActiveFilter}
                    mode="radio"
                />
            </div>

            {/* Gallery List */}
            <div className="flex flex-col gap-16">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <div key={project.slug} id={project.slug} className="scroll-mt-24">
                            <div className="scale-[0.9] origin-top">
                                <ProjectCard project={project} index={index} />
                            </div>
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
