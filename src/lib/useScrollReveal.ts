"use client";

import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Fallback if IntersectionObserver is not available
    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(".reveal, .reveal-mask").forEach((el) => {
        el.classList.add("in");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-mask");
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
