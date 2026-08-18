import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("Audio is not configured", { status: 500 });

        let text = "";
        try {
          const body = (await request.json()) as { text?: unknown };
          text = typeof body.text === "string" ? body.text.trim() : "";
        } catch {
          return new Response("Invalid request body", { status: 400 });
        }
        if (!text) return new Response("Missing text", { status: 400 });

        const words = text.match(/\S+/g) ?? [];
        const input = words.slice(0, 350).join(" ");

        const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini-tts",
            input,
            voice: "alloy",
            response_format: "mp3",
          }),
        });

        if (!response.ok) {
          const err = await response.text().catch(() => "");
          return new Response(`Speech generation failed: ${err.slice(0, 300)}`, {
            status: response.status,
          });
        }

        return new Response(response.body, {
          headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
        });
      },
    },
  },
});
