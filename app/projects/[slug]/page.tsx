import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import skillsData from '@/data/skills.json';
import Image from 'next/image';
import ReturnButton from '@/app/components/ui/navigation/ReturnButton';
import KineticLine from '@/app/components/ui/display/KineticLine';
import { ArrowUpRight, Eye, Clock, Users } from 'lucide-react';
import CompetenceTooltip from '@/app/components/ui/badges/CompetenceTooltip';

import ImageGallery from '@/app/components/mdx/ImageGallery';
import TechBadge from '@/app/components/ui/badges/TechBadge';
import VideoPlayer from '@/app/components/mdx/VideoPlayer';
import Hyperlink from '@/app/components/mdx/Hyperlink';
import Spacer from '@/app/components/mdx/Spacer';
import ContextBadge from '@/app/components/ui/badges/ContextBadge';

const components = {
    ImageGallery,
    TechBadge,
    VideoPlayer,
    Hyperlink,
    Spacer,
};

export const dynamicParams = false;

// Generate static params for all projects
export async function generateStaticParams() {
    const slugs = getProjectSlugs();
    return slugs.map((slug) => ({
        slug: slug.replace(/\.mdx$/, ''),
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) {
        notFound();
    }

    // Map used skills to full skill objects
    const usedSkillsData = project.usedSkills?.map(name => skillsData.find(s => s.name === name)).filter(Boolean) || [];

    // Create unified badges list
    const projectBadges = [
        ...usedSkillsData.map(s => ({ label: s!.name, icon: s!.icon })),
        ...project.tags.map(tag => ({ label: tag }))
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* Header / Hero Section */}
            <section className="relative w-full pt-6 pb-12 md:pt-8 md:pb-12 fluid-padding">
                <ReturnButton href="/projects" label="Index" className="mb-6 md:mb-12" projectSlug={project.slug} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Featured Image (Smaller & Moved) */}
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        {project.image ? (
                            <div className="relative w-full aspect-video lg:aspect-square overflow-hidden rounded-sm bg-black/5">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-90"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                            </div>
                        ) : (
                            <div className="w-full aspect-square bg-neutral-100 rounded-sm border border-black/5" />
                        )}
                    </div>

                    {/* Title & Info & AC & Links */}
                    <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-start">
                        <div className="flex items-center gap-4 mb-6 text-label opacity-60">
                            <span className="text-primary">●</span>
                            {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                            <span>{project.category} // {project.date}</span>
                            <ContextBadge context={project.context} />
                        </div>

                        <h1 className="project-heading text-5xl md:text-7xl lg:text-8xl mb-8">
                            {project.title}
                        </h1>

                        <div className="max-w-2xl mb-8">
                            <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 border-l-[0.5px] border-primary pl-6">
                                {project.description}
                            </p>
                        </div>

                        {/* Specifications Header */}
                        <div className="w-full flex items-center justify-center gap-4 mb-4">
                            <div className="h-px bg-foreground/20 flex-1" />
                            <h3 className="text-sm font-bold tracking-widest uppercase mt-1">Technical Specifications</h3>
                            <div className="h-px bg-foreground/20 flex-1" />
                        </div>

                        {/* Centered Meta Info Section */}
                        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-12 border-b border-foreground/20 pb-8 mt-4">

                            {/* Project Links Group */}
                            {(project.links?.demo || project.links?.github) && (
                                <div className="flex flex-col items-center md:items-start gap-4 shrink-0 whitespace-nowrap">
                                    <span className="font-mono text-smol uppercase tracking-widest opacity-40">ACCESS</span>
                                    <div className="flex items-center gap-0">
                                        {project.links.demo && (
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`btn-tactical rounded-bl-sm ${project.links.github ? 'border-r-0 rounded-r-none' : ''} group`}
                                            >
                                                Démo Live<ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`btn-tactical rounded-tr-sm ${project.links.demo ? 'bg-foreground/5 rounded-l-none' : ''} group`}
                                            >
                                                Code Source <Eye size={14} className="group-hover:scale-125 transition-transform" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Combined Validation Group (AC & CE) */}
                            {(project.ac_list?.length > 0 || project.ce_list?.length > 0) && (
                                <div className="flex flex-col items-center md:items-center gap-4 shrink-0">
                                    <span className="font-mono text-smol uppercase tracking-widest opacity-40">Validation</span>
                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        {project.ac_list?.map((ac: string) => (
                                            <CompetenceTooltip className='text-md p-2' key={ac} id={ac} />
                                        ))}
                                        {project.ce_list?.map((ce: string) => (
                                            <CompetenceTooltip className='text-md p-2' key={ce} id={ce} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Meta Info Group */}
                            {(project.duration || project.team_size) && (
                                <div className="flex flex-col items-center md:items-end gap-4 shrink-0 whitespace-nowrap">
                                    <span className="font-mono text-smol uppercase tracking-widest opacity-40">Constraints</span>
                                    <div className="flex gap-6 items-center">
                                        {project.duration && (
                                            <div className="flex items-center gap-2 text-label opacity-70">
                                                <Clock size={14} className="text-primary" />
                                                <span>{project.duration}</span>
                                            </div>
                                        )}
                                        {project.team_size && (
                                            <div className="flex items-center gap-2 text-label opacity-70">
                                                <Users size={14} className="text-primary" />
                                                <span>{project.team_size}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Tech Stack Row - Premium Presentation */}
                        <div className="w-full mt-12">
                            <div className="flex flex-col items-center gap-6">
                                <span className="font-mono text-smol uppercase tracking-widest opacity-40">Tech Stack // Built With</span>
                                <TechBadge badges={projectBadges} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="fluid-padding pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sticky Table of Contents or Meta could go here in col-span-3 */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-12 border-t-[0.5px] border-foreground/10 pt-4 h-[calc(100vh-6rem)] overflow-hidden">
                            <span className="text-label opacity-40">Project Report</span>
                            <KineticLine />
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
