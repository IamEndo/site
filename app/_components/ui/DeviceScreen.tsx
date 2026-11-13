import { cn } from "@/lib/cn";

/**
 * A PayDeck screen, rendered by the firmware's own UI code in the project's
 * host simulator (tests/sim in the firmware repository) at the panel's native
 * 240x320. Shown pixel-for-pixel inside a plain bezel.
 */
export function DeviceScreen({
  name,
  alt,
  caption,
  className,
}: {
  /** File name in public/screens, without extension */
  name: string;
  alt: string;
  caption?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("w-fit", className)}>
      <div className="rounded-lg bg-neutral-900 p-2 shadow-lg ring-1 ring-black/10 dark:ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/screens/${name}.png`}
          alt={alt}
          width={240}
          height={320}
          loading="lazy"
          decoding="async"
          className="block w-[180px] sm:w-[240px] h-auto rounded-sm [image-rendering:pixelated]"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 max-w-[240px] text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
