'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string;
    comfortLevel: number;
    description?: string;
}

interface SkillStickerProps {
    skill: Skill;
    hasLinkedData: boolean;
    onClick: () => void;
}

export default function SkillSticker({ skill, hasLinkedData, onClick }: SkillStickerProps) {
    return (
        <motion.div
            variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1 }
            }}
            whileHover={hasLinkedData ? { y: -5 } : {}}
            onClick={onClick}
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
                <span className="text-[10px] text-foreground/40 font-mono uppercase mt-1 block mb-3 group-hover:text-primary">{skill.category}</span>

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
}

// Helper to support custom image paths from /public/icones or Lucide icons
const getIcon = (name: string) => {
    // Check if it's a file path for custom icon (starts with / or includes .svg/.png/.jpg)
    if (name.startsWith('/') || name.includes('.') || name.includes('/')) {
        // If it's just a filename like 'blender.svg', assume it's in /icones/ if not specified
        const src = name.startsWith('/') ? name : `/icones/${name}`;
        return <img src={src} alt="" className="size-12 object-contain" />;
    }

    // Lucide fallback
    // @ts-expect-error - Dynamic icon lookup
    const Icon = Icons[name] as LucideIcon;

    if (Icon) return <Icon size={48} strokeWidth={1.5} />;

    // Specific manual mapping for missing Lucide icons or brand overrides
    if (name === 'NextJs') return <Icons.Cpu size={48} strokeWidth={1.5} />;

    // Default fallback
    return <Icons.Code size={48} strokeWidth={1.5} />;
};
