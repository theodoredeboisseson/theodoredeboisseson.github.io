/**
 * Skills and Arsenal Types
 * Technical stack, stickers, and drawer interaction types.
 */
import { BaseSectionProps } from './common';

export interface Skill {
    name: string;
    category: string;
    icon: string;
    comfortLevel: number;
    description: string;
}

export interface SkillsArsenalProps extends BaseSectionProps {
    projects: import('@/lib/mdx').ProjectData[];
    skills: Skill[];
}

export interface SkillDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSkill: Skill | null;
    projects: import('@/lib/mdx').ProjectData[];
}

export interface SkillStickerProps {
    skill: Skill;
    hasLinkedData: boolean;
    onClick: () => void;
    index?: number;
    cols?: number;
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
