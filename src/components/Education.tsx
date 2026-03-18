import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, GraduationCap, School } from 'lucide-react';

interface EducationItem {
  level: 'University' | 'High School';
  institution: string;
  program?: string;
  period: string;
  description: string;
  status: 'Current' | 'Completed';
}

const educationItems: EducationItem[] = [
  {
    level: 'University',
    institution: 'Addis Ababa University',
    program: 'Department of Computer Science',
    period: '2023 - 2026',
    description:
      'BSc studies focused on software engineering, algorithms, systems thinking, and practical full-stack project development.',
    status: 'Current',
  },
  {
    level: 'High School',
    institution: 'Wolait Liqa Boarding School',
    period: 'Completed',
    description:
      'Built strong foundations in mathematics, science, communication, and disciplined learning in a competitive academic environment.',
    status: 'Completed',
  },
];

const Education: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="education" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.14),transparent_38%),radial-gradient(circle_at_84%_80%,rgba(16,185,129,0.12),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">Education</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Academic foundation behind my <span className="text-gradient-brand">engineering work</span>
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {educationItems.map((item, index) => (
            <motion.article
              key={item.institution}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="glass-panel p-6 sm:p-7"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                    item.level === 'University'
                      ? 'bg-violet-500/20 text-violet-200 border border-violet-300/35'
                      : 'bg-cyan-500/20 text-cyan-200 border border-cyan-300/35'
                  }`}
                >
                  {item.level}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                  <Calendar size={12} />
                  {item.period}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    item.status === 'Current'
                      ? 'border-amber-400/40 bg-amber-500/10 text-amber-200'
                      : 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-2.5">
                  {item.level === 'University' ? (
                    <GraduationCap className="text-violet-200" size={18} />
                  ) : (
                    <School className="text-cyan-200" size={18} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.institution}</h3>
                  {item.program && <p className="mt-1 text-sm font-medium text-cyan-100">{item.program}</p>}
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;