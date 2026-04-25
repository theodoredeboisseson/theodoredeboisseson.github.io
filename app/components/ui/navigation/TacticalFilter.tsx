'use client';

import { motion } from 'framer-motion';
import { TacticalFilterProps } from '@/app/types';

export default function TacticalFilter({ 
    options, 
    activeOptions, 
    onChange, 
    mode = 'radio',
    className = "" 
}: TacticalFilterProps) {
    
    const isSelected = (option: string) => {
        if (mode === 'radio') return activeOptions === option;
        if (option === 'All') return Array.isArray(activeOptions) && activeOptions.length === 0;
        return Array.isArray(activeOptions) && activeOptions.includes(option);
    };

    return (
        <div className={`flex flex-wrap gap-0 w-fit ${className}`}>
            {options.map((option, index) => {
                const selected = isSelected(option);
                const isFirst = index === 0;
                const isLast = index === options.length - 1;
                
                return (
                    <button
                        key={option}
                        onClick={() => onChange(option)}
                        className={`
                            group relative flex items-center gap-2 px-4 py-2 transition-all duration-300
                            btn-tactical border-y border-r-0 border-[#11111110]
                            ${selected 
                                ? 'bg-foreground text-background z-10 border-transparent shadow-[0_0_15px_rgba(0,0,0,0.1)]' 
                                : 'bg-[#11111108] text-foreground/40 hover:text-foreground hover:bg-[#11111120]'}
                            
                            /* Selective Rounding */
                            first:rounded-tl-2xl first:rounded-bl-sm 
                            last:rounded-br-2xl last:rounded-tr-sm last:border-r
                            rounded-none
                            
                            ${mode === "radio" && ('bg-transparent!')}
                        `}
                    >
                        {/* Status Indicator */}
                        <div className="relative flex items-center justify-center size-1.5">
                            <div className={`transition-all duration-300 border ${mode === 'radio' ? 'rounded-full' : 'rounded-none'} 
                                ${selected ? 'border-primary bg-primary scale-125 shadow-[0_0_8px_rgba(217,66,97,0.5)]' : 'border-foreground/20 scale-75'}`}
                                style={{ width: '100%', height: '100%' }}
                            />
                        </div>

                        <span className="relative z-10 font-bold tracking-widest text-smol uppercase">{option}</span>
                        
                        {/* Layout animation for the dark background sliding (Radio only) */}
                        {mode === 'radio' && selected && (
                            <motion.div 
                                layoutId="activeFilterBg"
                                className={`absolute inset-0 bg-foreground -z-10

                                    rounded-none 
                                    ${isFirst && ('rounded-tl-2xl rounded-bl-sm')}
                                    ${isLast && ('rounded-br-2xl rounded-tr-sm')}
                                `}
                                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
}



