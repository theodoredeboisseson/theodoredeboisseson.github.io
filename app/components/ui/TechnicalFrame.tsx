import React from "react";

interface TechnicalFrameProps {
    className?: string;
    showMetadata?: boolean;
}

export default function TechnicalFrame({ className = "", showMetadata = true }: TechnicalFrameProps) {
    const currentYear = new Date().getFullYear();

    return (
        <div className={`pointer-events-none fixed inset-0 z-50 flex flex-col justify-between p-4 mix-blend-difference text-white opacity-90 ${className}`}>
            {/* Top Row */}
            <div className="flex w-full items-start justify-between">
                {/* Top Left Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute top-0 left-0 h-[1px] w-4 bg-current" />
                    <div className="absolute top-0 left-0 h-4 w-[1px] bg-current" />
                </div>

                {/* Top Metadata */}
                {showMetadata && (
                    <div className="font-mono text-[10px] tracking-widest uppercase opacity-80 hidden md:block">
                        Portfolio // {currentYear}
                    </div>
                )}

                {/* Top Right Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute top-0 right-0 h-[1px] w-4 bg-current" />
                    <div className="absolute top-0 right-0 h-4 w-[1px] bg-current" />
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
                    <div className="absolute bottom-0 left-0 h-[1px] w-4 bg-current" />
                    <div className="absolute bottom-0 left-0 h-4 w-[1px] bg-current" />
                </div>

                {/* Bottom Metadata */}
                {showMetadata && (
                    <div className="font-mono text-[10px] tracking-widest uppercase opacity-80">
                        LOC // MONTPELLIER
                    </div>
                )}

                {/* Bottom Right Crosshair */}
                <div className="relative h-8 w-8">
                    <div className="absolute bottom-0 right-0 h-[1px] w-4 bg-current" />
                    <div className="absolute bottom-0 right-0 h-4 w-[1px] bg-current" />
                </div>
            </div>

            {/* Decorative border frame (optional, full screen thin border) */}
            <div className="absolute inset-4 border-[0.5px] border-current opacity-10 pointer-events-none" />
        </div>
    );
}
