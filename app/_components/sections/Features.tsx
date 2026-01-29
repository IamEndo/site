import { cn } from "@/lib/cn";
import { features } from "@/app/_data/features";
import { 
  Lock, 
  Zap, 
  Code, 
  CircleDollarSign, 
  Cpu, 
  TrendingUp 
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "non-custodial": <Lock className="w-5 h-5" />,
  "instant": <Zap className="w-5 h-5" />,
  "open-source": <Code className="w-5 h-5" />,
  "no-fees": <CircleDollarSign className="w-5 h-5" />,
  "affordable": <Cpu className="w-5 h-5" />,
  "scalable": <TrendingUp className="w-5 h-5" />,
};

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header - left aligned */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-3">
            Why PayDeck
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
            Built for merchants who value control
          </h2>
        </div>

        {/* Features - 2 column staggered layout */}
        <div className="grid md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12 md:gap-y-16">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cn(
                "group",
                // Stagger every other item on larger screens
                index % 2 === 1 && "md:mt-12"
              )}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 bg-neutral-100 dark:bg-neutral-900 rounded-sm flex items-center justify-center text-neutral-600 dark:text-neutral-400 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                  {iconMap[feature.id]}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
