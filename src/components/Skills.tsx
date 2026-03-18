import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gauge, GitBranch, Layers3, Rocket, ShieldCheck } from 'lucide-react';
import { IconType } from 'react-icons';
import {
  SiExpress,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';

interface StackItem {
  name: string;
  icon: IconType;
  category: string;
  summary: string;
  proof: string;
  accent: string;
}

const stack: StackItem[] = [
  {
    name: 'React',
    icon: SiReact,
    category: 'Frontend',
    summary: 'Reusable component architecture, state-driven interfaces, and polished interaction design.',
    proof: 'Production UIs and section-driven portfolio systems.',
    accent: 'from-sky-400 to-cyan-300',
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    category: 'Full-Stack Frontend',
    summary: 'Modern React app structure for scalable routing, rendering, and maintainable code organization.',
    proof: 'Optimized builds and modular page architecture.',
    accent: 'from-slate-200 to-slate-400',
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    category: 'Backend',
    summary: 'Service-focused backend logic, API integration, and reliable app-side orchestration.',
    proof: 'Real form submission flows and serverless integration.',
    accent: 'from-emerald-300 to-green-400',
  },
  {
    name: 'Express',
    icon: SiExpress,
    category: 'API Layer',
    summary: 'Structured REST endpoints, middleware patterns, and predictable request lifecycles.',
    proof: 'Clean endpoint design for portfolio and contact workflows.',
    accent: 'from-zinc-200 to-zinc-400',
  },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    category: 'Relational Database',
    summary: 'Schema-aware relational modeling with dependable querying and data consistency.',
    proof: 'Structured messaging and backend-ready data design.',
    accent: 'from-blue-400 to-indigo-400',
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    category: 'Document Database',
    summary: 'Flexible document modeling for features that benefit from evolving data structures.',
    proof: 'NoSQL-ready backend expansion strategy.',
    accent: 'from-emerald-300 to-lime-300',
  },
  {
    name: 'TailwindCSS',
    icon: SiTailwindcss,
    category: 'Design System',
    summary: 'Fast visual implementation with utility-first consistency and responsive precision.',
    proof: 'Accessible, theme-aware, production-grade styling.',
    accent: 'from-cyan-300 to-sky-300',
  },
  {
    name: 'Git',
    icon: SiGit,
    category: 'Collaboration',
    summary: 'Reliable source-control workflow for iterative delivery and safer team development.',
    proof: 'Feature-based workflow and incremental release discipline.',
    accent: 'from-orange-300 to-amber-300',
  },
];

const professionalSignals = [
  {
    icon: Layers3,
    title: 'Architecture Thinking',
    text: 'I design systems with clarity in boundaries, maintainability, and future scaling in mind.',
  },
  {
    icon: Gauge,
    title: 'Performance Mindset',
    text: 'I prioritize fast interfaces, efficient rendering, and practical optimization decisions.',
  },
  {
    icon: GitBranch,
    title: 'Workflow Discipline',
    text: 'I ship through iterative commits, clear change tracking, and dependable collaboration patterns.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Focus',
    text: 'I value stable behavior, clean implementation, and production-ready execution standards.',
  },
  {
    icon: Rocket,
    title: 'Delivery Velocity',
    text: 'I move quickly from idea to implementation while preserving code quality and UX consistency.',
  },
];

const Skills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="skills" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(34,211,238,0.14),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(16,185,129,0.14),transparent_35%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">Tech Stack</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Core technologies and <span className="text-gradient-brand">production skills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A modern professional developer portfolio should communicate stack depth, engineering quality, and shipping readiness.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.06 * index, duration: 0.4 }}
              className="glass-panel p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-3">
                  <item.icon className="text-cyan-200" size={22} />
                </div>
                <span className={`bg-gradient-to-r ${item.accent} bg-clip-text text-[11px] font-semibold uppercase tracking-[0.14em] text-transparent`}>
                  {item.category}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-bold text-white">{item.name}</h3>
              <p className="mb-3 text-sm leading-relaxed text-slate-300">{item.summary}</p>
              <p className="text-xs text-slate-400">{item.proof}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          {professionalSignals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.24 + index * 0.07, duration: 0.38 }}
              className="glass-panel p-4"
            >
              <signal.icon className="mb-3 text-cyan-200" size={18} />
              <h4 className="mb-2 text-sm font-semibold text-white">{signal.title}</h4>
              <p className="text-xs leading-relaxed text-slate-300">{signal.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
