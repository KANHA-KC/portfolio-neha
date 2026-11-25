import { Fragment } from "react";

// Renders CMS text where *words in asterisks* become <em> accents and \n becomes <br />.
export default function Emph({ text = "" }) {
  const lines = text.split("\n");
  return lines.map((line, lineIndex) => (
    <Fragment key={lineIndex}>
      {lineIndex > 0 && <br />}
      {line.split(/(\*[^*]+\*)/).map((part, i) =>
        part.length > 2 && part.startsWith("*") && part.endsWith("*") ? (
          <em key={i}>{part.slice(1, -1)}</em>
        ) : (
          part
        )
      )}
    </Fragment>
  ));
}
