export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  year: string;
}

export interface Certification {
  id: number;
  year: string;
  title: string;
  issuer: string;
  description: string;
  credential: string;
  link: string;
}

export interface Thought {
  id: number; // Add the ID field here
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
}

export interface WorkExperience {
  id: number;
  year: string;
  role: string;
  company: string;
  description: string;
  tech: string[];
}

export interface SocialLink {
  name: string;
  handle: string;
  url: string;
}