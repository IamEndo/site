import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Download,
  Monitor,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Terminal,
  Apple,
  Info
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Installing VS Code',
  description: 'Download and install Visual Studio Code for PayDeck firmware development.',
};

export default function VSCodePage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Download className="w-4 h-4" />
          Installation
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Installing VS Code
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Visual Studio Code is a free, lightweight code editor that serves as our development 
          environment. PlatformIO runs as an extension within VS Code.
        </p>
      </div>

      {/* Download Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Download
        </h2>
        
        <div className="p-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">Visual Studio Code</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Free, open-source code editor by Microsoft</p>
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Installation
        </h2>

        {/* Windows */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
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
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <Apple className="w-5 h-5" />
            macOS
          </h3>
          <div className="space-y-3">
            <InstallStep number={1} text="Open the downloaded .dmg file" />
            <InstallStep number={2} text="Drag Visual Studio Code to the Applications folder" />
            <InstallStep number={3} text="Open VS Code from Applications" />
            <InstallStep number={4} text='If prompted about opening an app from the internet, click "Open"' />
          </div>
          
          <div className="mt-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              <strong>Optional:</strong> To launch VS Code from the terminal, open VS Code, press 
              <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs">Cmd+Shift+P</code>, 
              type "shell command", and select "Install 'code' command in PATH".
            </p>
          </div>
        </div>

        {/* Linux */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <LinuxIcon />
            Linux
          </h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Ubuntu / Debian:</p>
              <CodeBlock code="sudo dpkg -i code_*.deb" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Fedora / RHEL:</p>
              <CodeBlock code="sudo rpm -i code-*.rpm" />
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Snap (any distro):</p>
              <CodeBlock code="sudo snap install code --classic" />
            </div>
          </div>
        </div>
      </section>

      {/* Verify Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Verify Installation
        </h2>
        
        <div className="space-y-3 mb-6">
          <VerifyStep number={1} text="Open VS Code" />
          <VerifyStep 
            number={2} 
            text={
              <>
                Press <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs">Ctrl+Shift+P</code> (Windows/Linux) or 
                <code className="mx-1 px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs">Cmd+Shift+P</code> (macOS)
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
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
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
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          VS Code installed?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
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
  );
}

// Component: OS Card
function OSCard({ icon, name, details, recommended }: { icon: React.ReactNode; name: string; details: string; recommended: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${recommended ? 'border-accent-300 dark:border-accent-dark-700 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-zinc-200 dark:border-zinc-800'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="text-zinc-600 dark:text-zinc-400">{icon}</div>
        <div>
          <div className="font-medium text-zinc-900 dark:text-white">{name}</div>
          {recommended && (
            <span className="text-xs text-accent-600 dark:text-accent-dark-400">Most common</span>
          )}
        </div>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-500">{details}</p>
    </div>
  );
}

// Component: Install Step
function InstallStep({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center text-sm font-medium flex-shrink-0">
        {number}
      </div>
      <p className="text-zinc-600 dark:text-zinc-400 pt-0.5">{text}</p>
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
      <p className="text-zinc-600 dark:text-zinc-400 pt-0.5">{text}</p>
    </div>
  );
}

// Component: Code Block
function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="p-3 rounded-lg bg-zinc-900 dark:bg-zinc-950 text-zinc-100 text-sm font-mono overflow-x-auto">
      <code>{code}</code>
    </pre>
  );
}

// Component: Troubleshoot Item
function TroubleshootItem({ problem, solution }: { problem: string; solution: string }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-2">{problem}</h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{solution}</p>
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
