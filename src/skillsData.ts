import { SkillCategory } from './types';

export const skillsData: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    icon: 'psychology',
    skills: [
      { name: 'PyTorch', level: 5, description: 'Core neural network design, custom autograd functions, tensor manipulation, and multi-GPU training.', years: 4, projects: ['solarguard', 'fire-detection', 'abusive-transformer'] },
      { name: 'Scikit-learn', level: 5, description: 'Classical ML algorithms, hyperparameter tuning, pipelines, feature engineering, and dimensional reduction.', years: 5, projects: ['solarguard'] },
      { name: 'EfficientNet', level: 4, description: 'Feature extraction networks, compound scaling optimization, and transfer learning for advanced image classification.', years: 2, projects: ['solarguard'] },
      { name: 'Machine Learning', level: 5, description: 'General statistical learning, regression, classification, clustering, evaluation metrics, and error analysis.', years: 5, projects: ['solarguard', 'fire-detection', 'pdf-rag', 'abusive-transformer'] },
      { name: 'Deep Learning', level: 5, description: 'Convolutional nets, recurrence, transformers, attention mechanisms, normalization, and optimization techniques.', years: 4, projects: ['solarguard', 'fire-detection', 'abusive-transformer'] }
    ]
  },
  {
    title: 'Computer Vision',
    icon: 'visibility',
    skills: [
      { name: 'OpenCV', level: 5, description: 'Image processing pipelines, geometric transforms, video frame parsing, contour detection, and color masking.', years: 4, projects: ['solarguard', 'fire-detection'] },
      { name: 'YOLOv8', level: 5, description: 'Object detection model training, transfer learning, quantization, deployment, and video tracking pipelines.', years: 3, projects: ['fire-detection'] },
      { name: 'Image Processing', level: 5, description: 'Frequency filtering, morphological operations, thresholding, and histogram equalization.', years: 4, projects: ['solarguard', 'fire-detection'] }
    ]
  },
  {
    title: 'NLP',
    icon: 'translate',
    skills: [
      { name: 'spaCy', level: 4, description: 'Named Entity Recognition (NER), tokenization, dependency parsing, lemmatization, and customized NLP pipelines.', years: 3, projects: ['abusive-transformer'] },
      { name: 'RAG', level: 5, description: 'Retrieval-Augmented Generation, chunking algorithms, hybrid retrieval, re-ranking, and vector databases.', years: 2, projects: ['pdf-rag', 'news-automation'] },
      { name: 'Text Classification', level: 5, description: 'Toxicity classification, sentiment analysis, clustering, and theme tagging using deep models and classical ML.', years: 4, projects: ['abusive-transformer'] },
      { name: 'Arabic NLP', level: 5, description: 'Arabic morphology parsing, dialect analysis, Farasa integration, and fine-tuning BERT models on Arabized content.', years: 3, projects: ['abusive-transformer'] }
    ]
  },
  {
    title: 'Graph AI',
    icon: 'hub',
    skills: [
      { name: 'PyTorch Geometric', level: 4, description: 'Message-passing interface, message pooling, spatial convolutions on graph structures, and RGAT layers.', years: 2, projects: ['solarguard'] },
      { name: 'Knowledge Graphs', level: 4, description: 'Ontology construction, triplet extraction, entity alignment, and graph-based reasoning.', years: 2, projects: ['solarguard'] },
      { name: 'GAT', level: 4, description: 'Graph Attention Networks, node-level coefficient calculation, and multi-head attention over topological graphs.', years: 2, projects: ['solarguard'] },
      { name: 'RGAT', level: 4, description: 'Relational Graph Attention Networks handling multiple relation types between nodes concurrently.', years: 2, projects: ['solarguard'] }
    ]
  },
  {
    title: 'Development',
    icon: 'code',
    skills: [
      { name: 'Python', level: 5, description: 'Primary research language, asynchronous data pipelines, scientific computing (NumPy, Pandas), and system automation.', years: 6, projects: ['solarguard', 'fire-detection', 'news-automation', 'pdf-rag', 'abusive-transformer'] },
      { name: 'TypeScript', level: 4, description: 'Type-safe full-stack programming, interfaces, utility typing, generic constraints, and asynchronous event loops.', years: 3, projects: ['tabibi', 'news-automation'] },
      { name: 'Next.js', level: 4, description: 'Server components, dynamic layouts, server actions, and search engine optimization.', years: 2, projects: ['tabibi'] },
      { name: 'React', level: 5, description: 'Hooks, responsive layout, context providers, custom canvas rendering, and state machines.', years: 4, projects: ['tabibi'] },
      { name: 'Node.js', level: 4, description: 'Express servers, cluster scaling, encryption modules, file operations, and secure session authentications.', years: 3, projects: ['tabibi'] },
      { name: 'MySQL', level: 4, description: 'Relational schemas, locking transactions, indexes, aggregation, and query optimizations.', years: 3, projects: ['tabibi'] }
    ]
  },
  {
    title: 'Tools',
    icon: 'build',
    skills: [
      { name: 'Git', level: 5, description: 'Branch management, rebasing, interactive conflict resolution, and automated GitHub hook configurations.', years: 5, projects: ['solarguard', 'fire-detection', 'pdf-rag', 'abusive-transformer', 'tabibi'] },
      { name: 'Docker', level: 4, description: 'Multi-stage builds, container isolation, environment variable orchestration, and microservice bindings.', years: 3, projects: ['fire-detection'] },
      { name: 'Vercel', level: 5, description: 'Instant previews, edge functions, domain linkings, and automated continuous integration deployments.', years: 3, projects: ['tabibi'] },
      { name: 'n8n', level: 5, description: 'Complex visually programmed automated workflows, webhook triggers, API integrations, and continuous data scraping.', years: 2, projects: ['news-automation'] }
    ]
  }
];
