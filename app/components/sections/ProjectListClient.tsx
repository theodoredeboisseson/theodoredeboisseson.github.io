'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '@/app/components/ui/cards/ProjectCard';
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
            {/* Header & Filter */}
            <motion.div 
                className="flex flex-col md:flex-row justify-between items-end mb-24 border-b-[0.5px] border-foreground/10 pb-6 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
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
            </motion.div>

            {/* Gallery List */}
            <div className="flex flex-col gap-16">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.slug}
                            id={project.slug}
                            className="scroll-mt-24"
                            layout
                            initial={{ opacity: 0, y: 40, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                            transition={{ 
                                duration: 0.5, 
                                delay: index * 0.1,
                                layout: { type: "spring", stiffness: 300, damping: 30 }
                            }}
                        >
                            <div className="scale-[0.9] origin-top">
                                <ProjectCard project={project} index={index} />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {filteredProjects.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20 opacity-50 font-mono"
                    >
                        No projects found in this category.
                    </motion.div>
                )}
            </div>
        </div>
    );
}
