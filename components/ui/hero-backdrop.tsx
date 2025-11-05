// components/ui/hero-backdrop.tsx
"use client";
import Image from "next/image";

export function HeroBackdrop({
  src,
  alt = "",
  dimOpacity = 60,
  className = "",
}: {
  src: string;
  alt?: string;
  dimOpacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={["fixed inset-0 -z-10 pointer-events-none", "h-[100svh] overflow-hidden", className].join(" ")}
    >
      <div className="absolute inset-0">
        <Image src={src} alt={alt} fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* dim for readability */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: `rgba(0,0,0,${dimOpacity / 100})` }}
      />

      {/* subtle fade near bottom */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/0 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
    </div>
  );
}
