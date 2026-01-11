'use client';

interface VideoPlayerProps {
    url: string;
}

export default function VideoPlayer({ url }: VideoPlayerProps) {
    if (!url) return null;

    // Simple check for YouTube/Vimeo extension vs direct file
    const isVideoFile = url.match(/\.(mp4|webm|ogg)$/);

    return (
        <div className="my-8 w-full aspect-video bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800 relative group">
            {isVideoFile ? (
                <video controls className="w-full h-full object-cover">
                    <source src={url} />
                    Your browser does not support the video tag.
                </video>
            ) : (
                <div className="flex items-center justify-center w-full h-full text-neutral-500 bg-neutral-900 icon-stripes">
                    {/* Fallback for external embeds (iframe) if needed later */}
                    <span className="font-mono text-sm">External video source to be implemented</span>
                </div>
            )}
        </div>
    );
}
