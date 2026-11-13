// Downsamples a Radiance .hdr (RGBE) environment map with a box filter.
// The 3D scenes only use these maps for soft reflections at low intensity, so
// a small map is visually equivalent and ~16x lighter than the 1k originals.
// Usage: node scripts/shrink-hdr.mjs <in.hdr> <out.hdr> <factor>
// Sources: pmndrs/drei-assets hdri/potsdamer_platz_1k.hdr and studio_small_03_1k.hdr
// (Poly Haven, CC0), factor 4.
import { readFileSync, writeFileSync } from "node:fs";

const [, , inPath, outPath, factorArg] = process.argv;
const factor = Number(factorArg ?? 4);
const buf = readFileSync(inPath);

// --- header: text lines up to an empty line, then "-Y <h> +X <w>"
let pos = 0;
const readLine = () => {
  const end = buf.indexOf(0x0a, pos);
  const line = buf.toString("latin1", pos, end);
  pos = end + 1;
  return line;
};
if (!readLine().startsWith("#?")) throw new Error("not a Radiance file");
for (let line = readLine(); line !== ""; line = readLine()) {
  if (line.startsWith("FORMAT=") && line !== "FORMAT=32-bit_rle_rgbe") throw new Error("unsupported " + line);
}
const m = readLine().match(/^-Y (\d+) \+X (\d+)$/);
if (!m) throw new Error("unsupported orientation");
const h = Number(m[1]), w = Number(m[2]);

// --- pixels: new-style RLE scanlines -> linear float RGB
const rgb = new Float32Array(w * h * 3);
const scan = new Uint8Array(w * 4);
for (let y = 0; y < h; y++) {
  if (buf[pos] !== 2 || buf[pos + 1] !== 2 || ((buf[pos + 2] << 8) | buf[pos + 3]) !== w) throw new Error("unsupported scanline encoding");
  pos += 4;
  for (let c = 0; c < 4; c++) {
    let x = 0;
    while (x < w) {
      let count = buf[pos++];
      if (count > 128) { count -= 128; scan.fill(buf[pos++], c * w + x, c * w + x + count); }
      else { scan.set(buf.subarray(pos, pos + count), c * w + x); pos += count; }
      x += count;
    }
  }
  for (let x = 0; x < w; x++) {
    const e = scan[3 * w + x];
    const f = e ? Math.pow(2, e - 136) : 0;
    const o = (y * w + x) * 3;
    rgb[o] = scan[x] * f; rgb[o + 1] = scan[w + x] * f; rgb[o + 2] = scan[2 * w + x] * f;
  }
}

// --- box filter
const ow = Math.floor(w / factor), oh = Math.floor(h / factor);
const out = Buffer.alloc(ow * oh * 4);
for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++) {
  let r = 0, g = 0, b = 0;
  for (let dy = 0; dy < factor; dy++) for (let dx = 0; dx < factor; dx++) {
    const o = ((y * factor + dy) * w + x * factor + dx) * 3;
    r += rgb[o]; g += rgb[o + 1]; b += rgb[o + 2];
  }
  const n = factor * factor; r /= n; g /= n; b /= n;
  const max = Math.max(r, g, b), o = (y * ow + x) * 4;
  if (max < 1e-32) continue;
  let e = Math.ceil(Math.log2(max));
  if (max / Math.pow(2, e) >= 1) e++;            // mantissa must stay below 1.0
  const s = 256 / Math.pow(2, e);
  out[o] = Math.min(255, r * s); out[o + 1] = Math.min(255, g * s); out[o + 2] = Math.min(255, b * s); out[o + 3] = e + 128;
}
// Flat (non-RLE) pixel data; a first pixel of (2,2,<128) would be misread as RLE.
if (out[0] === 2 && out[1] === 2 && out[2] < 128) out[0] = 3;
writeFileSync(outPath, Buffer.concat([Buffer.from(`#?RADIANCE\nFORMAT=32-bit_rle_rgbe\n\n-Y ${oh} +X ${ow}\n`, "latin1"), out]));
console.log(`${inPath} ${w}x${h} -> ${outPath} ${ow}x${oh}, ${out.length + 60} bytes`);
