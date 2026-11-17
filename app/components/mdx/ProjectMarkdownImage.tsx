import Image from 'next/image';
import type { ComponentProps } from 'react';
import { getProjectImageSize } from '@/lib/project-image-size';
import ProjectImageLink from './ProjectImageLink';

export default function ProjectMarkdownImage({ src, alt = '', title }: ComponentProps<'img'>) {
    if (typeof src !== 'string') return null;
    const dimensions = getProjectImageSize(src);
    return (
        <ProjectImageLink src={src} alt={alt} caption={title ?? alt}>
            <Image src={src} alt={alt} {...dimensions} sizes="(min-width: 1024px) 65vw, 100vw" className="h-auto w-full border border-foreground/15" />
        </ProjectImageLink>
    );
}
