'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import projectsData from '../../data/projects.json';
import TechnicalCrosshair from './TechnicalCrosshair';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedProjects() {
    const featured = projectsData.filter(p => p.isFeatured);

    return (
        <section className="relative w-full py-24 px-4 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-end mb-12 border-b border-[#333] pb-4">
                <h2 className="text-4xl md:text-6xl font-black uppercase text-[#F5F5F5]">
                    Featured <span className="text-[#CC5500]">Work</span>
                </h2>
                <Link href="/projects" className="hidden md:flex items-center gap-2 text-[#CC5500] uppercase font-mono hover:underline">
                    View All <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[400px]">
                {featured.map((project, index) => (
                    <motion.article
                        key={project.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`group relative w-full h-full bg-[#151515] border border-[#222] overflow-hidden hover:border-[#CC5500] transition-colors duration-300 ${index === 0 ? 'md:col-span-2' : ''}`}
                    >
                        <TechnicalCrosshair className="top-4 right-4" />

                        {/* Background Gradient/Image Placeholder */}
                        <div className="absolute inset-0 bg-neutral-900 group-hover:bg-neutral-800 transition-colors duration-500">
                            {/* We would put a project image here */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-20 text-9xl font-black text-[#000] select-none uppercase overflow-hidden">
                                {project.category}
                            </div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="inline-block px-2 py-1 mb-2 text-xs font-mono bg-[#CC5500] text-white">
                                    {project.category} // {project.date}
                                </span>
                                <h3 className="text-3xl font-bold text-[#F5F5F5] uppercase mb-2">
                                    {project.title}
                                </h3>
                                <p className="text-gray-400 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    {project.under_the_hood}
                                </p>
                                <div className="flex gap-2">
                                    {project.ac_validation?.map(ac => (
                                        <span key={ac} className="text-[10px] border border-[#444] px-1 text-[#666] font-mono">
                                            {ac}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </div>
        </section>
    );
}
