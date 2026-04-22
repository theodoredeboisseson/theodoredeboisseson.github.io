'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ReturnButtonProps {
    href?: string;
    label?: string;
    className?: string;
    projectSlug?: string;
}

export default function ReturnButton({ href = "/", label = "Back", className = "", projectSlug }: ReturnButtonProps) {
    const finalHref = projectSlug && href === "/projects" ? `${href}#${projectSlug}` : href;

    return (
        <Link
            href={finalHref}
            className={`btn-tactical group sticky top-8 z-40
                rounded-2xl rounded-tl-sm
                ${className}`}
        >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-label">{label}</span>
        </Link>
    );
}
