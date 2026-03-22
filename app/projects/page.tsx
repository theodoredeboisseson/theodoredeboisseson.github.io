import { getAllProjects, getProjectSummary } from '../../lib/mdx';
import ProjectGalleryClient from '../components/sections/ProjectGalleryClient';
import { Project } from '../Interfaces';

export const metadata = {
    title: 'Projects | Théodore',
    description: 'Archive of digital experiments and technical projects.',
};

export default function ProjectsGalleryPage() {
    const rawProjects = getAllProjects();

    // Transform MDX data to match ProjectCard interface
    const projects: Project[] = rawProjects.map(getProjectSummary);

    return (
        <main className="min-h-screen bg-background py-12 px-6 md:px-12 lg:px-24">
            <ProjectGalleryClient projects={projects} />
        </main>
    );
}
