"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Shield,
  Zap,
  CheckCircle,
  CheckSquare,
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
// NOTE: Keep ThemeToggle if it does NOT render "Light mode/Dark mode" text.
// If it does, hide its text in that component or replace with an icon-only toggle.
import { ThemeToggle } from "../components/ui/theme-toggle";
import { HeroBackdrop } from "../components/ui/hero-backdrop";
import { surface } from "../components/ui/surface";

// Simple nav state for mobile menu
function useToggle(initial = false) {
  const [open, setOpen] = React.useState(initial);
  const toggle = React.useCallback(() => setOpen((v) => !v), []);
  const close = React.useCallback(() => setOpen(false), []);
  return { open, toggle, close };
}

// ———————————————————————————————————————————————————————————
// Content (marketing-first, typos fixed)
// ———————————————————————————————————————————————————————————

const features = [
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Your funds stay in your control",
    desc: "Non-custodial by design. The display shows payment requests and tracks incoming payments — it can’t spend your funds.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Instant payment visibility",
    desc: "See payments appear in seconds so you can keep the line moving.",
  },
  {
    icon: <Rocket className="w-6 h-6" aria-hidden />,
    title: "Affordable to deploy",
    desc: "Get started with hardware from around $15 — perfect for kiosks, cafes, and events.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" aria-hidden />,
    title: "Works through spotty internet",
    desc: "Queue payment requests offline and sync automatically when you’re back online.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Built for peace of mind",
    desc: "Open-source and verifiable. Designed with best-practice device hardening in mind.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Sips power",
    desc: "Runs on roughly 1 W — great for counters, markets, and mobile carts.",
  },
];

const plans = [
  {
    name: "Cheap Yellow Board 2.8″",
    price: "USD 15",
    perks: [
      "ESP32 + 2.8″ TFT (reference build)",
      "Open-source receiver (watch-only)",
      "QR / Nexa link display",
    ],
    cta: "Build from guide",
    highlight: false,
  },
  {
    name: "Cheap Yellow Board 3.5″",
    price: "USD 15",
    perks: [
      "ESP32 + 3.5″ TFT (reference build)",
      "Desk stand + cables",
      "Optional receipt logging to microSD",
    ],
    cta: "Get the kit",
    highlight: true,
  },
  {
    name: "Cheap Yellow Board 4″",
    price: "USD 15",
    perks: ["Durable enclosure", "Hardened setup", "Priority help & docs"],
    cta: "Talk to us",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Which assets can I accept?",
    a: "Nexa mainnet today, with more assets on the roadmap.",
  },
  {
    q: "Does PayDeck hold my money?",
    a: "No. It’s watch-only. You keep control of your funds at all times.",
  },
  {
    q: "How fast do payments show up?",
    a: "Typically in about a second, so you can serve the next customer without waiting.",
  },
  {
    q: "What are the fees?",
    a: "Only the Nexa network fee, which is usually around a cent. PayDeck doesn’t add per-transaction fees.",
  },
  {
    q: "Do I need constant internet?",
    a: "You’ll need a connection to see payments as they arrive. If your connection drops, requests queue and sync when you’re back online.",
  },
  {
    q: "Is this compliant for my store?",
    a: "As watch-only display hardware, it’s generally outside card-network certifications. If you sell devices, follow local electronics requirements (e.g., CE/FCC).",
  },
];

