"use client";

import Script from "next/script";
import { useEffect } from "react";
import useScrollReveal from "@/lib/useScrollReveal";
import OrnateFrame from "@/components/OrnateFrame";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CinematicArchive from "@/components/CinematicArchive";
import InvitationSection from "@/components/InvitationSection";
import TheNight from "@/components/TheNight";
import TheFamilies from "@/components/TheFamilies";
import RegistrationDossiers from "@/components/RegistrationDossiers";
import StatementBreak from "@/components/StatementBreak";
import Footer from "@/components/Footer";

export default function Home() {
  useScrollReveal();

  // Debug: log when page loads
  useEffect(() => {
    console.log("Page mounted. Scroll down to see sections animate in.");

    // Force visibility after 2 seconds if reveals haven't triggered
    const fallback = setTimeout(() => {
      document.querySelectorAll(".reveal, .reveal-mask").forEach((el) => {
        if (!el.classList.contains("in")) {
          el.classList.add("in");
        }
      });
    }, 2000);

    return () => clearTimeout(fallback);
  }, []);

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
        strategy="beforeInteractive"
      />

      <OrnateFrame />
      <div className="grain" />
      <div className="scratches" />

      <Navigation />
      <main>
        <Hero />
        <CinematicArchive />
        <InvitationSection />
        <TheNight />
        <TheFamilies />
        <RegistrationDossiers />
        <StatementBreak />
      </main>
      <Footer />
    </>
  );
}
