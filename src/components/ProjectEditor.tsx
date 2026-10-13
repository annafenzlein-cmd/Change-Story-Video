import React, { useState } from 'react';
import { ChangeStoryProject, Scene } from '../types';
import { Play, Plus, Trash2, ArrowUp, ArrowDown, Save, ArrowLeft, Sparkles, Download, Film, Clock, Eye } from 'lucide-react';

interface ProjectEditorProps {
  project: ChangeStoryProject;
  onUpdateProject: (updated: ChangeStoryProject) => void;
  onBack: () => void;
  onOpenPreview: (project: ChangeStoryProject) => void;
  onOpenExport: (project: ChangeStoryProject) => void;
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({
  project,
  onUpdateProject,
  onBack,
  onOpenPreview,
  onOpenExport,
}) => {
  const [activeProject, setActiveProject] = useState<ChangeStoryProject>(project);
  const [activeSceneId, setActiveSceneId] = useState<string>(
    project.scenes[0]?.id || ''
  );

  const handleFieldChange = (field: keyof ChangeStoryProject, value: any) => {
    const updated = { ...activeProject, [field]: value, updatedAt: new Date().toISOString() };
    setActiveProject(updated);
    onUpdateProject(updated);
  };

  const handleSceneChange = (sceneId: string, field: keyof Scene, value: any) => {
    const updatedScenes = activeProject.scenes.map((s) => {
      if (s.id === sceneId) {
        return { ...s, [field]: value };
      }
      return s;
    });
    const updated = { ...activeProject, scenes: updatedScenes, updatedAt: new Date().toISOString() };
    setActiveProject(updated);
    onUpdateProject(updated);
  };

  const handleAddScene = () => {
    const newSceneNum = activeProject.scenes.length + 1;
    const newScene: Scene = {
      id: `scene-${Date.now()}`,
      sceneNumber: newSceneNum,
      title: `Scene ${newSceneNum}: Milestone`,
      duration: '5s',
      visualPrompt: 'Cinematic visual establishing shot with vibrant lighting',
      narration: 'Describe the key turning point or milestone here...',
      transition: 'Fade In',
    };
    const updatedScenes = [...activeProject.scenes, newScene];
    const updated = { ...activeProject, scenes: updatedScenes, updatedAt: new Date().toISOString() };
    setActiveProject(updated);
    onUpdateProject(updated);
    setActiveSceneId(newScene.id);
  };

  const handleDeleteScene = (sceneId: string) => {
    if (activeProject.scenes.length <= 1) {
      alert('A change story must have at least one scene.');
      return;
    }
    const updatedScenes = activeProject.scenes
      .filter((s) => s.id !== sceneId)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
    const updated = { ...activeProject, scenes: updatedScenes, updatedAt: new Date().toISOString() };
    setActiveProject(updated);
    onUpdateProject(updated);
    if (activeSceneId === sceneId) {
      setActiveSceneId(updatedScenes[0].id);
    }
  };

  const handleMoveScene = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= activeProject.scenes.length) return;
    const scenes = [...activeProject.scenes];
    const temp = scenes[index];
    scenes[index] = scenes[newIndex];
    scenes[newIndex] = temp;
    const renumbered = scenes.map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));
    const updated = { ...activeProject, scenes: renumbered, updatedAt: new Date().toISOString() };
    setActiveProject(updated);
    onUpdateProject(updated);
  };

  const activeScene = activeProject.scenes.find((s) => s.id === activeSceneId) || activeProject.scenes[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={activeProject.title}
                onChange={(e) => handleFieldChange('title', e.target.value)}
                className="text-xl md:text-2xl font-bold bg-transparent text-white border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                {activeProject.category}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-1 max-w-xl truncate">
              {activeProject.logline}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
          <button
            onClick={() => onOpenPreview(activeProject)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center space-x-2 shadow-lg shadow-indigo-600/25"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Play Preview</span>
          </button>
          <button
            onClick={() => onOpenExport(activeProject)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Metadata settings bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Category
          </label>
          <select
            value={activeProject.category}
            onChange={(e) => handleFieldChange('category', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="Business">Business</option>
            <option value="Brand">Brand</option>
            <option value="Personal">Personal</option>
            <option value="Product">Product</option>
            <option value="Community">Community</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Status
          </label>
          <select
            value={activeProject.status}
            onChange={(e) => handleFieldChange('status', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="Draft">Draft</option>
            <option value="In Production">In Production</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Target Audience
          </label>
          <input
            type="text"
            value={activeProject.targetAudience}
            onChange={(e) => handleFieldChange('targetAudience', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Tone
          </label>
          <select
            value={activeProject.tone}
            onChange={(e) => handleFieldChange('tone', e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="Inspirational">Inspirational</option>
            <option value="Professional">Professional</option>
            <option value="Urgent">Urgent</option>
            <option value="Playful">Playful</option>
            <option value="Empathetic">Empathetic</option>
          </select>
        </div>
      </div>

      {/* Main Storyboard Editor Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scene List (Timeline) */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2">
              <Film className="w-4 h-4 text-indigo-400" />
              <span>Storyboard Scenes</span>
            </h3>
            <button
              onClick={handleAddScene}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-all flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Scene</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {activeProject.scenes.map((scene, idx) => {
              const isActive = activeScene?.id === scene.id;
              return (
                <div
                  key={scene.id}
                  onClick={() => setActiveSceneId(scene.id)}
                  className={`group p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md shadow-indigo-500/10'
                      : 'bg-slate-900/80 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {scene.sceneNumber}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {scene.title}
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center space-x-2 mt-0.5">
                        <span>{scene.duration}</span>
                        <span>•</span>
                        <span className="truncate">{scene.transition}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleMoveScene(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleMoveScene(idx, 'down')}
                      disabled={idx === activeProject.scenes.length - 1}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleDeleteScene(scene.id)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Scene Detail Inspector */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-6">
          {activeScene ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Scene #{activeScene.sceneNumber} Editor
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {activeScene.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Duration</label>
                    <input
                      type="text"
                      value={activeScene.duration}
                      onChange={(e) => handleSceneChange(activeScene.id, 'duration', e.target.value)}
                      className="w-24 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Transition</label>
                    <select
                      value={activeScene.transition}
                      onChange={(e) => handleSceneChange(activeScene.id, 'transition', e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Fade In">Fade In</option>
                      <option value="Slide Left">Slide Left</option>
                      <option value="Zoom In">Zoom In</option>
                      <option value="Wipe Right">Wipe Right</option>
                      <option value="Cross Dissolve">Cross Dissolve</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Scene Title
                  </label>
                  <input
                    type="text"
                    value={activeScene.title}
                    onChange={(e) => handleSceneChange(activeScene.id, 'title', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Visual Prompt & Art Direction
                  </label>
                  <textarea
                    rows={3}
                    value={activeScene.visualPrompt}
                    onChange={(e) => handleSceneChange(activeScene.id, 'visualPrompt', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="Describe the visual imagery, lighting, mood, and actions..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Voiceover / Narration Script
                  </label>
                  <textarea
                    rows={4}
                    value={activeScene.narration}
                    onChange={(e) => handleSceneChange(activeScene.id, 'narration', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                    placeholder="What does the narrator say during this scene?"
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 text-slate-500">
              Select a scene from the left to edit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
