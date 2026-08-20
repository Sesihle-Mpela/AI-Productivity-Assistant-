import projAi from "@/assets/proj-ai.jpg";
import projFacilitation from "@/assets/proj-facilitation.jpg";
import projEnvironment from "@/assets/proj-environment.jpg";

export const PROFILE = {
  name: "Sesihle Athi Mpela",
  title: "Facilitator & AI Enthusiast",
  tagline: "Building impactful applications and empowering the next generation of developers.",
  location: "Cape Town, South Africa",
  email: "sampela7@gmail.com",
  phone: "+27 84 456 2100",
  linkedin: "https://www.linkedin.com/in/sesihle-athi-mpela",
  github: "https://github.com/",
} as const;

export const STATS = [
  { value: 7, suffix: "+", label: "Years in training & operations" },
  { value: 250, suffix: "+", label: "Consultants onboarded & coached" },
  { value: 5, suffix: "", label: "AI tools shipped" },
  { value: 4, suffix: "", label: "Sectors: BPO, Fintech, Gov, Education" },
] as const;

export const SKILL_GROUPS = [
  {
    title: "AI & Development",
    accent: "text-primary",
    skills: [
      { name: "AI prompting & assistant design", level: 88 },
      { name: "Lovable / TanStack web apps", level: 72 },
      { name: "Git, GitHub & VS Code", level: 78 },
      { name: "Power BI & data reporting", level: 74 },
    ],
  },
  {
    title: "Facilitation & Learning",
    accent: "text-violet",
    skills: [
      { name: "ADDIE instructional design", level: 92 },
      { name: "Kirkpatrick evaluation", level: 88 },
      { name: "LMS administration", level: 85 },
      { name: "Competency-based coaching", level: 90 },
    ],
  },
  {
    title: "Environment & Geospatial",
    accent: "text-cyan",
    skills: [
      { name: "QGIS & ArcGIS", level: 80 },
      { name: "Invasive species management", level: 86 },
      { name: "Integrated catchment management", level: 82 },
      { name: "SHE compliance & auditing", level: 84 },
    ],
  },
] as const;

export const SOFT_SKILLS = [
  "Leadership",
  "Mentorship",
  "Problem Solving",
  "Stakeholder Engagement",
  "Facilitation",
  "KPI Management",
  "Workforce Planning",
  "Conflict Resolution",
  "Report Writing",
  "Adaptability",
] as const;

export type Project = {
  slug: string;
  name: string;
  blurb: string;
  image: string;
  tech: string[];
  demo?: string;
  repo?: string;
  internal?: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "ai-beginner-space",
    name: "AI-Beginner-Space",
    blurb:
      "A five-tool AI workspace for professionals: email generation, meeting-notes summarising, task planning, research briefings and a chatbot — with read-aloud accessibility built in.",
    image: projAi,
    tech: ["React", "TypeScript", "AI", "Accessibility"],
    demo: "/tools",
    internal: true,
  },
  {
    slug: "onboarding-academy",
    name: "Fintech Onboarding Academy",
    blurb:
      "End-to-end onboarding and induction curriculum for multichannel payment-support consultants, mapped to CSAT, FCR, Quality and productivity targets using ADDIE and Kirkpatrick.",
    image: projFacilitation,
    tech: ["ADDIE", "Kirkpatrick", "LMS", "Coaching"],
  },
  {
    slug: "invasive-species-mapping",
    name: "Invasive Species Mapping & Control",
    blurb:
      "Spatial and non-spatial monitoring of terrestrial and aquatic invasive species for the City of Cape Town, including quarterly surveys, bio-control releases and quality-control inspections.",
    image: projEnvironment,
    tech: ["QGIS", "ArcGIS", "Data Analysis", "Environment"],
  },
];

export const PROJECT_FILTERS = [
  "All",
  "AI",
  "React",
  "QGIS",
  "Coaching",
  "Accessibility",
] as const;

export const TIMELINE = [
  {
    period: "2023 — 2026",
    role: "Team Manager & Facilitator",
    org: "Alorica (Financial Technology)",
    points: [
      "Delivered structured onboarding, induction and product training aligned to client KPIs.",
      "Coached consultants on objection handling, upselling and multichannel customer engagement.",
      "Ran team audits, competency tracking and tailored performance interventions.",
      "Managed LMS operations: course setup, grading and technical troubleshooting.",
    ],
  },
  {
    period: "2023",
    role: "Customer Service Consultant",
    org: "Alorica (Financial Technology)",
    points: [
      "Resolved payments, KYC, compliance and fraud-prevention queries across chat, email and voice.",
      "Supported cross-border payments, currency conversion and business payroll use cases.",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Language Instructor",
    org: "MPC",
    points: [
      "Delivered online English instruction to international learners.",
      "Coordinated and managed a team of facilitators.",
    ],
  },
  {
    period: "2019 — 2022",
    role: "Quality Controller — Invasive Species Unit",
    org: "City of Cape Town Municipality",
    points: [
      "Managed terrestrial and aquatic biomes through invasive species control programmes.",
      "Conducted daily quality-control inspections enforcing SHE standards and best practice.",
      "Prepared spatial databases, quarterly surveys and stakeholder reports.",
    ],
  },
] as const;

export const ACHIEVEMENTS = [
  { year: "2022", title: "TEFL Certificate", note: "Teaching English as a Foreign Language" },
  { year: "2021", title: "Smart Drivers Training", note: "Code C1 driving licence" },
  { year: "2021", title: "First-Aid & Firefighting", note: "Workplace emergency response" },
  { year: "2018", title: "Occupational Health & Safety", note: "SHE compliance training" },
  { year: "In progress", title: "LLB — University of South Africa", note: "Part-time" },
  {
    year: "Completed",
    title: "National Diploma: Nature Conservation",
    note: "Cape Peninsula University of Technology",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Sesihle turns dense process material into training people actually enjoy. Our new-hire ramp time dropped noticeably after he redesigned the induction.",
    name: "Operations Manager",
    role: "BPO Fintech Account",
  },
  {
    quote:
      "He coaches with patience and data. He knows exactly which behaviour to change to move CSAT and quality scores.",
    name: "Quality Lead",
    role: "Customer Experience",
  },
  {
    quote:
      "As a new consultant I felt supported from day one. Sesihle explains the why behind every process, not just the steps.",
    name: "Former Trainee",
    role: "Consumer Support Consultant",
  },
  {
    quote:
      "On conservation projects he was meticulous — accurate spatial data, clean reports and strong stakeholder relationships.",
    name: "Project Supervisor",
    role: "Invasive Species Unit",
  },
] as const;
