import React from 'react';

const Skeleton = ({ className }: { className: string }) => {
    return <div className={`bg-[var(--extralightgrey)] rounded-md ${className}`}></div>;
};

export default Skeleton;
