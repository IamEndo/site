// Design tokens for consistent styling across the site

export const SITE = {
  name: "PayDeck",
  tagline: "Cryptocurrency Point-of-Sale",
  url: "https://paydeck.org",
  telegram: "https://t.me/paydeckproject",
  gitlab: "https://gitlab.com/IamEndo/paydeck",
  x: "https://x.com/PayDeckProject",
  email: "info@paydeck.org",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#device", label: "Hardware" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
] as const;

// Consistent border radius - squared off, not rounded
export const radius = {
  none: "rounded-none",
  sm: "rounded-sm",
  base: "rounded",
  md: "rounded-md",
} as const;

// Section padding
export const section = {
  padding: "py-24 md:py-32",
  paddingSmall: "py-16 md:py-24",
} as const;

// Container widths
export const container = {
  default: "max-w-6xl mx-auto px-6 md:px-8",
  narrow: "max-w-4xl mx-auto px-6 md:px-8",
  wide: "max-w-7xl mx-auto px-6 md:px-8",
} as const;
