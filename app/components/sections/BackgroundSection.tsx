'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { BackgroundSectionProps } from '@/app/types';

export default function BackgroundSection({
    src,
    alt,
    children,
    className = "",
    overlayOpacity = "bg-black/50"
}: BackgroundSectionProps) {
    return (
        <section className={`relative w-full overflow-hidden ${className}`}>
            {/* Background Image */}
            <motion.div 
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
                {/* Fallback color if image fails or loading */}
                <div className="absolute inset-0 bg-[#101010]" />
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark Overlay for text readability */}
                <motion.div 
                    className={`absolute inset-0 ${overlayOpacity}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                />
            </motion.div>

            {/* Content */}
            <motion.div 
                className="relative z-10 w-full h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
            >
                {children}
            </motion.div>
        </section>
    )
}
