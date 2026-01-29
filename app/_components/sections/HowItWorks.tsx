import { cn } from "@/lib/cn";
import { steps } from "@/app/_data/steps";

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
            Getting started
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Four steps to accepting Nexa
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative group"
            >
              {/* Connector line (hidden on mobile, visible between items on desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-5 left-full w-full h-px bg-neutral-200 dark:bg-neutral-800 -translate-x-4" />
              )}
              
              {/* Step number */}
              <div className="text-5xl md:text-6xl font-bold text-neutral-100 dark:text-neutral-900 mb-4 group-hover:text-neutral-200 dark:group-hover:text-neutral-800 transition-colors">
                {step.number}
              </div>
              
              {/* Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
