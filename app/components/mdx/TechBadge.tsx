'use client';
import { Cpu } from 'lucide-react';

interface TechBadgeProps {
    skills: string[];
}

export default function TechBadge({ skills }: TechBadgeProps) {
    if (!skills || skills.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-3 my-8">
            {skills.map((skill) => (
                <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1 bg-transparent border-[0.5px] border-foreground/20 rounded-full text-foreground/80 font-mono text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-colors cursor-default"
                >
                    <Cpu size={12} className="text-primary" />
                    <span>{skill}</span>
                </div>
            ))}
        </div>
    );
}
