export const steps = [
  {
    number: "01",
    title: "Get the hardware",
    description: "Purchase the ESP32 2.8\" display board. Available worldwide from various vendors.",
  },
  {
    number: "02",
    title: "Flash the firmware",
    description: "Download PayDeck from GitLab and follow the installation guide.",
  },
  {
    number: "03",
    title: "Configure your wallet",
    description: "Import your Nexa wallet address and set a security PIN.",
  },
  {
    number: "04",
    title: "Accept payments",
    description: "Display QR codes and watch payments arrive instantly.",
  },
] as const;

export type Step = (typeof steps)[number];