export default function Website() {
  const nav = useToggle(false);

  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 dark:from-black dark:to-black dark:text-gray-100">
      {/* Fixed hero photo behind the first viewport (make sure HeroBackdrop uses -z-10 & pointer-events-none) */}
      <HeroBackdrop src="/images/hero-paydeck.png" dimOpacity={60} />

      {/* Header — lighter translucency over photo */}
      <header className="sticky top-0 z-50 bg-white dark:bg-black border-b border-slate-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold">
              <CheckSquare className="w-5 h-5" aria-hidden />
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

              {/* Ensure ThemeToggle renders icon-only (no “Light/Dark mode” text). */}
              <ThemeToggle />

              {/* Buttons forced to neutral (no blue cast) */}
              <Button
                asChild
                className="bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                <a href="https://gitlab.com/IamEndo/paydeck" target="_blank" rel="noopener noreferrer">
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

              {/* Icon-only theme toggle recommended */}
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

      {/* Hero — transparent section; inner content forced to light-on-dark for photo mode */}
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
                <Zap className="w-4 h-4" aria-hidden />
                Open-source • Low-cost • Instant
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Instant Nexa payments at checkout
              </h1>
              <p className="text-lg text-white/80">
                No contracts. No added fees. No data harvesting. PayDeck is open-source,
                non-custodial, and built for real-world retail.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Primary — black button, white text */}
                <Button
                  asChild
                  className="h-12 px-6 text-base bg-neutral-900 text-white hover:bg-neutral-800"
                >
                  <a href="#pricing">See hardware options</a>
                </Button>

                {/* Secondary — white outline, white text, subtle hover darken */}
                <Button
                  asChild
                  className="h-12 px-6 text-base bg-neutral-800 text-white hover:bg-neutral-700"
                >
                  <a href="#how">How it works</a>
                </Button>
              </div>



              <div className="flex items-center gap-4 pt-4 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Watch-only
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Non-custodial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> Secure by design
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
              Simple, secure, and built for the checkout counter — fully
              verifiable on the Nexa blockchain.
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
                t: "1. Get the display",
                d: "Choose the widely available ESP32 Cheap Yellow Display. The ESP32-2432S028R model fits best.",
              },
              {
                t: "2. Install the software",
                d: "Download the project from GitLab and follow the quick guide.",
              },
              {
                t: "3. Set up your device",
                d: "Create a wallet, connect to the internet, and customize your store name.",
              },
              {
                t: "4. Request a payment",
                d: "Show a QR code and let customers pay in Nexa — at the counter or on the go.",
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
                <CardTitle className="text-2xl">
                  Reference hardware (ESP32-2432S028R)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-gray-300 grid gap-2">
                <div>• Dual-core 240 MHz • 520 KB SRAM • 2.8″ 240×320 TFT</div>
                <div>• Resistive touchscreen • microSD • Wi-Fi b/g/n • BT LE</div>
                <div>• Supports secure boot & flash encryption</div>
                <div>• Typical cost: ~USD 10–15</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-2xl">Costs vs card terminals</CardTitle>
              </CardHeader>
              <CardContent className="text-slate-600 dark:text-gray-300 grid gap-2">
                <div>• Nexa network fee only ≈ $0.01 (typical)</div>
                <div>• Card networks: 1.5–3.5% + $0.10–$0.30 fixed</div>
                <div>• Mobile money: ~0.5–2%</div>
                <div>• Power: ~1–1.25 W vs 5–10 W for many POS</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing / hardware */}
      <section id="pricing" className={`py-20 ${surface.primary}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Hardware options</h2>
            <p className="text-slate-600 dark:text-gray-300 mt-3">
              Pick a size that matches your counter and budget.
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
                  <Button className="w-full bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    {p.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`py-20 ${surface.secondary}`}>
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
                placeholder="Share your use case, country, and timeline…"
                className="min-h-[120px]"
              />
              <Button className="w-full md:w-auto inline-flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                <Mail className="w-4 h-4" /> Send message
              </Button>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-slate-500 dark:text-gray-400 mt-4">
            Version: Beta v0.1 — October {new Date().getFullYear()}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-10 ${surface.secondary} border-t border-slate-200 dark:border-neutral-800`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-300">
            <CheckSquare className="w-4 h-4" aria-hidden />
            <span>
              © {new Date().getFullYear()} PayDeck. Open-source software.
            </span>
          </div>
          <div className="text-sm text-slate-600 dark:text-gray-300 flex gap-4">
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
