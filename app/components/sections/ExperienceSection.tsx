'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import MovementLine from '../ui/MovementLine';
import { ExperienceSectionProps } from '../../Interfaces';

export default function ExperienceSection({ experiences, skills, projects }: ExperienceSectionProps) {
    return (
        <section className="container-7xl px-6 py-12" id="experience">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl text-serif-italic mb-24 tracking-tighter"
            >
                Expériences<span className="text-primary">.</span>
            </motion.h2>

            <div className="relative">
                {/* Visual Line on the left */}
                <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-24 hidden md:block opacity-50 pointer-events-none">
                    <MovementLine />
                </div>

                <div className="flex flex-col space-y-16 ml-4">
                    {experiences.map((item, index) => {
                        // Resolve skill IDs: from linked project if available, otherwise from skill_ids
                        const linkedProject = item.project_slug
                            ? projects.find(p => p.slug === item.project_slug)
                            : null;

                        const skillIds = linkedProject?.usedSkills ?? item.skill_ids ?? [];
                        const resolvedSkills = skillIds
                            .map(id => skills.find(s => s.id === id))
                            .filter(Boolean);

                        const isUpcoming = item.status === 'upcoming';

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">

                                    {/* Period — left column, large serif */}
                                    <div className="md:col-span-4 lg:col-span-3">
                                        <span className="text-serif-italic text-4xl md:text-6xl lg:text-7xl text-primary block leading-none">
                                            {item.period.split('–')[0].trim()}
                                        </span>
                                        <span className="text-serif-italic text-2xl md:text-4xl text-primary/50 block leading-none mt-1">
                                            — {item.period.split('–')[1]?.trim()}
                                        </span>
                                    </div>

                                    {/* Content — right column */}
                                    <div className="md:col-span-8 lg:col-span-9 pt-4 md:pt-2 flex flex-col justify-center">

                                        {/* Badges row */}
                                        <div className="flex items-center gap-3 mb-3 flex-wrap">
                                            <span className="font-mono text-xs uppercase tracking-widest text-primary border border-primary/30 px-2 py-0.5 rounded-sm">
                                                {item.type}
                                            </span>
                                            {isUpcoming ? (
                                                <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-green-600 dark:text-green-400">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
                                                    À venir
                                                </span>
                                            ) : (
                                                <span className="font-mono text-xs uppercase tracking-widest text-foreground/40">
                                                    Terminé
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-4xl font-bold font-sans uppercase tracking-tight mb-1">
                                            {item.title}
                                        </h3>

                                        {/* Company / Location */}
                                        <p className="text-xl font-sans text-foreground/60 mb-4">
                                            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                            {item.company} // {item.location}
                                        </p>

                                        {/* Description */}
                                        <p className="font-mono text-sm opacity-60 max-w-xl border-l-2 border-primary/50 pl-4 py-1 mb-5">
                                            {item.description}
                                        </p>

                                        {/* Skills pills */}
                                        {resolvedSkills.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {resolvedSkills.map((skill) => skill && (
                                                    <span
                                                        key={skill.id}
                                                        className="font-mono text-xs bg-foreground/5 border border-foreground/10 px-2.5 py-1 rounded-sm text-foreground/70"
                                                    >
                                                        {skill.name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Link to project if exists */}
                                        {item.project_slug && (
                                            <Link
                                                href={`/projects/${item.project_slug}`}
                                                className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-primary hover:text-primary/70 transition-colors w-fit"
                                            >
                                                Voir le projet
                                                <ArrowUpRight
                                                    size={14}
                                                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                                                />
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                {/* Separator */}
                                <div className="mt-16 w-full flex justify-center">
                                    <div className="w-[85%] h-px bg-border/50" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="absolute -right-4 md:-right-12 top-0 bottom-0 w-24 hidden md:block opacity-50 pointer-events-none">
                    <MovementLine />
                </div>
            </div>
        </section>
    );
}
