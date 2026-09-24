"use client";

import { useEffect, useRef } from "react";

export default function OrnateFrame() {
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (frameRef.current) {
        if (window.innerWidth <= 768) {
          frameRef.current.style.display = "none";
          return;
        }
        frameRef.current.style.display = "block";
        const margin = 12;
        frameRef.current.style.height = `${window.innerHeight - margin * 2}px`;
        frameRef.current.style.width = `${window.innerWidth - margin * 2}px`;
        frameRef.current.style.top = `${margin}px`;
        frameRef.current.style.left = `${margin}px`;
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  return (
    <div ref={frameRef} className="ornate-frame" aria-hidden="true">
      <span className="ornate-corner corner-tl">
        <span className="filigree" />
      </span>
      <span className="ornate-corner corner-tr">
        <span className="filigree" />
      </span>
      <span className="ornate-corner corner-bl">
        <span className="filigree" />
      </span>
      <span className="ornate-corner corner-br">
        <span className="filigree" />
      </span>
    </div>
  );
}
