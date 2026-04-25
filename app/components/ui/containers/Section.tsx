'use client';

import {SectionComponentProps} from "@/app/types";

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
            <div className={`container-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12`}>
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6 border-b border-foreground/20 ${titlePosition === 'right' ? 'md:flex-row-reverse' : ''}`}>
                    <Tag className="section-title">
                        {title}<span className="text-primary">.</span>
                    </Tag>
                    
                    {aside ? (
                        aside
                    ) : (
                        /* Default decorative element */
                        <div className="flex items-center gap-3 opacity-50">
                            <div className="w-2 h-2 mx-5 rotate-45 border border-primary"></div>
                        </div>
                    )}
                </div>
            </div>

            {/* Section Content */}
            {children}
        </section>
    );
}
