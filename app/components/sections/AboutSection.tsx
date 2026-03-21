'use client';

import { motion } from 'framer-motion';
import { Globe, Brain, Sparkles, Palette } from 'lucide-react';

export default function AboutSection() {
    const languages = [
        { name: "Français", level: "Natif", flag: "🇫🇷" },
        { name: "Grec", level: "Maternel", flag: "🇬🇷" },
        { name: "Anglais", level: "B2/C1", flag: "🇬🇧" },
        { name: "Japonais", level: "A2 (Autodidacte)", flag: "🇯🇵" },
        { name: "Espagnol", level: "A2 (École)", flag: "🇪🇸" }
    ];

    const softSkills = [
        "Autodiscipline", "Apprentissage continu", "Communication proactive",
        "Esprit d'équipe & à l'écoute", "Créativité"
    ];

    const hobbies = [
        "Jeux Vidéo (Compétitif, Souls-like)", "Dessin", "Piano",
        "Photographie", "Modélisation 3D", "Kung-Fu"
    ];

    return (
        <section className="container-7xl px-4 md:px-6 py-12" id="about">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-6xl md:text-8xl text-serif-italic mb-16 tracking-tighter"
            >
                Profil<span className="text-primary">.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
                {/* Soft Skills Card (Larger, Span 7) */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="md:col-span-7 bg-foreground text-background/90 rounded-4xl rounded-br-sm md:rounded-br-4xl md:rounded-tr-sm p-8 md:p-10 relative overflow-hidden group hover:shadow-2xl transition-all"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Brain size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="p-2 border border-background/20 rounded-xl bg-background/5">
                            <Sparkles className="text-primary" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-sans uppercase tracking-tight text-white">Soft Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-3 relative z-10">
                        {softSkills.map((skill, i) => (
                            <span key={i} className="px-5 py-2.5 rounded-full border border-background/20 text-sm md:text-base font-mono uppercase tracking-widest bg-background/5 hover:bg-background/10 transition-colors">
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Languages Card (Span 5) */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="md:col-span-5 bg-gray-50 border border-border rounded-4xl rounded-tr-sm md:rounded-tr-4xl md:rounded-tl-sm p-8 md:p-10 relative overflow-hidden group hover:border-primary transition-all flex flex-col justify-between"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe size={120} />
                    </div>
                    <div className="flex items-center gap-3 mb-8 relative z-10">
                        <div className="p-2 border border-black/10 rounded-xl bg-white">
                            <Globe className="text-primary" size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-sans uppercase tracking-tight">Langues</h3>
                    </div>
                    <ul className="flex flex-col gap-3 relative z-10 grow justify-end">
                        {languages.map((lang, i) => (
                            <li key={i} className="flex flex-col sm:flex-row sm:items-center justify-between group/item pb-2 border-b border-black/5 last:border-0 last:pb-0 gap-1">
                                <span className="font-sans text-lg font-medium flex items-center gap-3">
                                    <span className="text-2xl" aria-hidden="true">{lang.flag}</span>
                                    {lang.name}
                                </span>
                                <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-foreground/50 group-hover/item:text-primary transition-colors">
                                    {lang.level}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Hobbies / Interests (Full width or Span 12) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="md:col-span-12 bg-primary/5 text-primary rounded-4xl rounded-tl-sm p-8 md:p-10 relative overflow-hidden group border border-primary/10 hover:border-primary/30 hover:bg-primary/10 transition-all flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center w-full"
                >
                    <div className="flex items-center gap-3 w-fit pt-1">
                        <div className="p-2 border border-primary/20 rounded-xl bg-background/50">
                            <Palette size={24} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-sans uppercase tracking-tight w-fit">Hobbies</h3>
                        <div className="hidden lg:block w-px h-12 bg-primary/20 mx-4"></div>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-4">
                        {hobbies.map((hobby, i) => (
                            <div key={i} className="flex items-center gap-2 group/hobby">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover/hobby:bg-primary transition-colors" />
                                <span className="font-mono text-sm uppercase tracking-wide opacity-80 group-hover/hobby:opacity-100 transition-opacity">
                                    {hobby}
                                </span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
