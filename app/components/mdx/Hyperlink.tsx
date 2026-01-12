import React from 'react';

interface HyperlinkProps {
    label: string;
    href: string;
}

const Hyperlink: React.FC<HyperlinkProps> = ({ label, href }) => {
    return (
        <div className="flex justify-center w-full my-12">
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/10 rounded-full hover:bg-foreground/5 transition-all duration-500 hover:gap-4 group"
            >
                <span className="font-mono text-xs uppercase tracking-[0.2em]">{label}</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
            </a>
        </div>
    );
};

export default Hyperlink;
