import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  Award,
  Braces,
  ExternalLink,
  Github,
  GraduationCap,
  Leaf,
  Quote,
  Target,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ACHIEVEMENTS,
  PROJECTS,
  PROJECT_FILTERS,
  SKILL_GROUPS,
  SOFT_SKILLS,
  TESTIMONIALS,
  TIMELINE,
} from "./data";

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
}) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-sm text-muted-foreground sm:text-base">{intro}</p>}
    </div>
  );
}

function Section({
  id,
  children,
  label,
}: {
  id: string;
  children: ReactNode;
  label: string;
}) {
  return (
    <section id={id} aria-label={label} className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function About() {
  const cards = [
    {
      icon: Users,
      title: "Facilitation & mentorship",
      body: "Seven years training and leading multichannel teams — onboarding, coaching and competency assessment using ADDIE and Kirkpatrick.",
    },
    {
      icon: Braces,
      title: "Building with AI",
      body: "I design and ship practical AI tools that remove busywork: drafting, summarising, planning and research assistants people actually use.",
    },
    {
      icon: Leaf,
      title: "Environmentalist",
      body: "A nature conservation background in invasive species control and catchment management, with QGIS and ArcGIS spatial reporting.",
    },
    {
      icon: Target,
      title: "Career goal",
      body: "To sit where learning, technology and impact meet — building AI-assisted learning products and mentoring new developers in South Africa.",
    },
  ];

  return (
    <Section id="about" label="About me">
      <SectionHeading
        eyebrow="About"
        title="Learning, technology and impact"
        intro="I am a Cape Town based facilitator, team manager and AI enthusiast. I turn complex processes into training people enjoy, and I build tools that make everyday work lighter."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {cards.map(({ icon: Icon, title, body }, i) => (
          <article
            key={title}
            className="reveal glass-card glass-card-hover p-6"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-lg">{title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section id="skills" label="Skills">
      <SectionHeading
        eyebrow="Skills"
        title="Tools, technical and human"
        intro="A blend of development tooling, instructional design and geospatial analysis."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {SKILL_GROUPS.map((group, gi) => (
          <div
            key={group.title}
            className="reveal glass-card glass-card-hover p-6"
            style={{ transitionDelay: `${gi * 90}ms` }}
          >
            <h3 className={cn("font-display text-lg", group.accent)}>{group.title}</h3>
            <ul className="mt-5 space-y-4">
              {group.skills.map((s) => (
                <li key={s.name}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{s.level}%</span>
                  </div>
                  <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted"
                    role="meter"
                    aria-valuenow={s.level}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={s.name}
                  >
                    <span
                      className="block h-full rounded-full bg-[image:var(--gradient-brand)]"
                      style={{ width: `${s.level}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="reveal mt-8 flex flex-wrap justify-center gap-2">
        {SOFT_SKILLS.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary hover:text-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </Section>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const visible =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.tech.includes(filter));

  return (
    <Section id="projects" label="Projects">
      <SectionHeading
        eyebrow="Portfolio"
        title="Featured projects"
        intro="Work that mixes AI tooling, learning design and environmental data."
      />

      <div className="reveal mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by technology">
        {PROJECT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((p, i) => (
          <article
            key={p.slug}
            className="reveal glass-card glass-card-hover group overflow-hidden"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <img
              src={p.image}
              alt={`${p.name} project cover`}
              width={1280}
              height={800}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-6">
              <h3 className="font-display text-lg">{p.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-accent px-2 py-1 text-[11px] font-medium text-accent-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.internal && p.demo ? (
                  <Button asChild size="sm">
                    <Link to="/tools">
                      Live Demo <ExternalLink className="size-3.5" />
                    </Link>
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" disabled>
                    Case study on request
                  </Button>
                )}
                {p.repo && (
                  <Button asChild size="sm" variant="outline">
                    <a href={p.repo} target="_blank" rel="noreferrer">
                      <Github className="size-3.5" /> GitHub
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section id="experience" label="Experience and achievements">
      <SectionHeading
        eyebrow="Journey"
        title="Experience & achievements"
        intro="From conservation fieldwork to leading fintech support teams and facilitating training at scale."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <ol className="relative space-y-6 border-l border-border pl-6">
          {TIMELINE.map((item, i) => (
            <li
              key={`${item.org}-${item.period}`}
              className="reveal glass-card glass-card-hover p-5"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute -left-[7px] mt-1.5 size-3 rounded-full bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]"
                style={{ marginLeft: "-1.5rem" }}
              />
              <p className="text-xs font-semibold tracking-wide text-cyan uppercase">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-lg">{item.role}</h3>
              <p className="text-sm text-muted-foreground">{item.org}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {item.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {pt}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="reveal glass-card h-fit p-6">
          <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
            <Award className="size-5" />
          </span>
          <h3 className="mt-4 font-display text-lg">Certifications & education</h3>
          <ul className="mt-4 space-y-4">
            {ACHIEVEMENTS.map((a) => (
              <li key={a.title} className="flex gap-3">
                <GraduationCap className="mt-0.5 size-4 shrink-0 text-violet" />
                <div>
                  <p className="text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {a.year} · {a.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = TESTIMONIALS.length;
  const current = TESTIMONIALS[index]!;

  return (
    <Section id="testimonials" label="Testimonials">
      <SectionHeading eyebrow="Testimonials" title="What colleagues say" />
      <div className="reveal glass-card mx-auto mt-12 max-w-3xl p-8 text-center sm:p-10">
        <Quote className="mx-auto size-8 text-primary" />
        <blockquote className="mt-5 text-base leading-relaxed sm:text-lg">
          “{current.quote}”
        </blockquote>
        <p className="mt-6 font-display text-sm">{current.name}</p>
        <p className="text-xs text-muted-foreground">{current.role}</p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            size="sm"
            aria-label="Previous testimonial"
            onClick={() => setIndex((i) => (i - 1 + total) % total)}
          >
            ←
          </Button>
          <div className="flex gap-1.5">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name + i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === index ? "bg-primary" : "bg-muted hover:bg-muted-foreground",
                )}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            aria-label="Next testimonial"
            onClick={() => setIndex((i) => (i + 1) % total)}
          >
            →
          </Button>
        </div>
      </div>
    </Section>
  );
}
