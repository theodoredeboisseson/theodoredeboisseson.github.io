import type { Metadata } from "next";
import competencesData from '@/data/competences.json';
import { getAllProjects } from '@/lib/mdx';
import ReturnButton from '@/app/components/ui/navigation/ReturnButton';
import CompetencesContent from './CompetencesContent';
import { Competence } from '@/app/types';

export const metadata: Metadata = {
    title: "Portfolio d'apprentissage",
    description: 'Référentiel des compétences techniques et apprentissages critiques validés (BUT Informatique).',
};

export default function CompetencesPage() {
    const competences = competencesData as Competence[];
    const projects = getAllProjects();

    return (
        <main className="min-h-screen relative text-foreground py-20 px-4 md:px-12">
            <ReturnButton
                label="Page d'accueil"
                className="mb-12"
            />

            <header
                className="mb-20 grid grid-cols-1 md:grid-cols-12 gap-6 border-b border-black/10 pb-8"
                style={{ opacity: 0, animation: 'slide-up 0.6s ease-out 0.2s forwards' }}
            >
                <div className="col-span-1 md:col-span-4">
                    <h1 className="text-4xl md:text-5xl text-serif-italic mb-2">
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
                    </p>
                </div>
            </header>

            <CompetencesContent
                competences={competences}
                projects={projects}
            />

            <footer
                className="mt-32 pt-8 border-t border-black/10 text-center font-mono text-xs opacity-40"
                style={{ opacity: 0, animation: 'fade-in 0.8s ease-out forwards' }}
            >
                VALIDATION DES COMPETENCES // JURY 2026
            </footer>
        </main>
    );
}
