'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

export default function ContactSection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-24 mb-12" id="contact">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-serif italic mb-16 tracking-tighter text-right"
            >
                Contact
            </motion.h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-4">

                {/* Block 1: Email (The Giant) - 4 cols */}
                <motion.a
                    href="mailto:theodoredeboisseson@gmail.com?subject=Prise%20de%20contact&body=Bonjour%20Th%C3%A9odore,"
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-4 min-h-[300px] md:min-h-[400px] bg-foreground text-background rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
                >
                    {/* Ticket Texture / Decor */}
                    <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
                        <Mail size={48} strokeWidth={1} />
                    </div>

                    <div className="relative z-10">
                        <span className="inline-block px-3 py-1 border border-background/20 rounded-full text-xs font-mono uppercase tracking-widest mb-4">
                            Available for hire
                        </span>
                        <div className="w-12 h-1 bg-primary mb-6 group-hover:w-24 transition-all duration-300"></div>
                    </div>

                    <div className="relative z-10">
                        <span className="block text-sm md:text-base font-mono opacity-60 mb-2">
                            SEND A MESSAGE
                        </span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                            theodoredeboisseson<br className="hidden md:block" />@gmail.com
                        </h3>
                    </div>

                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-all duration-500"></div>
                </motion.a>

                {/* Block 2: CV (The Square) - 2 cols (becomes a square roughly) */}
                <motion.a
                    href="/documents/CV_Theodore_de_Boisseson.pdf"
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 aspect-square md:aspect-auto bg-white border border-border rounded-[2rem] flex flex-col items-center justify-center group relative overflow-hidden hover:border-primary/50 transition-colors"
                >
                    <div className="absolute inset-0 bg-noise opacity-50"></div>

                    {/* Spinning Text Effect */}
                    <div className="relative w-40 h-40 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                            <path
                                id="curve"
                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                fill="transparent"
                            />
                            <text className="font-mono text-[10px] uppercase tracking-widest fill-current">
                                <textPath href="#curve">
                                    Download Resume • PDF Version •
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <FileText size={32} className="text-primary" />
                        </div>
                    </div>
                </motion.a>

                {/* Block 3: GitHub (Satellite) - 3 cols */}
                <motion.a
                    href="https://github.com/theodoredeboisseson"
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-3 min-h-[200px] bg-gray-50 border border-border rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-white hover:shadow-lg transition-all"
                >
                    <div className="flex justify-between items-start">
                        <Github size={48} strokeWidth={1.5} className="group-hover:text-primary transition-colors" />
                        <ArrowUpRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div>
                        <span className="text-2xl font-bold font-sans">GitHub</span>
                        <p className="text-sm font-mono opacity-60">Explore my repositories</p>
                    </div>
                </motion.a>

                {/* Block 4: LinkedIn (Satellite) - 3 cols */}
                <motion.a
                    href="https://www.linkedin.com/in/theodoredeboisseson/"
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-3 min-h-[200px] bg-gray-50 border border-border rounded-[2rem] p-8 flex flex-col justify-between group hover:bg-[#0A66C2] hover:text-white hover:shadow-lg transition-all"
                >
                    <div className="flex justify-between items-start">
                        <Linkedin size={48} strokeWidth={1.5} />
                        <ArrowUpRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>
                    <div>
                        <span className="text-2xl font-bold font-sans">LinkedIn</span>
                        <p className="text-sm font-mono opacity-60 group-hover:opacity-80">Connect professionally</p>
                    </div>
                </motion.a>

            </div>
        </section>
    );
}
