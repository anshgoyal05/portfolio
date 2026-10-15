export interface ProjectItem {
  id: string;
  name: string;
  repoName: string;
  category: string;
  tagline: string;
  description: string[];
  tech: string[];
  github: string;
  demo?: string;
  isPinned: boolean;
  language: string;
  stars?: number;
  forks?: number;
  accentColor?: string;
  badge?: string;
}

export const VERIFIED_PROJECTS: ProjectItem[] = [
  {
    id: "wa-crm-intelligence",
    name: "wa-crm-intelligence",
    repoName: "wa-crm-intelligence",
    category: "AI Revenue Intelligence & Chrome Extension",
    tagline: "AI-powered revenue platform that converts WhatsApp Web chats into structured CRM intelligence and high-value leads.",
    description: [
      "Built during the 36-hour national hackathon 'Code With Bharat 3.0' by Team Nexus Flow, securing Top 10 among 65+ competing teams.",
      "Operates seamlessly as a privacy-focused Chrome Extension converting unstructured WhatsApp Web conversations into structured sales intelligence.",
      "Automates lead qualification, detects purchase intent and missed follow-ups, and suggests context-aware replies for higher pipeline velocity."
    ],
    tech: ["JavaScript", "Chrome Extension API", "React", "AI / LLM", "Node.js", "NLP"],
    github: "https://github.com/anshgoyal05/wa-crm-intelligence",
    isPinned: true,
    language: "JavaScript",
    accentColor: "from-amber-500/10 via-orange-500/5 to-transparent",
    badge: "Top 10 Finalist • National Hackathon"
  },
  {
    id: "collabflow",
    name: "collabflow",
    repoName: "collabflow",
    category: "Distributed Systems & Real-Time Backend",
    tagline: "Production-grade, horizontally scalable collaborative document editor built with Go, WebSockets, CRDTs, and Redis.",
    description: [
      "Engineered a scalable collaborative editing backend in Go handling concurrent editing with WebSockets and Conflict-free Replicated Data Types (CRDTs).",
      "Designed distributed architecture with Redis Pub/Sub for cross-pod broadcast, a write-back buffer for persistence, and PostgreSQL with pgvector for HNSW semantic vector search.",
      "Full observability suite featuring Prometheus metrics, Grafana dashboards, Uber Zap logging, Docker, and Kubernetes ingress router."
    ],
    tech: ["Go", "WebSockets", "CRDTs", "Redis", "PostgreSQL", "pgvector", "Docker", "Kubernetes", "Prometheus"],
    github: "https://github.com/anshgoyal05/collabflow",
    isPinned: true,
    language: "Go",
    accentColor: "from-orange-500/10 via-amber-500/5 to-transparent",
    badge: "Distributed Systems • Go"
  },
  {
    id: "recon-bot",
    name: "recon-bot",
    repoName: "recon-bot",
    category: "Vision LLM & Statutory Discrepancy Engine",
    tagline: "Automated Three-Way Matching (PO ↔ Invoice ↔ GRN) with GST-aware discrepancy detection engineered for Indian MSMEs.",
    description: [
      "Ingests folders of unstructured PDF invoices, purchase orders, and goods receipt notes using Google Gemini Flash Vision LLM with structured Pydantic schemas.",
      "Zero-hallucination deterministic statutory rules engine executing all commercial, mathematical, and tax reconciliation checks in pure Python.",
      "Full Indian statutory GST intelligence: Modulo-36 GSTIN format validation, Sections 7 & 8 IGST routing (CGST/SGST vs IGST), and dynamic 2025 HSN rate lookup."
    ],
    tech: ["Python", "FastAPI", "Gemini Vision AI", "Pydantic", "GST Compliance", "Next.js", "Docker"],
    github: "https://github.com/anshgoyal05/recon-bot",
    isPinned: true,
    language: "Python",
    accentColor: "from-red-500/10 via-orange-500/5 to-transparent",
    badge: "Vision AI • FinTech MSME"
  },
  {
    id: "CivicSync",
    name: "CivicSync",
    repoName: "CivicSync",
    category: "AI-Driven Urban Grievance & Accountability",
    tagline: "Smart civic complaint prioritization, automated department routing, transparent workflows, and citizen-admin portals.",
    description: [
      "Led a hackathon team engineering a full-stack AI grievance platform that automates complaint prioritization and department routing using ML models.",
      "Implemented analytics dashboards, SLA milestone tracking, and role-based access controls to boost civic transparency and administrative efficiency."
    ],
    tech: ["TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Docker", "Python", "Machine Learning"],
    github: "https://github.com/anshgoyal05/CivicSync",
    isPinned: true,
    language: "TypeScript",
    accentColor: "from-amber-500/10 via-yellow-500/5 to-transparent",
    badge: "Urban AI • Hackathon Lead"
  },
  {
    id: "RescueNet",
    name: "RescueNet",
    repoName: "RescueNet",
    category: "AI-Powered Missing Persons Identification",
    tagline: "Combines facial recognition matching and community reporting to accelerate missing persons identification and recovery.",
    description: [
      "Built an AI-powered missing-person identification platform on the MERN stack integrating OpenCV and TensorFlow for face feature extraction and similarity matching.",
      "Designed a robust client-server architecture with Express/Node.js, React, and MongoDB supporting high-performance image uploads and real-time alerts."
    ],
    tech: ["JavaScript", "MongoDB", "Express.js", "React", "Node.js", "OpenCV", "TensorFlow", "TypeScript"],
    github: "https://github.com/anshgoyal05/RescueNet",
    isPinned: true,
    language: "JavaScript",
    accentColor: "from-orange-500/10 via-red-500/5 to-transparent",
    badge: "Computer Vision • Social Good"
  },
  {
    id: "CaptivatingJourneys",
    name: "CaptivatingJourneys",
    repoName: "CaptivatingJourneys",
    category: "Responsive Tourism & Travel Experience Portal",
    tagline: "40+ page responsive travel website showcasing Indian cultural destinations, attraction guides, and travel blogs.",
    description: [
      "Built a comprehensive, 40+ page responsive travel portal covering Rajasthan, Kashmir, Chandigarh, and Himachal Pradesh.",
      "Engineered with clean semantic HTML5, modular reusable CSS components, responsive navigation, image galleries, and reviews."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"],
    github: "https://github.com/anshgoyal05/CaptivatingJourneys",
    isPinned: true,
    language: "HTML",
    accentColor: "from-yellow-500/10 via-amber-500/5 to-transparent",
    badge: "40+ Pages • Responsive"
  },
  // Additional noteworthy public repositories
  {
    id: "citytwin-ai",
    name: "citytwin-ai",
    repoName: "citytwin-ai",
    category: "Urban Digital Twin & AI Planning",
    tagline: "AI-powered Digital Twin for urban infrastructure planning and explainable hospital site recommendations.",
    description: [
      "Provides explainable hospital site recommendations for Chandigarh using real government open data, 3D spatial mapping, and scenario comparisons."
    ],
    tech: ["TypeScript", "Next.js", "3D Maps", "Spatial Analysis", "Machine Learning"],
    github: "https://github.com/anshgoyal05/citytwin-ai",
    isPinned: false,
    language: "TypeScript"
  },
  {
    id: "campushub",
    name: "campushub",
    repoName: "campushub",
    category: "Campus Event Management Platform",
    tagline: "University event discovery, student registration, live check-ins, and present-only attendance exports.",
    description: [
      "Explores university event management workflows: student event discovery, RSVP management, live attendee check-in, and instant CSV/Excel attendance exports."
    ],
    tech: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/anshgoyal05/campushub",
    isPinned: false,
    language: "TypeScript"
  },
  {
    id: "Tech-Quotient",
    name: "Tech-Quotient",
    repoName: "Tech-Quotient",
    category: "AI Coding Education & Mentorship",
    tagline: "AI coding education platform with intelligent student mentor and faculty analytics dashboard.",
    description: [
      "Combines an intelligent student mentor, AI-assisted faculty portal, personalized learner analytics, and adaptive coding evaluations."
    ],
    tech: ["JavaScript", "React", "Node.js", "Express", "AI LLM", "MongoDB"],
    github: "https://github.com/anshgoyal05/Tech-Quotient",
    isPinned: false,
    language: "JavaScript"
  },
  {
    id: "attendance-app",
    name: "attendance-app",
    repoName: "attendance-app",
    category: "Attendance Tracking & Analytics Platform",
    tagline: "Modern attendance management system tracking subject-wise attendance and End-Term eligibility.",
    description: [
      "Built full-stack attendance tracking platform with Next.js, Prisma, and PostgreSQL featuring automated attendance logging and PDF/Excel export."
    ],
    tech: ["TypeScript", "Next.js", "Prisma", "PostgreSQL", "Tailwind CSS"],
    github: "https://github.com/anshgoyal05/attendance-app",
    isPinned: false,
    language: "TypeScript"
  },
  {
    id: "mdify-ai",
    name: "mdify-ai",
    repoName: "mdify-ai",
    category: "AI Document Converter & Token Optimizer",
    tagline: "Converts complex PDFs into structured Markdown optimized for LLMs with token savings.",
    description: [
      "AI-powered document converter that transforms PDFs and file formats into clean, structured Markdown optimized for LLMs with reduced token consumption."
    ],
    tech: ["TypeScript", "Next.js", "AI Document Parser", "Tailwind CSS"],
    github: "https://github.com/anshgoyal05/mdify-ai",
    isPinned: false,
    language: "TypeScript"
  },
  {
    id: "infra-horti-event-expo",
    name: "infra-horti-event-expo",
    repoName: "infra-horti-event-expo",
    category: "Full-Stack Web Portal & Admin Dashboard",
    tagline: "Showcases university infrastructure, nursery collections, and campus event calendars.",
    description: [
      "Full-stack web portal showcasing university events, infrastructure, and nursery database with React SPA, Express API, and JWT authentication."
    ],
    tech: ["JavaScript", "React 19", "Vite", "Node.js", "Express.js", "SQLite3", "JWT"],
    github: "https://github.com/anshgoyal05/infra-horti-event-expo",
    isPinned: false,
    language: "JavaScript"
  }
];
