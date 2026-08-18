import { createFileRoute } from "@tanstack/react-router";
import { NotebookPen } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI-Beginner-Space" },
      {
        name: "description",
        content:
          "Turn long meeting notes into a short summary with action items, decisions and deadlines.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer | AI-Beginner-Space" },
      {
        property: "og:description",
        content: "Summarize meeting notes and extract action items, decisions and deadlines.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell>
      <PageHeader
        icon={<NotebookPen className="size-5" />}
        title="Meeting Notes Summarizer"
        description="Paste raw notes or a transcript and get a clean summary plus action items, decisions and deadlines."
      />
      <ToolWorkbench
        system="You summarise workplace meetings. Always reply with these sections: 'Summary' (3-5 bullets), 'Decisions', 'Action items' (owner + task), and 'Deadlines'. If a section has no information, write 'None captured'. Never invent owners or dates."
        buildPrompt={(input) => `Summarise these meeting notes:\n\n${input}`}
        inputLabel="Meeting notes or transcript"
        placeholder="Paste your meeting notes here…"
        actionLabel="Summarize notes"
        outputTitle="Summary & action items"
      />
    </AppShell>
  );
}
