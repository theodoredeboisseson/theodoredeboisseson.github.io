import React from "react";
import { LucideProps } from "lucide-react";
import { motion } from "framer-motion";

interface SectionIconProps {
    onClick: () => void;
    section: {
        id: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    active: boolean;
    isMobile?: boolean;
}

export function SectionIcon({ onClick, section, active, isMobile }: SectionIconProps) {
    const SectionIconComponent = section.icon;

    return (
        <motion.button
            layout
            onClick={onClick}
            className={`group rounded-xl relative hover:bg-[#11111108] transition-all 
            duration-500 ease-out outline-none flex items-center justify-center 
            touch-manipulation ${isMobile ? 'w-10 h-10' : 'w-12 h-12'}`}
            aria-label={section.label}
        >
            {/* Active indicator background */}
            {active && (
                <motion.div
                    layoutId={isMobile ? 'activeSectionMobile' : 'activeSection'}
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}

            <SectionIconComponent
                strokeWidth={2}
                className={`relative z-10 transition-all duration-500 ease-out ${active
                        ? `text-primary ${isMobile ? 'w-5.5 h-5.5' : 'w-6 h-6'}`
                        : `text-foreground/40 ${isMobile ? 'w-4 h-4' : 'w-4.5 h-4.5 group-hover:w-5.5 group-hover:h-5.5 group-hover:text-foreground/70 group-hover:opacity-100'}`
                    }`}
            />

            {/* Tooltip (desktop only) */}
            {!isMobile && (
                <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                    <span className="bg-foreground text-background text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 rounded-md shadow-xl shadow-[#0000001A]">
                        {section.label}
                    </span>
                </span>
            )}
        </motion.button>
    );
}