import { DeviceScreen } from "../ui/DeviceScreen";
import { ScrollReveal } from "../ui/ScrollReveal";

const screens = [
  {
    name: "splash",
    title: "Ready",
    alt: "PayDeck home screen showing the shop name and a Request payment button",
    text: "Your shop name and one Request payment button. Taking a payment never needs the password.",
  },
  {
    name: "amount",
    title: "Enter the amount",
    alt: "PayDeck amount screen with a numeric keypad and an Enter button",
    text: "Type the price in NEX on the keypad and tap Enter.",
  },
  {
    name: "qr",
    title: "Customer scans",
    alt: "PayDeck screen showing Awaiting Payment, the amount 12.34 NEX and a QR code",
    text: "The QR code carries your address and the amount, so the customer only confirms.",
  },
  {
    name: "txdetail",
    title: "Receipt",
    alt: "PayDeck receipt screen showing 12.34 NEX, Confirmed, and a QR code linking to a block explorer",
    text: "The last 15 payments are kept in the history, each with a code that opens it in a block explorer.",
  },
];

export function Screens() {
  return (
    <section id="screens" className="py-24 md:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <ScrollReveal>
          <div className="max-w-2xl mb-16 md:mb-20">
            <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-3">
              On the screen
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight">
              What you and your customer see
            </h2>
          </div>
        </ScrollReveal>

        <ol className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 list-none">
          {screens.map((screen, index) => (
            <li key={screen.name}>
              <ScrollReveal delay={index * 100}>
                <DeviceScreen name={screen.name} alt={screen.alt} />
                <h3 className="mt-5 text-lg font-semibold text-neutral-900 dark:text-white">
                  <span className="text-neutral-500 dark:text-neutral-400 font-mono text-sm mr-2" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {screen.title}
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-[260px]">
                  {screen.text}
                </p>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={200}>
          <p className="mt-12 text-sm text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed">
            These are the real screens, drawn by the firmware&apos;s own interface code at the
            display&apos;s native 240&times;320 pixels. The shop name and amounts are sample data.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
