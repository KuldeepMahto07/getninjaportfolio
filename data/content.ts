/**
 * All site copy in one place.
 *
 * Everything here is either supplied in the brief or verified against the
 * actual sources (the Yummi repository and the live Deblo app). Nothing is
 * invented — no metrics, no dates that weren't confirmed, no extra
 * technologies.
 */

export const profile = {
  name: "Rohit Sharma",
  /** Tiny nav label, top-left of the hero. */
  navLabel: "AI Engineer & Developer",
  role: "Generative AI Developer",
  location: "Bangalore, India",
  email: "edgerallen27@gmail.com",
  github: "https://github.com/GitNinja36",
  linkedin: "https://www.linkedin.com/in/rohit-kumar-9121b6210/",
  tagline:
    "I build intelligent AI systems that reason, retrieve, automate, and scale — from machine learning to agentic AI.",
  availability: "Available for work",
  availableFrom: "JUL '26",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const menuLinks = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Works", href: "#works" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const whatIDo = {
  heading: "What I Do /",
  label: "(Services)",
  intro:
    "I design and ship production-grade AI systems — from intelligent retrieval and machine learning pipelines to autonomous agents and cloud-native AI products.",
} as const;

export type Service = {
  num: string;
  title: string;
  description: string;
  tech: string[];
};

export const services: Service[] = [
  {
    num: "(01)",
    title: "Generative AI & Agentic Systems",
    description:
      "I build LLM-powered systems that retrieve knowledge, reason over context, use tools, and automate complex workflows.",
    tech: [
      "LangChain, LangGraph, CrewAI",
      "AWS Bedrock Agents",
      "RAG, OpenSearch",
      "Hugging Face Transformers",
    ],
  },
  {
    num: "(02)",
    title: "Machine Learning & Computer Vision",
    description:
      "End-to-end machine learning systems covering preprocessing, experimentation, evaluation, computer vision and production inference.",
    tech: ["Python, PyTorch", "Scikit-learn", "YOLO, ResNet", "MLflow"],
  },
  {
    num: "(03)",
    title: "AI Infrastructure & Deployment",
    description:
      "Production infrastructure for deploying and scaling AI-powered applications reliably.",
    tech: ["FastAPI", "Docker, Kubernetes", "AWS Lambda, Fargate, EC2", "GitHub Actions"],
  },
];

export const worksIntro = {
  heading: "Selected Works /",
  label: "(Projects)",
  intro:
    "A selection of AI products and intelligent systems built around useful, real-world problems.",
} as const;

export type Project = {
  index: string;
  title: string;
  category: string;
  /** Verified from the repository / live deployment — not invented. */
  year: string;
  discipline: string;
  href: string;
  linkLabel: string;
  description: string;
  stack: string[];
  image: string;
  imageAlt: string;
  /** `contain` renders artwork on a stage; `cover` fills the frame. */
  fit: "cover" | "contain";
  /** Shown when the asset is not an actual product screenshot. */
  assetNote?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "Yummi",
    category: "Food-Tech Wellness App",
    year: "2025",
    discipline: "Development",
    href: "https://github.com/GitNinja36/Yummi",
    linkLabel: "View project",
    description:
      "A full-stack food-tech wellness platform for meal discovery, tracking and personalized food experiences.",
    stack: ["React Native", "Go", "PostgreSQL", "Docker", "AWS EC2"],
    image: "/assets/yummi-chef.webp",
    imageAlt: "Yummi in-app illustration: a 3D chef preparing a meal",
    fit: "contain",
    assetNote: "In-app artwork — the repository ships no screenshots.",
  },
  {
    index: "02",
    title: "Deblo",
    category: "AI Healthcare Assistant",
    year: "2025",
    discipline: "Development",
    href: "https://deblo.vercel.app/",
    linkLabel: "View live",
    description:
      "An AI healthcare platform providing voice/text consultations, medical report generation, recommendations and intelligent healthcare workflows.",
    stack: ["Next.js", "PostgreSQL", "Gemini 2.5", "Drizzle ORM", "Voice AI"],
    image: "/assets/deblo-hero.jpg",
    imageAlt: "Deblo landing page: AI clinic front desk with a live consultation panel",
    fit: "cover",
  },
];

export const identityLines = ["AI Engineer", "AI Builder", "Creator/"] as const;

export const skillGroups = [
  {
    label: "AI / Agentic",
    items: [
      "Generative AI",
      "Agentic AI",
      "RAG",
      "LangChain",
      "LangGraph",
      "CrewAI",
      "AWS Bedrock",
      "Hugging Face",
    ],
  },
  {
    label: "Machine Learning",
    items: ["PyTorch", "Scikit-learn", "NLP", "Computer Vision", "YOLO", "ResNet", "MLflow"],
  },
  {
    label: "Engineering",
    items: [
      "Python",
      "Go",
      "Java",
      "JavaScript",
      "SQL",
      "FastAPI",
      "Next.js",
      "React",
      "React Native",
    ],
  },
  {
    label: "Cloud / DevOps",
    items: [
      "AWS",
      "Docker",
      "Kubernetes",
      "GitHub Actions",
      "EC2",
      "Lambda",
      "S3",
      "Fargate",
      "OpenSearch",
    ],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Drizzle ORM", "Prisma"],
  },
] as const;

export const about = {
  headingLines: ["I build AI systems", "that ship."],
  label: "(About)",
  paragraphs: [
    "I'm a Generative AI Developer building intelligent systems across Generative AI, agentic architectures, RAG, machine learning, computer vision and cloud infrastructure.",
    "My work spans enterprise AI systems as well as independently built AI products.",
  ],
} as const;

export const experience = [
  {
    company: "Capgemini",
    role: "Generative AI Developer",
    period: "May 2025 — Present",
    location: "Bangalore, India",
    tech: ["AWS Bedrock Agents", "RAG", "OpenSearch", "Lambda", "MLflow", "Agentic AI"],
  },
  {
    company: "Infosys",
    role: "Machine Learning Engineer",
    period: "Feb 2022 — May 2025",
    location: "Bangalore, India",
    tech: [
      "PyTorch",
      "Computer Vision",
      "YOLO",
      "ResNet",
      "Hugging Face",
      "FastAPI",
      "Docker",
      "Kubernetes",
    ],
  },
] as const;

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified AI Practitioner",
] as const;

export const education = [
  {
    school: "Central University of Jharkhand",
    degree: "Master of Applied Mathematics",
    year: "2021",
  },
  {
    school: "Central University of Jharkhand",
    degree: "B.Sc. Applied Mathematics",
    year: "2019",
  },
] as const;

export const contact = {
  headingLines: ["Let's build", "something", "intelligent."],
  fields: [
    { id: "name", label: "Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
  ],
  messageLabel: "Tell me about your project",
  submit: "Get a quote",
} as const;
