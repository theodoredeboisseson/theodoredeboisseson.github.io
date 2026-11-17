'use client';

import { motion } from 'framer-motion';
import {
    Globe,
    Brain,
    Sparkles,
    Palette,
    Target,
    Gamepad2,
    Pencil,
    Music,
    Camera,
    Box,
    Wrench,
    LucideIcon
} from 'lucide-react';

import Section from '@/app/components/ui/containers/Section';
import { AboutSectionProps } from '@/app/types';
import styles from './AboutSection.module.css';

const iconMap: Record<string, LucideIcon> = {
    Gamepad2,
    Pencil,
    Music,
    Camera,
    Box,
    Wrench,
    Sparkles
};

export default function AboutSection({ id, seeking, languages, softSkills, hobbies }: AboutSectionProps) {
    return (
        <Section id={id} title="Profil" className="container-7xl px-4 md:px-6 py-12 mt-8">
            <div className={styles.grid}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`motion-reducible ${styles.card} ${styles.seeking}`}
                    aria-labelledby="profile-seeking"
                >
                    <div className={styles.seekingHeading}>
                        <Target size={28} aria-hidden="true" />
                        <h3 id="profile-seeking" className={styles.title}>Recherche</h3>
                        <Target size={200} className={styles.seekingMark} aria-hidden="true" />
                    </div>
                    <p className={styles.seekingText}>
                        {seeking.description.split(/(\*\*.*?\*\*)/).map((part, partIndex) =>
                            part.startsWith('**') && part.endsWith('**')
                                ? <strong key={partIndex}>{part.slice(2, -2)}</strong>
                                : part
                        )}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className={`motion-reducible ${styles.card} ${styles.hobbies}`}
                    aria-labelledby="profile-hobbies"
                >
                    <div className={styles.watermark} aria-hidden="true">
                        <Sparkles size={120} />
                    </div>
                    <div className={styles.heading}>
                        <Palette size={24} aria-hidden="true" />
                        <h3 id="profile-hobbies" className={styles.title}>Hobbies</h3>
                    </div>
                    <ul role="list" className={styles.hobbyList}>
                        {hobbies.map(hobby => {
                            const IconComponent = iconMap[hobby.icon] || Sparkles;
                            return (
                                <li key={hobby.name} className={styles.hobby}>
                                    <IconComponent size={20} aria-hidden="true" />
                                    <span>{hobby.name}</span>
                                </li>
                            );
                        })}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className={`motion-reducible ${styles.card} ${styles.languages}`}
                    aria-labelledby="profile-languages"
                >
                    <div className={styles.watermark} aria-hidden="true">
                        <Globe size={120} />
                    </div>
                    <div className={styles.heading}>
                        <Globe size={24} aria-hidden="true" />
                        <h3 id="profile-languages" className={styles.title}>Langues</h3>
                    </div>
                    <ul role="list" className={styles.languageList}>
                        {languages.map(lang => (
                            <li key={lang.name} className={styles.language}>
                                <span className={styles.languageName}>
                                    <span className="text-2xl" aria-hidden="true">{lang.flag}</span>
                                    {lang.name}
                                </span>
                                <span className={styles.level}>
                                    {lang.level}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className={`motion-reducible ${styles.card} ${styles.softSkills}`}
                    aria-labelledby="profile-soft-skills"
                >
                    <div className={styles.heading}>
                        <Brain size={24} aria-hidden="true" />
                        <h3 id="profile-soft-skills" className={styles.title}>Compétences humaines</h3>
                    </div>
                    <ul role="list" className={styles.softSkillList}>
                        {softSkills.map(skill => (
                            <li key={skill}>{skill}</li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </Section>
    );
}
