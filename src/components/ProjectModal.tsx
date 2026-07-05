import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { X, Play, RefreshCw, Send, Check, ShieldAlert, Sliders, Calendar, AlertCircle } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Active states for playgrounds
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);

  // Playground-specific states
  // 1. Predictive
  const [selectedPanel, setSelectedPanel] = useState('Panel #12');
  const [anomalyResult, setAnomalyResult] = useState<any>(null);

  // 2. Vision
  const [confidence, setConfidence] = useState(0.5);
  const [selectedStream, setSelectedStream] = useState('Industrial Warehouse');

  // 3. News Agent
  const [curationMode, setCurationMode] = useState('All Sectors');
  const [briefingOutput, setBriefingOutput] = useState<any>(null);

  // 4. PDF RAG
  const [queryText, setQueryText] = useState('');
  const [ragChat, setRagChat] = useState<any[]>([]);

  // 5. Speech Transformer
  const [inputText, setInputText] = useState('');
  const [transformedOutput, setTransformedOutput] = useState<any>(null);

  // 6. Medical Scheduler
  const [doctor, setDoctor] = useState('Dr. Sarah Jenkins (Cardiologist)');
  const [slot, setSlot] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [appointmentReceipt, setAppointmentReceipt] = useState<any>(null);

  // Clear playground state on project change
  useEffect(() => {
    setLoading(false);
    setLogs([]);
    setCompleted(false);
    setAnomalyResult(null);
    setBriefingOutput(null);
    setRagChat([]);
    setTransformedOutput(null);
    setAppointmentReceipt(null);
    setInputText('');
    setQueryText('');
    setPatientName('');
  }, [project]);

  // Simulated log streamer helper
  const streamLogs = (logList: string[], onFinish: () => void) => {
    setLoading(true);
    setLogs([]);
    setCompleted(false);
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < logList.length) {
        setLogs(prev => [...prev, logList[index]]);
        index++;
      } else {
        clearInterval(interval);
        setLoading(false);
        setCompleted(true);
        onFinish();
      }
    }, 400);
  };

  // Run SolarGuard Simulation
  const runSolarGuard = () => {
    const simulationLogs = [
      'Establishing connection to Field C-10 MQTT Broker...',
      'Harvesting grid current vector values...',
      'Importing graph topology nodes from topological store...',
      'Executing Relational Graph Attention Network (RGAT) forward pass...',
      'Layer 1 GAT node weights computed successfully.',
      'Analyzing spatial degradation propagation indices...',
      'Inference finished. Synthesizing risk maps.'
    ];

    streamLogs(simulationLogs, () => {
      // Calculate outputs based on panel selection
      if (selectedPanel === 'Panel #12') {
        setAnomalyResult({
          status: 'WARNING: Hotspot Anomaly Detected',
          severity: 'HIGH (87.4% Confidence)',
          temp: '74.2 °C',
          efficiency: '68.5%',
          surgeRisk: 'High Propagation Risk (Relational node #11 and #13 affected)'
        });
      } else if (selectedPanel === 'Panel #04') {
        setAnomalyResult({
          status: 'WARNING: Degraded Shading Detected',
          severity: 'MEDIUM (62.1% Confidence)',
          temp: '44.5 °C',
          efficiency: '81.2%',
          surgeRisk: 'Localized degradation. Low surge impact.'
        });
      } else {
        setAnomalyResult({
          status: 'HEALTHY STATUS APPROVED',
          severity: 'Normal operating limits',
          temp: '32.1 °C',
          efficiency: '97.8%',
          surgeRisk: 'Zero abnormal relational fluctuations detected.'
        });
      }
    });
  };

  // Run News Automation Agent
  const runNewsAgent = () => {
    const agentLogs = [
      'Triggering n8n Scheduler Webhook...',
      'Fetching latest submissions from arXiv (cat: cs.CV, cs.CL, cs.LG)...',
      'Scraping daily trending repositories from Hugging Face...',
      'Clustering 42 raw papers using local MiniLM Sentence Embeddings...',
      'Running filtration scoring via LLM instructions...',
      'Synthesizing news summaries and structural highlights...',
      'Dispatch ready. Formatting briefing output.'
    ];

    streamLogs(agentLogs, () => {
      const mode = curationMode;
      setBriefingOutput({
        date: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        headlines: [
          {
            title: `[arXiv] ${mode === 'NLP' ? 'AraBERTv4 Model Upgrades' : 'Spatio-Temporal Graph Convolutions'}`,
            summary: 'A groundbreaking approach addressing extreme localized convergence spikes with high parallel efficiency.',
            citations: 'arXiv:2407.0142'
          },
          {
            title: '[HF] DeepReframer-8B Released',
            summary: 'An open-source sequence transformer tailored for text style conversions and polite toxicity mitigating rewrites.',
            citations: 'Hugging Face Daily'
          }
        ],
        curatedBy: 'Anes.AI n8n Automated Agent'
      });
    });
  };

  // Run PDF RAG Chatbot
  const runRagChat = (overrideQuery?: string) => {
    const question = overrideQuery || queryText;
    if (!question.trim()) return;

    setLoading(true);
    setQueryText('');
    
    // Insert user question into chat list
    setRagChat(prev => [...prev, { sender: 'user', text: question }]);

    setTimeout(() => {
      let retrievedChunk = '';
      let answer = '';

      if (question.toLowerCase().includes('accuracy') || question.toLowerCase().includes('metric')) {
        retrievedChunk = '...Doc Section 4.2: Evaluation reports that our AraBERTv4 transformer model achieved a bilingual text reframing accuracy of 89.4% and successfully mitigated 98.1% of toxic tokens over the validated corpora...';
        answer = 'According to page 14 (Section 4.2) of the paper, the bilingual speech transformer model achieves a toxicity translation accuracy of 89.4% with an overall toxicity mitigation effectiveness of 98.1%.';
      } else if (question.toLowerCase().includes('solar') || question.toLowerCase().includes('solarguard') || question.toLowerCase().includes('f1')) {
        retrievedChunk = '...SolarGuard Core V3 specs: The topological GNN core computes predictions with a lead time of 72 hours, maintaining an F1 anomaly tracking score of 0.942 and a false alarm threshold of 1.2%...';
        answer = 'Based on the SolarGuard specification documents, the predictive maintenance core operates with an F1 Anomaly Score of 0.942, predicting failures up to 72 hours in advance with a 1.2% false alarm rate.';
      } else {
        retrievedChunk = '...Appendix B: Model hyperparameters. We employ recursive character chunking sizes of 500 tokens with 50 token overlap. FAISS index represents embeddings using cosine vector math...';
        answer = 'I have analyzed the technical appendix. The system uses recursive splitting with chunk sizes of 500 tokens (50 tokens overlap). Vector retrieval is done via FAISS on cosine similarities. Let me know if you would like me to retrieve specific metrics!';
      }

      setRagChat(prev => [...prev, {
        sender: 'agent',
        text: answer,
        chunk: retrievedChunk,
        score: '0.94'
      }]);
      setLoading(false);
    }, 1200);
  };

  // Run Abusive Speech Transformer
  const runTransformer = (textToTransform?: string) => {
    const target = textToTransform || inputText;
    if (!target.trim()) return;

    setLoading(true);
    const translationLogs = [
      'Identifying toxic tokens via AraBERT layer attention maps...',
      'Toxicity probability calculated at 94.6%. Reframing trigger activated...',
      'Decoding polite semantic vectors via local sequence generator...',
      'Synthesizing professional alternatives with identical semantic intent...'
    ];

    streamLogs(translationLogs, () => {
      let cleanText = '';
      let detectedAbuse = '';

      if (target.toLowerCase().includes('idiot') || target.toLowerCase().includes('stupid')) {
        detectedAbuse = '"You are an idiot, this system is stupid"';
        cleanText = '"I believe we have opportunities to align this system structure more effectively to prevent errors."';
      } else if (target.includes('غباء') || target.includes('سيء')) {
        detectedAbuse = '"هذا الكود غبي وسيئ جداً"';
        cleanText = '"أرى أن جودة الكود الحالي تحتاج لبعض المراجعة وإعادة الهيكلة لتحسين الكفاءة."';
      } else {
        detectedAbuse = `"${target}"`;
        cleanText = `"Thank you for bringing this up. Let's redirect our focus toward optimizing the specific technical bottlenecks you mentioned."`;
      }

      setTransformedOutput({
        original: detectedAbuse,
        clean: cleanText,
        mitigationRate: '99.2%',
        dialect: 'Bilingual / Code-Switched'
      });
    });
  };

  // Run Tabibi Scheduler
  const runScheduler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setAppointmentReceipt({
        id: `TBB-${Math.floor(Math.random() * 90000 + 10000)}`,
        doctor,
        slot,
        patient: patientName,
        code: `SECURE-AES-256-${Math.floor(Math.random() * 899 + 100)}`,
        time: new Date().toLocaleTimeString()
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 p-6 md:p-8 overflow-y-auto flex flex-col shadow-2xl border-l border-neutral-200 dark:border-neutral-800 animate-slide-left"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 mb-6">
          <div>
            <span className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-widest block mb-1">Project Spotlight</span>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">{project.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Long Description */}
        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mb-6">
          {project.longDescription}
        </p>

        {/* Performance Metrics */}
        <div className="mb-6">
          <h4 className="font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-3">Core Performance & Telemetry</h4>
          <div className="grid grid-cols-3 gap-4">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded border border-neutral-200/60 dark:border-neutral-800">
                <span className="block text-[10px] text-neutral-500 dark:text-neutral-400 font-mono tracking-tight">{metric.label}</span>
                <span className="text-sm font-bold text-neutral-900 dark:text-white mt-1 block font-mono">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack Architecture Bullets */}
        <div className="mb-8">
          <h4 className="font-mono text-[10px] font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-3">Architecture & Technical Stack</h4>
          <ul className="space-y-2">
            {project.techDetails.map((detail, index) => (
              <li key={index} className="flex items-start gap-2.5 text-xs text-neutral-600 dark:text-neutral-300">
                <Check className="w-3.5 h-3.5 text-black dark:text-white mt-0.5 shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* INTERACTIVE PLAYGROUND CONTAINER */}
        <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
          <div className="bg-white dark:bg-neutral-900/60 p-5 md:p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-inner">
            <h4 className="text-xs font-bold font-mono tracking-wider uppercase text-neutral-950 dark:text-neutral-300 mb-4 flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-black dark:text-white fill-current" />
              <span>Interactive ML Playground</span>
            </h4>

            {/* Loading Terminal overlay */}
            {loading && (
              <div className="p-4 bg-black rounded font-mono text-[11px] text-emerald-400 space-y-1 h-36 overflow-y-auto mb-4 border border-emerald-950">
                <div className="flex items-center gap-2 animate-pulse mb-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>EXECUTING PIPELINE INFERENCE...</span>
                </div>
                {logs.map((log, i) => (
                  <p key={i}>&gt; {log}</p>
                ))}
              </div>
            )}

            {/* 1. SOLARGUARD PLAYGROUND */}
            {project.playground.type === 'predictive' && !loading && (
              <div className="space-y-4 text-xs">
                <p className="text-neutral-500 dark:text-neutral-400">Select an active panel node in the Relational Graph map to calculate simulated health telemetry and surge anomalies:</p>
                
                <div className="flex gap-2">
                  {['Panel #12', 'Panel #04', 'Panel #88'].map(panel => (
                    <button
                      key={panel}
                      onClick={() => { setSelectedPanel(panel); setAnomalyResult(null); }}
                      className={`px-3 py-1.5 rounded text-xs font-mono font-semibold transition-all ${
                        selectedPanel === panel
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                          : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {panel}
                    </button>
                  ))}
                </div>

                <button
                  onClick={runSolarGuard}
                  className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold rounded flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Run GNN Diagnostics ({selectedPanel})</span>
                </button>

                {anomalyResult && (
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded space-y-2 animate-slide-up">
                    <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold font-mono">
                      <ShieldAlert className={`w-4 h-4 ${anomalyResult.status.includes('WARNING') ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span>{anomalyResult.status}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      <p>Probability severity: <span className="text-neutral-900 dark:text-white font-bold">{anomalyResult.severity}</span></p>
                      <p>Panel temperature: <span className="text-neutral-900 dark:text-white font-bold">{anomalyResult.temp}</span></p>
                      <p>Efficiency: <span className="text-neutral-900 dark:text-white font-bold">{anomalyResult.efficiency}</span></p>
                    </div>
                    <p className="text-[11px] border-t border-neutral-100 dark:border-neutral-900 pt-2 font-mono text-neutral-400">
                      Surge propagation: <span className="text-neutral-900 dark:text-white font-medium">{anomalyResult.surgeRisk}</span>
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 2. VISION PLAYGROUND */}
            {project.playground.type === 'vision' && !loading && (
              <div className="space-y-4 text-xs">
                <p className="text-neutral-500 dark:text-neutral-400">Calibrate the object detection confidence levels in real-time streams to separate true wildfire flames from false alerts (dust, steam, lights):</p>
                
                <div className="space-y-3 p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded">
                  <div className="flex justify-between font-mono text-xs">
                    <span>Active Feed: <b>{selectedStream}</b></span>
                    <span className="text-neutral-400">YOLOv8 quantized core</span>
                  </div>

                  {/* Mock Bounding Box Container */}
                  <div className="relative aspect-video bg-neutral-900 rounded overflow-hidden flex items-center justify-center border border-neutral-800 select-none">
                    <span className="absolute top-2 left-2 text-[9px] font-mono text-neutral-500 bg-neutral-950/80 px-1.5 py-0.5 rounded">STREAM_ACTIVE_MOCK</span>
                    
                    {/* Background thermal color representation */}
                    <div className="w-24 h-24 rounded-full bg-orange-600/30 blur-2xl animate-pulse" />

                    {/* Simulating detections according to confidence */}
                    {confidence < 0.4 && (
                      <div className="absolute top-6 left-12 border-2 border-red-500 px-2 py-1 text-red-500 font-mono text-[9px] bg-red-950/40 rounded animate-bounce">
                        False Alert: STEAM (Confidence: 38%)
                      </div>
                    )}
                    
                    {confidence < 0.65 ? (
                      <div className="absolute bottom-8 right-16 border-2 border-orange-500 px-2.5 py-1 text-orange-500 font-mono text-[9px] bg-orange-950/40 rounded animate-pulse">
                        ACTIVE_FLAME (Confidence: 61%)
                      </div>
                    ) : (
                      <div className="text-neutral-400 font-mono text-[10px] text-center p-4">
                        <AlertCircle className="w-5 h-5 mx-auto text-neutral-500 mb-1" />
                        <span>Threshold set too high to display medium-confidence hazard alerts!</span>
                      </div>
                    )}
                  </div>

                  {/* Confidence Slider */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between font-mono text-[10px] text-neutral-400">
                      <span>Inference Filter Sensitivity</span>
                      <span className="text-neutral-900 dark:text-white font-bold">Confidence: {(confidence * 100).toFixed(0)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.20"
                      max="0.95"
                      step="0.05"
                      value={confidence}
                      onChange={(e) => setConfidence(parseFloat(e.target.value))}
                      className="w-full accent-black dark:accent-white bg-neutral-200 dark:bg-neutral-800 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  {['Industrial Warehouse', 'Forest Surveillance'].map(stream => (
                    <button
                      key={stream}
                      onClick={() => setSelectedStream(stream)}
                      className={`px-3 py-1 rounded text-[11px] font-mono transition-all ${
                        selectedStream === stream
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                          : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300'
                      }`}
                    >
                      {stream}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. NEWS AGENT PLAYGROUND */}
            {project.playground.type === 'agent' && !loading && (
              <div className="space-y-4 text-xs">
                <p className="text-neutral-500 dark:text-neutral-400">Choose a news focus sector and run the autonomous agent pipeline to gather, vector-cluster, and summarize research papers:</p>

                <div className="flex gap-2">
                  {['All Sectors', 'Computer Vision', 'NLP'].map(mode => (
                    <button
                      key={mode}
                      onClick={() => { setCurationMode(mode); setBriefingOutput(null); }}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                        curationMode === mode
                          ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950'
                          : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>

                <button
                  onClick={runNewsAgent}
                  className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold rounded flex items-center justify-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Execute n8n Agent Stream ({curationMode})</span>
                </button>

                {briefingOutput && (
                  <div className="p-4 bg-neutral-50 dark:bg-[#0E0E0E] border border-neutral-200 dark:border-neutral-800 rounded space-y-3 animate-slide-up text-left">
                    <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 border-b border-neutral-200 dark:border-neutral-900 pb-1.5">
                      <span>DAILY AI SUMMARY FOR YOU</span>
                      <span>{briefingOutput.date}</span>
                    </div>
                    {briefingOutput.headlines.map((item: any, i: number) => (
                      <div key={i} className="space-y-1 border-b border-neutral-100 dark:border-neutral-900/60 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-neutral-900 dark:text-white block font-mono text-[11px]">{item.title}</span>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400">{item.summary}</p>
                        <span className="inline-block px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[9px] font-mono rounded text-neutral-400">
                          {item.citations}
                        </span>
                      </div>
                    ))}
                    <span className="block text-[9px] font-mono text-neutral-400 text-right italic">Generated automatically by {briefingOutput.curatedBy}</span>
                  </div>
                )}
              </div>
            )}

            {/* 4. PDF RAG PLAYGROUND */}
            {project.playground.type === 'rag' && (
              <div className="space-y-4 text-xs text-left">
                <p className="text-neutral-500 dark:text-neutral-400 mb-2">Test semantic vector document queries. Type your custom query or click on predefined templates:</p>
                
                {/* Predefined Pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['AraBERT accuracy score?', 'SolarGuard F1 rating?', 'Describe FAISS index'].map(pill => (
                    <button
                      key={pill}
                      onClick={() => runRagChat(pill)}
                      disabled={loading}
                      className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded font-mono text-[10px] text-left transition-all cursor-pointer"
                    >
                      {pill}
                    </button>
                  ))}
                </div>

                {/* Chat window */}
                <div className="border border-neutral-200 dark:border-neutral-800 rounded h-44 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 p-3 space-y-3">
                  {ragChat.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-neutral-400 font-mono text-[10px]">
                      <span>Waiting for questions... Submit one above!</span>
                    </div>
                  ) : (
                    ragChat.map((msg, i) => (
                      <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}>
                        <div className={`p-2 rounded max-w-[85%] text-[11px] ${
                          msg.sender === 'user' 
                            ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded-tr-none' 
                            : 'bg-neutral-200 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        {msg.chunk && (
                          <div className="p-2 bg-yellow-100/30 dark:bg-yellow-950/20 border border-yellow-200/40 dark:border-yellow-900/30 rounded text-[9px] font-mono text-neutral-500 dark:text-neutral-400 max-w-[90%]">
                            <span className="font-bold block text-yellow-600 dark:text-yellow-400 mb-1">Retrieved PDF Citation Segment (Match Score: {msg.score}):</span>
                            "{msg.chunk}"
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Input field */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask standard questions..."
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && runRagChat()}
                    disabled={loading}
                    className="flex-1 bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-black dark:focus:border-white text-neutral-800 dark:text-neutral-200"
                  />
                  <button
                    onClick={() => runRagChat()}
                    disabled={loading}
                    className="p-2 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 rounded hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 5. SPEECH TRANSFORMER PLAYGROUND */}
            {project.playground.type === 'transformer' && !loading && (
              <div className="space-y-4 text-xs text-left">
                <p className="text-neutral-500 dark:text-neutral-400">Type hostile user remarks (or select a bilingual preset) to execute toxicity reframing into elegant professional etiquette:</p>

                <div className="flex gap-1.5">
                  {['"You are idiots"', '"هذا الكود غبي وسيئ جداً"'].map(preset => (
                    <button
                      key={preset}
                      onClick={() => runTransformer(preset)}
                      className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-600 dark:text-neutral-300 rounded font-mono text-[10px] text-left cursor-pointer"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Enter customized high-conflict phrases here..."
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 text-xs px-3 py-2 rounded focus:outline-none focus:border-black dark:focus:border-white text-neutral-800 dark:text-neutral-200"
                  />
                  <button
                    onClick={() => runTransformer()}
                    className="w-full py-2 bg-neutral-950 hover:bg-neutral-900 text-white dark:bg-white dark:hover:bg-neutral-100 dark:text-neutral-950 font-bold rounded"
                  >
                    Reframer Transformer Pipeline
                  </button>
                </div>

                {transformedOutput && (
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded space-y-3 animate-slide-up text-left">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-red-500 font-bold block">HOSTILE INPUT REGISTERED:</span>
                      <p className="text-xs italic text-neutral-500 dark:text-neutral-400">{transformedOutput.original}</p>
                    </div>
                    <div className="space-y-1 border-t border-neutral-100 dark:border-neutral-900 pt-2">
                      <span className="text-[10px] font-mono text-emerald-500 font-bold block">POLITE REWRITTEN ASSERTION:</span>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{transformedOutput.clean}</p>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 border-t border-neutral-100 dark:border-neutral-900 pt-2">
                      <span>Mitigation effectiveness: <b>{transformedOutput.mitigationRate}</b></span>
                      <span>Classifier: <b>{transformedOutput.dialect}</b></span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. TABIBI SCHEDULER PLAYGROUND */}
            {project.playground.type === 'appointment' && !loading && (
              <div className="space-y-4 text-xs text-left">
                <p className="text-neutral-500 dark:text-neutral-400">Interact with Tabibi’s booking simulation. Secure conflict-free physician slots instantly:</p>

                <form onSubmit={runScheduler} className="space-y-3 p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-neutral-400">Doctor</label>
                      <select
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-[11px] py-1 px-1.5 rounded"
                      >
                        <option>Dr. Sarah Jenkins (Cardiologist)</option>
                        <option>Dr. Emily Carter (Infectious Expert)</option>
                        <option>Dr. Omar Farooq (AI Diagnostics)</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-mono uppercase text-neutral-400">Available Slot</label>
                      <select
                        value={slot}
                        onChange={(e) => setSlot(e.target.value)}
                        className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-[11px] py-1 px-1.5 rounded"
                      >
                        <option>09:30 AM</option>
                        <option>10:30 AM</option>
                        <option>02:00 PM</option>
                        <option>04:30 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase text-neutral-400">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anes Amrane"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-[11px] py-1.5 px-2.5 rounded"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Confirm Secured Reservation</span>
                  </button>
                </form>

                {appointmentReceipt && (
                  <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-dashed border-neutral-300 dark:border-neutral-800 rounded space-y-2.5 animate-slide-up text-[11px] font-mono text-left">
                    <div className="flex justify-between items-center text-neutral-900 dark:text-white font-bold border-b border-neutral-200 dark:border-neutral-900 pb-1.5">
                      <span>RESERVATION SUCCESSFUL</span>
                      <span className="text-[10px]">{appointmentReceipt.id}</span>
                    </div>
                    <p>Physician: <b>{appointmentReceipt.doctor}</b></p>
                    <p>Reserved Slot: <b>{appointmentReceipt.slot}</b></p>
                    <p>Patient: <b>{appointmentReceipt.patient}</b></p>
                    <div className="flex justify-between items-center text-[9px] text-neutral-400 pt-1.5 border-t border-neutral-200 dark:border-neutral-900">
                      <span>JWT Key: {appointmentReceipt.code}</span>
                      <span>Booked at: {appointmentReceipt.time}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
