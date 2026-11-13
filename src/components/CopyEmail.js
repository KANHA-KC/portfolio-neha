"use client";

import { useState } from "react";

export default function CopyEmail({ email, className = "", quiet = false }) {
  const [copied, setCopied] = useState(false);

  const copy = async (e) => {
    // Must run synchronously — after an await the browser has already followed the mailto link.
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — open the mail app instead.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <a href={`mailto:${email}`} onClick={copy} className={`copy-email ${className}`} data-cursor={copied ? "copied!" : "copy"}>
      <span className="copy-email-addr">{email}</span>
      <span className={`copy-email-tag${quiet && !copied ? " sr-only" : ""}`} aria-live="polite">
        {copied ? "Copied ✓" : "Click to copy"}
      </span>
    </a>
  );
}
