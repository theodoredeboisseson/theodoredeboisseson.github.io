'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AC, Competence, Project } from '@/app/types';

interface CompetencesContentProps {
    competences: Competence[];
    projects: Project[];
}

export default function CompetencesContent({ competences, projects }: CompetencesContentProps) {

    const getProjectsForAC = (comp: Competence, ac: AC) => {
        const acNum = ac.id.replace("AC", ""); // "AC11" -> "11"

        return projects.filter((p) => {
            if (!p.ac_list) return false;
            return p.ac_list.some((valString: string) => {
                const s = valString.toLowerCase();

                return s.includes(`ac${acNum}`) || s.includes(`ac ${acNum}`);
            });
        });
    };

    return (
        <div className="flex flex-col gap-16">
            {competences.map((comp, compIndex) => (
                <motion.section 
                    key={comp.id} 
                    className="group"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: compIndex * 0.1 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-t border-black/80">

                        {/* Left: Competence Title */}
                        <motion.div 
                            className="col-span-1 md:col-span-4 flex flex-col gap-2"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="font-mono text-xs text-primary mb-1">
                                {comp.id} {'//'}
                            </span>
                            <h2 className="text-3xl font-serif">
                                {comp.title}
                            </h2>
                            <p className="text-sm opacity-60 italic mt-2 max-w-xs">
                                {comp.description}
                            </p>
                        </motion.div>

                        {/* Right: AC List */}
                        <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
                            {comp.acs.map((ac, acIndex) => {
                                const linkedProjects = getProjectsForAC(comp, ac);
                                return (
                                    <motion.div 
                                        key={ac.id} 
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-black/10 pb-6 last:border-0 relative"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: acIndex * 0.08 }}
                                    >
                                        {/* AC ID & Title */}
                                        <div className="col-span-1 md:col-span-8">
                                            <h3 className="text-lg font-medium mb-1">
                                                <span className="font-mono text-xs text-black/40 mr-2 uppercase tracking-tight">
                                                    {ac.id}
                                                </span>
                                                {ac.title}
                                            </h3>
                                            {/* Level 3 Placeholder */}
                                            <div className="pl-8 mt-2">
                                                <p className="text-sm font-mono text-primary mb-1">
                                                    Niveau 3 :
                                                </p>
                                                <p className="text-sm opacity-70">
                                                    {ac.level3 !== "À compléter" ? ac.level3 : "En cours de validation via le portfolio et les projets de 3ème année."}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Linked Projects */}
                                        <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end gap-2">
                                            {linkedProjects.length > 0 && (
                                                <span className="text-smol uppercase tracking-widest opacity-40 font-mono">
                                                    Preuves
                                                </span>
                                            )}
                                            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                                {linkedProjects.map(p => (
                                                    <motion.div
                                                        key={p.slug}
                                                        whileHover={{ scale: 1.05, y: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <Link
                                                            href={`/projects/${p.slug}`}
                                                            className="inline-block px-2 py-1 bg-black/5 hover:bg-primary hover:text-background transition-colors text-xs font-mono rounded-sm"
                                                        >
                                                            {p.title} ↗
                                                        </Link>
                                                    </motion.div>
                                                ))}
                                                {linkedProjects.length === 0 && (
                                                    <span className="text-xs opacity-30 italic">
                                                        Aucune preuve liée
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                    </div>
                </motion.section>
            ))}
        </div>
    );
}
