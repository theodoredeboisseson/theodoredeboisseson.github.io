'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative min-h-screen w-full overflow-hidden pt-24 px-6 md:px-12 lg:px-24 flex flex-col justify-center text-background">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 blur-xs">
                <Image
                    src="/images/hero_bg.jpg"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Subtle overlay to ensure text readability while maintaining image visibility */}
                <div className="absolute inset-0 bg-black/30" />
            </div>


            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center">

                {/* Horizontal line */}
                <div className="absolute top-5/8 left-0 h-[1px] w-full bg-white opacity-20" />

                {/* Left Col: Title & Intro */}
                <div className="lg:col-span-8 flex flex-col gap-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col"
                    >
                        <span className="font-mono text-xs uppercase font-bold tracking-[0.2em] mb-4 text-primary">
                            Issue 01 — 2026
                        </span>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9]">
                            THÉO<br />
                            DORE<span className="text-primary">.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="max-w-md mt-8 ml-2 border-l-[0.5px] border-white/40 pl-6"
                    >
                        <p className="font-mono text-sm md:text-base leading-relaxed opacity-80">
                            STUDENT DEVELOPER & DIGITAL ARTIST <br />
                            Based in Montpellier. Studying in 3rd year computer science. Crafting digital projects in my free time.
                        </p>
                    </motion.div>
                </div>

                {/* Right Col: Image / Graphic Element */}
                <div className="lg:col-span-4 relative h-[50vh] lg:h-[70vh] w-full mt-12 lg:mt-0">
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="relative h-full w-full rounded-2xl overflow-hidden bg-black/5"
                    >
                        {/* Texture/Image Placeholder */}
                        <Image
                            src="/images/profile_picture.jpg"
                            alt="Portrait"
                            fill
                            className="object-cover opacity-90"
                        />
                        <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-black/5 shadow-sm">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="font-mono text-[10px] uppercase text-black">Open to work</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-6 md:left-24 font-mono text-[10px] tracking-widest hidden md:block opacity-60"
            >
                SCROLL TO EXPLORE ↓
            </motion.div>
        </section>
    );
}
