"use client";

import { useState } from "react";
import { site } from "@/data/portfolioData";

export default function CopyEmail({ className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(site.email);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — let the mailto link do its thing.
    }
  };

  return (
    <a href={`mailto:${site.email}`} onClick={copy} className={`copy-email ${className}`} data-cursor={copied ? "copied!" : "copy"}>
      <span className="copy-email-addr">{site.email}</span>
      <span className="copy-email-tag" aria-live="polite">{copied ? "Copied ✓" : "Click to copy"}</span>
    </a>
  );
}
