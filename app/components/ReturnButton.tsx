'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ReturnButtonProps {
    href?: string;
    label?: string;
    className?: string;
}

export default function ReturnButton({ href = "/", label = "Back", className = "" }: ReturnButtonProps) {
    return (
        <Link
            href={href}
            className={`group inline-flex items-center gap-2 px-6 py-3 
                bg-transparent border-[0.5px] border-foreground/20 
                rounded-tr-2xl rounded-br-2xl rounded-bl-2xl rounded-tl-[2px]
                hover:bg-foreground hover:text-background hover:border-foreground
                transition-all duration-300 ease-out
                ${className}`}
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-mono text-xs uppercase tracking-widest">{label}</span>
        </Link>
    );
}
