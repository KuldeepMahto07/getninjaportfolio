/**
 * All site copy in one place. CONTENT ONLY — no component, style, or motion
 * concerns live here, so updating identity/copy never touches the layout or
 * animation system.
 *
 * Everything is either supplied directly by Rohit or verified against the
 * actual sources (the Yummi repository, the live Deblo app). Nothing is
 * invented: no metrics, dates, users, or technologies that weren't provided.
 */

export const profile = {
  name: "Rohit Sharma",
  /** Tiny nav label, top-left of the hero. */
  navLabel: "Generative AI Developer & ML Engineer",
  role: "Generative AI Developer & ML Engineer",
  location: "Bangalore, India",
  email: "edgerallen27@gmail.com",
  github: "https://github.com/GitNinja36",
  githubHandle: "GitNinja36",
  linkedin: "https://www.linkedin.com/in/rohit-kumar-9121b6210/",
  linkedinName: "Rohit Kumar",
  tagline:
    "I build intelligent digital products — from modern web experiences to AI-powered systems.",
  availability: "Available for work",
  availableFrom: "JUL '26",
  /**
   * Hero portrait. Set to the asset path once the image is added to
   * `public/assets/` — e.g. "/assets/portrait.jpg". While empty, the hero
   * keeps its marked placeholder rather than rendering a broken image.
   */
  portrait: "/assets/portrait.jpg",
  portraitAlt: "Rohit Sharma",
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
    "I build intelligent, production-ready products across Generative AI, machine learning, and full-stack engineering — from AI-powered experiences to scalable web applications.",
} as const;

export type Service = {
  num: string;
  title: string;
  description: string;
  /**
   * Numbered rows beside each service. For (01) and (02) these are
   * capabilities rather than named frameworks — no AI/ML framework is claimed
   * that isn't verified in the projects or skills.
   */
  tech: string[];
};

export const services: Service[] = [
  {
    num: "(01)",
    title: "Generative AI & Intelligent Systems",
    description:
      "I build practical AI-powered applications that integrate modern language models and intelligent workflows into real-world products.",
    tech: [
      "LLM-powered applications",
      "Retrieval & knowledge systems",
      "AI agents & intelligent workflows",
      "Generative AI integrations",
    ],
  },
  {
    num: "(02)",
    title: "Machine Learning Engineering",
    description:
      "I develop machine learning systems across data preparation, model development, evaluation, and deployment with a focus on practical, maintainable solutions.",
    tech: [
      "Data preprocessing & feature engineering",
      "Model development & evaluation",
      "Machine learning pipelines",
      "Model integration & deployment",
    ],
  },
  {
    num: "(03)",
    title: "Full-Stack Product Engineering",
    description:
      "I build complete, scalable applications from responsive frontend experiences to backend APIs, databases, and production deployment.",
    tech: [
      "React.js, Next.js, Redux",
      "Node.js, Express.js",
      "PostgreSQL, MongoDB, GraphQL",
      "Docker, AWS EC2",
    ],
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
    stack: ["Next.js", "PostgreSQL", "Gemini 2.5", "Drizzle ORM"],
    image: "/assets/deblo-hero.jpg",
    imageAlt: "Deblo landing page: AI clinic front desk with a live consultation panel",
    fit: "cover",
  },
];

/** Three lines, matching the existing stacked-statement structure. */
export const identityLines = ["AI Engineer", "ML Engineer", "Full-Stack/"] as const;

export const skillGroups = [
  {
    label: "Languages",
    items: ["Java", "Go", "Python", "C", "SQL", "JavaScript"],
  },
  {
    label: "Technologies",
    items: [
      "React.js",
      "Next.js",
      "Redux",
      "Bootstrap",
      "GSAP",
      "React Native",
      "Node.js",
      "Express.js",
      "Drizzle ORM",
      "Prisma",
    ],
  },
  {
    label: "Datastores",
    items: ["PostgreSQL", "MongoDB", "GraphQL"],
  },
  {
    label: "Tools / Platforms",
    items: ["Git", "Docker", "AWS EC2", "Postman", "VS Code", "MongoDB Compass"],
  },
] as const;

export const about = {
  headingLines: ["I build AI systems", "that ship."],
  label: "(About)",
  paragraphs: [
    "I'm a Generative AI Developer, Machine Learning Engineer, and Full-Stack Developer focused on building intelligent, useful products.",
    "I work across the stack — React and Next.js on the front end, Node and Go services behind them — and build AI directly into real products, like Deblo's Gemini-powered consultation flows.",
  ],
} as const;

export type Job = {
  company: string;
  role: string;
  period: string;
  location: string;
  /** Experience-specific technologies, kept out of the global skill groups. */
  tech: string[];
  details: string[];
};

export const experience: Job[] = [
  {
    company: "10x",
    role: "Frontend Developer Intern",
    period: "May 2025 — July 2025",
    location: "Early-stage startup",
    tech: ["React", "Zustand", "Chakra UI", "Docker", "Recoil", "TailwindCSS"],
    details: [
      "Engineered a quiz-based rewards platform using React, Zustand, and Chakra UI, improving UI performance by 30%, enhancing engagement by 25%, and delivering a responsive user experience with interactive features.",
      "Developed interactive gameplay with scoring mechanisms, referral-based reward extensions, and strategic lifelines such as \u201c50/50\u201d and \u201c2x,\u201d boosting user participation and enhancing the overall gaming experience.",
      "Leveraged Docker for streamlined backend deployment, ensuring stability and improving development efficiency.",
      "Designed and implemented a Quiz Builder platform using React, Recoil, and TailwindCSS, enabling efficient quiz creation, editing, and approval processes, improving user experience by 30% and platform performance by 25%.",
    ],
  },
];

export const certifications = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified AI Practitioner",
] as const;

/**
 * Exactly as supplied — no specialization, branch, CGPA, percentage, location
 * or graduation year is added, because none was provided.
 */
export const education = [
  {
    school: "NIT Durgapur",
    degree: "Bachelor",
    year: "2022 — Present",
  },
  {
    school: "DAV Public School",
    degree: "Intermediate",
    year: "2020 — 2021",
  },
  {
    school: "DAV Public School",
    degree: "High School",
    year: "2018 — 2019",
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
