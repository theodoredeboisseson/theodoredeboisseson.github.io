'use client';
import { Cpu } from 'lucide-react';

interface TechBadgeProps {
    skills: string[];
}

export default function TechBadge({ skills }: TechBadgeProps) {
    if (!skills || skills.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 my-6">
            {skills.map((skill) => (
                <div
                    key={skill}
                    className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 font-mono text-sm shadow-sm hover:border-primary/50 transition-colors"
                >
                    <Cpu size={14} className="text-primary" />
                    <span>{skill}</span>
                </div>
            ))}
        </div>
    );
}
