'use client';

import acData from '@/data/competences.json';
import { AC, CE, Competence, CompetenceTooltipProps } from '@/app/types';

export default function CompetenceTooltip({ id, className = "" }: CompetenceTooltipProps) {
    const isAC = id.startsWith('AC');
    const isCE = id.startsWith('CE');

    const allAcs: AC[] = (acData as Competence[]).flatMap(c => c.acs);
    const allCes: CE[] = (acData as Competence[]).flatMap(c => c.ces || []);

    const matchedItem = isAC
        ? allAcs.find(ac => ac.id === id)
        : isCE
            ? allCes.find(ce => ce.id === id)
            : null;

    const parentComp = (acData as Competence[]).find(c =>
        isAC
            ? c.acs.some(a => a.id === id)
            : c.ces?.some(ce => ce.id === id)
    );

    return (
        <div className={`group/tooltip relative inline-block ${matchedItem ? 'cursor-help' : ''}`}>
            <span className={`font-mono text-xs px-2 py-0.5 border border-neutral-300 rounded-full bg-neutral-100/50 transition-all tracking-tight ${matchedItem ? 'hover:bg-primary hover:text-white hover:border-transparent' : ''} ${className}`}>
                {id}
            </span>

            {matchedItem && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white border border-black/10 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex justify-between items-baseline w-full mb-0.5 gap-4">
                            <span className="font-mono text-[9px] text-primary tracking-widest flex-1">
                                {parentComp ? `${parentComp.id} // ${parentComp.title}` : id}
                            </span>
                            <span className="font-serif text-[8px] opacity-40 italic">
                                {isAC ? 'Apprentissage critique' : 'Compétence élémentaire'}
                            </span>
                        </div>
                        <p className="font-serif font-bold text-xs leading-[1.2] text-black">
                            {matchedItem.title}
                        </p>
                        <div className="h-px w-8 bg-black/10 my-1" />
                        <p className="text-smol opacity-70 leading-relaxed font-sans">
                            {matchedItem.description}
                        </p>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                </div>
            )}
        </div>
    );
}
