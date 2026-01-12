import React from 'react';

interface SpacerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
}

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
    const getSize = () => {
        if (typeof size === 'number') return `${size}px`;

        const sizes = {
            'xs': '0.5rem',
            'sm': '1rem',
            'md': '2rem',
            'lg': '4rem',
            'xl': '6rem',
            '2xl': '8rem'
        };

        return sizes[size] || sizes['md'];
    };

    return <div style={{ height: getSize() }} aria-hidden="true" />;
};

export default Spacer;
