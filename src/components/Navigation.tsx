"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setPinned(window.scrollY > window.innerHeight * 0.85);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`site-nav ${pinned ? "pinned" : ""}`} id="siteNav">
      <div className="brand nav-mark-word">Incognito 5.0</div>
      <div style={{ display: "flex", alignItems: "center", gap: "26px" }}>
        <Link href="#the-night" className="nav-cta">
          The Night
        </Link>
        <Link href="#families" className="nav-cta">
          The Families
        </Link>
        <Link href="#registrations" className="nav-cta">
          Register
        </Link>
      </div>
    </nav>
  );
}
