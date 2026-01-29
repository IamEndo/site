import { cn } from "@/lib/cn";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { ArrowUpRight, Origami } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Main footer content */}
        <div className="py-12 md:py-16 grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Left - Brand & description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Origami className="w-6 h-6 text-neutral-900 dark:text-white" />
              <span className="font-semibold text-neutral-900 dark:text-white tracking-tight">
                {SITE.name}
              </span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Open-source, non-custodial point-of-sale for instant Nexa payments. 
              No contracts, no added fees.
            </p>
          </div>

          {/* Right - Links grid */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-500 mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SITE.gitlab}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    GitLab
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={SITE.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Telegram
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            © {currentYear} {SITE.name}. Open-source software provided as-is.
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-500 text-center md:text-right">
            PayDeck never holds keys, funds, or user data. Users are responsible for their own&nbsp;security.
          </p>
        </div>
      </div>
    </footer>
  );
}
