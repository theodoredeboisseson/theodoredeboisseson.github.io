import type { ProjectMetadata } from '@/lib/mdx';

export interface BaseSectionProps {
    id?: string;
    className?: string;
}

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

export interface HeroProps extends BaseSectionProps {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    profileImage: string;
    isMobile?: boolean;
    availability?: string;
}

export interface Skill {
    name: string;
    category: string;
    icon: string;
    comfortLevel: number;
    description: string;
}

export interface SkillsArsenalProps extends BaseSectionProps {
    projects: import('../lib/mdx').ProjectData[];
    skills: Skill[];
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

export interface Experience {
    period: string;
    title: string;
    company: string;
    location: string;
    type: string;
    status: 'completed' | 'upcoming';
    description: string;
    skills?: string[];
    project_slug: string | null;
}

export interface ExperienceSectionProps extends BaseSectionProps {
    experiences: Experience[];
    skills: Skill[];
    projects: import('../lib/mdx').ProjectData[];
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

export interface FeaturedProjectsProps extends BaseSectionProps {
    projects: Project[]; // Project is already exported in this file, so we can use it directly or via 'Project[]'
}

export interface SkillDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    selectedSkill: Skill | null;
    projects: import('../lib/mdx').ProjectData[];
}

export interface SkillStickerProps {
    skill: Skill;
    hasLinkedData: boolean;
    onClick: () => void;
    index?: number;
    cols?: number;
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
    hobbies: string[];
}

export interface ImageGalleryProps {
    images?: string | (string | { src: string; alt?: string })[];
    alts?: string;
    children?: React.ReactNode;
}

export interface ProjectCardProps {
    project: Project;
    index?: number;
}

export interface ReturnButtonProps {
    href?: string;
    label?: string;
    className?: string;
    projectSlug?: string;
}

export interface SectionIconProps {
    onClick: () => void;
    section: {
        id: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<import('lucide-react').LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    active: boolean;
    isMobile?: boolean;
}

export interface Badge {
    label: string;
    icon?: string;
}

export interface TechBadgeProps {
    skills?: string[];
    badges?: Badge[];
}

export interface TechnicalFrameProps {
    className?: string;
    showMetadata?: boolean;
}

export interface ACTooltipProps {
    acString: string;
    className?: string;
}

export interface AnimatedTextProps {
    text: string;
    className?: string;
    delayOffset?: number;
    staggerDelay?: number;
    duration?: number;
    showDot?: boolean;
}

export type ContextType = 'Scolaire' | 'Perso' | 'Professionnel';

export interface ContextBadgeProps {
    context?: ContextType;
}

export interface DynamicIconProps {
    name: string;
    className?: string;
    size?: number;
    strokeWidth?: number;
    category?: string;
}

export interface ProjectListClientProps {
    projects: Project[];
}

export interface BackgroundSectionProps {
    src: string;
    alt: string;
    children?: React.ReactNode;
    className?: string;
    overlayOpacity?: string;
}

export interface HyperlinkProps {
    label: string;
    href: string;
}

export interface SpacerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}

export interface VideoPlayerProps {
    url: string;
}

