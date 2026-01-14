'use client';

import { motion } from 'framer-motion';
import skillsData from '../../../data/skills.json';
import { useState } from 'react';
import SkillDrawer from '../ui/SkillDrawer';
import SkillSticker from '../ui/SkillSticker';
import { ProjectData } from '../../../lib/mdx';

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
            <section className="relative w-full py-12 mt-12 px-6 md:px-12 lg:px-24 bg-background">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                    <h2 className="section-title">
                        Arsenal<span className="text-primary">.</span>
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
                        {skillsData.map((skill) => {
                            const hasLinkedData = projects.some(p => p.usedSkills?.includes(skill.id)) || skill.description;

                            return (
                                <SkillSticker
                                    key={skill.id}
                                    skill={skill}
                                    hasLinkedData={Boolean(hasLinkedData)}
                                    onClick={() => handleSkillClick(skill)}
                                />
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
