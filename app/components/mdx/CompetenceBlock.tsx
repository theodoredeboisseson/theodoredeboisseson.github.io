'use client';
import { CheckCircle2 } from 'lucide-react';

interface CompetenceBlockProps {
    ac: string[];
}

export default function CompetenceBlock({ ac }: CompetenceBlockProps) {
    if (!ac || ac.length === 0) return null;

    return (
        <div className="my-8 p-6 bg-neutral-950/50 border border-neutral-800 rounded-lg">
            <h3 className="text-sm font-mono uppercase text-neutral-500 mb-4 tracking-widest border-b border-neutral-800 pb-2">
                Validation Des Acquis
            </h3>
            <div className="space-y-3">
                {ac.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-neutral-300 group">
                        <CheckCircle2 className="mt-0.5 text-green-500 shrink-0 group-hover:text-green-400 transition-colors" size={18} />
                        <span className="leading-relaxed">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
