import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Download,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Info,
  Package,
  Home,
  Cpu
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Installing PlatformIO',
  description: 'Install the PlatformIO IDE extension in VS Code for ESP32 development.',
};

export default function PlatformIOPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Download className="w-4 h-4" />
          Installation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Installing PlatformIO
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          PlatformIO is an embedded development platform that manages toolchains, libraries, 
          and board configurations. It runs as a VS Code extension.
        </p>
      </div>

      {/* Time Estimate */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-12">
        <Clock className="w-5 h-5 text-zinc-400" />
        <div>
          <span className="font-medium text-zinc-900 dark:text-white">Estimated time: </span>
          <span className="text-zinc-600 dark:text-zinc-400">10-15 minutes (includes toolchain download)</span>
        </div>
      </div>

      {/* Install Extension */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Install the Extension
        </h2>
        
        <div className="space-y-4">
          <InstallStep 
            number={1} 
            title="Open VS Code"
            description="Launch Visual Studio Code on your computer"
          />
          <InstallStep 
            number={2} 
            title="Open Extensions Panel"
            description={
              <>
                Click the Extensions icon in the sidebar, or press 
                <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs">Ctrl+Shift+X</code>
                (Windows/Linux) or
                <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs">Cmd+Shift+X</code>
                (macOS)
              </>
            }
          />
          <InstallStep 
            number={3} 
            title='Search for "PlatformIO IDE"'
            description="Type 'PlatformIO IDE' in the search box"
          />
          <InstallStep 
            number={4} 
            title="Install the Extension"
            description="Click Install on the extension published by PlatformIO (look for the orange logo)"
          />
          <InstallStep 
            number={5} 
            title="Wait for Installation"
            description="The extension will download and install. This may take 2-3 minutes."
          />
          <InstallStep 
            number={6} 
            title="Reload VS Code"
            description="When prompted, click 'Reload' to activate the extension"
          />
        </div>
      </section>

      {/* First Run */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          First Run Setup
        </h2>
        
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-amber-900 dark:text-amber-200 mb-1">First Run Takes Time</div>
              <p className="text-sm text-amber-800 dark:text-amber-300">
                PlatformIO downloads ~500MB of toolchains on first run. This is a one-time process 
                and may take 10-15 minutes depending on your internet speed. Don't interrupt it.
              </p>
            </div>
          </div>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          After VS Code reloads, PlatformIO will initialize. You'll know it's ready when:
        </p>

        <div className="space-y-3">
          <ReadyIndicator 
            icon={<PlatformIOIcon />}
            text="PlatformIO icon appears in the sidebar (alien head logo)"
          />
          <ReadyIndicator 
            icon={<Terminal className="w-4 h-4" />}
            text="Status bar shows PlatformIO commands at the bottom"
          />
          <ReadyIndicator 
            icon={<Home className="w-4 h-4" />}
            text="PlatformIO Home opens when you click the house icon"
          />
        </div>
      </section>

      {/* Install ESP32 Platform */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Install ESP32 Platform
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          PlatformIO needs the Espressif 32 platform to compile code for ESP32 devices:
        </p>

        <div className="space-y-4">
          <InstallStep 
            number={1} 
            title="Open PlatformIO Home"
            description="Click the PlatformIO icon in the sidebar, then click 'PIO Home' > 'Open'"
          />
          <InstallStep 
            number={2} 
            title="Go to Platforms"
            description="In PlatformIO Home, click 'Platforms' in the left sidebar"
          />
          <InstallStep 
            number={3} 
            title='Search for "Espressif 32"'
            description="Type 'Espressif 32' in the search box"
          />
          <InstallStep 
            number={4} 
            title="Install the Platform"
            description="Click on 'Espressif 32' and then click the 'Install' button"
          />
        </div>

        <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              The ESP32 platform includes the Xtensa compiler, ESP-IDF framework, and all tools 
              needed to build firmware. This download is approximately 300MB.
            </p>
          </div>
        </div>
      </section>

      {/* Verify Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Verify Installation
        </h2>
        
        <div className="space-y-3 mb-6">
          <VerifyStep number={1} text="Click the PlatformIO icon in the sidebar" />
          <VerifyStep number={2} text="Click 'PIO Home' > 'Open'" />
          <VerifyStep number={3} text="Click 'Platforms' in the left sidebar" />
          <VerifyStep number={4} text="Click 'Installed' tab" />
          <VerifyStep number={5} text="Confirm 'Espressif 32' appears in the list" />
        </div>

        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-green-900 dark:text-green-200 mb-1">Success</div>
              <p className="text-sm text-green-800 dark:text-green-300">
                If Espressif 32 is listed under Installed platforms, PlatformIO is ready for ESP32 development.
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
            problem="PlatformIO won't install"
            solutions={[
              "Ensure VS Code is updated to the latest version",
              "Try disabling other extensions temporarily",
              "Check your internet connection",
              "Restart VS Code and try again"
            ]}
          />
          <TroubleshootItem 
            problem="Toolchain download fails or stalls"
            solutions={[
              "Check firewall or proxy settings",
              "Try using a VPN if downloads are blocked",
              "Delete the PlatformIO cache and reinstall"
            ]}
          />
          <TroubleshootItem 
            problem="PlatformIO icon doesn't appear"
            solutions={[
              "Wait a few minutes for initialization to complete",
              "Reload VS Code (Ctrl+Shift+P > 'Reload Window')",
              "Uninstall and reinstall the extension"
            ]}
          />
        </div>

        <div className="mt-6 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h4 className="font-medium text-zinc-900 dark:text-white mb-2">Reset PlatformIO</h4>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            If PlatformIO is completely broken, you can reset it by deleting the cache folder:
          </p>
          <div className="space-y-2">
            <div>
              <span className="text-xs text-zinc-500">Windows:</span>
              <CodeBlock code="rmdir /s %USERPROFILE%\.platformio" />
            </div>
            <div>
              <span className="text-xs text-zinc-500">macOS / Linux:</span>
              <CodeBlock code="rm -rf ~/.platformio" />
            </div>
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            After deleting, restart VS Code. PlatformIO will re-download everything.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          PlatformIO ready?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Next, install USB drivers so your computer can communicate with the ESP32.
        </p>
        <Link 
          href="/docs/installation/usb-drivers"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          USB Drivers
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Install Step
function InstallStep({ number, title, description }: { number: number; title: string; description: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
    </div>
  );
}

// Component: Ready Indicator
function ReadyIndicator({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
        {icon}
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{text}</p>
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
    <pre className="p-2 rounded bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto">
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

// Icon: PlatformIO (alien head)
function PlatformIOIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 2c6.627 0 12 5.373 12 12s-5.373 12-12 12S4 22.627 4 16 9.373 4 16 4zm-4 6a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4zm-8 8h8v2H12v-2z"/>
    </svg>
  );
}
