"use client";

import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    // Function to check and reveal elements
    const checkElements = () => {
      const elements = document.querySelectorAll(".reveal, .reveal-mask");
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Reveal if element top is within viewport (or within 100px below viewport)
        if (rect.top <= windowHeight * 0.95 && rect.bottom >= 0) {
          el.classList.add("in");
        }
      });
    };

    // IntersectionObserver for modern performant reveal
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: "50px 0px 50px 0px" }
      );

      document.querySelectorAll(".reveal, .reveal-mask").forEach((el) => {
        observer?.observe(el);
      });
    }

    // Run check immediately
    checkElements();

    // Run check after small timeouts for dynamic paints / font loads
    const t1 = setTimeout(checkElements, 100);
    const t2 = setTimeout(checkElements, 500);
    const t3 = setTimeout(checkElements, 1500);

    // Also attach scroll & resize listeners as foolproof fallback
    window.addEventListener("scroll", checkElements, { passive: true });
    window.addEventListener("resize", checkElements, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener("scroll", checkElements);
      window.removeEventListener("resize", checkElements);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);
}
