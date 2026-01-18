import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectSlugs, getProjectBySlug } from '../../../lib/mdx';
import skillsData from '../../../data/skills.json';
import TechnicalCrosshair from '../../components/ui/TechnicalCrosshair';
import ReturnButton from '../../components/ui/ReturnButton';
import ProjectWave from '../../components/ui/MovementLine';
import { ArrowUpRight, Eye } from 'lucide-react';
import ACTooltip from '../../components/ui/ACTooltip';

// Custom MDX Components
import ProjectGallery from '../../components/mdx/ProjectGallery';
import TechBadge from '../../components/ui/TechBadge';
import VideoPlayer from '../../components/mdx/VideoPlayer';
import Hyperlink from '../../components/mdx/Hyperlink';
import Spacer from '../../components/mdx/Spacer';

const components = {
    ProjectGallery,
    TechBadge,
    VideoPlayer,
    Hyperlink,
    Spacer,
};

export const dynamicParams = false;

// Generate static params for all projects
export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    const params = slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));

    return params;
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Map used skills to full skill objects
    const usedSkillsData = project.usedSkills?.map(id => skillsData.find(s => s.id === id)).filter(Boolean) || [];

    // Create unified badges list
    const projectBadges = [
        ...usedSkillsData.map(s => ({ label: s!.name, icon: s!.icon })),
        ...project.tags.map(tag => ({ label: tag }))
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Header / Hero Section */}
            <section className="relative w-full pt-32 pb-12 px-6 md:px-12 lg:px-24">
                <ReturnButton href="/projects" label="Gallery" className="mb-6 md:mb-12" />
                <TechnicalCrosshair className="top-8 right-6 md:right-12 lg:right-24" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left: Featured Image (Smaller & Moved) */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        {project.image ? (
                            <div className="relative w-full aspect-video lg:aspect-square overflow-hidden rounded-sm bg-black/5">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-90"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                            </div>
                        ) : (
                            <div className="w-full aspect-square bg-neutral-100 rounded-sm border border-black/5" />
                        )}

                        {/* Meta Sidebar (Mobile: bottom, Desktop: below image logic?) 
                            Actually user said: "Reduis donc la taille de l'image et décale la sur la gauche, sur sa droite je veux dans l'ordre : Live demo, source code, puis la liste des AC comme pour le project card."
                        */}
                    </div>

                    {/* Right: Title & Info & AC & Links */}
                    <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-start">
                        <div className="flex items-center gap-4 mb-6 font-mono text-xs uppercase tracking-widest opacity-60">
                            <span className="text-primary">●</span>
                            <span>{project.category}</span>
                            <span>//</span>
                            <span>{project.date}</span>
                        </div>

                        <h1 className="font-serif italic text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] mb-8">
                            {project.title}
                        </h1>

                        <div className="max-w-2xl mb-8">
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 border-l-[0.5px] border-primary pl-6">
                                {project.description}
                            </p>
                        </div>

                        {/* Links, Source, ACs Row */}
                        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 border-t border-black/10 pt-6">

                            {/* Links */}
                            {(project.links?.demo || project.links?.github) && (
                                <div className="flex gap-6 font-mono text-xs uppercase tracking-widest">
                                    {project.links.demo && (
                                        <a
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 hover:text-primary transition-colors hover:underline decoration-primary underline-offset-4"
                                        >
                                            Live Demo <ArrowUpRight size={14} />
                                        </a>
                                    )}
                                    {project.links.github && (
                                        <a
                                            href={project.links.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                                        >
                                            Source Code <Eye size={14} />
                                        </a>
                                    )}
                                </div>
                            )}

                            {/* Separator */}
                            <div className="hidden md:block w-px h-8 bg-black/10" />

                            {/* AC List */}
                            {project.ac_list && project.ac_list.length > 0 && (
                                <div className="flex flex-col items-start">
                                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-40 mb-1">
                                        Compétences Validées
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {project.ac_list.map((ac: string) => (
                                            <ACTooltip key={ac} acString={ac} />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Tech Badges Row (Keep it somewhere?) User didn't specify where tech badges go, but likely keep them or similar. 
                             The previous design had them in sidebar. Let's add them below the Links row using a Spacer.
                         */}
                        <div className="mt-8">
                            <TechBadge badges={projectBadges} />
                        </div>

                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="px-6 md:px-12 lg:px-24 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Table of Contents or Meta could go here in col-span-3 */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-12 border-t-[0.5px] border-foreground/10 pt-4 h-[calc(100vh-6rem)] overflow-hidden">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Project Report</span>
                            <ProjectWave />
                        </div>
                    </div>

                    {/* MDX Content */}
                    <div className="lg:col-span-8 lg:col-start-5 pb-16">
                        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-p:font-sans prose-p:text-foreground/80 prose-p:leading-relaxed prose-code:font-mono prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded-sm">
                            <MDXRemote source={project.content} components={components} />
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
