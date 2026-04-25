'use client';

import { motion } from 'framer-motion';

import { ContextBadgeProps } from '@/app/types';

export default function ContextBadge({ context }: ContextBadgeProps) {
    if (!context) return null;

    return (
        <motion.span 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-block px-2 py-0.5 rounded text-xs font-mono uppercase tracking-widest border font-semibold
            ${context === 'Professionnel' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                context === 'Scolaire' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    'bg-primary/10 text-primary border-primary/20 font-medium'
            }`}>
            {context}
        </motion.span>
    );
}
