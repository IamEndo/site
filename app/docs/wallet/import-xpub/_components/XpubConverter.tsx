"use client";

import * as React from "react";
import { convertXpub, type XpubResult } from "@/lib/xpub";

/**
 * Turns a standard base58 extended public key into the xpub_nexa: string the
 * device accepts. Everything happens in the browser; nothing is sent anywhere.
 */
export function XpubConverter() {
  const [input, setInput] = React.useState("");
  const [result, setResult] = React.useState<XpubResult | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    setCopied(false);
    if (!input.trim()) {
      setResult(null);
      return;
    }
    convertXpub(input).then((r) => {
      if (!cancelled) setResult(r);
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  const copy = async () => {
    if (!result?.ok) return;
    try {
      await navigator.clipboard.writeText(result.paydeckKey);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // Shown in groups of four so it can be typed and checked on the device.
  const grouped = result?.ok
    ? result.paydeckKey.slice("xpub_nexa:".length).replace(/(.{4})(?=.)/g, "$1 ")
    : "";

  return (
    <div className="not-prose p-5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
      <label
        htmlFor="xpub-input"
        className="block text-sm font-medium text-neutral-900 dark:text-white mb-2"
      >
        Extended public key from your wallet (base58, starts with &ldquo;xpub&rdquo;)
      </label>
      <textarea
        id="xpub-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={3}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
        placeholder="xpub6…"
        className="w-full rounded-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 p-3 font-mono text-xs text-neutral-900 dark:text-white break-all"
      />
      <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
        The conversion runs in this browser tab only; the key is not sent anywhere. A public
        key cannot spend funds, but it does reveal all of your receiving addresses.
      </p>

      <div aria-live="polite" className="mt-4">
        {result && !result.ok && (
          <p className="text-sm text-red-700 dark:text-red-400">{result.error}</p>
        )}

        {result?.ok && (
          <div className="space-y-3">
            {!result.isAccountLevel && (
              <p className="text-sm text-amber-800 dark:text-amber-300 p-3 rounded-sm bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                This key is at depth {result.depth}, not at an account level. PayDeck expects the
                account key at m/44&apos;/29223&apos;/0&apos; (depth 3). A key from another level
                converts without error but produces addresses your wallet will not recognise.
              </p>
            )}
            {result.isAccountLevel && (
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Account-level key (depth 3, account {result.account}&apos;). The key itself does
                not say which coin or purpose it belongs to, so make sure it was exported from the
                Nexa account m/44&apos;/29223&apos;/{result.account}&apos;.
              </p>
            )}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                PayDeck format (141 characters)
              </div>
              <code
                data-testid="xpub-output"
                className="block p-3 rounded-sm bg-neutral-900 dark:bg-black text-neutral-100 font-mono text-xs break-all"
              >
                {result.paydeckKey}
              </code>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
                For typing: after &ldquo;xpub_nexa:&rdquo;, in groups of four (the colon is typed too)
              </div>
              <code className="block p-3 rounded-sm bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono text-xs leading-relaxed">
                {grouped}
              </code>
            </div>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center px-4 py-2 rounded-sm bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 text-sm font-medium transition-colors"
            >
              {copied ? "Copied" : "Copy PayDeck key"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
