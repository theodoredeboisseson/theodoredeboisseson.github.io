'use client';

export default function TechDivider() {
    return (
        <div className="w-full flex items-center justify-center py-8 md:py-12">
            <div className="flex items-center gap-4 opacity-30">
                {/* Left line */}
                <div className="h-px w-32 md:w-64 bg-linear-to-r from-transparent via-foreground to-foreground"></div>
                
                {/* Center marker */}
                <div className="relative w-3 h-3">
                    <div className="absolute inset-0 rotate-45 border border-primary"></div>
                    <div className="absolute inset-1 bg-primary/20"></div>
                </div>
                
                {/* Right line */}
                <div className="h-px w-32 md:w-64 bg-linear-to-l from-transparent via-foreground to-foreground"></div>
            </div>
        </div>
    );
}
