'use client';

import { motion } from 'framer-motion';
import { VideoPlayerProps } from '@/app/types';

export default function VideoPlayer({ url }: VideoPlayerProps) {
    if (!url) return null;

    // Simple check for YouTube/Vimeo extension vs direct file
    const isVideoFile = url.match(/\.(mp4|webm|ogg)$/);

    return (
        <motion.div 
            className="my-12 w-full aspect-video bg-foreground/5 rounded-sm overflow-hidden border-[0.5px] border-foreground/10 relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ borderColor: 'rgba(217, 66, 97, 0.3)' }}
        >
            {isVideoFile ? (
                <video controls className="w-full h-full object-cover">
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-foreground/40 bg-foreground/[0.02]">
                    <span className="text-label border border-foreground/20 px-4 py-2 rounded-full group-hover:border-primary group-hover:text-primary transition-colors">Video Placeholder</span>
                    <span className="font-mono text-smol mt-2 opacity-60">{url}</span>
                </div>
            )}
        </motion.div>
    );
}
