import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Github, Search, Filter, BookOpen, AlertCircle, Sparkles, Code2, Cpu } from 'lucide-react';
import { Project } from './types';
import { projectsData } from './projectsData';
import { skillsData } from './skillsData';

// Modular Components
import BackgroundCanvas from './components/BackgroundCanvas';
import Header from './components/Header';
import ResumeModal from './components/ResumeModal';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import SkillCategory from './components/SkillCategory';
import ContactForm from './components/ContactForm';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Search & Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Skill-project highlight linking
  const [highlightedProjects, setHighlightedProjects] = useState<string[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    // Sync browser/system settings or default to dark
    document.documentElement.classList.add('dark');
  }, []);

  const handleSkillHover = (projectIds: string[]) => {
    setHighlightedProjects(projectIds);
  };

  const handleSkillLeave = () => {
    setHighlightedProjects([]);
  };

  // Categories list
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cv', label: 'Computer Vision' },
    { id: 'nlp', label: 'Natural Language' },
    { id: 'graph', label: 'Graph AI' },
    { id: 'agents', label: 'Agents' },
    { id: 'dev', label: 'Full-Stack Dev' }
  ];

  // Filtering projects based on search + selected category
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-[#0A0A0A] text-neutral-800 dark:text-neutral-200 font-sans selection:bg-neutral-900/10 dark:selection:bg-white/10 relative overflow-x-hidden transition-colors duration-500">
      
      {/* Interactive Background Neural Canvas */}
      <BackgroundCanvas theme={theme} />

      {/* Structured Header */}
      <Header 
        theme={theme} 
        setTheme={setTheme} 
        onOpenResume={() => setResumeOpen(true)} 
      />

      <main className="max-w-[1120px] mx-auto px-6 relative z-10 pt-16">
        
        {/* HERO SECTION */}
        <section 
          id="home" 
          className="min-h-[85vh] flex flex-col justify-center items-center text-center py-20 md:py-32 relative"
        >
          {/* Graduate Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 mb-8 border border-neutral-300 dark:border-neutral-800 bg-white/45 dark:bg-neutral-900/40 backdrop-blur rounded-full text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Fresh Graduate</span>
          </motion.div>

          {/* Core Title with prominent name heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6 max-w-4xl leading-[1.05]"
          >
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-mono text-amber-500 dark:text-amber-400 font-extrabold tracking-tight uppercase mb-4">
              AMRANE ANES
            </span>
            <span className="block text-3xl sm:text-4xl md:text-5xl font-extrabold text-neutral-900 dark:text-white">
              AI Engineer &amp; Machine Learning Developer
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mb-6 leading-relaxed font-medium"
          >
            Building intelligent systems with Machine Learning, Computer Vision, NLP, Knowledge Graphs, and Full-Stack Development.
          </motion.p>

          {/* Secondary Academic Pitch */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-xs sm:text-sm text-neutral-400 dark:text-neutral-500 max-w-xl mb-12 leading-relaxed italic"
          >
            "AI Engineering graduate focused on solving real-world problems through practical AI systems, intelligent automation, and scalable software solutions."
          </motion.p>

          {/* Actions Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full"
          >
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 font-bold rounded-lg hover:opacity-90 active:scale-98 transition-all text-center text-xs tracking-wider uppercase min-w-[200px] shadow-lg"
            >
              View Projects
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border border-neutral-300 dark:border-neutral-800 bg-white/30 dark:bg-transparent text-neutral-900 dark:text-white font-bold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900/60 active:scale-98 transition-all text-center text-xs tracking-wider uppercase min-w-[200px]"
            >
              Contact Me
            </button>

            {/* Quick Social Badges */}
            <div className="flex gap-4 sm:ml-4 mt-4 sm:mt-0">
              <a 
                href="https://www.linkedin.com/in/anes-amrane-a33776292/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="w-12 h-12 flex items-center justify-center border border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all bg-white/40 dark:bg-neutral-900/20 rounded"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://github.com/Anesamrane" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub"
                className="w-12 h-12 flex items-center justify-center border border-neutral-300 dark:border-neutral-800 hover:border-black dark:hover:border-white text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-all bg-white/40 dark:bg-neutral-900/20 rounded"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section 
          id="projects" 
          className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-10"
        >
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div className="max-w-xl text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
                Featured Projects
              </h2>
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Practical implementations of AI research focusing on Computer Vision, NLP, and Intelligent Automation.
              </p>
            </div>
            
            {/* Visual Stats Tag */}
            <div className="text-xs font-mono font-bold tracking-widest text-neutral-400 dark:text-neutral-500 border border-neutral-200 dark:border-neutral-800 px-3.5 py-1.5 rounded bg-white/20 dark:bg-[#141313]/20">
              06 / SYSTEMS DEPLOYED
            </div>
          </div>

          {/* Filtering and Search Controls Dashboard */}
          <div className="mb-10 p-4 bg-white/50 dark:bg-[#171717]/40 backdrop-blur-sm rounded-lg border border-neutral-200 dark:border-neutral-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Search Bar */}
            <div className="relative col-span-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-4 h-4 text-neutral-400" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by skill, title..."
                className="w-full bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-xs py-2.5 pl-9 pr-4 rounded-md focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-neutral-800 dark:text-neutral-200 placeholder:text-neutral-400 transition-all font-mono"
              />
            </div>

            {/* Category selection */}
            <div className="col-span-1 md:col-span-2 flex flex-wrap gap-1.5 justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 font-bold shadow-sm'
                      : 'bg-neutral-100/80 hover:bg-neutral-200/80 dark:bg-neutral-900/60 dark:hover:bg-neutral-800/60 text-neutral-500 dark:text-neutral-400 border border-transparent'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Live Link highlighting alert */}
          {highlightedProjects.length > 0 && (
            <div className="mb-6 p-2.5 bg-neutral-900/90 text-white dark:bg-white dark:text-neutral-950 text-xs rounded-md flex items-center justify-between font-mono tracking-tight animate-fade-in shadow-md">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-500 dark:text-amber-600 shrink-0" />
                <span>Showing projects applying <b>{hoveredSkill}</b></span>
              </div>
              <button 
                onClick={handleSkillLeave} 
                className="px-2 py-0.5 rounded border border-neutral-700 dark:border-neutral-300 text-[10px] font-bold hover:bg-neutral-800 dark:hover:bg-neutral-100"
              >
                Clear Filter
              </button>
            </div>
          )}

          {/* Grid Layout */}
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-neutral-300 dark:border-neutral-800 rounded bg-white/20 dark:bg-neutral-900/10">
              <AlertCircle className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
              <p className="text-neutral-500 dark:text-neutral-400 text-sm font-mono">
                No matching systems found. Search another category/tag.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={setSelectedProject}
                  isHighlighted={highlightedProjects.includes(project.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* TECHNICAL STACK SECTION */}
        <section 
          id="skills" 
          className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-10"
        >
          {/* Section title */}
          <div className="flex flex-col mb-16 items-start text-left">
            <h2 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-4">
              Technical Stack
            </h2>
            <div className="h-1 w-20 bg-neutral-900 dark:bg-white rounded" />
            <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-mono mt-4">
              * Hover over or tap any individual tag to inspect detailed proficiency, experience logs, and connect to projects.
            </p>
          </div>

          {/* Grid of skill categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillsData.map((category) => (
              <SkillCategory
                key={category.title}
                category={category}
                onSkillHover={handleSkillHover}
                onSkillLeave={handleSkillLeave}
                hoveredSkill={hoveredSkill}
                setHoveredSkill={setHoveredSkill}
              />
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section 
          id="contact" 
          className="py-24 md:py-32 border-t border-neutral-200 dark:border-neutral-900 scroll-mt-10 mb-16"
        >
          <ContactForm onOpenResume={() => setResumeOpen(true)} />
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 dark:border-neutral-900/80 bg-white/70 dark:bg-[#0A0A0A]/80 backdrop-blur-md">
        <div className="max-w-[1120px] mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bold text-sm tracking-tighter text-neutral-950 dark:text-white uppercase font-mono">
            AMRANE<span className="text-neutral-400 dark:text-neutral-500 font-medium">.AI</span>
          </div>

          <div className="text-neutral-400 text-xs font-mono text-center md:text-left">
            © 2026 Amrane Anes. Built with pristine precision.
          </div>

          <div className="flex gap-6 text-xs font-mono">
            <a 
              href="https://github.com/Anesamrane" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://arxiv.org" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              arXiv
            </a>
            <a 
              href="https://www.linkedin.com/in/anes-amrane-a33776292/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* DETAILED PROJECT MODAL DRAWER */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* CV VIEW / DOWNLOAD RESUME MODAL */}
      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />

    </div>
  );
}
