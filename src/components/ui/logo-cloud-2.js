import Image from "next/image";
import { cn } from "@/lib/utils";

// Single row of brand logos with hairline dividers, scrolling left → right on a loop.
// Styles live in globals.css under "logo cloud". The list is rendered twice so the loop is seamless;
// the copy is hidden from assistive tech. Hover pauses it; reduced-motion users get a scrollable row.

function LogoCard({ logo, hidden }) {
  const { src, alt, width, height, scale = 1, tile } = logo;
  return (
    <li className="logo-cloud-card" style={{ "--s": scale.toFixed(3), "--tile": tile }} aria-hidden={hidden || undefined}>
      <Image src={src} alt={hidden ? "" : alt} width={width} height={height} sizes="200px" draggable={false} />
    </li>
  );
}

export function LogoCloud({ logos, className, ...props }) {
  return (
    <div className={cn("logo-cloud", className)} {...props}>
      <div className="logo-cloud-track" style={{ "--count": logos.length }}>
        <ul className="logo-cloud-row">
          {logos.map((logo) => (
            <LogoCard key={logo.src} logo={logo} />
          ))}
        </ul>
        <ul className="logo-cloud-row" aria-hidden="true">
          {logos.map((logo) => (
            <LogoCard key={logo.src} logo={logo} hidden />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LogoCloud;
