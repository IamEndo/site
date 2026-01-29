import Script from "next/script";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { Hero } from "./_components/sections/Hero";
import { Features } from "./_components/sections/Features";
import { Device } from "./_components/sections/Device";
import { HowItWorks } from "./_components/sections/HowItWorks";
import { Comparison } from "./_components/sections/Comparison";
import { FAQ } from "./_components/sections/FAQ";
import { faqs } from "./_data/faqs";
import { device } from "./_data/device";
import { steps } from "./_data/steps";

// FAQ structured data for SEO
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

// Product structured data for SEO
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: device.name,
  description: `ESP32 based cryptocurrency payment terminal. ${device.specs.map((s) => `${s.label}: ${s.value}`).join(". ")}`,
  brand: { "@type": "Brand", name: "ESP32" },
  url: "https://paydeck.org/#device",
  image: "https://paydeck.org/images/esp32-device.jpg",
  offers: {
    "@type": "Offer",
    price: "10",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    url: device.purchaseUrl,
  },
};

// HowTo structured data for SEO
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Set Up PayDeck for Nexa Payments",
  description: "Learn how to set up your PayDeck device to accept Nexa cryptocurrency payments at your business.",
  totalTime: "PT30M",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    value: "10",
  },
  step: steps.map((step, index) => ({
    "@type": "HowToStep",
    position: index + 1,
    name: step.title,
    text: step.description,
  })),
};

// WebPage structured data
const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PayDeck - Open Source Cryptocurrency Point of Sale",
  description: "Accept Nexa cryptocurrency payments instantly with open source, non-custodial POS software.",
  url: "https://paydeck.org",
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "PayDeck",
    applicationCategory: "FinanceApplication",
    operatingSystem: "ESP32",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Structured data */}
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="product-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="howto-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <Script
        id="webpage-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />

      <Header />

      <main>
        <Hero />
        <Features />
        <Device />
        <HowItWorks />
        <Comparison />
        <FAQ />
      </main>

      <Footer />
    </>
  );
}
