'use client';

import React from 'react';
import { motion } from 'framer-motion';

const KineticLine: React.FC = () => {
    // Pattern configuration
    const dashSize = 12; // Dash length (noticeably large)
    const gapSize = 64;  // Space between dashes (very spaced out)
    // Total pattern length is needed for a perfect animation loop
    const patternLength = dashSize + gapSize;

    return (
        // The container is aligned to the left
        <div className="relative w-full h-full min-h-125 overflow-hidden flex justify-start my-4">
            {/*
               We restrict the SVG to a narrow column on the left.
               w-24 defines the drawing area width.
            */}
            <svg
                className="h-full w-24 absolute left-0 inset-y-0"
                viewBox="0 0 24 100" // The viewBox looks only at this narrow strip
                preserveAspectRatio="none"
                style={{
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                }}
            >
                <motion.line
                    // Positioned in the middle of our narrow 24-unit strip
                    x1="12" y1="0"
                    x2="12" y2="100"

                    stroke="var(--color-primary)" // Your accent color
                    strokeWidth="1"               // Thick enough line
                    strokeDasharray={`${dashSize} ${gapSize}`} // Applies the large dash/large gap pattern
                    strokeLinecap="round"         // Rounded ends for a softer style

                    // Scrolling animation
                    animate={{
                        // Scroll exactly by one pattern length to loop seamlessly
                        strokeDashoffset: [0, -patternLength]
                    }}
                    transition={{
                        duration: 2,      // Adjusted speed for the new size
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
    );
};

export default KineticLine;