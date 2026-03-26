import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Rocket, Workflow } from 'lucide-react';
import { heroStats, profile } from '../data/profile';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const strengths = [
    {
      icon: Workflow,
      title: 'Systems Thinking',
      text: 'Designing products with scalable architecture, clear boundaries, and maintainable code paths.',
    },
    {
      icon: Briefcase,
      title: 'Product Delivery',
      text: 'Converting ambiguous product goals into shipped features with measurable business impact.',
    },
    {
      icon: GraduationCap,
      title: 'CS Foundation',
      text: 'Strong grounding in algorithms, data structures, and software engineering fundamentals.',
    },
    {
      icon: Rocket,
      title: 'Execution Speed',
      text: 'Iterating fast without sacrificing reliability, accessibility, or interface quality.',
    },
  ];

  return (
    <section id="about" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(45,212,191,0.12),transparent_40%),radial-gradient(circle_at_95%_80%,rgba(59,130,246,0.15),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            About <span className="text-gradient-brand">Ashenafi</span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
          <motion.article
            initial={{ opacity: 0, x: -34 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="glass-panel shadow-glow p-7 sm:p-10"
          >
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">Ashenafi Bancha</p>

            <p className="mb-5 text-base leading-relaxed text-slate-200 sm:text-lg">
              I am a full-stack engineer and computer science student focused on building products that feel premium,
              perform reliably, and scale cleanly from first users to real growth.
            </p>

            <p className="mb-5 text-sm leading-relaxed text-slate-300 sm:text-base">
              My work sits at the intersection of product strategy and engineering depth: from frontend experience architecture
              to backend API design and database modeling. I care deeply about creating digital systems that are both elegant and dependable.
            </p>

            <p className="mb-8 text-sm leading-relaxed text-slate-300 sm:text-base">
              Based in {profile.location}, I collaborate with teams and founders to ship software that solves meaningful problems
              and represents world-class quality.
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {heroStats.slice(0, 3).map((stat) => (
                <div key={stat.label} className="rounded-xl border border-cyan-300/25 bg-slate-900/80 p-4">
                  <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, x: 34 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="glass-panel p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-lg border border-cyan-300/30 bg-cyan-400/10 p-2 text-cyan-200">
                    <item.icon size={18} />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed text-slate-300">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
