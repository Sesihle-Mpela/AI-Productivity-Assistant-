import { useState, type ReactNode } from "react";
import { Copy, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { runAssistant } from "@/lib/ai.functions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ListenButton } from "@/components/ListenButton";

export function PageHeader({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <header className="mb-6 flex items-start gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
        {icon}
      </span>
      <div>
        <h1 className="font-display text-2xl sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
    </header>
  );
}

export function ToolWorkbench({
  system,
  buildPrompt,
  inputLabel,
  placeholder,
  controls,
  actionLabel = "Generate",
  outputTitle = "AI response",
}: {
  system: string;
  buildPrompt: (input: string) => string;
  inputLabel: string;
  placeholder: string;
  controls?: ReactNode;
  actionLabel?: string;
  outputTitle?: string;
}) {
  const ask = useServerFn(runAssistant);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!input.trim()) {
      toast.error("Please add some details first.");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const result = await ask({
        data: { system, messages: [{ role: "user", content: buildPrompt(input) }] },
      });
      setOutput(result.text);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section className="surface-card p-5" aria-label="Input">
        <div className="space-y-4">
          {controls}
          <div className="space-y-2">
            <Label htmlFor="tool-input">{inputLabel}</Label>
            <Textarea
              id="tool-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              rows={10}
              className="resize-y"
            />
          </div>
          <Button variant="hero" onClick={submit} disabled={loading} className="w-full sm:w-auto">
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Working on it…" : actionLabel}
          </Button>
        </div>
      </section>

      <section className="surface-card flex min-h-64 flex-col p-5" aria-label="AI output">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2 className="font-display text-lg">{outputTitle}</h2>
          {output && (
            <div className="flex gap-2">
              <ListenButton text={output} />
              <Button
                variant="soft"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy className="size-4" />
                Copy
              </Button>
            </div>
          )}
        </div>
        <div aria-live="polite" className="flex-1">
          {loading && <p className="text-sm text-muted-foreground">Generating your response…</p>}
          {!loading && !output && (
            <p className="text-sm text-muted-foreground">
              Your AI-generated result will appear here. You can also listen to it aloud.
            </p>
          )}
          {output && (
            <div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
              {output}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
