import React, { useState } from 'react';
import { ChangeStoryProject } from '../types';
import { X, Sparkles, Loader2, Film } from 'lucide-react';

interface AiGeneratorModalProps {
  onClose: () => void;
  onStoryGenerated: (project: ChangeStoryProject) => void;
}

export const AiGeneratorModal: React.FC<AiGeneratorModalProps> = ({
  onClose,
  onStoryGenerated,
}) => {
  const [topic, setTopic] = useState('');
  const [goal, setGoal] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState<'Inspirational' | 'Professional' | 'Urgent' | 'Playful' | 'Empathetic'>('Inspirational');
  const [category, setCategory] = useState<'Business' | 'Brand' | 'Personal' | 'Product' | 'Community'>('Business');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !goal) {
      setError('Please provide both a topic and a goal.');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, goal, audience: audience || 'General Public', tone }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate script from AI');
      }

      const data = await res.json();

      const newProject: ChangeStoryProject = {
        id: `proj-${Date.now()}`,
        title: data.title || topic,
        logline: data.logline || goal,
        category,
        status: 'In Production',
        targetAudience: audience || 'General Stakeholders',
        tone,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        scenes: (data.scenes || []).map((s: any, idx: number) => ({
          id: `scene-${Date.now()}-${idx}`,
          sceneNumber: s.sceneNumber || idx + 1,
          title: s.title || `Scene ${idx + 1}`,
          duration: s.duration || '6s',
          visualPrompt: s.visualPrompt || 'Cinematic visual establishing shot',
          narration: s.narration || '',
          transition: s.transition || 'Fade In',
        })),
      };

      onStoryGenerated(newProject);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error generating script');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">AI Storyteller Assistant</h3>
              <p className="text-xs text-slate-400">Powered by Google Gemini 2.5 Flash</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Change Topic / Subject *
            </label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Transitioning to Remote-First Culture"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Goal / Objective *
            </label>
            <input
              type="text"
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="e.g. Boost employee work-life balance and global collaboration"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e: any) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Business">Business</option>
                <option value="Brand">Brand</option>
                <option value="Personal">Personal</option>
                <option value="Product">Product</option>
                <option value="Community">Community</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e: any) => setTone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Inspirational">Inspirational</option>
                <option value="Professional">Professional</option>
                <option value="Urgent">Urgent</option>
                <option value="Playful">Playful</option>
                <option value="Empathetic">Empathetic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Target Audience
            </label>
            <input
              type="text"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              placeholder="e.g. Employees, Investors, Customers"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:opacity-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Crafting Cinematic Story...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate Change Story</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
