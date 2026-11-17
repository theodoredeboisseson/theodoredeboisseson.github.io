import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import * as imageSize from './project-image-size.ts';

const require = createRequire(import.meta.url);
function loadComponent(filename, dependencies = {}) {
    const compiled = ts.transpileModule(readFileSync(filename, 'utf8'), {
        compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
    }).outputText;
    const componentModule = { exports: {} };
    runInNewContext(compiled, {
        exports: componentModule.exports,
        require: name => dependencies[name] ?? require(name),
    });
    return componentModule.exports.default;
}

const ProjectImageLink = loadComponent('app/components/mdx/ProjectImageLink.tsx', {
    '@/lib/project-image-size': imageSize,
});
const ProjectFigure = loadComponent('app/components/mdx/ProjectFigure.tsx', {
    './ProjectImageLink': ProjectImageLink,
});

test('les figures MDX gardent leurs dimensions et ouvrent le visualiseur depuis l’image', async () => {
    const source = readFileSync('content/projects/genomint.mdx', 'utf8');
    const figures = [...source.matchAll(/<ProjectFigure\s[\s\S]*?\/>/g)];
    assert.equal(figures.length, 3);
    for (const [figure] of figures) {
        const { content } = await compileMDX({ source: figure, components: { ProjectFigure } });
        const html = renderToStaticMarkup(content);
        assert.match(html, /<img[^>]+width="1800"/);
        assert.match(html, /<img[^>]+height="1126"/);
        assert.match(html, /<a[^>]+data-project-image=/);
        assert.match(html, /data-pswp-width="1800"/);
        assert.match(html, /data-pswp-height="1126"/);
        assert.doesNotMatch(html, /Agrandir l’image|target="_blank"/);
    }
});
