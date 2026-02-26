import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Wrench,
  ArrowRight,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Zap,
  Monitor,
  Server
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Troubleshooting',
  description: 'Common issues and solutions for PayDeck.',
};

export default function TroubleshootingPage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-accent-dark-400 font-medium mb-4">
          <Wrench className="w-4 h-4" />
          Maintenance
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
          Troubleshooting
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Common issues and how to resolve them.
        </p>
      </div>

      {/* WiFi Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <WifiOff className="w-6 h-6 text-zinc-400" />
          WiFi Connection Issues
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Can't connect to WiFi"
            solutions={[
              "Verify SSID and password are correct (case-sensitive)",
              "Ensure you're using 2.4GHz network (ESP32 doesn't support 5GHz)",
              "Move closer to the router",
              "Restart the device",
              "Check if router has MAC filtering enabled"
            ]}
          />
          <TroubleshootItem 
            problem="WiFi connects but no internet"
            solutions={[
              "Check router internet connection",
              "Verify no captive portal (hotel/airport WiFi won't work)",
              "Try a different network",
              "Check if firewall is blocking connections"
            ]}
          />
          <TroubleshootItem 
            problem="WiFi disconnects frequently"
            solutions={[
              "Check signal strength (move closer to router)",
              "Reduce interference from other devices",
              "Try a less congested WiFi channel",
              "Check for router firmware updates"
            ]}
          />
        </div>
      </section>

      {/* Server Connection */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Server className="w-6 h-6 text-zinc-400" />
          Rostrum Server Issues
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Can't connect to Rostrum server"
            solutions={[
              "Verify server address is correct",
              "Check if server is online (try in browser or telnet)",
              "Ensure using WSS port (usually 20004)",
              "Try a different public Rostrum server",
              "Check if your network blocks WebSocket connections"
            ]}
          />
          <TroubleshootItem 
            problem="Server connects but no payment detection"
            solutions={[
              "Verify wallet address/xPub is correct",
              "Check if server is fully synced with blockchain",
              "Try a different Rostrum server",
              "Restart the device"
            ]}
          />
          <TroubleshootItem 
            problem="Slow payment detection"
            solutions={[
              "Server may be under load, try another",
              "Check WiFi signal strength",
              "Network latency may be high"
            ]}
          />
        </div>
      </section>

      {/* Display Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Monitor className="w-6 h-6 text-zinc-400" />
          Display Issues
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Screen is blank or white"
            solutions={[
              "Verify correct firmware for your display variant",
              "Check if device is powered (USB connection)",
              "Wait 30 seconds for boot to complete",
              "Try reflashing firmware"
            ]}
          />
          <TroubleshootItem 
            problem="Display colors look wrong"
            solutions={[
              "Verify correct display driver (ST7789 for ESP32-2432S028R)",
              "Check build environment matches your hardware"
            ]}
          />
          <TroubleshootItem 
            problem="Touch not responding"
            solutions={[
              "Clean the screen",
              "Restart the device",
              "Check if touch calibration is needed",
              "Verify firmware includes touch driver"
            ]}
          />
        </div>
      </section>

      {/* Payment Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <Zap className="w-6 h-6 text-zinc-400" />
          Payment Issues
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Payment not detected"
            solutions={[
              "Check Rostrum server connection status",
              "Verify payment was sent to correct address",
              "Wait a few seconds (network propagation)",
              "Check if payment is visible in block explorer",
              "Restart device and reconnect"
            ]}
          />
          <TroubleshootItem 
            problem="Wrong address displayed"
            solutions={[
              "Verify seed phrase/xPub was entered correctly",
              "Check derivation path matches your wallet",
              "Compare first address with your wallet software"
            ]}
          />
          <TroubleshootItem 
            problem="QR code won't scan"
            solutions={[
              "Increase screen brightness",
              "Clean the screen",
              "Ensure customer's camera is focused",
              "Try different scanning angle"
            ]}
          />
        </div>
      </section>

      {/* Boot Issues */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
          <RefreshCw className="w-6 h-6 text-zinc-400" />
          Boot Issues
        </h2>
        
        <div className="space-y-4">
          <TroubleshootItem 
            problem="Device won't boot"
            solutions={[
              "Try different USB cable",
              "Try different USB power source",
              "Hold boot button while connecting power",
              "Try reflashing firmware"
            ]}
          />
          <TroubleshootItem 
            problem="Boot loop (keeps restarting)"
            solutions={[
              "Flash may be corrupted, reflash firmware",
              "Try factory reset if accessible",
              "Use development firmware to diagnose"
            ]}
          />
          <TroubleshootItem 
            problem="Stuck on loading screen"
            solutions={[
              "Wait up to 60 seconds (first boot can be slow)",
              "Check WiFi credentials if trying to connect",
              "Check Rostrum server if trying to sync"
            ]}
          />
        </div>
      </section>

      {/* General Tips */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
          General Tips
        </h2>
        
        <div className="space-y-3">
          <TipItem text="Restart the device - solves many temporary issues" />
          <TipItem text="Check USB cable - some cables are charge-only and won't flash" />
          <TipItem text="Try development firmware first for easier debugging" />
          <TipItem text="Keep firmware updated for bug fixes" />
          <TipItem text="Factory reset as last resort (erases all settings)" />
        </div>
      </section>

      {/* Still Having Issues */}
      <section className="mb-12">
        <div className="p-5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 dark:text-amber-200 mb-2">Still Having Issues?</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mb-2">
                If none of the above solutions work:
              </p>
              <ul className="text-sm text-amber-800 dark:text-amber-300 space-y-1">
                <li>• Check GitLab issues for similar problems</li>
                <li>• Open a new issue with detailed description</li>
                <li>• Include firmware version and hardware model</li>
                <li>• Describe steps to reproduce the problem</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Need to start fresh?
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Factory reset erases all settings and lets you start over.
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

// Component: Troubleshoot Item
function TroubleshootItem({ problem, solutions }: { problem: string; solutions: string[] }) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium text-zinc-900 dark:text-white mb-3">{problem}</h4>
      <ul className="space-y-1">
        {solutions.map((solution, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0 mt-0.5" />
            {solution}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Tip Item
function TipItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <CheckCircle2 className="w-4 h-4 text-accent-500 dark:text-accent-dark-500 flex-shrink-0" />
      <p className="text-sm text-zinc-700 dark:text-zinc-300">{text}</p>
    </div>
  );
}
