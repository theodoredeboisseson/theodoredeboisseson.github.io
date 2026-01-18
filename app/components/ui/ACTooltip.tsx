'use client';

import acData from '@/data/ac_competences.json';

import { AC, Competence } from '../../Interfaces';

interface ACTooltipProps {
    acString: string; // e.g. "AC11"
    className?: string;
}

export default function ACTooltip({ acString, className = "" }: ACTooltipProps) {
    // Heuristic: Check against all known AC IDs.
    const allAcs: AC[] = (acData as Competence[]).flatMap(c => c.acs);

    let matchedAc: AC | undefined;

    // Try exact ID match first
    matchedAc = allAcs.find(ac => ac.id === acString);

    // Fallback: If no match, just display the string cleanly.
    if (!matchedAc) {
        // Extracts "AC..." part for badge
        const badgeText = acString;
        return (
            <div className={`group/tooltip relative inline-block cursor-help ${className}`}>
                <span className="font-mono text-[10px] px-2 py-0.5 border border-foreground/20 rounded-full bg-background/50 hover:bg-primary hover:text-white hover:border-transparent transition-all">
                    {badgeText}
                </span>
                {/* Simple tooltip for full string */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] bg-black text-white text-xs p-2 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
                    {acString}
                </div>
            </div>
        )
    }

    return (
        <div className={`group/tooltip relative inline-block cursor-help ${className}`}>
            <span className="font-mono text-[10px] px-2 py-0.5 border border-neutral-300 rounded-full bg-neutral-100/50 hover:bg-primary hover:text-white hover:border-transparent transition-all">
                {matchedAc.id}
            </span>

            {/* Magazine Style Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-white border border-black/10 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-primary uppercase tracking-widest">
                        {(acData as Competence[]).find(c => c.acs.some(a => a.id === matchedAc!.id || matchedAc!.id.includes(a.id)))?.id}
                    </span>
                    <p className="font-serif font-bold text-sm leading-tight text-black">
                        {matchedAc.title}
                    </p>
                    <div className="h-px w-8 bg-black/10 my-1" />
                    <p className="text-[10px] opacity-70 leading-relaxed font-sans">
                        {matchedAc.description}
                    </p>
                </div>
                {/* Tiny arrow */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
            </div>
        </div>
    );
}
