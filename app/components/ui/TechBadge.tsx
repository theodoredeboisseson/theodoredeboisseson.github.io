'use client';
import { Cpu } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface Badge {
    label: string;
    icon?: string;
}

interface TechBadgeProps {
    skills?: string[]; // Legacy support for MDX
    badges?: Badge[];  // New rich support
}

export default function TechBadge({ skills, badges }: TechBadgeProps) {
    // Merge or select source
    const items: Badge[] = badges || (skills?.map(s => ({ label: s })) || []);

    if (!items || items.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 my-4">
            {items.map((item) => (
                <div
                    key={item.label}
                    className="flex items-center gap-2 px-3 py-1 bg-transparent border-[0.5px] border-foreground/20 rounded-full text-foreground/80 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                    <span className="w-4 h-4 flex items-center justify-center">
                        {item.icon ? (
                            <DynamicIcon name={item.icon} size={14} className="w-full h-full" />
                        ) : (
                            <Cpu size={12} className="text-primary/50" />
                        )}
                    </span>
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
}
