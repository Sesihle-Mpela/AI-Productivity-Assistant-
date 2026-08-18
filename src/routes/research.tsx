import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkbench } from "@/components/ToolWorkbench";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant | AI-Beginner-Space" },
      {
        name: "description",
        content:
          "Summarize topics or pasted articles and get key insights, risks and practical recommendations.",
      },
      { property: "og:title", content: "AI Research Assistant | AI-Beginner-Space" },
      {
        property: "og:description",
        content: "Summarize topics and articles, then get insights and recommendations.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell>
      <PageHeader
        icon={<Search className="size-5" />}
        title="AI Research Assistant"
        description="Paste an article or name a topic to get a plain-language briefing with insights and next steps."
      />
      <ToolWorkbench
        system="You are a research analyst. Reply with sections: 'Overview', 'Key points', 'Insights', 'Risks or caveats', and 'Recommended next steps'. Be factual, flag uncertainty explicitly, and never fabricate statistics, sources or quotes."
        buildPrompt={(input) => `Research and brief me on the following:\n\n${input}`}
        inputLabel="Topic, question or pasted article"
        placeholder="e.g. How are small businesses using AI for customer support in 2026?"
        actionLabel="Research topic"
        outputTitle="Research briefing"
      />
    </AppShell>
  );
}
