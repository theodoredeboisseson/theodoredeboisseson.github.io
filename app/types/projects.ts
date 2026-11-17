/**
 * Project-Related Types
 */
import type { ProjectMetadata } from '@/lib/mdx';
import { BaseSectionProps } from './common';

export type Project = Pick<ProjectMetadata, 'slug' | 'title' | 'category' | 'date' | 'description' | 'contribution' | 'status' | 'image' | 'imageAlt' | 'usedSkills' | 'filter' | 'context'>;

export interface ProjectCardProps {
    project: Project;
    index?: number;
}

export interface ProjectListClientProps {
    projects: Project[];
}

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
