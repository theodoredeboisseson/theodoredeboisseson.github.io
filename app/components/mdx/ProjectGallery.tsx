'use client';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: { src: string; alt: string }[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 my-12">
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`group relative w-full overflow-hidden rounded-sm bg-foreground/5 border-[0.5px] border-foreground/10 ${idx === 0 && images.length % 2 !== 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'
                        }`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                    {/* Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-background font-mono text-xs uppercase tracking-widest">{img.alt}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
