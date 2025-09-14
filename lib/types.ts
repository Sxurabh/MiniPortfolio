// sxurabh/miniportfolio/MiniPortfolio-ExperimentalBranch/lib/types.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
  year: string;
  createdAt: Date; // <-- ADD THIS LINE
}

export interface Certification {
  id: number;
  year: string;
  title: string;
  issuer: string;
  description: string;
  credential: string;
  link: string;
  createdAt: Date;
}

export interface Thought {
  id: number;
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
  url:string;
}

export interface MessageWithUser {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    email: string | null;
  };
}