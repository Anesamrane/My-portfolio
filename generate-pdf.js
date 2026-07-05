import { jsPDF } from 'jspdf';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateStaticPDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const marginX = 15;
  let y = 15;
  const pageWidth = 210;
  const contentWidth = pageWidth - (marginX * 2); // 180mm

  const checkPageOverflow = (heightNeeded) => {
    if (y + heightNeeded > 280) {
      doc.addPage();
      y = 15;
    }
  };

  const drawHeader = () => {
    // Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(10, 10, 10);
    doc.text('AMRANE ANES', pageWidth / 2, y, { align: 'center' });
    y += 7;

    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(60, 60, 60);
    doc.text('AI Engineer | Machine Learning | Full-Stack Developer', pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Contact details
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    const contacts = 'anesamrane9@gmail.com | github.com/Anesamrane | anes-amrane.vercel.app | Blida, Algeria';
    doc.text(contacts, pageWidth / 2, y, { align: 'center' });
    y += 8;
  };

  const drawSectionTitle = (title) => {
    checkPageOverflow(12);
    y += 2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 15, 15);
    doc.text(title.toUpperCase(), marginX, y);
    y += 2;

    // Divider line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.2);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 5;
  };

  // 1. HEADER
  drawHeader();

  // 2. SUMMARY
  drawSectionTitle('Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const summaryText = 'AI Engineering graduate specialising in machine learning, computer vision, nlp and graph neural networks. Built and deployed an end-to-end multimodal AI pipeline for solar panel defect detection and maintenance recommendation as a graduation project, covering deep learning, model fine-tuning, knowledge graph construction, and RGAT-based classification. Complementary full-stack development background with production web and NLP projects. Seeking an AI/ML or software engineering role with an international or remote-friendly team.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, marginX, y);
  y += (summaryLines.length * 4) + 3;

  // 3. EDUCATION
  drawSectionTitle('Education');
  
  // Master's
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text("Master's in Intelligent Systems Engineering (AI)", marginX, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('September 2024 – June 2026 | Algeria', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;
  
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(60, 60, 60);
  doc.text('Université Saad Dahleb Blida', marginX, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  const m1Text = '• Graduation project: AI-Based Predictive Maintenance for Solar Panels Using Multimodal Knowledge Graph.';
  const m1Lines = doc.splitTextToSize(m1Text, contentWidth - 4);
  doc.text(m1Lines, marginX + 4, y);
  y += (m1Lines.length * 4);

  const m2Text = '• Implemented EfficientNet-B0 fine-tuning, preprocessing (CLAHE), MMKG construction linking visual features and structured metadata, and Relational Graph Attention Network (RGAT) training for fault classification.';
  const m2Lines = doc.splitTextToSize(m2Text, contentWidth - 4);
  doc.text(m2Lines, marginX + 4, y);
  y += (m2Lines.length * 4);

  const m3Text = '• Core coursework: Deep Learning, Graph Neural Networks, Computer Vision, Intelligent Agents & Multi-Agent Systems.';
  const m3Lines = doc.splitTextToSize(m3Text, contentWidth - 4);
  doc.text(m3Lines, marginX + 4, y);
  y += (m3Lines.length * 4) + 4;

  // Bachelor's
  checkPageOverflow(15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text("Bachelor's in Computer Science", marginX, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(80, 80, 80);
  doc.text('Graduated 2024 | Algeria', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;
  
  doc.setFont('helvetica', 'italic');
  doc.setTextColor(60, 60, 60);
  doc.text('Université Saad Dahleb Blida', marginX, y);
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  const b1Text = '• Final-year project: Tabibi — full-stack web platform for online medical appointment booking.';
  const b1Lines = doc.splitTextToSize(b1Text, contentWidth - 4);
  doc.text(b1Lines, marginX + 4, y);
  y += (b1Lines.length * 4) + 4;

  // 4. TECHNICAL SKILLS
  drawSectionTitle('Technical Skills');
  doc.setFontSize(9);
  
  const skillCategories = [
    { label: 'AI / ML', desc: 'PyTorch, PyTorch Geometric, EfficientNet, RGAT, Scikit-learn, spaCy, OpenCV, NumPy, Pandas' },
    { label: 'Knowledge Graphs & GNNs', desc: 'MMKG construction, graph attention networks (GAT / RGAT), property graphs' },
    { label: 'NLP', desc: 'Text classification, sentiment analysis, abusive speech detection & rewriting, Arabic NLP' },
    { label: 'Programming Languages', desc: 'Python, JavaScript, TypeScript' },
    { label: 'Web & Backend', desc: 'Next.js, React, Node.js, Express.js, MySQL, Tailwind CSS, REST APIs' },
    { label: 'Tools & DevOps', desc: 'Git, GitHub, Docker (basics), Vercel, n8n (workflow automation), VS Code' }
  ];

  skillCategories.forEach(skill => {
    checkPageOverflow(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(20, 20, 20);
    doc.text(`${skill.label}: `, marginX, y);
    const labelWidth = doc.getTextWidth(`${skill.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(60, 60, 60);
    const skillLines = doc.splitTextToSize(skill.desc, contentWidth - labelWidth);
    doc.text(skillLines, marginX + labelWidth, y);
    y += (skillLines.length * 4) + 1;
  });
  y += 3;

  // 5. PROJECTS
  drawSectionTitle('Projects');

  // Project 1
  checkPageOverflow(30);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('AI-Based Predictive Maintenance for Solar Panels Using MMKG', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text("Master's Graduation Project | Juin 2026", pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p1Bullet1 = '• Built an end-to-end multimodal pipeline (EL image preprocessing, EfficientNet-B0 fine-tuning, N-MMKG construction in PyTorch Geometric, RGAT training) for 5-class solar cell defect classification across 15,900 cells / 265 panels.';
  const p1B1Lines = doc.splitTextToSize(p1Bullet1, contentWidth - 4);
  doc.text(p1B1Lines, marginX + 4, y);
  y += (p1B1Lines.length * 4);

  const p1Bullet2 = '• Achieved F1-Macro of 0.8092, outperforming RGCN and RGAT+MLP baselines; ablation study showed visual (EL image) modality is the primary discriminative signal (F1 drops to 0.21 without it).';
  const p1B2Lines = doc.splitTextToSize(p1Bullet2, contentWidth - 4);
  doc.text(p1B2Lines, marginX + 4, y);
  y += (p1B2Lines.length * 4);

  const p1Bullet3 = '• Deployed as an interactive Streamlit inference dashboard; incubated as a startup (SolarGuard) at CDE Blida 1 under Ministerial Decree 1275.';
  const p1B3Lines = doc.splitTextToSize(p1Bullet3, contentWidth - 4);
  doc.text(p1B3Lines, marginX + 4, y);
  y += (p1B3Lines.length * 4) + 4;

  // Project 2
  checkPageOverflow(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('AI News Automation Agent', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Personal Project | 2026', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p2Bullet1 = '• Built a reactive agent pipeline in n8n: scrapes Hacker News AI threads, processes content via Groq LLM, and publishes French-language summaries to Discord — fully automated.';
  const p2B1Lines = doc.splitTextToSize(p2Bullet1, contentWidth - 4);
  doc.text(p2B1Lines, marginX + 4, y);
  y += (p2B1Lines.length * 4);

  const p2Bullet2 = '• Framed and documented the system using the Wooldridge & Jennings agent-property framework (reactivity, proactivity, social ability).';
  const p2B2Lines = doc.splitTextToSize(p2Bullet2, contentWidth - 4);
  doc.text(p2B2Lines, marginX + 4, y);
  y += (p2B2Lines.length * 4) + 4;

  // Project 3
  checkPageOverflow(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Real-Time Fire and Smoke Detection', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('University Project | 2026', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p3Bullet1 = '• Built a YOLOv8-based real-time fire and smoke detection system, achieving mAP@0.5 of 0.803.';
  const p3B1Lines = doc.splitTextToSize(p3Bullet1, contentWidth - 4);
  doc.text(p3B1Lines, marginX + 4, y);
  y += (p3B1Lines.length * 4);

  const p3Bullet2 = '• Applied advanced image data augmentation, validation dataset cleaning, explainable AI techniques, and model comparison experiments.';
  const p3B2Lines = doc.splitTextToSize(p3Bullet2, contentWidth - 4);
  doc.text(p3B2Lines, marginX + 4, y);
  y += (p3B2Lines.length * 4) + 4;

  // Project 4
  checkPageOverflow(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Abusive-to-Friendly Speech Transformer', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('NLP Project | 2025', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p4Bullet1 = '• Developed an NLP pipeline to detect hostile or abusive text and rewrite it in a neutral tone; supports Arabic and English.';
  const p4B1Lines = doc.splitTextToSize(p4Bullet1, contentWidth - 4);
  doc.text(p4B1Lines, marginX + 4, y);
  y += (p4B1Lines.length * 4);

  const p4Bullet2 = '• Includes a CLI sentiment analysis tool for both languages.';
  const p4B2Lines = doc.splitTextToSize(p4Bullet2, contentWidth - 4);
  doc.text(p4B2Lines, marginX + 4, y);
  y += (p4B2Lines.length * 4) + 4;

  // Project 5
  checkPageOverflow(15);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('PDF-Based AI Chatbot (RAG)', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text('Personal Project | 2025', pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p5Bullet1 = '• Built a retrieval-augmented generation chatbot that ingests PDF documents and answers natural-language questions via an NLP pipeline (chunking, embedding, retrieval).';
  const p5B1Lines = doc.splitTextToSize(p5Bullet1, contentWidth - 4);
  doc.text(p5B1Lines, marginX + 4, y);
  y += (p5B1Lines.length * 4) + 4;

  // Project 6
  checkPageOverflow(20);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text('Tabibi — Medical Appointment Platform', marginX, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(80, 80, 80);
  doc.text("Bachelor's Final-Year Project | Juin 2024", pageWidth - marginX, y, { align: 'right' });
  y += 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  const p6Bullet1 = '• Full-stack web application: Node.js / Express REST API, MySQL database, React / Tailwind CSS frontend.';
  const p6B1Lines = doc.splitTextToSize(p6Bullet1, contentWidth - 4);
  doc.text(p6B1Lines, marginX + 4, y);
  y += (p6B1Lines.length * 4);

  const p6Bullet2 = '• Features: doctor scheduling, patient records, appointment booking and management.';
  const p6B2Lines = doc.splitTextToSize(p6Bullet2, contentWidth - 4);
  doc.text(p6B2Lines, marginX + 4, y);
  y += (p6B2Lines.length * 4) + 4;

  // 6. LANGUAGES
  drawSectionTitle('Languages');
  checkPageOverflow(10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  doc.text('• Arabic: Native', marginX + 4, y);
  y += 4.5;
  doc.text('• English: B2 — Professional working proficiency', marginX + 4, y);
  y += 4.5;
  doc.text('• French: B1 — Intermediate', marginX + 4, y);
  y += 6;

  // 7. ADDITIONAL
  drawSectionTitle('Additional');
  checkPageOverflow(15);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  
  const add1 = '• Open to relocation and fully remote positions; actively exploring international AI engineering opportunities.';
  const add1Lines = doc.splitTextToSize(add1, contentWidth - 4);
  doc.text(add1Lines, marginX + 4, y);
  y += (add1Lines.length * 4);

  const add2 = '• Consistent self-learner: built multiple production-quality projects independently alongside full-time academic work.';
  const add2Lines = doc.splitTextToSize(add2, contentWidth - 4);
  doc.text(add2Lines, marginX + 4, y);
  y += (add2Lines.length * 4);

  const add3 = '• Interests: generative AI, agent-based systems, graph neural networks, startup culture, machine learning and computer vision and NLP.';
  const add3Lines = doc.splitTextToSize(add3, contentWidth - 4);
  doc.text(add3Lines, marginX + 4, y);
  y += (add3Lines.length * 4);

  // Output as array buffer and write
  const pdfBuffer = doc.output('arraybuffer');
  
  const dir = path.join(__dirname, 'public');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(dir, 'Amrane_Anes_CV.pdf'), Buffer.from(pdfBuffer));
  console.log('PDF compiled successfully to public/Amrane_Anes_CV.pdf');
}

generateStaticPDF();
