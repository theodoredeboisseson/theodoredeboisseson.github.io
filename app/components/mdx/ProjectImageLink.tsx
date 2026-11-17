import type { ReactNode } from 'react';
import { ZoomIn } from 'lucide-react';
import { getProjectImageSize } from '@/lib/project-image-size';

interface ProjectImageLinkProps {
    src: string;
    alt: string;
    caption?: string;
    className?: string;
    children: ReactNode;
}

export default function ProjectImageLink({ src, alt, caption, className, children }: ProjectImageLinkProps) {
    const { width, height } = getProjectImageSize(src);
    return (
        <a
            href={src}
            data-project-image
            data-pswp-width={width}
            data-pswp-height={height}
            data-image-caption={caption}
            aria-label={'Afficher l’image : ' + alt}
            className={className}
        >
            {children}
            <span data-image-zoom aria-hidden="true"><ZoomIn size={18} /></span>
        </a>
    );
}
