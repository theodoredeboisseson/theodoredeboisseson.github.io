'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Crosshair, Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';

interface Project {
    slug: string;
    title: string;
    category: string;
    date: string;
    under_the_hood: string;
    ac_validation?: string[];
    image?: string;
}

interface FeaturedProjectsProps {
    projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });

    const nextProject = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, [projects.length]);

    const prevProject = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }, [projects.length]);

    const handleManualNext = () => {
        nextProject();
        setIsPlaying(false);
    };

    const handleManualPrev = () => {
        prevProject();
        setIsPlaying(false);
    };

    // Keyboard navigation
    useEffect(() => {
        if (!isInView) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                prevProject();
                setIsPlaying(false);
            } else if (e.key === 'ArrowRight') {
                nextProject();
                setIsPlaying(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isInView, nextProject, prevProject]);

    // Auto-play effect
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(nextProject, 10 * 1000);
        return () => clearInterval(interval);
    }, [isPlaying, nextProject]);

    const handleSegmentClick = (index: number) => {
        setCurrentIndex(index);
        setIsPlaying(false); // Pause on interaction
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    return (
        <section ref={containerRef} className="relative w-full py-0 px-3 md:px-6 lg:px-12 bg-background overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b-[0.5px] border-black/10 pb-6 w-full max-w-7xl mx-auto">
                <h2 className="section-title">
                    Featured projects<span className="text-primary">.</span>
                </h2>
                <Link href="/projects" className="group flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors mt-4 md:mt-0">
                    Index
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
                <div className="absolute w-full h-full flex items-center justify-center overflow-visible">
                    <AnimatePresence initial={false} mode='popLayout'>
                        {projects.map((project, index) => {
                            const length = projects.length;
                            // Calculate discrete circular distance
                            // result in range [-length/2, length/2]
                            let offset = (index - currentIndex + length) % length;
                            if (offset > length / 2) offset -= length;

                            const isCenter = offset === 0;
                            const zIndex = isCenter ? 10 : 10 - Math.abs(offset);

                            // Visual properties
                            const scale = isCenter ? 1 : 0.9;
                            const opacity = isCenter ? 1 : 0.5;
                            // x distance: 100% or more to separate them. 

                            const xOffset = offset * 65; // % of parent width if we use % units in animate? 
                            return (
                                <motion.div
                                    key={project.slug}
                                    className="absolute w-[calc(100%-4rem)] md:w-[calc(100%-8rem)] lg:w-[calc(100%-12rem)] max-w-7xl"
                                    initial={false}
                                    animate={{
                                        x: `calc(${offset} * (100% + 2rem))`,
                                        scale: scale,
                                        opacity: opacity,
                                        zIndex: zIndex
                                    }}
                                    transition={{ duration: 0.8, ease: [0.25, 0.75, 0, 1] }}
                                    onClick={() => handleSegmentClick(index)}
                                    style={{ cursor: isCenter ? 'default' : 'pointer' }}
                                >
                                    {/* Wrapper to handle pointer events locally if needed */}
                                    <div className={isCenter ? 'pointer-events-auto' : 'pointer-events-none'}>
                                        <ProjectCard project={project} index={index} />
                                    </div>
                                    {/* Overlay for inactive items to catch clicks? The parent div has onClick already. */}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-md mx-auto px-6 flex flex-col items-center gap-2 z-20 relative -mt-12">

                {/* Segments */}
                <div className="flex gap-2 w-full h-8 items-center">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleSegmentClick(idx)}
                            className="flex-1 h-full flex items-center group cursor-pointer outline-none"
                            aria-label={`Go to project ${idx + 1}`}
                        >
                            <div className="relative w-full h-1 rounded-full overflow-hidden bg-foreground/20 group-hover:bg-foreground/40 transition-colors duration-300">
                                {idx === currentIndex && (
                                    <div
                                        className="absolute top-0 left-0 h-full bg-primary w-full origin-left"
                                        style={{
                                            animation: 'progress 6s linear forwards',
                                            animationPlayState: isPlaying ? 'running' : 'paused'
                                        }}
                                    />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Main Controls Row */}
                <div className="flex items-center gap-4">
                    {/* Left Key */}
                    <button
                        onClick={handleManualPrev}
                        className="size-10 flex items-center justify-center border border-foreground/10 hover:border-foreground/30 border-b-[3px] rounded-lg active:border-b active:translate-y-[2px] hover:bg-foreground/5 transition-all text-foreground/60 hover:text-foreground outline-none"
                        aria-label="Previous Project (Left Arrow)"
                    >
                        <ArrowLeft size={16} />
                    </button>

                    {/* Play/Pause */}
                    <button
                        onClick={togglePlay}
                        className="p-3 rounded-full hover:bg-foreground/5 border border-foreground/10 hover:border-foreground/30 border-b-[3px] text-foreground/60 hover:text-foreground transition-all duration-300 outline-none"
                        aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
                    >
                        {isPlaying ? <Pause size={20} fill="currentColor" className="opacity-50" /> : <Play size={20} fill="currentColor" className="opacity-50" />}
                    </button>

                    {/* Right Key */}
                    <button
                        onClick={handleManualNext}
                        className="size-10 flex items-center justify-center border border-foreground/10 hover:border-foreground/30 border-b-[3px] rounded-lg active:border-b active:translate-y-[2px] hover:bg-foreground/5 transition-all text-foreground/60 hover:text-foreground outline-none"
                        aria-label="Next Project (Right Arrow)"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>

            </div>
        </section>
    );
}
