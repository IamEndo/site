export const faqs = [
  {
    id: "assets",
    question: "Which assets can I accept?",
    answer: "Currently Nexa coin is supported, with additional native assets planned for future releases.",
  },
  {
    id: "custody",
    question: "Does PayDeck hold my money?",
    answer: "No. PayDeck is strictly watch-only. You retain full control of your funds at all times.",
  },
  {
    id: "speed",
    question: "How quickly do payments appear?",
    answer: "Payments typically appear instantly, allowing you to serve the next customer without delay.",
  },
  {
    id: "fees",
    question: "What are the fees?",
    answer: "Only the Nexa network fee applies, usually around one cent. PayDeck charges nothing.",
  },
  {
    id: "offline",
    question: "Do I need constant internet?",
    answer: "A connection is required for real-time payment display. If it drops, you can still accept payments manually.",
  },
  {
    id: "compliance",
    question: "Is this compliant for my store?",
    answer: "PayDeck is not a card terminal: it never touches card data, so card-network rules such as PCI DSS do not apply to it. It is open-source firmware for an uncertified development board, provided as-is. Whether and how you may accept cryptocurrency, and how to report it for tax, depends on your country, so check your local rules.",
  },
] as const;

export type FAQ = (typeof faqs)[number];
