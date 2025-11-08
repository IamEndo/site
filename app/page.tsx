"use client";

import React from "react";
import Script from "next/script";
import { motion } from "framer-motion";
import {
  Store,
  CheckCircle,
  CheckSquare,
  Menu,
  X,
  Mail,
  ShieldCheck,
  Lock,
  Activity,
  Coins,
  BadgeCheck,
  Cpu,
} from "lucide-react";
import { MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ThemeToggle } from "../components/ui/theme-toggle";
import { HeroBackdrop } from "../components/ui/hero-backdrop";
import { surface } from "../components/ui/surface";

// ------------------------------
// Helpers
// ------------------------------

function useToggle(initial = false) {
  const [open, setOpen] = React.useState(initial);
  const toggle = React.useCallback(() => setOpen((v) => !v), []);
  const close = React.useCallback(() => setOpen(false), []);
  return { open, toggle, close };
}

// Lightweight email obfuscation to avoid scrapers
function ObfuscatedEmail() {
  const [e, setE] = React.useState("");
  React.useEffect(() => {
    const u = "info";
    const d = "paydeck.org";
    setE(`${u}@${d}`);
  }, []);
  if (!e) return <span className="select-none">loading…</span>;
  return (
    <a
      href={`mailto:${e}?subject=PayDeck inquiry&body=Hi PayDeck team,%0D%0A%0D%0AUse case: ...%0D%0ACountry: ...%0D%0ATimeline: ...`}
      className="underline underline-offset-4 hover:opacity-80"
    >
      {e}
    </a>
  );
}

// ------------------------------
// Content
// ------------------------------

const features = [
  {
    icon: <Lock className="w-6 h-6" aria-hidden />,
    title: "Your funds stay in your control",
    desc: "The device is fully non-custodial and only displays payment requests and incoming transactions.",
  },
  {
    icon: <Activity className="w-6 h-6" aria-hidden />,
    title: "Instant payment visibility",
    desc: "See payments appear instantly so you can keep the line moving.",
  },
  {
    icon: <Coins className="w-6 h-6" aria-hidden />,
    title: "Affordable to deploy",
    desc: "Get started with hardware from around $10. Perfect for kiosks, cafés, and events.",
  },
  {
    icon: <BadgeCheck className="w-6 h-6" aria-hidden />,
    title: "No hidden fees or contracts",
    desc: "Set up or import your wallet and use it freely without restrictions. Device use is completely free.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" aria-hidden />,
    title: "Built for peace of mind",
    desc: "Open-source and verifiable software. You remain the only one in control of your assets.",
  },
  {
    icon: <Cpu className="w-6 h-6" aria-hidden />,
    title: "Powerful infrastructure",
    desc: "Runs on Nexa, a network capable of handling throughput comparable to VISA, Mastercard, and SWIFT.",
  },
];

const plans = [
  {
    name: "ESP32 Display Board 3.5″",
    price: "",
    perks: [
      "ESP32 with 3.5″ TFT touchscreen",
      "LVGL display, 240×320 resolution",
      "Bluetooth & Wi-Fi connectivity",
    ],
    cta: "Coming soon",
    highlight: false,
  },
  {
    name: "ESP32 Display Board 2.8″",
    price: "",
    perks: [
      "ESP32-2432S028 with 2.8″ TFT touchscreen",
      "ST7789, LVGL display, 320×240",
      "USB Type-C & Wi-Fi connectivity",
    ],
    cta: "Get the board",
    ctaUrl:
      "https://www.aliexpress.com/w/wholesale-ESP32-Arduino-LVGL-WIFI%26Bluetooth-2.8-TFT-Display.html",
    highlight: true,
  },
  {
    name: "ESP32 Display Board 4.0″",
    price: "",
    perks: [
      "ESP32 with 4.0″ TFT touchscreen",
      "LVGL display, 320×480 resolution",
      "Bluetooth & Wi-Fi connectivity",
    ],
    cta: "Coming soon",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Which assets can I accept?",
    a: "Nexa coin today, with more native assets planned for the future.",
  },
  {
    q: "Does PayDeck hold my money?",
    a: "No. It’s watch-only — you control your funds at all times.",
  },
  {
    q: "How fast do payments show up?",
    a: "Typically instantly, so you can serve the next customer without waiting.",
  },
  {
    q: "What are the fees?",
    a: "Only the Nexa network fee, usually around a cent. PayDeck doesn’t add per-transaction fees.",
  },
  {
    q: "Do I need constant internet?",
    a: "You’ll need a connection to see payments as they arrive. If your connection drops, you can continue accepting payments manually.",
  },
  {
    q: "Is this compliant for my store?",
    a: "As watch-only display hardware, it’s generally outside card-network certifications. If you sell devices, follow local electronics requirements.",
  },
];

