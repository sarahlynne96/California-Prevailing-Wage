
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-surface rounded-xl border border-border shadow-sm p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
};

export default Card;