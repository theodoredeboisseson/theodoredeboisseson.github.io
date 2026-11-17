import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectBySlug, getProjectSlugs } from '@/lib/mdx';
import skillsData from '@/data/skills.json';
import Image from 'next/image';
import ReturnButton from '@/app/components/ui/navigation/ReturnButton';
import KineticLine from '@/app/components/ui/display/KineticLine';
import { ArrowUpRight, Eye, Clock, Users } from 'lucide-react';

import ImageGallery from '@/app/components/mdx/ImageGallery';
import TechBadge from '@/app/components/ui/badges/TechBadge';
import VideoPlayer from '@/app/components/mdx/VideoPlayer';
import Hyperlink from '@/app/components/mdx/Hyperlink';
import Spacer from '@/app/components/mdx/Spacer';
import Separator from '@/app/components/mdx/Separator';
import ProjectFigure from '@/app/components/mdx/ProjectFigure';
import ProjectImageViewer from '@/app/components/mdx/ProjectImageViewer';
import ProjectImageLink from '@/app/components/mdx/ProjectImageLink';
import ProjectMarkdownImage from '@/app/components/mdx/ProjectMarkdownImage';
import ContextBadge from '@/app/components/ui/badges/ContextBadge';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);

    if (!project) return { title: 'Projet non trouvé' };

    return {
        title: project.title,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.image ? [project.image] : [],
        },
    };
}

const components = { ImageGallery, TechBadge, VideoPlayer, Hyperlink, Spacer, Separator, ProjectFigure, img: ProjectMarkdownImage };

export const dynamicParams = false;

export async function generateStaticParams() {
    return getProjectSlugs().map((slug) => ({ slug: slug.replace(/\.mdx$/, '') }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const project = getProjectBySlug(resolvedParams.slug);
    if (!project) notFound();

    const usedSkillsData = project.usedSkills?.map(name => skillsData.find(s => s.name === name)).filter(Boolean) || [];
    const projectBadges = [
        ...usedSkillsData.map(s => ({ label: s!.name, icon: s!.icon })),
        ...project.tags.map(tag => ({ label: tag }))
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            <ProjectImageViewer key={project.slug}>
                <section className="relative w-full pt-6 pb-12 md:pt-8 md:pb-12 fluid-padding">
                    <ReturnButton href="/projects" label="Index" className="mb-6 md:mb-12" projectSlug={project.slug} />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                        <div className="lg:col-span-4 order-2 lg:order-1">
                            {project.image ? (
                                <ProjectImageLink src={project.image} alt={project.imageAlt ?? project.title} className="relative w-full aspect-video lg:aspect-[4/3] overflow-hidden rounded-sm bg-black/5">
                                    <Image src={project.image} alt={project.imageAlt ?? `Aperçu du projet ${project.title}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-contain" />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/5 pointer-events-none" />
                                </ProjectImageLink>
                            ) : (
                                <div className="w-full aspect-square bg-neutral-100 rounded-sm border border-black/5" />
                            )}
                        </div>
                        <div className="lg:col-span-8 order-1 lg:order-2 flex flex-col items-start">
                            <div className="flex items-center gap-4 mb-6 text-label opacity-60">
                                <span className="text-primary">●</span>
                                {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                                <span>{project.category} // {project.date}</span>
                                <ContextBadge context={project.context} />
                            </div>
                            <h1 className="project-heading text-5xl md:text-7xl lg:text-8xl mb-8">{project.title}</h1>
                            <div className="max-w-2xl mb-8">
                                <p className="font-mono text-sm md:text-base leading-relaxed opacity-80 border-l-[0.5px] border-primary pl-6">{project.description}</p>
                            </div>
                            {project.contribution && <div className="mb-8 max-w-2xl">
                                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-foreground/70">Ma contribution</p>
                                <p className="text-base leading-relaxed text-foreground/85">{project.contribution}</p>
                            </div>}
                            <div className="w-full flex items-center justify-center gap-4 mb-4">
                                <div className="h-px bg-foreground/20 flex-1" />
                                <h2 className="text-sm font-bold tracking-widest uppercase mt-1">Spécifications techniques</h2>
                                <div className="h-px bg-foreground/20 flex-1" />
                            </div>
                            <div className="w-full max-w-5xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12 border-b border-foreground/20 pb-8 mt-4">
                                {(project.links?.demo || project.links?.github) && (
                                    <div className="flex flex-col items-center md:items-start gap-4 shrink-0 whitespace-nowrap">
                                        <span className="font-mono text-smol uppercase tracking-widest opacity-40">Liens</span>
                                        <div className="flex items-center gap-0">
                                            {project.links.demo && <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className={`btn-tactical rounded-bl-sm ${project.links.github ? 'border-r-0 rounded-r-none' : ''} group`}>Démo Live<ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></a>}
                                            {project.links.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className={`btn-tactical rounded-tr-sm ${project.links.demo ? 'bg-foreground/5 rounded-l-none' : ''} group`}>Code Source <Eye size={14} className="group-hover:scale-125 transition-transform" /></a>}
                                        </div>
                                    </div>
                                )}
                                {(project.duration || project.team_size) && (
                                    <div className="flex min-w-0 max-w-full flex-col items-center md:items-end gap-4">
                                        <span className="font-mono text-smol uppercase tracking-widest opacity-40">Envergure</span>
                                        <div className="flex max-w-full flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
                                            {project.duration && <div className="flex items-center gap-2 text-label opacity-70"><Clock size={14} className="text-primary" /><span>{project.duration}</span></div>}
                                            {project.team_size && <div className="flex items-center gap-2 text-label opacity-70"><Users size={14} className="text-primary" /><span>{project.team_size}</span></div>}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="w-full mt-12">
                                <div className="flex flex-col items-center gap-6">
                                    <span className="font-mono text-smol uppercase tracking-widest opacity-40">Technologies utilisées</span>
                                    <TechBadge badges={projectBadges} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="fluid-padding pb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-12 border-t-[0.5px] border-foreground/10 pt-4 h-[calc(100vh-6rem)] overflow-hidden">
                                <span className="text-label opacity-40">Rapport de projet</span>
                                <KineticLine />
                            </div>
                        </div>
                        <div className="lg:col-span-8 lg:col-start-5 pb-16">
                            <article className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-p:font-sans prose-p:text-foreground/80 prose-p:leading-relaxed prose-code:font-mono prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded-sm">
                                <MDXRemote source={project.content} components={components} />
                            </article>
                        </div>
                    </div>
                </section>
            </ProjectImageViewer>
        </main>
    );
}
