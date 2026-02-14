import { DocsArticle } from '../../_components/DocsArticle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Production Mode',
  description: 'Understanding PayDeck production mode, permanent flash encryption, secure boot, and eFuse burning. This process is irreversible.',
};

export default function ProductionModePage() {
  return (
    <DocsArticle>
      <h1>Production Mode</h1>
      
      <div className="my-6 p-4 rounded-sm border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30">
        <div className="flex items-start gap-3">
          <div>
            <p className="font-semibold text-red-800 dark:text-red-200 mb-1">⚠️ PERMANENT AND IRREVERSIBLE</p>
            <p className="text-red-700 dark:text-red-300 text-sm m-0">
              Production mode permanently modifies your device's hardware security fuses. Once enabled, 
              the device <strong>cannot be reflashed, debugged, or returned to development mode</strong>. 
              This process burns eFuses which are physically permanent. There is no recovery procedure.
            </p>
          </div>
        </div>
      </div>

      <p>
        Production mode is PayDeck's highest security configuration. It enables hardware-enforced 
        protections that make firmware tampering extremely difficult. This mode is intended for 
        deployed devices where you need absolute assurance that the firmware hasn't been modified.
      </p>

      <h2>What Production Mode Does</h2>

      <h3>Flash Encryption (AES-256)</h3>
      
      <p>
        All data stored in the ESP32's flash memory is encrypted with a device-unique AES-256 key. 
        This key is generated during first boot and stored in eFuses (one-time programmable memory). 
        Even if someone physically removes the flash chip, they cannot read the firmware or data.
      </p>

      <h3>Secure Boot (RSA-3072)</h3>
      
      <p>
        The device verifies the firmware signature on every boot. Only firmware signed with the 
        correct private key (which you control) will run. This prevents an attacker from loading 
        modified firmware onto the device.
      </p>

      <h3>JTAG Permanently Disabled</h3>
      
      <p>
        JTAG is a hardware debugging interface that allows direct access to the processor. In 
        production mode, the JTAG eFuses are burned, physically and permanently disabling this 
        attack vector.
      </p>

      <h3>USB Flashing Disabled</h3>
      
      <p>
        The USB bootloader is disabled. The device cannot be reflashed via USB, even with physical 
        access. Combined with secure boot, this ensures only authorized firmware can run.
      </p>

      <h3>NVS Encryption</h3>
      
      <p>
        The Non-Volatile Storage partition (which stores WiFi credentials, PIN hash, wallet 
        configuration, etc.) is encrypted. Settings cannot be extracted even with physical 
        flash access.
      </p>

      <h2>eFuses Explained</h2>

      <p>
        eFuses are one-time programmable memory cells. Once "burned" (set to 1), they cannot be 
        reset to 0. The ESP32 uses eFuses for:
      </p>

      <ul>
        <li><strong>FLASH_CRYPT_CNT:</strong> Controls flash encryption state</li>
        <li><strong>ABS_DONE_0:</strong> Enables secure boot verification</li>
        <li><strong>JTAG_DISABLE:</strong> Permanently disables JTAG debugging</li>
        <li><strong>FLASH_CRYPT_CONFIG:</strong> Encryption configuration (cannot be changed)</li>
        <li><strong>Key blocks:</strong> Store encryption keys (read-protected)</li>
      </ul>

      <p>
        When these eFuses are burned, they physically alter the silicon. There is no software 
        or hardware procedure to reverse this.
      </p>

      <h2>First Boot Process</h2>

      <div className="my-6 p-4 rounded-sm border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-amber-700 dark:text-amber-300 text-sm m-0">
          <strong>Critical:</strong> The first boot after flashing production firmware takes 
          1-2 minutes. <strong>DO NOT DISCONNECT POWER</strong> during this time. Interrupting 
          the encryption process can permanently brick the device.
        </p>
      </div>

      <p>
        On first boot, the production firmware:
      </p>

      <ol>
        <li>Generates a random flash encryption key</li>
        <li>Burns the encryption key to eFuses (write-protected)</li>
        <li>Encrypts all flash partitions in place</li>
        <li>Burns the flash encryption enable eFuses</li>
        <li>Verifies the secure boot signature</li>
        <li>Burns the secure boot enable eFuses</li>
        <li>Disables JTAG permanently</li>
        <li>Reboots into the now-sealed system</li>
      </ol>

      <p>
        The screen may remain blank or show minimal output during this process. Wait for the 
        device to fully reboot and display the normal UI before considering setup complete.
      </p>

      <h2>Build Environments</h2>

      <p>
        PayDeck's <code>platformio.ini</code> defines three build environments:
      </p>

      <table>
        <thead>
          <tr>
            <th>Environment</th>
            <th>Flash Encryption</th>
            <th>Secure Boot</th>
            <th>Reflashable</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>esp32dev-hspi-st7789-2v8</code></td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td><code>esp32dev-secure-dev</code></td>
            <td>Yes</td>
            <td>Yes</td>
            <td>With keys</td>
          </tr>
          <tr>
            <td><code>esp32dev-secure-prod</code></td>
            <td>Yes (permanent)</td>
            <td>Yes (permanent)</td>
            <td>Never</td>
          </tr>
        </tbody>
      </table>

      <h3>Development Mode</h3>
      
      <p>
        Use <code>esp32dev-hspi-st7789-2v8</code> for testing, development, and normal use. 
        No security features are enabled, and you can reflash the device freely. Since PayDeck 
        operates in watch-only mode and never stores private keys, this mode is secure for 
        most use cases.
      </p>

      <h3>Secure Development Mode</h3>
      
      <p>
        Use <code>esp32dev-secure-dev</code> if you want encryption and secure boot but need 
        to retain the ability to update firmware. You'll need to keep your signing keys safe 
        and use them for all future updates. If you lose the keys, the device becomes 
        permanently locked to the current firmware.
      </p>

      <h3>Production Mode</h3>
      
      <p>
        Use <code>esp32dev-secure-prod</code> only when you're absolutely certain the firmware 
        is ready for permanent deployment. Test extensively in development mode first.
      </p>

      <h2>When to Use Production Mode</h2>

      <p>
        Production mode is appropriate when:
      </p>

      <ul>
        <li>The device will be deployed in a hostile physical environment</li>
        <li>You need assurance against firmware tampering</li>
        <li>Regulatory or compliance requirements mandate hardware security</li>
        <li>You're distributing devices to third parties who shouldn't modify firmware</li>
      </ul>

      <p>
        Production mode is <strong>not necessary</strong> for:
      </p>

      <ul>
        <li>Personal use where you control physical access</li>
        <li>Testing or evaluation</li>
        <li>Situations where you might need firmware updates</li>
        <li>Learning or experimentation</li>
      </ul>

      <h2>Recovery Options</h2>

      <p>
        If a production-mode device encounters problems:
      </p>

      <ul>
        <li><strong>Factory reset:</strong> Erases settings but keeps firmware</li>
        <li><strong>No firmware updates:</strong> Bugs cannot be fixed</li>
        <li><strong>No recovery mode:</strong> Bricked = permanently unusable</li>
        <li><strong>Hardware replacement:</strong> Only option for dead devices</li>
      </ul>

      <div className="my-6 p-4 rounded-sm border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
        <p className="text-blue-700 dark:text-blue-300 text-sm m-0">
          <strong>Recommendation:</strong> Unless you have a specific threat model requiring 
          hardware security, use development mode. PayDeck's watch-only architecture means 
          your funds are safe even if someone reflashes the device: they still can't access 
          your private keys because the device never had them.
        </p>
      </div>

      <h2>Flashing Production Firmware</h2>

      <p>
        If you've decided to proceed with production mode:
      </p>

      <ol>
        <li>
          <strong>Test thoroughly in development mode first</strong>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Ensure WiFi, Rostrum connection, wallet setup, and payments all work correctly.
          </p>
        </li>
        <li>
          <strong>Generate signing keys</strong>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Follow the Espressif secure boot key generation guide. Store keys securely.
          </p>
        </li>
        <li>
          <strong>Build production firmware</strong>
          <pre className="text-sm mt-2">pio run -e esp32dev-secure-prod</pre>
        </li>
        <li>
          <strong>Flash with fresh device</strong>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Use a factory-fresh ESP32. Devices previously used in development mode may have 
            partially-burned eFuses that cause issues.
          </p>
        </li>
        <li>
          <strong>Wait for first boot to complete</strong>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            1-2 minutes with stable power. Do not interrupt.
          </p>
        </li>
        <li>
          <strong>Verify operation</strong>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Complete initial setup and verify all features work before deploying.
          </p>
        </li>
      </ol>

      <h2>Security Considerations</h2>

      <p>
        Production mode protects against:
      </p>

      <ul>
        <li>Firmware extraction and reverse engineering</li>
        <li>Loading malicious firmware</li>
        <li>JTAG-based attacks</li>
        <li>Cold boot attacks on flash contents</li>
      </ul>

      <p>
        Production mode does <strong>not</strong> protect against:
      </p>

      <ul>
        <li>Physical side-channel attacks (power analysis, electromagnetic analysis)</li>
        <li>Sophisticated fault injection attacks</li>
        <li>Attacks on the software itself (bugs in the firmware)</li>
        <li>Social engineering attacks on the user</li>
      </ul>

      <p>
        For most cryptocurrency applications, the greatest risks are user error and software 
        vulnerabilities, not sophisticated hardware attacks. Evaluate your threat model before 
        deciding that production mode is necessary.
      </p>
    </DocsArticle>
  );
}
