
import React from 'react';
import { Project } from './types';
import { 
  Code2, 
  Terminal, 
  Smartphone, 
  Cloud, 
  Cpu, 
  Globe, 
  Layout, 
  Database, 
  Server, 
  Workflow, 
  Zap, 
  ShieldCheck
} from 'lucide-react';

export const SKILLS = {
  'Full-Stack': [
    { name: 'HTML/CSS', icon: <Globe className="w-5 h-5" />, level: 95 },
    { name: 'JavaScript/TS', icon: <Code2 className="w-5 h-5" />, level: 90 },
    { name: 'React', icon: <Layout className="w-5 h-5" />, level: 90 },
    { name: 'Flask/Django', icon: <Database className="w-5 h-5" />, level: 85 }
  ],
  'DevOps & Cloud': [
    { name: 'Docker', icon: <Cpu className="w-5 h-5" />, level: 88 },
    { name: 'Kubernetes', icon: <Workflow className="w-5 h-5" />, level: 80 },
    { name: 'AWS', icon: <Cloud className="w-5 h-5" />, level: 85 },
    { name: 'CI/CD', icon: <Server className="w-5 h-5" />, level: 90 }
  ]
};

export const PRODUCTS: Project[] = [
  {
    id: 'droidlabz',
    title: 'DroidLabZ',
    tagline: 'Revolutionary visual Android builder',
    description: 'Build high-end Android apps without syntax roadblocks using a visual drag-and-drop interface.',
    longDescription: 'DroidLabZ is a revolutionary visual Android builder that lets users create powerful apps visually, speeding up development for both beginners and advanced users. Build high-end Android apps without syntax roadblocks. Ideal for students, startups, and non-coders, emphasizing speed, simplicity, and power.',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&q=80&w=800',
    tags: ['Android', 'No-Code', 'Visual Logic', 'React'],
    isProduct: true,
    link: 'https://droidlabz.com',
    features: [
      'Visual drag-and-drop interface',
      'Zero syntax roadblocks',
      'Ideal for students & startups',
      'Rapid prototyping & deployment'
    ]
  },
  {
    id: 'bean-attendance',
    title: 'BEAN Attendance',
    tagline: 'Beacon-powered automation for institutional tracking',
    description: 'Zero-friction attendance system using Beacon and mobile-based detection for institutions.',
    longDescription: 'BEAN Attendance is a smart, beacon-enabled attendance tracker for colleges and institutions. It automates attendance, reduces manual errors, and gives real-time insights to admins and teachers. A zero-friction attendance system with beacon + mobile-based detection, designed for schools, colleges, and enterprises. Focused on accuracy, automation, and scalability.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800',
    tags: ['IoT', 'Beacon', 'Automation', 'Enterprise'],
    isProduct: true,
    link: 'https://beanattendance.nikzdevz.in',
    features: [
      'Zero-friction attendance system',
      'Beacon + mobile detection',
      'Real-time admin insights',
      'Highly scalable infrastructure'
    ]
  },
  {
    id: 'devzstore',
    title: 'Devzstore',
    tagline: 'The ultimate App Inventor companion',
    description: 'One-click native library integration and plugin marketplace for App Inventor creators.',
    longDescription: 'Devzstore is the best App Inventor companion tool to integrate external libraries and advanced features, helping creators push App Inventor projects beyond default limits. It features one-click native library integration and a plugin marketplace concept that saves developers time and complexity, highlighting pure developer productivity.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
    tags: ['Marketplace', 'SDK', 'Android', 'Developer Tools'],
    isProduct: true,
    link: 'https://devzstore.nikzdevz.in',
    features: [
      'One-click native library integration',
      'Plugin marketplace concept',
      'Saves dev time & complexity',
      'Native feature expansion'
    ]
  },
  {
    id: 'kraftresume',
    title: 'Kraftresume',
    tagline: 'Smart resume engine',
    description: 'One profile to multiple ATS-friendly resumes. Built for job seekers and professionals.',
    longDescription: 'Kraftresume is a smart resume engine where you enter your data once and generate multiple ATS-friendly resumes tailored to different job roles and companies. Using one profile to create multiple ATS-optimized resumes, it features role-based generation built specifically for job seekers and professionals, emphasizing intelligence and automation.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
    tags: ['SaaS', 'AI', 'Resume', 'ATS-Optimization'],
    isProduct: true,
    link: 'https://kraftresume.com',
    features: [
      'One profile → Multiple resumes',
      'ATS-optimized generation',
      'Role-based intelligence',
      'Automated formatting engine'
    ]
  }
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'cloud-orchestrator',
    title: 'Nexus Cloud Orchestrator',
    description: 'Custom Kubernetes control plane for multi-region hybrid deployments.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=800',
    tags: ['DevOps', 'Go', 'Kubernetes', 'AWS']
  },
  {
    id: 'fintech-gateway',
    title: 'SecurePay Gateway',
    description: 'Scalable payment processing engine with fraud detection capabilities.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Redis']
  },
  {
    id: 'streaming-platform',
    title: 'VibeStream',
    description: 'Low-latency live streaming infrastructure for gaming communities.',
    image: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800',
    tags: ['WebRTC', 'Django', 'Socket.io', 'Docker']
  },
  {
    id: 'ai-code-analyst',
    title: 'CodeGuard AI',
    description: 'Automated CI/CD security scanner that detects vulnerabilities in real-time.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    tags: ['Python', 'ML', 'Terraform', 'CI/CD']
  }
];

export const TESTIMONIALS = [
  {
    name: "Sarah Johnson",
    role: "CTO @ TechFlow",
    quote: "Nikhil is a wizard with DevOps. He transformed our deployment cycle from hours to minutes."
  },
  {
    name: "Marco Rossi",
    role: "Founder @ DroidSpark",
    quote: "The DroidLabZ platform is a game-changer for our internal prototyping team."
  },
  {
    name: "Anita Desai",
    role: "Head of Product @ EduGate",
    quote: "Professional, reliable, and deeply technical. The BEAN Attendance system worked flawlessly."
  }
];
