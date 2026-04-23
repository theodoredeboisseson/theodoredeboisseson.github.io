'use client';

import {motion} from 'framer-motion';
import {useState, useEffect} from 'react';
import {ChevronDown} from 'lucide-react';
import SkillDrawer from '../ui/overlays/SkillDrawer';
import SkillSticker from '../ui/cards/SkillSticker';

import {Skill, SkillsArsenalProps} from '../../types';

export default function SkillsArsenal({id, projects, skills}: SkillsArsenalProps) {
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [cols, setCols] = useState(5);
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        const updateCols = () => {
            if (window.innerWidth < 640) setCols(2);
            else if (window.innerWidth < 768) setCols(3);
            else if (window.innerWidth < 1024) setCols(3);
            else if (window.innerWidth < 1280) setCols(4);
            else setCols(5);
        };
        updateCols();
        window.addEventListener('resize', updateCols);
        return () => window.removeEventListener('resize', updateCols);
    }, []);

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

    // Split skills into initial (2 rows) and extra
    const initialCount = cols * 2;
    const initialSkills = filteredSkills.slice(0, initialCount);
    const extraSkills = filteredSkills.slice(initialCount);

    const handleSkillClick = (skill: Skill) => {
        // Check if skill has linked projects or description
        const hasLinkedData = projects.some(p => p.usedSkills?.includes(skill.name)) || skill.description;

        if (hasLinkedData) {
            setSelectedSkill(skill);
            setIsDrawerOpen(true);
        }
    };

    return (
        <>
            <section id={id} className="relative w-full section-padding fluid-padding bg-background">
                {/* Header */}
                <div
                    className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-[0.5px] border-black/10 pb-6 container-7xl mx-auto">
                    <h2 className="section-title">
                        Arsenal<span className="text-primary">.</span>
                    </h2>
                    <div className="text-right mt-4 md:mt-0">
                        <span className="block text-label text-foreground/50">
                            TOOLKIT // 2026
                        </span>
                        <span className="block text-serif-italic text-lg text-foreground/80">
                            Selected tools &amp; technologies
                        </span>
                    </div>
                </div>

                {/* Legend & Filters */}
                <div
                    className="container-7xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    {/* Legend */}
                    <div
                        className="flex items-center gap-3 text-label text-foreground/50 border border-foreground/5 bg-foreground/5 px-4 py-2 rounded-full shrink-0">
                        <span>Jauge</span>
                        <div className="flex gap-1 w-16 items-center">
                            <div className="h-1 flex-1 bg-foreground/60 rounded-full"/>
                            <div className="h-1 flex-1 bg-foreground/60 rounded-full"/>
                            <div className="h-1 flex-1 bg-foreground/60 rounded-full"/>
                            <div className="h-1 flex-1 bg-foreground/10 rounded-full"/>
                            <div className="h-1 flex-1 bg-foreground/10 rounded-full"/>
                        </div>
                        <span>= Niveau de Confort</span>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        {/* Category filters */}
                        <div className="flex flex-wrap gap-2">
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
                    </div>
                </div>

                {/* Grid container */}
                <div className="container-7xl py-6">
                    <motion.div
                        layout
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                        transition={{type: 'spring', stiffness: 200, damping: 30}}
                    >
                        {/* Always show initial row */}
                        {initialSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{
                                    duration: 0.5,
                                    delay: (index % cols) * 0.05 + Math.floor(index / cols) * 0.08
                                }}
                            >
                                <SkillSticker
                                    skill={skill}
                                    index={index}
                                    cols={cols}
                                    hasLinkedData={Boolean(projects.some(p => p.usedSkills?.includes(skill.name)) || skill.description)}
                                    onClick={() => handleSkillClick(skill)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Extra skills — always in DOM, height animates smoothly */}
                    {extraSkills.length > 0 && (
                        <motion.div
                            animate={{height: isCollapsed ? 0 : 'auto', opacity: isCollapsed ? 0 : 1}}
                            initial={false}
                            transition={{type: 'spring', stiffness: 50, damping: 16, bounce: 0}}
                            style={{overflow: 'hidden'}}
                        >
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
                                {extraSkills.map((skill, index) => {
                                    const overallIndex = initialSkills.length + index;
                                    return (
                                        <SkillSticker
                                            key={skill.name}
                                            skill={skill}
                                            index={overallIndex}
                                            cols={cols}
                                            hasLinkedData={Boolean(projects.some(p => p.usedSkills?.includes(skill.name)) || skill.description)}
                                            onClick={() => handleSkillClick(skill)}
                                        />
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Centered Toggle Button */}
                    {filteredSkills.length > initialCount && (
                        <motion.div
                            layout
                            className="mt-12 flex justify-center"
                            initial={false}
                            animate={{y: 0}}
                            transition={{type: "spring", stiffness: 200, damping: 25}}
                        >
                            <button
                                onClick={() => setIsCollapsed(prev => !prev)}
                                className="btn-tactical rounded-xl gap-2 hover:gap-5 px-8 py-4 bg-foreground/5 hover:bg-foreground hover:text-background border-tech-border-dim group overflow-hidden relative"
                                aria-label={isCollapsed ? 'Afficher plus' : 'Réduire'}
                            >
                                <motion.div
                                    className="flex items-center gap-2"
                                    animate={{y: 0}}
                                    key={isCollapsed ? 'collapsed' : 'expanded'}
                                >
                                    <span>{isCollapsed ? `Voir les ${extraSkills.length} outils restants` : 'Réduire'}</span>
                                    <motion.span
                                        animate={{rotate: isCollapsed ? 0 : 180}}
                                        transition={{duration: 0.3}}
                                        className="inline-flex"
                                    >
                                        <ChevronDown size={14}/>
                                    </motion.span>
                                </motion.div>
                            </button>
                        </motion.div>
                    )}
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
