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
    ac_list: string[];
    links?: {
        github?: string;
        demo?: string;
    };
    description: string;
    image?: string;
    featured?: boolean;
}

export interface ProjectData extends ProjectMetadata {
    content: string;
}

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

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        category: data.category,
        tags: data.tags || [],
        ac_list: data.ac_list || [],
        links: data.links,
        description: data.description,
        image: data.image,
        featured: data.featured || false,
        content,
    };
}

export function getAllProjects(): ProjectData[] {
    const slugs = getProjectSlugs();
    const projects = slugs
        .map((slug) => getProjectBySlug(slug))
        .filter((project): project is ProjectData => project !== null)
        .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
    return projects;
}
