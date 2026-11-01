// Renders schema.org data for search engines. Content can come from the CMS, so "<" is escaped
// to stop any text from closing the <script> tag early.
export default function JsonLd({ data }) {
  const graph = Array.isArray(data) ? data : [data];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
