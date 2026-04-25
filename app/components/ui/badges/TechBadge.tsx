'use client';

import { motion } from 'framer-motion';
import { Cpu } from 'lucide-react';
import DynamicIcon from '@/app/components/ui/display/DynamicIcon';

import { Badge, TechBadgeProps } from '@/app/types';

export default function TechBadge({ skills, badges }: TechBadgeProps) {
    // Merge or select source
    const items: Badge[] = badges || (skills?.map(s => ({ label: s })) || []);

    if (!items || items.length === 0) return null;

    return (
        <div className="flex flex-wrap justify-center gap-3">
            {items.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 py-1 bg-transparent border-[0.5px] border-foreground/20 rounded-full text-foreground/80 text-label hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                    <span className="w-4 h-4 flex items-center justify-center">
                        {item.icon ? (
                            <DynamicIcon name={item.icon} size={14} className="w-full h-full" />
                        ) : (
                            <Cpu size={12} className="text-primary/50" />
                        )}
                    </span>
                    <span>{item.label}</span>
                </motion.div>
            ))}
        </div>
    );
}
