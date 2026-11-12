import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { Download, ArrowRight, CheckCircle2, Info, Terminal, Apple, ExternalLink } from "lucide-react";
import { LinuxIcon, TroubleshootItem, VerifyStep, WindowsIcon } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/installation/usb-drivers", {
  title: 'USB Drivers',
  description: 'Install USB-to-serial drivers for ESP32 communication - CH340 or CP2102.',
});

export default function USBDriversPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
            <Download className="w-4 h-4" />
            Installation
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            USB Drivers
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            ESP32 modules use USB-to-serial chips to communicate with your computer. 
            Depending on your board variant, you may need to install drivers.
          </p>
        </div>

        {/* Identify Your Chip */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Step 1: Check If Drivers Are Needed
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            First, connect your ESP32-2432S028R and check if it's already recognized:
          </p>

          <div className="space-y-4 mb-6">
            <OSCheckCard 
              icon={<WindowsIcon />}
              os="Windows"
              steps={[
                "Press Win+X and select 'Device Manager'",
                "Expand 'Ports (COM & LPT)'",
                "Look for 'USB-SERIAL CH340' or 'Silicon Labs CP210x'"
              ]}
              success="If you see a COM port listed, drivers are working"
            />
            <OSCheckCard 
              icon={<Apple className="w-5 h-5" />}
              os="macOS"
              steps={[
                "Open Terminal",
                "Run: ls /dev/tty.*",
                "Look for /dev/tty.wchusbserial* or /dev/tty.SLAB_USBtoUART"
              ]}
              success="If a device appears, drivers are working"
            />
            <OSCheckCard 
              icon={<LinuxIcon />}
              os="Linux"
              steps={[
                "Open Terminal",
                "Run: ls /dev/ttyUSB* /dev/ttyACM*",
                "Look for /dev/ttyUSB0 or similar"
              ]}
              success="Linux usually has drivers built-in"
            />
          </div>

          <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                <strong>Device detected?</strong> Skip to <Link href="/docs/installation/building" className="underline">Building Firmware</Link>. 
                If not, continue below to install drivers.
              </p>
            </div>
          </div>
        </section>

        {/* Identify Chip Type */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Step 2: Identify Your Chip
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            The ESP32-2432S028R uses one of two USB-to-serial chips:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <ChipCard 
              name="CH340"
              description="Most common on modules from AliExpress and Chinese sellers"
              identifier="Look for a small black chip labeled 'CH340' on the board"
              common={true}
            />
            <ChipCard 
              name="CP2102"
              description="Found on some modules, often from Silicon Labs"
              identifier="Look for a chip labeled 'CP2102' or 'SILABS'"
              common={false}
            />
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>Not sure which chip?</strong> Try installing the CH340 driver first since it's more common. 
                If that doesn't work, try CP2102.
              </p>
            </div>
          </div>
        </section>

        {/* CH340 Driver */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            CH340 Driver Installation
          </h2>

          <div className="space-y-6">
            {/* Windows */}
            <DriverInstallCard 
              icon={<WindowsIcon />}
              os="Windows"
              steps={[
                "Download CH341SER.EXE from the link below",
                "Run the installer as Administrator",
                "Click 'Install' and wait for completion",
                "Restart your computer"
              ]}
              downloadUrl="https://www.wch.cn/downloads/CH341SER_EXE.html"
              downloadText="Download CH340 Driver (Windows)"
            />

            {/* macOS */}
            <DriverInstallCard 
              icon={<Apple className="w-5 h-5" />}
              os="macOS"
              steps={[
                "Download CH341SER_MAC.ZIP from the link below",
                "Extract and run the .pkg installer",
                "Allow the extension in System Settings > Privacy & Security",
                "Restart your Mac"
              ]}
              downloadUrl="https://www.wch.cn/downloads/CH341SER_MAC_ZIP.html"
              downloadText="Download CH340 Driver (macOS)"
              note="macOS 10.15+ may require allowing the extension in Security settings"
            />

            {/* Linux */}
            <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center">
                  <LinuxIcon />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white">Linux</h3>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3">
                CH340 drivers are built into the Linux kernel (2.6+). No installation needed.
              </p>
              <p className="text-sm text-neutral-500">
                If your user can't access the port, add yourself to the dialout group:
              </p>
              <CodeBlock code="sudo usermod -a -G dialout $USER" />
              <p className="text-xs text-neutral-500 mt-2">Log out and back in for the change to take effect.</p>
            </div>
          </div>
        </section>

        {/* CP2102 Driver */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            CP2102 Driver Installation
          </h2>

          <div className="p-5 rounded-lg border border-neutral-200 dark:border-neutral-800">
            <p className="text-neutral-600 dark:text-neutral-400 mb-4">
              Silicon Labs provides drivers for all operating systems:
            </p>
          
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-white w-20">Windows:</span>
                <span>Download and run the CP210x VCP installer</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-white w-20">macOS:</span>
                <span>Download the .pkg and install (allow in Security settings)</span>
              </div>
              <div className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span className="font-medium text-neutral-900 dark:text-white w-20">Linux:</span>
                <span>Usually built-in. Same dialout group fix if needed.</span>
              </div>
            </div>

            <a 
              href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-900 dark:bg-neutral-100 hover:bg-neutral-800 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-medium transition-colors text-sm"
            >
              Download CP2102 Drivers
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Verify Connection */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Step 3: Verify Connection
          </h2>
        
          <div className="space-y-3 mb-6">
            <VerifyStep number={1} text="Disconnect the ESP32 from USB" />
            <VerifyStep number={2} text="Reconnect the device" />
            <VerifyStep number={3} text="Check for a new port (see Step 1 commands above)" />
            <VerifyStep number={4} text="Note the port name (e.g., COM3, /dev/ttyUSB0) for later" />
          </div>

          <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Success</div>
                <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                  If a port appears when you connect the device, your drivers are working correctly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Troubleshooting
          </h2>
        
          <div className="space-y-4">
            <TroubleshootItem 
              problem="Device not recognized after driver install"
              solutions={[
                "Try a different USB cable (must be a data cable, not charge-only)",
                "Try a different USB port (avoid hubs, use direct connection)",
                "Restart your computer after installing drivers",
                "Try the other driver (CH340 vs CP2102)"
              ]}
            />
            <TroubleshootItem 
              problem="macOS blocks the driver"
              solutions={[
                "Open System Settings > Privacy & Security",
                "Scroll down and click 'Allow' next to the blocked software",
                "Restart your Mac",
                "If still blocked, boot into Recovery Mode and disable SIP temporarily"
              ]}
            />
            <TroubleshootItem 
              problem="Linux permission denied on /dev/ttyUSB0"
              solutions={[
                "Add your user to dialout group: sudo usermod -a -G dialout $USER",
                "Log out and log back in",
                "Or use sudo for one-time access: sudo chmod 666 /dev/ttyUSB0"
              ]}
            />
            <TroubleshootItem 
              problem="Port appears then disappears"
              solutions={[
                "The board may be resetting due to insufficient power",
                "Try a powered USB hub or different port",
                "Check if the USB cable is damaged"
              ]}
            />
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Drivers working?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Now you're ready to build and flash the PayDeck firmware.
          </p>
          <Link 
            href="/docs/installation/building"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Building Firmware
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: OS Check Card
function OSCheckCard({ icon, os, steps, success }: { icon: React.ReactNode; os: string; steps: string[]; success: string }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">{os}</h3>
      </div>
      <ol className="space-y-1 mb-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="text-neutral-400 font-medium">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs text-accent-600 dark:text-accent-dark-400">{success}</p>
    </div>
  );
}

// Component: Chip Card
function ChipCard({ name, description, identifier, common }: { name: string; description: string; identifier: string; common: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${common ? 'border-accent-300 dark:border-accent-dark-700 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-neutral-200 dark:border-neutral-800'}`}>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{name}</h3>
        {common && <span className="px-2 py-0.5 rounded bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300 text-xs">Most common</span>}
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">{description}</p>
      <p className="text-xs text-neutral-500">{identifier}</p>
    </div>
  );
}

// Component: Driver Install Card
function DriverInstallCard({ 
  icon, 
  os, 
  steps, 
  downloadUrl, 
  downloadText,
  note
}: { 
  icon: React.ReactNode; 
  os: string; 
  steps: string[];
  downloadUrl: string;
  downloadText: string;
  note?: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-neutral-900 dark:text-white">{os}</h3>
      </div>
      <ol className="space-y-2 mb-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      {note && (
        <p className="text-xs text-amber-600 dark:text-amber-400 mb-4">{note}</p>
      )}
      <a 
        href={downloadUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-accent-600 dark:text-accent-dark-400 hover:underline"
      >
        {downloadText}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-2 rounded bg-neutral-900 dark:bg-neutral-950 text-neutral-100 text-xs font-mono overflow-x-auto mt-2">
      <code>{code}</code>
    </pre>
  );
}
