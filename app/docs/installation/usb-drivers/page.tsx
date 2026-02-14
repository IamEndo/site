import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Usb,
  Download,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  Terminal,
  Apple,
  Search,
  ExternalLink,
  RefreshCw
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'USB Drivers',
  description: 'Install USB-to-serial drivers for ESP32 communication - CH340 or CP2102.',
};

export default function USBDriversPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Download className="w-4 h-4" />
          Installation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          USB Drivers
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          ESP32 modules use USB-to-serial chips to communicate with your computer. 
          Depending on your board variant, you may need to install drivers.
        </p>
      </div>

      {/* Identify Your Chip */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 1: Check If Drivers Are Needed
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
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

        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-800 dark:text-green-300">
              <strong>Device detected?</strong> Skip to <Link href="/docs/installation/building" className="underline">Building Firmware</Link>. 
              If not, continue below to install drivers.
            </p>
          </div>
        </div>
      </section>

      {/* Identify Chip Type */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 2: Identify Your Chip
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
          <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
                <LinuxIcon />
              </div>
              <h3 className="font-semibold text-zinc-900 dark:text-white">Linux</h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
              CH340 drivers are built into the Linux kernel (2.6+). No installation needed.
            </p>
            <p className="text-sm text-zinc-500">
              If your user can't access the port, add yourself to the dialout group:
            </p>
            <CodeBlock code="sudo usermod -a -G dialout $USER" />
            <p className="text-xs text-zinc-500 mt-2">Log out and back in for the change to take effect.</p>
          </div>
        </div>
      </section>

      {/* CP2102 Driver */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          CP2102 Driver Installation
        </h2>

        <div className="p-5 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Silicon Labs provides drivers for all operating systems:
          </p>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-white w-20">Windows:</span>
              <span>Download and run the CP210x VCP installer</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-white w-20">macOS:</span>
              <span>Download the .pkg and install (allow in Security settings)</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="font-medium text-zinc-900 dark:text-white w-20">Linux:</span>
              <span>Usually built-in. Same dialout group fix if needed.</span>
            </div>
          </div>

          <a 
            href="https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium transition-colors text-sm"
          >
            Download CP2102 Drivers
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Verify Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 3: Verify Connection
        </h2>
        
        <div className="space-y-3 mb-6">
          <VerifyStep number={1} text="Disconnect the ESP32 from USB" />
          <VerifyStep number={2} text="Reconnect the device" />
          <VerifyStep number={3} text="Check for a new port (see Step 1 commands above)" />
          <VerifyStep number={4} text="Note the port name (e.g., COM3, /dev/ttyUSB0) for later" />
        </div>

        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-200 mb-1">Success</div>
              <p className="text-sm text-green-800 dark:text-green-300">
                If a port appears when you connect the device, your drivers are working correctly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Drivers working?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Now you're ready to build and flash the PayDeck firmware.
        </p>
        <Link 
          href="/docs/installation/building"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Building Firmware
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: OS Check Card
function OSCheckCard({ icon, os, steps, success }: { icon: React.ReactNode; os: string; steps: string[]; success: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-white">{os}</h3>
      </div>
      <ol className="space-y-1 mb-3">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 font-medium">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <p className="text-xs text-green-600 dark:text-green-400">{success}</p>
    </div>
  );
}

// Component: Chip Card
function ChipCard({ name, description, identifier, common }: { name: string; description: string; identifier: string; common: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${common ? 'border-green-300 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
        {common && <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">Most common</span>}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{description}</p>
      <p className="text-xs text-zinc-500">{identifier}</p>
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
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-semibold text-zinc-900 dark:text-white">{os}</h3>
      </div>
      <ol className="space-y-2 mb-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="w-5 h-5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center text-xs flex-shrink-0">{i + 1}</span>
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
        className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
      >
        {downloadText}
        <ExternalLink className="w-3 h-3" />
      </a>
    </div>
  );
}

// Component: Verify Step
function VerifyStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 pt-0.5">{text}</p>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-2 rounded bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto mt-2">
      <code>{code}</code>
    </pre>
  );
}

// Component: Troubleshoot Item
function TroubleshootItem({ problem, solutions }: { problem: string; solutions: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-2">{problem}</h4>
      <ul className="space-y-1">
        {solutions.map((solution, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400 mt-1">•</span>
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Icon: Windows
function WindowsIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

// Icon: Linux
function LinuxIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.046.134.098.2.166.268.01.009.02.018.034.024-.07.057-.117.07-.176.136a.304.304 0 01-.131.068 2.62 2.62 0 01-.275-.402 1.772 1.772 0 01-.155-.667 1.759 1.759 0 01.08-.668 1.43 1.43 0 01.283-.535c.128-.133.26-.2.418-.2zm1.37 1.706c.332 0 .733.065 1.216.399.293.2.523.269 1.052.468h.003c.255.136.405.266.478.399v-.131a.571.571 0 01.016.47c-.123.31-.516.643-1.063.842v.002c-.268.135-.501.333-.775.465-.276.135-.588.292-1.012.267a1.139 1.139 0 01-.448-.067 3.566 3.566 0 01-.322-.198c-.195-.135-.363-.332-.612-.465v-.005h-.005c-.4-.246-.616-.512-.686-.71-.07-.268-.005-.47.193-.6.224-.135.38-.271.483-.336.104-.074.143-.102.176-.131h.002v-.003c.169-.202.436-.47.839-.601.139-.036.294-.065.466-.065zm2.8 2.142c.358 1.417 1.196 3.475 1.735 4.473.286.534.855 1.659 1.102 3.024.156-.005.33.018.513.064.646-1.671-.546-3.467-1.089-3.966-.22-.2-.232-.335-.123-.335.59.534 1.365 1.572 1.646 2.757.13.535.16 1.104.021 1.67.067.028.135.06.205.067 1.032.534 1.413.938 1.23 1.537v-.002c-.06-.135-.12-.2-.184-.268-.257-.335-.444-.268-.564-.135-.39.401-1.298.536-2.25.469-.665-.135-1.121-.267-1.666-.468-.57-.2-1.128-.464-1.808-.799h-.005l-.049-.025h-.018c-.07-.04-.138-.073-.2-.108l-.062-.045c-.078-.046-.137-.075-.18-.087-.1-.043-.138-.043-.188-.043h-.026c-.188 0-.554.135-.962.4-.467.334-.969.668-1.373.8-.732.2-1.327.066-1.732-.333-.8-.869-1.009-2.534-.623-3.835.387-1.306 1.248-2.402 1.955-3.168.088-.135.136-.2.181-.268.096-.135.18-.27.313-.538.133-.27.36-.599.53-.867.164-.27.29-.4.39-.465.09-.065.136-.065.2-.065.09 0 .2.065.331.198.065.065.155.133.264.268.085.068.192.168.316.401h.002l.052.063v.015c.043.063.088.135.135.198.075.135.112.135.199.135.068 0 .135 0 .2-.065.07-.066.13-.135.195-.2.065-.065.135-.065.26-.065.136 0 .272.065.465.2h.005c.39.27.714.469 1.09.801.4.332.804.668 1.094.935l.052.064v-.003c.126.135.252.2.405.2.116 0 .155-.065.155-.133v-.003z"/>
    </svg>
  );
}
