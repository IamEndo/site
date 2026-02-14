import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Monitor,
  Download,
  Terminal,
  Usb,
  Clock,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Laptop,
  HardDrive,
  Cpu,
  Info,
  FolderGit2
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Software Setup',
  description: 'Software requirements for building and flashing PayDeck firmware including VS Code, PlatformIO, and USB drivers.',
};

export default function SoftwareSetupPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium mb-4">
          <Download className="w-4 h-4" />
          Getting Started
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Software Setup
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Set up your development environment to build and flash PayDeck firmware. 
          First-time setup takes about 30-45 minutes.
        </p>
      </div>

      {/* Time Estimate */}
      <div className="flex items-center gap-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-12">
        <Clock className="w-5 h-5 text-zinc-400" />
        <div>
          <span className="font-medium text-zinc-900 dark:text-white">Estimated time: </span>
          <span className="text-zinc-600 dark:text-zinc-400">30-45 minutes for first-time setup</span>
        </div>
      </div>

      {/* Required Software */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Required Software
        </h2>
        <div className="space-y-4">
          <SoftwareCard 
            icon={<Monitor className="w-6 h-6" />}
            name="Visual Studio Code"
            description="Free, cross-platform code editor. Serves as the foundation for PlatformIO and provides a user-friendly interface for building firmware."
            downloadUrl="https://code.visualstudio.com"
            downloadText="Download VS Code"
            installTime="5 min"
          />
          <SoftwareCard 
            icon={<Terminal className="w-6 h-6" />}
            name="PlatformIO IDE"
            description="Embedded development platform that handles toolchains, libraries, and board configurations. Installed as a VS Code extension."
            downloadUrl="https://platformio.org/install/ide?install=vscode"
            downloadText="Installation Guide"
            installTime="10-15 min"
            note="First run downloads ~500MB of ESP32 toolchains"
          />
          <SoftwareCard 
            icon={<Usb className="w-6 h-6" />}
            name="USB Drivers"
            description="Required for your computer to communicate with the ESP32 module. Driver depends on your board's USB-to-serial chip (CH340 or CP2102)."
            downloadUrl="/docs/installation/usb-drivers"
            downloadText="Driver Installation"
            installTime="5-10 min"
            isInternal={true}
          />
        </div>
      </section>

      {/* Optional Software */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Optional Software
        </h2>
        <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Git</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                Version control system for cloning the PayDeck repository and staying updated with new releases. 
                You can also download the source code as a ZIP file if you prefer.
              </p>
              <a 
                href="https://git-scm.com/downloads" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
              >
                Download Git
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          System Requirements
        </h2>
        <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-900">
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Requirement</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Minimum</th>
                <th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800">Recommended</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <Laptop className="w-4 h-4" />
                  Operating System
                </td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">Windows 10, macOS 10.15, Linux</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">Latest version</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  RAM
                </td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">4 GB</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">8 GB</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Disk Space
                </td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">2 GB free</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">5 GB free</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                  <Usb className="w-4 h-4" />
                  USB Port
                </td>
                <td className="px-4 py-3 text-zinc-900 dark:text-white">USB 2.0</td>
                <td className="px-4 py-3 text-zinc-500 dark:text-zinc-500">USB 3.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              PlatformIO downloads approximately 500MB-1GB of toolchains on first run. 
              Subsequent builds are much faster since everything is cached.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start Checklist */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Installation Checklist
        </h2>
        <div className="space-y-0">
          <ChecklistItem 
            number={1}
            title="Install VS Code"
            description="Download and run the installer for your operating system"
            link={{ href: "/docs/installation/vscode", text: "Detailed guide" }}
            isLast={false}
          />
          <ChecklistItem 
            number={2}
            title="Install PlatformIO Extension"
            description="Open VS Code, go to Extensions, search 'PlatformIO IDE', and install"
            link={{ href: "/docs/installation/platformio", text: "Detailed guide" }}
            isLast={false}
          />
          <ChecklistItem 
            number={3}
            title="Install USB Drivers"
            description="Install CH340 or CP2102 drivers based on your board variant"
            link={{ href: "/docs/installation/usb-drivers", text: "Detailed guide" }}
            isLast={false}
          />
          <ChecklistItem 
            number={4}
            title="Clone PayDeck Repository"
            description="git clone https://gitlab.com/IamEndo/paydeck.git"
            isLast={false}
          />
          <ChecklistItem 
            number={5}
            title="Connect Your Device"
            description="Plug in the ESP32-2432S028R via USB cable"
            isLast={true}
          />
        </div>
      </section>

      {/* Time Breakdown */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Time Breakdown
        </h2>
        <div className="space-y-2">
          <TimeItem task="VS Code installation" time="5 min" />
          <TimeItem task="PlatformIO installation" time="10-15 min" />
          <TimeItem task="Toolchain download (first run)" time="5-10 min" />
          <TimeItem task="USB driver installation" time="5-10 min" />
          <TimeItem task="Building firmware (first build)" time="5-10 min" />
          <TimeItem task="Flashing to device" time="1-2 min" />
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-4">
          After initial setup, rebuilding and flashing takes under 2 minutes.
        </p>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Ready to install?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Start with VS Code installation, then follow each step in order.
        </p>
        <Link 
          href="/docs/installation/vscode"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
        >
          Install VS Code
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Software Card
function SoftwareCard({ 
  icon, 
  name, 
  description, 
  downloadUrl, 
  downloadText,
  installTime,
  note,
  isInternal
}: { 
  icon: React.ReactNode; 
  name: string; 
  description: string; 
  downloadUrl: string;
  downloadText: string;
  installTime: string;
  note?: string;
  isInternal?: boolean;
}) {
  return (
    <div className="p-5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
            <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
            <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 text-xs">
              {installTime}
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{description}</p>
          {note && (
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-3 italic">{note}</p>
          )}
          {isInternal ? (
            <Link 
              href={downloadUrl}
              className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              {downloadText}
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <a 
              href={downloadUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-green-600 dark:text-green-400 hover:underline"
            >
              {downloadText}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Component: Checklist Item
function ChecklistItem({ 
  number, 
  title, 
  description, 
  link,
  isLast 
}: { 
  number: number; 
  title: string; 
  description: string; 
  link?: { href: string; text: string };
  isLast: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
          {number}
        </div>
        {!isLast && <div className="w-px h-full bg-zinc-200 dark:bg-zinc-800 my-2" />}
      </div>
      <div className="pb-6 flex-1">
        <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {description}
          {link && (
            <>
              {' '}
              <Link href={link.href} className="text-green-600 dark:text-green-400 hover:underline">
                {link.text} →
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Component: Time Item
function TimeItem({ task, time }: { task: string; time: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <span className="text-zinc-600 dark:text-zinc-400">{task}</span>
      <span className="text-zinc-900 dark:text-white font-medium">{time}</span>
    </div>
  );
}
