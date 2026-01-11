import { getAllProjects } from '../../lib/mdx';
import ProjectGalleryClient from '../components/ProjectGalleryClient';

export const metadata = {
    title: 'Projects | Théodore',
    description: 'Archive of digital experiments and technical projects.',
};

export default function ProjectsGalleryPage() {
    const rawProjects = getAllProjects();

    // Transform MDX data to match ProjectCard interface
    const projects = rawProjects.map(p => ({
        slug: p.slug,
        title: p.title,
        category: p.category,
        date: p.date,
        under_the_hood: p.description, // Mapping description from frontmatter for the card summary
        ac_validation: p.ac_list,
        image: p.image
    }));

    return (
        <main className="min-h-screen bg-background py-12 px-6 md:px-12 lg:px-24">
            <ProjectGalleryClient projects={projects} />
        </main>
    );
}
