import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { PageHeader, ToolWorkbench } from "@/components/ToolWorkbench";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner & Scheduler | AI-Beginner-Space" },
      {
        name: "description",
        content:
          "Turn a messy task list into a prioritised daily or weekly work schedule with time blocks.",
      },
      { property: "og:title", content: "AI Task Planner & Scheduler | AI-Beginner-Space" },
      {
        property: "og:description",
        content: "Build a prioritised daily or weekly schedule from your task list.",
      },
    ],
  }),
  component: PlannerPage,
});

const RANGES = ["Daily", "Weekly"] as const;

function PlannerPage() {
  const [range, setRange] = useState<(typeof RANGES)[number]>("Daily");

  return (
    <AppShell>
      <PageHeader
        icon={<CalendarClock className="size-5" />}
        title="AI Task Planner"
        description="List everything on your plate and get a prioritised schedule with realistic time blocks."
      />
      <ToolWorkbench
        key={range}
        system="You are a productivity coach. Build realistic schedules with time blocks, rank tasks by urgency and impact (High/Medium/Low), group similar work, include short breaks, and end with a 'Top 3 priorities' list."
        buildPrompt={(input) =>
          `Create a prioritised ${range.toLowerCase()} schedule from these tasks and constraints:\n\n${input}`
        }
        inputLabel="Your tasks, deadlines and working hours"
        placeholder="e.g. Finish Q3 report (due Friday), 3 client calls, review two proposals, gym, work 08:00-16:30."
        actionLabel="Build schedule"
        outputTitle="Your schedule"
        controls={
          <div className="space-y-2">
            <Label>Plan range</Label>
            <div className="flex gap-2" role="group" aria-label="Plan range">
              {RANGES.map((r) => (
                <Button
                  key={r}
                  size="sm"
                  variant={range === r ? "hero" : "soft"}
                  aria-pressed={range === r}
                  onClick={() => setRange(r)}
                >
                  {r}
                </Button>
              ))}
            </div>
          </div>
        }
      />
    </AppShell>
  );
}
