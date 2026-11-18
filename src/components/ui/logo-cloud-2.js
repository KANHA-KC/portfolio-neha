import Image from "next/image";
import { cn } from "@/lib/utils";

// Grid of brand logos with hairline borders and "+" marks where the inner lines cross.
// Adapted from the 21st.dev logo-cloud-2 block to the site's plain-CSS setup (styles live in
// globals.css under "logo cloud"). 4 columns on desktop, 2 on phones; works with any count.

function PlusIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function LogoCard({ logo }) {
  const { src, alt, width, height, scale = 1, tile } = logo;
  return (
    <li className="logo-cloud-card" style={{ "--s": scale.toFixed(3), "--tile": tile }}>
      <Image src={src} alt={alt} width={width} height={height} sizes="200px" draggable={false} />
      <PlusIcon className="logo-cloud-plus" />
    </li>
  );
}

export function LogoCloud({ logos, className, ...props }) {
  return (
    <div className={cn("logo-cloud", className)} {...props}>
      <ul className="logo-cloud-grid">
        {logos.map((logo) => (
          <LogoCard key={logo.src} logo={logo} />
        ))}
      </ul>
    </div>
  );
}

export default LogoCloud;
