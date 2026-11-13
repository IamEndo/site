import { Metadata } from "next";
import Link from "next/link";
import { History, ArrowUpRight, Download, Rss } from "lucide-react";
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from "../../_components/DocsArticle";
import { releases } from "@/app/_data/releases";
import { FIRMWARE_VERSION, SITE } from "@/lib/constants";

export const metadata: Metadata = docsMetadata("/docs/reference/releases", {
  title: "Release Notes",
  description:
    "What changed in each PayDeck firmware release, with links to the full changelog and the signed release files.",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ReleasesPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <History className="w-4 h-4" aria-hidden="true" />
            Reference
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Release Notes
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            The main changes in each firmware release. The current release is
            v{FIRMWARE_VERSION}.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <Link
            href="/docs/install/web-flasher"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Install v{FIRMWARE_VERSION}
          </Link>
          <a
            href={SITE.changelog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors"
          >
            Full changelog on GitLab
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="/releases.xml"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 text-sm font-medium transition-colors"
          >
            <Rss className="w-4 h-4" aria-hidden="true" />
            Release feed
          </a>
        </div>

        <div className="space-y-10">
          {releases.map((release) => (
            <section
              key={release.version}
              className="pb-10 border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                <h2
                  id={`v${release.version.replace(/\./g, "-")}`}
                  className="text-2xl font-bold text-neutral-900 dark:text-white"
                >
                  v{release.version}
                </h2>
                <time dateTime={release.date} className="text-sm text-neutral-500 dark:text-neutral-400">
                  {formatDate(release.date)}
                </time>
                {release.version === FIRMWARE_VERSION && (
                  <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-sm bg-accent-100 dark:bg-accent-dark-950/50 text-accent-700 dark:text-accent-dark-400">
                    Current
                  </span>
                )}
              </div>
              <p className="text-neutral-900 dark:text-white font-medium mb-3">
                {release.summary}
              </p>
              <ul className="space-y-2">
                {release.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-neutral-600 dark:text-neutral-400 leading-relaxed"
                  >
                    <span className="text-neutral-400 mt-0.5" aria-hidden="true">
                      •
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </DocsArticle>
  );
}
