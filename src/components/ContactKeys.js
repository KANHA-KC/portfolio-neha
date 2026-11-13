"use client";

import { useRef, useState } from "react";

/* ---------- icons ---------- */
const Icons = {
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 18.5V6.2l8.5 7 8.5-7v12.3" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5.2" cy="5.4" r="2.1" />
      <rect x="3.4" y="9" width="3.6" height="11.5" rx="0.6" />
      <path d="M9.6 9h3.4v1.7c.6-1.1 2-2 4-2 3.3 0 4 2.1 4 4.9v6.9h-3.6v-6.1c0-1.5-.3-2.7-1.9-2.7-1.6 0-2.3 1.1-2.3 2.7v6.1H9.6z" />
    </svg>
  ),
  dribbble: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8.2 3.9c3.6 4.4 6.3 10.3 7.5 16.3" />
      <path d="M3.1 10.3c4.4.4 10.1-.4 15.3-3.9" />
      <path d="M5.6 18.6c3.2-4.2 9.3-6.4 15.3-4.5" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  behance: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M2.5 6h5.6c2.3 0 3.6 1.1 3.6 2.9 0 1.2-.6 2-1.6 2.4 1.4.4 2.1 1.4 2.1 2.8 0 2.2-1.6 3.4-4.1 3.4H2.5zm2.6 4.5h2.6c1 0 1.5-.4 1.5-1.2s-.5-1.2-1.5-1.2H5.1zm0 4.9h2.9c1.1 0 1.7-.5 1.7-1.4S9.1 12.6 8 12.6H5.1zM15 6.8h5.4v1.4H15zm2.8 2.4c2.6 0 4.1 1.8 4 4.7h-6c.1 1.3.9 2 2.1 2 .9 0 1.5-.4 1.7-1h2.1c-.4 1.8-1.9 2.8-3.9 2.8-2.6 0-4.2-1.7-4.2-4.3 0-2.5 1.7-4.2 4.2-4.2zm1.8 3.4c-.1-1.1-.8-1.7-1.8-1.7s-1.7.6-1.9 1.7z" />
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.9 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
    </svg>
  ),
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v15" />
      <path d="M6 13l6 6 6-6" />
    </svg>
  ),
  link: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  )
};

// Brand-palette tone + handwritten note per known network.
const SOCIAL_META = {
  linkedin: { icon: "linkedin", tone: "teal", note: "where I keep things\nprofessional-ish" },
  dribbble: { icon: "dribbble", tone: "pink", note: "shots, sketches &\nwork in progress" },
  instagram: { icon: "instagram", tone: "pink", note: "I’m most real here" },
  behance: { icon: "behance", tone: "teal", note: "full case studies\nlive here" },
  x: { icon: "x", tone: "ink", note: "trying to be\nactive here" },
  twitter: { icon: "x", tone: "ink", note: "trying to be\nactive here" }
};

/* ---------- mechanical switch sound ----------
   Rendered once into AudioBuffers with modal synthesis (damped sine "modes" of the
   plastic housing + a sharp broadband transient), so playback is instant and crisp.
   A real key makes two sounds: the click + bottom-out on press, and a lighter
   "clack" when the spring returns the cap — we play them on pointerdown / pointerup. */
let ctx;
let banks;

function render(sr, length, { clickAt = 0, click = 1, clickTau = 0.0007, modes = [], thud = 0, thudAt = 0, thudTau = 0.004, seed = 1 }) {
  const n = Math.floor(sr * length);
  const out = new Float32Array(n);
  let rand = seed * 9301 + 49297;
  const noise = () => ((rand = (rand * 9301 + 49297) % 233280) / 233280) * 2 - 1;
  let lp = 0;
  let prev = 0;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    let v = 0;
    // sharp transient (high-passed noise = the "tick")
    if (t >= clickAt) {
      const w = noise();
      const hp = w - prev;
      prev = w;
      v += hp * click * Math.exp(-(t - clickAt) / clickTau);
    }
    // bottom-out thud (low-passed noise)
    if (thud && t >= thudAt) {
      lp += 0.18 * (noise() - lp);
      v += lp * thud * Math.exp(-(t - thudAt) / thudTau) * 2.2;
    }
    // resonant modes of the keycap / plate
    for (const m of modes) {
      const tt = t - (m.at ?? 0);
      if (tt < 0) continue;
      const env = Math.exp(-tt / m.tau) * Math.min(1, tt / 0.0002);
      v += m.amp * env * Math.sin(2 * Math.PI * m.f * tt + (m.ph ?? 0));
    }
    out[i] = v;
  }
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(out[i]));
  for (let i = 0; i < n; i++) out[i] /= peak || 1;
  return out;
}

