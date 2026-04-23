import React from 'react';

import { SpacerProps } from '@/app/types';

const Spacer: React.FC<SpacerProps> = ({ size = 'md' }) => {
    const sizes = {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '2rem',
        'lg': '4rem',
        'xl': '6rem',
        '2xl': '8rem'
    };

    const height = (sizes[size as keyof typeof sizes] || sizes['md']);

    return <div style={{ height }} aria-hidden="true" />;
};

export default Spacer;
