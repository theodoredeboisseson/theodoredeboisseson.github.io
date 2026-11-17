/**
 * Page Section Types
 * Props for major page segments (Hero, About, Experience, etc.)
 */
import type { BaseSectionProps } from './common';
import type { Skill } from './skills';
import React, { ReactNode } from "react";
import type { ProjectData } from '@/lib/mdx';

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
    start_date: string;
    end_date: string;
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
    education: Education[];
    skills: Skill[];
    projects: ProjectData[];
}

export interface Education {
    start_date: string;
    end_date: string;
    year: string;
    degree: string;
    school: string;
    details: string;
    location: string;
    description: string;
    current: boolean;
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