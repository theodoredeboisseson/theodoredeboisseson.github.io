'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView, PanInfo } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Play, Pause, ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectCard from '../ui/cards/ProjectCard';

import { FeaturedProjectsProps } from '../../types';

export default function FeaturedProjects({ id, projects }: FeaturedProjectsProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [windowWidth, setWindowWidth] = useState(0);
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { amount: 0.3 });

    useEffect(() => {
        const update = () => setWindowWidth(window.innerWidth);
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

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

    const handleDragEnd = (_: unknown, info: PanInfo) => {
        const swipe = info.offset.x;
        const velocity = info.velocity.x;

        if (swipe < -100 || velocity < -500) {
            nextProject();
            setIsPlaying(false);
        } else if (swipe > 100 || velocity > 500) {
            prevProject();
            setIsPlaying(false);
        }
    };

    return (
        <section id={id} ref={containerRef} className="relative w-full py-0 px-3 md:px-6 lg:px-12 bg-background overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end border-b-[0.5px] border-black/10 pb-6 container-7xl mx-auto">
                <h2 className="section-title ml-6">
                    Featured projects<span className="text-primary">.</span>
                </h2>
                <Link href="/projects" className="btn-tactical rounded-tr-none hover:translate-x-2 hover:font-bold text-sm hover:text-primary mt-4 md:mt-0">
                    Index
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative w-full h-75 sm:h-92.5 md:h-110 lg:h-110 flex items-center justify-center overflow-visible mt-4 md:mt-8">
                <div className="absolute w-full h-full flex items-center justify-center">
                    <AnimatePresence initial={false} mode='popLayout'>
                        {projects.map((project, index) => {
                            const length = projects.length;
                            let offset = (index - currentIndex + length) % length;
                            if (offset > length / 2) offset -= length;
                            if (offset < -length / 2) offset += length;

                            const isCenter = offset === 0;
                            const isVisible = Math.abs(offset) <= 1;

                            if (!isVisible) return null;

                            const zIndex = isCenter ? 20 : 10;
                            const scale = isCenter ? 1 : 0.72;
                            const opacity = isCenter ? 1 : 0.3;
                            const rotateY = offset * 10; // Subtle 3D rotation
                            // On large screens the card has a metadata column on the right (~33%),
                            // so a smaller offset keeps the side card from overlapping it.
                            const xOffset = offset * (windowWidth >= 1024 ? 42 : 55);

                            return (
                                <motion.div
                                    key={project.slug}
                                    className="absolute w-full px-4 md:px-0 md:w-[85%] lg:w-[75%] max-w-6xl touch-none"
                                    initial={false}
                                    animate={{
                                        x: `${xOffset}%`,
                                        scale: scale,
                                        opacity: opacity,
                                        zIndex: zIndex,
                                        rotateY: rotateY,
                                        filter: isCenter ? 'blur(0px)' : 'blur(10px)',
                                    }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 30,
                                        mass: 1
                                    }}
                                    drag={isCenter ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    onClick={() => !isCenter && handleSegmentClick(index)}
                                    style={{
                                        cursor: isCenter ? 'grab' : 'pointer',
                                        perspective: "1000px"
                                    }}
                                    whileTap={isCenter ? { cursor: 'grabbing' } : {}}
                                >
                                    <div className={`${isCenter ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                        <ProjectCard project={project} index={index} />
                                    </div>
                                    {!isCenter && (
                                        <div className="absolute inset-0 z-30" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full max-w-md mx-auto px-6 flex flex-col items-center gap-6 z-20 relative pb-6 md:pb-10">

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
                        className="button-icon"
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
                        className="button-icon"
                        aria-label="Next Project (Right Arrow)"
                    >
                        <ArrowRight size={16} />
                    </button>
                </div>

            </div>
        </section>
    );
}
