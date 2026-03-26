import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Sparkles } from 'lucide-react';
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

interface TypedWord {
  text: string;
  highlight?: boolean;
}

const toTypedWords = (parts: Array<{ text: string; highlight?: boolean }>): TypedWord[] =>
  parts.flatMap((part) => {
    const words = part.text.trim().split(/\s+/).filter(Boolean);
    return words.map((word, index) => ({
      text: `${word}${index < words.length - 1 ? ' ' : ''}`,
      highlight: part.highlight,
    }));
  });

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

const rotatingIntroLines = [
  'I design and develop end-to-end web applications.',
  'I create modern frontends with scalable backend systems.',
  'I focus on clean architecture, speed, and real user impact.',
];

const Hero: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const primaryIntroWords = useMemo(
    () =>
      toTypedWords([
        { text: 'Hi, I am ' },
        { text: ' Ashenafi Bancha', highlight: true },
        { text: ', Full Stack Developer' },
      ]),
    []
  );
  const localizationWords = useMemo(
    () =>
      toTypedWords([
        {
          text: 'Localization & Translation: I also work on localization, translating and interpreting English and Amharic into Wolayta with cultural nuance and contextual clarity.',
        },
      ]),
    []
  );

  const [visiblePrimaryWordCount, setVisiblePrimaryWordCount] = useState(0);
  const [visibleLocalizationWordCount, setVisibleLocalizationWordCount] = useState(0);
  const [activeIntroLineIndex, setActiveIntroLineIndex] = useState(0);
  const [visibleWordCount, setVisibleWordCount] = useState(0);
  const introWordSpeed = 280;
  const introHoldDuration = 2000;

  const activeIntroWords = useMemo(
    () => rotatingIntroLines[activeIntroLineIndex].trim().split(/\s+/).filter(Boolean),
    [activeIntroLineIndex]
  );

  const getLocalizationWordClass = (word: TypedWord, index: number) => {
    const cleanedWord = word.text.trim().replace(/[.,]/g, '');

    if (index === 0) {
      return isLight ? 'text-[#1A73E8]' : 'text-[#8AB4F8]';
    }

    if (cleanedWord === '&') {
      return isLight ? 'text-[#FBBC04]' : 'text-[#FDD663]';
    }

    if (cleanedWord.startsWith('Translation')) {
      return isLight ? 'text-[#EA4335]' : 'text-[#F28B82]';
    }

    if (cleanedWord.toLowerCase().includes('wolayta')) {
      return isLight
        ? 'bg-gradient-to-r from-red-600 via-slate-900 to-amber-400 bg-clip-text text-transparent font-extrabold'
        : 'bg-gradient-to-r from-red-400 via-slate-200 to-yellow-300 bg-clip-text text-transparent font-extrabold';
    }

    return isLight ? 'text-slate-700' : 'text-slate-200';
  };

  useEffect(() => {
    if (visiblePrimaryWordCount >= primaryIntroWords.length) {
      return;
    }

    const primaryTimer = window.setTimeout(() => {
      setVisiblePrimaryWordCount((prev) => prev + 1);
    }, introWordSpeed);

    return () => window.clearTimeout(primaryTimer);
  }, [introWordSpeed, primaryIntroWords.length, visiblePrimaryWordCount]);

  useEffect(() => {
    const primaryDone = visiblePrimaryWordCount >= primaryIntroWords.length;
    if (!primaryDone || visibleLocalizationWordCount >= localizationWords.length) {
      return;
    }

    const localizationTimer = window.setTimeout(() => {
      setVisibleLocalizationWordCount((prev) => prev + 1);
    }, introWordSpeed);

    return () => window.clearTimeout(localizationTimer);
  }, [
    introWordSpeed,
    localizationWords.length,
    primaryIntroWords.length,
    visibleLocalizationWordCount,
    visiblePrimaryWordCount,
  ]);

  useEffect(() => {
    setVisibleWordCount(0);
  }, [activeIntroLineIndex]);

  useEffect(() => {
    const canRotate =
      visiblePrimaryWordCount >= primaryIntroWords.length &&
      visibleLocalizationWordCount >= localizationWords.length;

    if (!canRotate) {
      return;
    }

    if (visibleWordCount < activeIntroWords.length) {
      const typeTimer = window.setTimeout(() => {
        setVisibleWordCount((prev) => prev + 1);
      }, introWordSpeed);

      return () => window.clearTimeout(typeTimer);
    }

    const rotationTimer = window.setTimeout(() => {
      setActiveIntroLineIndex((prev) => (prev + 1) % rotatingIntroLines.length);
    }, introHoldDuration);

    return () => window.clearTimeout(rotationTimer);
  }, [
    activeIntroWords.length,
    introHoldDuration,
    introWordSpeed,
    localizationWords.length,
    primaryIntroWords.length,
    visibleLocalizationWordCount,
    visiblePrimaryWordCount,
    visibleWordCount,
  ]);

  const heroPhotos = [
    {
      id: 'professional',
      src: profile.photos.professional,
      alt: 'Professional portrait of Ashenafi Bancha',
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
            className="mb-7 grid grid-cols-1 gap-3 sm:gap-4"
          >
            <div className="flex flex-col gap-4 overflow-visible sm:flex-row sm:items-start sm:gap-6">
              {heroPhotos.map((photo, index) => (
                <motion.figure
                  key={photo.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.08, duration: 0.45 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`group relative h-56 w-56 shrink-0 overflow-hidden rounded-full border-4 shadow-2xl sm:h-64 sm:w-64 ${
                    isLight
                      ? 'border-cyan-200 bg-white/90 shadow-cyan-300/30'
                      : 'border-cyan-400/40 bg-slate-900/85 shadow-cyan-900/40'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </motion.figure>
              ))}

              <div className="min-h-[84px] w-full overflow-visible sm:flex-1">
                <p className={`text-[1.75rem] font-extrabold leading-tight sm:whitespace-nowrap sm:text-[2.05rem] ${isLight ? 'text-cyan-700' : 'text-cyan-200'}`}>
                  {primaryIntroWords.slice(0, visiblePrimaryWordCount).map((word, index) => (
                    <span
                      key={`primary-${index}`}
                      className={word.highlight ? 'bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400 bg-clip-text text-transparent' : undefined}
                    >
                      {index > 0 &&
                      !primaryIntroWords[index - 1].text.endsWith(' ') &&
                      !/^[,.:;!?]/.test(word.text)
                        ? ' '
                        : ''}
                      {word.text}
                    </span>
                  ))}
                  {visiblePrimaryWordCount < primaryIntroWords.length ? (
                    <span className={`${isLight ? 'text-cyan-500' : 'text-cyan-300'} animate-pulse`}>|</span>
                  ) : null}
                </p>

                <p
                  className="mt-1 min-w-0 text-[1.08rem] font-semibold leading-relaxed tracking-[0.01em] sm:whitespace-nowrap"
                >
                  {localizationWords.slice(0, visibleLocalizationWordCount).map((word, index) => (
                    <span
                      key={`localization-${index}`}
                      className={getLocalizationWordClass(word, index)}
                    >
                      {word.text}
                    </span>
                  ))}
                  {visiblePrimaryWordCount >= primaryIntroWords.length && visibleLocalizationWordCount < localizationWords.length ? (
                    <span className={`${isLight ? 'text-cyan-600' : 'text-amber-300'} animate-pulse`}>|</span>
                  ) : null}
                </p>

                <motion.p
                  key={activeIntroLineIndex}
                  initial={{ opacity: 0.4, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className={`mt-2 min-w-0 text-xl font-bold leading-snug sm:whitespace-nowrap ${isLight ? 'text-slate-700' : 'text-slate-200'}`}
                >
                  {activeIntroWords.slice(0, visibleWordCount).map((word, index) => (
                    <span key={`${activeIntroLineIndex}-${index}`}>
                      {word}
                      {index < visibleWordCount - 1 ? ' ' : ''}
                    </span>
                  ))}
                  <span className={`${isLight ? 'text-cyan-500' : 'text-cyan-300'} animate-pulse`}>|</span>
                </motion.p>
              </div>
            </div>
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
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-semibold ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-800'
                  : 'border-slate-600 bg-slate-900/85 text-slate-100'
              }`}
            >
              <Eye size={18} />
              View CV
            </motion.a>

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
