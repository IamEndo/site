// Release history shown on /docs/reference/releases. Highlights are condensed
// from CHANGELOG.md in the firmware repository, which stays the full record.
export const releases = [
  {
    version: "0.5.1",
    date: "2026-11-11",
    summary: "Payment-detection hardening and fixes found on real devices.",
    highlights: [
      "Server replies are parsed strictly: a malformed message from a Rostrum server is refused instead of being interpreted.",
      "An output that disappears from a server reply and comes back can no longer be counted as a new payment.",
      "Optional duress password: entering it on the unlock screen factory-wipes the device instead of unlocking it.",
      "Enabling privacy mode now starts on a fresh address.",
      "Fixed the dark, unresponsive screen that could follow a sale, and Wi-Fi staying connected in offline mode.",
    ],
  },
  {
    version: "0.5.0",
    date: "2026-10-21",
    summary: "First-run setup wizard, access password, and a second supported display.",
    highlights: [
      "A fresh device starts in a setup wizard: wallet mode, access password, wallet.",
      "The six-digit PIN is replaced by an access password of 8 to 128 characters.",
      "12- or 24-word seed phrases with an optional BIP39 passphrase; new seeds are generated from touch-sensor noise.",
      "ILI9341 display variant of the ESP32-2432S028R is supported alongside ST7789.",
      "Token transfers are no longer counted as payments, and receipts match the block explorer.",
      "No migration from earlier versions: erase the flash before installing.",
    ],
  },
  {
    version: "0.4.1",
    date: "2026-07-12",
    summary: "Security release (changes shipped to users with 0.5.0).",
    highlights: [
      "The master key is encrypted with a key derived from the access secret instead of being stored in plaintext.",
      "15 wrong unlock attempts factory-wipe the device, with a warning from the 10th.",
      "Real flash-encryption and Secure Boot build environments for people who build from source.",
    ],
  },
  {
    version: "0.4.0",
    date: "2026-03-05",
    summary: "Interface overhaul and security hardening.",
    highlights: [
      "New on-screen keyboard, menus, toast notifications and visual design.",
      "Backlight control and transaction detail views.",
      "Five rounds of security auditing applied to the vault and build settings.",
    ],
  },
  {
    version: "0.3.0",
    date: "2026-02-04",
    summary: "Internal restructuring for maintainability, no functional changes.",
    highlights: [
      "Payment handling and screens moved into dedicated modules.",
    ],
  },
  {
    version: "0.2.0",
    date: "2026-01-29",
    summary: "Encrypted server connections.",
    highlights: [
      "Rostrum connections use secure WebSocket (TLS) by default, with certificate verification.",
      "Memory and connection stability improvements.",
    ],
  },
  {
    version: "0.1.0-beta",
    date: "2025-11-01",
    summary: "First public beta.",
    highlights: [
      "Watch-only payment receiver for Nexa on the ESP32 with a touch interface, QR invoices and live payment monitoring.",
    ],
  },
] as const;
