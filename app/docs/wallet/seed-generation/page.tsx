import { Metadata } from 'next';
import { docsMetadata } from "@/lib/docs-metadata";
import { DocsArticle } from '../../_components/DocsArticle';
import Link from 'next/link';
import { Wallet, ArrowRight, CheckCircle2, AlertTriangle, Info, Fingerprint, PenLine, ShieldCheck, Clock, EyeOff, XCircle } from "lucide-react";
import { StatCard, Step } from "../../_components/DocsBlocks";

export const metadata: Metadata = docsMetadata("/docs/wallet/seed-generation", {
  title: 'Generating a Seed',
  description: 'Create a new 12- or 24-word BIP39 seed phrase on PayDeck from human tap entropy.',
});

export default function SeedGenerationPage() {
  return (
    <DocsArticle>
      <div className="max-w-4xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-accent-700 dark:text-accent-dark-400 font-medium mb-4">
            <Wallet className="w-4 h-4" />
            Wallet
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white tracking-tight mb-6">
            Generating a Seed
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Generate a new 12- or 24-word BIP39 seed phrase for privacy-preserving payments. 
            This is the recommended setup for most users.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <StatCard icon={<Clock className="w-5 h-5" />} label="Setup Time" value="3-5 min" />
          <StatCard icon={<Fingerprint className="w-5 h-5" />} label="Entropy" value="Tap until full" />
          <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Privacy" value="Full" />
        </div>

        {/* How It Works */}
        <section className="mb-12">
          <div className="p-5 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-blue-900 dark:text-blue-200 mb-1">How It Works</div>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  PayDeck generates your seed phrase, displays it <strong>once</strong> for you to write down, 
                  then derives the public keys (xPub) needed for address generation. The seed is then 
                  <strong> immediately erased from memory</strong>. PayDeck never stores your seed or private keys.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Isolated Environment */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Isolated Environment
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            During seed generation, PayDeck creates a secure, isolated environment:
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                <strong>WiFi disabled</strong> during seed creation
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                <strong>No computer required</strong> - any USB power works
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                <strong>WiFi switched off</strong> while you tap; seed erased before the restart
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
              <CheckCircle2 className="w-4 h-4 text-accent-700 dark:text-accent-dark-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-accent-800 dark:text-accent-dark-300">
                <strong>Watch-only</strong> - no private keys stored
              </p>
            </div>
          </div>

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            PayDeck has no security chip because it doesn't need one - it never stores wallet secrets (seed, passphrase or private keys). 
            Only your xPub (public keys) remains after setup.
          </p>
        </section>

        {/* Before You Begin */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Before You Begin
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Prepare the following before starting:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <PrepareCard 
              icon={<PenLine className="w-5 h-5" />}
              title="Paper & Pen"
              description="To write down your 12 or 24 seed words"
            />
            <PrepareCard 
              icon={<EyeOff className="w-5 h-5" />}
              title="Privacy"
              description="Ensure no cameras or people can see your screen"
            />
            <PrepareCard 
              icon={<Clock className="w-5 h-5" />}
              title="Time"
              description="3-5 minutes of uninterrupted focus"
            />
          </div>

          <div className="p-5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <div className="flex gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-900 dark:text-red-200 mb-2">Critical Warning</div>
                <p className="text-sm text-red-800 dark:text-red-300 mb-2">
                  Your seed phrase will be shown <strong>only once</strong>. After you verify it and
                  answer the passphrase question, PayDeck derives the public key, erases the seed
                  and restarts. If you don't write it down correctly:
                </p>
                <ul className="space-y-1 text-sm text-red-800 dark:text-red-300">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    You cannot recover it from the device
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    No support can help retrieve a lost seed
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    You will lose access to all received payments
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Setup Steps
          </h2>
        
          <div className="space-y-4">
            <Step 
              number={1} 
              title="Select Create Wallet"
              description="From the Set up wallet screen (or Wallet settings later), choose 'Create wallet', then pick 12 words (easier to back up) or 24 words (maximum margin) and confirm."
            />
          
            <Step 
              number={2} 
              title="Collect Entropy (tap until the ring is full)"
              description="The screen first calibrates the touch sensor, then shows a progress ring labelled in proven bits. Tap all over the screen until it is full, then tap Done."
            >
              <div className="mt-3 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">While tapping:</p>
                <ul className="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Lift your finger and tap; a held finger counts only once
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Taps closer together than a tenth of a second are ignored
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Expect a minute or two; the ring tells you when enough noise is collected
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-neutral-400">•</span>
                    Where and in what rhythm you tap does not change the seed
                  </li>
                </ul>
                <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                    <strong>Tip:</strong> dice can help you spread your taps: divide the screen into 6 zones, roll, tap in that zone. They do not add randomness to the seed, which comes only from sensor noise.
                  </p>
                  <Link href="/docs/wallet/entropy" className="text-xs text-accent-700 dark:text-accent-dark-400 hover:underline">Learn more about entropy →</Link>
                </div>
              </div>
            </Step>
          
            <Step 
              number={3} 
              title="Write Down Your Seed"
              description="Your seed words appear on screen. Write each word carefully, in order and numbered."
            >
              <div className="mt-3 grid sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
                  <p className="text-xs font-medium text-accent-700 dark:text-accent-dark-300 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Do
                  </p>
                  <ul className="space-y-1 text-xs text-accent-800 dark:text-accent-dark-300">
                    <li>• Use pen (not pencil)</li>
                    <li>• Write clearly and legibly</li>
                    <li>• Double-check each word</li>
                    <li>• Number the words</li>
                  </ul>
                </div>
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Don't
                  </p>
                  <ul className="space-y-1 text-xs text-red-800 dark:text-red-300">
                    <li>• Take a photo</li>
                    <li>• Save digitally</li>
                    <li>• Email to yourself</li>
                    <li>• Store in the cloud</li>
                  </ul>
                </div>
              </div>
            </Step>
          
            <Step 
              number={4} 
              title="Verify Your Seed"
              description="PayDeck asks you to re-enter every word, one at a time, to confirm your backup is correct."
            >
              <div className="mt-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  <strong>If you get one wrong:</strong> the device shows &ldquo;Incorrect word&rdquo; and stays on that word, so correct it and continue. Tapping Back discards this seed.
                </p>
              </div>
            </Step>
          
            <Step 
              number={5} 
              title="Setup Complete"
              description="After the last word PayDeck offers an optional passphrase (Skip for a standard wallet, Add for a hidden wallet), derives your public keys (xPub), erases the seed from memory and restarts."
            >
              <div className="mt-3 p-3 rounded-lg bg-accent-50 dark:bg-accent-dark-950/30 border border-accent-200 dark:border-accent-dark-800">
                <p className="text-xs text-accent-800 dark:text-accent-dark-300">
                  <strong>What's stored:</strong> Only your xPub (public keys for address generation). 
                  Private keys and seed phrase are <strong>never</strong> stored on the device.
                </p>
              </div>
            </Step>
          </div>
        </section>

        {/* Seed Storage */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Storing Your Seed Safely
          </h2>
        
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <StorageCard 
              title="Physical Backup"
              items={[
                "Store in a fireproof safe",
                "Consider metal backup (stamped steel)",
                "Make 2-3 copies in different locations",
                "Tell a trusted person where to find it"
              ]}
              good
            />
            <StorageCard 
              title="Never Do This"
              items={[
                "Store on computer, phone, or cloud",
                "Take photos or screenshots",
                "Email or message to yourself",
                "Store with the PayDeck device"
              ]}
              good={false}
            />
          </div>
        </section>

        {/* Recovery */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Recovery
          </h2>
        
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Your seed phrase is the master key to your funds (together with the passphrase, if you added one: the words alone then restore a different, empty wallet). If your PayDeck is lost, stolen, or damaged:
          </p>

          <div className="space-y-3">
            <RecoveryOption 
              title="New PayDeck Device"
              description="Use 'Restore wallet' to restore on a replacement device"
              href="/docs/wallet/import-seed"
            />
            <RecoveryOption 
              title="Wally Wallet (Recommended)"
              description="Full-featured mobile wallet for iOS and Android. Manage funds, view history, send payments."
              href="/docs/wallet/verification"
            />
            <RecoveryOption
              title="Other Wallets"
              description="Also works with Otoplo and any BIP39-compatible wallet"
            />
          </div>

          <div className="mt-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your seed phrase follows the BIP39 and BIP44 standards with Nexa's path m/44'/29223'/0', so you're not locked into PayDeck. A recovery wallet must support that path and, if you added one, BIP39 passphrases.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="p-6 rounded-lg bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-dark-950/30 dark:to-accent-dark-900/30 border border-accent-200 dark:border-accent-dark-800">
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
            Already have a seed phrase?
          </h3>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Import an existing seed or use an xPub from your hardware wallet.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link 
              href="/docs/wallet/import-seed"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent-700 hover:bg-accent-800 dark:bg-accent-dark-600 dark:hover:bg-accent-dark-700 text-white font-medium transition-colors"
            >
              Import Seed
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/docs/wallet/import-xpub"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-medium transition-colors"
            >
              Import xPub
            </Link>
          </div>
        </section>
      </div>
    </DocsArticle>
  );
}

// Component: Prepare Card
function PrepareCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 text-center">
      <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <h4 className="font-medium text-neutral-900 dark:text-white mb-1">{title}</h4>
      <p className="text-xs text-neutral-500 dark:text-neutral-400">{description}</p>
    </div>
  );
}

// Component: Storage Card
function StorageCard({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  return (
    <div className={`p-4 rounded-lg border ${good ? 'border-accent-200 dark:border-accent-dark-800 bg-accent-50/50 dark:bg-accent-dark-950/20' : 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'}`}>
      <h4 className={`font-medium mb-3 flex items-center gap-2 ${good ? 'text-accent-700 dark:text-accent-dark-300' : 'text-red-700 dark:text-red-300'}`}>
        {good ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
        {title}
      </h4>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${good ? 'text-accent-800 dark:text-accent-dark-300' : 'text-red-800 dark:text-red-300'}`}>
            <span className={good ? 'text-accent-500 dark:text-accent-dark-500' : 'text-red-500'}>•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Recovery Option
function RecoveryOption({ title, description, href }: { title: string; description: string; href?: string }) {
  const content = (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-accent-300 dark:hover:border-accent-dark-700 transition-colors">
      <div>
        <h4 className="font-medium text-neutral-900 dark:text-white">{title}</h4>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>
      {href && <ArrowRight className="w-4 h-4 text-neutral-400" />}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
