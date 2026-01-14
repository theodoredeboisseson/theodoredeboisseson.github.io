'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from 'lucide-react';
import bioData from '@/data/bio.json';

export default function ContactSection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 md:px-6 py-12 mb-12" id="contact">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl font-serif italic mb-16 tracking-tighter text-right"
            >
                Contact<span className="text-primary">.</span>
            </motion.h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-4">

                {/* Block 1: Email (The Giant) - 4 cols */}
                <motion.a
                    href={`mailto:${bioData.contact.email}?subject=${encodeURIComponent(bioData.contact.mail_subject)}&body=${encodeURIComponent(bioData.contact.mail_body)}`}
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-4 min-h-[300px] md:min-h-[400px] bg-foreground text-background rounded-[2rem] md:rounded-br-sm p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden transition-all duration-500 hover:shadow-2xl"
                >
                    {/* Background Decor */}
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500 z-0 pointer-events-none"></div>

                    {/* Ticket Texture / Decor */}
                    <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity z-10">
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
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight group-hover:opacity-80 transition-opacity duration-300">
                            {bioData.contact.email.split('@')[0]}<br className="hidden md:block" />@{bioData.contact.email.split('@')[1]}
                        </h3>
                    </div>
                </motion.a>

                {/* Block 2: CV (The Square) - 2 cols */}
                <motion.a
                    href={bioData.cv_file}
                    target="_blank"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 aspect-square md:aspect-auto bg-gray-50 border border-border rounded-4xl md:rounded-bl-sm flex flex-col justify-between p-8 group relative overflow-hidden hover:border-primary hover:shadow-lg transition-colors"
                >
                    <div className="w-full h-full absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="relative w-64 h-64 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
                                <path
                                    id="curve"
                                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                                    fill="transparent"
                                />
                                <text className="font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] fill-current text-foreground/40">
                                    <textPath href="#curve">
                                        DOWNLOAD PDF • VIEW ONLINE •
                                    </textPath>
                                </text>
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-between items-start">
                        <FileText size={48} strokeWidth={1.5} className="group-hover:text-primary transition-colors" />
                        <ArrowUpRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </div>

                    <div className="relative z-10 mt-auto">
                        <span className="text-2xl font-bold font-sans">RESUME</span>
                        <p className="text-sm font-mono opacity-60 group-hover:opacity-80">Check the PDF</p>
                    </div>
                </motion.a>

                {/* Block 3: GitHub (Satellite) - 3 cols */}
                <motion.a
                    href={bioData.socials.github}
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-3 min-h-[200px] bg-gray-50 border border-border hover:border-primary rounded-4xl md:rounded-tr-sm p-8 flex flex-col justify-between group hover:bg-white hover:shadow-lg transition-all"
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
                    href={bioData.socials.linkedin}
                    target="_blank"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-3 min-h-[200px] bg-gray-50 border border-border rounded-[2rem] md:rounded-tl-sm p-8 flex flex-col justify-between group hover:bg-[#0A66C2] hover:text-white hover:shadow-lg transition-all"
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
