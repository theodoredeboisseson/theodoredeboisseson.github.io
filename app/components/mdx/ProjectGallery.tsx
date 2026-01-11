'use client';
import Image from 'next/image';

interface ProjectGalleryProps {
    images: { src: string; alt: string }[];
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
    if (!images || images.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            {images.map((img, idx) => (
                <div
                    key={idx}
                    className={`relative w-full overflow-hidden rounded-sm bg-neutral-900 border border-neutral-800 ${idx === 0 && images.length % 2 !== 0 ? 'md:col-span-2 aspect-video' : 'aspect-[4/3]'
                        }`}
                >
                    <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                </div>
            ))}
        </div>
    );
}
