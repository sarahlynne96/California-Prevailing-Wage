import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import Applicability from './components/Applicability';
import Checklist from './components/Checklist';
import RegulatoryQA from './components/RegulatoryQA';
import ComplianceServices from './components/ComplianceServices';
import Dashboard from './components/Dashboard';
import Apprenticeship from './components/Apprenticeship';
import { View } from './types';
import Header from './components/Header';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard setView={setView} />;
      case 'calculator':
        return <Calculator />;
      case 'applicability':
        return <Applicability />;
      case 'checklist':
        return <Checklist />;
      case 'qa':
        return <RegulatoryQA />;
      case 'services':
        return <ComplianceServices />;
      case 'apprenticeship':
        return <Apprenticeship />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="flex h-screen bg-background font-sans text-text-primary">
      <Sidebar 
        currentView={view} 
        setView={setView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col">
        <Header currentView={view} onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
        <footer className="text-center p-4 border-t border-border text-xs text-text-tertiary">
          <p>Disclaimer: This tool is for informational and estimation purposes only and is not a substitute for legal counsel. Always consult the official <a href="https://www.dir.ca.gov/Public-Works/Prevailing-Wage.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">CA Department of Industrial Relations (DIR)</a> for authoritative wage determinations.</p>
          <p className="mt-2">Created by Sarah Lynne, October 2025</p>
        </footer>
      </main>
    </div>
  );
};

export default App;