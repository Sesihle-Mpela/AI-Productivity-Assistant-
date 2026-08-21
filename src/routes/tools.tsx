import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, CalendarClock, Mail, NotebookPen, Search, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { ListenButton } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import projAi from "@/assets/proj-ai.jpg";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "AI Toolkit — Sesihle Athi Mpela" },
      {
        name: "description",
        content:
          "AI-Beginner-Space: generate emails, summarise meeting notes, plan tasks, research topics and chat with an AI workplace assistant.",
      },
      { property: "og:title", content: "AI Toolkit — Sesihle Athi Mpela" },
      {
        property: "og:description",
        content:
          "A five-tool AI workspace built by Sesihle Athi Mpela: email drafting, note summaries, task planning, research and chat.",
      },
    ],
  }),
  component: ToolsDashboard,
});

const TOOLS = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    body: "Professional emails in a formal, friendly or persuasive tone.",
  },
  {
    to: "/notes",
    icon: NotebookPen,
    title: "Meeting Notes Summarizer",
    body: "Summaries plus action items, decisions and deadlines.",
  },
  {
    to: "/planner",
    icon: CalendarClock,
    title: "AI Task Planner",
    body: "Prioritised daily or weekly schedules with time blocks.",
  },
  {
    to: "/research",
    icon: Search,
    title: "AI Research Assistant",
    body: "Topic briefings with insights and recommendations.",
  },
  {
    to: "/chat",
    icon: Bot,
    title: "AI Chatbot",
    body: "An interactive assistant for everyday work questions.",
  },
] as const;

const WELCOME =
  "Welcome to the AI toolkit built by Sesihle Athi Mpela. Pick a tool to generate emails, summarise meetings, plan your tasks, research a topic, or chat with your AI assistant.";

function ToolsDashboard() {
  return (
    <AppShell>
      <section className="relative overflow-hidden rounded-3xl border border-border">
        <img
          src={projAi}
          alt=""
          aria-hidden="true"
          width={1280}
          height={800}
          className="absolute inset-0 size-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-[image:var(--gradient-soft)]" />
        <div className="relative p-6 sm:p-10">
          <p className="font-display text-3xl leading-tight sm:text-4xl">
            <span className="text-gradient">AI Toolkit</span>
          </p>
          <h1 className="mt-3 text-xl font-semibold sm:text-2xl">
            Automate your workplace tasks with AI
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Five simple tools to write, summarise, plan and research faster — no prompt engineering
            experience needed.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/email">Start with an email</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Back to portfolio</Link>
            </Button>
            <ListenButton text={WELCOME} label="Listen to welcome" />
          </div>
        </div>
      </section>

      <section className="mt-8" aria-label="AI tools">
        <h2 className="font-display text-xl sm:text-2xl">The tools</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {TOOLS.map(({ to, icon: Icon, title, body }) => (
            <Link key={to} to={to} className="glass-card glass-card-hover group p-5">
              <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
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

      <section className="mt-8 glass-card p-6" aria-label="Accessibility and responsible AI">
        <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
          <ShieldCheck className="size-5" />
        </span>
        <h2 className="mt-4 font-display text-xl">Built for humans, with accessibility in mind</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Every AI response can be read aloud with the Listen button.</li>
          <li>• Keyboard-friendly navigation and clear focus states.</li>
          <li>• Works on mobile, tablet and desktop.</li>
        </ul>
        <p className="mt-4 text-sm text-muted-foreground">
          AI is an assistant, not an authority. Review every draft, keep confidential information out
          of prompts, and stay accountable for what you send.
        </p>
      </section>
    </AppShell>
  );
}
