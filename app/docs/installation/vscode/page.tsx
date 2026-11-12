import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { Download, ArrowRight, CheckCircle2, ExternalLink, Apple } from "lucide-react";
import { LinuxIcon, WindowsIcon } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/installation/vscode", {
  title: 'Installing VS Code',
  description: 'Download and install Visual Studio Code for PayDeck firmware development.',
});

export default function VSCodePage() {
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
            Installing VS Code
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Visual Studio Code is a free, lightweight code editor that serves as our development 
            environment. PlatformIO runs as an extension within VS Code.
          </p>
        </div>

        {/* Download Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Download
          </h2>
        
          <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-1">Visual Studio Code</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Free code editor by Microsoft</p>
              </div>
              <a 
                href="https://code.visualstudio.com/download" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors whitespace-nowrap"
              >
                Download VS Code
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <OSCard 
              icon={<WindowsIcon />}
              name="Windows"
              details="User Installer (64-bit)"
              recommended={true}
            />
            <OSCard 
              icon={<Apple className="w-6 h-6" />}
              name="macOS"
              details="Universal (Intel + Apple Silicon)"
              recommended={false}
            />
            <OSCard 
              icon={<LinuxIcon />}
              name="Linux"
              details=".deb, .rpm, or Snap"
              recommended={false}
            />
          </div>
        </section>

        {/* Installation Instructions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Installation
          </h2>

          {/* Windows */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <WindowsIcon />
              Windows
            </h3>
            <div className="space-y-3">
              <InstallStep number={1} text="Run the downloaded installer (VSCodeUserSetup-x64-*.exe)" />
              <InstallStep number={2} text="Accept the license agreement" />
              <InstallStep number={3} text="Choose installation location (default is fine)" />
              <InstallStep number={4} text='Select "Add to PATH" and "Add Open with Code action" (recommended)' />
              <InstallStep number={5} text="Click Install and wait for completion" />
            </div>
          </div>

          {/* macOS */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <Apple className="w-5 h-5" />
              macOS
            </h3>
            <div className="space-y-3">
              <InstallStep number={1} text="Open the downloaded .dmg file" />
              <InstallStep number={2} text="Drag Visual Studio Code to the Applications folder" />
              <InstallStep number={3} text="Open VS Code from Applications" />
              <InstallStep number={4} text='If prompted about opening an app from the internet, click "Open"' />
            </div>
          
            <div className="mt-4 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                <strong>Optional:</strong> To launch VS Code from the terminal, open VS Code, press 
                <code className="mx-1 px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs">Cmd+Shift+P</code>, 
                type "shell command", and select "Install 'code' command in PATH".
              </p>
            </div>
          </div>

          {/* Linux */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
              <LinuxIcon />
              Linux
            </h3>
          
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Ubuntu / Debian:</p>
                <CodeBlock code="sudo dpkg -i code_*.deb" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Fedora / RHEL:</p>
                <CodeBlock code="sudo rpm -i code-*.rpm" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Snap (any distro):</p>
                <CodeBlock code="sudo snap install code --classic" />
              </div>
            </div>
          </div>
        </section>

        {/* Verify Installation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Verify Installation
          </h2>
        
          <div className="space-y-3 mb-6">
            <VerifyStep number={1} text="Open VS Code" />
            <VerifyStep 
              number={2} 
              text={
                <>
                  Press <code className="mx-1 px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs">Ctrl+Shift+P</code> (Windows/Linux) or 
                  <code className="mx-1 px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-xs">Cmd+Shift+P</code> (macOS)
                </>
              } 
            />
            <VerifyStep number={3} text='Type "About" and select "About"' />
            <VerifyStep number={4} text="Version information should appear" />
          </div>

          <div className="p-4 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
            <div className="flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-accent-600 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-accent-900 dark:text-accent-dark-200 mb-1">Success</div>
                <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                  If you see the version dialog, VS Code is installed correctly. You're ready to install PlatformIO.
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
              problem="VS Code won't open on macOS"
              solution='Right-click the app and select "Open", then click "Open" in the dialog. This bypasses Gatekeeper for unverified apps.'
            />
            <TroubleshootItem 
              problem="'code' command not found in terminal"
              solution='Open VS Code, press Cmd+Shift+P (macOS) or Ctrl+Shift+P (Windows/Linux), type "shell command", and select "Install code command in PATH".'
            />
            <TroubleshootItem 
              problem="Installation fails on Windows"
              solution="Try running the installer as Administrator. Right-click the installer and select 'Run as administrator'."
            />
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            VS Code installed?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Next, install the PlatformIO extension to set up your ESP32 development environment.
          </p>
          <Link 
            href="/docs/installation/platformio"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
          >
            Install PlatformIO
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: OS Card
function OSCard({ icon, name, details, recommended }: { icon: React.ReactNode; name: string; details: string; recommended: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'border-accent-300 dark:border-accent-dark-700 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-neutral-200 dark:border-neutral-800'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-neutral-600 dark:text-neutral-400">{icon}</div>
        <div>
          <div className="font-medium text-neutral-900 dark:text-white">{name}</div>
          {recommended && (
            <span className="text-xs text-accent-600 dark:text-accent-dark-400">Most common</span>
          )}
        </div>
      </div>
      <p className="text-sm text-neutral-500 dark:text-neutral-500">{details}</p>
    </div>
  );
}

// Component: Install Step
function InstallStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 pt-0.5">{text}</p>
    </div>
  );
}

// Component: Verify Step
function VerifyStep({ number, text }: { number: number; text: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-dark-900/30 text-accent-600 dark:text-accent-dark-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 pt-0.5">{text}</p>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-3 rounded-lg bg-neutral-900 dark:bg-neutral-950 text-neutral-100 text-sm font-mono overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}

// Component: Troubleshoot Item
function TroubleshootItem({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">{problem}</h4>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{solution}</p>
    </div>
  );
}
