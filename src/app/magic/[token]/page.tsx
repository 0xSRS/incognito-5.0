"use client";

import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import OrnateFrame from "@/components/OrnateFrame";
import { soundEffects } from "@/lib/audioEffects";

// Backend (Sanctum route handler) — hard-coded
const API_BASE = "https://magic.incognito05.tech";

interface DossierData {
  status: "success" | "error";
  message?: string;
  encoded_str?: string;
  flag_hash?: string;
  is_claimed?: boolean;
}

async function loadDossier(token: string): Promise<DossierData> {
  try {
    const res = await fetch(
      `${API_BASE}/api/magic/${encodeURIComponent(token)}`,
      {
        headers: { Accept: "application/json" },
        cache: "no-store",
      }
    );
    const data = await res.json().catch(() => ({}));

    if (res.ok && data.status === "success") return data as DossierData;

    // FastAPI errors come back as {"detail": "..."}, normalise them
    const msg =
      data.message ||
      (typeof data.detail === "string" ? data.detail : "") ||
      (res.status === 429
        ? "Too many attempts. Wait a minute and retry."
        : "This access token is invalid or has expired.");
    return { status: "error", message: msg };
  } catch {
    return {
      status: "error",
      message: "Failed to establish link with the sanctum server.",
    };
  }
}

