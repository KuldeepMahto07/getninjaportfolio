/**
 * Single source of truth for site copy.
 * Project details were verified against the actual repositories / live app —
 * see MOTION-INVENTORY.md and the PR description. Nothing here is invented.
 */

export const profile = {
  firstName: "Rohit",
  lastName: "Sharma",
  role: "Generative AI Developer",
  location: "Bangalore, India",
  availability: "Available for work",
  email: "edgerallen27@gmail.com",
  linkedin: "https://www.linkedin.com/in/rohit-kumar-9121b6210/",
  github: "https://github.com/GitNinja36",
  tagline: "I build fast, agentic AI systems — for AWS, NLP, and Generative AI.",
  intro:
    "5 years of experience building end-to-end ML workflows, from data preprocessing to production deployment, with strong MLOps practices and agentic AI expertise.",
} as const;

export const marqueeWords = ["AI Engineer", "Builder", "Creator"] as const;

export const services = [
  {
    num: "01",
    title: "Generative AI & Agentic Systems",
    description:
      "Autonomous agents that plan, call tools and stay observable in production — built on retrieval that actually grounds the model.",
    tech: ["LangChain", "LangGraph", "CrewAI", "AWS Bedrock Agents", "RAG / OpenSearch"],
  },
  {
    num: "02",
    title: "Machine Learning & Computer Vision",
    description:
      "Data and model engineering end to end: preprocessing, fine-tuning, evaluation and experiment tracking on real pipelines.",
    tech: ["Python", "PyTorch", "Scikit-learn", "Hugging Face Transformers", "MLflow"],
  },
  {
    num: "03",
    title: "AI Infrastructure & Full-Stack",
    description:
      "Shipping and scaling the surface around the model — APIs, containers and CI/CD that keep deployments boring.",
    tech: ["Docker", "Kubernetes", "FastAPI", "AWS Fargate / Lambda", "GitHub Actions"],
  },
] as const;

export type Project = {
  num: string;
  title: string;
  category: string;
  /** Short discipline pill shown beside the year. */
  tag: string;
  year: string;
  href: string;
  linkLabel: string;
  image: string;
  imageAlt: string;
  /** `contain` renders artwork on a stage; `cover` fills the frame. */
  fit: "cover" | "contain";
  stage?: "warm";
  meta: { key: string; value: string }[];
  note?: string;
};

export const projects: Project[] = [
  {
    num: "01",
    title: "Yummi",
    category: "Meal tracking & nutrition",
    tag: "Mobile",
    year: "2025",
    href: "https://github.com/GitNinja36/Yummi",
    linkLabel: "View repository",
    image: "/assets/yummi-chef.webp",
    imageAlt: "Yummi in-app illustration: a 3D chef preparing a meal",
    fit: "contain",
    stage: "warm",
    meta: [
      { key: "Year", value: "2025" },
      { key: "Type", value: "Open repository" },
      { key: "Stack", value: "React Native, Expo Router, NativeWind, Go, AWS, Clerk" },
      { key: "Scope", value: "Meal search, nutrition breakdown, favourites" },
    ],
    note: "Artwork shown is the project's own in-app illustration — the repository ships no screenshots.",
  },
  {
    num: "02",
    title: "Deblo",
    category: "AI clinic front desk",
    tag: "AI / Web",
    year: "2025",
    href: "https://deblo.vercel.app/",
    linkLabel: "View live site",
    image: "/assets/deblo-hero.jpg",
    imageAlt: "Deblo landing page: AI clinic front desk with a live consultation panel",
    fit: "cover",
    meta: [
      { key: "Year", value: "2025" },
      { key: "Type", value: "Live deployment" },
      { key: "Stack", value: "Next.js, React, Drizzle ORM, Neon Postgres, Gemini, Vapi, Clerk" },
      { key: "Scope", value: "Symptom intake, triage & booking, voice consultations" },
    ],
    note: "Demonstration project — not intended for real medical use.",
  },
];

export const skillGroups = [
  { label: "AI / Agentic", items: ["LangChain", "LangGraph", "CrewAI", "Bedrock Agents", "RAG"] },
  { label: "ML / Data", items: ["PyTorch", "Scikit-learn", "Hugging Face", "MLflow", "OpenSearch"] },
  { label: "Engineering", items: ["Python", "SQL", "FastAPI", "Git", "Postman"] },
  { label: "Cloud / DevOps", items: ["AWS Lambda", "S3", "IAM", "Docker", "Kubernetes", "GitHub Actions"] },
  { label: "Databases", items: ["MySQL", "MongoDB", "RDS", "OpenSearch"] },
] as const;

export const about = {
  lead: "I'm a Generative AI Developer turning research-grade models into reliable, shipping products.",
  paragraphs: [
    "Generative AI Developer with 5 years across AWS, NLP, and applied ML. Currently building client-servicing AI assistance for Barclays via Capgemini, after 3 years at Infosys shipping computer vision pipelines and fine-tuned LLMs.",
    "AWS Certified Cloud Practitioner and AI Practitioner. M.Sc. Applied Mathematics, Central University of Jharkhand.",
  ],
  credentials: [
    "AWS Certified — Cloud Practitioner",
    "AWS Certified — AI Practitioner",
    "M.Sc. Applied Mathematics",
  ],
} as const;

export const experience = [
  {
    company: "Capgemini",
    role: "Generative AI Developer",
    period: "Present",
    summary: "Client-servicing AI assistance for Barclays.",
    tech: ["AWS Bedrock", "LangChain", "RAG", "Python"],
  },
  {
    company: "Infosys",
    role: "ML Engineer",
    period: "3 years",
    summary: "Computer vision pipelines and fine-tuned LLMs.",
    tech: ["PyTorch", "Computer Vision", "LLM fine-tuning", "MLOps"],
  },
] as const;

export const contact = {
  headlineLines: ["Let's build", "something", "intelligent."],
  blurb: "Have an AI system in mind? Tell me what you're building and I'll tell you how I'd ship it.",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
