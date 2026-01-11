import Image from 'next/image';

interface BackgroundSectionProps {
    src: string;
    alt: string;
    children?: React.ReactNode;
    className?: string;
    overlayOpacity?: string;
}

export default function BackgroundSection({
    src,
    alt,
    children,
    className = "",
    overlayOpacity = "bg-black/50"
}: BackgroundSectionProps) {
    return (
        <section className={`relative w-full overflow-hidden ${className}`}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {/* Fallback color if image fails or loading */}
                <div className="absolute inset-0 bg-[#101010]" />
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay for text readability */}
                <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-[2px]`} />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>
        </section>
    )
}
