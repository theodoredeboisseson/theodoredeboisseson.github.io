'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function ImageGalleryItem({ index, isBig, children }: { index: number; isBig: boolean; children: ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={'motion-reducible group hover:-translate-y-1 motion-reduce:hover:translate-y-0 transition-transform relative flex flex-col gap-4 ' + (isBig ? 'md:col-span-2' : '')}
        >
            {children}
        </motion.div>
    );
}
