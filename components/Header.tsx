import React from 'react';
import { MenuIcon } from './common/Icons';
import { View } from '../types';

interface HeaderProps {
  onMenuClick: () => void;
  currentView: View;
}

const viewTitles: { [key in View]: string } = {
    dashboard: 'Dashboard',
    calculator: 'Labor Cost Calculator',
    applicability: 'PW Applicability',
    checklist: 'Compliance Checklist',
    qa: 'Regulatory Q&A',
    services: 'Compliance Services',
    apprenticeship: 'Apprenticeship Resources',
};

const Header: React.FC<HeaderProps> = ({ onMenuClick, currentView }) => {
  return (
    <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-surface shadow-sm sticky top-0 z-30">
        <button onClick={onMenuClick} className="text-text-secondary hover:text-primary" aria-label="Open menu">
            <MenuIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">{viewTitles[currentView]}</h1>
        <div className="w-6"></div> {/* Spacer to balance the title */}
    </header>
  );
};

export default Header;
