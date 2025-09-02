export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  year: string;
}

export interface Certification {
  year: string;
  title: string;
  issuer: string;
  description: string;
  credential: string;
  link: string;
}

export interface Thought {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
}

export interface WorkExperience {
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