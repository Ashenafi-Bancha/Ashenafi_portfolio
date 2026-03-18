import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from '../context/useTheme';
import { navigationItems, profile } from '../data/profile';

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = pageHeight > 0 ? (currentY / pageHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      const sections = navigationItems.map((item) => document.getElementById(item.id));
      const scrollPosition = currentY + 130;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigationItems[i].id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 88;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
    setIsOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isLight = theme === 'light';

  return (
    <nav
      aria-label="Primary"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'border-b border-slate-300/80 bg-white/90 shadow-sm backdrop-blur-xl'
            : 'border-b border-cyan-300/15 bg-slate-950/75 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-3"
              aria-label="Go to top"
            >
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 text-slate-950 font-extrabold flex items-center justify-center shadow-lg shadow-cyan-500/25">
                {profile.initials}
              </span>
              <span className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-semibold text-white">{profile.firstName}</span>
                <span className="text-xs text-slate-400">Full-Stack Engineer</span>
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ y: -2 }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? isLight
                      ? 'border border-cyan-300/60 bg-cyan-100 text-cyan-800'
                      : 'bg-cyan-400/15 text-cyan-100 border border-cyan-300/40'
                    : isLight
                      ? 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                      : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                {item.label}
              </motion.button>
            ))}

            <button
              onClick={toggleTheme}
              className={`ml-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                  : 'border-slate-700/80 bg-slate-900/80 text-cyan-100 hover:bg-slate-800'
              }`}
              aria-label={isLight ? 'Switch to dark theme' : 'Switch to white theme'}
              title={isLight ? 'Switch to dark theme' : 'Switch to white theme'}
            >
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-sm font-semibold shadow-lg shadow-cyan-500/25"
            >
              Contact
              <ArrowUpRight size={16} />
            </motion.button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
              aria-label={isLight ? 'Switch to dark theme' : 'Switch to white theme'}
              title={isLight ? 'Switch to dark theme' : 'Switch to white theme'}
            >
              {isLight ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-700 hover:bg-slate-100'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden backdrop-blur-xl border-t shadow-lg ${
            isLight
              ? 'bg-white/95 border-slate-300'
              : 'bg-slate-950/95 border-slate-800'
          }`}
        >
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? isLight
                      ? 'border border-cyan-300/60 bg-cyan-100 text-cyan-800'
                      : 'bg-cyan-400/15 border border-cyan-300/40 text-cyan-100'
                    : isLight
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-300 hover:bg-slate-900'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-3 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 text-sm font-semibold"
            >
              Contact
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
