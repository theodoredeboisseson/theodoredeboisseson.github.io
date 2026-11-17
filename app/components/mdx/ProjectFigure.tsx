import Image from 'next/image';
import ProjectImageLink from './ProjectImageLink';

interface ProjectFigureProps {
    src: string;
    alt: string;
    caption: string;
    width: number | `${number}`;
    height: number | `${number}`;
}

export default function ProjectFigure({ src, alt, caption, width, height }: ProjectFigureProps) {
    return (
        <figure className="my-10">
            <ProjectImageLink src={src} alt={alt} caption={caption}>
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes="(min-width: 1280px) 800px, (min-width: 1024px) 65vw, 100vw"
                    className="h-auto w-full border border-foreground/15"
                />
            </ProjectImageLink>
            <figcaption className="mt-3 text-sm leading-relaxed text-foreground/75">
                {caption}
            </figcaption>
        </figure>
    );
}
