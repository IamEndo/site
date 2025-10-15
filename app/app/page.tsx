import React from "react";
import { motion } from "framer-motion";
import { Rocket, Shield, Zap, CheckCircle, Menu, X, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Simple nav state for mobile menu
function useToggle(initial = false) {
  const [open, setOpen] = React.useState(initial);
  const toggle = React.useCallback(() => setOpen((v) => !v), []);
  const close = React.useCallback(() => setOpen(false), []);
  return { open, toggle, close };
}

const features = [
  {
    icon: <Rocket className="w-6 h-6" aria-hidden />,
    title: "Blazing Fast",
    desc: "Optimized for performance with modern tooling and best practices.",
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden />,
    title: "Secure by Default",
    desc: "Hardened components and sensible defaults to keep your data safe.",
  },
  {
    icon: <Zap className="w-6 h-6" aria-hidden />,
    title: "Easy to Customize",
    desc: "Tweak colors, copy, and sections in minutes—not days.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "Free",
    perks: ["1 page", "Email capture", "Basic analytics"],
    cta: "Get started",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19/mo",
    perks: ["Up to 10 pages", "Blog + CMS", "Priority support"],
    cta: "Upgrade to Pro",
    highlight: true,
  },
  {
    name: "Business",
    price: "$49/mo",
    perks: ["Unlimited pages", "Team access", "Custom domain & SLA"],
    cta: "Contact sales",
    highlight: false,
  },
];

export default function Website() {
  const nav = useToggle(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <a href="#home" className="flex items-center gap-2 font-semibold">
              <Rocket className="w-5 h-5" aria-hidden />
              <span>Acme</span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="hover:opacity-80">Features</a>
              <a href="#pricing" className="hover:opacity-80">Pricing</a>
              <a href="#faq" className="hover:opacity-80">FAQ</a>
              <a href="#contact" className="hover:opacity-80">Contact</a>
              <Button asChild>
                <a href="#contact">Get started</a>
              </Button>
            </nav>

            {/* Mobile nav toggle */}
            <button
              className="md:hidden p-2 rounded-xl border border-slate-200 hover:bg-slate-100"
              aria-label="Toggle menu"
              onClick={nav.toggle}
            >
              {nav.open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {nav.open && (
          <div className="md:hidden border-t border-slate-200">
            <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2">
              {[
                { href: "#features", label: "Features" },
                { href: "#pricing", label: "Pricing" },
                { href: "#faq", label: "FAQ" },
                { href: "#contact", label: "Contact" },
              ].map((i) => (
                <a key={i.href} href={i.href} onClick={nav.close} className="py-2">{i.label}</a>
              ))}
              <Button asChild>
                <a href="#contact" onClick={nav.close}>Get started</a>
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
              <span className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border border-slate-200 w-fit">
                <Zap className="w-4 h-4" aria-hidden />
                Build your site in minutes
              </span>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                A modern website template that just works
              </h1>
              <p className="text-lg text-slate-600">
                Launch faster with a clean, responsive, and accessible design. Swap in your
                brand, tweak the sections, and you’re live.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="h-12 px-6 text-base">
                  <a href="#pricing">See pricing</a>
                </Button>
                <Button variant="outline" asChild className="h-12 px-6 text-base">
                  <a href="#features">Explore features</a>
                </Button>
              </div>
              <div className="flex items-center gap-4 pt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No code required</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> SEO-friendly</div>
                <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Fully responsive</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl border border-slate-200 shadow-sm bg-white p-4 grid place-items-center">
                <div className="text-center">
                  <Rocket className="w-12 h-12 mx-auto mb-3" />
                  <p className="font-semibold">Drop your app screenshot here</p>
                  <p className="text-slate-500">(or replace with an image)</p>
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
            <h2 className="text-3xl md:text-4xl font-bold">Everything you need</h2>
            <p className="text-slate-600 mt-3">
              Thoughtful defaults, clean components, and a smooth editing experience.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.title} className="rounded-2xl">
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl border border-slate-200 grid place-items-center">
                    {f.icon}
                  </div>
                  <CardTitle className="mt-4 text-xl">{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{f.desc}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing</h2>
            <p className="text-slate-600 mt-3">Pick a plan that fits your stage.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <Card key={p.name} className={`rounded-2xl ${p.highlight ? "ring-2 ring-slate-900" : ""}`}>
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
            <h2 className="text-3xl md:text-4xl font-bold">Frequently asked questions</h2>
            <p className="text-slate-600 mt-3">Short, helpful answers to common questions.</p>
          </div>
          <div className="grid gap-6">
            {[
              {
                q: "Can I use this template commercially?",
                a: "Yes. Replace the copy, adjust the styles, and ship it for your product or client.",
              },
              {
                q: "Is Tailwind required?",
                a: "No, but it’s set up for Tailwind out of the box. Swap classes for your preferred styling if needed.",
              },
              {
                q: "How do I deploy?",
                a: "Export to your framework of choice (Next.js, Vite, etc.) and deploy to services like Vercel, Netlify, or Cloudflare.",
              },
            ].map((item) => (
              <Card key={item.q} className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">{item.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600">{item.a}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Tell us about your project</h2>
            <p className="text-slate-600 mt-3">Drop a note and we’ll get back to you.</p>
          </div>
          <Card className="rounded-2xl">
            <CardContent className="p-6 grid gap-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input placeholder="Your name" />
                <Input type="email" placeholder="Email address" />
              </div>
              <Input placeholder="Subject" />
              <Textarea placeholder="How can we help?" className="min-h-[120px]" />
              <Button className="w-full md:w-auto inline-flex items-center gap-2">
                <Mail className="w-4 h-4" /> Send message
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Rocket className="w-4 h-4" aria-hidden />
            <span>© {new Date().getFullYear()} Acme, Inc.</span>
          </div>
          <div className="text-sm text-slate-600 flex gap-4">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#pricing" className="hover:opacity-80">Pricing</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
