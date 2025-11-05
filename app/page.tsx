"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Shield,
  Zap,
  CheckCircle,
  Menu,
  X,
  Mail,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { ThemeToggle } from "../components/ui/theme-toggle";

// Simple nav state for mobile menu
function useToggle(initial = false) {
  const [open, setOpen] = React.useState(initial);
  const toggle = React.useCallback(() => setOpen((v) => !v), []);
  const close = React.useCallback(() => setOpen(false), []);
  return { open, toggle, close };
}

// ———————————————————————————————————————————————————————————
// Content
// ———————————————————————————————————————————————————————————

const features = [
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Non-custodial & watch-only",
    desc: "No private keys on device. Displays payment requests and watches the chain only.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Instant recognition",
    desc: "Rostrum server integration spots incoming tx instantly.",
  },
  {
    icon: <Rocket className="w-6 h-6" aria-hidden />,
    title: "Ultra-low hardware cost",
    desc: "Hardware cost is only around ~15$.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" aria-hidden />,
    title: "Offline-tolerant flow",
    desc: "Queue payment requests and auto-sync when network returns.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Secure boot + flash enc.",
    desc: "ESP-IDF secure boot, flash encryption, JTAG fuse options for tamper resistance.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "~1W power draw",
    desc: "≈180–250 mA @5V. Field-friendly for kiosks and mobile carts.",
  },
];

const plans = [
  {
    name: "DIY Board",
    price: "USD 15",
    perks: [
      "ESP32 + 2.8″ TFT (ref. build)",
      "Open firmware (watch-only)",
      "QR/Nexa URI display",
    ],
    cta: "Build from guide",
    highlight: false,
  },
  {
    name: "Maker Kit",
    price: "USD 29",
    perks: [
      "Pre-flashed firmware",
      "Desk stand + cables",
      "CSV/JSON logging to microSD",
    ],
    cta: "Get the kit",
    highlight: true,
  },
  {
    name: "Pro Bundle",
    price: "USD 79",
    perks: ["Hardened case", "Secure boot enabled", "Priority support & docs"],
    cta: "Talk to us",
    highlight: false,
  },
];

const faqs = [
  {
    q: "What coins/tokens are supported?",
    a: "Nexa mainnet today (BIP-21 style URIs). Additional assets and stablecoin layers are on the roadmap.",
  },
  {
    q: "Does PayDeck ever hold funds?",
    a: "No. It’s watch-only. You import or generate a seed to derive an xpub, then private material is wiped. The device can’t spend.",
  },
  {
    q: "How fast are payments recognized?",
    a: "Typically ~1s when connected to a nearby Rostrum/Electrum server. Finality follows network confirmations.",
  },
  {
    q: "What are the fees?",
    a: "Only the on-chain miner fee (often ~cent-level). PayDeck itself doesn’t charge per-transaction fees.",
  },
  {
    q: "Is internet required?",
    a: "A connection is needed to watch the mempool/chain. The device tolerates intermittent connectivity and syncs when back online.",
  },
  {
    q: "What about compliance?",
    a: "As watch-only hardware it’s generally outside card-network certifications. If you sell devices, follow regional electronics safety (e.g., CE/FCC).",
  },
];

export default function Website() {
  const nav = useToggle(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold">
              <CheckCircle className="w-5 h-5" aria-hidden />
              <span>PayDeck</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-3 sm:gap-6">
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
              <Button asChild>
                <a href="#contact">Get started</a>
              </Button>
            </nav>

            {/* Mobile nav toggle */}
            <button
              className="md:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle menu"
              onClick={nav.toggle}
            >
              {nav.open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {nav.open && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800">
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
              <Button asChild>
                <a href="#contact" onClick={nav.close}>
                  Get started
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 w-fit">
                <Zap className="w-4 h-4" aria-hidden />
                Open, low-cost, watch-only POS
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Nexa Point-of-Sale Payments Receiver for Real-World Checkout
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                No contracts, no fees, no data collection, fully open-source and verifiable.
                Non-custodial by design.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="h-12 px-6 text-base">
                  <a href="#pricing">See hardware options</a>
                </Button>
                <Button variant="outline" asChild className="h-12 px-6 text-base">
                  <a href="#how">How it works</a>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Open-source
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Non-custodial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Instant
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
              <div className="aspect-video rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 p-4 grid place-items-center">
                <div className="text-center">
                  <Rocket className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-semibold">ESP32 “Cheap Yellow Display”</p>
                  <p className="text-slate-500 dark:text-slate-400">
                    2.8″ 240×320 TFT • Wi-Fi/BT • microSD
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why merchants choose PayDeck
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Non-custodial, open-source, secure, a global payments platform
              fully verifiable on the Nexa blockchain.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-800 grid place-items-center">
                    {f.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300">
                  {f.desc}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">How it works</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Four quick steps to accept Nexa payments on-site.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                t: "1. Cheap Yellow Board",
                d: "You will need widely available ESP32 cheap yellow display 2.8” – 2432s028r is the best fit.",
              },
              {
                t: "2. Install software",
                d: "Download and install software for Gitlab following the instructions.",
              },
              {
                t: "3. Set-up device",
                d: "Create a wallet, connect to the internet and request a payment.",
              },
              {
                t: "4. Request payment",
                d: "You can request Nexa payments anywhere in the world.",
              },
            ].map((s) => (
              <Card key={s.t} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">{s.t}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300">
                  {s.d}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Specs / comparison */}
      <section id="specs" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Reference hardware (ESP32-2432S028R)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-300 grid gap-2">
                <div>• Dual-core 240 MHz • 520 KB SRAM • 2.8″ 240×320 TFT</div>
                <div>• Resistive touchscreen • microSD • Wi-Fi b/g/n • BT LE</div>
                <div>• Secure boot & flash encryption support</div>
                <div>• Typical BOM: ~USD 10–15</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Costs vs. card terminals
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-slate-300 grid gap-2">
                <div>• Nexa network fee only ≈ $0.01 nominal</div>
                <div>• Card networks: 1.5–3.5% + $0.10–$0.30 fixed</div>
                <div>• Mobile-money: 0.5–2% (typical)</div>
                <div>• Power: ~1–1.25 W vs 5–10 W for many POS</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing / hardware */}
      <section id="pricing" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Hardware options</h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Pick a size that matches your needs.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <Card
                key={p.name}
                className={`rounded-2xl ${
                  p.highlight ? "ring-2 ring-slate-900 dark:ring-slate-100" : ""
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
                  <Button className="w-full">{p.cta}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Frequently asked questions
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Short, practical answers for merchants and makers.
            </p>
          </div>
          <div className="grid gap-6">
            {faqs.map((item) => (
              <Card key={item.q} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 dark:text-slate-300">
                  {item.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Get in touch
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mt-3">
              Drop a message and we’ll get back to you.
            </p>
          </div>
          <Card className="rounded-2xl">
            <CardContent className="p-6 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Email address" />
              </div>
              <Input placeholder="Organization (optional)" />
              <Textarea
                placeholder="Share your use-case, country, and timeline…"
                className="min-h-[120px]"
              />
              <Button className="w-full md:w-auto inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Send message
              </Button>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-4">
            Version: Beta v0.1 — October 2025
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <CheckCircle className="w-4 h-4" aria-hidden />
            <span>
              © {new Date().getFullYear()} PayDeck. Open source firmware.
            </span>
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-300 flex gap-4">
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
          </div>
        </div>
      </footer>
    </div>
  );
}
