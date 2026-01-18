'use client';

import Image from "next/image";
import { motion } from "framer-motion";

import { HeroProps } from "../../Interfaces";

export default function Hero({ issueText, title, subtitle, description, profileImage }: HeroProps) {
    // Split title into array of letters for individual animation
    const titleLetters = title.split("");

    const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1.0]; // Premium smooth easing

    return (
        <section className="relative min-h-screen w-full overflow-hidden pt-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center text-background">
            {/* Background Image - Fades in first */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.0, ease }}
                className="absolute inset-0 z-0 blur-xs"
            >
                <Image
                    src="/images/hero_bg.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-black/30" />
            </motion.div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center">

                {/* Left Col: Title & Intro */}
                <div className="lg:col-span-8 flex flex-col gap-6 relative z-10">
                    <div className="flex flex-col">
                        {/* Issue Text - Slides in */}
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1.0, ease }}
                            className="font-mono text-xs uppercase font-bold tracking-[0.2em] mb-4 text-primary"
                        >
                            {issueText}
                        </motion.span>

                        {/* Title - Letter by Letter */}
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] overflow-visible flex flex-wrap">
                            {titleLetters.map((letter, i) => (
                                <motion.span
                                    key={i}
                                    initial={{ y: 100, opacity: 0, rotate: 5 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    transition={{
                                        delay: 0.2 + (i * 0.08), // Slower stagger
                                        duration: 1.0,
                                        ease
                                    }}
                                    className="inline-block origin-bottom-left"
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
                            <motion.span
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 1.5, duration: 0.5, type: "spring" }}
                                className="text-primary"
                            >
                                .
                            </motion.span>
                        </h1>
                    </div>

                    {/* Horizontal line - Expands */}
                    <motion.div
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.5, duration: 2.0, ease }}
                        className="h-px w-full bg-white opacity-20 origin-left"
                    />

                    <div className="flex flex-row relative mt-4">
                        {/* Vertical Line - Grows Down */}
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 2.0, duration: 1.5, ease }}
                            className="bg-white/40 w-[0.5px] mr-6 origin-top"
                        />

                        {/* Description - Fades in */}
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.5, duration: 1.0, ease }}
                            className="max-w-md pt-2"
                        >
                            <p className="font-serif italic text-base md:text-lg leading-relaxed opacity-90 tracking-wide">
                                <span className="block font-bold not-italic mb-1">{subtitle}</span>
                                {description}
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Right Col: Image - Reveals itself */}
                <div className="lg:col-span-4 relative w-full mt-12 lg:mt-0 aspect-3/4 md:aspect-4/5 lg:aspect-3/4 mx-auto">
                    <motion.div
                        initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
                        animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
                        transition={{ delay: 2.8, duration: 1.5, ease }}
                        className="relative h-full w-full rounded-3xl rounded-tl-sm overflow-hidden bg-black/5"
                    >
                        <Image
                            src={profileImage}
                            alt="Portrait"
                            fill
                            className="object-cover opacity-90"
                        />
                        {/* Floating Badge - Pops in */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 3.8, duration: 0.5, type: "spring" }}
                            className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl rounded-tl-sm border border-black/5 shadow-sm"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-mono text-[10px] uppercase text-black">Open to work</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.0, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-24 font-mono text-[10px] tracking-widest hidden md:block opacity-60"
            >
                SCROLL TO EXPLORE ↓
            </motion.div>
        </section >
    );
}
