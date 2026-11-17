import Image from 'next/image';

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
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                sizes="(min-width: 1280px) 800px, (min-width: 1024px) 65vw, 100vw"
                className="h-auto w-full border border-foreground/15"
            />
            <figcaption className="mt-3 text-sm leading-relaxed text-foreground/75">
                {caption}
                <a href={src} target="_blank" rel="noopener noreferrer" className="mt-2 flex min-h-11 w-fit items-center border-b border-foreground/30 text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">
                    Agrandir l’image<span className="sr-only"> : {alt} (nouvel onglet)</span>
                </a>
            </figcaption>
        </figure>
    );
}
