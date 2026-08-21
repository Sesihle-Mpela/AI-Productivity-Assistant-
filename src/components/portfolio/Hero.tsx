import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROFILE, STATS } from "./data";
import profileAsset from "@/assets/sesihle-profile.jpg.asset.json";
import cvAsset from "@/assets/cv.pdf.asset.json";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1300;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="font-display text-3xl text-gradient sm:text-4xl">
      {shown}
      {suffix}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-screen items-center px-4 pt-24 pb-16 sm:px-6"
      aria-label="Introduction"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="reveal is-visible">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <MapPin className="size-3.5 text-cyan" />
            {PROFILE.location}
          </p>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] sm:text-6xl">
            {PROFILE.name}
          </h1>
          <p className="mt-3 font-display text-xl text-gradient sm:text-2xl">{PROFILE.title}</p>
          <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
            {PROFILE.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="#projects">
                View Projects <ArrowRight className="size-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                <Mail className="size-4" /> Contact Me
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href={cvAsset.url} download>
                <Download className="size-4" /> CV
              </a>
            </Button>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dd>
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
                <dt className="mt-1 text-xs text-muted-foreground">{s.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute -inset-6 rounded-[2.5rem] bg-[image:var(--gradient-brand)] opacity-25 blur-2xl"
          />
          <div className="glass-card float-slow relative overflow-hidden p-3">
            <img
              src={profileAsset.url}
              alt="Portrait of Sesihle Athi Mpela"
              width={1000}
              height={1000}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
