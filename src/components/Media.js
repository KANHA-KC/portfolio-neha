import Image from "next/image";
import { aspects } from "@/content/config";

// Renders a CMS image, or — while the image hasn't been uploaded yet — a designed placeholder card
// (crop marks, dashed frame, label) so empty slots still look intentional.
export default function Media({ image, aspect = "landscape", label, icon = "✦", palette, sizes = "50vw", preload = false, className = "" }) {
  const ratio = image?.width && image?.height ? `${image.width} / ${image.height}` : aspects[aspect] || aspects.landscape;
  const style = { aspectRatio: ratio, ...(palette && { "--wash": palette.wash, "--frame": palette.frame, "--ink": palette.ink }) };

  if (image?.src) {
    return (
      <div className={`media ${className}`} style={style}>
        <Image src={image.src} alt={image.alt || label || ""} fill sizes={sizes} preload={preload} className="media-img" />
      </div>
    );
  }

  return (
    <div className={`media media--empty ${className}`} style={style} role="img" aria-label={`${label || "Image"} — coming soon`}>
      <span className="crop crop--tl" aria-hidden="true" />
      <span className="crop crop--tr" aria-hidden="true" />
      <span className="crop crop--bl" aria-hidden="true" />
      <span className="crop crop--br" aria-hidden="true" />
      <span className="media-empty-inner" aria-hidden="true">
        <span className="media-icon">{icon}</span>
        {label && <span className="media-label hand">{label}</span>}
        <span className="media-meta">{aspect} · image coming soon</span>
      </span>
    </div>
  );
}
