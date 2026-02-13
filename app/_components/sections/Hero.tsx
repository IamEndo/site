import { Button } from "../ui/Button";
import { ArrowDown, Check } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 -z-10" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-28 md:pt-32 pb-16 md:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Text content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
                Accept Nexa
                <br />
                <span className="text-neutral-400 dark:text-neutral-500">at checkout</span>
              </h1>
              
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-md leading-relaxed">
                A simple device that turns any counter into a cryptocurrency point-of-sale. 
                No contracts, no fees, no middlemen.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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

          {/* Right - Terminal window */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Terminal frame */}
            <div className="w-full max-w-lg">
              {/* Terminal title bar */}
              <div className="flex items-center px-4 py-3 bg-neutral-200 dark:bg-neutral-800 rounded-t-sm">
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  Installation Guide
                </span>
              </div>
              {/* Terminal content */}
              <div className="relative aspect-[4/3] bg-neutral-900 dark:bg-black rounded-b-sm overflow-hidden">
                <Image
                  src="/images/hero-paydeck.png"
                  alt="Terminal showing PayDeck firmware flashing process"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden md:flex justify-center mt-20">
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
