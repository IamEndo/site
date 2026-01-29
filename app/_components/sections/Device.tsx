import { cn } from "@/lib/cn";
import { device } from "@/app/_data/device";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";

export function Device() {
  return (
    <section id="device" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Device image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-video bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 rounded-sm overflow-hidden">
              <Image
                src="/images/esp32-device.jpg"
                alt={device.name}
                fill
                className="object-contain"
              />
            </div>
            {/* Price badge */}
            <div className="absolute top-4 left-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-sm px-3 py-1.5">
              <span className="text-sm font-semibold text-neutral-900 dark:text-white">{device.price}</span>
            </div>
          </div>

          {/* Right - Info */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-wider text-neutral-500">
                The Hardware
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
                {device.name}
              </h2>
              <p className="text-lg text-neutral-600 dark:text-neutral-400">
                Model: {device.model}
              </p>
            </div>

            {/* Specs table */}
            <div className="border border-neutral-200 dark:border-neutral-800 rounded-sm divide-y divide-neutral-200 dark:divide-neutral-800">
              {device.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between px-4 py-3">
                  <span className="text-sm text-neutral-500">{spec.label}</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3">
              {device.highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Check className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                  {highlight}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild size="lg">
                <a
                  href={device.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  Get the board
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a
                  href="https://gitlab.com/IamEndo/paydeck"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Installation guide
                </a>
              </Button>
            </div>

            <p className="text-xs text-neutral-500">
              Board available from multiple vendors. Link is for reference only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
