'use client';

import { motion } from 'framer-motion';
import { SectionComponentProps } from "@/app/types";
import AnimatedText from "@/app/components/ui/display/AnimatedText";

export default function Section({
    id,
    title,
    titlePosition = 'left',
    titleTag: Tag = 'h2',
    aside,
    children,
    className = "",
}: SectionComponentProps) {
    return (
        <section id={id} className={`py-12 md:py-16 ${className}`}>
            {/* Section Header */}
            <motion.div
                className={`container-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-foreground/20 ${titlePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <AnimatedText
                        text={title}
                        tag={Tag as never}
                        className="section-title"
                        delayOffset={0.3}
                    />

                    {aside ? (
                        aside
                    ) : (
                        /* Default decorative element */
                        <div className="flex items-center gap-3 opacity-50">
                            <motion.div
                                initial={{ scale: 0, rotate: -45 }}
                                whileInView={{ scale: 1, rotate: 45 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                                className="w-2 h-2 mx-5 border border-primary"
                            />
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Section Content */}
            {children}
        </section>
    );
}
