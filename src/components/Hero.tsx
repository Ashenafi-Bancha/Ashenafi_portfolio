import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles } from 'lucide-react';
import { IconType } from 'react-icons';
import { FaEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import {
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
} from 'react-icons/si';
import { heroHighlights, heroStats, profile } from '../data/profile';
import { useTheme } from '../context/useTheme';

interface FloatingTech {
  label: string;
  icon: IconType;
  positionClass: string;
  glowClass: string;
  duration: number;
}

const floatingTech: FloatingTech[] = [
  {
    label: 'React',
    icon: SiReact,
    positionClass: '-top-6 left-6',
    glowClass: 'text-cyan-300',
    duration: 4.5,
  },
  {
    label: 'Next.js',
    icon: SiNextdotjs,
    positionClass: 'top-10 -right-5',
    glowClass: 'text-slate-200',
    duration: 5.2,
  },
  {
    label: 'Node.js',
    icon: SiNodedotjs,
    positionClass: 'bottom-24 -left-5',
    glowClass: 'text-emerald-300',
    duration: 4.8,
  },
  {
    label: 'PostgreSQL',
    icon: SiPostgresql,
    positionClass: '-bottom-6 right-10',
    glowClass: 'text-blue-300',
    duration: 5.7,
  },
  {
    label: 'MongoDB',
    icon: SiMongodb,
    positionClass: 'bottom-1/2 -right-6',
    glowClass: 'text-emerald-200',
    duration: 5.4,
  },
  {
    label: 'TailwindCSS',
    icon: SiTailwindcss,
    positionClass: 'top-1/2 -left-7',
    glowClass: 'text-cyan-200',
    duration: 4.9,
  },
];

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const heroPhotos = [
    {
      id: 'professional',
      src: profile.photos.professional,
      alt: 'Professional portrait in suit',
      label: 'Professional',
    },
    {
      id: 'coding',
      src: profile.photos.coding,
      alt: 'Ashenafi coding on a computer',
      label: 'Coding',
    },
  ];

  const socialLinks: { label: string; icon: IconType; href: string; lightClass: string; darkClass: string }[] = [
    {
      label: 'GitHub',
      icon: FaGithub,
      href: profile.social.github,
      lightClass: 'text-[#181717] hover:border-slate-500/60 hover:bg-slate-100',
      darkClass: 'text-[#f0f6fc] hover:border-slate-400/60 hover:bg-slate-800',
    },
    {
      label: 'LinkedIn',
      icon: FaLinkedinIn,
      href: profile.social.linkedin,
      lightClass: 'text-[#0A66C2] hover:border-[#0A66C2]/60 hover:bg-[#0A66C2]/10',
      darkClass: 'text-[#0A66C2] hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/20',
    },
    {
      label: 'Email',
      icon: FaEnvelope,
      href: `mailto:${profile.email}`,
      lightClass: 'text-[#EA4335] hover:border-[#EA4335]/60 hover:bg-[#EA4335]/10',
      darkClass: 'text-[#EA4335] hover:border-[#EA4335]/70 hover:bg-[#EA4335]/20',
    },
    {
      label: 'Telegram',
      icon: FaTelegramPlane,
      href: profile.social.telegram,
      lightClass: 'text-[#229ED9] hover:border-[#229ED9]/60 hover:bg-[#229ED9]/10',
      darkClass: 'text-[#229ED9] hover:border-[#229ED9]/70 hover:bg-[#229ED9]/20',
    },
    {
      label: 'Facebook',
      icon: FaFacebookF,
      href: profile.social.facebook,
      lightClass: 'text-[#1877F2] hover:border-[#1877F2]/60 hover:bg-[#1877F2]/10',
      darkClass: 'text-[#1877F2] hover:border-[#1877F2]/70 hover:bg-[#1877F2]/20',
    },
    {
      label: 'WhatsApp',
      icon: FaWhatsapp,
      href: profile.social.whatsapp,
      lightClass: 'text-[#25D366] hover:border-[#25D366]/60 hover:bg-[#25D366]/10',
      darkClass: 'text-[#25D366] hover:border-[#25D366]/70 hover:bg-[#25D366]/20',
    },
  ];

  const valuePoints = [
    'Product architecture that scales cleanly',
    'Pixel-level frontend quality with strong UX systems',
    'Reliable backend services, APIs, and data models',
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const offset = 88;
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section id="home" className="section-shell min-h-screen pt-36 pb-20">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.24, 0.4, 0.24] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute -top-20 -left-24 h-80 w-80 rounded-full bg-cyan-400/30 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.14, 1], opacity: [0.18, 0.3, 0.18] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute right-0 top-32 h-80 w-80 rounded-full bg-emerald-400/25 blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="mb-7 grid grid-cols-2 gap-3 sm:gap-4"
          >
            {heroPhotos.map((photo, index) => (
              <motion.figure
                key={photo.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`group relative overflow-hidden rounded-2xl border shadow-xl ${
                  isLight
                    ? 'border-slate-300 bg-white'
                    : 'border-slate-700/80 bg-slate-900/85'
                }`}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" className="h-44 w-full object-cover sm:h-48" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/12 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-3">
                  <span className="inline-flex rounded-full border border-cyan-300/35 bg-slate-950/65 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-100">
                    {photo.label}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
              isLight
                ? 'border-cyan-600/35 bg-white/90 text-cyan-700'
                : 'border-cyan-300/35 bg-slate-900/70 text-cyan-200'
            }`}
          >
            <Sparkles size={14} />
            {profile.availability}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`mb-2 text-sm font-semibold uppercase tracking-[0.22em] ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            Ashenafi Bancha
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className={`mb-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            <span className="block text-gradient-brand">Full-Stack Software Engineer</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className={`mb-6 max-w-2xl text-lg font-semibold ${isLight ? 'text-slate-700' : 'text-slate-200'}`}
          >
            Computer Science Student | Builder of Scalable Digital Systems
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className={`mb-8 max-w-2xl text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}
          >
            {profile.heroSummary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 flex flex-wrap gap-2"
          >
            {heroHighlights.map((item) => (
              <span
                key={item}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  isLight
                    ? 'border-slate-300 bg-white/90 text-slate-700'
                    : 'border-slate-700/80 bg-slate-900/80 text-slate-200'
                }`}
              >
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mb-8 flex flex-wrap gap-3"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30"
            >
              View Projects
              <ArrowRight size={18} />
            </motion.button>

            <motion.a
              href={profile.resumeUrl}
              download
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-800'
                  : 'border-slate-600 bg-slate-900/85 text-slate-100'
              }`}
            >
              <Download size={18} />
              Download CV
            </motion.a>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold ${
                isLight
                  ? 'border-emerald-600/35 bg-emerald-50 text-emerald-800'
                  : 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200'
              }`}
            >
              Contact
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mb-10 flex gap-3"
          >
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.label === 'Email' ? undefined : '_blank'}
                rel={link.label === 'Email' ? undefined : 'noopener noreferrer'}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-xl border p-3 transition-colors ${
                  isLight
                    ? `border-slate-300 bg-white ${link.lightClass}`
                    : `border-slate-700 bg-slate-900/75 ${link.darkClass}`
                }`}
                aria-label={link.label}
              >
                <link.icon size={20} />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-xl border px-4 py-3 ${
                  isLight
                    ? 'border-slate-300 bg-white'
                    : 'border-slate-700/80 bg-slate-900/70'
                }`}
              >
                <p className={`text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>{stat.value}</p>
                <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.7 }}
          className="relative mx-auto max-w-xl"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 0.35, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="glass-panel shadow-glow relative overflow-hidden p-7 sm:p-8"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.2),transparent_35%),radial-gradient(circle_at_100%_100%,rgba(52,211,153,0.15),transparent_40%)]" />

            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Engineering Vision</p>
                  <h3 className={`mt-2 text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Designing systems for product scale
                  </h3>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 font-black text-slate-950">
                  {profile.initials}
                </div>
              </div>

              <p className={`mb-6 text-sm leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                I turn complex requirements into clean digital experiences with modern frontend craft and dependable backend execution.
              </p>

              <div className="mb-6 space-y-3">
                {valuePoints.map((point, index) => (
                  <div key={point} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-200">
                      {index + 1}
                    </span>
                    <p className={`text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>{point}</p>
                  </div>
                ))}
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  isLight
                    ? 'border-slate-300 bg-white/90'
                    : 'border-slate-700/80 bg-slate-950/80'
                }`}
              >
                <p className={`text-xs uppercase tracking-[0.2em] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Base</p>
                <p className={`mt-1 text-lg font-semibold ${isLight ? 'text-slate-900' : 'text-white'}`}>{profile.location}</p>
                <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Open to remote collaborations and global opportunities.
                </p>
              </div>
            </div>
          </motion.div>

          {floatingTech.map((tech) => (
            <motion.div
              key={tech.label}
              animate={{ y: [0, -14, 0], rotate: [0, 6, 0] }}
              transition={{ duration: tech.duration, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute hidden rounded-xl border p-3 shadow-xl lg:block ${tech.positionClass} ${
                isLight
                  ? 'border-slate-300 bg-white/90'
                  : 'border-slate-600/70 bg-slate-900/85'
              }`}
              title={tech.label}
            >
              <tech.icon size={22} className={tech.glowClass} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
