import React, { useState, useEffect } from 'react';
import { ChangeStoryProject } from './types';
import { INITIAL_TEMPLATES } from './data/templates';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProjectEditor } from './components/ProjectEditor';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AiGeneratorModal } from './components/AiGeneratorModal';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [projects, setProjects] = useState<ChangeStoryProject[]>(() => {
    const saved = localStorage.getItem('change_story_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TEMPLATES;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const [showAiModal, setShowAiModal] = useState(false);
  const [previewProject, setPreviewProject] = useState<ChangeStoryProject | null>(null);
  const [exportProject, setExportProject] = useState<ChangeStoryProject | null>(null);

  useEffect(() => {
    localStorage.setItem('change_story_projects', JSON.stringify(projects));
  }, [projects]);

  const handleNewProject = () => {
    const newProj: ChangeStoryProject = {
      id: `proj-${Date.now()}`,
      title: 'Untitled Change Story',
      logline: 'Describe the core narrative and transformation goal...',
      category: 'Business',
      status: 'Draft',
      targetAudience: 'General Stakeholders',
      tone: 'Inspirational',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      scenes: [
        {
          id: `scene-${Date.now()}-1`,
          sceneNumber: 1,
          title: 'Scene 1: The Status Quo',
          duration: '5s',
          visualPrompt: 'Establishing shot showing the current situation',
          narration: 'Before the change, we experienced...',
          transition: 'Fade In',
        },
      ],
    };
    setProjects([newProj, ...projects]);
    setSelectedProjectId(newProj.id);
    setActiveTab('editor');
  };

  const handleUpdateProject = (updated: ChangeStoryProject) => {
    setProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Are you sure you want to delete this change story project?')) {
      setProjects(projects.filter((p) => p.id !== id));
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
        setActiveTab('dashboard');
      }
    }
  };

  const handleDuplicateProject = (proj: ChangeStoryProject) => {
    const duplicated: ChangeStoryProject = {
      ...proj,
      id: `proj-${Date.now()}`,
      title: `${proj.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setProjects([duplicated, ...projects]);
  };

  const handleStoryGenerated = (newProj: ChangeStoryProject) => {
    setProjects([newProj, ...projects]);
    setSelectedProjectId(newProj.id);
    setShowAiModal(false);
    setActiveTab('editor');
  };

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'dashboard') setSelectedProjectId(null);
        }}
        onNewProject={handleNewProject}
        onOpenAiGenerator={() => setShowAiModal(true)}
      />

      <main className="flex-1">
        {activeTab === 'dashboard' || !selectedProject ? (
          <Dashboard
            projects={projects}
            onSelectProject={(proj) => {
              setSelectedProjectId(proj.id);
              setActiveTab('editor');
            }}
            onNewProject={handleNewProject}
            onDeleteProject={handleDeleteProject}
            onDuplicateProject={handleDuplicateProject}
            onOpenAiGenerator={() => setShowAiModal(true)}
          />
        ) : (
          <ProjectEditor
            project={selectedProject}
            onUpdateProject={handleUpdateProject}
            onBack={() => {
              setSelectedProjectId(null);
              setActiveTab('dashboard');
            }}
            onOpenPreview={(proj) => setPreviewProject(proj)}
            onOpenExport={(proj) => setExportProject(proj)}
          />
        )}
      </main>

      {/* Modals */}
      {showAiModal && (
        <AiGeneratorModal
          onClose={() => setShowAiModal(false)}
          onStoryGenerated={handleStoryGenerated}
        />
      )}

      {previewProject && (
        <VideoPlayerModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}

      {exportProject && (
        <ExportModal
          project={exportProject}
          onClose={() => setExportProject(null)}
        />
      )}
    </div>
  );
}
