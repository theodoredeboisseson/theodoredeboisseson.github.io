'use client';

import { useState } from 'react';
import ProjectCard from '@/app/components/ui/cards/ProjectCard';
import styles from '@/app/components/ui/cards/ProjectCard.module.css';
import type { ProjectListClientProps } from '@/app/types';

const CATEGORIES = [
    { label: 'Tout', value: 'All' },
    { label: 'Technique', value: 'Tech' },
    { label: 'Création', value: 'Art' },
];

export default function ProjectListClient({ projects }: ProjectListClientProps) {
    const [activeFilter, setActiveFilter] = useState('All');
    const filteredProjects = projects.filter(project =>
        activeFilter === 'All' || project.filter?.includes(activeFilter)
    );

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8 flex flex-col items-start justify-between gap-6 border-b border-foreground/20 pb-6 md:mb-10 md:flex-row md:items-end">
                <div>
                    <h1 className="mb-3 text-5xl font-black uppercase tracking-tighter text-foreground md:text-7xl">
                        Projets<span className="text-primary">.</span>
                    </h1>
                    <p className="font-mono text-sm text-foreground/75">Archives et expérimentations</p>
                </div>

                <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-2">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.value}
                            type="button"
                            aria-pressed={activeFilter === category.value}
                            onClick={() => setActiveFilter(category.value)}
                            className={`min-h-11 border px-3 py-2 font-mono text-xs uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:px-4 ${activeFilter === category.value
                                ? 'border-foreground bg-foreground text-background'
                                : 'border-foreground/25 text-foreground/80 hover:border-foreground hover:bg-foreground/5'}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            <section aria-labelledby="project-list-title">
                <h2 id="project-list-title" className="sr-only">Liste des projets</h2>
                <p role="status" className="mb-6 font-mono text-xs text-foreground/75">
                    {filteredProjects.length} projet{filteredProjects.length > 1 ? 's' : ''}
                    {activeFilter !== 'All' && ' dans cette catégorie'}
                </p>
                {filteredProjects.length > 0 ? (
                    <ul role="list" className={`${styles.grid} ${styles.archiveGrid}`}>
                        {filteredProjects.map((project, index) => (
                            <li key={project.slug} id={project.slug}>
                                <ProjectCard project={project} index={index} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="py-12 text-foreground/75">Aucun projet ne correspond à cette catégorie.</p>
                )}
            </section>
        </div>
    );
}
