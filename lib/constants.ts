// Site-wide constants: project links, navigation, current firmware release

export const SITE = {
  name: "PayDeck",
  tagline: "Cryptocurrency Point-of-Sale",
  url: "https://paydeck.org",
  telegram: "https://t.me/paydeckproject",
  gitlab: "https://gitlab.com/IamEndo/paydeck",
  changelog: "https://gitlab.com/IamEndo/paydeck/-/blob/main/CHANGELOG.md",
  securityPolicy: "https://gitlab.com/IamEndo/paydeck/-/blob/main/SECURITY.md",
  // Opens a new issue with the "confidential" box already ticked.
  confidentialIssue: "https://gitlab.com/IamEndo/paydeck/-/issues/new?issue[confidential]=true",
  // Maintainer's OpenPGP key (signs SHA256SUMS of every release).
  signingKeyUrl: "https://gitlab.com/IamEndo.gpg",
  signingKeyFingerprint: "43D5 0251 45B5 4C62 6F9A  D983 69EF FAB6 816B 432D",
  x: "https://x.com/PayDeckProject",
  email: "info@paydeck.org",
} as const;

export const NAV_LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#device", label: "Hardware" },
  { href: "/docs/install/web-flasher", label: "Install" },
  { href: "/#how", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/docs", label: "Docs" },
] as const;

// Firmware release served by the web flasher. Lives here (not in a "use client"
// file) so server components can use it in strings and links.
export const FIRMWARE_VERSION = "0.5.1";
