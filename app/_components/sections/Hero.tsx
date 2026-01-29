import { cn } from "@/lib/cn";
import { Button } from "../ui/Button";
import { ArrowDown, Check } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-0">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 -z-10" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Accept Nexa
                <br />
                <span className="text-neutral-400 dark:text-neutral-500">at checkout</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                A $10 device that turns any counter into a cryptocurrency point-of-sale. 
                No contracts, no fees, no middlemen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg">
                <a href="#device">View hardware</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how">How it works</a>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4">
              {["Watch-only", "Self-custodial", "Fully verifiable"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                  <Check className="w-4 h-4 text-neutral-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Device image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Device container with subtle styling */}
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-sm p-8 flex items-center justify-center">
                <Image
                  src="/images/hero-paydeck.png"
                  alt="PayDeck device displaying QR code"
                  width={400}
                  height={400}
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-sm px-4 py-2 shadow-lg">
                <div className="text-xs text-neutral-500 uppercase tracking-wide">Hardware cost</div>
                <div className="text-xl font-bold text-neutral-900 dark:text-white">~$10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center mt-16">
          <a
            href="#features"
            className="flex flex-col items-center gap-2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Learn more</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
