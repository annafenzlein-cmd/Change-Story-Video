import React, { useState } from 'react';
import { ChangeStoryProject } from '../types';
import { X, Download, Copy, Check, FileText, Code } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  project: ChangeStoryProject;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ project, onClose }) => {
  const [exportFormat, setExportFormat] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    let md = `# ${project.title}\n\n`;
    md += `**Logline:** ${project.logline}\n`;
    md += `**Category:** ${project.category} | **Tone:** ${project.tone} | **Audience:** ${project.targetAudience}\n\n`;
    md += `## Storyboard Scenes\n\n`;
    project.scenes.forEach((s) => {
      md += `### Scene ${s.sceneNumber}: ${s.title} (${s.duration})\n`;
      md += `- **Transition:** ${s.transition}\n`;
      md += `- **Visual Prompt:** ${s.visualPrompt}\n`;
      md += `- **Narration:** "${s.narration}"\n\n`;
    });
    return md;
  };

  const content =
    exportFormat === 'markdown' ? generateMarkdown() : JSON.stringify(project, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([content], {
      type: exportFormat === 'markdown' ? 'text/markdown' : 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.toLowerCase().replace(/\s+/g, '-')}.${
      exportFormat === 'markdown' ? 'md' : 'json'
    }`;
    a.click();
    URL.revokeObjectURL(url);
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Export Change Story</h3>
              <p className="text-xs text-slate-400">Download or copy script & storyboard assets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setExportFormat('markdown')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              exportFormat === 'markdown'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Markdown Script</span>
          </button>

          <button
            onClick={() => setExportFormat('json')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center space-x-2 ${
              exportFormat === 'json'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>JSON Project Data</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            readOnly
            rows={12}
            value={content}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-slate-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleCopy}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center space-x-2"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all flex items-center space-x-2 shadow-lg shadow-indigo-600/25"
          >
            <Download className="w-4 h-4" />
            <span>Download File</span>
          </button>
        </div>
      </div>
    </div>
  );
};
