'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import skillsData from '../../../data/skills.json';

import { Project } from '../../Interfaces';
import DynamicIcon from './DynamicIcon';
import ACTooltip from './ACTooltip';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const linkedSkills = project.usedSkills?.map(id => skillsData.find(s => s.id === id)).filter(Boolean) || [];

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
                <Link href={`/projects/${project.slug}`} className="lg:col-span-8 relative block">
                    <div className="relative aspect-video w-full overflow-hidden rounded-tr-[5rem] rounded-sm bg-black/50">
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
                <div className="lg:col-span-4 flex flex-col items-end text-right pt-4 lg:pt-0">
                    <div className="font-mono text-xs uppercase tracking-widest space-y-4 opacity-60 text-foreground">
                        <div className="flex flex-col">
                            <span className="font-bold">Category</span>
                            <span>{project.category}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold">Date</span>
                            <span>{project.date || '2025'}</span>
                        </div>

                        {/* Skills Icons */}
                        {linkedSkills.length > 0 && (
                            <div className="flex flex-col items-end">
                                <span className="font-bold mb-1">Stack</span>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {linkedSkills.slice(0, 18).map((skill) => (
                                        <div key={skill!.id} title={skill!.name} className="text-foreground/80 hover:text-primary transition-colors">
                                            <DynamicIcon name={skill!.icon} category={skill!.category} size={32} className="size-9" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ACs */}
                        {project.ac_list && project.ac_list.length > 0 && (
                            <div className="flex flex-col items-end">
                                <span className="font-bold mb-1">But validation</span>
                                <div className="flex flex-wrap gap-1.5 justify-end">
                                    {project.ac_list.map((ac) => (
                                        <div key={ac}>
                                            <ACTooltip acString={ac} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Link Arrow */}
                    <div className="relative mt-12">
                        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-foreground/50 text-background text-xs font-mono uppercase px-3 py-1 rounded whitespace-nowrap hidden lg:block">
                            See more
                        </span>
                        <Link
                            href={`/projects/${project.slug}`}
                            className="size-16 border border-foreground/10 rounded-full flex items-center justify-center text-foreground group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-300 group-hover:scale-110"
                        >
                            <ArrowUpRight strokeWidth={1} size={24} />
                        </Link>
                    </div>
                </div>

                {/* Overlapping Title */}
                <div className="absolute left-0 -bottom-8 lg:bottom-8 lg:-left-8 z-20 pointer-events-none w-full max-w-full pr-4 lg:pr-0 ">
                    <h2 className="font-serif italic text-4xl md:text-5xl lg:text-6xl tracking-tighter break-word w-full text-white">
                        <span className="inline-block bg-black/40 backdrop-blur-md px-2 lg:px-6 py-1 lg:py-2 -skew-x-12 rounded-lg group-hover:translate-x-4 transition-transform duration-500 ease-out">
                            {project.title}
                        </span>
                    </h2>
                    <p className="mt-2 ml-2 font-serif italic font-light text-sm md:text-lg inline-block bg-black/40 backdrop-blur-md text-white px-3 py-1 -skew-x-12 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 tracking-wide shadow-lg">
                        {project.under_the_hood}
                    </p>
                </div>

            </div>
        </motion.article>
    );
}
