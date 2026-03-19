import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { navigationItems, profile } from '../data/profile';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks: { icon: IconType; url: string; label: string; className: string }[] = [
    {
      icon: FaGithub,
      url: profile.social.github,
      label: 'GitHub',
      className: 'text-[#f0f6fc] hover:border-slate-400/70 hover:bg-slate-800',
    },
    {
      icon: FaLinkedinIn,
      url: profile.social.linkedin,
      label: 'LinkedIn',
      className: 'text-[#0A66C2] hover:border-[#0A66C2]/70 hover:bg-[#0A66C2]/20',
    },
    {
      icon: FaEnvelope,
      url: `mailto:${profile.email}`,
      label: 'Email',
      className: 'text-[#EA4335] hover:border-[#EA4335]/70 hover:bg-[#EA4335]/20',
    },
    {
      icon: FaTelegramPlane,
      url: profile.social.telegram,
      label: 'Telegram',
      className: 'text-[#229ED9] hover:border-[#229ED9]/70 hover:bg-[#229ED9]/20',
    },
    {
      icon: FaFacebookF,
      url: profile.social.facebook,
      label: 'Facebook',
      className: 'text-[#1877F2] hover:border-[#1877F2]/70 hover:bg-[#1877F2]/20',
    },
    {
      icon: FaWhatsapp,
      url: profile.social.whatsapp,
      label: 'WhatsApp',
      className: 'text-[#25D366] hover:border-[#25D366]/70 hover:bg-[#25D366]/20',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient-brand mb-4">
              {profile.fullName}
            </h3>
            <p className="text-slate-300 mb-4 leading-relaxed">
              {profile.role}. Focused on quality engineering, product impact, and global-level execution.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-lg border border-slate-700 bg-slate-900 p-2 transition-all duration-200 ${social.className}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navigationItems.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-slate-300 hover:text-cyan-100 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-4">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-cyan-100 transition-colors">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`tel:${profile.phoneRaw}`} className="hover:text-cyan-100 transition-colors">
                  {profile.phoneDisplay}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-cyan-300/30 bg-cyan-400/10 px-3 py-2 text-sm font-semibold text-cyan-100"
            >
              Connect on LinkedIn
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} {profile.fullName}. All rights reserved.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
