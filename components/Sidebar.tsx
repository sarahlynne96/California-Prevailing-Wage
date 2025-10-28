import React from 'react';
import { View } from '../types';
import { CalculatorIcon, DocumentIcon, ChecklistIcon, QuestionIcon, BriefcaseIcon, HardHatIcon, DashboardIcon, AcademicCapIcon, XIcon } from './common/Icons';

interface SidebarProps {
  currentView: View;
  setView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
        isActive
          ? 'bg-primary text-white shadow-md'
          : 'text-slate-300 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {icon}
      <span className="font-semibold">{label}</span>
    </button>
  );
};

const NavHeader: React.FC<{label: string}> = ({ label }) => (
    <h3 className="px-3 pt-4 pb-1 text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</h3>
)

const SidebarContent: React.FC<Omit<SidebarProps, 'isOpen'>> = ({ currentView, setView, onClose }) => {
    const mainNavItems: { view: View; label: string; icon: React.ReactNode }[] = [
        { view: 'dashboard', label: 'Dashboard', icon: <DashboardIcon className="w-5 h-5" /> },
        { view: 'calculator', label: 'Labor Cost Calculator', icon: <CalculatorIcon className="w-5 h-5" /> },
        { view: 'applicability', label: 'PW Applicability', icon: <DocumentIcon className="w-5 h-5" /> },
        { view: 'checklist', label: 'Compliance Checklist', icon: <ChecklistIcon className="w-5 h-5" /> },
        { view: 'qa', label: 'Regulatory Q&A', icon: <QuestionIcon className="w-5 h-5" /> },
        { view: 'apprenticeship', label: 'Apprenticeship Resources', icon: <AcademicCapIcon className="w-5 h-5" /> },
    ];
        
    const secondaryNavItems: { view: View; label: string; icon: React.ReactNode }[] = [
        { view: 'services', label: 'Compliance Services', icon: <BriefcaseIcon className="w-5 h-5" /> },
    ];

    const handleItemClick = (view: View) => {
        setView(view);
        onClose(); // On desktop, onClose is a no-op
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-2 mb-6">
              <div className="flex items-center space-x-2.5">
                  <HardHatIcon className="w-7 h-7 text-white flex-shrink-0" />
                  <span className="text-lg font-bold text-white leading-tight">Prevailing Wage Assistant</span>
              </div>
              <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white" aria-label="Close menu">
                  <XIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col">
                <NavHeader label="Tools" />
                <div className="space-y-1.5">
                    {mainNavItems.map((item) => (
                      <NavItem
                        key={item.view}
                        icon={item.icon}
                        label={item.label}
                        isActive={currentView === item.view}
                        onClick={() => handleItemClick(item.view)}
                      />
                    ))}
                </div>
                <div className="mt-auto">
                    <NavHeader label="Support" />
                    <div className="space-y-1.5">
                        {secondaryNavItems.map((item) => (
                          <NavItem
                            key={item.view}
                            icon={item.icon}
                            label={item.label}
                            isActive={currentView === item.view}
                            onClick={() => handleItemClick(item.view)}
                          />
                        ))}
                    </div>
                </div>
            </nav>
        </div>
    );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Sidebar (off-canvas) */}
      <aside 
        className={`fixed inset-y-0 left-0 bg-slate-800 w-64 p-4 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-hidden={!isOpen}
      >
        <SidebarContent currentView={currentView} setView={setView} onClose={onClose} />
      </aside>

      {/* Mobile Overlay */}
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" aria-hidden="true"></div>}

      {/* Desktop Sidebar (static) */}
      <aside className="hidden lg:flex w-64 bg-slate-800 flex-shrink-0 p-4 flex-col">
        <SidebarContent currentView={currentView} setView={setView} onClose={() => {}} />
      </aside>
    </>
  );
};

export default Sidebar;