import React from 'react';

interface BlockProps {
  children: React.ReactNode;
  className?: string;
}

const Block: React.FC<BlockProps> = ({ children, className = '' }) => (
  <div
    className={`h-[500px] max-w-6xl mx-auto mb-12 bg-white rounded-xl p-8 ${className}`}
    style={{ boxShadow: '0 6px 24px 0 rgba(11,32,96,.05)' }}
  >
    {children}
  </div>
);

export default Block; 