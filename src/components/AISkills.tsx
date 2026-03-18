import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Bot, BrainCircuit, Sparkles, Wand2 } from 'lucide-react';

interface AIToolItem {
  name: string;
  role: string;
  useCase: string;
}

const aiTools: AIToolItem[] = [
  {
    name: 'Cursor',
    role: 'AI Code Editor',
    useCase: 'Fast code generation, refactoring, and context-aware implementation support.',
  },
  {
    name: 'Bolt',
    role: 'Rapid Builder',
    useCase: 'Quick prototyping and accelerating interface-to-feature iteration cycles.',
  },
  {
    name: 'Antigravity',
    role: 'AI Workflow Tool',
    useCase: 'AI-assisted exploration and task acceleration during feature development.',
  },
  {
    name: 'GitHub Copilot',
    role: 'Pair Programmer',
    useCase: 'Inline coding assistance for boilerplate reduction and implementation speed.',
  },
];

const aiCapabilities = [
  'AI-assisted planning and architecture breakdown',
  'Prompting for implementation options and edge-case coverage',
  'Faster debugging through AI-guided reasoning',
  'Refactoring support while keeping codebase readability',
  'Documentation and summary generation for deliverables',
  'Human review and final engineering judgment before shipping',
];

const AISkills: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="ai" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(14,165,233,0.14),transparent_36%),radial-gradient(circle_at_82%_78%,rgba(16,185,129,0.13),transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">AI Workflow</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            AI tools and <span className="text-gradient-brand">applied engineering</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            I use AI tools to accelerate delivery, improve iteration quality, and support stronger development workflows.
          </p>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4 sm:grid-cols-2">
            {aiTools.map((tool, index) => (
              <motion.article
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.08 * index, duration: 0.4 }}
                className="glass-panel p-5"
              >
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200">{tool.role}</p>
                <h3 className="mb-2 text-xl font-bold text-white">{tool.name}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{tool.useCase}</p>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="glass-panel p-6 sm:p-7"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 p-2 text-cyan-100">
                <Bot size={18} />
              </span>
              <h3 className="text-2xl font-bold text-white">AI Working Skills</h3>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-slate-300">
              {aiCapabilities.map((capability) => (
                <li key={capability} className="flex gap-3">
                  <span className="mt-0.5 text-cyan-200">•</span>
                  <span>{capability}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-3 text-center">
                <Sparkles className="mx-auto mb-1 text-cyan-200" size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-cyan-100">Speed</p>
              </div>
              <div className="rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-center">
                <BrainCircuit className="mx-auto mb-1 text-emerald-200" size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-emerald-100">Quality</p>
              </div>
              <div className="rounded-xl border border-violet-300/35 bg-violet-500/10 p-3 text-center">
                <Wand2 className="mx-auto mb-1 text-violet-200" size={16} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.13em] text-violet-100">Iteration</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
};

export default AISkills;
