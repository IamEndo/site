'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNextDoc, getPrevDoc, getDocTitle } from '../_data/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DocsArticleProps {
  children: React.ReactNode;
}

export function DocsArticle({ children }: DocsArticleProps) {
  const pathname = usePathname();
  const prevDoc = getPrevDoc(pathname);
  const nextDoc = getNextDoc(pathname);
  
  return (
    <article className="min-w-0 flex-1">
      {/* Breadcrumb - only show on subpages */}
      {pathname !== '/docs' && (
        <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500 mb-6">
          <Link href="/docs" className="hover:text-zinc-900 dark:hover:text-zinc-200">
            Docs
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-zinc-900 dark:text-zinc-200">
            {getDocTitle(pathname)}
          </span>
        </nav>
      )}

      {/* Content */}
      <div className="prose prose-zinc dark:prose-invert max-w-none">
        {children}
      </div>

      {/* Pagination */}
      <nav className="mt-12 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
        {prevDoc ? (
          <Link
            href={prevDoc.href}
            className="flex items-center gap-2 px-4 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>
              <span className="text-zinc-500 dark:text-zinc-500 block text-xs">Previous</span>
              <span className="text-zinc-900 dark:text-white font-medium">{prevDoc.title}</span>
            </span>
          </Link>
        ) : (
          <div />
        )}
        
        {nextDoc ? (
          <Link
            href={nextDoc.href}
            className="flex items-center gap-2 px-4 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors text-sm text-right"
          >
            <span>
              <span className="text-zinc-500 dark:text-zinc-500 block text-xs">Next</span>
              <span className="text-zinc-900 dark:text-white font-medium">{nextDoc.title}</span>
            </span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </article>
  );
}
