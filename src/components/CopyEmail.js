"use client";

import { useState } from "react";

export default function CopyEmail({ email, className = "" }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    try {
      await navigator.clipboard.writeText(email);
      e.preventDefault();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — let the mailto link do its thing.
    }
  };

  return (
    <a href={`mailto:${email}`} onClick={copy} className={`copy-email ${className}`} data-cursor={copied ? "copied!" : "copy"}>
      <span className="copy-email-addr">{email}</span>
      <span className="copy-email-tag" aria-live="polite">{copied ? "Copied ✓" : "Click to copy"}</span>
    </a>
  );
}
