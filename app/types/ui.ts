/**
 * UI Component Types
 * Props for reusable design system elements.
 */
import { LucideProps } from 'lucide-react';

export interface SectionIconProps {
    onClick: () => void;
    section: {
        id: string;
        label: string;
        icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    };
    active: boolean;
    isMobile?: boolean;
}

export interface TechnicalFrameProps {
    className?: string;
    showMetadata?: boolean;
}

export interface AnimatedTextProps {
    text: string;
    className?: string;
    delayOffset?: number;
    staggerDelay?: number;
    duration?: number;
    showDot?: boolean;
}

export interface TacticalFilterProps {
    options: string[];
    activeOptions: string | string[];
    onChange: (option: string) => void;
    mode: 'radio' | 'checkbox';
    className?: string;
}

