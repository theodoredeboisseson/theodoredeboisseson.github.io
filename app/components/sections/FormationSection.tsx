'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MovementLine from '../ui/MovementLine';
import bioData from '@/data/bio.json';

const formations = bioData.education;

export default function FormationSection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 py-12" id="formation">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-serif italic mb-24 tracking-tighter"
            >
                Formation<span className="text-primary">.</span>
            </motion.h2>

            <div className="relative">
                {/* Visual Line on the left */}
                <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-24 hidden md:block opacity-50 pointer-events-none">
                    <MovementLine />
                </div>

                <div className="flex flex-col space-y-16 ml-4">
                    {formations.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative">
                                {/* Year - Huge Serif Italic */}
                                <div className="md:col-span-4 lg:col-span-3">
                                    <span className={`font-serif italic text-6xl md:text-8xl lg:text-9xl text-primary block leading-none transition-opacity duration-500`}>
                                        {item.year}
                                    </span>
                                </div>

                                {/* Content - Clean Sans Serif */}
                                <div className="md:col-span-8 lg:col-span-9 pt-4 md:pt-8 flex flex-col justify-center">
                                    <h3 className="text-2xl md:text-4xl font-bold font-sans uppercase tracking-tight mb-3">
                                        {item.degree}
                                    </h3>
                                    <p className="text-xl font-sans text-foreground/60 mb-4">
                                        {item.school} // {item.location}
                                    </p>
                                    <p className="font-mono text-sm opacity-80 mb-2 text-primary">
                                        {item.details}
                                    </p>
                                    <p className="font-mono text-sm opacity-60 max-w-xl border-l border-primary/30 pl-4 py-1">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Separator - Footnote style, 80% width aligned right */}
                            <div className="mt-16 w-full flex justify-center">
                                <div className="w-[85%] h-px bg-border/50" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="absolute -right-4 md:-right-12 top-0 bottom-0 w-24 hidden md:block opacity-50 pointer-events-none">
                    <MovementLine />
                </div>
            </div>
        </section>
    );
}
