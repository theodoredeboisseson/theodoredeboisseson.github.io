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

    if (!matchedItem) {
        return (
            <span className={`font-mono text-sm px-3 py-1 border border-neutral-300 rounded-full bg-neutral-100/50 ${className}`}>
                {id}
            </span>
        );
    }

    const parentComp = (acData as Competence[]).find(c => 
        isAC 
            ? c.acs.some(a => a.id === id)
            : c.ces?.some(ce => ce.id === id)
    );

    return (
        <div className="group/tooltip relative inline-block cursor-help">
            <span className={`font-mono text-sm px-3 py-1 border border-neutral-300 rounded-full bg-neutral-100/50 hover:bg-primary hover:text-white hover:border-transparent transition-all ${className}`}>
                {matchedItem.id}
            </span>

            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-black/10 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                        {parentComp ? `${parentComp.id} // ${parentComp.title}` : matchedItem.id}
                    </span>
                    <p className="font-serif font-bold text-sm leading-tight text-black">
                        {matchedItem.title}
                    </p>
                    <div className="h-px w-8 bg-black/10 my-1" />
                    <p className="text-smol opacity-70 leading-relaxed font-sans">
                        {isAC ? (matchedItem as AC).description : (matchedItem as CE).description}
                    </p>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
            </div>
        </div>
    );
}
