import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, CalendarClock, Mail, NotebookPen, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ListenButton } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/robot-human.jpg";
import collabImage from "@/assets/team-collab.jpg";
import forestImage from "@/assets/winter-forest.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI-Beginner-Space | Automate Your Workplace Tasks" },
      {
        name: "description",
        content:
          "A friendly AI workspace for professionals: generate emails, summarise meetings, plan tasks, research topics and chat with an AI assistant.",
      },
      { property: "og:title", content: "AI-Beginner-Space | Automate Your Workplace Tasks" },
      {
        property: "og:description",
        content:
          "Generate emails, summarise meeting notes, plan your week and research topics with AI — built for beginners.",
      },
    ],
  }),
  component: Dashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Professional emails in a formal, friendly or persuasive tone.",
    tint: "bg-accent text-accent-foreground",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Summaries plus action items, decisions and deadlines.",
    tint: "bg-coral/15 text-coral",
  },
  {
    to: "/planner",
    icon: CalendarClock,
    title: "AI Task Planner",
    body: "Prioritised daily or weekly schedules with time blocks.",
    tint: "bg-amber/25 text-amber-foreground",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    body: "Topic briefings with insights and recommendations.",
    tint: "bg-violet/15 text-violet",
  },
  {
    to: "/chat",
    icon: Bot,
    title: "AI Chatbot",
    body: "An interactive assistant for everyday work questions.",
    tint: "bg-primary/15 text-primary",
  },
] as const;

const WELCOME =
  "Hello beginner! Welcome to AI-Beginner-Space. Pick a tool from the sidebar to generate emails, summarise meetings, plan your tasks, research a topic, or chat with your AI assistant.";

function Dashboard() {
  return (
    <AppShell>
      <section className="overflow-hidden rounded-3xl border border-border bg-[image:var(--gradient-soft)]">
        <div className="grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-3xl leading-tight sm:text-5xl">
              <span className="text-gradient">HELLO BEGINNER!!</span>
            </p>
            <h1 className="mt-4 text-xl font-semibold sm:text-2xl">
              Automate your workplace tasks with AI
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Five simple tools to write, summarise, plan and research faster — no prompt
              engineering experience needed.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" asChild>
                <Link to="/email">Start with an email</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/chat">Chat with the assistant</Link>
              </Button>
              <ListenButton text={WELCOME} label="Listen to welcome" />
            </div>
          </div>
          <img
            src={heroImage}
            alt="Professionals holding laptops while brainstorming ideas together in a bright office"
            width={1536}
            height={1024}
            className="h-56 w-full rounded-2xl object-cover shadow-[var(--shadow-card)] sm:h-72 lg:h-80"
          />
        </div>
      </section>

      <section className="mt-8" aria-label="AI tools">
        <h2 className="font-display text-xl sm:text-2xl">Your AI toolkit</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, body, tint }) => (
            <Link
              key={to}
              to={to}
              className="surface-card group p-5 transition-transform hover:-translate-y-0.5"
            >
              <span className={`grid size-10 place-items-center rounded-xl ${tint}`}>
                <Icon className="size-5" />
              </span>
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              <span className="mt-3 inline-block text-sm font-medium text-primary group-hover:underline">
                Open tool →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <img
          src={collabImage}
          alt="Two colleagues holding laptops and reviewing ideas on sticky notes"
          width={1024}
          height={1024}
          loading="lazy"
          className="h-64 w-full rounded-2xl object-cover shadow-[var(--shadow-card)] lg:h-full"
        />
        <div className="surface-card p-6">
          <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
            <ShieldCheck className="size-5" />
          </span>
          <h2 className="mt-4 font-display text-xl">Built for humans, with accessibility in mind</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Every AI response can be read aloud with the Listen button.</li>
            <li>• Keyboard-friendly navigation and clear focus states.</li>
            <li>• Soft neutral background colours that are easy on the eyes.</li>
            <li>• Works on mobile, tablet and desktop.</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            AI is an assistant, not an authority. Review every draft, keep confidential information
            out of prompts, and stay accountable for what you send.
          </p>
        </div>
      </section>
    </AppShell>
  );
}
