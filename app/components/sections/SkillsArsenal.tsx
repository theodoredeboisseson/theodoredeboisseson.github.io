import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/app/components/ui/containers/Section';
import DynamicIcon from '@/app/components/ui/display/DynamicIcon';
import type { SkillDomain, SkillsArsenalProps } from '@/app/types';
import skillDomainsData from '@/data/skill-domains.json';
import styles from './SkillsArsenal.module.css';

const domains: SkillDomain[] = skillDomainsData;

export default function SkillsArsenal({ id, skills }: SkillsArsenalProps) {
    return (
        <Section
            id={id}
            title="Compétences"
            className="w-full fluid-padding"
            aside={
                <p className="text-serif-italic text-lg text-foreground/70 md:text-right">
                    Interfaces, données et services
                </p>
            }
        >
            <div className="container-7xl">
                <p className="mb-10 max-w-3xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
                    Mon point d’entrée : l’interface et l’expérience d’exploration.
                    Je relie ce travail aux services applicatifs et aux pratiques
                    qui permettent de faire évoluer le produit.
                </p>

                <div className={styles.grid}>
                    {domains.map((domain, index) => (
                        <article
                            key={domain.id}
                            aria-labelledby={`skill-domain-${domain.id}`}
                            className={styles.domain}
                            data-domain={domain.id}
                        >
                            <p aria-hidden="true" className={styles.ordinal}>
                                {String(index + 1).padStart(2, '0')}
                                <span />
                            </p>
                            <h3
                                id={`skill-domain-${domain.id}`}
                                className={styles.title}
                            >
                                {domain.title}
                            </h3>
                            <p className={styles.description}>
                                {domain.description}
                            </p>
                            <p className={styles.context}>
                                {domain.context}
                            </p>

                            <div className={styles.tools}>
                                <p className={styles.label}>Outils</p>
                                <ul role="list" className={styles.toolList}>
                                    {domain.skills.map(name => {
                                        const skill = skills.find(item => item.name === name);
                                        return (
                                            <li key={name}>
                                                {skill?.documentationUrl ? (
                                                    <a
                                                        href={skill.documentationUrl}
                                                        className={styles.tool}
                                                    >
                                                        <span className={styles.toolIcon} data-skill={name} aria-hidden="true">
                                                            <DynamicIcon name={skill.icon} category={skill.category} size={26} />
                                                        </span>
                                                        {name}
                                                    </a>
                                                ) : (
                                                    <span className={styles.tool}>
                                                        {skill && (
                                                            <span className={styles.toolIcon} data-skill={name} aria-hidden="true">
                                                                <DynamicIcon name={skill.icon} category={skill.category} size={26} />
                                                            </span>
                                                        )}
                                                        {name}
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            <ul role="list" className={styles.projects}>
                                {domain.projects.map(project => (
                                    <li key={project.slug}>
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className={styles.projectLink}
                                        >
                                            {project.label}
                                            <ArrowUpRight size={16} aria-hidden="true" className="shrink-0" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
