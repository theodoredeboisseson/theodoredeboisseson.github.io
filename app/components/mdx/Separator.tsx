import React from 'react';

const Separator: React.FC = () => {
    return (
        <div className="w-full flex items-center gap-4 my-16" aria-hidden="true">
            <div className="h-px bg-foreground/20 flex-1" />
        </div>
    );
};

export default Separator;