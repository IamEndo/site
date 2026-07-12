import { DocsArticle } from '../../_components/DocsArticle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Secure & Production Builds',
  description:
    'A complete, honest step-by-step guide to building a hardware-secured PayDeck: real flash encryption, NVS encryption, and Secure Boot V2. This burns one-time eFuses and is irreversible.',
};

export default function ProductionModePage() {
  return (
    <DocsArticle>
      <div className="prose prose-zinc dark:prose-invert max-w-none">
      <h1>Secure &amp; Production Builds</h1>

      <p>
        The <a href="/docs/install/web-flasher">web flasher</a> installs the
        Standard build only. That build is fully functional and protects your
        PIN and settings in software, but it does <strong>not</strong> encrypt
        the flash or lock the device to signed firmware.
      </p>

      <p>
        This page is the complete, honest guide to building a{' '}
        <strong>hardware-secured</strong> device yourself. It cannot be done from
        a browser, and it cannot be done for you, because two things are involved
        that only happen on your own bench:
      </p>

      <ul>
        <li>
          <strong>Burning eFuses.</strong> Flash encryption and Secure Boot flip
          one-time fuses inside the ESP32 on first boot. This is physical and
          permanent — there is no software or hardware way to undo it.
        </li>
        <li>
          <strong>Your own signing key.</strong> Secure Boot only runs firmware
          signed with a private key that <em>you</em> generate and keep. A
          shared, pre-signed image would let anyone holding that key sign
          malicious firmware your device would trust — so no such image exists.
        </li>
      </ul>

      <div className="my-6 p-4 rounded-sm border-l-4 border-red-500 bg-red-50 dark:bg-red-950/30">
        <p className="font-semibold text-red-800 dark:text-red-200 mb-1">
          ⚠️ The production step is permanent and irreversible
        </p>
        <p className="text-red-700 dark:text-red-300 text-sm m-0">
          Once you flash and boot the <code>esp32dev-idf-release</code> build,
          the device can never be reflashed, debugged over JTAG, or returned to a
          normal state. Read this whole page first, and prove everything works on
          a board you can afford to dedicate.
        </p>
      </div>

      <h2>Do you even need this?</h2>

      <p>
        PayDeck is a <strong>watch-only</strong> terminal — it never holds
        private keys and cannot move funds. Even if someone reflashed or stole a
        Standard device, they could not spend your money. The realistic asset a
        secure build protects is <strong>privacy</strong>: the extended public
        key and receiving addresses stored in flash, plus WiFi credentials.
      </p>

      <p>Build a secure device when:</p>
      <ul>
        <li>The device is deployed somewhere physically untrusted.</li>
        <li>You want firmware that cannot be silently swapped or tampered with.</li>
        <li>You need at-rest confidentiality of settings and addresses.</li>
      </ul>
      <p>
        For personal use where you control physical access, the Standard build is
        genuinely fine.
      </p>

      <h2>The two secure build environments</h2>

      <p>
        PayDeck&apos;s <code>platformio.ini</code> defines these builds. The
        secure ones are built with Arduino as an ESP-IDF component, so the
        bootloader is compiled from source with the security features actually
        enabled.
      </p>

      <table>
        <thead>
          <tr>
            <th>Environment</th>
            <th>Flash&nbsp;Enc.</th>
            <th>Secure&nbsp;Boot</th>
            <th>Reflashable</th>
            <th>Hardware</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>esp32dev-hspi-st7789-2v8</code></td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>Any ESP32</td>
          </tr>
          <tr>
            <td><code>esp32dev-idf</code></td>
            <td>No</td>
            <td>No</td>
            <td>Yes</td>
            <td>Any ESP32</td>
          </tr>
          <tr>
            <td><code>esp32dev-idf-secure</code></td>
            <td>Yes (dev mode)</td>
            <td>No</td>
            <td>Limited</td>
            <td>Any ESP32</td>
          </tr>
          <tr>
            <td><code>esp32dev-idf-release</code></td>
            <td><strong>Yes (permanent)</strong></td>
            <td><strong>V2 (RSA-3072)</strong></td>
            <td><strong>Never</strong></td>
            <td>Chip rev ≥ 3.0 (ECO3)</td>
          </tr>
        </tbody>
      </table>

      <p>
        <code>esp32dev-idf-secure</code> uses flash-encryption{' '}
        <em>Development</em> mode: it really encrypts the flash, but keeps a
        limited number of re-flashes and leaves JTAG usable, so you can test.
        <code>esp32dev-idf-release</code> is the real seal.
      </p>

      <div className="my-6 p-4 rounded-sm border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-amber-700 dark:text-amber-300 text-sm m-0">
          <strong>Building any of these is safe.</strong> Only{' '}
          <em>flashing and powering on</em> the <code>-secure</code> /{' '}
          <code>-release</code> images burns eFuses.
        </p>
      </div>

      <h2>Step 1 — Prove the app in Standard mode</h2>

      <p>
        First make sure everything works with no security in the way. Flash the
        Standard build and complete a full run: WiFi, Rostrum connection, wallet
        setup, a real payment, and a factory reset.
      </p>

      <pre>pio run -e esp32dev-hspi-st7789-2v8 -t upload{'\n'}pio device monitor</pre>

      <h2>Step 2 — Test the secure stack (reversible)</h2>

      <p>
        Now prove flash encryption works, on a board you can dedicate. The first
        boot of this image encrypts the flash in place and burns dev-mode eFuses.
        Development mode keeps the board re-flashable, so this is the safe place
        to shake out problems.
      </p>

      <pre>pio run -e esp32dev-idf-secure -t upload</pre>

      <p>
        Let the first boot finish (1–2 minutes, do not cut power). Then confirm
        the flash is genuinely ciphertext — dump the NVS region and check it has
        no readable strings and high entropy:
      </p>

      <pre>{`# Read back part of flash and inspect it
esptool.py --port /dev/ttyUSB0 read_flash 0xe000 0x5000 nvs.bin
strings nvs.bin        # should show nothing meaningful
# High-entropy, unreadable bytes = encryption is working.`}</pre>

      <div className="my-6 p-4 rounded-sm border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-amber-700 dark:text-amber-300 text-sm m-0">
          <strong>Stop here if all you want is at-rest encryption</strong> on a
          board you still control. The permanent Secure Boot seal below is only
          for devices you are deploying and never want to touch again.
        </p>
      </div>

      <h2>Step 3 — Check your chip revision</h2>

      <p>
        Secure Boot V2 (the RSA scheme PayDeck uses) requires ESP32 silicon
        revision <strong>3.0 or newer</strong> (&ldquo;ECO3&rdquo;). Check yours:
      </p>

      <pre>esptool.py --port /dev/ttyUSB0 chip_id</pre>

      <p>
        Look for <code>Chip is ESP32-D0WD-V3 (revision v3.x)</code>. If your chip
        is older than rev 3.0, you can still use{' '}
        <code>esp32dev-idf-secure</code> (flash encryption), but not the Secure
        Boot V2 production seal.
      </p>

      <h2>Step 4 — Generate your signing key</h2>

      <p>
        This RSA-3072 private key is the <strong>permanent root of trust</strong>{' '}
        for every device you seal. Keep it offline. If you lose it you can never
        sign a replacement image; if it leaks, anyone can sign firmware your
        devices will trust. PayDeck reads it from{' '}
        <code>../secure_keys/</code> — outside the repository — and{' '}
        <code>.gitignore</code> also blocks <code>*.pem</code>, so it can never be
        committed by accident.
      </p>

      <pre>{`mkdir -p ../secure_keys
espsecure.py generate_signing_key \\
  --version 2 --scheme rsa3072 ../secure_keys/sbv2_signing.pem
chmod 600 ../secure_keys/sbv2_signing.pem`}</pre>

      <h2>Step 5 — Build and flash the production seal (one time)</h2>

      <p>
        The build auto-signs the bootloader and app with your key. Flashing is the
        last time USB flashing will ever work on this board.
      </p>

      <pre>{`pio run -e esp32dev-idf-release            # builds + signs
pio run -e esp32dev-idf-release -t upload  # POINT OF NO RETURN`}</pre>

      <div className="my-6 p-4 rounded-sm border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-950/30">
        <p className="text-amber-700 dark:text-amber-300 text-sm m-0">
          <strong>Critical:</strong> the first boot takes 1–2 minutes and{' '}
          <strong>must not lose power</strong>. Interrupting it can permanently
          brick the device.
        </p>
      </div>

      <p>On that first boot, the firmware:</p>
      <ol>
        <li>Enables Secure Boot V2, burning your key&apos;s digest and the <code>ABS_DONE_1</code> fuse.</li>
        <li>Generates a unique flash-encryption key into read-protected eFuse.</li>
        <li>Encrypts all flash contents, including the NVS keys.</li>
        <li>Disables JTAG and UART-download decryption forever.</li>
        <li>Reboots into the now-sealed system.</li>
      </ol>

      <h2>Step 6 — Verify the seal</h2>

      <pre>espefuse.py --port /dev/ttyUSB0 summary</pre>

      <p>You should see:</p>
      <ul>
        <li><code>FLASH_CRYPT_CNT</code> — all bits set (release mode)</li>
        <li><code>ABS_DONE_1</code> = 1 (Secure Boot V2 enabled)</li>
        <li><code>JTAG_DISABLE</code> = 1</li>
        <li><code>DISABLE_DL_DECRYPT</code> = 1 and <code>DISABLE_DL_CACHE</code> = 1</li>
        <li><code>BLOCK1</code> read-protected (flash-encryption key unreadable)</li>
        <li><code>BLOCK2</code> holding your Secure Boot public-key digest</li>
      </ul>

      <h2>What this protects — and what it doesn&apos;t</h2>

      <p>A sealed device, verified by attacking real hardware, protects against:</p>
      <ul>
        <li>Firmware and settings extraction — a full flash dump is ciphertext with no recoverable master key, PIN, WiFi credentials, or addresses.</li>
        <li>Firmware tampering — the boot ROM refuses any unsigned or modified image; it boot-loops instead of running attacker code.</li>
        <li>JTAG and UART-download attacks — disabled at the fuse level.</li>
      </ul>

      <p>It does <strong>not</strong> protect against:</p>
      <ul>
        <li>Sophisticated physical fault-injection (glitching) with lab equipment and physical possession — the accepted ceiling on classic ESP32.</li>
        <li>Logic bugs in the firmware itself.</li>
        <li>Social engineering, or a lost/leaked signing key.</li>
      </ul>

      <h2>After sealing: recovery options</h2>
      <ul>
        <li><strong>Factory reset</strong> — erases settings, keeps firmware. Still works.</li>
        <li><strong>Firmware updates</strong> — impossible. There is no OTA and USB flashing is locked.</li>
        <li><strong>Bricked device</strong> — not recoverable; replace the board.</li>
      </ul>

      <div className="my-6 p-4 rounded-sm border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30">
        <p className="text-blue-700 dark:text-blue-300 text-sm m-0">
          <strong>Recommendation:</strong> unless you have a specific threat model
          that needs hardware security, the Standard build is the right choice.
          PayDeck&apos;s watch-only design already means your funds are safe even
          if the device is reflashed or stolen.
        </p>
      </div>
      </div>
    </DocsArticle>
  );
}
