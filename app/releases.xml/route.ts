import { releases } from "@/app/_data/releases";
import { SITE } from "@/lib/constants";

// Atom feed of firmware releases, generated at build time from the same data
// as /docs/reference/releases.
export const dynamic = "force-static";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const page = `${SITE.url}/docs/reference/releases`;
  const entries = releases
    .map((r) => {
      const updated = `${r.date}T00:00:00Z`;
      const html =
        `<p>${esc(r.summary)}</p><ul>` +
        r.highlights.map((h) => `<li>${esc(h)}</li>`).join("") +
        `</ul>`;
      return `  <entry>
    <id>${SITE.url}/releases/v${r.version}</id>
    <title>PayDeck v${r.version}</title>
    <updated>${updated}</updated>
    <link rel="alternate" href="${page}#v${esc(r.version.replace(/\./g, "-"))}"/>
    <summary>${esc(r.summary)}</summary>
    <content type="html">${esc(html)}</content>
  </entry>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <id>${SITE.url}/releases.xml</id>
  <title>PayDeck firmware releases</title>
  <subtitle>New PayDeck firmware versions and what changed in them.</subtitle>
  <updated>${releases[0].date}T00:00:00Z</updated>
  <link rel="self" href="${SITE.url}/releases.xml"/>
  <link rel="alternate" href="${page}"/>
  <author><name>PayDeck</name></author>
${entries}
</feed>
`;
  return new Response(xml, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
}
