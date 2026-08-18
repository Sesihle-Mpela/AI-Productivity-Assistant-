import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1),
});

const InputSchema = z.object({
  system: z.string().min(1),
  messages: z.array(MessageSchema).min(1),
});

export const runAssistant = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI is not configured for this project.");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3.6-flash",
        messages: [{ role: "system", content: data.system }, ...data.messages],
      }),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      if (response.status === 429) {
        throw new Error("The AI is busy right now — please try again in a moment.");
      }
      if (response.status === 402) {
        throw new Error("AI credits are exhausted. Please add credits to continue.");
      }
      throw new Error(`AI request failed (${response.status}). ${body.slice(0, 300)}`);
    }

    const json = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("The AI returned an empty response. Please try again.");
    return { text };
  });
