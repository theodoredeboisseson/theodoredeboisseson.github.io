'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects.json';
import TechnicalCrosshair from '../components/TechnicalCrosshair';
import { Filter } from 'lucide-react';

const CATEGORIES = ['All', 'Tech', 'Art', '3D'];

export default function ProjectsGallery() {
    const [filter, setFilter] = useState('All');

    const filteredProjects = projectsData.filter(project =>
        filter === 'All' || project.category === filter
    );

    return (
        <main className="min-h-screen bg-[#101010] py-24 px-4 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Header & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-[#333] pb-6 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black uppercase text-[#F5F5F5] mb-2">
                            Projects
                            <span className="text-[#CC5500] text-6xl">.</span>
                        </h1>
                        <p className="font-mono text-[#666]">// Archive & Experiments</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-2 font-mono text-sm uppercase transition-all duration-300 border border-transparent
                  ${filter === cat
                                        ? 'bg-[#CC5500] text-white border-[#CC5500]'
                                        : 'bg-[#151515] text-[#888] hover:border-[#CC5500] hover:text-[#F5F5F5]'
                                    }
                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.article
                                layout
                                key={project.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="group relative aspect-square bg-[#151515] overflow-hidden border border-[#222] hover:border-[#CC5500] transition-colors"
                            >
                                <Link href={`/projets/${project.id}`} className="block w-full h-full">
                                    <TechnicalCrosshair className="top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Background Placeholder */}
                                    <div className="absolute inset-0 bg-neutral-900 group-hover:scale-105 transition-transform duration-700">
                                        {/* Image would go here */}
                                        <div className="absolute inset-0 flex items-center justify-center text-8xl font-black text-[#000] opacity-30 select-none uppercase">
                                            {project.category.substring(0, 2)}
                                        </div>
                                    </div>

                                    {/* Overlay - Always visible per requirements, enhanced on hover */}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <span className="text-[#CC5500] font-mono text-xs mb-2 block">
                                                {project.date} // {project.category}
                                            </span>
                                            <h2 className="text-3xl font-bold text-[#F5F5F5] uppercase mb-1">
                                                {project.title}
                                            </h2>
                                            <div className="h-[1px] w-12 bg-[#CC5500] group-hover:w-full transition-all duration-500" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
