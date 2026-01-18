import Link from 'next/link';
import acData from '@/data/ac_competences.json';
import { getAllProjects } from '../../lib/mdx';
import ReturnButton from '../components/ui/ReturnButton';

import { AC, Competence } from '../Interfaces';



export default function CompetencesPage() {
    const competences = acData as Competence[];
    const projects = getAllProjects();


    // Helper to find projects for a given AC
    const getProjectsForAC = (comp: Competence, ac: AC) => {
        const acNum = ac.id.replace("AC", ""); // "AC11" -> "11"

        return projects.filter((p) => {
            if (!p.ac_list) return false;
            return p.ac_list.some((valString: string) => {
                const s = valString.toLowerCase();

                const hasNum = s.includes(`ac${acNum}`) || s.includes(`ac ${acNum}`);

                return hasNum;
            });
        });
    };

    return (
        <main className="min-h-screen bg-background text-foreground py-20 px-4 md:px-12 font-sans selection:bg-primary selection:text-background">
            <ReturnButton label="Page d'accueil" className="mb-12" />
            <header className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-black/10 pb-8">
                <div className="col-span-1 md:col-span-4">
                    <h1 className="text-4xl md:text-5xl font-serif italic mb-2">
                        Validation
                        <br />
                        <span className="text-primary">des Compétences</span>
                    </h1>
                </div>
                <div className="col-span-1 md:col-span-8 flex flex-col justify-end">
                    <p className="font-mono text-sm opacity-60 uppercase tracking-widest">
                        Index Technique // BUT Informatique
                    </p>
                    <p className="mt-4 text-lg max-w-2xl font-light opacity-80">
                        Référentiel des apprentissages critiques validés au cours du BUT Informatique.
                        Chaque compétence est attestée par des projets concrets.
                        En guise d'auto-evaluation, j’utilise une échelle progressive : <span className="text-primary">Non acquise → En cours d’acquisition → Acquise → Maîtrisée.</span>
                    </p>
                </div>
            </header>

            <div className="flex flex-col gap-16">
                {competences.map((comp) => (
                    <section key={comp.id} className="group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-t border-black/80">

                            {/* Left: Competence Title */}
                            <div className="col-span-1 md:col-span-4 flex flex-col gap-2">
                                <span className="font-mono text-xs text-primary mb-1">
                                    {comp.id} //
                                </span>
                                <h2 className="text-3xl font-serif">
                                    {comp.title}
                                </h2>
                                <p className="text-sm opacity-60 italic mt-2 max-w-xs">
                                    {comp.description}
                                </p>
                            </div>

                            {/* Right: AC List */}
                            <div className="col-span-1 md:col-span-8 flex flex-col gap-8">
                                {comp.acs.map((ac) => {
                                    const linkedProjects = getProjectsForAC(comp, ac);
                                    return (
                                        <div key={ac.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 border-b border-black/10 pb-6 last:border-0 relative">
                                            {/* AC ID & Title */}
                                            <div className="col-span-1 md:col-span-8">
                                                <h3 className="text-lg font-medium mb-1">
                                                    <span className="font-mono text-xs text-black/40 mr-2 uppercase tracking-tight">
                                                        {ac.id}
                                                    </span>
                                                    {ac.title}
                                                </h3>
                                                {/* Level 3 Placeholder */}
                                                <div className="pl-8 mt-2">
                                                    <p className="text-sm font-mono text-primary mb-1">
                                                        Niveau 3 :
                                                    </p>
                                                    <p className="text-sm opacity-70">
                                                        {ac.level3 !== "À compléter" ? ac.level3 : "En cours de validation via le portfolio et les projets de 3ème année."}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Linked Projects */}
                                            <div className="col-span-1 md:col-span-4 flex flex-col items-start md:items-end gap-2">
                                                {linkedProjects.length > 0 && (
                                                    <span className="text-[10px] uppercase tracking-widest opacity-40 font-mono">
                                                        Preuves
                                                    </span>
                                                )}
                                                <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                                    {linkedProjects.map(p => (
                                                        <Link
                                                            key={p.slug}
                                                            href={`/projects/${p.slug}`}
                                                            className="inline-block px-2 py-1 bg-black/5 hover:bg-primary hover:text-background transition-colors text-xs font-mono rounded-sm"
                                                        >
                                                            {p.title} ↗
                                                        </Link>
                                                    ))}
                                                    {linkedProjects.length === 0 && (
                                                        <span className="text-xs opacity-30 italic">
                                                            Aucune preuve liée
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </section>
                ))}
            </div>

            <footer className="mt-32 pt-8 border-t border-black/10 text-center font-mono text-xs opacity-40">
                VALIDATION DES COMPETENCES // JURY 2026
            </footer>
        </main>
    );
}
