import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, FolderGit2, GitBranchPlus, Star } from 'lucide-react';

const GithubContributions: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const githubStats = [
    {
      icon: FolderGit2,
      label: 'Portfolio Projects',
      value: '5+',
      tone: 'from-cyan-300 to-blue-300',
    },
    {
      icon: GitBranchPlus,
      label: 'Feature Iterations',
      value: '50+',
      tone: 'from-emerald-300 to-teal-300',
    },
    {
      icon: Star,
      label: 'Continuous Learning',
      value: 'Daily',
      tone: 'from-violet-300 to-indigo-300',
    },
  ];

  return (
    <section id="github" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_30%,rgba(34,211,238,0.14),transparent_40%),radial-gradient(circle_at_82%_70%,rgba(59,130,246,0.12),transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">GitHub Contribution</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Open-source rhythm and <span className="text-gradient-brand">consistent execution</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Snapshot of coding activity, repository momentum, and engineering consistency.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="glass-panel overflow-hidden p-6 sm:p-8"
        >
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-2xl font-bold text-white">Ashenafi Bancha on GitHub</h3>
              <p className="mt-1 text-sm text-slate-300">Building products in public, iterating quickly, and refining craft through real code.</p>
            </div>
            <a
              href="https://github.com/Ashenafi-Bancha"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950"
            >
              Visit GitHub Profile
              <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="mask-fade-bottom overflow-hidden rounded-xl border border-slate-700 bg-slate-950/80 p-4">
            <img
              src="https://ghchart.rshah.org/22d3ee/Ashenafi-Bancha"
              alt="GitHub contribution chart for Ashenafi-Bancha"
              className="h-auto w-full"
            />
          </div>
        </motion.div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {githubStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.16 + index * 0.08, duration: 0.4 }}
              className="glass-panel p-5"
            >
              <div className="mb-3 inline-flex rounded-lg border border-slate-700 bg-slate-950 p-2">
                <stat.icon className="text-cyan-200" size={18} />
              </div>
              <p className={`mb-1 bg-gradient-to-r ${stat.tone} bg-clip-text text-3xl font-black text-transparent`}>
                {stat.value}
              </p>
              <p className="text-sm text-slate-300">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GithubContributions;
