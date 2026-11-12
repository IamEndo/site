'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getNextDoc, getPrevDoc, getDocTitle, getDocSection } from '../_data/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { slugify } from '@/lib/slug';

interface DocsArticleProps {
  children: React.ReactNode;
}

interface TocItem {
  id: string;
  text: string;
}

/**
 * Gives every h2 inside the article a stable id (derived from its text), so
 * sections can be linked to, and returns the list for the "On this page" nav.
 * The ids are assigned on the client; a #fragment present at load time is
 * honoured here because the browser could not resolve it by itself.
 */
function useToc(articleRef: React.RefObject<HTMLElement | null>, pathname: string) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const root = articleRef.current;
    if (!root) return;

    const used = new Set<string>();
    const found: TocItem[] = [];
    root.querySelectorAll<HTMLHeadingElement>('[data-docs-content] h2').forEach((h) => {
      const text = (h.textContent ?? '').trim();
      if (!text) return;
      let id = h.id || slugify(text);
      if (!id) return;
      let n = 2;
      const base = id;
      while (used.has(id)) id = `${base}-${n++}`;
      used.add(id);
      h.id = id;
      found.push({ id, text });
    });
    setItems(found);
    setActiveId(null);

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) {
      const target = document.getElementById(hash);
      if (target) target.scrollIntoView();
    }

    if (found.length === 0 || typeof IntersectionObserver === 'undefined') return;

    // The active section is the last heading that has scrolled past the header.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        const first = found.find((f) => visible.has(f.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '-96px 0px -60% 0px' }
    );
    found.forEach((f) => {
      const el = document.getElementById(f.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [articleRef, pathname]);

  return { items, activeId };
}

function TocList({
  items,
  activeId,
  onNavigate,
}: {
  items: TocItem[];
  activeId: string | null;
  onNavigate?: () => void;
}) {
  return (
    <ul className="space-y-0.5">
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={active ? 'location' : undefined}
              className={`block py-1 pl-3 border-l text-sm leading-snug transition-colors ${
                active
                  ? 'border-accent-500 dark:border-accent-dark-500 text-accent-700 dark:text-accent-dark-400 font-medium'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
              }`}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function DocsArticle({ children }: DocsArticleProps) {
  const pathname = usePathname();
  const prevDoc = getPrevDoc(pathname);
  const nextDoc = getNextDoc(pathname);
  const title = getDocTitle(pathname);
  const section = getDocSection(pathname);
  const articleRef = useRef<HTMLElement>(null);
  const { items, activeId } = useToc(articleRef, pathname);
  const showToc = items.length >= 2;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: SITE.name, item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Docs', item: `${SITE.url}/docs` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE.url}${pathname}` },
    ],
  };

  return (
    <div className="2xl:grid 2xl:grid-cols-[minmax(0,56rem)_13rem] 2xl:gap-12">
      <article ref={articleRef} className="docs-article min-w-0">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-sm text-neutral-500 dark:text-neutral-500 mb-6"
        >
          <Link href="/docs" className="hover:text-neutral-900 dark:hover:text-neutral-200">
            Docs
          </Link>
          {section && (
            <>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <span>{section}</span>
            </>
          )}
          <ChevronRight className="w-3 h-3" aria-hidden="true" />
          <span className="text-neutral-900 dark:text-neutral-200" aria-current="page">
            {title}
          </span>
        </nav>

        {/* On this page - collapsed, for screens without room for the side column */}
        {showToc && (
          <details className="2xl:hidden max-w-4xl mb-8 rounded-sm border border-neutral-200 dark:border-neutral-800">
            <summary className="cursor-pointer select-none px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white">
              On this page
            </summary>
            <nav aria-label="On this page" className="px-4 pb-4">
              <TocList items={items} activeId={activeId} />
            </nav>
          </details>
        )}

        {/* Content */}
        <div data-docs-content="">{children}</div>

        {/* Pagination */}
        <nav
          aria-label="Previous and next page"
          className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4"
        >
          {prevDoc ? (
            <Link
              href={prevDoc.href}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              <span>
                <span className="text-neutral-500 dark:text-neutral-500 block text-xs">Previous</span>
                <span className="text-neutral-900 dark:text-white font-medium">{prevDoc.title}</span>
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextDoc ? (
            <Link
              href={nextDoc.href}
              className="flex items-center gap-2 px-4 py-2 rounded-sm border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors text-sm text-right"
            >
              <span>
                <span className="text-neutral-500 dark:text-neutral-500 block text-xs">Next</span>
                <span className="text-neutral-900 dark:text-white font-medium">{nextDoc.title}</span>
              </span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      {/* On this page - side column on very wide screens */}
      {showToc && (
        <aside className="hidden 2xl:block">
          <nav
            aria-label="On this page"
            className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500 mb-3">
              On this page
            </p>
            <TocList items={items} activeId={activeId} />
          </nav>
        </aside>
      )}
    </div>
  );
}
