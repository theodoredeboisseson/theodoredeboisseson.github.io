import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getProjectSlugs, getProjectBySlug } from '../../../lib/mdx';
import TechnicalCrosshair from '../../components/TechnicalCrosshair';
import { ArrowLeft, Terminal, Cpu, Eye } from 'lucide-react';

// Custom MDX Components
import ProjectGallery from '../../components/mdx/ProjectGallery';
import TechBadge from '../../components/mdx/TechBadge';
import CompetenceBlock from '../../components/mdx/CompetenceBlock';
import VideoPlayer from '../../components/mdx/VideoPlayer';

const components = {
    ProjectGallery,
    TechBadge,
    CompetenceBlock,
    VideoPlayer,
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

    return (
        <main className="min-h-screen bg-[#101010] text-[#F5F5F5]">
            {/* 1. CREATIVE UNIVERSE Section */}
            <section className="relative w-full h-[80vh] flex items-end p-8 md:p-16 overflow-hidden">
                {/* Back Button */}
                <Link href="/projects" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[#F5F5F5] hover:text-[#CC5500] transition-colors font-mono uppercase text-sm">
                    <ArrowLeft size={16} /> Back to Archive
                </Link>

                {/* Background Hero */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#CC5500]/20 animate-pulse" />
                    {/* Image Placeholder or Actual Image */}
                    {project.image ? (
                        <div className="absolute inset-0">
                            {/* Using standard img for full background for now or Next/Image if we want to optimize further given it's a bg */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover opacity-30 blur-sm"
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-neutral-900" />
                    )}

                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                        <span className="text-[20vw] font-black uppercase text-white truncate max-w-full text-center">
                            {project.category}
                        </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-transparent to-black/30" />
                </div>

                {/* Title Block */}
                <div className="relative z-10 max-w-4xl">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-[#CC5500] text-white font-mono text-sm uppercase">
                            {project.category}
                        </span>
                        <span className="font-mono text-[#888]">// {project.date}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-none mb-6">
                        {project.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl">
                        {project.description}
                    </p>
                </div>

                <TechnicalCrosshair className="top-12 right-12" />
            </section>

            {/* 2. UNDER THE HOOD Section */}
            <section className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 p-8 md:p-16">

                {/* Left Column: Creative Process / Context - MDX CONTENT */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="flex items-center gap-3 text-3xl font-bold uppercase mb-8 border-b border-[#333] pb-4">
                            <Eye className="text-[#CC5500]" /> Project Report
                        </h2>
                        {/* MDX Rendering */}
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 prose-headings:font-bold prose-headings:uppercase prose-a:text-[#CC5500] prose-img:rounded-sm">
                            <MDXRemote source={project.content} components={components} />
                        </div>
                    </div>
                </div>

                {/* Right Column: Technical "Terminal" */}
                <div className="lg:col-span-1">
                    <div className="sticky top-8 bg-[#0a0a0a] border border-[#333] p-6 rounded-sm shadow-neo font-mono text-sm">
                        <div className="flex items-center gap-2 mb-6 text-[#CC5500] border-b border-[#333] pb-4">
                            <Terminal size={18} />
                            <span className="uppercase tracking-widest font-bold">System_Log</span>
                        </div>

                        {/* Description Short */}
                        <div className="mb-8">
                            <span className="block text-[#666] mb-2">$ cat description.txt</span>
                            <p className="text-gray-300 leading-relaxed border-l-2 border-[#CC5500] pl-4">
                                {project.description}
                            </p>
                        </div>

                        {/* Stack */}
                        <div className="mb-8">
                            <span className="block text-[#666] mb-2">$ list dependencies</span>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map(skill => (
                                    <div key={skill} className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 border border-[#333] text-gray-300">
                                        <Cpu size={14} className="text-[#CC5500]" />
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Start Button / Link */}
                        {(project.links?.demo || project.links?.github) && (
                            <div className="mt-8 pt-6 border-t border-[#333] space-y-4">
                                {project.links.demo && (
                                    <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-[#CC5500] text-black font-bold uppercase text-center hover:bg-white transition-colors">
                                        Launch Demo
                                    </a>
                                )}
                                {project.links.github && (
                                    <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="block w-full py-3 border border-[#333] text-white font-bold uppercase text-center hover:bg-[#151515] transition-colors">
                                        View Source
                                    </a>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </main>
    );
}
