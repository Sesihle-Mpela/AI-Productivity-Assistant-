import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { runAssistant } from "@/lib/ai.functions";
import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/ToolWorkbench";
import { ListenButton } from "@/components/ListenButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Workplace Chatbot | AI-Beginner-Space" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant for advice on tasks, writing, planning and everyday work questions.",
      },
      { property: "og:title", content: "AI Workplace Chatbot | AI-Beginner-Space" },
      {
        property: "og:description",
        content: "An interactive AI assistant for everyday workplace questions.",
      },
    ],
  }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "How do I politely decline a meeting?",
  "Help me prepare for a performance review",
  "Explain AI automation to my team in simple terms",
];

function ChatPage() {
  const ask = useServerFn(runAssistant);
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hello beginner! I'm your workplace AI assistant. Ask me anything about emails, meetings, planning or getting started with AI at work.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || loading) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const result = await ask({
        data: {
          system:
            "You are a friendly, practical AI workplace assistant for beginners. Give short, structured, actionable answers in plain language. Admit uncertainty rather than guessing.",
          messages: next.slice(-12),
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: result.text }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <PageHeader
        icon={<Bot className="size-5" />}
        title="AI Chatbot Assistant"
        description="Your interactive workplace helper — ask follow-up questions and listen to any answer aloud."
      />

      <div className="surface-card flex h-[65vh] min-h-96 flex-col">
        <div className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5" aria-live="polite">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}
            >
              {m.role === "assistant" && (
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Bot className="size-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground",
                )}
              >
                {m.content}
                {m.role === "assistant" && (
                  <div className="mt-2">
                    <ListenButton text={m.content} label="Listen" />
                  </div>
                )}
              </div>
              {m.role === "user" && (
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                  <User className="size-4" />
                </span>
              )}
            </div>
          ))}
          {loading && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" /> Thinking…
            </p>
          )}
          <div ref={endRef} />
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <Button key={s} size="sm" variant="soft" onClick={() => send(s)} disabled={loading}>
                {s}
              </Button>
            ))}
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Message the AI assistant
            </label>
            <Input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your workplace question…"
              autoComplete="off"
            />
            <Button type="submit" variant="hero" disabled={loading} aria-label="Send message">
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
