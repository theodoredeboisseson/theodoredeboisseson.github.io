'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, FileText, Copy, Check } from 'lucide-react';

const GithubIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
);

const LinkedinIcon = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
);

import { ContactProps } from '../../Interfaces';

export default function ContactSection({ contact, socials, cvUrl }: ContactProps) {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await navigator.clipboard.writeText(contact.email);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

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

                {/* Email */}
                <motion.div
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="md:col-span-4 min-h-75 md:min-h-100 bg-foreground text-background rounded-4xl md:rounded-br-sm p-8 md:p-12 flex flex-col justify-between group relative overflow-hidden transition-shadow duration-500 hover:shadow-2xl"
                >
                    {/* Main Link Overlay */}
                    <a
                        href={`mailto:${contact.email}?subject=${encodeURIComponent(contact.mail_subject)}&body=${encodeURIComponent(contact.mail_body)}`}
                        target="_blank"
                        className="absolute inset-0 z-0"
                        aria-label="Send email"
                    />

                    {/* Background Decor */}
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500 z-0 pointer-events-none"></div>

                    {/* Ticket Texture / Decor */}
                    <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                        <Mail size={48} strokeWidth={1} />
                    </div>

                    <div className="relative z-10 pointer-events-none">
                        <span className="inline-block px-3 py-1 border border-background/20 group-hover:bg-green-500/50 group-hover:font-bold rounded-full text-xs font-mono uppercase tracking-widest mb-4">
                            Available for hire
                        </span>
                        <div className="w-12 h-1 bg-primary mb-6 group-hover:w-24 transition-all duration-300"></div>
                    </div>

                    <div className="relative z-10 pointer-events-none">
                        <span className="block text-sm md:text-base font-mono opacity-60 mb-2">
                            SEND A MESSAGE
                        </span>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight group-hover:opacity-80 transition-opacity duration-300">
                            {contact.email.split('@')[0]}<br className="hidden md:block" />@{contact.email.split('@')[1]}
                        </h3>
                    </div>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className="absolute bottom-8 right-8 z-20 flex items-center justify-center gap-2 group/btn"
                        aria-label="Copy email address"
                    >
                        <span className={`text-xs font-mono uppercase tracking-wider transition-all duration-300 ${isCopied ? 'opacity-100 text-green-400' : 'opacity-0 -translate-x-2 group-hover/btn:opacity-60 group-hover/btn:translate-x-0'}`}>
                            {isCopied ? 'Copied!' : 'Copy Email'}
                        </span>
                        <div className={`p-3 rounded-full border border-background/20 bg-foreground text-background transition-all duration-300 ${isCopied ? 'border-green-400/50 text-green-400' : 'hover:bg-background hover:text-foreground'}`}>
                            {isCopied ? <Check size={20} /> : <Copy size={20} />}
                        </div>
                    </button>
                </motion.div>

                {/* Resume */}
                <motion.a
                    href={cvUrl}
                    target="_blank"
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
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
                        <span className="text-2xl font-bold font-sans">Resume</span>
                        <p className="text-sm font-mono opacity-60 group-hover:opacity-80">Check the PDF</p>
                    </div>
                </motion.a>

                {/* GitHub */}
                <motion.a
                    href={socials.github}
                    target="_blank"
                    initial={{ opacity: 0, x: -80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                    className="md:col-span-3 min-h-50 bg-gray-50 border border-border rounded-4xl md:rounded-tr-sm p-8 flex flex-col justify-between group hover:bg-[#24292e] hover:text-white hover:shadow-lg transition-[background-color,color,box-shadow]"
                >
                    <div className="flex justify-between items-start">
                        <GithubIcon size={48} className="group-hover:text-[#bc8cff] transition-colors" />
                        <ArrowUpRight size={32} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#bc8cff] transition-all" />
                    </div>
                    <div>
                        <span className="text-2xl font-bold font-sans">GitHub</span>
                        <p className="text-sm font-mono opacity-60 group-hover:opacity-80">Explore my repositories</p>
                    </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                    href={socials.linkedin}
                    target="_blank"
                    initial={{ opacity: 0, x: 80 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="md:col-span-3 min-h-50 bg-gray-50 border border-border rounded-4xl md:rounded-tl-sm p-8 flex flex-col justify-between group hover:bg-[#0A66C2] hover:text-white hover:shadow-lg transition-[background-color,color,box-shadow]"
                >
                    <div className="flex justify-between items-start">
                        <LinkedinIcon size={48} />
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
