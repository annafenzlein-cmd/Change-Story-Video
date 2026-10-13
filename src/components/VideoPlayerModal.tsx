import React, { useState, useEffect } from 'react';
import { ChangeStoryProject, Scene } from '../types';
import { X, Play, Pause, SkipForward, SkipBack, Volume2, Film, Sparkles } from 'lucide-react';

interface VideoPlayerModalProps {
  project: ChangeStoryProject;
  onClose: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  project,
  onClose,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const scenes = project.scenes;
  const currentScene: Scene = scenes[currentSceneIndex] || scenes[0];

  useEffect(() => {
    let timer: any;
    if (isPlaying && scenes.length > 0) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentSceneIndex < scenes.length - 1) {
              setCurrentSceneIndex((c) => c + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentSceneIndex, scenes.length]);

  const handleNext = () => {
    if (currentSceneIndex < scenes.length - 1) {
      setCurrentSceneIndex((c) => c + 1);
      setProgress(0);
    }
  };

  const handlePrev = () => {
    if (currentSceneIndex > 0) {
      setCurrentSceneIndex((c) => c - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Film className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{project.title}</h3>
              <p className="text-xs text-slate-400">Preview Mode • Scene {currentSceneIndex + 1} of {scenes.length}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage Simulator */}
        <div className="relative aspect-video bg-slate-950 flex flex-col items-center justify-center p-8 text-center overflow-hidden">
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-purple-950/30 to-pink-950/20 pointer-events-none" />

          {/* Scene Content */}
          <div className="relative z-10 max-w-2xl space-y-6 animate-fadeIn">
            <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              {currentScene?.transition} • {currentScene?.duration}
            </span>

            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {currentScene?.title}
            </h2>

            <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 text-slate-300 text-sm md:text-base italic shadow-inner">
              "{currentScene?.narration}"
            </div>

            <p className="text-xs text-slate-500 flex items-center justify-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Visual: {currentScene?.visualPrompt}</span>
            </p>
          </div>

          {/* Subtitle Bar at bottom */}
          <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-medium text-center">
            {currentScene?.narration}
          </div>
        </div>

        {/* Player Controls */}
        <div className="bg-slate-950 p-4 space-y-3 border-t border-slate-800">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Volume2 className="w-4 h-4 text-indigo-400" />
              <span>AI Voiceover Simulated</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrev}
                disabled={currentSceneIndex === 0}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 disabled:opacity-30 transition-colors"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-600/30"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              </button>

              <button
                onClick={handleNext}
                disabled={currentSceneIndex === scenes.length - 1}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 disabled:opacity-30 transition-colors"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-400">
              Scene {currentSceneIndex + 1} / {scenes.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
