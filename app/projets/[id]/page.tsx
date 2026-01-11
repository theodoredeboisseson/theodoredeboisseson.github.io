import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Kept for future use
import projectsData from '../../../data/projects.json';
import skillsData from '../../../data/skills.json';
import TechnicalCrosshair from '../../components/TechnicalCrosshair';
import { ArrowLeft, Terminal, Cpu, Eye } from 'lucide-react';

// Generate static params for all projects
export async function generateStaticParams() {
    return projectsData.map((project) => ({
        id: project.id,
    }));
}

export default async function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const project = projectsData.find((p) => p.id === resolvedParams.id);

    if (!project) {
        notFound();
    }

    // Hydrate used skills
    const usedSkills = project.usedSkills.map(id => skillsData.find(s => s.id === id)).filter(Boolean);

    return (
        <main className="min-h-screen bg-[#101010] text-[#F5F5F5]">
            {/* 1. CREATIVE UNIVERSE Section */}
            <section className="relative w-full h-[80vh] flex items-end p-8 md:p-16 overflow-hidden">
                {/* Back Button */}
                <Link href="/projets" className="absolute top-8 left-8 z-50 flex items-center gap-2 text-[#F5F5F5] hover:text-[#CC5500] transition-colors font-mono uppercase text-sm">
                    <ArrowLeft size={16} /> Back to Archive
                </Link>

                {/* Background Hero */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[#CC5500]/20 animate-pulse" />
                    {/* Image Placeholder */}
                    <div className="absolute inset-0 bg-neutral-900">
                        <div className="w-full h-full flex items-center justify-center opacity-10 text-[20vw] font-black uppercase">
                            {project.category}
                        </div>
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
                        A visual exploration of digital frontiers. (Descriptive subtitle placeholder)
                    </p>
                </div>

                <TechnicalCrosshair className="top-12 right-12" />
            </section>

            {/* 2. UNDER THE HOOD Section */}
            <section className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 p-8 md:p-16">

                {/* Left Column: Creative Process / Context */}
                <div className="lg:col-span-2 space-y-12">
                    <div>
                        <h2 className="flex items-center gap-3 text-3xl font-bold uppercase mb-8 border-b border-[#333] pb-4">
                            <Eye className="text-[#CC5500]" /> Creative Process
                        </h2>
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                            <p>
                                Here we describe the artistic vision, the "Creative Universe".
                                This section focuses on the aesthetics, the user experience, and the design philosophy.
                                Large imagery would go here.
                            </p>
                            <div className="aspect-video w-full bg-[#151515] border border-[#333] flex items-center justify-center text-gray-700">
                                [Moodboard / Process Image]
                            </div>
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

                        {/* Technical Description */}
                        <div className="mb-8">
                            <span className="block text-[#666] mb-2">$ cat under_the_hood.txt</span>
                            <p className="text-gray-300 leading-relaxed border-l-2 border-[#CC5500] pl-4">
                                {project.under_the_hood}
                            </p>
                        </div>

                        {/* Stack */}
                        <div className="mb-8">
                            <span className="block text-[#666] mb-2">$ list dependencies</span>
                            <div className="flex flex-wrap gap-2">
                                {usedSkills.map(skill => (
                                    <div key={skill?.id} className="flex items-center gap-2 bg-[#151515] px-3 py-1.5 border border-[#333] text-gray-300">
                                        <Cpu size={14} className="text-[#CC5500]" />
                                        {skill?.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* AC Validation */}
                        <div>
                            <span className="block text-[#666] mb-2">$ verify ac_validation --status</span>
                            <div className="space-y-2">
                                {project.ac_validation?.map(ac => (
                                    <div key={ac} className="flex justify-between items-center text-[#00ff9d]">
                                        <span>[✓] {ac}</span>
                                        <span className="text-[#444] text-[10px]">VERIFIED</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
