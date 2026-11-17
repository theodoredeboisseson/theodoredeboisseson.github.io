export interface ProjectImage {
    src: string;
    width: number;
    height: number;
    alt: string;
    caption?: string;
}

export function deduplicateProjectImages<T extends ProjectImage>(images: T[]): T[] {
    const unique = new Map<string, T>();
    for (const image of images) {
        const previous = unique.get(image.src);
        if (previous) {
            previous.caption ||= image.caption;
            previous.alt ||= image.alt;
        } else {
            unique.set(image.src, { ...image });
        }
    }
    return [...unique.values()];
}
