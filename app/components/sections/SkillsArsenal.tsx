'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SkillDrawer from '../ui/SkillDrawer';
import SkillSticker from '../ui/SkillSticker';

import { Skill, SkillsArsenalProps } from '../../Interfaces';

export default function SkillsArsenal({ projects, skills }: SkillsArsenalProps) {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // Get unique categories from skills
    const categories = Array.from(new Set(skills.map(skill => skill.category))).sort();

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const filteredSkills = skills.filter(skill =>
        selectedCategories.length === 0 || selectedCategories.includes(skill.category)
    ).sort((a, b) => a.name.localeCompare(b.name));

    const handleSkillClick = (skill: Skill) => {
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
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 container-7xl">
                    <h2 className="section-title">
                        Arsenal<span className="text-primary">.</span>
                    </h2>
                    <div className="text-right mt-4 md:mt-0">
                        <span className="block text-label text-foreground/50">
                            TOOLKIT // 2026
                        </span>
                        <span className="block text-serif-italic text-lg text-foreground/80">
                            Selected tools & technologies
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="container-7xl flex flex-wrap gap-2">
                    <button
                        onClick={() => setSelectedCategories([])}
                        className={`button ${selectedCategories.length === 0 ? 'button-primary' : 'button-outline'}`}
                    >
                        All
                    </button>
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => toggleCategory(category)}
                            className={`button ${selectedCategories.includes(category) ? 'button-primary' : 'button-outline'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="container-7xl py-6">
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                        <AnimatePresence>
                            {filteredSkills.map((skill, index) => {
                                const hasLinkedData = projects.some(p => p.usedSkills?.includes(skill.id)) || skill.description;

                                return (
                                    <motion.div
                                        key={skill.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        exit={{ opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: (index % 5) * 0.1
                                        }}
                                    >
                                        <SkillSticker
                                            skill={skill}
                                            hasLinkedData={Boolean(hasLinkedData)}
                                            onClick={() => handleSkillClick(skill)}
                                        />
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
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
