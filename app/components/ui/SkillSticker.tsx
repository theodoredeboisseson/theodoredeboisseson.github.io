'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { SkillStickerProps } from '../../Interfaces';
import DynamicIcon from './DynamicIcon';

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
                bg-white/50 backdrop-blur-sm border border-border rounded-3xl p-6 flex flex-col items-center justify-between gap-4
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
                <DynamicIcon name={skill.icon} category={skill.category} size={48} className="size-12" />
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
