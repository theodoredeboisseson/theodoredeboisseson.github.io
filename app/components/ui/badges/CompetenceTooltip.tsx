'use client';

import Link from 'next/link';
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
        isCE
            ? c.ces?.some(ce => ce.id === id)
            : c.acs.some(a => a.id === id)
    );

    return (
        <div className={`group/tooltip relative inline-block ${matchedItem ? 'cursor-help' : ''}`}>
            <Link
                href={`/apprentissage#${id}`}
                className={`font-mono text-xs px-2 py-0.5 border border-neutral-300 rounded-full bg-neutral-100/50 transition-all tracking-tight ${matchedItem ? 'hover:bg-primary hover:text-white hover:border-transparent' : ''} ${className}`}
            >
                {id}
            </Link>

            {matchedItem && (
                <div className="absolute font-sans bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 bg-white border border-black/10 shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none z-50 p-3 text-left">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-full mb-0.5">
                            <span className="font-mono font-bold text-smol text-primary tracking-widest normal-case">
                                {parentComp ? `${parentComp.id} // ${parentComp.title}` : id}
                            </span>
                        </div>
                        <p className=" font-bold text-xs leading-[1.2] text-black">
                            {matchedItem.title}
                        </p>
                        <p className="text-xs opacity-70 leading-tight normal-case">
                            {matchedItem.description}
                        </p>
                        <div className="h-px w-8 bg-black/10 my-1" />

                        <span className="text-[8px] font-bold italic">
                            {isAC ? 'Apprentissage critique' : 'Compétence élémentaire'}
                        </span>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                </div>
            )}
        </div>
    );
}
