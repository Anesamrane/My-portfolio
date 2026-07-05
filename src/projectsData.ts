import { Project } from './types';

export const projectsData: Project[] = [
  {
    id: 'solarguard',
    title: 'SolarGuard',
    description: 'Multimodal knowledge graph + Relational Graph Attention Network (RGAT) for photovoltaic fault detection, incubated as a startup at CDE Blida 1 (Ministerial Decree 1275).',
    longDescription: 'SolarGuard is a pioneering AI system for predictive maintenance of photovoltaic systems. Defended with Excellence, the project constructs a multimodal property graph mapping 15,900 solar cells across 265 solar panels. It utilizes an end-to-end pipeline consisting of electroluminescence (EL) image preprocessing with CLAHE, feature extraction via a fine-tuned EfficientNet-B0 model, Multimodal Knowledge Graph (MMKG) construction in PyTorch Geometric, and fault classification using a Relational Graph Attention Network (RGAT). Ablation studies showed that omitting visual nodes drops F1-Macro to 0.2076, demonstrating visual signals as the primary discriminative feature.',
    tags: ['RGAT', 'EfficientNet', 'PyTorch Geometric', 'Knowledge Graphs', 'Computer Vision'],
    category: 'graph',
    codeUrl: 'https://github.com/Anesamrane',
    demoUrl: '#',
    metrics: [
      { label: 'F1-Macro Score', value: '0.8092' },
      { label: 'Cell Nodes Modeled', value: '15,900' },
      { label: 'Ablation Baseline F1', value: '0.2076' }
    ],
    techDetails: [
      'Built an end-to-end multimodal pipeline combining electroluminescence image preprocessing and metadata.',
      'Fine-tuned EfficientNet-B0 visual feature extractor and CLAHE preprocessing.',
      'Constructed a PyTorch Geometric N-MMKG linking visual features and structured metadata.',
      'Trained a Relational Graph Attention Network (RGAT) for 5-class solar cell defect classification.',
      'Deployed as an interactive Streamlit inference dashboard and incubated under Ministerial Decree 1275.'
    ],
    playground: {
      type: 'predictive',
      placeholder: 'Run SolarGuard RGAT Fault Inference Simulation'
    }
  },
  {
    id: 'news-automation',
    title: 'AI News Automation Agent',
    description: 'Autonomous n8n pipeline scraping Hacker News AI threads, summarizing via Groq LLM, and publishing French-language summaries to Discord — fully automated.',
    longDescription: 'An autonomous agent pipeline engineered to automatically monitor and summarize high-impact AI discussions and research. Using n8n for webhook trigger orchestration, the system scrapes active Hacker News AI threads, processes the unstructured textual discussions via a Groq LLM instance, translates the synthesized takeaways, and publishes fully curated French-language briefings directly to Discord developer servers. The architecture is formally documented and modeled under the Wooldridge & Jennings agent-property model, demonstrating high reactivity, proactivity, and social communication abilities.',
    tags: ['LLM Agents', 'n8n', 'Groq LLM', 'Discord API'],
    category: 'agents',
    codeUrl: 'https://github.com/Anesamrane',
    metrics: [
      { label: 'Summarization LLM', value: 'Groq LLM' },
      { label: 'Agent Paradigm', value: 'W&J Model' },
      { label: 'Deployment Channel', value: 'Discord Webhook' }
    ],
    techDetails: [
      'Engineered a fully automated n8n pipeline with custom Javascript automation nodes.',
      'Leveraged Groq LLM API for high-throughput, low-latency summarization and extraction.',
      'Translated and localized English technical threads into refined French technical updates.',
      'Built and evaluated according to Wooldridge & Jennings agent-property definitions.'
    ],
    playground: {
      type: 'agent',
      placeholder: 'Trigger n8n Agent Summary Dispatcher'
    }
  },
  {
    id: 'fire-detection',
    title: 'Real-Time Fire & Smoke Detection',
    description: 'Lightweight YOLOv8 computer vision system reaching a mAP@0.5 of 0.803, optimized for urban and industrial hazard identification.',
    longDescription: 'A custom computer vision pipeline designed for early wildfire, urban, and industrial hazard identification. Utilizing custom annotated datasets, the model trains an edge-optimized YOLOv8 model calibrated to identify flames and smoke boundaries. The research applies advanced image data augmentations, strict validation dataset cleaning, comparative tests with alternative object detection architectures, and explainable AI techniques (XAI) to inspect visual features and optimize confidence bounds.',
    tags: ['YOLOv8', 'Computer Vision', 'PyTorch', 'Explainable AI'],
    category: 'cv',
    codeUrl: 'https://github.com/Anesamrane',
    demoUrl: '#',
    metrics: [
      { label: 'Validation mAP@0.5', value: '0.803' },
      { label: 'Architecture Base', value: 'YOLOv8' },
      { label: 'Inference speed', value: 'Real-Time' }
    ],
    techDetails: [
      'Configured and fine-tuned a custom YOLOv8 deep learning network.',
      'Conducted extensive image data augmentations and dataset scrubbing workflows.',
      'Leveraged explainable AI (XAI) techniques for detection boundary verification.',
      'Ran rigorous model comparison experiments to find optimal trade-offs between precision and speed.'
    ],
    playground: {
      type: 'vision',
      placeholder: 'Calibrate YOLOv8 Detection Confidence'
    }
  },
  {
    id: 'abusive-transformer',
    title: 'Abusive-to-Friendly Speech Transformer',
    description: 'NLP pipeline detecting hostile or abusive text and rewriting it in a neutral, professional tone for Arabic and English.',
    longDescription: 'An elegant natural language processing system developed to flag hostile prose and rewrite it into professional, neutral language. Designed with bilingual transformers, the pipeline analyzes incoming text blocks in both Arabic and English, decomposes toxic structures, and applies a sequence-to-sequence transformer model to perform polite paraphrasing. The system includes an interactive CLI sentiment analysis tool to check and analyze the tone of the input content.',
    tags: ['Transformers', 'NLP', 'Arabic NLP', 'Sentiment Analysis'],
    category: 'nlp',
    codeUrl: 'https://github.com/Anesamrane',
    metrics: [
      { label: 'Language Engines', value: 'Arabic & English' },
      { label: 'Primary Interface', value: 'CLI Tool' },
      { label: 'Task Paradigm', value: 'Text Reframing' }
    ],
    techDetails: [
      'Developed custom natural language preprocessing tokenizers for English and Arabic text.',
      'Built toxic sequence classifiers to isolate hostile tokens and text segments.',
      'Trained a custom text-rewriting pipeline to convert abusive tones into polite corporate phrasing.',
      'Crafted a high-utility CLI sentiment analysis tool supporting both native languages.'
    ],
    playground: {
      type: 'transformer',
      placeholder: 'Test Bilingual Politeness Rewrite Engine'
    }
  },
  {
    id: 'pdf-rag',
    title: 'PDF-Based AI Chatbot (RAG)',
    description: 'Retrieval-augmented generation chatbot that ingests multi-page PDF documents and answers natural-language questions with zero hallucinations.',
    longDescription: 'A semantic document assistant engineered around Retrieval-Augmented Generation (RAG) principles. The system parses uploaded PDF documents, splits contents recursively with optimized token overlapping, builds embedding vectors, and indexes them inside a local similarity vector store. This allows users to conduct natural-language queries that return precise contextual answers sourced from the PDF, with exact source citation alignment to prevent LLM hallucinations.',
    tags: ['RAG', 'LangChain', 'Vector Databases', 'NLP'],
    category: 'nlp',
    codeUrl: 'https://github.com/Anesamrane',
    metrics: [
      { label: 'Framework Stack', value: 'LangChain' },
      { label: 'Pipeline Type', value: 'RAG Architecture' },
      { label: 'Context Lookup', value: 'Local VectorDB' }
    ],
    techDetails: [
      'Built a custom document parser that ingests and cleans unstructured PDF data.',
      'Implemented recursive chunking strategies with overlapping token boundaries.',
      'Configured local vector similarity index databases for rapid embedding searches.',
      'Designed a secure prompt synthesis loop that generates answers with exact parent citations.'
    ],
    playground: {
      type: 'rag',
      placeholder: 'Ingest research PDF and ask questions'
    }
  },
  {
    id: 'tabibi',
    title: 'Tabibi — Medical Appointment Platform',
    description: 'Full-stack online medical appointment booking platform featuring doctor scheduling, patient records, and real-time calendars.',
    longDescription: 'Tabibi ("My Doctor") is a full-stack web platform built as a Bachelor final-year project to solve medical coordination issues. Developed with a robust relational database and secure REST APIs, the system enables patients to discover available general practitioners or specialists, book appointment times, and update medical profiles. Doctors use a secure console to oversee patient queues, manage schedules, and coordinate records without conflicts.',
    tags: ['React', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS'],
    category: 'dev',
    codeUrl: 'https://github.com/Anesamrane',
    metrics: [
      { label: 'Backend Server', value: 'Node.js / Express' },
      { label: 'Database Engine', value: 'MySQL' },
      { label: 'Frontend Framework', value: 'React & Tailwind' }
    ],
    techDetails: [
      'Created a full-stack, responsive web application from scratch.',
      'Designed transactional MySQL queries with strict lockings to prevent double-booking.',
      'Developed a clean, secure Express.js REST API for user authentication and records.',
      'Built a sleek patient booking flow and professional doctor schedules panel using React.'
    ],
    playground: {
      type: 'appointment',
      placeholder: 'Search doctor and schedule a slot'
    }
  }
];
