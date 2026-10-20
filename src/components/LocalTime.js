"use client";

import { useEffect, useState } from "react";

const fmt = (timeZone) =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());

// Rendered empty on the server; the clock only exists in the browser.
export default function LocalTime({ prefix = "Mumbai", timezone = "Asia/Kolkata" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(fmt(timezone));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <span className="local-time">
      <span className="pulse" aria-hidden="true" />
      {prefix} <span suppressHydrationWarning>{time || "--:--"}</span>
    </span>
  );
}
