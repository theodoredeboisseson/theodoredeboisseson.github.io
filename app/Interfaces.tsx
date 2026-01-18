export interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_list?: string[];
    image?: string;
    usedSkills?: string[];
    filter?: 'Tech' | 'Art';
}

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

export interface HeroProps {
    issueText: string;
    title: string;
    subtitle: string;
    description: string;
    profileImage: string;
    isMobile?: boolean;
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    icon: string;
    comfortLevel: number;
    description: string;
}

export interface SkillsBentoProps {
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

export interface FormationSectionProps {
    education: Education[];
}

export interface ContactProps {
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

export interface FeaturedProjectsProps {
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
}
