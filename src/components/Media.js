import Image from "next/image";
import { aspects } from "@/content/config";

// Renders a CMS image, or — while the image hasn't been uploaded yet — a designed placeholder card
// (crop marks, dashed frame, label) so empty slots still look intentional.
export default function Media({ image, aspect = "landscape", label, palette, sizes = "50vw", preload = false, className = "" }) {
  const vars = palette ? { "--wash": palette.wash, "--frame": palette.frame, "--ink": palette.ink } : {};

  // Real images are never cropped: the frame takes the image's own shape (width fills, height follows).
  // width/height only reserve space before load; with `height: auto` the browser then uses the file's true ratio.
  if (image?.src) {
    return (
      <div className={`media media--image ${className}`} style={vars}>
        <Image
          src={image.src}
          alt={image.alt || label || ""}
          width={image.width || 1600}
          height={image.height || 1200}
          sizes={sizes}
          preload={preload}
          className="media-img"
        />
      </div>
    );
  }

  const style = { aspectRatio: aspects[aspect] || aspects.landscape, ...vars };

  return (
    <div className={`media media--empty ${className}`} style={style} role="img" aria-label={`${label || "Image"} — coming soon`}>
      <span className="crop crop--tl" aria-hidden="true" />
      <span className="crop crop--tr" aria-hidden="true" />
      <span className="crop crop--bl" aria-hidden="true" />
      <span className="crop crop--br" aria-hidden="true" />
      <span className="media-empty-inner" aria-hidden="true">
        {label && <span className="media-label hand">{label}</span>}
        <span className="media-meta">{aspect} · image coming soon</span>
      </span>
    </div>
  );
}
