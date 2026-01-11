'use client';
import { CheckCircle2 } from 'lucide-react';

interface CompetenceBlockProps {
    ac: string[];
}

export default function CompetenceBlock({ ac }: CompetenceBlockProps) {
    if (!ac || ac.length === 0) return null;

    return (
        <div className="my-12 p-8 border-[0.5px] border-foreground/10 bg-foreground/[0.02]">
            <h3 className="text-xs font-mono uppercase text-primary mb-6 tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                Validation Des Acquis
            </h3>
            <div className="space-y-4">
                {ac.map((item, idx) => (
                    <div key={idx} className="flex items-baseline gap-4 group">
                        <CheckCircle2 className="mt-0.5 text-green-500/40 shrink-0 group-hover:text-primary transition-colors" size={16} />
                        <span className="leading-relaxed text-foreground/80 font-light group-hover:text-foreground transition-colors">{item}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
