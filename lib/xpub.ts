// Converts a standard base58 extended public key (BIP32 serialization) into
// the text format PayDeck's firmware accepts:
//   xpub_nexa:<33-byte compressed public key, hex>:<32-byte chain code, hex>
// Pure functions, no dependencies; the checksum uses Web Crypto (browser and Node).

const ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export type XpubResult =
  | {
      ok: true;
      paydeckKey: string;
      depth: number;
      childNumber: number;
      /** true when the key sits at an account level such as m/44'/29223'/0' */
      isAccountLevel: boolean;
      /** hardened account index, when isAccountLevel */
      account: number | null;
    }
  | { ok: false; error: string };

function base58Decode(text: string): Uint8Array | null {
  let value = 0n;
  for (const ch of text) {
    const digit = ALPHABET.indexOf(ch);
    if (digit < 0) return null;
    value = value * 58n + BigInt(digit);
  }
  const bytes: number[] = [];
  while (value > 0n) {
    bytes.unshift(Number(value & 0xffn));
    value >>= 8n;
  }
  for (const ch of text) {
    if (ch !== "1") break;
    bytes.unshift(0);
  }
  return Uint8Array.from(bytes);
}

const toHex = (bytes: Uint8Array) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");

async function sha256(data: Uint8Array): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", data as BufferSource));
}

export async function convertXpub(input: string): Promise<XpubResult> {
  const text = input.trim();
  if (!text) return { ok: false, error: "Paste an extended public key." };
  if (text.startsWith("xpub_nexa:")) {
    return { ok: false, error: "This is already in PayDeck's format." };
  }

  const raw = base58Decode(text);
  if (!raw) return { ok: false, error: "Not a base58 string: it contains characters that base58 does not use." };
  // 78 bytes of payload + 4 bytes of checksum
  if (raw.length !== 82) {
    return { ok: false, error: `Wrong length: an extended key decodes to 82 bytes, this one to ${raw.length}.` };
  }

  const payload = raw.slice(0, 78);
  const check = (await sha256(await sha256(payload))).slice(0, 4);
  if (toHex(check) !== toHex(raw.slice(78))) {
    return { ok: false, error: "Checksum mismatch: the key was mistyped or cut off." };
  }

  const key = payload.slice(45, 78);
  if (key[0] === 0x00) {
    return {
      ok: false,
      error: "This is an extended PRIVATE key. Never enter a private key here or on PayDeck; export the public key instead.",
    };
  }
  if (key[0] !== 0x02 && key[0] !== 0x03) {
    return { ok: false, error: "The key does not contain a compressed public key." };
  }

  const depth = payload[4];
  const childNumber = ((payload[9] << 24) | (payload[10] << 16) | (payload[11] << 8) | payload[12]) >>> 0;
  const hardened = childNumber >= 0x80000000;
  const isAccountLevel = depth === 3 && hardened;

  return {
    ok: true,
    paydeckKey: `xpub_nexa:${toHex(key)}:${toHex(payload.slice(13, 45))}`,
    depth,
    childNumber,
    isAccountLevel,
    account: isAccountLevel ? childNumber - 0x80000000 : null,
  };
}
