/**
 * Page Section Types
 * Props for major page segments (Hero, About, Experience, etc.)
 */
import {BaseSectionProps} from './common';
import {Skill} from './skills';
import React, {ReactNode} from "react";

export interface HeroProps extends BaseSectionProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    profileImage: string;
    isMobile?: boolean;
    availability?: string;
}

export interface Experience {
    period: string;
    title: string;
    company: string;
    location: string;
    type: string;
    status: 'completed' | 'upcoming' | 'current';
    description: string;
    skills?: string[];
    project_slug: string | null;
}

export interface ExperienceSectionProps extends BaseSectionProps {
    experiences: Experience[];
    skills: Skill[];
    projects: import('@/lib/mdx').ProjectData[];
}

export interface Education {
    year: string;
    degree: string;
    school: string;
    details: string;
    location: string;
    description: string;
    current: boolean;
}

export interface FormationSectionProps extends BaseSectionProps {
    education: Education[];
}

export interface ContactProps extends BaseSectionProps {
    contact: {
        email: string;
        mail_subject: string;
        mail_body: string;
    };
    socials: {
        github: string;
        linkedin: string;
    };
    cvUrl: string;
}

export interface AboutSectionProps extends BaseSectionProps {
    seeking: {
        title: string;
        description: string;
    };
    languages: {
        name: string;
        level: string;
        flag: string;
    }[];
    softSkills: string[];
    hobbies: {
        name: string;
        icon: string;
    }[];
}

export interface BackgroundSectionProps {
    src: string;
    alt: string;
    children?: React.ReactNode;
    className?: string;
    overlayOpacity?: string;
}

export interface SectionComponentProps extends BaseSectionProps {
    title: string;
    titlePosition?: 'left' | 'right';
    titleTag?: 'h1' | 'h2' | 'h3';
    aside?: ReactNode;
    children: ReactNode;
}