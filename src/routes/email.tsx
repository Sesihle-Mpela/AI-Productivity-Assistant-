import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkbench } from "@/components/ToolWorkbench";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI-Beginner-Space" },
      {
        name: "description",
        content:
          "Draft professional workplace emails in seconds and switch between formal, friendly and persuasive tones.",
      },
      { property: "og:title", content: "Smart Email Generator | AI-Beginner-Space" },
      {
        property: "og:description",
        content: "Generate polished work emails in formal, friendly or persuasive tones.",
      },
    ],
  }),
  component: EmailPage,
});

const TONES = ["Formal", "Friendly", "Persuasive"] as const;

function EmailPage() {
  const [tone, setTone] = useState<(typeof TONES)[number]>("Formal");

  return (
    <AppShell>
      <PageHeader
        icon={<Mail className="size-5" />}
        title="Smart Email Generator"
        description="Describe what you need to say and get a ready-to-send email in the tone you choose."
      />
      <ToolWorkbench
        key={tone}
        system="You are an expert business communication writer. Write clear, concise, well-structured workplace emails with a subject line, greeting, body and sign-off. Never invent facts the user did not provide; use [placeholders] instead."
        buildPrompt={(input) =>
          `Write a ${tone.toLowerCase()} professional email based on these notes:\n\n${input}`
        }
        inputLabel="What is the email about?"
        placeholder="e.g. Ask my manager to approve two days of leave in September and offer to hand over my reports."
        actionLabel="Generate email"
        outputTitle="Generated email"
        controls={
          <div className="space-y-2">
            <Label>Tone</Label>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Email tone">
              {TONES.map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={tone === t ? "hero" : "soft"}
                  aria-pressed={tone === t}
                  onClick={() => setTone(t)}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>
        }
      />
    </AppShell>
  );
}
