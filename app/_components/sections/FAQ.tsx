"use client";

import { faqs } from "@/app/_data/faqs";
import { Accordion } from "../ui/Accordion";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../ui/ScrollReveal";
import { SITE } from "@/lib/constants";
import { ArrowUpRight } from "lucide-react";

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Header & CTA */}
          <ScrollReveal>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
                  FAQ
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
                  Common questions
                </h2>
              </div>

              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Quick answers for merchants evaluating PayDeck for their business.
              </p>

              <div className="pt-4 space-y-4">
                <p className="text-sm text-neutral-500">
                  Have a question not listed here?
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline">
                    <a
                      href="/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      Read the docs
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href={SITE.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="gap-2"
                    >
                      Ask on Telegram
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Accordion */}
          <ScrollReveal delay={150}>
            <Accordion items={faqs} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
