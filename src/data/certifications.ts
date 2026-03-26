import {
  BrainCircuit,
  Database,
  FolderGit2,
  Globe,
  Layers3,
  ServerCog,
  type LucideIcon,
} from 'lucide-react';

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  status: 'Completed' | 'In Progress';
}

export interface CertificationGroup {
  category: string;
  icon: LucideIcon;
  accent: string;
  certifications: Certification[];
}

export const certificationGroups: CertificationGroup[] = [
  {
    category: 'Frontend',
    icon: Layers3,
    accent: 'from-cyan-400/30 to-sky-300/10',
    certifications: [
      {
        title: 'Responsive Web Interface Development',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Advanced React UI Engineering',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
  {
    category: 'Backend',
    icon: ServerCog,
    accent: 'from-emerald-400/30 to-teal-300/10',
    certifications: [
      {
        title: 'Backend API Development',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Scalable Service Architecture',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
  {
    category: 'AI',
    icon: BrainCircuit,
    accent: 'from-violet-400/30 to-fuchsia-300/10',
    certifications: [
      {
        title: 'Applied AI for Software Teams',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Prompt Engineering and AI Workflow Design',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
  {
    category: 'Database',
    icon: Database,
    accent: 'from-blue-400/30 to-indigo-300/10',
    certifications: [
      {
        title: 'Relational Database Design and SQL',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Database Performance and Query Optimization',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
  {
    category: 'Version Control',
    icon: FolderGit2,
    accent: 'from-orange-400/30 to-amber-300/10',
    certifications: [
      {
        title: 'Git and GitHub Collaboration Workflow',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Branch Strategy and Release Management',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
  {
    category: 'Other',
    icon: Globe,
    accent: 'from-pink-400/30 to-rose-300/10',
    certifications: [
      {
        title: 'Cloud / DevOps Certificate',
        issuer: 'Professional Online Learning Platform',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'System Design Certificate',
        issuer: 'Professional Online Learning Platform',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
];