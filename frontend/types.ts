export type ProjectStatus = 'live' | 'in-development' | 'classified';
export type SceneKind = 'cinema' | 'android' | 'desk' | 'classified' | 'beacon' | 'attendance';
export type ProjectComposition = 'theatre' | 'canvas' | 'surround' | 'vault';

export interface Project {
  id: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  status: ProjectStatus;
  statusLabel: string;
  link?: string;
  features: string[];
  focus?: boolean;
  scene: SceneKind;
  index: string;
  composition?: ProjectComposition;
  suite?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}