import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface TimelineItem {
  type: 'internship' | 'job';
  title: string;
  organization: string;
  period: string;
  description: string;
  highlights: string[];
}

const Experience: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const timeline: TimelineItem[] = [
    {
      type: 'internship',
      title: 'Full-Stack Developer Intern',
      organization: 'Marota Film and Software College',
      period: '2024',
      description: 'Built and optimized the college web presence and LMS workflows for enrollment, curriculum visibility, and student engagement.',
      highlights: [
        'Implemented responsive UI architecture for key program pages',
        'Contributed backend integration for dynamic content and inquiry flow',
        'Improved user journey from landing to registration',
      ],
    },
    {
      type: 'job',
      title: 'Full-Stack Software Engineer',
      organization: 'Freelance & Product Collaborations',
      period: '2023 - Present',
      description: 'Designing, shipping, and scaling modern web platforms with React, Next.js, Node.js, and data-driven backend systems.',
      highlights: [
        'Delivered multiple products across real estate, education, and social impact sectors',
        'Owned end-to-end scope from UX strategy to deployment readiness',
        'Maintained high standards for performance, accessibility, and clean maintainable code',
      ],
    },
  ];

  const typeTheme: Record<TimelineItem['type'], string> = {
    internship: 'from-cyan-400 to-blue-400',
    job: 'from-emerald-400 to-teal-300',
  };

  return (
    <section id="experience" className="section-shell">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">Professional Experience</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Career timeline with <span className="text-gradient-brand">internships and jobs</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            A progression built on execution, learning velocity, and consistently shipping practical software.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute left-[22px] top-3 hidden h-[calc(100%-24px)] w-[2px] origin-top rounded-full bg-gradient-to-b from-cyan-300 via-blue-400 to-emerald-300 sm:block"
          />

          <div className="space-y-7">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.45 }}
                className="relative sm:pl-16"
              >
                <div className="absolute left-0 top-7 hidden h-11 w-11 items-center justify-center rounded-full border border-slate-600 bg-slate-900 sm:flex">
                  <Briefcase size={18} className="text-cyan-200" />
                </div>

                <article className="glass-panel p-6 sm:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className={`rounded-full bg-gradient-to-r ${typeTheme[item.type]} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-950`}>
                      {item.type}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-slate-400">
                      <Calendar size={12} />
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-cyan-100">{item.organization}</p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">{item.description}</p>

                  <ul className="mt-5 space-y-2">
                    {item.highlights.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-cyan-300" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
