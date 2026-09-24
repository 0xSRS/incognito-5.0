"use client";

import { useEffect } from "react";
import Image from "next/image";

interface GsapTimeline {
  to: (target: string, vars: Record<string, unknown>, position?: number | string) => GsapTimeline;
}

interface WindowWithGsap {
  gsap?: {
    timeline: (config?: { defaults?: { ease?: string } }) => GsapTimeline;
  };
}

export default function Hero() {
  useEffect(() => {
    const win = typeof window !== "undefined" ? (window as unknown as WindowWithGsap) : null;
    if (win?.gsap) {
      const gsap = win.gsap;
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to("#siteNav", { opacity: 1, y: 0, duration: 0.9 }, 0.1)
        .to(".hero-media img", {
          filter: "saturate(0.82) contrast(1.08) brightness(0.78)",
          duration: 1.6,
        }, 0)
        .to("#hk1", { opacity: 1, duration: 0.8 }, 0.5)
        .to("#hk2", { opacity: 1, duration: 0.9 }, 0.9)
        .to(".hero-title .veil > span", {
          y: "0%",
          duration: 1.1,
          ease: "power3.out",
        }, 1.2)
        .to(".hero-title", { opacity: 1, duration: 0.1 }, 1.2)
        .to("#hk-freshers", { opacity: 1, duration: 0.8 }, 1.6)
        .to("#hk4", { opacity: 1, duration: 0.8 }, 1.9)
        .to("#hk5", { opacity: 1, duration: 0.8 }, 2.15)
        .to("#hk6", { opacity: 1, duration: 0.9 }, 2.4);
    } else {
      ["siteNav", "hk1", "hk2", "hk3", "hk-freshers", "hk4", "hk5", "hk6"].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.style.opacity = "1";
      });
      document.querySelectorAll(".hero-title .veil > span").forEach((s) => {
        (s as HTMLElement).style.transform = "translateY(0)";
      });
    }
  }, []);

  return (
    <div className="hero" id="hero">
      <div className="hero-media">
        <Image
          src="/images/frame-1-no-text.webp"
          alt="Incognito 5.0"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-kicker editorial hero-anim" id="hk1">
            SCSDF Presents
          </p>
          <p className="hero-script script hero-anim" id="hk2">
            We&rsquo;re gonna make you an offer you can&rsquo;t refuse&hellip;
          </p>
          <h1
            className="hero-title display"
            id="hk3"
            aria-label="Incognito 5.0"
          >
            <span className="veil">
              <span>Incognito&nbsp;5.0</span>
            </span>
          </h1>
          <p className="hero-tagline editorial hero-anim" id="hk-freshers">
            Freshers&rsquo; Night
          </p>
          <p className="hero-sub editorial hero-anim" id="hk4">
            An invitation to the family — Freshers&rsquo; Night, held the old
            way.
          </p>
          <div className="hero-meta editorial hero-anim" id="hk5">
            <span>5 Oct 2026</span>
            <span>4:30 PM Onwards</span>
            <span>Upper Auditorium</span>
            <span>SCSDF Only</span>
          </div>
          <div className="hero-actions hero-anim" id="hk6">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfnduyC3DDuHO79LgrrrtARtPqFF0AT0zTNfVg3K6jXrYJ4DQ/viewform?usp=header"
              className="btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Freshers Registration
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeBWv1ZYroQZSlOHymGw6PQddTsvZj1PrYLv6lN6pmBtXjpfQ/viewform?usp=publish-editor"
              className="btn-ghost secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mr. and Ms. Freshers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
