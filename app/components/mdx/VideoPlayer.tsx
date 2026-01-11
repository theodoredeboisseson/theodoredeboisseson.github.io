'use client';

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    if (!url) return null;

    // Simple check for YouTube/Vimeo extension vs direct file
    const isVideoFile = url.match(/\.(mp4|webm|ogg)$/);

    return (
        <div className="my-12 w-full aspect-video bg-foreground/5 rounded-sm overflow-hidden border-[0.5px] border-foreground/10 relative group">
            {isVideoFile ? (
                <video controls className="w-full h-full object-cover">
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="flex flex-col items-center justify-center w-full h-full text-foreground/40 bg-foreground/[0.02]">
                    <span className="font-mono text-xs uppercase tracking-widest border border-foreground/20 px-4 py-2 rounded-full">Video Placeholder</span>
                    <span className="font-mono text-[10px] mt-2 opacity-60">{url}</span>
                </div>
            )}
        </div>
    );
}
