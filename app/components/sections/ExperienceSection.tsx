import Link from 'next/link';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Section from '@/app/components/ui/containers/Section';
import type { Experience, ExperienceSectionProps } from '@/app/types';
import { formatExperienceDate, getTimelineLayout } from '@/lib/experience-dates';
import styles from './ExperienceSection.module.css';

const statusLabels: Record<Experience['status'], string> = {
    current: 'En cours',
    completed: 'Terminé',
    upcoming: 'À venir',
};

function Status({ status }: { status: Experience['status'] }) {
    return (
        <span className={status === 'current' ? styles.currentStatus : styles.status}>
            {status === 'current' && <span className={styles.statusDot} aria-hidden="true" />}
            {statusLabels[status]}
        </span>
    );
}

function Period({ start, end }: { start: string; end: string }) {
    return (
        <p className={styles.period}>
            <time dateTime={start}>{formatExperienceDate(start)}</time>
            <span aria-hidden="true">→</span>
            <span className={styles.srOnly}>au</span>
            <time dateTime={end}>{formatExperienceDate(end)}</time>
        </p>
    );
}

interface TimelineItem {
    id: string;
    label: string;
    start_date: string;
    end_date: string;
    current: boolean;
}

function Timeline({ items, label }: { items: TimelineItem[]; label: string }) {
    const { years, segments } = getTimelineLayout(items);

    return (
        <div className={styles.timeline} style={{ '--year-count': years.length || 1 } as CSSProperties}>
            <p className={styles.scale}>{label}</p>
            <div className={styles.axis} aria-hidden="true">
                {years.map(year => <span key={year}>{year}</span>)}
            </div>
            <ol className={styles.timelineItems} role="list">
                {items.map((item, index) => (
                    <li key={item.id} className={item.current ? styles.activeSegment : undefined}>
                        <a href={`#${item.id}`} className={styles.timelineLink}>
                            <span className={styles.timelineLabel}>
                                <span>{item.label}</span>
                                {item.current && <Status status="current" />}
                            </span>
                            <span className={styles.yearRange}>
                                <time dateTime={item.start_date}>{formatExperienceDate(item.start_date)}</time>
                                <span aria-hidden="true">→</span>
                                <span className={styles.srOnly}>au</span>
                                <time dateTime={item.end_date}>{formatExperienceDate(item.end_date)}</time>
                            </span>
                            <span className={styles.rail} aria-hidden="true">
                                <span
                                    className={styles.segment}
                                    style={{
                                        '--segment-start': `${segments[index].start}%`,
                                        '--segment-width': `${segments[index].width}%`,
                                    } as CSSProperties}
                                />
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
            <p className={styles.timelineHint}>Chaque segment est une période distincte. Détails ci-dessous.</p>
        </div>
    );
}

export default function ExperienceSection({ id, experiences, education }: ExperienceSectionProps) {
    const sortedExperiences = [...experiences].sort((first, second) => second.start_date.localeCompare(first.start_date));
    const sortedEducation = [...education].sort((first, second) => second.start_date.localeCompare(first.start_date));
    const experienceItems = sortedExperiences.map((item, index) => ({
        ...item, id: `${id}-experience-${index}`, label: `${item.company} · ${item.type}`, current: item.status === 'current',
    }));
    const educationItems = sortedEducation.map((item, index) => ({
        ...item, id: `${id}-formation-${index}`, label: item.degree,
    }));

    return (
        <Section id={id} title="Parcours" className={`container-7xl px-4 sm:px-6 ${styles.section}`}>
            <div className={styles.tracks}>
                <div className={styles.track}>
                    <div className={styles.trackHeading}>
                        <h3 className={styles.trackTitle}>Expériences</h3>
                        <span className={styles.trackIndex} aria-hidden="true">01 / Terrain</span>
                    </div>
                    <Timeline items={experienceItems} label="Échelle des missions" />
                    <ol className={styles.entries} role="list">
                        {experienceItems.map(item => (
                            <li
                                key={item.id}
                                id={item.id}
                                tabIndex={-1}
                                className={`${styles.entry} ${item.current ? styles.currentEntry : ''}`}
                            >
                                <div className={styles.entryMeta}>
                                    <span className={styles.contractType}>{item.type}</span>
                                    <Status status={item.status} />
                                </div>
                                <h4 className={styles.company}>{item.company}</h4>
                                <p className={styles.location}>{item.location}</p>
                                <Period start={item.start_date} end={item.end_date} />
                                <h5 className={styles.role}>{item.title}</h5>
                                <p className={styles.description}>{item.description}</p>
                                {item.project_slug && (
                                    <Link href={`/projects/${item.project_slug}`} className={styles.projectLink}>
                                        {item.project_slug === 'genomint' ? 'Découvrir Genomint' : 'Voir le projet MJC'}
                                        <ArrowUpRight size={16} aria-hidden="true" />
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className={`${styles.track} ${styles.educationTrack}`}>
                    <div className={styles.trackHeading}>
                        <h3 className={styles.trackTitle}>Formation</h3>
                        <span className={styles.trackIndex} aria-hidden="true">02 / Études</span>
                    </div>
                    <Timeline items={educationItems} label="Échelle pluriannuelle" />
                    <ol className={styles.entries} role="list">
                        {educationItems.map(item => (
                            <li key={item.id} id={item.id} tabIndex={-1} className={styles.entry}>
                                <div className={styles.entryMeta}>
                                    <span className={styles.contractType}>Promotion {item.year}</span>
                                    {item.current && <Status status="current" />}
                                </div>
                                <h4 className={styles.company}>{item.degree}</h4>
                                <p className={styles.location}>{item.school} · {item.location}</p>
                                <Period start={item.start_date} end={item.end_date} />
                                <p className={styles.role}>{item.details}</p>
                                <p className={styles.description}>{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Section>
    );
}
