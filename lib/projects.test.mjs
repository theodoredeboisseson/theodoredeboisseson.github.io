import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { getAllProjects, getProjectBySlug, getProjectSlugs, getProjectSummary } from './mdx.ts';

test('la sélection éditoriale présente Genomint, JiFoosball et la MJC dans cet ordre', () => {
    const projects = getAllProjects();
    assert.deepEqual(projects.filter(project => project.featured).map(project => project.slug), [
        'genomint', 'jifoosball', 'stage-mjc',
    ]);
    assert.equal(projects.length, 8);
    assert.equal(new Set(projects.map(project => project.slug)).size, 8);
});

test('les résumés conservent les contributions, le statut et les descriptions des images', () => {
    const project = getProjectBySlug('genomint');
    assert.ok(project);
    const summary = getProjectSummary(project);
    assert.equal(summary.status, 'in-progress');
    assert.ok(summary.contribution);
    assert.ok(summary.imageAlt);
    assert.equal(summary.contribution, project.contribution);
    assert.equal(summary.imageAlt, project.imageAlt);
    assert.ok(getProjectSlugs().includes('genomint.mdx'));
    assert.equal(getProjectBySlug('projet-inexistant'), null);
});

test('les anciennes fiches, leurs médias et les références aux compétences restent valides', () => {
    const skills = JSON.parse(readFileSync('data/skills.json', 'utf8'));
    const names = new Set(skills.map(skill => skill.name));
    for (const project of getAllProjects()) {
        if (project.image) assert.ok(existsSync(`public${project.image}`), project.image);
        for (const skill of project.usedSkills) assert.ok(names.has(skill), `${project.slug} : ${skill}`);
    }
    const oldProject = getProjectBySlug('concours-robotique');
    assert.equal(oldProject.status, undefined);
    assert.equal(getProjectSummary(oldProject).title, oldProject.title);
});
