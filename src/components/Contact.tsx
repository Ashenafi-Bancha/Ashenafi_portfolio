import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaEnvelope, FaFacebookF, FaGithub, FaLinkedinIn, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { profile } from '../data/profile';
import { isSupabaseConfigured } from '../lib/supabase';
import { submitContactMessage } from '../services/contactMessages';
import TurnstileWidget from './TurnstileWidget';
import { useTheme } from '../context/useTheme';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-120px' });
  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;
  const isTurnstileConfigured = Boolean(turnstileSiteKey);
  const isContactFormConfigured = isSupabaseConfigured && isTurnstileConfigured;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetSignal, setTurnstileResetSignal] = useState(0);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus('error');
      setErrorMessage('Please complete the anti-spam verification challenge before sending your message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    const result = await submitContactMessage({
      ...formData,
      turnstileToken,
    });

    if (!result.ok) {
      setStatus('error');
      setErrorMessage(result.errorMessage || 'Failed to send your message. Please try again.');
      setTurnstileResetSignal((previous) => previous + 1);
      return;
    }

    setStatus('success');
    setTurnstileToken(null);
    setTurnstileResetSignal((previous) => previous + 1);
    setFormData({ name: '', email: '', subject: '', message: '' });

    setTimeout(() => {
      setStatus('idle');
      setErrorMessage('');
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      link: `mailto:${profile.email}`,
      color: 'from-cyan-300 to-blue-300',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phoneDisplay,
      link: `tel:${profile.phoneRaw}`,
      color: 'from-emerald-300 to-teal-300',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profile.location,
      link: null,
      color: 'from-violet-300 to-indigo-300',
    },
  ];

  const socialLinks: { icon: IconType; label: string; url: string; color: string }[] = [
    {
      icon: FaGithub,
      label: 'GitHub',
      url: profile.social.github,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
    {
      icon: FaLinkedinIn,
      label: 'LinkedIn',
      url: profile.social.linkedin,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      url: `mailto:${profile.email}`,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
    {
      icon: FaTelegramPlane,
      label: 'Telegram',
      url: profile.social.telegram,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
    {
      icon: FaFacebookF,
      label: 'Facebook',
      url: profile.social.facebook,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      url: profile.social.whatsapp,
      color: 'hover:border-cyan-300/60 hover:text-cyan-100',
    },
  ];

  return (
    <section id="contact" className="section-shell">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(16,185,129,0.12),transparent_38%),radial-gradient(circle_at_84%_80%,rgba(34,211,238,0.14),transparent_40%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.24em] ${isLight ? 'text-cyan-700' : 'text-cyan-200/90'}`}>
            Contact
          </p>
          <h2 className={`text-4xl font-bold sm:text-5xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Let&apos;s build the next <span className="text-gradient-brand">remarkable product</span>
          </h2>
          <p className={`mx-auto mt-4 max-w-3xl text-sm leading-relaxed sm:text-base ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Have an internship, full-time role, or ambitious project in mind? Send a message and let&apos;s start the conversation.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.12, duration: 0.55 }}
          >
            <h3 className={`mb-6 text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Contact Information
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="glass-panel flex items-center gap-4 p-4"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-lg flex items-center justify-center text-slate-950`}>
                    <info.icon size={22} />
                  </div>
                  <div>
                    <p className={`text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>{info.label}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className={`font-medium transition-colors ${
                          isLight
                            ? 'text-slate-800 hover:text-cyan-700'
                            : 'text-slate-100 hover:text-cyan-100'
                        }`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={`font-medium ${isLight ? 'text-slate-800' : 'text-slate-100'}`}>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.55, duration: 0.45 }}
            >
              <h4 className={`mb-4 text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Connect on Social Media
              </h4>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, idx) => (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + idx * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`rounded-xl border p-4 transition-all duration-300 ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-700 hover:border-cyan-500/70 hover:text-cyan-700'
                        : `border-slate-700 bg-slate-900/80 text-slate-200 ${social.color}`
                    }`}
                    title={social.label}
                  >
                    <social.icon size={22} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.65, duration: 0.45 }}
              className={`mt-8 rounded-2xl border p-6 ${
                isLight
                  ? 'border-emerald-600/35 bg-gradient-to-r from-emerald-100 to-cyan-100'
                  : 'border-emerald-300/30 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20'
              }`}
            >
              <h4 className={`mb-2 text-xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Open to Opportunities
              </h4>
              <p className={isLight ? 'text-slate-700' : 'text-slate-200'}>
                I am available for internships, junior full-stack roles, and meaningful project collaborations.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="glass-panel p-6 sm:p-7"
          >
            <h3 className={`mb-6 text-2xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Send a Message
            </h3>

            {!isSupabaseConfigured && (
              <div className={`mb-6 rounded-xl border p-4 text-sm ${
                isLight
                  ? 'border-amber-500/40 bg-amber-100 text-amber-800'
                  : 'border-amber-300/40 bg-amber-400/10 text-amber-100'
              }`}>
                Supabase is not configured yet. Add your <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> in <strong>.env</strong> to enable message delivery.
              </div>
            )}

            {!isTurnstileConfigured && (
              <div className={`mb-6 rounded-xl border p-4 text-sm ${
                isLight
                  ? 'border-amber-500/40 bg-amber-100 text-amber-800'
                  : 'border-amber-300/40 bg-amber-400/10 text-amber-100'
              }`}>
                Cloudflare Turnstile is not configured yet. Add <strong>VITE_TURNSTILE_SITE_KEY</strong> in <strong>.env</strong> to enable anti-spam protection.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`mb-2 block text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500'
                      : 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500'
                  }`}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`mb-2 block text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500'
                      : 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500'
                  }`}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="subject" className={`mb-2 block text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full rounded-xl border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500'
                      : 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500'
                  }`}
                  placeholder="What would you like to discuss?"
                />
              </div>

              <div>
                <label htmlFor="message" className={`mb-2 block text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className={`w-full resize-none rounded-xl border px-4 py-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-900 placeholder:text-slate-500'
                      : 'border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500'
                  }`}
                  placeholder="Tell me about your project, timeline, and goals."
                />
              </div>

              <div>
                <p className={`mb-2 block text-sm font-medium ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Anti-spam Verification
                </p>
                {isTurnstileConfigured ? (
                  <TurnstileWidget
                    siteKey={turnstileSiteKey}
                    onTokenChange={setTurnstileToken}
                    resetSignal={turnstileResetSignal}
                    theme="auto"
                  />
                ) : (
                  <div
                    className={`rounded-xl border p-4 text-sm ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-600'
                        : 'border-slate-700 bg-slate-950/80 text-slate-400'
                    }`}
                  >
                    Add your Turnstile site key to show the verification challenge.
                  </div>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending' || !isContactFormConfigured || !turnstileToken}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 py-4 font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'sending' ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"></div>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <span>✓</span>
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {!isSupabaseConfigured
                      ? 'Configure Supabase to Send'
                      : !isTurnstileConfigured
                        ? 'Configure Turnstile to Send'
                        : !turnstileToken
                          ? 'Complete Captcha to Send'
                          : 'Send Message'}
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 text-center ${
                    isLight
                      ? 'border-emerald-500/40 bg-emerald-100 text-emerald-800'
                      : 'border-emerald-300/40 bg-emerald-400/10 text-emerald-100'
                  }`}
                >
                  Thank you for reaching out! I'll get back to you soon.
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl border p-4 text-center ${
                    isLight
                      ? 'border-rose-500/40 bg-rose-100 text-rose-800'
                      : 'border-rose-300/40 bg-rose-400/10 text-rose-100'
                  }`}
                >
                  {errorMessage}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
