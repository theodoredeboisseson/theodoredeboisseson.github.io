import { getAllProjects, getProjectSummary } from '@/lib/mdx';
import ProjectListClient from '@/app/components/sections/ProjectListClient';
import { Project } from '@/app/types';

export const metadata = {
    title: 'Projets | Théodore',
    description: 'Archives des expérimentations numériques et projets techniques.',
};

import ReturnButton from '@/app/components/ui/navigation/ReturnButton';

export default function ProjectsGalleryPage() {
    const rawProjects = getAllProjects();

    // Transform MDX data to match ProjectCard interface
    const projects: Project[] = rawProjects.map(getProjectSummary);

    return (
        <main className="min-h-screen relative bg-background py-12 px-6 md:px-12 lg:px-24">
            <ReturnButton href="/#projects" label="Accueil" className="mb-12" />
            <ProjectListClient projects={projects} />
        </main>
    );
}
