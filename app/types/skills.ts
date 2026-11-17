/**
 * Skills catalogue, practice domains, and shared badges.
 */
import { BaseSectionProps } from './common';

export interface Skill {
    name: string;
    category: string;
    icon: string;
    description: string;
    documentationUrl?: string;
}

export interface SkillsArsenalProps extends BaseSectionProps {
    projects: import('@/lib/mdx').ProjectData[];
    skills: Skill[];
}

export interface SkillDomain {
    id: string;
    title: string;
    description: string;
    context: string;
    skills: string[];
    projects: { slug: string; label: string }[];
}

export interface Badge {
    label: string;
    icon?: string;
}

export interface TechBadgeProps {
    skills?: string[];
    badges?: Badge[];
}

export interface DynamicIconProps {
    name: string;
    className?: string;
    size?: number;
    strokeWidth?: number;
    category?: string;
}
