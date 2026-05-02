'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { AC, CE, Competence, Project } from '@/app/types';

interface CompetencesContentProps {
    competences: Competence[];
    projects: Project[];
}

export default function CompetencesContent({ competences, projects }: CompetencesContentProps) {

    const getProjectsForAC = (comp: Competence, ac: AC) => {
        return projects.filter((p) => p.ac_list?.includes(ac.id));
    };

    const getProjectsForCE = (comp: Competence, ce: CE) => {
        return projects.filter((p) => p.ce_list?.includes(ce.id));
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

                        {/* Right Column: AC & CE Lists */}
                        <div className="col-span-1 md:col-span-8 flex flex-col gap-12">

                            {/* CE List */}
                            {comp.ces && comp.ces.length > 0 && (
                                <div className="flex flex-col gap-10">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="font-mono text-smol uppercase tracking-widest opacity-40 whitespace-nowrap">Composantes Essentielles</span>
                                        <div className="h-px bg-black/20 flex-1" />
                                    </div>
                                    {comp.ces.map((ce, ceIndex) => {
                                        const linkedProjects = getProjectsForCE(comp, ce);
                                        return (
                                            <motion.div 
                                                id={ce.id}
                                                key={ce.id} 
                                                className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-black/15 pb-8 last:border-0 scroll-mt-48!"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: ceIndex * 0.08 }}
                                            >
                                                {/* CE Content (2/3) */}
                                                <div className="md:col-span-2">
                                                    <h3 className="text-xl font-medium mb-3 italic flex items-start gap-3">
                                                        <span className="font-mono text-xs text-black/20 mt-1 shrink-0 not-italic">
                                                            {ce.id}
                                                        </span>
                                                        {ce.title}
                                                    </h3>
                                                    <div className="pl-9">
                                                        <p className="text-base opacity-60 leading-relaxed font-sans">
                                                            {ce.description}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Proofs (1/3) */}
                                                <div className="md:col-span-1 flex flex-col items-start md:items-end gap-3">
                                                    {linkedProjects.length > 0 && (
                                                        <span className="text-smol uppercase tracking-widest opacity-40 font-mono text-primary">
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
                                                                    className="inline-block px-3 py-1.5 bg-black/5 hover:bg-primary hover:text-background transition-all text-[11px] font-mono rounded-sm border border-transparent hover:border-primary/20"
                                                                >
                                                                    {p.title} ↗
                                                                </Link>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* AC List */}
                            <div className="flex flex-col gap-10 mt-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="font-mono text-smol uppercase tracking-widest opacity-40 whitespace-nowrap">Apprentissages Critiques</span>
                                    <div className="h-px bg-black/20 flex-1" />
                                </div>
                                {comp.acs.map((ac, acIndex) => {
                                    const linkedProjects = getProjectsForAC(comp, ac);
                                    return (
                                        <motion.div 
                                            id={ac.id}
                                            key={ac.id} 
                                            className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-black/15 pb-8 last:border-0 scroll-mt-48!"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: acIndex * 0.08 }}
                                        >
                                            {/* AC Content (2/3) */}
                                            <div className="md:col-span-2">
                                                <h3 className="text-xl font-medium mb-3 flex items-start gap-3">
                                                    <span className="font-mono text-xs text-primary/50 mt-1 shrink-0">
                                                        {ac.id}
                                                    </span>
                                                    {ac.title}
                                                </h3>
                                                <div className="pl-9">
                                                    <p className="text-sm font-mono text-primary mb-2 tracking-tighter opacity-80">
                                                        Niveau 3 :
                                                    </p>
                                                    <p className="text-base opacity-70 leading-relaxed">
                                                        {ac.level3 !== "À compléter" ? ac.level3 : "En cours de validation via le portfolio et les projets de 3ème année."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Proofs (1/3) */}
                                            <div className="md:col-span-1 flex flex-col items-start md:items-end gap-3">
                                                {linkedProjects.length > 0 && (
                                                    <span className="text-smol uppercase tracking-widest opacity-40 font-mono text-primary">
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
                                                                className="inline-block px-3 py-1.5 bg-black/5 hover:bg-primary hover:text-background transition-all text-[11px] font-mono rounded-sm border border-transparent hover:border-primary/20"
                                                            >
                                                                {p.title} ↗
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </motion.section>
            ))}
        </div>
    );
}
