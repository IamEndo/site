"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "../ui/Button";
import { Menu, X, ArrowUpRight, Origami } from "lucide-react";

export function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
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
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <a href="#" className="flex items-center gap-3 group">
            <Origami className="w-6 h-6 text-neutral-900 dark:text-white" />
            <span className="font-semibold text-neutral-900 dark:text-white tracking-tight">
              {SITE.name}
            </span>
          </a>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm",
                  "text-neutral-600 hover:text-neutral-900",
                  "dark:text-neutral-400 dark:hover:text-white",
                  "transition-colors"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA - Right */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Button asChild size="sm">
              <a
                href={SITE.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-1.5"
              >
                View source
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-neutral-900 dark:text-white"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 mt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <ThemeToggle />
              <Button asChild size="sm">
                <a
                  href={SITE.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className={cn(
        "w-9 h-9 rounded-sm flex items-center justify-center",
        "text-neutral-600 hover:text-neutral-900",
        "dark:text-neutral-400 dark:hover:text-white",
        "hover:bg-neutral-100 dark:hover:bg-neutral-800",
        "transition-colors"
      )}
      aria-label="Toggle theme"
    >
      {dark ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
