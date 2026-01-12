'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ProjectData } from '../../../lib/mdx';

interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string;
    comfortLevel: number;
    description?: string;
}

interface SkillDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSkill: Skill | null;
    projects: ProjectData[];
}

export default function SkillDrawer({ isOpen, onClose, selectedSkill, projects }: SkillDrawerProps) {
    // Filter projects linked to this skill
    const linkedProjects = selectedSkill
        ? projects.filter(project => project.usedSkills?.includes(selectedSkill.id))
        : [];

    const IconComponent = selectedSkill ? getIcon(selectedSkill.icon) : null;

    return (
        <AnimatePresence>
            {isOpen && selectedSkill && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[var(--background)] border-l border-[var(--color-border)] shadow-xl overflow-y-auto"
                    >
                        <div className="p-8 h-full flex flex-col">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-12">
                                <div className="font-mono text-xs uppercase tracking-widest opacity-50">
                                    Skill Inspector
                                </div>
                                <button
                                    onClick={onClose}
                                    className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase hover:text-primary transition-colors"
                                >
                                    Close <X size={16} />
                                </button>
                            </div>

                            {/* Skill Content */}
                            <div className="flex-1">
                                <div className="w-16 h-16 mb-6 text-foreground">
                                    {IconComponent}
                                </div>

                                <h2 className="text-4xl font-bold mb-2 tracking-tight">
                                    {selectedSkill.name}<span className="text-primary">.</span>
                                </h2>
                                <span className="inline-block px-3 py-1 border border-[var(--color-border)] rounded-full text-xs font-mono uppercase tracking-wide mb-8">
                                    {selectedSkill.category}
                                </span>

                                <div className="mb-8">
                                    <span className="block font-mono text-[10px] uppercase tracking-widest opacity-40 mb-2">
                                        Comfort Level
                                    </span>
                                    <div className="flex gap-1 w-32 opacity-50">
                                        {[...Array(5)].map((_, i) => {
                                            const isActive = (i + 1) * 20 <= selectedSkill.comfortLevel;
                                            return (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full ${isActive ? 'bg-foreground' : 'bg-foreground/20'}`}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>

                                <p className="text-lg leading-relaxed text-foreground/80 font-serif mb-12 border-l-2 border-primary/20 pl-4 py-1">
                                    {selectedSkill.description}
                                </p>

                                {/* Linked Projects Section */}
                                {linkedProjects.length > 0 && (
                                    <div className="border-t border-[var(--color-border)] pt-8">
                                        <h3 className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60">
                                            Linked Projects ({linkedProjects.length})
                                        </h3>
                                        <div className="space-y-4">
                                            {linkedProjects.map((project) => (
                                                <Link
                                                    key={project.slug}
                                                    href={`/projects/${project.slug}`}
                                                    className="group block p-4 bg-white/40 border border-[var(--color-border)] hover:border-primary/50 transition-all rounded-lg"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-bold group-hover:text-primary transition-colors">
                                                                {project.title}
                                                            </h4>
                                                            <span className="text-xs font-mono opacity-50">
                                                                {project.category} // {project.date}
                                                            </span>
                                                        </div>
                                                        <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex justify-between items-end">
                                <span className="font-mono text-[10px] opacity-40">ID: {selectedSkill.id}</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Helper to get icon (same as SkillsStickers, duplicated for independence or could be shared)
const getIcon = (name: string) => {
    if (name.startsWith('/') || name.includes('.') || name.includes('/')) {
        const src = name.startsWith('/') ? name : `/icones/${name}`;
        return <img src={src} alt="" className="w-full h-full object-contain" />;
    }
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name];
    if (Icon) return <Icon className="w-full h-full" strokeWidth={1} />;

    if (name === 'NextJs') return <Icons.Cpu className="w-full h-full" strokeWidth={1} />;

    return <Icons.Code className="w-full h-full" strokeWidth={1} />;
};
