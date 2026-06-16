import { useEffect, useRef, useState } from "react";

/**
 * Replaces 10+ copy-pasted IntersectionObserver useEffect blocks across section components.
 *
 * Returns a `ref` to attach to the observed element and a `visible` boolean that
 * flips to `true` once the element enters the viewport (one-shot — never resets).
 *
 * @param threshold  - IntersectionObserver threshold (0–1). Default 0.1.
 * @param delay      - Optional stagger delay in ms before setting visible=true.
 *                     Useful for cascading card animations (e.g. index * 120).
 */
export function useInView<T extends Element = HTMLElement>(
  threshold = 0.1,
  delay = 0
) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    // Capture any pending timer so cleanup can cancel it
    let timer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timer = setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      clearTimeout(timer); // Prevent stale setState after unmount
    };
  }, [threshold, delay]);

  return { ref, visible };
}
