export interface NavigationItem {
  id: string;
  label: string;
}

export const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai', label: 'AI' },
  { id: 'certifications', label: 'Certs' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'translation', label: 'Translation' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

export const profile = {
  initials: 'AB',
  firstName: 'Ashenafi',
  fullName: 'Ashenafi Bancha Bassa',
  role: 'Full-Stack Software Engineer',
  subtitle: 'Computer Science Student | Builder of Scalable Digital Systems',
  heroSummary:
    'I engineer scalable web platforms that blend elegant user experiences with reliable backend architecture.',
  location: 'Addis Ababa, Ethiopia',
  email: 'ashenafibanchabassa01@gmail.com',
  phoneDisplay: '+251 93 810 3340',
  phoneRaw: '+251938103340',
  resumeUrl: '/assets/docs/Ashenafi_Bancha_Resume.pdf',
  availability:
    'Open to internships, junior full-stack roles, and ambitious freelance projects.',
  social: {
    github: 'https://github.com/Ashenafi-Bancha',
    linkedin: 'https://www.linkedin.com/in/ashenafi-bancha/',
    telegram: 'https://t.me/ashancha',
    facebook: 'https://facebook.com/your-profile',
    whatsapp: 'https://wa.me/251938103340',
  },
  photos: {
    professional: '/assets/images/Ashu.jpg',
  },
};

export const heroHighlights = [
  'Product-Driven Engineering',
  'Scalable Full-Stack Architecture',
  'Performance & Accessibility First',
];

export const heroStats = [
  { value: '5+', label: 'Featured Projects' },
  { value: '4th', label: 'Year CS Student' },
  { value: '8+', label: 'Core Technologies' },
  { value: '3', label: 'Working Languages' },
];