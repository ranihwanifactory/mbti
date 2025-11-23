import React from 'react';
import { LayoutDashboard, Search, Settings, Activity, Zap } from 'lucide-react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-20 lg:w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50 transition-all duration-300">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-slate-800/50">
          <div className="relative">
             <Activity className="w-8 h-8 text-emerald-500 relative z-10" />
             <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-40"></div>
          </div>
          <span className="hidden lg:block ml-3 font-bold text-2xl tracking-tight text-white">
            N-Rank<span className="text-emerald-500">.AI</span>
          </span>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-3 px-3 lg:px-4">
          <div className="hidden lg:block px-4 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Menu
          </div>
          <NavItem 
            icon={<LayoutDashboard />} 
            label="Live Dashboard" 
            active={currentView === ViewState.DASHBOARD}
            onClick={() => onNavigate(ViewState.DASHBOARD)}
          />
          <NavItem 
            icon={<Search />} 
            label="Keyword Analysis" 
            active={currentView === ViewState.ANALYSIS}
            onClick={() => onNavigate(ViewState.ANALYSIS)}
          />
          <NavItem 
            icon={<Settings />} 
            label="System Settings" 
            active={currentView === ViewState.SETTINGS}
            onClick={() => onNavigate(ViewState.SETTINGS)}
          />

          <div className="hidden lg:block px-4 mt-8 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Insights
          </div>
          <div className="hidden lg:flex items-center p-3 mx-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
             <Zap className="w-5 h-5 text-yellow-400 mr-3" />
             <div>
                <p className="text-xs text-indigo-200 font-medium">Daily Tip</p>
                <p className="text-[10px] text-slate-400">Update ranking at 2 AM</p>
             </div>
          </div>
        </nav>
        
        <div className="p-6 border-t border-slate-800/50 hidden lg:block">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span className="text-xs font-bold text-white">A</span>
                </div>
                <div>
                    <p className="text-sm font-medium text-white">Admin User</p>
                    <p className="text-xs text-emerald-500">Pro Plan Active</p>
                </div>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
        
        <header className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-10 z-10 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-md sticky top-0">
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">
                {currentView === ViewState.DASHBOARD && 'Real-time Market Watch'}
                {currentView === ViewState.ANALYSIS && 'Deep Dive Analysis'}
                {currentView === ViewState.SETTINGS && 'Configuration'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">Updated: {new Date().toLocaleDateString()}</p>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                System Operational
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth relative z-0">
          {children}
        </div>
      </main>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
        ${active 
          ? 'text-white shadow-lg shadow-emerald-900/20' 
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}
      `}
    >
      {active && (
         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent border-l-2 border-emerald-500" />
      )}
      <span className={`w-5 h-5 flex items-center justify-center relative z-10 transition-transform duration-300 ${active ? 'scale-110 text-emerald-400' : 'group-hover:scale-110'}`}>
        {React.cloneElement(icon as React.ReactElement, { strokeWidth: active ? 2.5 : 2 })}
      </span>
      <span className="hidden lg:block ml-3 font-medium text-sm relative z-10">{label}</span>
    </button>
  );
};