// components/ui/hero-backdrop.tsx
"use client";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;

  /**
   * (Legacy) single dim value applied to both themes (0–100).
   * If dimLight/dimDark are provided, they take precedence.
   */
  dimOpacity?: number;

  /** Light mode dim (0–100). Defaults to dimOpacity or 60. */
  dimLight?: number;

  /** Dark mode dim (0–100). Defaults to dimOpacity or 60. */
  dimDark?: number;

  className?: string;
};

export function HeroBackdrop({
  src,
  alt = "",
  dimOpacity = 60,
  dimLight,
  dimDark,
  className = "",
}: Props) {
  const light = Math.max(0, Math.min(100, dimLight ?? dimOpacity)) / 100;
  const dark = Math.max(0, Math.min(100, dimDark ?? dimOpacity)) / 100;

  return (
    <div
      aria-hidden
      className={[
        "fixed inset-0 -z-10 pointer-events-none",
        "h-[100svh] overflow-hidden",
        className,
      ].join(" ")}
    >
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* dim for readability — lighter in light mode, stronger in dark mode */}
      {/* Light mode overlay */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{ backgroundColor: `rgba(0,0,0,${light})` }}
      />
      {/* Dark mode overlay */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{ backgroundColor: `rgba(0,0,0,${dark})` }}
      />

      {/* subtle fade near bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/0 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
    </div>
  );
}