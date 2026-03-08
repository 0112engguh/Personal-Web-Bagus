export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  type: 'work' | 'education';
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}
