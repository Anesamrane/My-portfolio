import React, { useState, useEffect } from 'react';
import { Mail, FileText, Send, CheckCircle, Trash2, Database, AlertCircle } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactFormProps {
  onOpenResume: () => void;
}

export default function ContactForm({ onOpenResume }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Local storage submitted inbox state
  const [inbox, setInbox] = useState<ContactMessage[]>([]);
  const [showInbox, setShowInbox] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem('anes_portfolio_inbox');
    if (cached) {
      try {
        setInbox(JSON.parse(cached));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please state your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Please enter a short message description.');
      return;
    }

    setLoading(true);

    // Simulate sending network request
    setTimeout(() => {
      const newMessage: ContactMessage = {
        id: `MSG-${Math.floor(Math.random() * 90000 + 10000)}`,
        name,
        email,
        message,
        timestamp: new Date().toLocaleString()
      };

      const updatedInbox = [newMessage, ...inbox];
      setInbox(updatedInbox);
      localStorage.setItem('anes_portfolio_inbox', JSON.stringify(updatedInbox));

      setLoading(false);
      setSuccess(true);
      setName('');
      setEmail('');
      setMessage('');

      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  const clearInbox = () => {
    setInbox([]);
    localStorage.removeItem('anes_portfolio_inbox');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
      {/* Visual content / Pitch column */}
      <div className="space-y-6 md:space-y-8 text-left">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Let's collaborate.
        </h2>
        <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
          Currently looking for opportunities in AI research and development. Whether you have a specific project, research collaboration, or just want to discuss ML, my inbox is open.
        </p>

        {/* Contact info nodes */}
        <div className="space-y-4">
          <a
            href="mailto:anesamrane9@gmail.com"
            className="flex items-center gap-4 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 transition-all group"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 group-hover:border-black dark:group-hover:border-white transition-colors bg-white/50 dark:bg-neutral-900/50 rounded">
              <Mail className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </div>
            <span className="text-xs md:text-sm font-semibold font-mono tracking-tight">anesamrane9@gmail.com</span>
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-4 text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-400 text-left transition-all group w-full"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 group-hover:border-black dark:group-hover:border-white transition-colors bg-white/50 dark:bg-neutral-900/50 rounded">
              <FileText className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <span className="text-xs md:text-sm font-semibold font-mono tracking-tight block">Download Resume (PDF)</span>
              <span className="text-[10px] text-neutral-400 font-mono">Academic CV Summary</span>
            </div>
          </button>
        </div>

        {/* Social Badges */}
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/anes-amrane-a33776292/"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white font-mono text-xs rounded bg-white/30 dark:bg-neutral-900/30"
          >
            LN
          </a>
          <a
            href="https://github.com/Anesamrane"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white font-mono text-xs rounded bg-white/30 dark:bg-neutral-900/30"
          >
            GH
          </a>
          <a
            href="https://arxiv.org"
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 hover:border-black dark:hover:border-white transition-all text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white font-mono text-xs rounded bg-white/30 dark:bg-neutral-900/30"
          >
            arXiv
          </a>
        </div>

        {/* Local sandbox submitted messages trigger */}
        {inbox.length > 0 && (
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
            <button
              onClick={() => setShowInbox(!showInbox)}
              className="flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono hover:text-black dark:hover:text-white"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{showInbox ? 'Hide' : 'Inspect'} Recruiter Inbox ({inbox.length} Saved Local Messages)</span>
            </button>
            
            {showInbox && (
              <div className="mt-3 p-4 bg-neutral-100 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 rounded space-y-3 max-h-56 overflow-y-auto text-xs animate-slide-down">
                <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-b border-neutral-200 dark:border-neutral-800 pb-1">
                  <span>SANDBOX VISITOR LOGS</span>
                  <button onClick={clearInbox} className="flex items-center gap-1 text-red-500 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Cache</span>
                  </button>
                </div>
                {inbox.map((msg) => (
                  <div key={msg.id} className="space-y-1 pb-2 border-b border-neutral-200/50 dark:border-neutral-800/50 last:border-0 last:pb-0 font-mono text-[10px] text-left">
                    <div className="flex justify-between text-neutral-950 dark:text-neutral-200 font-bold">
                      <span>{msg.name} ({msg.email})</span>
                      <span className="text-[9px] text-neutral-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 font-sans text-xs mt-1 italic">"{msg.message}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actual interactive submission form card */}
      <div className="p-6 md:p-10 bg-white dark:bg-[#171717] rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-lg text-left">
        <form onSubmit={handleSubmit} className="space-y-6">
          {errorMsg && (
            <div className="p-3 bg-red-100/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded text-xs text-red-600 dark:text-red-400 flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {success && (
            <div className="p-4 bg-emerald-100/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 rounded text-xs text-emerald-600 dark:text-emerald-400 space-y-1 animate-slide-down font-mono">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
                <span>Message Dispatched Securely!</span>
              </div>
              <p className="font-sans text-xs text-neutral-500 dark:text-neutral-400 mt-1">Thank you. Your message has been saved in the Local sandbox cache above.</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="Amrane Anes"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrorMsg(''); }}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border-0 border-b border-neutral-200 dark:border-neutral-800 focus:ring-0 focus:border-black dark:focus:border-white py-3 px-1 text-sm text-neutral-950 dark:text-white placeholder:text-neutral-400 transition-all focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400">
                Email
              </label>
              <input
                type="email"
                required
                placeholder="anes@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrorMsg(''); }}
                className="w-full bg-neutral-50 dark:bg-neutral-900 border-0 border-b border-neutral-200 dark:border-neutral-800 focus:ring-0 focus:border-black dark:focus:border-white py-3 px-1 text-sm text-neutral-950 dark:text-white placeholder:text-neutral-400 transition-all focus:outline-none"
              />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold tracking-wider uppercase text-neutral-400">
              Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your AI project..."
              value={message}
              onChange={(e) => { setMessage(e.target.value); setErrorMsg(''); }}
              className="w-full bg-neutral-50 dark:bg-neutral-900 border-0 border-b border-neutral-200 dark:border-neutral-800 focus:ring-0 focus:border-black dark:focus:border-white py-3 px-1 text-sm text-neutral-950 dark:text-white placeholder:text-neutral-400 transition-all resize-none focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold rounded-lg text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md focus:outline-none"
          >
            {loading ? (
              <div className="w-4.5 h-4.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
