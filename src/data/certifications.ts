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
        title: 'Frontend Certificate 01',
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Frontend Certificate 02',
        issuer: 'Certificate Provider',
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
        title: 'Backend Certificate 01',
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Backend Certificate 02',
        issuer: 'Certificate Provider',
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
        title: 'AI Certificate 01',
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'AI Certificate 02',
        issuer: 'Certificate Provider',
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
        title: 'Database Certificate 01',
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Database Certificate 02',
        issuer: 'Certificate Provider',
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
        title: 'Git & GitHub Certificate 01',
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'Git & GitHub Certificate 02',
        issuer: 'Certificate Provider',
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
        issuer: 'Certificate Provider',
        year: '2025',
        status: 'Completed',
      },
      {
        title: 'System Design Certificate',
        issuer: 'Certificate Provider',
        year: '2026',
        status: 'In Progress',
      },
    ],
  },
];