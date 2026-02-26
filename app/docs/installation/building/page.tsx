import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wrench,
  Download,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Info,
  FolderGit2,
  ExternalLink,
  Clock
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Building Firmware',
  description: 'Clone the PayDeck repository and build firmware using PlatformIO.',
};

export default function BuildingPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wrench className="w-4 h-4" />
          Installation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Building Firmware
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Clone the PayDeck repository, understand the build environments, 
          and flash the firmware to your device.
        </p>
      </div>

      {/* Time Estimate */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-12">
        <Clock className="w-5 h-5 text-zinc-400" />
        <div>
          <span className="font-medium text-zinc-900 dark:text-white">Estimated time: </span>
          <span className="text-zinc-600 dark:text-zinc-400">5-10 minutes (first build), under 1 minute (subsequent)</span>
        </div>
      </div>

      {/* Get Source Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 1: Get the Source Code
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          <OptionCard 
            title="Clone with Git"
            description="Recommended. Allows easy updates."
            recommended={true}
          >
            <CodeBlock code="git clone https://gitlab.com/IamEndo/paydeck.git" />
            <CodeBlock code="cd paydeck" />
          </OptionCard>
          
          <OptionCard 
            title="Download ZIP"
            description="If you don't have Git installed."
            recommended={false}
          >
            <a 
              href="https://gitlab.com/IamEndo/paydeck/-/archive/main/paydeck-main.zip" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium transition-colors text-sm mt-2"
            >
              Download ZIP
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-zinc-500 mt-2">Extract to a folder on your computer</p>
          </OptionCard>
        </div>
      </section>

      {/* Open in VS Code */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 2: Open in VS Code
        </h2>
        
        <div className="space-y-3 mb-6">
          <Step number={1} text="Open Visual Studio Code" />
          <Step number={2} text="File → Open Folder (or Ctrl+K Ctrl+O)" />
          <Step number={3} text='Select the "paydeck" folder you cloned/extracted' />
          <Step number={4} text="Wait for PlatformIO to initialize (watch the bottom status bar)" />
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              PlatformIO may take a minute to scan the project and download dependencies on first open. 
              Wait until the status bar shows "PlatformIO: Ready".
            </p>
          </div>
        </div>
      </section>

      {/* Build Environments */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 3: Understand Build Environments
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          PayDeck includes three build environments with different security levels. 
          For most users, the development environment is recommended.
        </p>

        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Environment</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Security</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Use Case</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr className="bg-accent-50/50 dark:bg-accent-dark-950/20">
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-hspi-st7789-2v8</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Development</td>
                <td className="px-4 py-3 text-accent-600 dark:text-accent-dark-400 text-xs">Recommended for most users</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-secure-dev</td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Secure Development</td>
                <td className="px-4 py-3 text-zinc-500 text-xs">Encrypted, but reflashable</td>
              </tr>
              <tr className="bg-red-50/50 dark:bg-red-950/20">
                <td className="px-4 py-3 font-mono text-xs text-zinc-900 dark:text-white">esp32dev-secure-prod</td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400 font-medium">Production</td>
                <td className="px-4 py-3 text-red-600 dark:text-red-400 text-xs font-medium">PERMANENT - Cannot reflash</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-6">
          <div className="flex gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-red-900 dark:text-red-200 mb-1">⚠️ Production Mode Warning</div>
              <p className="text-sm text-red-800 dark:text-red-300">
                <code className="px-1 py-0.5 rounded bg-red-100 dark:bg-red-900 text-xs">esp32dev-secure-prod</code> is 
                a <strong>point of no return</strong>. After flashing, the device is PERMANENTLY LOCKED. 
                eFuses are burned and the device cannot be reflashed. Only use this for final deployment 
                after thorough testing.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Recommendation:</strong> Use <code className="px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-xs">esp32dev-hspi-st7789-2v8</code> for 
              development and testing. Since PayDeck operates in watch-only mode and never stores private keys, 
              development mode is secure enough for most use cases.
            </p>
          </div>
        </div>
      </section>

      {/* Build Firmware */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 4: Build and Upload
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Use the PlatformIO terminal or command line to build and flash:
        </p>

        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Development mode (recommended):</p>
          <CodeBlock code="pio run -t upload -e esp32dev-hspi-st7789-2v8" />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Secure development (encrypted, reflashable):</p>
          <CodeBlock code="pio run -t upload -e esp32dev-secure-dev" />
        </div>

        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 mb-6">
          <p className="text-sm font-medium text-red-900 dark:text-red-200 mb-2">⚠️ Production mode (POINT OF NO RETURN):</p>
          <CodeBlock code="# After this, device is PERMANENTLY LOCKED
pio run -e esp32dev-secure-prod" />
          <p className="text-xs text-red-700 dark:text-red-300 mt-2">
            Only run this after thorough testing. The device cannot be reflashed after production mode.
          </p>
        </div>

        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          The first build downloads all dependencies and compiles the firmware. This takes 5-10 minutes. 
          Subsequent builds are much faster (under 30 seconds).
        </p>

        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Successful build output:</p>
          <CodeBlock code={`Building .pio/build/esp32dev-hspi-st7789-2v8/firmware.bin
========================= [SUCCESS] =========================
Environment                  Status    Duration
---------------------------  --------  ----------
esp32dev-hspi-st7789-2v8     SUCCESS   00:00:42`} />
        </div>

        <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-accent-800 dark:text-accent-dark-300">
              If you see <code className="px-1 py-0.5 rounded bg-accent-100 dark:bg-accent-dark-900 text-xs">[SUCCESS]</code>, the firmware has been built and uploaded to the device.
            </p>
          </div>
        </div>
      </section>

      {/* Verify Flash */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Step 5: Verify
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          After a successful upload, the device will automatically reset and boot into PayDeck.
        </p>

        <div className="mb-6">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Successful upload output:</p>
          <CodeBlock code={`Writing at 0x00010000... (100 %)
Wrote 1234567 bytes at 0x00010000 in 28.4 seconds
Hard resetting via RTS pin...
========================= [SUCCESS] =========================`} />
        </div>

        <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
          <div className="flex gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Success!</div>
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                You should see the PayDeck welcome screen on the display.
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
            problem="Build fails with missing dependencies"
            solutions={[
              "Ensure Espressif 32 platform is installed (PIO Home > Platforms)",
              "Delete the .pio folder and rebuild",
              "Run 'pio pkg update' to update all packages"
            ]}
          />
          <TroubleshootItem 
            problem="Upload fails or times out"
            solutions={[
              "Check USB connection and try a different port",
              "Hold the BOOT button on the board while starting upload",
              "Verify drivers are installed correctly",
              "Try: pio run -t upload -e esp32dev-hspi-st7789-2v8 --upload-port /dev/ttyUSB0"
            ]}
          />
          <TroubleshootItem 
            problem="Display shows white/blank screen after flash"
            solutions={[
              "Most ESP32 boards use ST7789 driver (default configuration)",
              "Some Chinese variants use a different processor with ILI9341 driver",
              "If display is blank, check platformio.ini for driver configuration",
              "Check serial output for error messages"
            ]}
          />
          <TroubleshootItem 
            problem="'No device found' error"
            solutions={[
              "Ensure USB drivers are installed (see previous page)",
              "Try a different USB cable (must be data cable)",
              "Check Device Manager / ls /dev/tty* for the port",
              "Specify port manually: --upload-port COM3 or --upload-port /dev/ttyUSB0"
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Firmware flashed successfully?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Continue to First Boot to configure your device.
        </p>
        <Link 
          href="/docs/installation/first-boot"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          First Boot
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Option Card
function OptionCard({ title, description, recommended, children }: { title: string; description: string; recommended: boolean; children: React.ReactNode }) {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'border-accent-300 dark:border-accent-dark-700 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
        {recommended && <span className="px-2 py-0.5 rounded bg-accent-100 dark:bg-accent-dark-900/30 text-accent-700 dark:text-accent-dark-300 text-xs">Recommended</span>}
      </div>
      <p className="text-sm text-zinc-500 mb-3">{description}</p>
      {children}
    </div>
  );
}

// Component: Step
function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 pt-0.5">{text}</p>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto">
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
