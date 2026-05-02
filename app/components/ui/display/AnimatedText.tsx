'use client';

import { motion } from "framer-motion";
import { AnimatedTextProps } from '@/app/types';

interface ExtendedAnimatedTextProps extends AnimatedTextProps {
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
    once?: boolean;
}

export default function AnimatedText({
    text,
    className = "",
    delayOffset = 0.1,
    staggerDelay = 0.04,
    duration = 0.6,
    showDot = true,
    tag: Tag = 'h1',
    once = true
}: ExtendedAnimatedTextProps) {
    const letters = text.split("");
    const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]; // Premium smooth easing

    return (
        <Tag className={`${className} overflow-visible flex flex-wrap`}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0, rotate: 5 }}
                    whileInView={{ y: 0, opacity: 1, rotate: 0 }}
                    viewport={{ once }}
                    transition={{
                        delay: delayOffset + (i * staggerDelay), // Slower stagger
                        duration: duration,
                        ease
                    }}
                    className="inline-block origin-bottom-left"
                >
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
            {showDot && (
                <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once }}
                    transition={{ delay: delayOffset + (letters.length * staggerDelay) + 0.5, duration: 0.5, type: "spring" }}
                    className="text-primary"
                >
                    .
                </motion.span>
            )}
        </Tag>
    );
}

