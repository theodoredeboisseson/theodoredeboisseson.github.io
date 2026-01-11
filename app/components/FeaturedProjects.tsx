'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedProjects() {
    const featured = projectsData.filter(p => p.isFeatured);

    return (
        <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-background">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                    PROJECTS<span className="text-primary">.</span>
                </h2>
                <Link href="/projets" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-4 md:mt-0">
                    Index
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
                {featured.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`group relative flex flex-col gap-4 ${index === 0 ? 'md:col-span-2' : ''}`}
                    >
                        {/* Image Container */}
                        <Link href={`/projets/${project.id}`} className="block relative w-full aspect-video md:aspect-[16/9] lg:aspect-[2/1] overflow-hidden rounded-xl bg-black/5">
                            {/* Placeholder / Image */}
                            <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-700 ease-out" />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                            {/* Floating Tag */}
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-black/5">
                                {project.category}
                            </div>
                        </Link>

                        {/* Content */}
                        <div className="flex justify-between items-start border-t-[0.5px] border-black/10 pt-4">
                            <div>
                                <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                                    <Link href={`/projets/${project.id}`}>{project.title}</Link>
                                </h3>
                                <p className="text-sm text-foreground/60 max-w-md mt-1 font-serif italic">
                                    {project.under_the_hood}
                                </p>
                            </div>
                            <span className="font-mono text-xs text-foreground/40 hidden md:block">
                                {project.date || '2025'}
                            </span>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
