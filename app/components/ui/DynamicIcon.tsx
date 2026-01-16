'use client';

import * as Icons from 'lucide-react';
import { LucideIcon, Code, Wrench, Palette, BookOpen, Cpu, Layers } from 'lucide-react';

interface DynamicIconProps {
    name: string;
    className?: string;
    size?: number;
    strokeWidth?: number;
    category?: string;
}

export default function DynamicIcon({ name, className = "", size, strokeWidth = 1.5, category }: DynamicIconProps) {
    if (!name && !category) return null;

    if (name && (name.startsWith('/') || name.includes('.') || name.includes('/'))) {
        const src = name.startsWith('/') ? name : `/icones/${name}`;
        return <img src={src} alt={name || 'icon'} className={`object-contain ${className}`} />;
    }

    // Lucide lookup
    // Cast to any to access by string index safely in TS
    const Icon = name ? (Icons as unknown as Record<string, LucideIcon>)[name] : null;

    if (Icon) {
        return <Icon size={size} strokeWidth={strokeWidth} className={className} />;
    }

    // Fallback based on category
    switch (category) {
        case 'Tech':
            const CpuCategory = Icons.Cpu;
            return <CpuCategory size={size} strokeWidth={strokeWidth} className={className} />;
        case 'Tools':
            return <Wrench size={size} strokeWidth={strokeWidth} className={className} />;
        case 'Art':
            return <Palette size={size} strokeWidth={strokeWidth} className={className} />;
        case 'Method':
            return <Layers size={size} strokeWidth={strokeWidth} className={className} />;
        default:
            return <Code size={size} strokeWidth={strokeWidth} className={className} />;
    }
}