function buildBanks(c) {
  const sr = c.sampleRate;
  const mk = (data) => {
    const b = c.createBuffer(1, data.length, sr);
    b.copyToChannel(data, 0);
    return b;
  };
  const down = [];
  const up = [];
  for (let k = 0; k < 4; k++) {
    const j = 1 + (k - 1.5) * 0.035; // slight per-variant detune so repeats don't sound sampled
    down.push(
      mk(
        render(sr, 0.09, {
          seed: k + 1,
          click: 1,
          clickTau: 0.0006,
          // click jacket snap, then the cap bottoms out ~9ms later
          thud: 0.55,
          thudAt: 0.009,
          thudTau: 0.006,
          modes: [
            { f: 3900 * j, tau: 0.0035, amp: 0.32 },
            { f: 2450 * j, tau: 0.006, amp: 0.38 },
            { f: 6200 * j, tau: 0.002, amp: 0.18 },
            { f: 1180 * j, tau: 0.011, amp: 0.3, at: 0.009 },
            { f: 640 * j, tau: 0.016, amp: 0.26, at: 0.009 },
            { f: 2900 * j, tau: 0.005, amp: 0.22, at: 0.009 }
          ]
        })
      )
    );
    up.push(
      mk(
        render(sr, 0.06, {
          seed: k + 11,
          click: 0.7,
          clickTau: 0.0005,
          modes: [
            { f: 3300 * j, tau: 0.003, amp: 0.25 },
            { f: 1850 * j, tau: 0.006, amp: 0.3 },
            { f: 900 * j, tau: 0.009, amp: 0.18 }
          ]
        })
      )
    );
  }
  return { down, up };
}

function play(kind) {
  try {
    ctx ??= new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    banks ??= buildBanks(ctx);
    const list = banks[kind];
    const src = ctx.createBufferSource();
    src.buffer = list[Math.floor(Math.random() * list.length)];
    src.playbackRate.value = 0.97 + Math.random() * 0.06;
    const g = ctx.createGain();
    g.gain.value = kind === "down" ? 0.5 : 0.28;
    src.connect(g).connect(ctx.destination);
    src.start();
  } catch {
    // Audio unavailable — the key still works silently.
  }
}

function Arrow({ dir }) {
  // hand-drawn squiggle arrow pointing at the key
  return (
    <svg className="ckey-arrow" viewBox="0 0 24 34" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === "down" ? (
        <>
          <path d="M10 2c-4 7 6 12 2 19s-1 9 0 11" />
          <path d="M7 27l5 5 4-6" />
        </>
      ) : (
        <>
          <path d="M14 32c4-7-6-12-2-19s1-9 0-11" />
          <path d="M17 7l-5-5-4 6" />
        </>
      )}
    </svg>
  );
}

function Key({ href, label, icon, tone, note, notePos, download, external }) {
  const [down, setDown] = useState(false);
  const pressed = useRef(false);
  const press = () => {
    if (pressed.current) return;
    pressed.current = true;
    setDown(true);
    play("down");
  };
  const release = () => {
    if (!pressed.current) return;
    pressed.current = false;
    setDown(false);
    play("up");
  };

  return (
    <li className={`ckey ckey--${tone} ckey--note-${notePos}`}>
      <a
        href={href}
        className={`ckey-btn${down ? " is-down" : ""}`}
        aria-label={label}
        data-cursor={label.toLowerCase()}
        {...(download ? { download: "" } : {})}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onPointerDown={press}
        onPointerUp={release}
        onPointerLeave={release}
        onPointerCancel={release}
        onKeyDown={(e) => e.key === "Enter" && press()}
        onKeyUp={(e) => e.key === "Enter" && release()}
        onBlur={release}
      >
        <span className="ckey-cap">
          <span className="ckey-top">{Icons[icon] ?? Icons.link}</span>
        </span>
      </a>
      <span className="ckey-note hand" aria-hidden="true">
        <Arrow dir={notePos === "top" ? "down" : "up"} />
        <span className="ckey-note-text">{note}</span>
      </span>
    </li>
  );
}

export default function ContactKeys({ email, socials = [], resume }) {
  const keys = [
    { href: `mailto:${email}`, label: "Email", icon: "mail", tone: "pap", note: `projects / collabs /\ncoffee chats ✿\n${email}` },
    ...socials.map((s) => {
      const meta = SOCIAL_META[s.label.toLowerCase()] ?? { icon: "link", tone: "aqua", note: `find me on ${s.label}` };
      return { href: s.href, label: s.label, external: true, ...meta };
    }),
    ...(resume ? [{ href: resume, label: "Download resume", icon: "download", tone: "gold", download: true, note: "download resume /\nATS & AI friendly" }] : [])
  ];

  return (
    <div className="ckeys" role="group" aria-label="Contact shortcuts">
      <ul className="ckeys-row">
        {keys.map((k, i) => (
          <Key key={k.label} {...k} notePos={i % 2 ? "top" : "bottom"} />
        ))}
      </ul>
    </div>
  );
}
