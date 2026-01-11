'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';
import ProjectCard from '../components/ProjectCard';
import ReturnButton from '../components/ReturnButton';

const CATEGORIES = ['All', 'Tech', 'Art', '3D'];

export default function ProjectsGallery() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = projectsData.filter(project =>
        filter === 'All' || project.category === filter
    );

    return (
        <main className="min-h-screen bg-background py-12 px-6 md:px-12 lg:px-24">
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
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-300 border-[0.5px]
                                    ${filter === cat
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
                            <div key={project.id}>
                                <ProjectCard project={project} index={index} />
                            </div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
