import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wrench,
  ArrowRight,
  Settings,
  Wifi,
  Server,
  Wallet,
  Lock,
  Monitor,
  Info
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Device Settings',
  description: 'Configure PayDeck settings and preferences.',
};

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wrench className="w-4 h-4" />
          Maintenance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Device Settings
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Configure WiFi, server, wallet, and display settings.
        </p>
      </div>

      {/* Accessing Settings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Accessing Settings
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          To access the settings menu:
        </p>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <ol className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">1.</span>
              From the main screen, tap the settings icon (gear)
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">2.</span>
              Enter your PIN if one is set
            </li>
            <li className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="text-zinc-400 font-medium">3.</span>
              Navigate through settings categories
            </li>
          </ol>
        </div>

        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-300">
              If you forget your PIN, you'll need to perform a factory reset to access settings.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Settings Categories
        </h2>
        
        <div className="space-y-4">
          <SettingCategory 
            icon={<Wifi className="w-5 h-5" />}
            title="WiFi"
            description="Network connection settings"
            items={[
              "Select WiFi network (SSID)",
              "Enter network password",
              "View connection status",
              "Disconnect/reconnect"
            ]}
            href="/docs/setup/wifi"
          />
          
          <SettingCategory 
            icon={<Server className="w-5 h-5" />}
            title="Rostrum Server"
            description="Blockchain server configuration"
            items={[
              "Server address",
              "Port number",
              "Connection status",
              "Switch to different server"
            ]}
            href="/docs/setup/rostrum"
          />
          
          <SettingCategory 
            icon={<Wallet className="w-5 h-5" />}
            title="Wallet"
            description="Payment address configuration"
            items={[
              "View current address/xPub",
              "Change wallet setup",
              "Privacy mode toggle",
              "Address index (privacy mode)"
            ]}
            href="/docs/wallet/options"
          />
          
          <SettingCategory 
            icon={<Lock className="w-5 h-5" />}
            title="Security"
            description="PIN and security settings"
            items={[
              "Set/change PIN",
              "Disable PIN",
              "View security status"
            ]}
            href="/docs/security/pin-setup"
          />
          
          <SettingCategory 
            icon={<Monitor className="w-5 h-5" />}
            title="Display"
            description="Screen preferences"
            items={[
              "Brightness",
              "Screen timeout",
              "Theme preferences"
            ]}
          />
          
          <SettingCategory 
            icon={<Settings className="w-5 h-5" />}
            title="System"
            description="Device information and reset"
            items={[
              "Firmware version",
              "Device information",
              "Factory reset"
            ]}
            href="/docs/maintenance/factory-reset"
          />
        </div>
      </section>

      {/* Changing Settings */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Changing Settings
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Most settings take effect immediately after saving. Some notes:
        </p>

        <div className="space-y-3">
          <NoteItem 
            title="WiFi changes"
            description="Device will disconnect and reconnect to the new network"
          />
          <NoteItem 
            title="Server changes"
            description="May take a few seconds to establish new connection"
          />
          <NoteItem 
            title="Wallet changes"
            description="Requires re-entering seed or xPub for security"
          />
          <NoteItem 
            title="PIN changes"
            description="Requires current PIN to confirm identity"
          />
        </div>
      </section>

      {/* Settings Persistence */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          Settings Storage
        </h2>
        
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Settings are stored in the ESP32's non-volatile storage (NVS):
        </p>

        <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Settings persist across restarts and power cycles
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Factory reset clears all stored settings
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            In production mode, NVS is encrypted
          </li>
          <li className="flex items-start gap-2">
            <span className="text-zinc-400">•</span>
            Reflashing firmware does not erase settings (unless full erase)
          </li>
        </ul>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Need to reset everything?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Factory reset clears all settings and returns device to initial state.
        </p>
        <Link 
          href="/docs/maintenance/factory-reset"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-600 hover:bg-accent-700 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
        >
          Factory Reset
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

// Component: Setting Category
function SettingCategory({ icon, title, description, items, href }: { icon: React.ReactNode; title: string; description: string; items: string[]; href?: string }) {
  const content = (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-zinc-900 dark:text-white">{title}</h4>
          <p className="text-sm text-zinc-500">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 ml-13">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="text-zinc-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

// Component: Note Item
function NoteItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <span className="font-medium text-zinc-900 dark:text-white">{title}</span>
        <span className="text-zinc-500"> - {description}</span>
      </div>
    </div>
  );
}
