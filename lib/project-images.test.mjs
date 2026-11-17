import assert from 'node:assert/strict';
import test from 'node:test';
import { getProjectImageSize } from './project-image-size.ts';
import { deduplicateProjectImages } from './project-images.ts';

test('utilise les dimensions intrinsèques des captures web et mobile', () => {
    assert.deepEqual(getProjectImageSize('/images/projects/genomint/explorer.webp'), { width: 1800, height: 1126 });
    assert.deepEqual(getProjectImageSize('/images/projects/jifoosball/mobile-jifoosball.png'), { width: 1080, height: 2290 });
    assert.throws(() => getProjectImageSize('/../package.json'), /image locale/);
});

test('réunit couverture et figures sans doublons, dans leur ordre de lecture', () => {
    const cover = { src: '/explorer.webp', width: 1800, height: 1126, alt: 'Exploration' };
    const detail = { src: '/detail.webp', width: 1800, height: 1126, alt: 'Visualisation', caption: 'Détail scientifique' };
    const figure = { ...cover, caption: 'Espace de travail Genomint' };
    const source = [cover, detail, figure];
    assert.deepEqual(deduplicateProjectImages(source), [{ ...cover, caption: figure.caption }, detail]);
    assert.equal(cover.caption, undefined);
    assert.deepEqual(deduplicateProjectImages([]), []);
    assert.deepEqual(deduplicateProjectImages([detail, { ...detail, caption: 'Autre légende' }]), [detail]);
});
