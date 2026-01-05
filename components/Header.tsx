
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-bolt"></i>
          </div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tighter">Vent</h1>
        </div>
        <div className="text-sm font-medium text-slate-500 hidden sm:block">
          Stop planning. Start building.
        </div>
      </div>
    </header>
  );
};

export default Header;
