export interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_validation?: string[];
    image?: string;
    usedSkills?: string[];
    filter?: 'Tech' | 'Art';
}
