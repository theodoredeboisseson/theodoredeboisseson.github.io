'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

import { ImageGalleryProps } from '@/app/types';

export default function ImageGallery({ images, alts, children }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    // Disable scroll when lightbox is open
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedImage]);

    // Enhanced parsing logic
    let finalImages: { src: string; alt: string }[] = [];

    const parseLine = (line: string) => {
        const [src, ...altParts] = line.split('|').map(s => s.trim());
        return { src, alt: altParts.join('|') || "" };
    };

    // Helper to extract text from React nodes (MDX can wrap lines in <p> tags)
    const extractText = (node: React.ReactNode): string => {
        if (!node) return '';
        if (typeof node === 'string') return node;
        if (typeof node === 'number') return String(node);
        if (Array.isArray(node)) return node.map(extractText).join('');

        // Handle React elements with children
        if (React.isValidElement(node)) {
            const props = node.props as { children?: React.ReactNode };
            return extractText(props.children);
        }
        return '';
    };

    if (children) {
        const textContent = extractText(children);

        if (textContent.trim()) {
            finalImages = textContent.split('\n')
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(parseLine);
        }
    }

    if (finalImages.length === 0 && images) {
        if (Array.isArray(images)) {
            finalImages = images.map((img) => {
                if (typeof img === 'string') {
                    return img.includes('|') ? parseLine(img) : { src: img, alt: '' };
                }
                return { src: img.src, alt: img.alt || '' };
            });
        } else {
            if (images.includes('|')) {
                // Support either newline or comma separated pairs
                finalImages = images.split(images.includes('\n') ? '\n' : ',')
                    .map(line => line.trim())
                    .filter(Boolean)
                    .map(parseLine);
            } else {
                // Classic comma-separated fallback
                const sources = images.split(',').map(s => s.trim());
                const altsList = typeof alts === 'string' ? alts.split(',').map(a => a.trim()) : [];
                finalImages = sources.map((src, idx) => ({
                    src,
                    alt: altsList[idx] || ""
                }));
            }
        }
    }

    if (finalImages.length === 0) {
        return (
            <div className="w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl my-8">
                <p className="font-mono text-xs text-red-500 whitespace-pre-wrap">
                    Gallery error: No images received.
                    Props: {JSON.stringify({ hasImages: !!images, hasChildren: !!children })}
                </p>
            </div>
        );
    }

    const normalizedImages = finalImages;

    return (
        <div className="w-full my-16 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                {normalizedImages.map((img, idx) => {
                    // First image spans 2 columns if total count is odd
                    const isBig = idx === 0 && normalizedImages.length % 2 !== 0;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className={`group relative flex flex-col gap-4 ${isBig ? 'md:col-span-2' : ''}`}
                        >
                            <div
                                className={`relative overflow-hidden rounded-sm bg-foreground/5 border-[0.5px] border-foreground/10 cursor-pointer ${isBig ? 'aspect-video' : 'aspect-4/3'}`}
                                onClick={() => setSelectedImage(img)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Caption Overlay (Bottom Left) */}
                                {img.alt && (
                                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20 bg-linear-to-t from-black/80 via-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity">
                                        <p className="text-xs md:text-sm font-bold text-white/90 leading-relaxed max-w-[85%] border-l border-primary/50 pl-2 mt-1">
                                            {img.alt}
                                        </p>
                                    </div>
                                )}

                                {/* Technical Corner Decorations */}
                                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
                                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />

                                {/* Corner Number */}
                                <div className="absolute top-4 right-4">
                                    <span className="font-mono text-sm text-white/60 bg-black/60 px-1.5 py-0.5 backdrop-blur-sm rounded-xs border border-white/10 select-none">
                                        N° {String(idx + 1).padStart(2, '0')}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="h-px w-full bg-foreground/5 mt-12" />

            {/* Lightbox Rendering */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-grab     "
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-110 cursor-pointer"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} strokeWidth={1.5} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
                        >
                            <div className="relative w-full h-full max-w-7xl max-h-[80vh]">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.alt}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Lightbox Caption */}
                            {selectedImage.alt && (
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="mt-8 max-w-2xl text-center"
                                >
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-smol font-mono uppercase tracking-[0.4em] text-primary">Content Identification</span>
                                        <div className="h-px w-12 bg-primary/30 mb-2" />
                                        <p className="text-white/80 text-lg md:text-xl font-medium tracking-tight">
                                            {selectedImage.alt}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
