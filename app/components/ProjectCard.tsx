'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_validation?: string[];
    image?: string;
    // Add other properties as needed from your projects.json structure
}

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="group relative w-full"
        >
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Image Section */}
                <Link href={`/projects/${project.slug}`} className="lg:col-span-9 relative block">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-tr-[5rem] rounded-sm bg-black/50">
                        {/* Image or Placeholder */}
                        {project.image ? (
                            <>
                                <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[1.5s] ease-out">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                        {/* Image Text Placeholder (only if no image) */}
                        {!project.image && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 text-9xl font-black uppercase text-black select-none">
                                {project.category.substring(0, 2)}
                            </div>
                        )}
                    </div>
                </Link>

                {/* Metadata Block */}
                <div className="lg:col-span-3 flex flex-col items-end text-right pt-4 lg:pt-0">
                    <div className="font-mono text-xs uppercase tracking-widest space-y-2 opacity-60 text-foreground">
                        <div className="flex flex-col">
                            <span className="font-bold">Category</span>
                            <span>{project.category}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Year</span>
                            <span>{project.date || '2025'}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Tools</span>
                            <span>{project.ac_validation ? project.ac_validation[0] : 'React'}</span>
                        </div>
                    </div>

                    {/* Link Arrow */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="mt-12 w-16 h-16 border border-foreground/10 rounded-full flex items-center justify-center text-foreground hover:bg-primary hover:text-white hover:border-transparent transition-all duration-300 group-hover:scale-110"
                    >
                        <ArrowUpRight strokeWidth={1} size={24} />
                    </Link>
                </div>

                {/* Overlapping Title */}
                <div className="absolute left-0 -bottom-8 lg:bottom-8 lg:-left-12 z-20 pointer-events-none mix-blend-difference text-white">
                    <h2 className="font-serif italic text-5xl md:text-7xl lg:text-9xl tracking-tighter">
                        <span className="block group-hover:translate-x-4 transition-transform duration-500 ease-out">
                            {project.title}
                        </span>
                    </h2>
                    <p className="font-serif italic font-light text-sm md:text-lg mt-2 max-w-md ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 tracking-wide">
                        {project.under_the_hood}
                    </p>
                </div>

            </div>
        </motion.article>
    );
}
