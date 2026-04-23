/**
 * Project-Related Types
 * Interfaces for projects, competencies, and validation proofs.
 */
import type { ProjectMetadata } from '@/lib/mdx';

export type Project = Pick<ProjectMetadata, 'slug' | 'title' | 'category' | 'date' | 'description' | 'ac_list' | 'image' | 'usedSkills' | 'filter' | 'context'>;

export interface AC {
    id: string; // e.g. "AC11"
    title: string;
    description: string;
    level3?: string;
}

export interface Competence {
    id: string; // e.g. "C1"
    title: string;
    description: string;
    acs: AC[];
}

export interface ProjectCardProps {
    project: Project;
    index?: number;
}

export interface ProjectListClientProps {
    projects: Project[];
}

import { BaseSectionProps } from './common';

export interface FeaturedProjectsProps extends BaseSectionProps {
    projects: Project[];
}

export interface HyperlinkProps {
    label: string;
    href: string;
}

export interface VideoPlayerProps {
    url: string;
}

export interface ACTooltipProps {
    acString: string;
    className?: string;
}
