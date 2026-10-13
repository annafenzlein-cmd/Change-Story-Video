import React, { useState } from 'react';
import { ChangeStoryProject } from '../types';
import { Sparkles, Plus, Film, Clock, Users, Trash2, Copy, Play, ArrowRight, Search } from 'lucide-react';

interface DashboardProps {
  projects: ChangeStoryProject[];
  onSelectProject: (proj: ChangeStoryProject) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string) => void;
  onDuplicateProject: (proj: ChangeStoryProject) => void;
  onOpenAiGenerator: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  projects,
  onSelectProject,
  onNewProject,
  onDeleteProject,
  onDuplicateProject,
  onOpenAiGenerator,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Business', 'Brand', 'Personal', 'Product', 'Community'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.logline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/40 to-slate-900 border border-indigo-500/20 p-8 md:p-12 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-10 bottom-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/25 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cinematic Change Narrative Studio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Craft Stories That Inspire Transformation
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Turn complex organizational shifts, brand pivots, and personal journeys into structured, engaging video storyboards with AI-powered scriptwriting and scene breakdowns.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenAiGenerator}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-600/30 hover:opacity-95 transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Generate with AI</span>
            </button>
            <button
              onClick={onNewProject}
              className="px-6 py-3 rounded-xl font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Blank Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                  : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Project Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/40 border border-slate-800/80 rounded-3xl space-y-4">
          <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
            <Film className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-slate-300">No change stories found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Get started by creating a new change story or generating one instantly using our AI Storyteller assistant.
          </p>
          <button
            onClick={onOpenAiGenerator}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-500 transition-all inline-flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Story</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => {
            const totalDuration = proj.scenes.reduce((acc, s) => {
              const num = parseInt(s.duration) || 5;
              return acc + num;
            }, 0);

            return (
              <div
                key={proj.id}
                className="group bg-slate-900/80 hover:bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                      {proj.category}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proj.status === 'Completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : proj.status === 'In Production'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}>
                      {proj.status}
                    </span>
                  </div>

                  <h3
                    onClick={() => onSelectProject(proj)}
                    className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
                  >
                    {proj.title}
                  </h3>

                  <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                    {proj.logline}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-1.5">
                      <Film className="w-4 h-4 text-indigo-400" />
                      <span>{proj.scenes.length} Scenes</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span>~{totalDuration}s duration</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <Users className="w-4 h-4 text-pink-400" />
                      <span className="truncate max-w-[100px]">{proj.targetAudience}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onDuplicateProject(proj)}
                        title="Duplicate Project"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        title="Delete Project"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => onSelectProject(proj)}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all flex items-center space-x-2 shadow-md shadow-indigo-600/20 group-hover:translate-x-0.5"
                    >
                      <span>Open Editor</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
