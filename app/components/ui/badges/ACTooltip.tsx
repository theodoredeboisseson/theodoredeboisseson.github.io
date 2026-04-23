'use client';

import acData from '@/data/ac_competences.json';

import { AC, Competence, ACTooltipProps } from '@/app/types';

export default function ACTooltip({ acString, className = "" }: ACTooltipProps) {
    // Heuristic: Check against all known AC IDs.
    const allAcs: AC[] = (acData as Competence[]).flatMap(c => c.acs);

    // Try exact ID match first
    const matchedAc: AC | undefined = allAcs.find(ac => ac.id === acString);

    return (
        <div className="group/tooltip relative inline-block cursor-help">
            <span className={`font-mono text-sm px-3 py-1 border border-neutral-300 rounded-full bg-neutral-100/50 hover:bg-primary hover:text-white hover:border-transparent transition-all ${className}`}>
                {matchedAc?.id ?? acString}
            </span>

            {matchedAc && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-black/10 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">

                    <div className="flex flex-col gap-1">
                        <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                            {(() => {
                                const parentComp = (acData as Competence[]).find(c => c.acs.some(a => a.id === matchedAc!.id));
                                return parentComp ? `${parentComp.id} // ${parentComp.title}` : matchedAc!.id;
                            })()}
                        </span>
                        <p className="font-serif font-bold text-sm leading-tight text-black">
                            {matchedAc.title}
                        </p>
                        <div className="h-px w-8 bg-black/10 my-1" />
                        <p className="text-smol opacity-70 leading-relaxed font-sans">
                            {matchedAc.description}
                        </p>
                    </div>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                </div>
            )}
        </div>
    );
}
