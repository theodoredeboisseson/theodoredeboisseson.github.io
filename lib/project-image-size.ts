import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { imageSize } from 'image-size';

export function getProjectImageSize(src: string) {
    const root = resolve(process.cwd(), 'public');
    const pathname = decodeURIComponent(src.split(/[?#]/)[0]);
    const filename = resolve(root, '.' + pathname);
    if (!pathname.startsWith('/images/') || !filename.startsWith(root + sep)) {
        throw new Error('Une image locale du dossier public/images est attendue.');
    }
    const { width, height, orientation } = imageSize(readFileSync(filename));
    return orientation && orientation >= 5 ? { width: height, height: width } : { width, height };
}
