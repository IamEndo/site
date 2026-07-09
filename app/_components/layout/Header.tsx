"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { Button } from "../ui/Button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { Menu, X, ArrowUpRight, Origami } from "lucide-react";

function NavAnchor({
  href,
  label,
  className,
  onClick,
}: {
  href: string;
  label: string;
  className: string;
  onClick?: () => void;
}) {
  // Internal routes get client-side navigation; hash links stay plain anchors
  if (href.startsWith("/")) {
    return (
      <Link href={href} onClick={onClick} className={className}>
        {label}
      </Link>
    );
  }
  return (
    <a href={href} onClick={onClick} className={className}>
      {label}
    </a>
  );
}

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
        scrolled || mobileOpen
          ? "bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md border-neutral-200 dark:border-neutral-800"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Left */}
          <a href="#" className="flex items-center gap-3 group">
            <Origami className="w-6 h-6 text-neutral-900 dark:text-white" aria-hidden="true" />
            <span className="font-semibold text-neutral-900 dark:text-white tracking-tight">
              {SITE.name}
            </span>
          </a>

          {/* Desktop Nav - Center */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                label={link.label}
                className={cn(
                  "px-4 py-2 text-sm",
                  "text-neutral-600 hover:text-neutral-900",
                  "dark:text-neutral-400 dark:hover:text-white",
                  "transition-colors"
                )}
              />
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
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-neutral-600 dark:text-neutral-400"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800"
        >
          <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Primary mobile">
            {NAV_LINKS.map((link) => (
              <NavAnchor
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-neutral-900 dark:text-white"
              />
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

export default Header;
