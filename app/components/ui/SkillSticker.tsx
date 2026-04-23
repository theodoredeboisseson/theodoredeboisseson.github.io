'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { SkillStickerProps } from '../../Interfaces';
import DynamicIcon from './DynamicIcon';
import { useRef } from 'react';

export default function SkillSticker({ skill, hasLinkedData, onClick, index = 0, cols = 1 }: SkillStickerProps) {
    const colIndex = index % cols;
    const diff = colIndex - (cols - 1) / 2;
    const sideSize = Math.round(Math.abs(diff) * 4);
    const primary = 'rgba(217, 66, 97, 0.6)';

    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const iconX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), { stiffness: 300, damping: 30 });
    const iconY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const { left, top, width, height } = cardRef.current.getBoundingClientRect();
        mouseX.set(((e.clientX - left) / width) * 2 - 1);
        mouseY.set(((e.clientY - top) / height) * 2 - 1);
    };

    const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: colIndex * 0.05 }}
            whileHover={hasLinkedData ? {
                y: -8,
                scale: 1.02,
                borderColor: primary,
                borderBottomWidth: '5px',
                borderRightWidth: diff < -0.1 ? `${sideSize}px` : '1px',
                borderLeftWidth: diff > 0.1 ? `${sideSize}px` : '1px',
                transition: { duration: 0.12, ease: 'easeOut' },
            } : {}}
            onMouseMove={hasLinkedData ? handleMouseMove : undefined}
            onMouseLeave={hasLinkedData ? resetMouse : undefined}
            onClick={onClick}
            className={`
                relative flex flex-col items-center justify-between aspect-square p-6 rounded-3xl border transition-colors group
                bg-white/80 border-black/10
                ${hasLinkedData ? 'cursor-pointer hover:shadow-xl' : 'opacity-80'}
            `}
        >
            <div className="absolute top-3 right-3 text-foreground/15 group-hover:text-primary transition-colors duration-150">
                {hasLinkedData && <ArrowUpRight size={16} />}
            </div>

            <motion.div
                className="group-hover:text-primary transition-colors"
                style={{ x: hasLinkedData ? iconX : 0, y: hasLinkedData ? iconY : 0 }}
            >
                <DynamicIcon name={skill.icon} category={skill.category} size={48} />
            </motion.div>

            <div className="text-center w-full">
                <h3 className="font-bold text-sm uppercase group-hover:text-primary transition-colors">{skill.name}</h3>
                <span className="text-smol text-foreground/30 font-mono block my-3 uppercase">{skill.category}</span>
                <div className="flex gap-1 px-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${i < skill.comfortLevel
                                ? 'bg-foreground/70 group-hover:bg-primary group-hover:shadow-[0_0_4px_rgba(217,66,97,0.7)]'
                                : 'bg-foreground/10'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
