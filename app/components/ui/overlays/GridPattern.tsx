'use client';

export default function GridPattern() {
    return (
        <div 
            className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
            aria-hidden="true"
        >

            <div
                className="absolute inset-0 z-10"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, transparent 30%, rgba(17, 17, 17, 0.02) 60%, rgba(17, 17, 17, 0.1) 100%)',
                }}
            />

            {/* Grid pattern using SVG with radial mask */}
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    {/* Grid pattern */}
                    <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-foreground"
                        />
                    </pattern>

                    {/* Radial gradient mask - transparent center, visible edges */}
                    <radialGradient id="gridFade" cx="50%" cy="50%" r="70%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="40%" stopColor="white" stopOpacity="0.08" />
                        <stop offset="70%" stopColor="white" stopOpacity="0.16" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.3" />
                    </radialGradient>

                    {/* Mask using the gradient */}
                    <mask id="gridMask">
                        <rect width="100%" height="100%" fill="url(#gridFade)" />
                    </mask>
                </defs>

                {/* Grid with mask applied */}
                <rect
                    width="100%"
                    height="100%"
                    fill="url(#grid)"
                    mask="url(#gridMask)"
                />
            </svg>
        </div>
    );
}
