import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-fast" 
      onClick={onClose}
    >
      <div 
        className="bg-surface rounded-xl shadow-2xl p-6 w-full max-w-lg relative transform transition-all scale-95 border border-border"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modal-scale-in 0.2s forwards' }}
      >
        <div className="flex justify-between items-center mb-4 border-b border-border pb-3">
          <h3 className="text-xl font-semibold text-primary">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-800 text-3xl leading-none font-semibold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;