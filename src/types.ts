export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'cv' | 'nlp' | 'graph' | 'agents' | 'dev' | 'all';
  codeUrl?: string;
  demoUrl?: string;
  paperUrl?: string;
  liveUrl?: string;
  metrics: { label: string; value: string }[];
  techDetails: string[];
  playground: {
    type: 'predictive' | 'vision' | 'agent' | 'rag' | 'transformer' | 'appointment';
    placeholder: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 1 to 5
  description: string;
  years: number;
  projects: string[]; // matching Project IDs
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: Skill[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
