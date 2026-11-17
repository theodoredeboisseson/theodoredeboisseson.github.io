import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import test from 'node:test';
import { formatExperienceDate, getTimelineLayout } from './experience-dates.ts';

const exactDates = ['2026-09-16', '2026-12-11', '2026-04-20', '2026-08-07'];
const exactLabels = ['16 septembre 2026', '11 décembre 2026', '20 avril 2026', '7 août 2026'];
const monthDates = ['2025-01', '2025-04', '2023-09', '2023-06'];
const monthLabels = ['janv. 2025', 'avr. 2025', 'sept. 2023', 'juin 2023'];
const contracts = [
    { start_date: '2026-09-16', end_date: '2026-12-11' },
    { start_date: '2026-04-20', end_date: '2026-08-07' },
    { start_date: '2025-01', end_date: '2025-04' },
];

test('sépare les contrats CIRAD et garde les missions courtes visibles dans leur propre échelle', () => {
    const { years, segments } = getTimelineLayout(contracts);
    assert.deepEqual(years, [2025, 2026]);
    assert.equal(segments.length, 3);
    assert.ok(segments[1].start + segments[1].width < segments[0].start);
    assert.ok(segments.every(segment => segment.width > 10));
    assert.equal(segments[2].start, 0);
    assert.ok(segments[0].start + segments[0].width < 100);
});

test('adapte séparément la formation et inclut le dernier mois sans modifier ses dates', () => {
    const periods = [
        { start_date: '2023-09', end_date: '2026-08' },
        { start_date: '2020-09', end_date: '2023-06' },
    ];
    const original = structuredClone(periods);
    const { years, segments } = getTimelineLayout(periods);
    assert.deepEqual(years, [2020, 2021, 2022, 2023, 2024, 2025, 2026]);
    assert.ok(segments[1].start + segments[1].width < segments[0].start);
    assert.deepEqual(periods, original);
    assert.deepEqual(getTimelineLayout([{ start_date: '2026-01', end_date: '2026-12' }]), {
        years: [2026], segments: [{ start: 0, width: 100 }],
    });
    assert.deepEqual(getTimelineLayout([]), { years: [], segments: [] });
});

test('conserve le jour exact des deux périodes CIRAD', () => {
    assert.deepEqual(exactDates.map(formatExperienceDate), exactLabels);
});

test('affiche les dates au mois sans inventer de jour', () => {
    assert.deepEqual(monthDates.map(formatExperienceDate), monthLabels);
});

test('garde les mêmes jours et mois quel que soit le fuseau horaire', () => {
    const moduleUrl = new URL('./experience-dates.ts', import.meta.url).href;
    const dates = [...exactDates, ...monthDates];
    const script = `import { formatExperienceDate, getTimelineLayout } from ${JSON.stringify(moduleUrl)};
        console.log(JSON.stringify({ labels: ${JSON.stringify(dates)}.map(formatExperienceDate),
            timeline: getTimelineLayout(${JSON.stringify(contracts)}) }));`;

    for (const timeZone of ['UTC', 'Europe/Paris', 'America/Los_Angeles', 'Pacific/Kiritimati']) {
        const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
            env: { ...process.env, TZ: timeZone },
            encoding: 'utf8',
        });
        assert.equal(result.status, 0, result.stderr);
        assert.deepEqual(JSON.parse(result.stdout), {
            labels: [...exactLabels, ...monthLabels], timeline: getTimelineLayout(contracts),
        }, timeZone);
    }
});
