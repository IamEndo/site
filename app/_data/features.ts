export const features = [
  {
    id: "non-custodial",
    title: "Non-custodial",
    description: "Your keys, your funds. The device is watch-only and never touches your private keys.",
  },
  {
    id: "instant",
    title: "Instant confirmation",
    description: "Payments appear in real-time. Keep the line moving without delays.",
  },
  {
    id: "open-source",
    title: "Open source",
    description: "Every line of code is verifiable. No black boxes, no hidden logic.",
  },
  {
    id: "no-fees",
    title: "Zero platform fees",
    description: "Only the Nexa network fee applies, typically around one cent.",
  },
  {
    id: "affordable",
    title: "Affordable hardware",
    description: "Get started with low-cost hardware. No rentals, no contracts.",
  },
  {
    id: "scalable",
    title: "Built on Nexa",
    description: "Infrastructure capable of handling throughput comparable to major card networks.",
  },
] as const;

export type Feature = (typeof features)[number];
