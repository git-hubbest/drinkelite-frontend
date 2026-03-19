import { useEffect, useRef, useState } from "react";

/** Adds `gold-shimmer` class when element scrolls into view */
export function useGoldShimmer() {
  const ref = useRef<HTMLElement>(null);
  const [shimmer, setShimmer] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShimmer(true);
          // Reset after animation plays so it re-triggers on next scroll-in
          const timer = setTimeout(() => setShimmer(false), 3000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, shimmerClass: shimmer ? "gold-shimmer" : "" };
}