// ------------------------------
// Page
// ------------------------------

export default function Website() {
  const nav = useToggle(false);

  // ---------- JSON-LD payloads ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PayDeck",
    url: "https://paydeck.org",
    logo: "https://paydeck.org/apple-touch-icon.png",
    sameAs: [
      "https://t.me/paydeckproject",
      "https://gitlab.com/IamEndo/paydeck",
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  const hardwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: plans.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.perks.join("; "),
        brand: "ESP32",
        url: "https://paydeck.org/#pricing",
      },
    })),
  };

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-black dark:to-black dark:text-gray-100">
      {/* Structured Data (render once near top) */}
      <Script
        id="org-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />

      {/* Fixed hero image */}
      <HeroBackdrop src="/images/hero-paydeck.png" dimOpacity={60} />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-slate-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold">
              <CheckSquare className="w-5 h-5" aria-hidden />
              <span>PayDeck</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-3 sm:gap-6" aria-label="Primary">
              <a href="#features" className="hover:opacity-80">
                Features
              </a>
              <a href="#how" className="hover:opacity-80">
                How it works
              </a>
              <a href="#pricing" className="hover:opacity-80">
                Hardware
              </a>
              <a href="#faq" className="hover:opacity-80">
                FAQ
              </a>
              <a href="#contact" className="hover:opacity-80">
                Contact
              </a>

              <ThemeToggle />

              <Button
                asChild
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <a
                  href="https://gitlab.com/IamEndo/paydeck"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get started
                </a>
              </Button>
            </nav>

            {/* Mobile nav toggle */}
            <button
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-900"
              aria-label="Toggle menu"
              onClick={nav.toggle}
            >
              {nav.open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {nav.open && (
          <div className="md:hidden border-t border-slate-200 dark:border-neutral-800">
            <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
              {[
                { href: "#features", label: "Features" },
                { href: "#how", label: "How it works" },
                { href: "#pricing", label: "Hardware" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((i) => (
                <a
                  key={i.href}
                  href={i.href}
                  onClick={nav.close}
                  className="py-2"
                >
                  {i.label}
                </a>
              ))}

              <ThemeToggle />

              <Button
                asChild
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <a
                  href="https://gitlab.com/IamEndo/paydeck"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={nav.close}
                >
                  Get started
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-transparent scroll-mt-16">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-white min-h-[calc(100svh-64px)] flex items-center pt-8 pb-10 md:pt-12 md:pb-14">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-white/30 w-fit">
                <Store className="w-4 h-4" aria-hidden />
                Point-of-sale • Worldwide • Permissionless
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Instant Nexa payments at checkout
              </h1>
              <p className="text-lg text-white/80">
                No contracts. No added fees. No data harvesting. PayDeck is
                open-source, non-custodial, and built for real-world retail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="h-12 px-6 text-base bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  <a href="#pricing">See hardware options</a>
                </Button>
                <Button
                  asChild
                  className="h-12 px-6 text-base bg-neutral-800 text-white hover:bg-neutral-700"
                >
                  <a href="#how">How it works</a>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Open-source
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Watch-only
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Non-custodial
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl border border-white/20 bg-black/50 backdrop-blur-sm p-4 grid place-items-center">
                <div className="text-center">
                  <CheckSquare className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-semibold">Open-source receiver</p>
                  <p className="text-white/70">
                    ESP32 “Cheap Yellow Display” • 2.8″ 240×320 TFT
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className={`py-20 ${surface.secondary}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why merchants choose PayDeck
            </h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Simple, secure, and built for the checkout counter — fully verifiable
              on the Nexa blockchain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-neutral-800 grid place-items-center">
                    {f.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-gray-300">
                  {f.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className={`py-20 ${surface.primary}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Four quick steps to start accepting Nexa payments.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                t: "1. Get the device",
                d: "Choose the widely available ESP32 'Cheap Yellow Display' device.",
              },
              {
                t: "2. Install the software",
                d: "Download the project from GitLab and follow the quick guide.",
              },
              {
                t: "3. Set up your device",
                d: "Create a wallet, connect to the internet, and set your security PIN.",
              },
              {
                t: "4. Request a payment",
                d: "Show a QR code and let customers pay in Nexa.",
              },
            ].map((s) => (
              <Card key={s.t} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">{s.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-gray-300">
                  {s.d}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specs / comparison */}
      <section id="specs" className={`py-20 ${surface.secondary}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Nexa checkout</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-gray-300 grid gap-2">
                <div>• No contracts. No hidden fees.</div>
                <div>• Fully verifiable and open-source.</div>
                <div>• Non-custodial — you control your funds.</div>
                <div>• The device is truly yours.</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Traditional finance</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-gray-300 grid gap-2">
                <div>• Average processing fees: ~1.5% to 3%.</div>
                <div>• Owned and controlled by third-party companies.</div>
                <div>• Custodial — service providers hold your funds.</div>
                <div>• In most cases, you’re only renting the device.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing / hardware */}
      <section id="pricing" className={`py-20 ${surface.primary}`}>
        {/* Hardware JSON-LD */}
        <Script
          id="hardware-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hardwareJsonLd) }}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Hardware options</h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Choose your ESP32 device and pick the size that best fits your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`rounded-2xl ${
                  p.highlight ? "ring-2 ring-slate-900 dark:ring-gray-100" : ""
                }`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl flex items-baseline justify-between">
                    <span>{p.name}</span>
                    <span className="text-xl font-semibold">{p.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> {perk}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  >
                    <a
                      href={p.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.cta} — ${p.name}`}
                    >
                      {p.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-20 ${surface.secondary}`}>
        {/* FAQ JSON-LD */}
        <Script
          id="faq-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently asked questions
            </h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Quick answers for busy merchants.
            </p>
          </div>
          <div className="grid gap-6">
            {faqs.map((item) => (
              <Card key={item.q} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-gray-300">
                  {item.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`py-20 ${surface.primary}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Get in touch</h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Connect with us however is most convenient for you.
            </p>
          </div>
          <Card className="rounded-2xl">
            <CardContent className="p-8 grid gap-5">
              {/* Telegram contact */}
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-gray-200 font-medium">
                  Contact via Telegram
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Prefer chat? Reach out in our public channel and we’ll
                  respond as soon as we can.
                </p>
                <Button
                  asChild
                  className="w-full sm:w-auto inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <a
                    href="https://t.me/paydeckproject"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Telegram channel"
                  >
                    <MessageCircle className="w-4 h-4" /> Open Telegram
                  </a>
                </Button>
              </div>

              {/* Email contact */}
              <div className="space-y-2">
                <p className="text-slate-700 dark:text-gray-200 font-medium">
                  Prefer email?
                </p>
                <p className="text-slate-600 dark:text-gray-300 text-sm">
                  Reach us at <ObfuscatedEmail /> — we usually reply within a
                  business day.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="w-full sm:w-auto inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  <a href="mailto:info@paydeck.org?subject=PayDeck inquiry&body=Hi PayDeck team,%0D%0A%0D%0AUse case: ...%0D%0ACountry: ...%0D%0ATimeline: ...">
                    <Mail className="w-4 h-4" /> Email us
                  </a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="w-full sm:w-auto border-slate-300 dark:border-neutral-700"
                >
                  <a
                    href="https://gitlab.com/IamEndo/paydeck/-/issues/new?issue%5Btitle%5D=Inquiry%3A%20PayDeck%20for%20%3Cyour%20use%20case%3E&issue%5Bdescription%5D=**Use%20case**%3A%0A**Country**%3A%0A**Timeline**%3A"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open a GitLab issue to contact us"
                  >
                    <CheckSquare className="w-4 h-4" /> Open GitLab issue
                  </a>
                </Button>
              </div>
              <p className="text-xs text-slate-500 dark:text-gray-400">
                For software-related reports, please create a GitLab issue.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-10 ${surface.secondary} border-t border-slate-200 dark:border-neutral-800`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300">
            <span>© {new Date().getFullYear()} PayDeck. Open-source software.</span>
          </div>
          <nav
            className="text-sm text-slate-600 dark:text-gray-300 flex gap-4"
            aria-label="Footer"
          >
            <a href="#features" className="hover:opacity-80">
              Features
            </a>
            <a href="#how" className="hover:opacity-80">
              How it works
            </a>
            <a href="#pricing" className="hover:opacity-80">
              Hardware
            </a>
            <a href="#faq" className="hover:opacity-80">
              FAQ
            </a>
            <a href="#contact" className="hover:opacity-80">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 max-w-4xl mx-auto text-center text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
          <p>
            PayDeck is open-source, non-custodial software provided “as is”
            without warranty of any kind. We do not sell or endorse any
            hardware; links are for convenience only. PayDeck never holds keys,
            funds, or user data and cannot send or authorize transactions. Users
            are responsible for their own wallet setup, compliance, and security.
          </p>
        </div>
      </footer>
    </div>
  );
}
