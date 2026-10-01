import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/projects');

export interface ProjectMetadata {
    slug: string;
    title: string;
    date: string;
    category: string;
    tags: string[];
    links?: {
        github?: string;
        demo?: string;
    };
    description: string;
    image?: string;
    duration?: string;
    team_size?: string;
    featured?: boolean;
    usedSkills?: string[];
    filter?: string[];
    context?: 'Scolaire' | 'Perso' | 'Professionnel';
}

export interface ProjectData extends ProjectMetadata {
    content: string;
}

const projectOrder = [
    'stage-mjc',
    'jifoosball',
    'pokecritics',
    'portfolio-redesign',
    'jicursum',
    'nuit-de-l-info',
    'concours-robotique',
];
const projectRank = new Map(projectOrder.map((slug, index) => [slug, index]));

export function getProjectSlugs() {
    if (!fs.existsSync(contentDirectory)) return [];
    return fs.readdirSync(contentDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getProjectBySlug(slug: string): ProjectData | null {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = content.replace(/\n\n\n+/g, '\n\n<Spacer size="sm" />\n\n');

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        links: data.links,
        description: data.description,
        image: data.image,
        duration: data.duration,
        team_size: data.team_size,
        featured: data.featured || false,
        usedSkills: data.usedSkills || [],
        filter: data.filter ? (Array.isArray(data.filter) ? data.filter : [data.filter]) : ['Tech'],
        context: data.context || 'Perso',
        content: processedContent,
    };
}

export function getAllProjects(): ProjectData[] {
    return getProjectSlugs()
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is ProjectData => project !== null)
        .sort((project1, project2) => {
            const rank1 = projectRank.get(project1.slug);
            const rank2 = projectRank.get(project2.slug);
            if (rank1 !== undefined || rank2 !== undefined) {
                if (rank1 === undefined) return 1;
                if (rank2 === undefined) return -1;
                return rank1 - rank2;
            }
            return project1.date > project2.date ? -1 : project1.date < project2.date ? 1 : 0;
        });
}

export function getProjectSummary(p: ProjectData) {
    return {
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        description: p.description,
        image: p.image,
        usedSkills: p.usedSkills,
        filter: p.filter,
        context: p.context
    };
}
