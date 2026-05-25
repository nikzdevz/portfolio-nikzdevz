
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  link?: string;
  isProduct?: boolean;
  tagline?: string;
  features?: string[];
}

export type Theme = 'light' | 'dark';
