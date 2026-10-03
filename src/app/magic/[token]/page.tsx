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

  // Active Method: 'brain' (The Cunning Intellect) vs 'hash' (The Silicon Furnace)
  const [activeMethod, setActiveMethod] = useState<"brain" | "hash">("brain");

  // Copy states
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedHashcat, setCopiedHashcat] = useState(false);
  const [copiedJohn, setCopiedJohn] = useState(false);

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
  const johnCmd = `john --format=raw-sha256 --mask='?a?a?a?a?a?a?a?a' target_hash.txt`;

  const handleCopyHashcat = () => {
    navigator.clipboard.writeText(hashcatCmd);
    setCopiedHashcat(true);
    soundEffects.playStamp();
    setTimeout(() => setCopiedHashcat(false), 2000);
  };

  const handleCopyJohn = () => {
    navigator.clipboard.writeText(johnCmd);
    setCopiedJohn(true);
    soundEffects.playStamp();
    setTimeout(() => setCopiedJohn(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#070504] text-[#ece1c6] font-serif flex flex-col items-center justify-start px-4 sm:px-8 py-12 sm:py-20 overflow-x-hidden selection:bg-[#5c0f16] selection:text-[#ece1c6]">
      <OrnateFrame />

      <main className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center">
        {/* Editorial File Header */}
        <header className="text-center mb-12 sm:mb-16 w-full">
          <div className="file-mark justify-center mb-4">
            <span className="num editorial">File No. 5.0</span>
            <span className="rule" />
            <span className="editorial">Sanctum Dispatch</span>
          </div>

          <h1 className="font-['Godfather'] text-5xl sm:text-6xl md:text-7xl tracking-wide text-[#ece1c6] leading-none mb-3">
            INCOGNITO
          </h1>
          <p className="font-['Italianno'] text-2xl sm:text-3xl text-[#b8923f] tracking-wide">
            An offering only the worthy can decrypt
          </p>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="py-24 text-center">
            <div className="inline-block w-6 h-6 border border-[#b8923f] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs tracking-[0.28em] text-[#cabf9c]/60 uppercase font-mono">
              Unsealing transmission...
            </p>
          </div>
        )}

        {/* Error State */}
        {!loading && dossier?.status === "error" && (
          <div className="w-full text-center py-16 space-y-4 max-w-md mx-auto">
            <p className="font-['Goldoni'] text-xl sm:text-2xl text-[#b8923f] uppercase tracking-wider">
              Seal Inaccessible
            </p>
            <p className="text-sm text-[#cabf9c]/70 font-sans leading-relaxed">
              {dossier.message || "This access token is invalid or has expired."}
            </p>
            <div className="pt-6 flex justify-center gap-6 font-mono text-xs">
              <button
                onClick={fetchDossier}
                className="text-[#b8923f] hover:text-[#ece1c6] tracking-widest uppercase transition-colors"
              >
                [ Retry Dispatch ]
              </button>
              <Link
                href="/"
                className="text-[#cabf9c]/50 hover:text-[#ece1c6] tracking-widest uppercase transition-colors"
              >
                [ Return Home ]
              </Link>
            </div>
          </div>
        )}

        {/* Main Content: Brain vs Hash */}
        {!loading && dossier?.status === "success" && (
          <div className="w-full space-y-12">
            {/* Editorial Tab Switcher */}
            <div className="border-b border-[#b8923f]/20 pb-5">
              <p className="text-center text-[11px] font-mono tracking-[0.25em] text-[#cabf9c]/45 uppercase mb-4">
                // Choose Your Method: Brain vs Brute Force
              </p>

              <div className="flex items-center justify-center gap-6 sm:gap-14 font-mono text-xs tracking-widest">
                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod("brain");
                    soundEffects.playStamp();
                  }}
                  className={`pb-2 transition-colors uppercase relative flex flex-col items-center gap-1 ${
                    activeMethod === "brain"
                      ? "text-[#e0b563] font-semibold"
                      : "text-[#cabf9c]/40 hover:text-[#cabf9c]/80"
                  }`}
                >
                  <span className="text-xs sm:text-sm">01. The Brain Section</span>
                  <span className="text-[10px] tracking-wider text-[#b8923f]/70 font-normal">
                    The Cunning Intellect (~5 mins)
                  </span>
                  {activeMethod === "brain" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e0b563]" />
                  )}
                </button>

                <span className="text-[#b8923f]/25 font-light">/</span>

                <button
                  type="button"
                  onClick={() => {
                    setActiveMethod("hash");
                    soundEffects.playStamp();
                  }}
                  className={`pb-2 transition-colors uppercase relative flex flex-col items-center gap-1 ${
                    activeMethod === "hash"
                      ? "text-[#e0b563] font-semibold"
                      : "text-[#cabf9c]/40 hover:text-[#cabf9c]/80"
                  }`}
                >
                  <span className="text-xs sm:text-sm">02. The Hash Section</span>
                  <span className="text-[10px] tracking-wider text-[#cabf9c]/50 font-normal">
                    The Silicon Furnace (~5–8 hrs)
                  </span>
                  {activeMethod === "hash" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e0b563]" />
                  )}
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* METHOD 01: THE BRAIN SECTION                                             */}
            {/* ========================================================================= */}
            {activeMethod === "brain" && (
              <div className="space-y-10 animate-fadeIn">
                {/* Authentic Godfather Event Narrative */}
                <div className="space-y-4">
                  <div className="file-mark">
                    <span className="num editorial">Dispatch</span>
                    <span className="rule" />
                    <span className="editorial">The Corleone Council</span>
                  </div>

                  <blockquote className="font-['Goldoni'] text-xl sm:text-2xl text-[#e0b563] italic leading-snug border-l-2 border-[#b8923f]/40 pl-4 sm:pl-6 my-4">
                    &ldquo;Great men are not born great, they grow great. In our family, an agile intellect outmaneuvers ten thousand soldiers with heavy iron.&rdquo;
                  </blockquote>

                  <div className="font-sans text-xs sm:text-sm text-[#cabf9c]/75 leading-relaxed space-y-3">
                    <p>
                      Every year, the School of Cybersecurity &amp; Digital Forensics admits a fresh intake. Strangers arrive at the gates; only those with sharp minds cross the threshold into the family.
                    </p>
                    <p>
                      Incognito 5.0 is not about reckless power. Below lies your personal intercepted transmission. It has been wrapped in layered encodings and classical transformations. A cunning mind will dissect the character sets, trace the patterns, and reveal the plaintext flag in minutes.
                    </p>
                    <p className="font-['Italianno'] text-2xl text-[#b8923f] pt-1">
                      — Don Vito Corleone
                    </p>
                  </div>
                </div>

                {/* The Letter Box: Raw Ciphertext Document */}
                <div className="pt-2 border-t border-[#b8923f]/15 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#cabf9c]/55 tracking-widest uppercase">
                      // Intercepted Ciphertext
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyPayload}
                      className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase tracking-wider"
                    >
                      {copiedPayload ? "✓ Copied" : "[ Copy Ciphertext ]"}
                    </button>
                  </div>

                  <p
                    onClick={handleCopyPayload}
                    title="Click to copy"
                    className="font-mono text-sm sm:text-base text-[#e0b563] break-all select-all tracking-wider cursor-pointer hover:opacity-85 py-3 border-b border-[#b8923f]/25 transition-opacity leading-relaxed"
                  >
                    {dossier.encoded_str || "NO_PAYLOAD_AVAILABLE"}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-[#cabf9c]/45 pt-1">
                    <span>Length: {dossier.encoded_str?.length || 0} bytes</span>
                    <span>Hint: Inspect base encodings, rotational shifts &amp; masks</span>
                  </div>
                </div>

                {/* Editorial Directive */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#b8923f]/15 text-xs">
                  <div>
                    <span className="font-mono text-[#b8923f] uppercase tracking-wider block mb-1">
                      01 · Inspect
                    </span>
                    <p className="text-[#cabf9c]/65 font-sans leading-relaxed">
                      Analyze padding bytes, character frequencies, and alphabet boundaries.
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[#b8923f] uppercase tracking-wider block mb-1">
                      02 · Unlayer
                    </span>
                    <p className="text-[#cabf9c]/65 font-sans leading-relaxed">
                      Strip each transformation layer methodically with Python or CyberChef.
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[#b8923f] uppercase tracking-wider block mb-1">
                      03 · Claim Seat
                    </span>
                    <p className="text-[#cabf9c]/65 font-sans leading-relaxed">
                      Unveil the flag format <code className="text-[#e0b563]">NAME&#123;...&#125;</code> and seal your event ticket.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* METHOD 02: THE HASH SECTION                                              */}
            {/* ========================================================================= */}
            {activeMethod === "hash" && (
              <div className="space-y-10 animate-fadeIn">
                {/* Narrative */}
                <div className="space-y-4">
                  <div className="file-mark">
                    <span className="num editorial">Digest</span>
                    <span className="rule" />
                    <span className="editorial">The Silicon Furnace</span>
                  </div>

                  <blockquote className="font-['Goldoni'] text-xl sm:text-2xl text-[#e0b563] italic leading-snug border-l-2 border-[#8a1c23]/60 pl-4 sm:pl-6 my-4">
                    &ldquo;If you will not use cunning, you must pay in heat, silicon, and time.&rdquo;
                  </blockquote>

                  <p className="font-sans text-xs sm:text-sm text-[#cabf9c]/75 leading-relaxed">
                    For operators who command GPU rigs and choose brute mechanical force over pattern recognition. Below is the SHA-256 digest of your flag alongside the exact commands to launch an exhaustive keyspace attack.
                  </p>
                </div>

                {/* Raw Hash String */}
                <div className="pt-2 border-t border-[#b8923f]/15 space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#cabf9c]/55 tracking-widest uppercase">
                      // Target SHA-256 Digest
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase tracking-wider"
                    >
                      {copiedHash ? "✓ Copied" : "[ Copy Digest ]"}
                    </button>
                  </div>

                  <p
                    onClick={handleCopyHash}
                    title="Click to copy"
                    className="font-mono text-sm sm:text-base text-[#e0b563] break-all select-all tracking-wider cursor-pointer hover:opacity-85 py-3 border-b border-[#b8923f]/25 transition-opacity"
                  >
                    {dossier.flag_hash || "NO_DIGEST_AVAILABLE"}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#cabf9c]/45 pt-1">
                    <span>Algorithm: Raw SHA-256 (256-bit)</span>
                    <span>Search Space: Printable ASCII</span>
                  </div>
                </div>

                {/* Step-by-Step Execution Process */}
                <div className="space-y-6 pt-4 border-t border-[#b8923f]/15">
                  <div className="file-mark mb-2">
                    <span className="num editorial">Process</span>
                    <span className="rule" />
                    <span className="editorial">Attack Pipeline</span>
                  </div>

                  {/* Step 1 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#ece1c6]">
                        01. Store target hash to disk
                      </span>
                    </div>
                    <pre className="p-3 bg-[#0d0906] border border-[#b8923f]/20 font-mono text-xs text-[#e0b563] overflow-x-auto whitespace-pre-wrap break-all">
                      <code>echo &quot;{dossier.flag_hash || "<HASH>"}&quot; &gt; target_hash.txt</code>
                    </pre>
                  </div>

                  {/* Step 2 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#ece1c6]">
                        02. Run Hashcat (GPU Mask Attack — Mode 1400)
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyHashcat}
                        className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase"
                      >
                        {copiedHashcat ? "✓ Copied" : "[ Copy ]"}
                      </button>
                    </div>
                    <pre
                      onClick={handleCopyHashcat}
                      title="Click to copy"
                      className="p-3 bg-[#0d0906] border border-[#b8923f]/20 font-mono text-xs text-[#e0b563] overflow-x-auto whitespace-pre-wrap break-all cursor-pointer hover:border-[#b8923f]/50 transition-colors"
                    >
                      <code>{hashcatCmd}</code>
                    </pre>
                    <p className="text-[11px] font-mono text-[#cabf9c]/50">
                      Parameters: <code className="text-[#ece1c6]">-m 1400</code> (SHA-256) · <code className="text-[#ece1c6]">-a 3</code> (Brute-force / Mask) · <code className="text-[#ece1c6]">?a</code> (Printable ASCII character set)
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#ece1c6]">
                        03. Alternative: John the Ripper (CPU Mask Mode)
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyJohn}
                        className="text-[#b8923f] hover:text-[#e0b563] transition-colors uppercase"
                      >
                        {copiedJohn ? "✓ Copied" : "[ Copy ]"}
                      </button>
                    </div>
                    <pre
                      onClick={handleCopyJohn}
                      title="Click to copy"
                      className="p-3 bg-[#0d0906] border border-[#b8923f]/20 font-mono text-xs text-[#e0b563] overflow-x-auto whitespace-pre-wrap break-all cursor-pointer hover:border-[#b8923f]/50 transition-colors"
                    >
                      <code>{johnCmd}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Link — Minimalist Godfather Theme */}
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
          Incognito 5.0 Sanctum Network · School of Cybersecurity
        </footer>
      </main>
    </div>
  );
}