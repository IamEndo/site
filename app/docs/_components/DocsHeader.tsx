"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SITE } from "@/lib/constants";
import { Button } from "../../_components/ui/Button";
import { ThemeToggle } from "../../_components/ui/ThemeToggle";
import { ArrowUpRight, Origami } from "lucide-react";
import { DocsSearch } from "./DocsSearch";

export function DocsHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b",
        scrolled
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-neutral-200 dark:border-neutral-800"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-[1536px] mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left - back to the main site, with a Docs shortcut */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group">
              <Origami className="w-6 h-6 text-neutral-900 dark:text-white" aria-hidden="true" />
              <span className="font-semibold text-neutral-900 dark:text-white tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <span className="text-neutral-300 dark:text-neutral-700 select-none" aria-hidden="true">
              /
            </span>
            <Link
              href="/docs"
              className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              Docs
            </Link>
          </div>

          {/* Right side - Theme toggle + View source */}
          <div className="flex items-center gap-2 sm:gap-4">
            <DocsSearch />
            <ThemeToggle />
            <div className="hidden sm:block">
              <Button asChild size="sm">
              <a
                href={SITE.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                View source
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
