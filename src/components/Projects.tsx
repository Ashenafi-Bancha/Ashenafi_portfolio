import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { useTheme } from '../context/useTheme';

interface Project {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  {
    title: 'Project Name 01',
    description:
      'Short summary for this project. Replace this text with your project problem, solution, and impact.',
    image: 'https://placehold.co/1200x800/0f172a/67e8f9?text=Project+Preview+01',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/your-username/project-name-01',
    liveUrl: 'https://your-project-01.vercel.app',
  },
  {
    title: 'Project Name 02',
    description:
      'Short summary for this project. Replace this text with your project problem, solution, and impact.',
    image: 'https://placehold.co/1200x800/111827/34d399?text=Project+Preview+02',
    techStack: ['Next.js', 'TailwindCSS', 'Supabase'],
    githubUrl: 'https://github.com/your-username/project-name-02',
    liveUrl: 'https://your-project-02.vercel.app',
  },
  {
    title: 'Project Name 03',
    description:
      'Short summary for this project. Replace this text with your project problem, solution, and impact.',
    image: 'https://placehold.co/1200x800/0b1220/38bdf8?text=Project+Preview+03',
    techStack: ['Vite', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/your-username/project-name-03',
    liveUrl: 'https://your-project-03.vercel.app',
  },
  {
    title: 'Project Name 04',
    description:
      'Short summary for this project. Replace this text with your project problem, solution, and impact.',
    image: 'https://placehold.co/1200x800/0f172a/f97316?text=Project+Preview+04',
    techStack: ['Next.js', 'Prisma', 'PostgreSQL'],
    githubUrl: 'https://github.com/your-username/project-name-04',
    liveUrl: 'https://your-project-04.vercel.app',
  },
  {
    title: 'Project Name 05',
    description:
      'Short summary for this project. Replace this text with your project problem, solution, and impact.',
    image: 'https://placehold.co/1200x800/1e293b/facc15?text=Project+Preview+05',
    techStack: ['React', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/your-username/project-name-05',
    liveUrl: 'https://your-project-05.vercel.app',
  },
];

const Projects: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section id="projects" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_80%_85%,rgba(59,130,246,0.12),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${isLight ? 'text-cyan-700' : 'text-cyan-200/90'}`}>
            Featured Projects
          </p>
          <h2 className={`text-4xl font-bold sm:text-5xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Selected builds with <span className="text-gradient-brand">production ambition</span>
          </h2>
        </motion.div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 34 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08 * index, duration: 0.5 }}
              whileHover={{ y: -8 }}
              className="group glass-panel overflow-hidden"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t to-transparent ${
                    isLight ? 'from-slate-100/70' : 'from-slate-950'
                  } opacity-70`}
                />
              </div>

              <div className="p-5">
                <h3 className={`mb-3 text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{project.title}</h3>
                <p className={`mb-4 text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        isLight
                          ? 'border-slate-300 bg-white text-slate-700'
                          : 'border-slate-700 bg-slate-900/80 text-slate-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wide transition-colors ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-800 hover:border-cyan-500/70 hover:text-cyan-700'
                        : 'border-slate-600 bg-slate-900 text-slate-200 hover:border-cyan-300/70 hover:text-cyan-200'
                    }`}
                  >
                    <Github size={15} />
                    GitHub
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-950"
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://github.com/your-username"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold ${
              isLight
                ? 'border-cyan-600/35 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'
                : 'border-cyan-300/40 bg-cyan-400/10 text-cyan-100 hover:bg-cyan-400/15'
            }`}
          >
            Explore More Repositories
            <ArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
