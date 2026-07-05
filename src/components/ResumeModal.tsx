import React from 'react';
import { X, Printer, Copy, Check, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const resumeText = `
Amrane Anes - AI Engineer | Machine Learning | Full-Stack Developer
Email: anesamrane9@gmail.com | GitHub: github.com/Anesamrane | Portfolio: anes-amrane.vercel.app
Blida, Algeria

EDUCATION
- Master's in Intelligent Systems Engineering (AI), Universite Saad Dahleb Blida 1 (Sept 2024 - June 2026)
  Graduation project defended with Excellence: AI-Based Predictive Maintenance for Solar Panels
  Using a Multimodal Knowledge Graph (SolarGuard).
- Bachelor's in Computer Science, Universite Saad Dahleb Blida 1 (graduated 2024)
  Final-year project: Tabibi, a full-stack medical appointment booking platform.

FLAGSHIP PROJECT - SOLARGUARD
Multimodal knowledge graph + Relational Graph Attention Network (RGAT) for photovoltaic
fault detection, incubated as a startup at CDE Blida 1 (Ministerial Decree 1275).
- Graph of 15,900 solar cells across 265 panels, 5-class defect classification.
- RGAT achieved F1-Macro of 0.8092, outperforming RGCN and RGAT+MLP baselines.
- Ablation study: removing EL image nodes drops F1 from 0.8092 to 0.2076, showing the
  electroluminescence imaging modality is the dominant discriminative signal.
- Deployed as an interactive Streamlit inference dashboard.

OTHER PROJECTS
- AI News Automation Agent: n8n pipeline scraping Hacker News, summarizing via Groq LLM,
  publishing to Discord in French; framed with the Wooldridge & Jennings agent-property model.
- Real-Time Fire and Smoke Detection: YOLOv8 model, mAP@0.5 of 0.803.
- Abusive-to-Friendly Speech Transformer: NLP pipeline detecting hostile text and rewriting
  it in a neutral tone (Arabic and English), with a CLI sentiment tool.
- PDF-Based AI Chatbot (RAG): retrieval-augmented generation over PDF documents.
- Tabibi: full-stack medical appointment platform (Node.js/Express, MySQL, React/Tailwind).
- Personal Portfolio: Next.js + TypeScript + Tailwind CSS.

TECHNICAL STACK
- AI/ML: PyTorch, PyTorch Geometric, EfficientNet, RGAT, scikit-learn, spaCy, OpenCV
- Knowledge Graphs & GNNs: MMKG construction, GAT/RGAT, property graphs
- Languages: Python, JavaScript, TypeScript
- Web/Backend: Next.js, React, Node.js, Express.js, MySQL, Tailwind CSS
- Tools: Git, Docker (basics), Vercel, n8n

LANGUAGES
Arabic (native), English (B2), French (B1)
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-200 p-6 md:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Actions Bar */}
        <div className="sticky top-0 bg-neutral-900/90 backdrop-blur-md pb-4 border-b border-neutral-800 flex items-center justify-between mb-8 z-10">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Curriculum Vitae</h2>
            <p className="text-xs text-neutral-400">Amrane Anes | AI Engineering Graduate</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 text-xs font-semibold rounded bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-all text-neutral-300 cursor-pointer"
              title="Copy Resume Plain Text"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
            <a
              href="/Anes_Amrane_CV_ATS.pdf"
              download="Anes_Amrane_CV_ATS.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 text-xs font-semibold rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold transition-all cursor-pointer shadow-md decoration-none hover:text-neutral-950"
              title="Download CV PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ATS PDF</span>
            </a>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 md:px-3.5 md:py-2 text-xs font-semibold rounded bg-neutral-800 border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-all text-neutral-300 cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 md:p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Layout */}
        <div className="space-y-8 text-sm leading-relaxed" id="printable-resume-area">
          {/* Header */}
          <div className="border-b border-neutral-800 pb-6 flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Amrane Anes</h1>
              <p className="text-md text-neutral-400 font-medium">AI Engineer | Machine Learning | Full-Stack Developer</p>
            </div>
            <div className="text-left md:text-right font-mono text-xs text-neutral-400 space-y-1">
              <p>anesamrane9@gmail.com</p>
              <p>Blida, Algeria</p>
              <p className="underline decoration-neutral-700">github.com/Anesamrane</p>
              <p className="underline decoration-neutral-700">anes-amrane.vercel.app</p>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Professional Summary</h3>
            <p className="text-neutral-300">
              AI Engineering graduate specializing in machine learning, computer vision, NLP and graph neural
              networks. Built and deployed an end-to-end multimodal AI pipeline for solar panel defect detection
              and maintenance recommendation as a graduation project, covering deep learning, model fine-tuning,
              knowledge graph construction, and RGAT-based classification. Complementary full-stack background
              with production web and NLP projects. Seeking an AI/ML or software engineering role with an
              international or remote-friendly team.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Education</h3>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Master's in Intelligent Systems Engineering (AI)</span>
                <span className="font-mono text-xs text-neutral-400">Sep 2024 – Jun 2026</span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">Universite Saad Dahleb Blida 1, Algeria</p>
              <p className="text-xs text-neutral-300 mt-1">
                Graduation project: AI-Based Predictive Maintenance for Solar Panels Using Multimodal Knowledge
                Graph, defended with Excellence. Implemented EfficientNet-B0 fine-tuning, CLAHE preprocessing,
                MMKG construction, and RGAT training for fault classification.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between font-semibold text-white">
                <span>Bachelor's in Computer Science</span>
                <span className="font-mono text-xs text-neutral-400">Graduated 2024</span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">Universite Saad Dahleb Blida 1, Algeria</p>
              <p className="text-xs text-neutral-300 mt-1">
                Final-year project: Tabibi, a full-stack web platform for online medical appointment booking.
              </p>
            </div>
          </div>

          {/* Flagship Project */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Flagship Project — SolarGuard</h3>
            <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>AI-Based Predictive Maintenance for Solar Panels (MMKG + RGAT)</span>
                <span className="font-mono text-xs text-neutral-400">Jun 2026</span>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
                <li>
                  Built an end-to-end multimodal pipeline (EL image preprocessing, EfficientNet-B0 fine-tuning,
                  N-MMKG construction in PyTorch Geometric, RGAT training) for 5-class solar cell defect
                  classification across 15,900 cells / 265 panels.
                </li>
                <li>
                  Achieved F1-Macro of 0.8092, outperforming RGCN and RGAT+MLP baselines; ablation study
                  showed the EL image modality is the primary discriminative signal — F1 drops to 0.2076
                  without it.
                </li>
                <li>
                  Deployed as an interactive Streamlit inference dashboard; incubated as a startup
                  (SolarGuard) at CDE Blida 1 under Ministerial Decree 1275.
                </li>
              </ul>
            </div>
          </div>

          {/* Other Projects */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Other Projects</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">AI News Automation Agent</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  n8n pipeline scraping Hacker News AI threads, summarizing via Groq LLM, and publishing
                  French-language summaries to Discord — fully automated.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">Real-Time Fire &amp; Smoke Detection</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  YOLOv8-based detection system reaching mAP@0.5 of 0.803, with data augmentation and
                  explainable AI techniques.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">Abusive-to-Friendly Speech Transformer</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  NLP pipeline detecting hostile or abusive text and rewriting it in a neutral tone, for
                  Arabic and English, with a CLI sentiment analysis tool.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">PDF-Based AI Chatbot (RAG)</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Retrieval-augmented generation chatbot answering natural-language questions over
                  uploaded PDF documents.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">Tabibi — Medical Appointment Platform</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Full-stack app (Node.js/Express, MySQL, React/Tailwind) for doctor scheduling and
                  appointment management.
                </p>
              </div>
              <div className="p-4 bg-neutral-950/50 rounded border border-neutral-800">
                <h4 className="font-semibold text-white">Personal Portfolio</h4>
                <p className="text-xs text-neutral-400 mt-1">
                  Next.js + TypeScript + Tailwind CSS site with dark mode, GitHub API integration, and
                  downloadable resume.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Grid */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="space-y-1.5">
                <span className="text-white font-semibold">Languages</span>
                <p className="text-neutral-400 text-[11px]">Python, JavaScript, TypeScript</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-white font-semibold">AI / ML</span>
                <p className="text-neutral-400 text-[11px]">PyTorch, PyTorch Geometric, EfficientNet, RGAT, scikit-learn</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-white font-semibold">Graphs & NLP</span>
                <p className="text-neutral-400 text-[11px]">MMKG construction, GAT/RGAT, spaCy, OpenCV</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-white font-semibold">Web / Ops</span>
                <p className="text-neutral-400 text-[11px]">Next.js, React, Node.js, MySQL, Docker, Vercel, n8n</p>
              </div>
            </div>
          </div>

          {/* Languages & Additional */}
          <div className="space-y-2">
            <h3 className="font-mono text-xs font-bold text-neutral-400 tracking-wider uppercase border-l-2 border-white pl-3">Languages & Additional</h3>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-300">
              <li>Arabic (native), English (B2 — professional working proficiency), French (B1 — intermediate).</li>
              <li>Open to relocation and fully remote positions; actively exploring international AI engineering opportunities.</li>
              <li>Interests: generative AI, agent-based systems, graph neural networks, startup culture, computer vision and NLP.</li>
            </ul>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-[10px] text-neutral-500 font-mono border-t border-neutral-800 pt-4">
          Amrane Anes © 2026
        </div>
      </div>
    </div>
  );
}