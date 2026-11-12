// Site-wide constants: project links, navigation, current firmware release

export const SITE = {
  name: "PayDeck",
  tagline: "Cryptocurrency Point-of-Sale",
  url: "https://paydeck.org",
  telegram: "https://t.me/paydeckproject",
  gitlab: "https://gitlab.com/IamEndo/paydeck",
  changelog: "https://gitlab.com/IamEndo/paydeck/-/blob/main/CHANGELOG.md",
  x: "https://x.com/PayDeckProject",
  email: "info@paydeck.org",
} as const;

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#device", label: "Hardware" },
  { href: "/docs/install/web-flasher", label: "Install" },
  { href: "#how", label: "How it works" },
  { href: "#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
] as const;

// Firmware release served by the web flasher. Lives here (not in a "use client"
// file) so server components can use it in strings and links.
export const FIRMWARE_VERSION = "0.5.1";
