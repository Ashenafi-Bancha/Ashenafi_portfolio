import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe2, Languages, MessageSquareQuote } from 'lucide-react';

const Achievements: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  const translationProjects = [
    {
      icon: MessageSquareQuote,
      title: 'Telebirr Phase 1 translation',
      description:
        'Localized core onboarding and transaction experience to ensure language clarity and usability for broader Ethiopian audiences.',
      gradient: 'from-cyan-300 to-blue-300',
    },
    {
      icon: Languages,
      title: 'Telebirr Phase 2 translation',
      description:
        'Contributed to expanded feature localization with language consistency, contextual relevance, and high-quality terminology alignment.',
      gradient: 'from-emerald-300 to-teal-300',
    },
    {
      icon: Globe2,
      title: 'The Chosen Christian Movie translation',
      description:
        'Translated and refined dialogue and narrative context to preserve emotional tone while remaining culturally and linguistically accessible.',
      gradient: 'from-violet-300 to-indigo-300',
    },
  ];

  const languages = ['English', 'Amharic', 'Wolayta'];

  return (
    <section id="translation" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_38%),radial-gradient(circle_at_82%_75%,rgba(16,185,129,0.13),transparent_42%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">Translation & Localization</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">Language & Translation Work</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Professional localization work focused on linguistic precision, contextual clarity, and cross-cultural communication quality.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {translationProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.45 }}
              whileHover={{ y: -6 }}
              className="glass-panel group p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className={`rounded-xl border border-slate-700 bg-gradient-to-r ${project.gradient} p-3 text-slate-950`}>
                  <project.icon size={22} />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200">Localization Project</span>
              </div>

              <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
              <p className="text-sm leading-relaxed text-slate-300">{project.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.45 }}
          className="mt-10 rounded-2xl border border-cyan-300/25 bg-slate-900/80 p-6 sm:p-7"
        >
          <h3 className="text-center text-2xl font-bold text-white">Working Languages</h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            {languages.map((language) => (
              <span
                key={language}
                className="rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100"
              >
                {language}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-5 max-w-3xl text-center text-sm leading-relaxed text-slate-300">
            I focus on preserving intent, clarity, and tone while ensuring every localized experience feels natural for end users.
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
