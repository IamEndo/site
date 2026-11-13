"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, CornerDownLeft } from "lucide-react";

interface IndexEntry {
  href: string;
  title: string;
  section: string;
  description: string;
  headings: { text: string; id?: string }[];
  text: string;
}

interface Result {
  href: string;
  title: string;
  section: string;
  detail: string;
  score: number;
}

const MAX_RESULTS = 8;

function search(index: IndexEntry[], query: string): Result[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const results: Result[] = [];
  for (const page of index) {
    const title = page.title.toLowerCase();
    const description = page.description.toLowerCase();
    const section = page.section.toLowerCase();

    // Every term must appear somewhere on the page.
    let score = 0;
    let matched = true;
    for (const t of terms) {
      let s = 0;
      if (title.includes(t)) s += title.startsWith(t) ? 14 : 10;
      if (section.includes(t)) s += 2;
      if (page.headings.some((h) => h.text.toLowerCase().includes(t))) s += 5;
      if (description.includes(t)) s += 3;
      if (page.text.includes(t)) s += 1;
      if (s === 0) {
        matched = false;
        break;
      }
      score += s;
    }
    if (!matched) continue;

    // Prefer landing on the heading that matches, when it has a linkable id.
    const heading = page.headings.find((h) =>
      terms.every((t) => h.text.toLowerCase().includes(t))
    );
    results.push({
      href: heading?.id ? `${page.href}#${heading.id}` : page.href,
      title: page.title,
      section: page.section,
      detail: heading ? heading.text : page.description,
      score,
    });
  }
  return results.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
}

export function DocsSearch() {
  const router = useRouter();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [index, setIndex] = React.useState<IndexEntry[] | null>(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(0);
  const [shortcut, setShortcut] = React.useState("Ctrl K");

  const results = React.useMemo(
    () => (index ? search(index, query) : []),
    [index, query]
  );

  const open = React.useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    inputRef.current?.focus();
    // The index is a separate chunk, fetched the first time search is opened.
    if (!index) {
      import("../_data/search-index.json")
        .then((m) => setIndex(m.default as IndexEntry[]))
        .catch(() => setLoadFailed(true));
    }
  }, [index]);

  const close = React.useCallback(() => {
    dialogRef.current?.close();
  }, []);

  React.useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘ K");
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        open();
        return;
      }
      const el = e.target as HTMLElement | null;
      const typing =
        !!el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  React.useEffect(() => setSelected(0), [query]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selected]) {
      e.preventDefault();
      go(results[selected].href);
    }
  };

  const activeId = results[selected] ? `docs-search-option-${selected}` : undefined;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-label="Search the documentation"
        aria-keyshortcuts="Control+K Meta+K /"
        className="inline-flex items-center gap-2 h-9 px-2.5 sm:px-3 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-950/60 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
      >
        <Search className="w-4 h-4" aria-hidden="true" />
        <span className="hidden sm:inline">Search docs</span>
        <kbd className="hidden md:inline font-mono text-[11px] px-1.5 py-0.5 rounded-sm border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400">
          {shortcut}
        </kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the documentation"
        onClose={() => setQuery("")}
        onClick={(e) => {
          // A click on the backdrop lands on the <dialog> element itself.
          if (e.target === dialogRef.current) close();
        }}
        className="docs-search m-0 mx-auto mt-[12vh] w-[calc(100%-2rem)] max-w-xl p-0 rounded-sm border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 shadow-2xl"
      >
        <div className="flex items-center gap-3 px-4 border-b border-neutral-200 dark:border-neutral-800">
          <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            inputMode="search"
            enterKeyHint="go"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="docs-search-results"
            aria-activedescendant={activeId}
            aria-autocomplete="list"
            aria-label="Search the documentation"
            autoComplete="off"
            spellCheck={false}
            placeholder="Search the docs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKey}
            className="flex-1 min-w-0 h-12 bg-transparent text-base outline-none focus-visible:outline-none placeholder:text-neutral-400"
          />
          <button
            type="button"
            onClick={close}
            className="font-mono text-[11px] px-1.5 py-0.5 rounded-sm border border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            Esc
          </button>
        </div>

        <ul
          id="docs-search-results"
          role="listbox"
          aria-label="Search results"
          className="max-h-[50vh] overflow-y-auto"
        >
          {results.map((r, i) => (
            <li
              key={r.href}
              id={`docs-search-option-${i}`}
              role="option"
              aria-selected={i === selected}
              onMouseEnter={() => setSelected(i)}
              onClick={() => go(r.href)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-neutral-100 dark:border-neutral-900 last:border-b-0 ${
                i === selected ? "bg-neutral-100 dark:bg-neutral-900" : ""
              }`}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium truncate">{r.title}</span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0">{r.section}</span>
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                  {r.detail}
                </div>
              </div>
              {i === selected && (
                <CornerDownLeft className="w-4 h-4 text-neutral-400 flex-shrink-0" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>

        <p className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400" role="status">
          {loadFailed
            ? "The search index could not be loaded. Reload the page and try again."
            : !index
            ? "Loading the search index…"
            : query.trim() === ""
            ? "Type to search all documentation pages."
            : results.length === 0
            ? `No pages match “${query.trim()}”.`
            : `${results.length} ${results.length === 1 ? "result" : "results"}. Use ↑ ↓ and Enter.`}
        </p>
      </dialog>
    </>
  );
}
