import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { PROFILE } from "./data";
import cvAsset from "@/assets/cv.pdf.asset.json";

export function Contact() {
  const [sending, setSending] = useState(false);

  return (
    <section id="contact" aria-label="Contact" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-cyan uppercase">Contact</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl">Let’s work together</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Open to facilitation, team leadership and AI-assisted learning projects in Cape Town and
            remotely.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal glass-card h-fit p-6">
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" />
                <a href={`mailto:${PROFILE.email}`} className="hover:underline">
                  {PROFILE.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-violet" />
                <a href={`tel:${PROFILE.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {PROFILE.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-cyan" />
                {PROFILE.location}
              </li>
              <li className="flex items-center gap-3">
                <Linkedin className="size-4 text-primary" />
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Github className="size-4 text-foreground" />
                <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:underline">
                  GitHub
                </a>
              </li>
            </ul>
            <Button asChild className="mt-6 w-full">
              <a href={cvAsset.url} download>
                <Download className="size-4" /> Download CV
              </a>
            </Button>
          </div>

          <form
            className="reveal glass-card grid gap-4 p-6"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              setSending(true);
              const data = new FormData(form);
              const subject = `Portfolio enquiry from ${String(data.get("name") ?? "")}`;
              const body = `${String(data.get("message") ?? "")}\n\nReply to: ${String(
                data.get("email") ?? "",
              )}`;
              window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
                subject,
              )}&body=${encodeURIComponent(body)}`;
              toast.success("Opening your email app to send the message.");
              form.reset();
              setSending(false);
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required placeholder="Your name" autoComplete="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about the role, project or training need…"
              />
            </div>
            <Button type="submit" disabled={sending} className="justify-self-start">
              <Send className="size-4" /> Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-sm">{PROFILE.name}</p>
          <p className="text-xs text-muted-foreground">
            {PROFILE.title} · {PROFILE.location}
          </p>
        </div>
        <nav aria-label="Social links" className="flex items-center gap-2">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <Github className="size-4" />
          </a>
          <a
            href={`mailto:${PROFILE.email}`}
            aria-label="Email"
            className="grid size-9 place-items-center rounded-lg border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <Mail className="size-4" />
          </a>
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} · <Link to="/tools" className="hover:underline">AI Toolkit</Link>
        </p>
      </div>
    </footer>
  );
}
