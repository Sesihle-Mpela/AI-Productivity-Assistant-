import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Bot,
  CalendarClock,
  LayoutDashboard,
  Mail,
  Menu,
  NotebookPen,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/notes", label: "Meeting Notes", icon: NotebookPen },
  { to: "/planner", label: "Task Planner", icon: CalendarClock },
  { to: "/research", label: "Research Assistant", icon: Search },
  { to: "/chat", label: "AI Chatbot", icon: Bot },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Main navigation" className="flex flex-col gap-1 p-3">
      {NAV.map(({ to, label, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-4 py-5">
      <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]">
        <Sparkles className="size-5 text-primary-foreground" />
      </span>
      <span className="font-display text-lg leading-none">
        AI-Beginner<span className="text-gradient">Space</span>
      </span>
    </Link>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[17rem_1fr]">
      <aside className="hidden border-r border-sidebar-border bg-sidebar/70 backdrop-blur-xl lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <Brand />
        <div className="flex-1 overflow-y-auto">
          <NavList />
        </div>
        <p className="border-t border-sidebar-border p-4 text-xs text-muted-foreground">
          AI output can be wrong. Always review before sending or acting on it.
        </p>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/85 backdrop-blur lg:hidden">
          <Brand />
          <Button
            variant="ghost"
            size="icon"
            className="mr-3"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Menu className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </header>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              aria-label="Close menu"
              className="absolute inset-0 bg-foreground/40"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar/90 backdrop-blur-xl shadow-xl">
              <div className="flex items-center justify-between">
                <Brand />
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-2"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <NavList onNavigate={() => setOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>

        <footer className="border-t border-border px-4 py-5 text-xs text-muted-foreground sm:px-6 lg:px-10">
          <p className="mx-auto max-w-4xl">
            <strong className="font-semibold text-foreground">Responsible AI notice:</strong> AI-Beginner-Space
            assists with drafting and summarising — it does not make decisions for you. Responses may
            contain errors or bias. Never enter confidential personal data, and always review output
            before sharing it at work.
          </p>
        </footer>
      </div>
    </div>
  );
}
