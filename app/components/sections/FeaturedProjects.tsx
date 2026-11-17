import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '@/app/components/ui/cards/ProjectCard';
import styles from '@/app/components/ui/cards/ProjectCard.module.css';
import type { FeaturedProjectsProps } from '@/app/types';

export default function FeaturedProjects({ id = 'projects', projects }: FeaturedProjectsProps) {
    return (
        <section id={id} aria-labelledby={`${id}-title`} className="w-full py-12 md:py-16 fluid-padding">
            <div className="container-7xl">
                <div className="mb-8 flex flex-col items-start justify-between gap-6 border-b border-foreground/20 pb-6 md:mb-12 lg:flex-row lg:items-end">
                    <h2 id={`${id}-title`} className="section-title">Projets sélectionnés</h2>
                    <Link
                        href="/projects"
                        className="inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-primary/50 py-2 font-mono text-xs uppercase tracking-wide text-foreground hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                    >
                        Tous les projets
                        <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                </div>

                {projects.length > 0 ? (
                    <ul role="list" className={styles.grid}>
                        {projects.map((project, index) => (
                            <li key={project.slug}>
                                <ProjectCard project={project} index={index} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-8 text-foreground/75">Aucun projet sélectionné pour le moment. Retrouvez les autres réalisations dans l’index.</p>
                )}
            </div>
        </section>
    );
}
