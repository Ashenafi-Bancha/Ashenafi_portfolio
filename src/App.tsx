import { ThemeProvider } from './context/ThemeContext';
import { useTheme } from './context/useTheme';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import AISkills from './components/AISkills';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Achievements from './components/Achievements';
import GithubContributions from './components/GithubContributions';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContent = () => {
  const { theme } = useTheme();

  const backdrop =
    theme === 'light'
      ? 'radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.22),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(59,130,246,0.12),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_42%,#ffffff_100%)'
      : 'radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(16,185,129,0.16),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(14,165,233,0.14),transparent_45%),linear-gradient(180deg,#020617_0%,#050b18_40%,#020617_100%)';

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="relative min-h-screen overflow-x-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: backdrop }} />
      </div>
      <Navbar />
      <motion.main
        initial={{ y: 28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
      >
        <Hero />
        <About />
        <Skills />
        <AISkills />
        <Certifications />
        <Projects />
        <Experience />
        <Education />
        <Achievements />
        <GithubContributions />
        <Contact />
      </motion.main>
      <Footer />
    </motion.div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
