import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';
import { runInNewContext } from 'node:vm';
import { compileMDX } from 'next-mdx-remote/rsc';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

// Exercise the real TSX component with Next Image, using the compiler already installed.
const compiled = ts.transpileModule(readFileSync('app/components/mdx/ProjectFigure.tsx', 'utf8'), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
}).outputText;
const componentModule = { exports: {} };
runInNewContext(compiled, { exports: componentModule.exports, require: createRequire(import.meta.url) });
const ProjectFigure = componentModule.exports.default;

test('les figures Genomint gardent leurs dimensions après compilation MDX et rendu Next Image', async () => {
    const source = readFileSync('content/projects/genomint.mdx', 'utf8');
    const figures = [...source.matchAll(/<ProjectFigure\s[\s\S]*?\/>/g)];
    assert.ok(figures.length >= 2);
    for (const [figure] of figures) {
        const { content } = await compileMDX({ source: figure, components: { ProjectFigure } });
        const html = renderToStaticMarkup(content);
        assert.match(html, /<img[^>]+width="[1-9]\d*"/);
        assert.match(html, /<img[^>]+height="[1-9]\d*"/);
        assert.match(html, /Agrandir l’image/);
    }
});
