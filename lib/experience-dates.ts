const monthFormatter = new Intl.DateTimeFormat('fr-FR', {
    month: 'short', year: 'numeric', timeZone: 'UTC',
});
const dayFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
});

export function formatExperienceDate(date: string) {
    const [year, month, day] = date.split('-').map(Number);
    const formatter = day === undefined ? monthFormatter : dayFormatter;
    return formatter.format(new Date(Date.UTC(year, month - 1, day ?? 1)));
}

export function getTimelineLayout(periods: { start_date: string; end_date: string }[]) {
    if (periods.length === 0) return { years: [], segments: [] };

    const firstYear = Math.min(...periods.map(period => Number(period.start_date.slice(0, 4))));
    const lastYear = Math.max(...periods.map(period => Number(period.end_date.slice(0, 4))));
    const origin = Date.UTC(firstYear, 0, 1);
    const duration = Date.UTC(lastYear + 1, 0, 1) - origin;
    const position = (date: string, end = false) => {
        const [year, month, day] = date.split('-').map(Number);
        const timestamp = end
            ? day === undefined ? Date.UTC(year, month, 1) : Date.UTC(year, month - 1, day + 1)
            : Date.UTC(year, month - 1, day ?? 1);
        return ((timestamp - origin) / duration) * 100;
    };

    return {
        years: Array.from({ length: lastYear - firstYear + 1 }, (_, index) => firstYear + index),
        segments: periods.map(period => {
            const start = position(period.start_date);
            return { start, width: position(period.end_date, true) - start };
        }),
    };
}
