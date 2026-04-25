'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FolderGit2, GraduationCap, Home, Mail, Toolbox, User } from 'lucide-react';
import { SectionIcon } from "./SectionIcon";
import { motion } from "framer-motion";

const sections = [
    { id: 'hero', label: 'Théodore', icon: Home },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'arsenal', label: 'Arsenal', icon: Toolbox },
    { id: 'projects', label: 'Projets', icon: FolderGit2 },
    { id: 'formation', label: 'Formation', icon: GraduationCap },
    { id: 'experience', label: 'Expérience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export default function SectionNavigator() {
    const [activeSection, setActiveSection] = useState('hero');
    const [isPastHeader, setIsPastHeader] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsPastHeader(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
        );

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const activeIndex = sections.findIndex(s => s.id === activeSection);

    return (
        <>
            {/* Desktop: Fixed left sidebar */}
            <nav className={`hidden xl:flex fixed top-1/2 -translate-y-1/2 z-50 transition-all duration-500 ${isPastHeader ? 'left-4' : 'left-0'}`}>
                <div className={`bg-background/80 backdrop-blur-xs py-3 px-1 shadow-sm transition-all duration-500 border-foreground/10 ${isPastHeader ? 'border-y border-b-4 border-r-3 rounded-2xl' : 'border-y border-x rounded-r-2xl opacity-40'}`}>
                    <div className="flex flex-col">
                        {sections.map((section, index) => {
                            const isNextToActive = index === activeIndex || index === activeIndex - 1;

                            return (
                                <div key={section.id} className="flex flex-col items-center">
                                    <SectionIcon
                                        onClick={() => scrollToSection(section.id)}
                                        section={section}
                                        active={activeSection === section.id}
                                        isMobile={false}
                                    />
                                    {index < sections.length - 1 && (
                                        <motion.div
                                            layout
                                            className={`bg-foreground h-px opacity-20 rounded-full transition-all duration-500 ease-out ${isNextToActive
                                                ? 'w-5 my-3'
                                                : 'w-3 my-1'
                                                }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>

            {/* Mobile: Bottom horizontal bar */}
            <nav className="xl:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
                <div className="bg-foreground/90 backdrop-blur-xs border-x border-foreground/10 border-l-2 border-r-2 px-2 py-2 rounded-2xl shadow-sm pointer-events-auto">
                    <div className="flex flex-row">
                        {sections.map((section, index) => {
                            const isNextToActive = index === activeIndex || index === activeIndex - 1;

                            return (
                                <div key={section.id} className="flex flex-row items-center">
                                    <SectionIcon
                                        onClick={() => scrollToSection(section.id)}
                                        section={section}
                                        active={activeSection === section.id}
                                        isMobile={true}
                                    />
                                    {index < sections.length - 1 && (
                                        <motion.div
                                            layout
                                            className={`bg-foreground w-px opacity-20 rounded-full transition-all duration-500 ease-out ${isNextToActive
                                                ? 'h-5 mx-3'
                                                : 'h-3 mx-1'
                                                }`}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </nav>
        </>
    );
}