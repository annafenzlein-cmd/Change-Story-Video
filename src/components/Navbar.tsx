import React from 'react';
import { Video, Sparkles, FolderKanban, Plus } from 'lucide-react';

interface NavbarProps {
  activeTab: 'dashboard' | 'editor';
  setActiveTab: (tab: 'dashboard' | 'editor') => void;
  onNewProject: () => void;
  onOpenAiGenerator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewProject,
  onOpenAiGenerator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
          <Video className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Change Story Video Studio
          </h1>
          <p className="text-xs text-slate-400">Transform Narratives into Cinematic Stories</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
            activeTab === 'dashboard'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'text-slate-300 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Projects</span>
        </button>

        <button
          onClick={onOpenAiGenerator}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/25 hover:from-purple-500 hover:to-pink-500 transition-all flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>AI Storyteller</span>
        </button>

        <button
          onClick={onNewProject}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>
    </header>
  );
};
