
export default function GrainOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.1] mix-blend-overlay">
            <div className="bg-noise absolute inset-0 bg-repeat" />
        </div>
    );
}
