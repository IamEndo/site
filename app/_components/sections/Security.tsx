import Link from "next/link";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../ui/ScrollReveal";
import { ArrowRight, EyeOff, KeyRound, Lock, FileCheck2 } from "lucide-react";

// Every claim here is documented in /docs/security/model, /docs/usage/confirmation
// and /docs/install/web-flasher. Keep them in step when the firmware changes.
const points = [
  {
    icon: <EyeOff className="w-5 h-5" aria-hidden="true" />,
    title: "It cannot spend",
    description:
      "The device keeps only a public key that derives receiving addresses. It cannot sign a transaction, so a stolen or compromised device cannot move your funds.",
  },
  {
    icon: <Lock className="w-5 h-5" aria-hidden="true" />,
    title: "Encrypted, verified connections",
    description:
      "Payment data comes from Rostrum servers over TLS with certificate verification. You can point the device at a server you run yourself.",
  },
  {
    icon: <KeyRound className="w-5 h-5" aria-hidden="true" />,
    title: "Locked with your password",
    description:
      "Settings are protected by an access password of 8 to 128 characters. After 15 wrong attempts the device wipes itself.",
  },
  {
    icon: <FileCheck2 className="w-5 h-5" aria-hidden="true" />,
    title: "Check what you install",
    description:
      "The firmware source is public, and every release file is listed with its SHA-256 hash so you can confirm the image before flashing it.",
  },
];

export function Security() {
  return (
    <section id="security" className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16 md:mb-20">
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
              Security
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
              Designed so the device is not worth stealing
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 border border-neutral-200 dark:border-neutral-800 rounded-sm">
          {points.map((point, index) => (
            <div
              key={point.title}
              className="border-neutral-200 dark:border-neutral-800 border-t first:border-t-0 sm:[&:nth-child(2)]:border-t-0 sm:even:border-l"
            >
              <ScrollReveal delay={index * 80}>
              <div className="p-6 md:p-8">
                <div className="w-10 h-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm flex items-center justify-center text-neutral-600 dark:text-neutral-400 mb-4">
                  {point.icon}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {point.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
              </ScrollReveal>
            </div>
          ))}
        </div>

        <ScrollReveal delay={150}>
          <div className="mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
              Know the limits: &ldquo;Payment received&rdquo; means the device&apos;s Rostrum
              server has seen the transaction, before it is in a block. That suits everyday
              sales; for a high-value sale, wait for a block confirmation.
            </p>
            <Button asChild variant="outline">
              <Link href="/docs/security/model" className="gap-2 flex-shrink-0">
                Read the security model
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
