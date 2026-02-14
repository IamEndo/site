import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Cpu,
  Monitor,
  Wifi,
  Usb,
  Zap,
  Box,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ShoppingCart,
  Printer,
  ExternalLink,
  Package
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Hardware Requirements',
  description: 'Required hardware for building a PayDeck point-of-sale device including the ESP32-2432S028R display module.',
};

export default function HardwarePage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Cpu className="w-4 h-4" />
          Getting Started
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Hardware Requirements
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Everything you need to build your PayDeck device. The total cost is typically under $15, 
          with most components available from common electronics retailers.
        </p>
      </div>

      {/* Quick Specs */}
      <div className="grid sm:grid-cols-4 gap-3 mb-12">
        <QuickSpec icon={<Monitor className="w-4 h-4" />} label="Display" value='2.8"' />
        <QuickSpec icon={<Cpu className="w-4 h-4" />} label="Processor" value="Dual-core" />
        <QuickSpec icon={<Wifi className="w-4 h-4" />} label="WiFi" value="Built-in" />
        <QuickSpec icon={<Zap className="w-4 h-4" />} label="Power" value="USB-C" />
      </div>

      {/* Main Module */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          ESP32-2432S028R Module
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          PayDeck runs on the ESP32-2432S028R, commonly known as the "Cheap Yellow Display" (CYD). 
          This compact module combines an ESP32 microcontroller with a 2.8" touchscreen, providing everything 
          needed for a point-of-sale terminal in one board.
        </p>

        {/* Module Visual */}
        <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-48 h-32 rounded-lg bg-amber-100 dark:bg-amber-900/30 border-2 border-dashed border-amber-300 dark:border-amber-700 flex items-center justify-center">
              <div className="text-center">
                <Monitor className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <span className="text-xs text-amber-600 dark:text-amber-400">ESP32-2432S028R</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">What's Included on the Board</h3>
              <div className="grid sm:grid-cols-2 gap-2">
                <BoardFeature text="ESP32-WROOM-32 (dual-core 240MHz)" />
                <BoardFeature text='2.8" TFT display (320×240)' />
                <BoardFeature text="ILI9341 or ST7789 display driver" />
                <BoardFeature text="XPT2046 resistive touchscreen" />
                <BoardFeature text="USB-C for power & programming" />
                <BoardFeature text="WiFi 802.11 b/g/n" />
                <BoardFeature text="SD card slot (unused)" />
                <BoardFeature text="RGB status LED" />
              </div>
            </div>
          </div>
        </div>

        {/* Tip Box */}
        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">Finding the Right Module</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Search for <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">ESP32-2432S028R</code> or 
                <code className="px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs ml-1">ESP32 2.8 inch TFT touch</code>. 
                Note whether listings show single or dual USB ports, as this determines which display driver your board uses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Technical Specifications
        </h2>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Component</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Specification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <SpecRow label="Processor" value="ESP32-WROOM-32, 240MHz dual-core Xtensa LX6" />
              <SpecRow label="Memory" value="520KB SRAM, 4MB Flash" />
              <SpecRow label="Display" value='2.8" TFT, 320×240 pixels, 65K colors' />
              <SpecRow label="Display Driver" value="ILI9341 (v1/v2) or ST7789 (v3)" />
              <SpecRow label="Touch" value="XPT2046 resistive touchscreen" />
              <SpecRow label="Connectivity" value="WiFi 802.11 b/g/n (2.4GHz), Bluetooth 4.2 BLE" />
              <SpecRow label="Power Input" value="5V via USB-C" />
              <SpecRow label="Power Draw" value="~150mA typical, ~200mA peak" />
              <SpecRow label="Dimensions" value="86mm × 50mm × 10mm (board only)" />
            </tbody>
          </table>
        </div>
      </section>

      {/* Additional Hardware */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Additional Hardware
        </h2>
        <div className="space-y-4">
          <AccessoryCard 
            icon={<Usb className="w-5 h-5" />}
            title="USB Data Cable"
            description="USB-A to USB-C cable for programming and power. Must be a data cable, not charge-only."
            required={true}
            tip="If your device isn't recognized, try a different cable. This is the most common issue."
          />
          <AccessoryCard 
            icon={<Zap className="w-5 h-5" />}
            title="USB Power Adapter"
            description="Any 5V USB adapter with at least 500mA output. For permanent installation."
            required={false}
            tip="The device draws 100-200mA typical. Any phone charger will work."
          />
        </div>
      </section>

      {/* Board Versions & Display Drivers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Board Versions & Display Drivers
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The ESP32-2432S028R exists in multiple hardware versions with different display controller ICs. 
          This is critical because each requires a different driver configuration in PlatformIO.
        </p>
        
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Version</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">USB Ports</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Display Driver</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">PlatformIO Flag</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">v1 / v2</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Single USB</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">ILI9341</td>
                <td className="px-4 py-3"><code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs">ILI9341_DRIVER</code></td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">v3</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Dual USB</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">ST7789</td>
                <td className="px-4 py-3"><code className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs">ST7789_DRIVER</code></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">How to Identify Your Board</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                Count the USB ports on your board. <strong>Single USB</strong> = ILI9341 (v1/v2). 
                <strong> Dual USB</strong> = ST7789 (v3). If you flash the wrong driver, the display 
                will show a white/blank screen or corrupted colors.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">PayDeck Configuration</div>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                PayDeck firmware includes build environments for both variants. Select the correct 
                environment in <code className="px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs">platformio.ini</code> based 
                on your board version. See <Link href="/docs/installation/building" className="underline">Building Firmware</Link> for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USB-to-Serial Chips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          USB-to-Serial Chips
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          Independent of the display driver, boards also vary in their USB-to-serial chip, which affects driver installation:
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <VariantCard 
            chip="CH340"
            description="Common on Chinese-sourced modules"
            driver="Requires CH340 driver installation"
          />
          <VariantCard 
            chip="CP2102"
            description="Silicon Labs chip"
            driver="Driver often pre-installed on Windows/macOS"
          />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
          See <Link href="/docs/installation/usb-drivers" className="text-green-600 dark:text-green-400 hover:underline">USB Drivers</Link> for 
          installation instructions.
        </p>
      </section>

      {/* What NOT to Buy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Incompatible Modules
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          These similar-looking modules will <strong>not</strong> work with PayDeck firmware:
        </p>
        <div className="space-y-3">
          <IncompatibleItem 
            model="ESP32-3248S035"
            reason="3.5&quot; display with different resolution and pin configuration"
          />
          <IncompatibleItem 
            model="ESP32-S3 variants"
            reason="Different processor architecture (ESP32-S3 vs ESP32-WROOM)"
          />
          <IncompatibleItem 
            model="Generic ESP32 + separate display"
            reason="Different wiring and pin mappings"
          />
        </div>
        <div className="mt-4 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              PayDeck supports both ILI9341 and ST7789 display variants of the ESP32-2432S028R. 
              Make sure to select the correct build environment for your specific board version.
            </p>
          </div>
        </div>
      </section>

      {/* Enclosure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Enclosure
        </h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          While not required, an enclosure protects the device and gives it a professional appearance 
          for customer-facing use.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <EnclosureOption 
            icon={<Printer className="w-6 h-6" />}
            title="3D Print Your Own"
            description="Download STL files from the repository and print at home or use a local print service."
            linkText="Download STL files"
            linkHref="https://gitlab.com/nicetokno/paydeck/-/tree/main/enclosure"
            external={true}
          />
          <EnclosureOption 
            icon={<ShoppingCart className="w-6 h-6" />}
            title="Buy Pre-Made"
            description="Order a ready-to-use enclosure from Etsy. Ships worldwide."
            linkText="Shop on Etsy"
            linkHref="https://www.etsy.com/listing/1680602383/esp32-2432s028-esp-wroom-32-development"
            external={true}
          />
        </div>
      </section>

      {/* Sourcing Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Where to Buy
        </h2>
        <div className="space-y-4">
          <SourceOption 
            name="AliExpress"
            price="$8–12"
            shipping="2–4 weeks"
            pros={["Best prices", "Multiple sellers", "Bulk discounts"]}
            cons={["Slow shipping", "Variable quality"]}
          />
          <SourceOption 
            name="Amazon"
            price="$15–20"
            shipping="1–3 days"
            pros={["Fast shipping", "Easy returns", "Prime eligible"]}
            cons={["Higher prices", "Fewer options"]}
          />
        </div>
        
        <div className="mt-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Buying Tips
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Buy from sellers with good reviews and multiple orders
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Consider ordering 2–3 units for backup or in case of defects
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Verify the exact model number: ESP32-2432S028R
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Note whether it has single or dual USB ports (affects driver selection)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
              Check that it includes USB-C (some older versions have Micro-USB)
            </li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Got your hardware?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Next, set up your development environment with the required software.
        </p>
        <Link 
          href="/docs/getting-started/prerequisites"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Software Setup
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Quick Spec
function QuickSpec({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="flex justify-center text-zinc-400 mb-1">{icon}</div>
      <div className="text-lg font-bold text-zinc-900 dark:text-white">{value}</div>
      <div className="text-xs text-zinc-500">{label}</div>
    </div>
  );
}

// Component: Board Feature
function BoardFeature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
      <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
      <span dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}

// Component: Spec Row
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="px-4 py-3 text-zinc-500 dark:text-zinc-400">{label}</td>
      <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">{value}</td>
    </tr>
  );
}

// Component: Accessory Card
function AccessoryCard({ 
  icon, 
  title, 
  description, 
  required, 
  tip 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  required: boolean;
  tip: string;
}) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            required 
              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' 
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
          }`}>
            {required ? 'Required' : 'Optional'}
          </span>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{description}</p>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 italic">{tip}</p>
      </div>
    </div>
  );
}

// Component: Variant Card
function VariantCard({ chip, description, driver }: { chip: string; description: string; driver: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="font-semibold text-zinc-900 dark:text-white mb-1">{chip}</div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{description}</p>
      <p className="text-xs text-zinc-500 dark:text-zinc-500">{driver}</p>
    </div>
  );
}

// Component: Incompatible Item
function IncompatibleItem({ model, reason }: { model: string; reason: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <div className="font-medium text-red-900 dark:text-red-200">{model}</div>
        <p className="text-sm text-red-700 dark:text-red-300">{reason}</p>
      </div>
    </div>
  );
}

// Component: Enclosure Option
function EnclosureOption({ 
  icon, 
  title, 
  description, 
  linkText, 
  linkHref,
  external,
  comingSoon
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  linkText: string;
  linkHref: string;
  external?: boolean;
  comingSoon?: boolean;
}) {
  return (
    <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-green-300 dark:hover:border-green-700 transition-colors">
      <div className="text-zinc-400 dark:text-zinc-500 mb-3">{icon}</div>
      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      {comingSoon ? (
        <span className="inline-flex items-center gap-1 text-sm text-zinc-400 dark:text-zinc-500">
          Coming soon
        </span>
      ) : (
        <a 
          href={linkHref}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
        >
          {linkText}
          {external && <ExternalLink className="w-3 h-3" />}
        </a>
      )}
    </div>
  );
}

// Component: Source Option
function SourceOption({ 
  name, 
  price, 
  shipping, 
  pros, 
  cons 
}: { 
  name: string; 
  price: string; 
  shipping: string; 
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
        <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium">
          {price}
        </span>
        <span className="text-xs text-zinc-500">
          Shipping: {shipping}
        </span>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <div>
          {pros.map((pro, i) => (
            <div key={i} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              {pro}
            </div>
          ))}
        </div>
        <div>
          {cons.map((con, i) => (
            <div key={i} className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-500">
              <XCircle className="w-3.5 h-3.5 text-zinc-400" />
              {con}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
