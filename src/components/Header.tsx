import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, FileText } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onOpenResume: () => void;
}

export default function Header({ theme, setTheme, onOpenResume }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active link spy logic
      const scrollPosition = window.scrollY + 200;
      const sections = navLinks.map(link => document.getElementById(link.id));

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-neutral-950/80 dark:bg-[#0A0A0A]/85 backdrop-blur-md border-b border-neutral-200/50 dark:border-neutral-800/60 shadow-md' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-[1120px] mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <div 
          onClick={() => handleLinkClick('home')} 
          className="font-bold text-lg tracking-tighter text-black dark:text-white cursor-pointer select-none"
        >
          Anes<span className="text-neutral-400 dark:text-neutral-500 font-medium"> Portfolio</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative py-1 hover:text-black dark:hover:text-white ${
                activeSection === link.id
                  ? 'text-black dark:text-white font-bold'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black dark:bg-white rounded-full transition-all duration-300" />
              )}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Resume Modal trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 text-xs font-semibold rounded-md transition-all active:scale-95 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu trigger + theme toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-lg transition-all"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white rounded-lg transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full bg-neutral-50 dark:bg-[#0A0A0A] border-b border-neutral-200 dark:border-neutral-800 py-6 px-6 flex flex-col gap-4 shadow-xl animate-slide-down">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-sm font-semibold text-left tracking-wide uppercase py-2 border-b border-neutral-100 dark:border-neutral-900 ${
                activeSection === link.id
                  ? 'text-black dark:text-white border-l-2 border-l-black dark:border-l-white pl-2'
                  : 'text-neutral-500 dark:text-neutral-400 pl-2'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenResume();
            }}
            className="mt-2 w-full flex items-center justify-center gap-2 py-3 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-sm font-semibold rounded-md transition-all active:scale-98 shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>View Resume (PDF)</span>
          </button>
        </div>
      )}
    </nav>
  );
}
