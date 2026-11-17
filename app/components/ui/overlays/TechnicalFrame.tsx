import React from "react";

import { TechnicalFrameProps } from '@/app/types';

export default function TechnicalFrame({ className = "", showMetadata = true }: TechnicalFrameProps) {
    const currentYear = new Date().getFullYear();

    return (
        <div aria-hidden="true"
            style={{ height: '100dvh' }}
            className={`pointer-events-none fixed inset-x-0 top-0 z-30 flex flex-col justify-between p-1 md:p-4 text-foreground/40 ${className}`}
        >
            {/* Top Row */}
            <div className="flex w-full items-start justify-between">
                {/* Top Left Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute top-0 left-0 h-px w-4 bg-current" />
                    <div className="absolute top-0 left-0 h-4 w-px bg-current" />
                </div>

                {/* Top Metadata */}
                {showMetadata && (
                    <div className="frame-metadata absolute right-4 top-16 font-mono text-micro tracking-widest uppercase">
                        Portfolio // {currentYear}
                    </div>
                )}

                {/* Top Right Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute top-0 right-0 h-px w-4 bg-current" />
                    <div className="absolute top-0 right-0 h-4 w-px bg-current" />
                </div>
            </div>

            {/* Middle Alignment lines (optional) */}
            <div className="flex w-full flex-1 items-center justify-between opacity-20">
                {/* Vertical center markers could go here */}
            </div>

            {/* Bottom Row */}
            <div className="flex w-full items-end justify-between">
                {/* Bottom Left Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute bottom-0 left-0 h-px w-4 bg-current" />
                    <div className="absolute bottom-0 left-0 h-4 w-px bg-current" />
                </div>

                {/* Bottom Metadata */}
                {showMetadata && (
                    <div className="frame-metadata absolute right-4 bottom-28 font-mono text-micro tracking-widest uppercase">
                        Location // Montpellier
                    </div>
                )}

                {/* Bottom Right Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute bottom-0 right-0 h-px w-4 bg-current" />
                    <div className="absolute bottom-0 right-0 h-4 w-px bg-current" />
                </div>
            </div>

            {/* Decorative border frame (optional, full screen thin border) */}
            <div className="absolute inset-1 md:inset-4 border-[0.5px] border-current opacity-10 pointer-events-none" />
        </div>
    );
}