export default function MagicDossierPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const resolvedParams = use(params);
  const token = resolvedParams.token;

  const [loading, setLoading] = useState(true);
  const [dossier, setDossier] = useState<DossierData | null>(null);

  // Active Method Tab: 'cipher' (The Intelligent Way) or 'hash' (The Hard Way)
  const [activeMethod, setActiveMethod] = useState<"cipher" | "hash">("cipher");

  // Copy States
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedHashcat, setCopiedHashcat] = useState(false);

  // Manual retry
  const fetchDossier = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    const data = await loadDossier(token);
    setDossier(data);
    if (data.status === "success") soundEffects.playStamp();
    else soundEffects.playError();
    setLoading(false);
  }, [token]);

  // Initial load
  useEffect(() => {
    let ignore = false;
    (async () => {
      const data = await loadDossier(token);
      if (ignore) return;
      setDossier(data);
      if (data.status === "success") soundEffects.playStamp();
      else soundEffects.playError();
      setLoading(false);
    })();
    return () => {
      ignore = true;
    };
  }, [token]);

  const handleCopyPayload = () => {
    if (!dossier?.encoded_str) return;
    navigator.clipboard.writeText(dossier.encoded_str);
    setCopiedPayload(true);
    soundEffects.playStamp();
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleCopyHash = () => {
    if (!dossier?.flag_hash) return;
    navigator.clipboard.writeText(dossier.flag_hash);
    setCopiedHash(true);
    soundEffects.playStamp();
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const hashcatCmd = `hashcat -m 1400 -a 3 ${dossier?.flag_hash || "<HASH>"} ?a?a?a?a?a?a?a?a`;

  const handleCopyHashcat = () => {
    navigator.clipboard.writeText(hashcatCmd);
    setCopiedHashcat(true);
    soundEffects.playStamp();
    setTimeout(() => setCopiedHashcat(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#070504] text-[#ece1c6] font-serif flex flex-col items-center justify-start px-4 sm:px-8 py-12 sm:py-20 overflow-x-hidden selection:bg-[#5c0f16] selection:text-[#ece1c6]">
      <OrnateFrame />

      {/* Atmospheric Vignette & Subtle Gold Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_85%)] opacity-90" />
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(184,146,63,0.06),transparent_65%)]" />

      <main className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Minimalist Free-Flow Header */}
        <header className="text-center mb-10 sm:mb-14">
          <p className="text-[11px] sm:text-xs tracking-[0.35em] text-[#b8923f] uppercase font-mono mb-2">
            Protocol 5.0 — Access Gateway
          </p>
          <h1 className="font-['Godfather'] text-4xl sm:text-5xl md:text-6xl tracking-widest text-[#e0b563] drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
            INCOGNITO
          </h1>
          <div className="w-16 h-px bg-linear-to-r from-transparent via-[#b8923f] to-transparent mx-auto mt-4" />
        </header>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center">
            <div className="inline-block w-8 h-8 border border-[#b8923f] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs tracking-[0.25em] text-[#cabf9c]/70 uppercase font-mono animate-pulse">
              Resolving transmission...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && dossier?.status === "error" && (
          <div className="w-full text-center py-16 space-y-4">
            <p className="font-['Goldoni'] text-2xl text-[#e0b563]">
              Link Inaccessible
            </p>
            <p className="text-sm text-[#cabf9c]/70 max-w-md mx-auto font-sans">
              {dossier.message || "This access token is invalid or has expired."}
            </p>
            <div className="pt-4 flex justify-center gap-6 font-mono text-xs">
              <button
                onClick={fetchDossier}
                className="text-[#b8923f] hover:text-[#e0b563] tracking-widest uppercase transition-colors"
              >
                [ Retry ]
              </button>
              <Link
                href="/"
                className="text-[#cabf9c]/60 hover:text-[#ece1c6] tracking-widest uppercase transition-colors"
              >
                [ Return Home ]
              </Link>
            </div>
          </div>
        )}

        {/* Free-Flow Content */}
        {!loading && dossier?.status === "success" && (
          <div className="w-full space-y-12 animate-fadeIn">
            {/* Dilemma Prompt & Route Toggle Bar */}
            <div className="space-y-4">
              <p className="text-center text-[11px] sm:text-xs font-mono tracking-widest uppercase text-[#cabf9c]/50">
                // Choose Your Method: The Intelligent Way or The Hard Way?
              </p>

              <div className="flex items-center justify-center gap-6 sm:gap-12 font-mono text-xs tracking-widest border-b border-[#b8923f]/15 pb-4">
                {/* 01. Encoded Payload — The Intelligent Way */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod("cipher");
                    soundEffects.playStamp();
                  }}
                  className={`pb-1 transition-all uppercase relative flex flex-col items-center gap-0.5 ${
                    activeMethod === "cipher"
                      ? "text-[#e0b563] font-semibold"
                      : "text-[#cabf9c]/40 hover:text-[#cabf9c]/80"
                  }`}
                >
                  <span className="text-xs sm:text-sm">01. Encoded Payload</span>
                  <span className="text-[10px] tracking-wider text-[#b8923f]/80 font-normal">
                    The Intelligent Way (Est. ~5 mins)
                  </span>
                  {activeMethod === "cipher" && (
                    <span className="absolute -bottom-4.25 left-0 right-0 h-0.5 bg-[#e0b563] shadow-[0_0_8px_rgba(224,181,99,0.8)]" />
                  )}
                </button>

                <span className="text-[#b8923f]/20">/</span>

                {/* 02. Hash Digest — The Hard Way */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod("hash");
                    soundEffects.playStamp();
                  }}
                  className={`pb-1 transition-all uppercase relative flex flex-col items-center gap-0.5 ${
                    activeMethod === "hash"
                      ? "text-[#e0b563] font-semibold"
                      : "text-[#cabf9c]/40 hover:text-[#cabf9c]/80"
                  }`}
                >
                  <span className="text-xs sm:text-sm">02. Hash Digest</span>
                  <span className="text-[10px] tracking-wider text-[#d9787f] font-normal">
                    The Hard Way (Est. ~5–8 hrs)
                  </span>
                  {activeMethod === "hash" && (
                    <span className="absolute -bottom-4.25 left-0 right-0 h-0.5 bg-[#e0b563] shadow-[0_0_8px_rgba(224,181,99,0.8)]" />
                  )}
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* METHOD 01: Encoded Payload (The Intelligent Way)                         */}
            {/* ========================================================================= */}
            {activeMethod === "cipher" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Encoded String Display */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#cabf9c]/50 tracking-widest uppercase">
                      // Intercepted Ciphertext
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPayload}
                      className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase tracking-wider"
                    >
                      {copiedPayload ? "✓ Copied" : "Copy Payload"}
                    </button>
                  </div>

                  <p
                    onClick={handleCopyPayload}
                    title="Click to copy"
                    className="font-mono text-sm sm:text-base text-[#e0b563] break-all select-all tracking-wider cursor-pointer hover:opacity-90 py-2 border-b border-[#b8923f]/20 transition-opacity"
                  >
                    {dossier.encoded_str || "NO_PAYLOAD_AVAILABLE"}
                  </p>
                </div>

                {/* Intelligent Way Directive */}
                <div className="pt-2 space-y-3 border-l-2 border-[#b8923f]/40 pl-4 sm:pl-6 my-6">
                  <p className="font-['Goldoni'] text-lg sm:text-xl text-[#e0b563] italic tracking-wide">
                    &ldquo;A sharp mind strikes like a scalpel. The Don values cunning over blunt force.&rdquo;
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#cabf9c]/70 leading-relaxed max-w-xl">
                    Inspect the character sets, deduce the transformation layers, and use your brain to decrypt the transmission. No heavy compute required—just intellect and intuition.
                  </p>
                  <div className="font-mono text-[11px] text-[#b8923f]/80 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 tracking-wider uppercase">
                    <span className="text-[#63e078]">● Est. Time: ~5 Minutes</span>
                    <span className="text-[#b8923f]/30">|</span>
                    <span>Brainpower &amp; Pattern Analysis</span>
                    <span className="text-[#b8923f]/30">|</span>
                    <span className="text-[#e0b563]">Intelligent Route</span>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* METHOD 02: Hash Digest (The Hard Way)                                    */}
            {/* ========================================================================= */}
            {activeMethod === "hash" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Hash Display Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#cabf9c]/50 tracking-widest uppercase">
                      // Target SHA-256 Digest
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase tracking-wider"
                    >
                      {copiedHash ? "✓ Copied" : "Copy Hash"}
                    </button>
                  </div>

                  <p
                    onClick={handleCopyHash}
                    title="Click to copy"
                    className="font-mono text-sm sm:text-base text-[#e0b563] break-all select-all tracking-wider cursor-pointer hover:opacity-90 py-2 border-b border-[#b8923f]/20 transition-opacity"
                  >
                    {dossier.flag_hash || "NO_DIGEST_AVAILABLE"}
                  </p>
                </div>

                {/* Brute Force Challenge Directive */}
                <div className="pt-2 space-y-4 border-l-2 border-[#8a1c23]/60 pl-4 sm:pl-6 my-6">
                  <p className="font-['Goldoni'] text-lg sm:text-xl text-[#e0b563] italic tracking-wide">
                    &ldquo;If you insist on the hard way, prepare to let the silicon burn.&rdquo;
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#cabf9c]/70 leading-relaxed max-w-xl">
                    Brute-forcing an unsalted 256-bit hash through pure permutation. If you have the GPU cluster and hours to spare, fire up Hashcat and let the rig churn through the keyspace.
                  </p>

                  <div className="font-mono text-[11px] text-[#b8923f]/80 flex flex-wrap items-center gap-x-4 gap-y-1 tracking-wider uppercase">
                    <span className="text-[#d9787f]">▲ Est. Time: ~5–8 Hours</span>
                    <span className="text-[#b8923f]/30">|</span>
                    <span>GPU Exhaustion Track</span>
                    <span className="text-[#b8923f]/30">|</span>
                    <span className="text-[#e0b563]">The Hard Way</span>
                  </div>

                  {/* Hashcat Attack Command Snippet */}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#cabf9c]/50 tracking-wider uppercase">
                        // Hashcat Attack Syntax (Mode 1400 - SHA-256)
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyHashcat}
                        className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase"
                      >
                        {copiedHashcat ? "✓ Command Copied" : "Copy Command"}
                      </button>
                    </div>

                    <div
                      onClick={handleCopyHashcat}
                      title="Click to copy Hashcat command"
                      className="p-3 bg-[#110c08] border border-[#b8923f]/20 rounded font-mono text-xs sm:text-xs text-[#e0b563] break-all select-all cursor-pointer hover:border-[#b8923f]/50 transition-colors"
                    >
                      <code>{hashcatCmd}</code>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Minimalist Direct Validation Link */}
            <div className="pt-10 border-t border-[#b8923f]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
              <span className="text-[#cabf9c]/40 tracking-wider uppercase text-center sm:text-left">
                Acquired your flag? Proceed to verification.
              </span>
              <Link
                href="/validate-flag"
                className="text-[#e0b563] hover:text-white tracking-widest uppercase transition-colors border-b border-[#b8923f]/40 pb-0.5 hover:border-[#e0b563]"
              >
                Validate Flag ➔
              </Link>
            </div>
          </div>
        )}

        {/* Minimal Footer */}
        <footer className="mt-20 text-center font-mono text-[10px] text-[#cabf9c]/30 tracking-[0.3em] uppercase">
          Incognito 5.0 Sanctum Network
        </footer>
      </main>
    </div>
  );
}