export interface Scene {
  id: string;
  sceneNumber: number;
  title: string;
  duration: string;
  visualPrompt: string;
  narration: string;
  transition: string;
  backgroundMusic?: string;
}

export interface ChangeStoryProject {
  id: string;
  title: string;
  logline: string;
  category: 'Business' | 'Brand' | 'Personal' | 'Product' | 'Community';
  status: 'Draft' | 'In Production' | 'Completed';
  targetAudience: string;
  tone: 'Inspirational' | 'Professional' | 'Urgent' | 'Playful' | 'Empathetic';
  createdAt: string;
  updatedAt: string;
  scenes: Scene[];
}
