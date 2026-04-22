'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import skillsData from '../../../data/skills.json';

import { Project } from '../../Interfaces';
import DynamicIcon from './DynamicIcon';
import ACTooltip from './ACTooltip';
import ContextBadge from './ContextBadge';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const linkedSkills = project.usedSkills?.map(name => skillsData.find(s => s.name === name)).filter(Boolean) || [];

    return (
        <motion.article
            layout
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            transition={{ duration: 0.3 }}
            className="group relative w-full"
        >
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">

                {/* Image Section */}
                <Link href={`/projects/${project.slug}`} className="lg:col-span-8 relative block order-1">
                    <div className="relative aspect-video w-full overflow-hidden rounded-tr-[2rem] lg:rounded-tr-[5rem] rounded-sm bg-black/50">
                        {project.image ? (
                            <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-[1.5s] ease-out">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                                />
                            </div>
                        ) : (
                            <div className="absolute inset-0 bg-neutral-200 group-hover:scale-105 transition-transform duration-[1.5s] ease-out" />
                        )}

                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                        {!project.image && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 text-6xl sm:text-9xl font-black uppercase text-black select-none">
                                {project.category.substring(0, 2)}
                            </div>
                        )}
                    </div>

                    {/* Overlapping title + description — inside the image link */}
                    <div className="absolute left-0 -bottom-2 lg:bottom-6 lg:-left-8 z-20 pointer-events-none w-full max-w-full pr-2 lg:pr-0">
                        <h2 className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl tracking-tighter text-white leading-tight">
                            <span className="inline-block bg-black/40 backdrop-blur-md px-2 lg:px-5 py-0.5 lg:py-1.5 -skew-x-12 rounded-md group-hover:translate-x-3 transition-transform duration-500 ease-out">
                                {project.title}
                            </span>
                        </h2>
                        <p className="mt-0.5 ml-1 lg:ml-2 font-serif font-light text-[11px] sm:text-xs md:text-sm lg:text-base inline-block bg-black/40 backdrop-blur-md text-white px-2 lg:px-3 py-0.5 -skew-x-12 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 tracking-wide shadow-lg max-w-[88%] lg:max-w-none line-clamp-1 lg:line-clamp-2">
                            {project.description}
                        </p>
                    </div>
                </Link>

                {/* Metadata Block — Desktop only (lg+) */}
                <div className="hidden lg:flex lg:col-span-4 flex-col items-end justify-start text-right pt-0 order-2">
                    <div className="text-label space-y-4 opacity-70 group-hover:opacity-100 transition-opacity duration-500 text-foreground flex flex-col">

                        <div className="flex flex-col">
                            <span className="font-bold">Context</span>
                            <span className="mt-1 flex justify-end">
                                <ContextBadge context={project.context} />
                            </span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold">Category</span>
                            <span>{project.category}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold">Date</span>
                            <span>{project.date || '2025'}</span>
                        </div>

                        {/* Skills */}
                        {linkedSkills.length > 0 && (
                            <div className="flex flex-col items-end">
                                <span className="font-bold mb-1">Stack</span>
                                <div className="flex flex-wrap gap-2 justify-end">
                                    {linkedSkills.slice(0, 18).map((skill) => (
                                        <div key={skill!.name} title={skill!.name} className="text-foreground/80 hover:text-primary transition-colors">
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

                    {/* Tactical link button — desktop */}
                    <div className="relative mt-8">
                        <Link
                            href={`/projects/${project.slug}`}
                            className="btn-tactical rounded-2xl rounded-tl-sm group-hover:bg-foreground group-hover:text-background group-hover:border-transparent transition-all duration-300"
                        >
                            <span>Voir le projet</span>
                            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </Link>
                    </div>
                </div>

                {/* Mobile metadata row — visible below lg */}
                <div className="flex lg:hidden col-span-1 order-2 items-center justify-between gap-2 pt-1 pb-1">
                    {/* Left: context + meta */}
                    <div className="flex items-center gap-3 flex-wrap text-label text-foreground/70 min-w-0">
                        <ContextBadge context={project.context} />
                        <span className="shrink-0">{project.category}</span>
                        <span className="shrink-0 opacity-60">{project.date || '2025'}</span>
                    </div>

                    {/* Right: tactical btn */}
                    <Link
                        href={`/projects/${project.slug}`}
                        className="btn-tactical shrink-0 rounded-xl rounded-tl-sm text-[9px] px-3 py-2"
                    >
                        <ArrowUpRight size={11} />
                        <span>Voir</span>
                    </Link>
                </div>

            </div>
        </motion.article>
    );
}