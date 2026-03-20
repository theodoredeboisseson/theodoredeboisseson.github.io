'use client';

import { motion } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delayOffset?: number;
    staggerDelay?: number;
    duration?: number;
    showDot?: boolean;
}

export default function AnimatedText({
    text,
    className = "",
    delayOffset = 0.2,
    staggerDelay = 0.08,
    duration = 1.0,
    showDot = true
}: AnimatedTextProps) {
    const letters = text.split("");
    const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]; // Premium smooth easing

    return (
        <h1 className={`${className} overflow-visible flex flex-wrap`}>
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ y: 100, opacity: 0, rotate: 5 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
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
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                    className="text-primary"
                >
                    .
                </motion.span>
            )}
        </h1>
    );
}
