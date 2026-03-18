import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { certificationGroups } from '../data/certifications';

const Certifications: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="certifications" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_42%),radial-gradient(circle_at_85%_80%,rgba(16,185,129,0.12),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">Certifications</p>
          <h2 className="text-4xl font-bold text-white sm:text-5xl">
            Verified learning across <span className="text-gradient-brand">core engineering tracks</span>
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">
            Organized by discipline so you can quickly review frontend, backend, AI, database, version control, and related certificates.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificationGroups.map((group, index) => {
            const GroupIcon = group.icon;

            return (
              <motion.article
                key={group.category}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.06 * index, duration: 0.45 }}
                whileHover={{ y: -6 }}
                className="group glass-panel relative overflow-hidden p-5"
              >
                <div className={`absolute -right-10 -top-10 h-24 w-24 rounded-full bg-gradient-to-br ${group.accent} blur-2xl`} />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-xl border border-slate-700/80 bg-slate-950/80 p-2.5">
                      <GroupIcon className="text-cyan-200" size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{group.category}</h3>
                  </div>

                  <ul className="space-y-3">
                    {group.certifications.map((cert) => (
                      <li key={`${group.category}-${cert.title}`} className="rounded-xl border border-slate-700/70 bg-slate-950/70 p-3">
                        <p className="text-sm font-semibold text-slate-100">{cert.title}</p>
                        <div className="mt-1 flex items-center justify-between gap-2 text-xs text-slate-400">
                          <span>{cert.issuer}</span>
                          <span>{cert.year}</span>
                        </div>
                        <span
                          className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                            cert.status === 'Completed'
                              ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-200'
                              : 'border-amber-400/40 bg-amber-500/10 text-amber-200'
                          }`}
                        >
                          {cert.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;