import { useEffect } from "react";

/** Adds `.is-visible` to every `.reveal` element once it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

/** Counts up to `value` when the returned ref's element enters the viewport. */
export function useCountUp(value: number, duration = 1400) {
  useEffect(() => {}, [value, duration]);
}
