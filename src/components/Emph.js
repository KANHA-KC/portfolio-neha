// Renders CMS text where *words in asterisks* become <em> accents.
export default function Emph({ text = "" }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.length > 2 && part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part
  );
}
