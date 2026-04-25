import React from "react";

/**
 * Common and Shared Interfaces
 * Generic props used across multiple components.
 */
export interface BaseSectionProps {
    id?: string;
    className?: string;
}

export interface ImageGalleryProps {
    images?: string | (string | { src: string; alt?: string })[];
    alts?: string;
    children?: React.ReactNode;
}

export interface ReturnButtonProps {
    href?: string;
    label?: string;
    className?: string;
    projectSlug?: string;
}

export interface SpacerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}

export type ContextType = 'Scolaire' | 'Perso' | 'Professionnel';

export interface ContextBadgeProps {
    context?: ContextType;
}
