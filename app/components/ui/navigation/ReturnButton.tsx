'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { ReturnButtonProps } from '@/app/types';

export default function ReturnButton({ href = "/", label = "Back", className = "", projectSlug }: ReturnButtonProps) {
    const finalHref = projectSlug && href === "/projects" ? `${href}#${projectSlug}` : href;

    return (
        <Link
            href={finalHref}
            className={`btn-tactical group sticky top-8 z-40
                rounded-2xl rounded-tl-sm
                ${className}`}
        >
            <motion.span
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
            >
                <ArrowLeft size={16} className="transition-transform duration-300" />
            </motion.span>
            <span className="text-label">{label}</span>
        </Link>
    );
}
