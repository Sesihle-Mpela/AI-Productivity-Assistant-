import { useEffect, useRef, useState } from "react";
import { Loader2, Pause, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function ListenButton({ text, label = "Listen" }: { text: string; label?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const stop = () => {
    audioRef.current?.pause();
    setPlaying(false);
  };

  const play = async () => {
    if (playing) return stop();
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(await res.text().catch(() => "Audio failed"));
      const blob = await res.blob();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = URL.createObjectURL(blob);
      const audio = new Audio(urlRef.current);
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      audio.onpause = () => setPlaying(false);
      await audio.play();
      setPlaying(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not play audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="soft"
      size="sm"
      onClick={play}
      disabled={loading || !text.trim()}
      className={cn(
        "font-semibold",
        text.trim() && !loading && "listen-flicker hover:brightness-105",
      )}
      aria-label={playing ? "Stop reading aloud" : `${label} — read this text aloud`}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : playing ? (
        <Pause className="size-4" />
      ) : (
        <Volume2 className="size-4" />
      )}
      {playing ? "Stop" : label}
    </Button>
  );
}

