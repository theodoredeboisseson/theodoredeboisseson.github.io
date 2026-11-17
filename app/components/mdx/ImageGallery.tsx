import Image from 'next/image';
import React from 'react';
import type { ImageGalleryProps } from '@/app/types';
import ProjectImageLink from './ProjectImageLink';
import ImageGalleryItem from './ImageGalleryItem';

export default function ImageGallery({ images, alts, children }: ImageGalleryProps) {
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


    if (finalImages.length === 0) return <p className="my-8 text-foreground/70">Galerie indisponible : aucune image reçue.</p>;

    return (
        <div className="w-full my-16 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                {finalImages.map((img, index) => {
                    const isBig = index === 0 && finalImages.length % 2 !== 0;
                    return (
                        <ImageGalleryItem key={img.src + index} index={index} isBig={isBig}>
                            <ProjectImageLink
                                src={img.src}
                                alt={img.alt}
                                caption={img.alt}
                                className={'relative overflow-hidden rounded-sm bg-foreground/5 border-[0.5px] border-foreground/10 ' + (isBig ? 'aspect-video' : 'aspect-4/3')}
                            >
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                {img.alt && (
                                    <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20 bg-linear-to-t from-black/60 via-black/10 to-transparent pointer-events-none">
                                        <p className="text-xs md:text-sm bg-black/30 rounded-r backdrop-blur-xs font-bold text-white/90 leading-relaxed border-l-2 border-primary/50 px-2 mt-1 w-fit max-w-[85%]">
                                            {img.alt}
                                        </p>
                                    </div>
                                )}
                                <div aria-hidden="true" className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
                                <div aria-hidden="true" className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />
                                <span aria-hidden="true" className="absolute top-4 right-4 font-mono text-sm text-white/60 bg-black/60 px-1.5 py-0.5 backdrop-blur-sm rounded-xs border border-white/10">
                                    N° {String(index + 1).padStart(2, '0')}
                                </span>
                            </ProjectImageLink>
                        </ImageGalleryItem>
                    );
                })}
            </div>
        </div>
    );
}
