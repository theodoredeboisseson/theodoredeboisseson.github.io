import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectSlugs, getProjectBySlug } from '../../../lib/mdx';
import skillsData from '../../../data/skills.json';
import TechnicalCrosshair from '../../components/ui/TechnicalCrosshair';
import ReturnButton from '../../components/ui/ReturnButton';
import { ArrowUpRight, Eye } from 'lucide-react';

// Custom MDX Components
import ProjectGallery from '../../components/mdx/ProjectGallery';
import TechBadge from '../../components/ui/TechBadge';
import CompetenceBlock from '../../components/mdx/CompetenceBlock';
import VideoPlayer from '../../components/mdx/VideoPlayer';
import Hyperlink from '../../components/mdx/Hyperlink';
import Spacer from '../../components/mdx/Spacer';

const components = {
    ProjectGallery,
    TechBadge,
    CompetenceBlock,
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

    console.log('[generateStaticParams] Generated params:', params);
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
                <ReturnButton href="/projects" label="Gallery" className="absolute top-8 left-6 md:left-12 lg:left-24" />
                <TechnicalCrosshair className="top-8 right-6 md:right-12 lg:right-24" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
                    {/* Title & Info */}
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-6 font-mono text-xs uppercase tracking-widest opacity-60">
                            <span className="text-primary">●</span>
                            <span>{project.category}</span>
                            <span>//</span>
                            <span>{project.date}</span>
                        </div>

                        <h1 className="font-serif italic text-6xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.9] mb-8">
                            {project.title}
                        </h1>

                        <div className="max-w-2xl">
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 border-l-[0.5px] border-primary pl-6">
                                {project.description}
                            </p>
                        </div>
                    </div>

                    {/* Meta Sidebar (Mobile: bottom, Desktop: right) */}
                    <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end space-y-8 font-mono text-xs uppercase tracking-widest">
                        {/* Stack */}
                        <div className="flex flex-col items-start lg:items-end gap-2">
                            <span className="opacity-40">Skills / Technologies</span>
                            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
                                <TechBadge badges={projectBadges} />
                            </div>
                        </div>

                        {/* Links */}
                        {(project.links?.demo || project.links?.github) && (
                            <div className="flex gap-4">
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
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {project.image && (
                <div className="w-full px-6 md:px-12 lg:px-24 mb-24 flex justify-center">
                    <div className="relative w-full max-w-6xl aspect-[16/9] overflow-hidden rounded-tr-[5rem] rounded-sm bg-black/5">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover opacity-90"
                        />
                        {/* Overlay Texture/Gradient if needed */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                    </div>
                </div>
            )}

            {/* Content Area */}
            <section className="px-6 md:px-12 lg:px-24 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Table of Contents or Meta could go here in col-span-3 */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-12 border-t-[0.5px] border-foreground/10 pt-4">
                            <span className="font-mono text-xs uppercase tracking-widest opacity-40">Project Report</span>
                        </div>
                    </div>

                    {/* MDX Content */}
                    <div className="lg:col-span-8 lg:col-start-5">
                        <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-p:font-sans prose-p:text-foreground/80 prose-p:leading-relaxed prose-code:font-mono prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded-sm">
                            <MDXRemote source={project.content} components={components} />
                        </article>
                    </div>
                </div>
            </section>
        </main>
    );
}
