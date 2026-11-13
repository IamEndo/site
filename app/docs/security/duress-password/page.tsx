import { Metadata } from "next";
import Link from "next/link";
import { ShieldAlert, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from "../../_components/DocsArticle";
import { DeviceScreen } from "@/app/_components/ui/DeviceScreen";

export const metadata: Metadata = docsMetadata("/docs/security/duress-password", {
  title: "Duress Password",
  description:
    "An optional second password that factory-wipes PayDeck instead of unlocking it. How to set it, what it erases, and what it does not protect against.",
});

export default function DuressPasswordPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            Security
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Duress Password
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            An optional second password. Typed on the unlock screen, it erases the device
            instead of unlocking it. Available from firmware 0.5.1 and off by default.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            What it is for
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            If someone forces you to unlock the device, you can give them the duress password
            instead of the real one. The device then wipes itself and restarts into the
            first-run setup wizard, exactly as it does after a factory reset. Your wallet
            configuration, settings and payment history are gone from the device.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            PayDeck is watch-only, so there are never funds on the device to protect. What
            the duress password protects is information that someone could read off the
            unlocked device: your receiving addresses, your payment history, and your Wi-Fi
            and server settings. It protects against a person using the screen, not against
            a person taking the device apart (see Limits).
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Setting it up
          </h2>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10">
            <ol className="flex-1 space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed list-decimal pl-5 marker:text-neutral-400">
              <li>
                Tap <strong className="text-neutral-900 dark:text-white">Menu</strong> and unlock
                with your access password.
              </li>
              <li>
                Open <strong className="text-neutral-900 dark:text-white">More settings</strong>,
                then <strong className="text-neutral-900 dark:text-white">Duress password</strong>,
                and confirm the &ldquo;Set duress password?&rdquo; prompt.
              </li>
              <li>
                Type the new duress password, tap{" "}
                <strong className="text-neutral-900 dark:text-white">Next</strong>, type it again
                and tap <strong className="text-neutral-900 dark:text-white">Save</strong>.
              </li>
              <li>
                The row now reads <strong className="text-neutral-900 dark:text-white">On - erases device</strong>.
                To turn it off, tap the row again and confirm &ldquo;Remove duress
                password?&rdquo;.
              </li>
            </ol>
            <div className="flex gap-4 flex-shrink-0">
              <DeviceScreen
                name="settings_duress_on"
                alt="More settings screen with rows Change password, Duress password (On - erases device), Factory reset and Device info"
                caption="More settings with the duress password switched on."
              />
              <DeviceScreen
                name="duresssetup"
                alt="New duress password screen with a masked input field and a phone-style keypad"
                caption="Entered on the same keypad as the access password."
                className="hidden lg:block"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Rules
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Rule ok text="Same rules as the access password: 8 to 128 characters, no simple patterns or common passwords." />
            <Rule ok text="It can be set and removed only while the device is unlocked." />
            <Rule ok={false} text="It must be different from the access password." />
            <Rule ok={false} text="Changing the access password clears the duress password. The device tells you, and you set it again afterwards." />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            What an observer sees
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
            On the screen, nothing gives it away before it fires. The unlock screen, the wait
            after tapping Unlock and the timing are the same whether or not a duress password
            is set, and nothing distinguishes the duress password from the real one until the
            wipe starts. The duress record never contains the device&apos;s master key, so it
            gives no second way into the vault.
          </p>
          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Once it fires, the wipe is obvious: the device restarts into the setup wizard.
            If power is cut in the middle of a wipe, the device finishes the wipe on the
            next start instead of coming back half-erased.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Limits
          </h2>
          <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <ul className="space-y-2 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                <li>
                  On a Standard build it only helps against someone using the screen. Someone
                  who copies the flash chip instead can read the key that derives your
                  receiving addresses, the payment history and the Wi-Fi password without any
                  password, can see that a duress password is set, and can try to guess it
                  offline. Only a sealed production build closes that route.
                </li>
                <li>
                  It erases the device, not the blockchain. Anyone who already knows one of
                  your addresses can still look it up on a block explorer.
                </li>
                <li>
                  The wipe is permanent. You set the device up again from your own backup
                  (seed phrase or xPub), so make sure that backup exists before you
                  rely on this feature.
                </li>
                <li>
                  A wrong guess that is neither password still counts toward the fifteen
                  consecutive wrong attempts after which the device wipes itself anyway.
                </li>
                <li>
                  Do not type it to &ldquo;test&rdquo; it on a device you are using. It works
                  the first time.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Related
          </h3>
          <ul className="space-y-1 text-accent-700 dark:text-accent-dark-400">
            <li><Link className="hover:underline" href="/docs/security/access-password">Access Password</Link></li>
            <li><Link className="hover:underline" href="/docs/maintenance/factory-reset">Factory Reset</Link></li>
            <li><Link className="hover:underline" href="/docs/security/model">Security Model</Link></li>
          </ul>
        </section>
      </div>
    </DocsArticle>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
      {ok ? (
        <CheckCircle2 className="w-5 h-5 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      ) : (
        <XCircle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      )}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{text}</p>
    </div>
  );
}
