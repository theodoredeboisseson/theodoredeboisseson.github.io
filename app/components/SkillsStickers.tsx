'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import skillsData from '../../data/skills.json';
import { useState } from 'react';
import SkillDrawer from './SkillDrawer';
import { ProjectData } from '../../lib/mdx';

interface SkillsBentoProps {
    projects: ProjectData[];
}

export default function SkillsBento({ projects }: SkillsBentoProps) {
    const [selectedSkill, setSelectedSkill] = useState<typeof skillsData[0] | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleSkillClick = (skill: typeof skillsData[0]) => {
        // Check if skill has linked projects or description
        const hasLinkedData = projects.some(p => p.usedSkills?.includes(skill.id)) || skill.description;

        if (hasLinkedData) {
            setSelectedSkill(skill);
            setIsDrawerOpen(true);
        }
    };

    return (
        <>
            <section className="relative w-full py-24 px-6 md:px-12 lg:px-24 bg-background">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                        ARSENAL<span className="text-primary">.</span>
                    </h2>
                    <div className="text-right mt-4 md:mt-0">
                        <span className="block font-mono text-xs uppercase tracking-widest text-foreground/50">
                            TOOLKIT // 2026
                        </span>
                        <span className="block font-serif italic text-lg text-foreground/80">
                            Selected tools & technologies
                        </span>
                    </div>
                </div>

                <div className="w-full max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: {},
                            visible: {
                                transition: { staggerChildren: 0.05 }
                            }
                        }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                        {skillsData.map((skill, index) => {
                            const hasLinkedData = projects.some(p => p.usedSkills?.includes(skill.id)) || skill.description;

                            return (
                                <motion.div
                                    key={skill.id}
                                    variants={{
                                        hidden: { scale: 0.9, opacity: 0 },
                                        visible: { scale: 1, opacity: 1 }
                                    }}
                                    whileHover={hasLinkedData ? { y: -5 } : {}}
                                    onClick={() => handleSkillClick(skill)}
                                    className={`
                                        bg-white/50 backdrop-blur-sm border border-black/5 rounded-3xl p-6 flex flex-col items-center justify-between gap-4
                                        transition-all duration-300 aspect-square group relative
                                        ${hasLinkedData ? 'cursor-pointer hover:border-primary/30 hover:bg-white/80' : 'cursor-default opacity-80'}
                                    `}
                                >
                                    {/* Interaction Indicator */}
                                    {hasLinkedData && (
                                        <div className="absolute top-3 right-3 text-foreground/20 group-hover:text-primary transition-colors duration-300">
                                            <Icons.ArrowUpRight size={16} />
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`text-foreground/80 transition-colors duration-300 ${hasLinkedData ? 'group-hover:text-primary' : ''} mt-2`}>
                                        {getIcon(skill.icon)}
                                    </div>

                                    {/* Info */}
                                    <div className="text-center w-full">
                                        <h3 className="font-bold text-sm uppercase tracking-wide text-foreground">{skill.name}</h3>
                                        <span className="text-[10px] text-foreground/40 font-mono uppercase mt-1 block mb-3">{skill.category}</span>

                                        {/* Tactical Gauge */}
                                        <div className="flex gap-1 justify-center w-full px-4">
                                            {[...Array(5)].map((_, i) => {
                                                // Convert 100 base comfortLevel to 5 segments
                                                const isActive = (i + 1) * 20 <= skill.comfortLevel;
                                                return (
                                                    <div
                                                        key={i}
                                                        className={`h-1 flex-1 rounded-full ${isActive ? 'bg-foreground/80' : 'bg-foreground/10'}`}
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            <SkillDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                selectedSkill={selectedSkill}
                projects={projects}
            />
        </>
    );
}

// Update helper to support custom image paths from /public/icones or Lucide icons
const getIcon = (name: string) => {
    // Check if it's a file path for custom icon (starts with / or includes .svg/.png/.jpg)
    if (name.startsWith('/') || name.includes('.') || name.includes('/')) {
        // If it's just a filename like 'blender.svg', assume it's in /icones/ if not specified
        const src = name.startsWith('/') ? name : `/icones/${name}`;
        return <img src={src} alt="" className="w-8 h-8 object-contain" />;
    }

    // Lucide fallback
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name];

    if (Icon) return <Icon size={32} strokeWidth={1.5} />;

    // Specific manual mapping for missing Lucide icons or brand overrides
    if (name === 'NextJs') return <Icons.Cpu size={32} strokeWidth={1.5} />;

    // Default fallback
    return <Icons.Code size={32} strokeWidth={1.5} />;
};
