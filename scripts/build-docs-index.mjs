// Builds app/docs/_data/search-index.json and toc.json from the docs page sources.
// Runs before every build (npm "prebuild") and on demand: npm run docs:index
// No dependencies: the pages are plain TSX, so titles, descriptions, h2
// headings and visible text are pulled out with regular expressions.
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "app", "docs");

// Keep in sync with lib/slug.ts
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function pages(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (!name.startsWith("_")) out.push(...pages(p));
    } else if (name === "page.tsx") out.push(p);
  }
  return out;
}

const ENTITIES = {
  "&apos;": "'", "&quot;": '"', "&amp;": "&", "&lt;": "<", "&gt;": ">",
  "&mdash;": "—", "&ndash;": "–", "&nbsp;": " ", "&middot;": "·",
  "&ldquo;": "“", "&rdquo;": "”", "&lsquo;": "‘", "&rsquo;": "’",
  "&rarr;": "→", "&times;": "×", "&#8209;": "-",
};
function clean(s) {
  return s
    .replace(/\{\s*(["'`])([^"'`{}]*)\1\s*\}/g, "$2") // {" "} and {'text'}
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;|&#\d+;/g, (e) => ENTITIES[e] ?? " ")
    .replace(/\\(['"])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function stringProp(src, key) {
  const m = src.match(new RegExp(`\\b${key}:\\s*(['"\`])((?:\\\\.|(?!\\1).)*)\\1`, "s"));
  return m ? clean(m[2]) : "";
}

const nav = readFileSync(join(docsDir, "_data", "navigation.ts"), "utf8");
function sectionOf(href) {
  let section = "";
  for (const line of nav.split("\n")) {
    const s = line.match(/^\s{4}title: '([^']+)'/);
    if (s) section = s[1];
    if (line.includes(`href: '${href}'`)) return section;
  }
  return "";
}

const index = [];
const toc = {};
for (const file of pages(docsDir).sort()) {
  const src = readFileSync(file, "utf8");
  const rel = relative(join(root, "app"), dirname(file)).split(sep).join("/");
  const href = "/" + rel;

  const metaBlock = src.match(/export const metadata[\s\S]*?\n\}\)?;/)?.[0] ?? "";
  const title = stringProp(metaBlock, "title");
  const description = stringProp(metaBlock, "description");

  // Static h2 headings (those with JSX expressions inside are skipped).
  const headings = [];
  const seen = new Map();
  for (const m of src.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)) {
    if (/\{[^}]*[a-zA-Z_.]+[^"'`}]*\}/.test(m[1].replace(/\{\s*(["'`])[^"'`{}]*\1\s*\}/g, ""))) continue;
    const text = clean(m[1]);
    if (!text) continue;
    const id = slugify(text);
    seen.set(id, (seen.get(id) ?? 0) + 1);
    headings.push({ text, id });
  }
  const uniqueHeadings = headings.map((h) => (seen.get(h.id) === 1 ? h : { text: h.text }));

  // "On this page" list for the first paint (the page refines it from the
  // real DOM after hydration). Same id scheme as DocsArticle: -2, -3 on repeats.
  const used = new Set();
  toc[href] = headings.map((h) => {
    let id = h.id, n = 2;
    while (used.has(id)) id = `${h.id}-${n++}`;
    used.add(id);
    return { id, text: h.text };
  });

  // Visible text: JSX text nodes plus the string props the page helpers render.
  // Content a page pulls in from app/_data (e.g. the release list) counts too.
  let body = src.slice(src.indexOf(metaBlock) + metaBlock.length);
  for (const m of src.matchAll(/from ["']@\/app\/_data\/([\w-]+)["']/g)) {
    body += "\n" + readFileSync(join(root, "app", "_data", `${m[1]}.ts`), "utf8");
  }
  const parts = [];
  for (const m of body.matchAll(/>([^<>{}]*[A-Za-z]{3}[^<>{}]*)</g)) {
    const t = clean(m[1]);
    if (t && !/[;=]|=>|\bconst\b|\breturn\b/.test(t)) parts.push(t);
  }
  for (const m of body.matchAll(/\b(?:title|description|text|label|value|name|question|answer|problem|solution|term|definition|note)=(["'])((?:\\.|(?!\1).)*)\1/g)) {
    const t = clean(m[2]);
    if (t) parts.push(t);
  }
  for (const m of body.matchAll(/\b(?:title|description|text|label|value|name|question|answer|problem|solution|term|definition|note):\s*(["'`])((?:\\.|(?!\1).)*)\1/g)) {
    const t = clean(m[2]);
    if (t && !t.includes("${")) parts.push(t);
  }
  // Longer string literals (items in arrays passed to helpers), minus class lists.
  for (const m of body.matchAll(/(?<!className=)(["'])((?:\\.|(?!\1).){25,})\1/g)) {
    const t = clean(m[2]);
    if (/\b(?:dark:|[a-z]+-\d|flex|grid|rounded|border-|text-|bg-)/.test(t)) continue;
    if (t.split(" ").length >= 4 && !t.includes("${")) parts.push(t);
  }
  const text = [...new Set(parts)].join(" ").toLowerCase();

  if (!title) throw new Error(`No metadata title found in ${file}`);
  index.push({ href, title, section: sectionOf(href), description, headings: uniqueHeadings, text });
}

writeFileSync(join(docsDir, "_data", "toc.json"), JSON.stringify(toc) + "\n");
const out = join(docsDir, "_data", "search-index.json");
writeFileSync(out, JSON.stringify(index) + "\n");
console.log(`docs search index: ${index.length} pages, ${(JSON.stringify(index).length / 1024).toFixed(0)} KB -> ${relative(root, out)}`);
