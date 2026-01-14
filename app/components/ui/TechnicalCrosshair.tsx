
export default function TechnicalCrosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`pointer-events-none absolute z-20 flex items-center justify-center opacity-70 ${className}`}>
            <div className="relative h-4 w-4">
                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#CC5500]" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#CC5500]" />
            </div>
        </div>
    );
}
