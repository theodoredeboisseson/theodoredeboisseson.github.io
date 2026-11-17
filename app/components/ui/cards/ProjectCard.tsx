import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import DynamicIcon from '@/app/components/ui/display/DynamicIcon';
import skills from '@/data/skills.json';
import type { ProjectCardProps } from '@/app/types';
import styles from './ProjectCard.module.css';

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const technologies = project.usedSkills?.slice(0, 4) ?? [];
    const isMainProject = project.slug === 'genomint';

    return (
        <article className={styles.card} data-project={project.slug}>
            <div className={styles.scene}>
                <div className={styles.sceneLabel}>
                    <span>{isMainProject ? 'Projet majeur' : project.category}</span>
                    {index !== undefined && <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
                </div>
                <div className={styles.browser}>
                    <div className={styles.chrome} aria-hidden="true">
                        <span className={styles.windowDots}><i /><i /><i /></span>
                        <span className={styles.windowTitle}>{isMainProject ? 'Genomint / GKG Explorer' : project.title}</span>
                    </div>
                    <div className={styles.screenshot}>
                        {project.image ? (
                            <Image
                                src={project.image}
                                alt={project.imageAlt ?? `Aperçu du projet ${project.title}`}
                                fill
                                sizes="(min-width: 1440px) 400px, (min-width: 1280px) 30vw, (min-width: 768px) 44vw, 90vw"
                                className={styles.image}
                            />
                        ) : (
                            <p className={styles.noPreview}>Aperçu non disponible</p>
                        )}
                    </div>
                </div>
                {project.slug === 'jifoosball' && (
                    <div className={styles.mobilePreview}>
                        <Image
                            src="/images/projects/jifoosball/mobile-jifoosball.png"
                            alt="Écran mobile de JiFoosball : tournois organisés et participations."
                            width={1080}
                            height={2290}
                            sizes="(min-width: 1280px) 120px, (min-width: 768px) 14vw, 28vw"
                        />
                    </div>
                )}
                <div className={styles.sceneDepth} aria-hidden="true" />
            </div>

            <div className={styles.body}>
                <div className={styles.metadata}>
                    <span>{[project.context, project.date].filter(Boolean).join(' · ')}</span>
                    {project.status && (
                        <span className={styles.status} data-active={project.status === 'in-progress'}>
                            {project.status === 'in-progress' ? 'En cours' : 'Terminé'}
                        </span>
                    )}
                </div>

                <div className={styles.introduction}>
                    <h3 className={`${styles.title} font-serif`}>
                        {project.title}
                    </h3>
                    <p className={styles.description}>{project.description}</p>
                </div>

                {project.contribution && (
                    <dl className={styles.contribution}>
                        <dt>Ma contribution</dt>
                        <dd>{project.contribution}</dd>
                    </dl>
                )}

                <div className={styles.footer}>
                    {technologies.length > 0 && (
                        <ul aria-label="Technologies principales" className={styles.technologies}>
                            {technologies.map(technology => {
                                const skill = skills.find(skill => skill.name === technology);

                                return (
                                    <li key={technology} className={styles.technology} data-skill={technology}>
                                        {skill && (
                                            <span aria-hidden="true">
                                                <DynamicIcon name={skill.icon} category={skill.category} size={22} />
                                            </span>
                                        )}
                                        <span>{technology}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <Link href={`/projects/${project.slug}`} className={styles.action}>
                        <span>Voir le projet<span className="sr-only"> : {project.title}</span></span>
                        <span className={styles.actionArrow}><ArrowUpRight size={18} aria-hidden="true" /></span>
                    </Link>
                </div>
            </div>
        </article>
    );
}
