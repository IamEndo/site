// Tests lib/xpub.ts against the BIP32 reference vectors and bad inputs: npm run test:xpub
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const out = ts.transpileModule(readFileSync(new URL("../lib/xpub.ts", import.meta.url), "utf8"), { compilerOptions: { module: "ESNext", target: "ES2022" } }).outputText;
const tmp = join(mkdtempSync(join(tmpdir(), "xpub-")), "xpub.mjs"); writeFileSync(tmp, out);
const { convertXpub } = await import(pathToFileURL(tmp).href);
const cases = [
  // BIP32 test vector 1, chain m
  ["xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet8",
   "xpub_nexa:0339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2:873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d508", 0, false],
  // BIP32 test vector 1, chain m/0'/1/2' (depth 3, hardened child 2')
  ["xpub6D4BDPcP2GT577Vvch3R8wDkScZWzQzMMUm3PWbmWvVJrZwQY4VUNgqFJPMM3No2dFDFGTsxxpG5uJh7n7epu4trkrX7x7DogT5Uv6fcLW5",
   "xpub_nexa:0357bfe1e341d01c69fe5654309956cbea516822fba8a601743a012a7896ee8dc2:04466b9cc8e161e966409ca52986c584f07e9dc81f735db683c3ff6ec7b1503f", 3, true],
];
let fail = 0;
for (const [input, want, depth, acct] of cases) {
  const r = await convertXpub(input);
  const ok = r.ok && r.paydeckKey === want && r.depth === depth && r.isAccountLevel === acct && r.paydeckKey.length === 141;
  console.log(ok ? "PASS" : "FAIL", r.ok ? `${r.paydeckKey.slice(0, 30)}… depth=${r.depth} account=${r.account} len=${r.paydeckKey.length}` : r.error);
  if (!ok) fail++;
}
const bad = [
  ["xprv9s21ZrQH143K3QTDL4LXw2F7HEK3wJUD2nW2nRk4stbPy6cq3jPPqjiChkVvvNKmPGJxWUtg6LnF5kejMRNNU3TGtRBeJgk33yuGBxrMPHi", "PRIVATE"],
  ["xpub661MyMwAqRbcFtXgS5sYJABqqG9YLmC4Q1Rdap9gSE8NqtwybGhePY2gZ29ESFjqJoCu1Rupje8YtGqsefD265TMg7usUDFdp6W1EGMcet9", "Checksum"],
  ["hello world", "base58"], ["xpub_nexa:abc", "already"], ["", "Paste"],
];
for (const [input, word] of bad) {
  const r = await convertXpub(input);
  const ok = !r.ok && r.error.includes(word);
  console.log(ok ? "PASS" : "FAIL", "reject:", r.ok ? "accepted!" : r.error.slice(0, 60));
  if (!ok) fail++;
}
process.exit(fail ? 1 : 0);
