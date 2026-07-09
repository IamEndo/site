"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────
// World scale & constants
// ─────────────────────────────────────────────────────────────────────
const SCALE = 0.013;
const mm = (n: number) => n * SCALE;

const PCB_W = 86;
const PCB_H = 50.5;
const PCB_T = 1.6;

// ─────────────────────────────────────────────────────────────────────
// Component layout — single source of truth for BOTH the baked texture
// and the 3D meshes. Landscape frame: +X = ESP end (top in portrait),
// -X = USB edge (bottom in portrait), -Z = right edge in portrait.
//
// Placement follows the official Jingcai "Interface Description" diagram
// (ESP32-2432S028 spec PDF): ESP module flush at the ESP end with the
// antenna toward +Z; P3/CN1/TF on the -Z edge; micro-USB, USB-C and P1
// on the -X edge; Speak + BOOT/RESET on the +Z edge; RGB LED in the
// -Z corner next to the ESP.
// ─────────────────────────────────────────────────────────────────────
// ESP-WROOM-32 module: long axis along X (board length), 25.5 (X) × 18 (Z),
// antenna end OVERHANGING the +X board edge by ~4.5mm — the black tab
// visible from both sides on the real CYD.
const ESP_OVERHANG = 4.5;
const ESP = {
  x: PCB_W / 2 - 25.5 / 2 + ESP_OVERHANG, // 34.75
  z: 0,
  w: 25.5, // X extent (long axis)
  l: 18, // Z extent
  subT: 0.8,
};
const ESP_ANT_LEN = 6.2; // antenna zone at the +X end of the module
// Positions measured off macro photos of the real board back
// (portrait, antenna up: +Z = image-left, -Z = image-right).
const POS = {
  reset: { x: 31.8, z: 20.7 }, // RST above BOOT, inset from the left edge
  boot: { x: 26.7, z: 20.7 },
  ch340: { x: 17, z: 19 }, // U3 USB-UART SOP-16, top-left under the buttons
  amp: { x: 11, z: 16.7 }, // U5 speaker amp SOP-8, below CH340
  u7: { x: -15.9, z: 10.1 }, // U7 SOT-223 LDO — pair above the USB edge
  u1: { x: -15.9, z: 4.0 }, // U1 SOT-223 LDO
  u6: { x: -27.1, z: -8.6 }, // U6 SOP-16, below the TF slot
  u4: { x: 9, z: 1 }, // U4 — unpopulated footprint, center
  rgb: { x: 18, z: -5.5 }, // LED1 RGB 5050, center-right
  q1: { x: -25.8, z: 12.6 },
  q2: { x: -14.2, z: 14.6 },
  q3: { x: -20.2, z: -8.6 },
  q4: { x: -20.2, z: -4.0 },
  d1: { x: -27.5, z: 3 },
  rn2: { x: -10.3, z: 0 },
  s135: { z: -1.3, xs: [-13.5, -16.4, -19.2] }, // S3/S1/S5 through-holes
  p3: { x: 30, z: -23.4 }, // Extended IO 4P, top of the -Z edge
  cn1: { x: 19, z: -23.4 }, // I2C 4P, below P3
  spk: { x: -22, z: 23.4 }, // Speak 2P, +Z edge lower half
  p1: { x: -41.8, z: 13.4 }, // 4P serial (VIN/TX/RX/GND), USB edge
  usbc: { x: -PCB_W / 2 + 9.5 / 2 - 1, z: 2.3 }, // ~1mm proud of the edge
  musb: { x: -PCB_W / 2 + 8 / 2 - 1, z: -5.8 },
  sd: { x: -11.6, z: -PCB_H / 2 + 17 / 2 }, // TF slot flush at -Z edge
};

// SMD passive positions (shared by the baked pad texture and the meshes).
// Clusters follow the real board: photo-measured.
const PASSIVES: [number, number][] = [
  // near the antenna testpoints / buttons (top-left)
  [36, 18], [36, 15], [33, 16.5],
  // R1/C6 on the left edge beside CH340
  [17, 23.5], [14, 23.5],
  // C7/C8 above the amp
  [14.5, 17], [12.5, 17],
  // R9 R8 C10 C11 R4 R7 C12 — column along the left edge
  [7, 21], [5, 21], [3, 21], [1, 21], [-1, 21], [-3, 21], [-5, 21],
  // R19 R15 R36 R17 R20 — column left of P3
  [28.4, -16], [26.7, -16], [25, -16], [23.3, -16], [21.6, -16],
  // R16 under the RGB LED
  [14.6, -4], [14.6, -7],
  // regulator in/out caps: C17 C16 / C3 C2 / C15 / C1
  [-12.5, 11], [-12.5, 9], [-12.5, 5], [-12.5, 3], [-19, 10], [-19, 4],
  // around Q1/Q2
  [-14.5, 12.5], [-16.5, 14.5], [-23.5, 12.6],
  // R14 between Q4/Q3, R12 to their right
  [-20.2, -6.3], [-20.6, -11.5],
  // C14 below U6, misc near USB edge
  [-31.8, -5], [-33, 8], [-35, 8],
  // B1/C9 beside RN2
  [-8, -2], [-12.5, -2.5],
  // USB CC/ESD
  [-38, 2], [-38, -3],
  // near D1
  [-29.5, 6], [-29.5, 4.2],
];

// ─────────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────────
const COLOR = {
  // PCB soldermask — bright saturated CYD yellow (matched to photos)
  pcb: "#e6bc22",
  pcbDeep: "#b08a14",
  pcbHi: "#f6d258",
  pcbCopperGnd: "#a8801c",
  pcbCopperTrace: "#c79525",
  pcbCopperPwr: "#9c731a",
  pcbVia: "#3a280a",
  pcbGndShade: "rgba(140, 100, 12, 0.18)",
  pcbHighShade: "rgba(245, 218, 110, 0.08)",

  // Display / bezel
  bezel: "#0a0a0e",
  bezelHi: "#1c1c22",
  bezelRim: "#22222a",
  screen: "#04040a",
  screenGlow: "#0a1428",

  // Metals
  rfShield: "#a4a8b1",
  rfShieldDark: "#62666e",
  rfShieldDeep: "#3a3d44",
  steel: "#d8dade",
  steelDeep: "#7a7d84",
  gold: "#d6ab3e",
  goldDeep: "#a7821e",
  goldRim: "#e6c466",

  // ICs / black plastics
  ic: "#15151c",
  icDark: "#0b0b10",
  icSilver: "#8b8e96",

  // Plastics
  jstShroud: "#f1ead9",
  jstShroudHi: "#fbf5e8",
  jstShroudShadow: "#c5bda9",
  ffc: "#a87a4a",
  ffcShadow: "#7d5a36",
  ffcGold: "#cca435",

  // LEDs
  ledRed: "#ff2a2a",
  ledRedGlow: "#ff5050",
  ledRgbBody: "#f8f8f4",

  // Misc
  hole: "#0a0a0a",
  foam: "#dccfba",
  silk: "#f4ecd6",
  silkSoft: "rgba(244, 236, 214, 0.85)",
  rubber: "#0f0f12",
  ldrBody: "#2a2a30",
  smdYellow: "#dbcb8a",
  smdBlack: "#15151c",
};

// ─────────────────────────────────────────────────────────────────────
// Composite back-face texture
//
// Baked into a single CanvasTexture and applied to material-3 of the
// PCB BoxGeometry (the -Y face). Layers, bottom-up:
//   0. yellow soldermask base + slight tonal variation
//   1. organic GND copper pour (procedural blobs)
//   2. power rails + signal traces (routed to the REAL component sites)
//   3. vias (gold + dark core)
//   4. gold pads at component pin positions
//   5. silkscreen (outlines + designators + labels)
// ─────────────────────────────────────────────────────────────────────
function usePcbBackComposite(): THREE.CanvasTexture | null {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;

    const W = 4096;
    const H = Math.round((W * PCB_H) / PCB_W);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    const PX = W / PCB_W;
    // Box -Y face UV: canvas (0,0) → world (-PCB_W/2, +PCB_H/2)
    const cx = (xMm: number) => (xMm + PCB_W / 2) * PX;
    const cy = (zMm: number) => (PCB_H / 2 - zMm) * PX;

    // Cheap deterministic PRNG so the texture doesn't reshuffle on every render
    const prng = (seed: number) => {
      const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return ((v % 1) + 1) % 1;
    };

    // ── Layer 0: solder mask base ────────────────────────────────────
    const baseGrad = ctx.createLinearGradient(0, 0, W, H);
    baseGrad.addColorStop(0, COLOR.pcb);
    baseGrad.addColorStop(0.55, COLOR.pcb);
    baseGrad.addColorStop(1, COLOR.pcbDeep);
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = COLOR.pcbGndShade;
    ctx.fillRect(0, 0, W, H);

    // ── Layer 1: organic copper pour (GND fill) ──────────────────────
    ctx.save();
    for (let i = 0; i < 240; i++) {
      const r = prng(i + 13);
      const r2 = prng(i + 97);
      const r3 = prng(i + 211);
      const x = (r * 2 - 1) * (PCB_W / 2 - 2);
      const z = (r2 * 2 - 1) * (PCB_H / 2 - 2);
      const rad = PX * (3 + r3 * 7);
      const grad = ctx.createRadialGradient(cx(x), cy(z), 0, cx(x), cy(z), rad);
      const shade = i % 3 === 0 ? COLOR.pcbHighShade : COLOR.pcbGndShade;
      grad.addColorStop(0, shade);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx(x) - rad, cy(z) - rad, rad * 2, rad * 2);
    }
    ctx.restore();

    // Faint copper grid (45° hatch) suggesting cross-hatched ground pour
    ctx.save();
    ctx.globalAlpha = 0.06;
    ctx.strokeStyle = "#4a3406";
    ctx.lineWidth = PX * 0.12;
    for (let i = -PCB_W; i < PCB_W * 2; i += 1.4) {
      ctx.beginPath();
      ctx.moveTo(cx(i), 0);
      ctx.lineTo(cx(i - PCB_H), H);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx(i), 0);
      ctx.lineTo(cx(i + PCB_H), H);
      ctx.stroke();
    }
    ctx.restore();

    // Slightly brighter mask under the dense routing zones
    const litArea = (
      x: number,
      z: number,
      w: number,
      h: number,
      alpha = 0.05
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = COLOR.pcbHi;
      ctx.fillRect(cx(x) - (w * PX) / 2, cy(z) - (h * PX) / 2, w * PX, h * PX);
      ctx.restore();
    };
    litArea(30, 0, 24, 22);
    litArea(POS.ch340.x, POS.ch340.z, 12, 10);
    litArea(POS.sd.x, POS.sd.z, 16, 12, 0.03);

    // ── Layer 2: traces ──────────────────────────────────────────────
    const trace = (
      pts: [number, number][],
      width: number,
      color = COLOR.pcbCopperTrace
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = PX * width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(cx(pts[0][0]), cy(pts[0][1]));
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(cx(pts[i][0]), cy(pts[i][1]));
      }
      ctx.stroke();
    };

    // 5V: USB-C + micro-USB → LDO pair (U7/U1) near the USB edge
    trace(
      [
        [-42, POS.usbc.z],
        [-32, 3],
        [POS.u1.x - 3, POS.u1.z],
      ],
      1.6,
      COLOR.pcbCopperPwr
    );
    trace(
      [
        [-42, POS.musb.z],
        [-34, -4],
        [-32, 3],
      ],
      1.4,
      COLOR.pcbCopperPwr
    );
    trace(
      [
        [POS.p1.x + 2, POS.p1.z],
        [-34, 10],
        [-32, 3],
      ],
      1.2,
      COLOR.pcbCopperPwr
    );
    // 3V3 out of the LDOs → ESP module + CH340
    trace(
      [
        [POS.u7.x + 3, POS.u7.z],
        [-6, 8],
        [10, 6],
        [ESP.x - ESP.w / 2, 2],
      ],
      1.3,
      COLOR.pcbCopperTrace
    );
    trace(
      [
        [POS.u1.x + 3, POS.u1.z],
        [-8, -2],
        [POS.u6.x + 3, POS.u6.z + 3],
      ],
      0.9,
      COLOR.pcbCopperTrace
    );
    trace(
      [
        [-6, 8],
        [8, 14],
        [POS.ch340.x - 2, POS.ch340.z - 2],
      ],
      0.9,
      COLOR.pcbCopperTrace
    );
    // GND rail along the board
    trace(
      [
        [-40, -3],
        [-15, -3],
        [-15, -8],
        [20, -8],
      ],
      1.7,
      COLOR.pcbCopperPwr
    );

    // USB D+/D- → CH340 (the long run up the board's left side)
    trace(
      [
        [-42, POS.usbc.z + 1],
        [-30, 12],
        [POS.ch340.x - 6, POS.ch340.z - 1],
      ],
      0.45
    );
    trace(
      [
        [-42, POS.usbc.z - 1],
        [-29, 10.5],
        [POS.ch340.x - 6, POS.ch340.z - 2],
      ],
      0.45
    );
    trace(
      [
        [-42, POS.musb.z + 1],
        [-31, 8],
        [-29, 10.5],
      ],
      0.4
    );

    // CH340 TX/RX → ESP UART (short hop at the top-left)
    trace(
      [
        [POS.ch340.x + 3, POS.ch340.z - 2.5],
        [ESP.x - ESP.w / 2 - 2, 10],
        [ESP.x - ESP.w / 2, 8],
      ],
      0.45
    );
    trace(
      [
        [POS.ch340.x + 1, POS.ch340.z - 2.5],
        [ESP.x - ESP.w / 2 - 3, 8.5],
        [ESP.x - ESP.w / 2, 6],
      ],
      0.45
    );

    // ESP IO0 → BOOT, EN → RESET (inset top-left)
    trace(
      [
        [ESP.x - 3, ESP.z + ESP.l / 2 - 2],
        [POS.boot.x + 2, 16],
        [POS.boot.x, POS.boot.z - 2],
      ],
      0.42
    );
    trace(
      [
        [ESP.x - 5, ESP.z + ESP.l / 2 - 3],
        [POS.reset.x - 1, 15],
        [POS.reset.x, POS.reset.z - 2],
      ],
      0.42
    );

    // ESP GPIO → TF card lanes
    for (let i = 0; i < 6; i++) {
      const oz = -4 - i * 1.4;
      trace(
        [
          [ESP.x - ESP.w / 2, oz],
          [8 - i, oz - 2],
          [POS.sd.x + 6 - i * 1.6, -8],
          [POS.sd.x + 6 - i * 1.6, -11],
        ],
        0.4
      );
    }

    // ESP GPIO → LCD pads fan-out (long run down the board center —
    // the display flex solders on the front, traces feed through)
    for (let i = 0; i < 12; i++) {
      const oz = 6 - i * 1.0;
      trace(
        [
          [ESP.x - ESP.w / 2, oz],
          [4 - i * 0.4, oz + 1],
          [-22, (i - 6) * 0.7],
          [-34, (i - 6) * 0.5],
        ],
        0.36
      );
    }

    // ESP → P3 / CN1 (Extended IO + I2C on the -Z edge)
    for (let i = 0; i < 4; i++) {
      trace(
        [
          [ESP.x - 2 - i * 1.6, ESP.z - ESP.l / 2],
          [POS.p3.x + (i - 1.5) * 1.25, -18],
          [POS.p3.x + (i - 1.5) * 1.25, -21],
        ],
        0.4
      );
      trace(
        [
          [ESP.x - ESP.w / 2, -8 - i * 0.8],
          [POS.cn1.x + (i - 1.5) * 1.25, -16],
          [POS.cn1.x + (i - 1.5) * 1.25, -21],
        ],
        0.38
      );
    }

    // U6 → touch lanes + ESP
    for (let i = 0; i < 4; i++) {
      trace(
        [
          [POS.u6.x + (i - 1.5) * 0.8, POS.u6.z - 2],
          [POS.u6.x + (i - 1.5) * 2, -18],
          [-38, -12 - i * 0.6],
        ],
        0.32
      );
      trace(
        [
          [POS.u6.x + 2, POS.u6.z + (i - 1.5) * 0.8],
          [-8, -6 + i],
          [ESP.x - ESP.w / 2, -4 - i],
        ],
        0.34
      );
    }

    // Amp → Speak connector
    trace(
      [
        [POS.amp.x - 2.5, POS.amp.z + 1],
        [POS.spk.x + 4, 20],
        [POS.spk.x + 0.6, 22.5],
      ],
      0.5
    );
    trace(
      [
        [POS.amp.x - 2.5, POS.amp.z - 1],
        [POS.spk.x + 5, 18.5],
        [POS.spk.x - 0.6, 22.5],
      ],
      0.5
    );
    // ESP DAC → amp
    trace(
      [
        [ESP.x - ESP.w / 2, 8],
        [POS.amp.x + 4, 14],
        [POS.amp.x + 2, POS.amp.z],
      ],
      0.45
    );

    // RGB LED lines from ESP
    for (let i = 0; i < 3; i++) {
      trace(
        [
          [ESP.x + 2 + i * 1.5, ESP.z - ESP.l / 2],
          [POS.rgb.x + 4, POS.rgb.z + 1 - i * 1.2],
          [POS.rgb.x + 2.8, POS.rgb.z + 1 - i * 1.2],
        ],
        0.36
      );
    }

    // A few short fan-out stubs for visual density
    for (let i = 0; i < 18; i++) {
      const r = prng(i + 503);
      const r2 = prng(i + 829);
      const x = (r * 2 - 1) * 36;
      const z = (r2 * 2 - 1) * 20;
      const len = 1 + prng(i + 1101) * 2.5;
      const angle = prng(i + 1303) * Math.PI;
      const ex = x + Math.cos(angle) * len;
      const ez = z + Math.sin(angle) * len;
      trace([[x, z], [ex, ez]], 0.3 + prng(i + 91) * 0.15);
    }

    // ── Layer 3: vias ────────────────────────────────────────────────
    const placeVia = (x: number, z: number, r = 0.16) => {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * (r + 0.22), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.gold;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * (r + 0.18), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.pcbVia;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * r, 0, Math.PI * 2);
      ctx.fill();
    };

    const isInsideComponent = (x: number, z: number) => {
      // ESP module footprint
      if (
        Math.abs(x - ESP.x) < ESP.w / 2 + 0.5 &&
        Math.abs(z - ESP.z) < ESP.l / 2 + 0.5
      )
        return true;
      // CH340
      if (Math.abs(x - POS.ch340.x) < 5.5 && Math.abs(z - POS.ch340.z) < 4)
        return true;
      // LDO pair / U6 / amp / buttons
      if (Math.abs(x - POS.u7.x) < 3.5 && Math.abs(z - POS.u7.z) < 3.5)
        return true;
      if (Math.abs(x - POS.u1.x) < 3.5 && Math.abs(z - POS.u1.z) < 3.5)
        return true;
      if (Math.abs(x - POS.u6.x) < 3.5 && Math.abs(z - POS.u6.z) < 6)
        return true;
      if (Math.abs(x - POS.amp.x) < 3.5 && Math.abs(z - POS.amp.z) < 3)
        return true;
      if (Math.abs(x - POS.boot.x) < 3 && Math.abs(z - POS.boot.z) < 4)
        return true;
      if (Math.abs(x - POS.reset.x) < 3 && Math.abs(z - POS.reset.z) < 4)
        return true;
      // unpopulated U4 + RGB LED
      if (Math.abs(x - POS.u4.x) < 3 && Math.abs(z - POS.u4.z) < 4)
        return true;
      if (Math.abs(x - POS.rgb.x) < 3.5 && Math.abs(z - POS.rgb.z) < 3.5)
        return true;
      // TF slot
      if (Math.abs(x - POS.sd.x) < 8.5 && Math.abs(z - POS.sd.z) < 9)
        return true;
      // S3/S1/S5 through-holes
      if (
        Math.abs(z - POS.s135.z) < 2.5 &&
        POS.s135.xs.some((sx) => Math.abs(x - sx) < 2)
      )
        return true;
      // mounting holes
      if (Math.abs(Math.abs(x) - 39) < 3 && Math.abs(Math.abs(z) - 21.25) < 3)
        return true;
      return false;
    };

    for (let i = 0; i < 200; i++) {
      const r1 = prng(i + 5);
      const r2 = prng(i + 137);
      const x = (r1 * 2 - 1) * (PCB_W / 2 - 4);
      const z = (r2 * 2 - 1) * (PCB_H / 2 - 4);
      if (isInsideComponent(x, z)) continue;
      placeVia(x, z, 0.1 + r1 * 0.05);
    }

    // GND stitching vias along board perimeter
    for (let xi = -36; xi <= 36; xi += 3.5) {
      placeVia(xi, 23.5, 0.12);
      placeVia(xi, -23.5, 0.12);
    }
    for (let zi = -22; zi <= 22; zi += 4) {
      placeVia(-41, zi, 0.12);
    }

    // Dense stitching along the ESP module long edges (RF requirement)
    for (let i = 0; i < 12; i++) {
      const sx = ESP.x - ESP.w / 2 + 1 + i * 1.4;
      if (sx > PCB_W / 2 - 1.5) break;
      placeVia(sx, ESP.z + ESP.l / 2 + 0.5, 0.11);
      placeVia(sx, ESP.z - ESP.l / 2 - 0.5, 0.11);
    }

    // ── Layer 4: gold pads ───────────────────────────────────────────
    const goldPad = (xMm: number, zMm: number, w: number, h: number) => {
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(
        cx(xMm) - (w * PX) / 2 - 1,
        cy(zMm) - (h * PX) / 2 - 1,
        w * PX + 2,
        h * PX + 2
      );
      const grad = ctx.createLinearGradient(
        cx(xMm) - (w * PX) / 2,
        cy(zMm) - (h * PX) / 2,
        cx(xMm) + (w * PX) / 2,
        cy(zMm) + (h * PX) / 2
      );
      grad.addColorStop(0, COLOR.goldRim);
      grad.addColorStop(0.5, COLOR.gold);
      grad.addColorStop(1, COLOR.goldDeep);
      ctx.fillStyle = grad;
      ctx.fillRect(
        cx(xMm) - (w * PX) / 2,
        cy(zMm) - (h * PX) / 2,
        w * PX,
        h * PX
      );
    };

    // ESP-WROOM-32 castellation pads along the module's long edges
    // (edges run along X; antenna end overhangs the board so pads stop
    // at the shield end)
    const ESP_PINS = 14;
    const padSpanX = ESP.w - 3 - ESP_ANT_LEN;
    for (let i = 0; i < ESP_PINS; i++) {
      const x = ESP.x - ESP.w / 2 + 1.5 + (i * padSpanX) / (ESP_PINS - 1);
      goldPad(x, ESP.z + ESP.l / 2 - 0.4, 0.55, 1.4);
      goldPad(x, ESP.z - ESP.l / 2 + 0.4, 0.55, 1.4);
    }
    // short-edge pads at the inner (−X) end
    for (let i = 0; i < 8; i++) {
      const z = ESP.z - ESP.l / 2 + 2 + (i * (ESP.l - 4)) / 7;
      goldPad(ESP.x - ESP.w / 2 + 0.4, z, 1.4, 0.55);
    }

    // CH340 SOP-16 — long axis along X, pin rows off the ±Z sides
    for (let i = 0; i < 8; i++) {
      const x = POS.ch340.x - 9 / 2 + 0.7 + (i * (9 - 1.4)) / 7;
      goldPad(x, POS.ch340.z + 4 / 2 + 0.55, 1.0, 0.55);
      goldPad(x, POS.ch340.z - 4 / 2 - 0.55, 1.0, 0.55);
    }

    // LDO pair (U7 + U1, SOT-223): 3 pads toward +Z, tab pad toward -Z
    for (const ldo of [POS.u7, POS.u1]) {
      goldPad(ldo.x - 1.15, ldo.z + 4.6 / 2 + 0.3, 0.7, 0.9);
      goldPad(ldo.x, ldo.z + 4.6 / 2 + 0.3, 0.7, 0.9);
      goldPad(ldo.x + 1.15, ldo.z + 4.6 / 2 + 0.3, 0.7, 0.9);
      goldPad(ldo.x, ldo.z - 4.6 / 2 - 0.5, 3.0, 1.4);
    }

    // U6 SOP-16 — long axis along Z, pin rows off the ±X sides
    for (let i = 0; i < 8; i++) {
      const z = POS.u6.z - 10 / 2 + 0.8 + (i * (10 - 1.6)) / 7;
      goldPad(POS.u6.x + 4 / 2 + 0.55, z, 0.55, 1.0);
      goldPad(POS.u6.x - 4 / 2 - 0.55, z, 0.55, 1.0);
    }

    // Amp SOP-8 — long axis along X, pin rows off the ±Z sides
    for (let i = 0; i < 4; i++) {
      const x = POS.amp.x - 5 / 2 + 0.8 + (i * (5 - 1.6)) / 3;
      goldPad(x, POS.amp.z + 4 / 2 + 0.4, 0.8, 0.5);
      goldPad(x, POS.amp.z - 4 / 2 - 0.4, 0.8, 0.5);
    }

    // U4 — unpopulated SOP footprint, bare gold pads only
    for (let i = 0; i < 6; i++) {
      const z = POS.u4.z - 4 / 2 + 0.4 + (i * (4 - 0.8)) / 5;
      goldPad(POS.u4.x + 1.6, z, 0.9, 0.45);
      goldPad(POS.u4.x - 1.6, z, 0.9, 0.45);
    }

    // S3/S1/S5 — plated through-holes (dark hole + gold annulus)
    for (const sx of POS.s135.xs) {
      ctx.fillStyle = COLOR.gold;
      ctx.beginPath();
      ctx.arc(cx(sx), cy(POS.s135.z), PX * 1.05, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.hole;
      ctx.beginPath();
      ctx.arc(cx(sx), cy(POS.s135.z), PX * 0.62, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny pad-pairs under SMD passives
    const padPair = (x: number, z: number) => {
      goldPad(x - 0.6, z, 0.5, 0.7);
      goldPad(x + 0.6, z, 0.5, 0.7);
    };
    PASSIVES.forEach(([x, z]) => padPair(x, z));

    // Two white testpoint rounds near the antenna (top-left on the photo)
    const round = (x: number, z: number, r: number, color = COLOR.silk) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), r * PX, 0, Math.PI * 2);
      ctx.fill();
    };
    round(39.5, 16.7, 1.05);
    round(39.5, 12.6, 1.05);

    // ── Layer 5: silkscreen ──────────────────────────────────────────
    ctx.fillStyle = COLOR.silk;
    ctx.strokeStyle = COLOR.silk;
    ctx.lineCap = "round";

    // Board name — large, vertical along the left side (reads bottom-up),
    // exactly like the real silkscreen
    ctx.save();
    ctx.translate(cx(-4.3), cy(18.7));
    ctx.rotate(Math.PI / 2);
    ctx.font = `600 ${PX * 3.0}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ESP32-2432S028", 0, 0);
    ctx.restore();

    // Thick white silk ring around the top-left mounting hole (a quirk
    // of the real board's back silkscreen)
    ctx.save();
    ctx.strokeStyle = COLOR.silk;
    ctx.lineWidth = PX * 1.1;
    ctx.beginPath();
    ctx.arc(cx(39), cy(21.25), PX * 2.6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Vendor triangle logo (white, center-left)
    {
      const tx = cx(6);
      const ty = cy(6);
      const s = PX * 3.2;
      ctx.save();
      ctx.fillStyle = COLOR.silk;
      ctx.beginPath();
      ctx.moveTo(tx - s * 0.55, ty - s * 0.5);
      ctx.lineTo(tx + s * 0.55, ty - s * 0.15);
      ctx.lineTo(tx - s * 0.15, ty + s * 0.55);
      ctx.closePath();
      ctx.fill();
      // notch to suggest the stylized swoosh
      ctx.fillStyle = COLOR.pcb;
      ctx.beginPath();
      ctx.moveTo(tx - s * 0.28, ty - s * 0.18);
      ctx.lineTo(tx + s * 0.12, ty - s * 0.05);
      ctx.lineTo(tx - s * 0.12, ty + s * 0.18);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // WEEE crossed-out bin in a circle (below-left of the triangle)
    {
      const ex = cx(1.7);
      const ey = cy(8.6);
      const r = PX * 2.4;
      ctx.save();
      ctx.lineWidth = PX * 0.22;
      ctx.strokeStyle = COLOR.silk;
      ctx.beginPath();
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.stroke();
      // bin body + lid + wheels
      ctx.lineWidth = PX * 0.2;
      ctx.strokeRect(ex - r * 0.32, ey - r * 0.35, r * 0.64, r * 0.75);
      ctx.beginPath();
      ctx.moveTo(ex - r * 0.45, ey - r * 0.35);
      ctx.lineTo(ex + r * 0.45, ey - r * 0.35);
      ctx.stroke();
      // slash across
      ctx.lineWidth = PX * 0.26;
      ctx.beginPath();
      ctx.moveTo(ex - r * 0.75, ey + r * 0.75);
      ctx.lineTo(ex + r * 0.75, ey - r * 0.75);
      ctx.stroke();
      ctx.restore();
    }

    // Designator helper
    const desig = (
      text: string,
      xMm: number,
      zMm: number,
      sz = 0.7,
      rot = 0
    ) => {
      ctx.save();
      ctx.translate(cx(xMm), cy(zMm));
      if (rot) ctx.rotate(rot);
      ctx.font = `${PX * sz}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    desig("U3", POS.ch340.x - 6, POS.ch340.z, 0.55);
    desig("U5", POS.amp.x + 4, POS.amp.z, 0.55);
    desig("U4", POS.u4.x + 3, POS.u4.z + 3.5, 0.55);
    desig("U6", POS.u6.x + 3.5, POS.u6.z + 6.5, 0.55);
    desig("U7", POS.u7.x + 3.2, POS.u7.z + 1.5, 0.55);
    desig("U1", POS.u1.x + 3.2, POS.u1.z + 1.5, 0.55);
    desig("D1", POS.d1.x + 1, POS.d1.z + 2, 0.55);
    desig("LED1", POS.rgb.x + 3.2, POS.rgb.z + 3.2, 0.5);
    desig("RN2", POS.rn2.x - 2.2, POS.rn2.z, 0.45, -Math.PI / 2);
    desig("Q1", POS.q1.x + 1, POS.q1.z + 2.6, 0.5);
    desig("Q2", POS.q2.x + 1, POS.q2.z + 2.6, 0.5);
    desig("Q3", POS.q3.x + 2.6, POS.q3.z, 0.5);
    desig("Q4", POS.q4.x + 2.6, POS.q4.z, 0.5);
    desig("R14", POS.q4.x + 2.6, -6.3, 0.42);

    // RST / BOOT labels to the right of the buttons
    desig("RST", POS.reset.x, POS.reset.z - 4.6, 0.55);
    desig("BOOT", POS.boot.x, POS.boot.z - 4.9, 0.55);

    desig("P3", POS.p3.x + 4, POS.p3.z + 4.5, 0.55);
    desig("CN1", POS.cn1.x + 4, POS.cn1.z + 4.5, 0.55);
    desig("SPEAK", POS.spk.x - 4.2, POS.spk.z - 0.4, 0.6);
    desig("P1", POS.p1.x + 1.5, POS.p1.z + 4.2, 0.55);

    // S3/S1/S5 labels beside their through-holes
    ["S3", "S1", "S5"].forEach((s, i) =>
      desig(s, POS.s135.xs[i], POS.s135.z - 2.2, 0.5)
    );

    // Left column designators beside the passive column
    ["R9", "R8", "C10", "C11", "R4", "R7", "C12"].forEach((s, i) =>
      desig(s, 7 - i * 2, 21 - 2.2, 0.4)
    );
    // C7/C8 pair
    desig("C7", 14.5, 17 - 2, 0.4);
    desig("C8", 12.5, 17 - 2, 0.4);
    // R19/R15/R36/R17/R20 column beside P3
    ["R19", "R15", "R36", "R17", "R20"].forEach((s, i) =>
      desig(s, 28.4 - i * 1.7, -16 + 2.4, 0.4)
    );
    // Regulator caps
    desig("C17", -12.5, 11 + 1.8, 0.38);
    desig("C16", -12.5, 9 - 1.8, 0.38);
    desig("C3", -12.5, 5 + 1.8, 0.38);
    desig("C2", -12.5, 3 - 1.8, 0.38);
    desig("C15", -19, 10 + 1.9, 0.38);
    desig("C1", -19, 4 - 1.9, 0.38);
    desig("C14", -31.8, -5 + 1.9, 0.38);
    desig("R16", 14.6, -4 + 1.9, 0.38);

    // JST pin labels
    ctx.fillStyle = COLOR.silk;
    ctx.font = `${PX * 0.42}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ["GND", "IO35", "IO22", "IO21"].forEach((l, i) =>
      ctx.fillText(l, cx(POS.p3.x + (i - 1.5) * 1.25), cy(POS.p3.z + 3.2))
    );
    ["GND", "IO22", "IO27", "3V3"].forEach((l, i) =>
      ctx.fillText(l, cx(POS.cn1.x + (i - 1.5) * 1.25), cy(POS.cn1.z + 3.2))
    );
    ["SPK+", "SPK−"].forEach((l, i) =>
      ctx.fillText(l, cx(POS.spk.x + (i - 0.5) * 1.25), cy(POS.spk.z - 3.2))
    );
    // VIN/TX/RX/GND stack beside P1, rotated like the real silkscreen
    ["VIN", "TX", "RX", "GND"].forEach((l, i) =>
      desig(l, POS.p1.x + 6.5, POS.p1.z - (i - 1.5) * 1.7, 0.5, -Math.PI / 2)
    );

    // Component bounding outlines
    ctx.strokeStyle = COLOR.silk;
    ctx.lineWidth = PX * 0.07;
    const outline = (x: number, z: number, w: number, h: number) => {
      ctx.strokeRect(
        cx(x) - (w * PX) / 2,
        cy(z) - (h * PX) / 2,
        w * PX,
        h * PX
      );
    };
    outline(ESP.x, ESP.z, ESP.w + 0.8, ESP.l + 0.8);
    outline(POS.ch340.x, POS.ch340.z, 9.5, 6.5);
    outline(POS.amp.x, POS.amp.z, 5.5, 5.5);
    outline(POS.u6.x, POS.u6.z, 6.5, 10.5);
    outline(POS.u7.x, POS.u7.z, 4.0, 5.2);
    outline(POS.u1.x, POS.u1.z, 4.0, 5.2);
    outline(POS.u4.x, POS.u4.z, 4.6, 4.4);
    outline(POS.sd.x, POS.sd.z, 15.5, 17.5);
    outline(POS.rgb.x, POS.rgb.z, 5.6, 5.6);
    outline(POS.boot.x, POS.boot.z, 4.2, 6.6);
    outline(POS.reset.x, POS.reset.z, 4.2, 6.6);

    // Pin-1 corner mark at the ESP module
    const cornerMark = (x: number, z: number, len = 1.0) => {
      ctx.beginPath();
      ctx.moveTo(cx(x), cy(z) - len * PX);
      ctx.lineTo(cx(x), cy(z));
      ctx.lineTo(cx(x) + len * PX, cy(z));
      ctx.stroke();
    };
    ctx.lineWidth = PX * 0.14;
    cornerMark(ESP.x - ESP.w / 2 - 0.8, ESP.z - ESP.l / 2 - 0.8, 1.2);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────────
// Composite front-face texture — the real CYD front is not bare yellow:
// it has silkscreen, pads, traces and the dark adhesive zone under the
// display module. Only the border strips are visible around the TFT.
// ─────────────────────────────────────────────────────────────────────
function usePcbFrontComposite(): THREE.CanvasTexture | null {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 2048;
    const H = Math.round((W * PCB_H) / PCB_W);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    const PX = W / PCB_W;
    const cx = (xMm: number) => (xMm + PCB_W / 2) * PX;
    const cy = (zMm: number) => (PCB_H / 2 - zMm) * PX;
    const prng = (seed: number) => {
      const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return ((v % 1) + 1) % 1;
    };

    // Base mask
    const baseGrad = ctx.createLinearGradient(0, 0, W, H);
    baseGrad.addColorStop(0, COLOR.pcb);
    baseGrad.addColorStop(1, COLOR.pcbDeep);
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, W, H);

    // Copper pour blobs
    for (let i = 0; i < 120; i++) {
      const r = prng(i + 31);
      const r2 = prng(i + 177);
      const rad = PX * (3 + prng(i + 301) * 6);
      const x = (r * 2 - 1) * (PCB_W / 2 - 2);
      const z = (r2 * 2 - 1) * (PCB_H / 2 - 2);
      const grad = ctx.createRadialGradient(cx(x), cy(z), 0, cx(x), cy(z), rad);
      grad.addColorStop(0, i % 3 === 0 ? COLOR.pcbHighShade : COLOR.pcbGndShade);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(cx(x) - rad, cy(z) - rad, rad * 2, rad * 2);
    }

    // Slightly darker rectangle where the display module sits (adhesive zone)
    ctx.fillStyle = "rgba(60, 44, 8, 0.16)";
    ctx.fillRect(cx(-39), cy(25), 70 * PX, 50 * PX);

    // Feed-through traces on the ESP-end margin — a neat parallel bus
    // running from under the display toward the module (like the real
    // fan-out visible on the front)
    ctx.strokeStyle = COLOR.pcbCopperTrace;
    ctx.lineCap = "round";
    ctx.lineWidth = PX * 0.22;
    for (let i = 0; i < 16; i++) {
      const z0 = -15 + i * 1.9;
      ctx.beginPath();
      ctx.moveTo(cx(31.5), cy(z0));
      ctx.lineTo(cx(36), cy(z0));
      ctx.lineTo(cx(38.5), cy(z0 - 1.2));
      ctx.stroke();
    }

    // Vias sprinkled on the visible margins
    for (let i = 0; i < 50; i++) {
      const onEspEnd = i % 2 === 0;
      const x = onEspEnd ? 32 + prng(i + 3) * 9 : -42 + prng(i + 3) * 3;
      const z = (prng(i + 91) * 2 - 1) * 22;
      ctx.fillStyle = COLOR.gold;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.pcbVia;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }

    // Silkscreen bits on the ESP-end margin
    ctx.fillStyle = COLOR.silk;
    ctx.font = `${PX * 1.1}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("2.8", cx(36), cy(20));
    ctx.font = `${PX * 0.7}px ui-monospace, monospace`;
    ctx.fillText("TP1", cx(36), cy(-14));
    ctx.fillText("TP2", cx(36), cy(-18));

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────────
// Procedural roughness map for the PCB back face
// ─────────────────────────────────────────────────────────────────────
function usePcbRoughness(): THREE.CanvasTexture | null {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 1024;
    const H = Math.round((W * PCB_H) / PCB_W);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    ctx.fillStyle = "#9a9a9a";
    ctx.fillRect(0, 0, W, H);

    const prng = (seed: number) => {
      const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return ((v % 1) + 1) % 1;
    };
    for (let i = 0; i < 320; i++) {
      const r = prng(i + 7);
      const r2 = prng(i + 211);
      const sz = 6 + prng(i + 511) * 28;
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = r > 0.5 ? "#7c7c7c" : "#b8b8b8";
      ctx.beginPath();
      ctx.arc(r * W, r2 * H, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────────
// Reusable component primitives
// ─────────────────────────────────────────────────────────────────────

function ICBlock({
  x,
  z,
  w,
  h,
  thick = 1.0,
  color = COLOR.ic,
  pinDot = true,
}: {
  x: number;
  z: number;
  w: number;
  h: number;
  thick?: number;
  color?: string;
  pinDot?: boolean;
}) {
  return (
    <group>
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - thick / 2), mm(z)]}
        castShadow
      >
        <boxGeometry args={[mm(w), mm(thick), mm(h)]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.68}
          metalness={0.0}
          clearcoat={0.08}
          clearcoatRoughness={0.6}
        />
      </mesh>
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - thick - 0.02), mm(z)]}
      >
        <boxGeometry args={[mm(w - 0.4), mm(0.02), mm(h - 0.4)]} />
        <meshStandardMaterial
          color="#26262c"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      {pinDot && (
        <mesh
          position={[
            mm(x - w / 2 + 0.6),
            mm(-(PCB_T / 2) - thick - 0.04),
            mm(z - h / 2 + 0.6),
          ]}
        >
          <cylinderGeometry args={[mm(0.25), mm(0.25), mm(0.05), 14]} />
          <meshStandardMaterial color="#f4f4f4" roughness={0.5} />
        </mesh>
      )}
    </group>
  );
}

function SmdPassive({
  x,
  z,
  color = COLOR.smdBlack,
  size = "0603",
}: {
  x: number;
  z: number;
  color?: string;
  size?: "0603" | "0805" | "1206";
}) {
  const dims =
    size === "0805"
      ? [2.0, 0.55, 1.25]
      : size === "1206"
      ? [3.2, 0.55, 1.6]
      : [1.6, 0.45, 0.8];
  return (
    <mesh position={[mm(x), mm(-(PCB_T / 2) - dims[1] / 2), mm(z)]} castShadow>
      <boxGeometry args={[mm(dims[0]), mm(dims[1]), mm(dims[2])]} />
      <meshPhysicalMaterial
        color={color}
        roughness={0.6}
        metalness={0.03}
        clearcoat={0.08}
        clearcoatRoughness={0.55}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────
// JST PicoBlade connector — visible cream housing + gold pin contacts
// ─────────────────────────────────────────────────────────────────────
function JstConnector({
  x,
  z,
  pins,
  facing = "z-",
}: {
  x: number;
  z: number;
  pins: 2 | 4 | 5;
  facing?: "z-" | "z+" | "x-" | "x+";
}) {
  const PITCH = 1.25;
  const W_pin = pins * PITCH + 1.6;
  const H = 3.6;
  const D = 4.2;
  const yCenter = -(PCB_T / 2) - H / 2;
  let rotY = 0;
  if (facing === "z+") rotY = Math.PI;
  if (facing === "x-") rotY = Math.PI / 2;
  if (facing === "x+") rotY = -Math.PI / 2;

  return (
    <group position={[mm(x), mm(yCenter), mm(z)]} rotation={[0, rotY, 0]}>
      <mesh castShadow>
        <boxGeometry args={[mm(W_pin), mm(H), mm(D)]} />
        <meshPhysicalMaterial
          color={COLOR.jstShroud}
          roughness={0.68}
          metalness={0.0}
          clearcoat={0.05}
          clearcoatRoughness={0.6}
        />
      </mesh>
      <mesh position={[0, mm(H / 2 - 0.18), 0]}>
        <boxGeometry args={[mm(W_pin - 0.1), mm(0.18), mm(D - 0.1)]} />
        <meshStandardMaterial
          color={COLOR.jstShroudHi}
          roughness={0.55}
          metalness={0}
        />
      </mesh>
      <mesh position={[0, 0, mm(D / 2 - 0.35)]}>
        <boxGeometry args={[mm(W_pin - 1.2), mm(H - 0.9), mm(0.55)]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.95} />
      </mesh>
      <mesh position={[0, mm(-H / 2 + 0.15), mm(D / 2 - 0.35)]}>
        <boxGeometry args={[mm(W_pin - 0.8), mm(0.2), mm(0.55)]} />
        <meshStandardMaterial color={COLOR.jstShroudShadow} roughness={0.7} />
      </mesh>
      {Array.from({ length: pins }).map((_, k) => (
        <mesh
          key={`pin-${k}`}
          position={[
            mm(-W_pin / 2 + 0.8 + (k + 0.5) * PITCH),
            mm(-0.15),
            mm(D / 2 - 0.55),
          ]}
          castShadow
        >
          <boxGeometry args={[mm(0.42), mm(H - 1.4), mm(0.32)]} />
          <meshPhysicalMaterial
            color={COLOR.gold}
            roughness={0.22}
            metalness={0.95}
            clearcoat={0.4}
          />
        </mesh>
      ))}
      {Array.from({ length: pins }).map((_, k) => (
        <mesh
          key={`solder-${k}`}
          position={[
            mm(-W_pin / 2 + 0.8 + (k + 0.5) * PITCH),
            mm(H / 2 - 0.25),
            mm(-D / 2 + 0.4),
          ]}
        >
          <cylinderGeometry args={[mm(0.32), mm(0.42), mm(0.45), 14]} />
          <meshStandardMaterial color={COLOR.icSilver} roughness={0.45} metalness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Micro-USB receptacle — mouth on the -X face
// ─────────────────────────────────────────────────────────────────────
function MicroUsb({ x, z }: { x: number; z: number }) {
  const W = 8;
  const D = 5.9;
  const T = 2.7;
  return (
    <group position={[mm(x), mm(-(PCB_T / 2) - T / 2 - 0.2), mm(z)]} castShadow>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[mm(W), mm(T), mm(D)]} />
        <meshPhysicalMaterial
          color={COLOR.steel}
          roughness={0.55}
          metalness={0.75}
          envMapIntensity={0.65}
        />
      </mesh>
      <mesh position={[mm(-W / 2 + 0.6), 0, 0]}>
        <boxGeometry args={[mm(0.55), mm(1.6), mm(D - 1.2)]} />
        <meshStandardMaterial color="#040406" roughness={0.95} />
      </mesh>
      <mesh position={[mm(-W / 2 + 1.5), mm(-0.05), 0]}>
        <boxGeometry args={[mm(0.9), mm(0.7), mm(D - 1.6)]} />
        <meshStandardMaterial color="#0c0c10" roughness={0.85} />
      </mesh>
      {[-1.4, -0.7, 0, 0.7, 1.4].map((dz, i) => (
        <mesh
          key={`mc-pin-${i}`}
          position={[mm(-W / 2 + 1.3), mm(-0.45), mm(dz)]}
        >
          <boxGeometry args={[mm(0.4), mm(0.15), mm(0.28)]} />
          <meshPhysicalMaterial
            color={COLOR.gold}
            roughness={0.25}
            metalness={0.95}
          />
        </mesh>
      ))}
      <mesh position={[mm(0.5), mm(T / 2 + 0.1), mm(D / 2 - 0.1)]}>
        <boxGeometry args={[mm(W - 2), mm(0.2), mm(0.3)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.32}
          metalness={1.0}
        />
      </mesh>
      <mesh position={[mm(0.5), mm(T / 2 + 0.1), mm(-D / 2 + 0.1)]}>
        <boxGeometry args={[mm(W - 2), mm(0.2), mm(0.3)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.32}
          metalness={1.0}
        />
      </mesh>
      <mesh position={[mm(1), mm(-T / 2 - 0.01), 0]}>
        <boxGeometry args={[mm(W - 2), mm(0.02), mm(0.4)]} />
        <meshStandardMaterial color={COLOR.steelDeep} roughness={0.4} metalness={0.9} />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// USB-C receptacle — mouth on the -X face
// ─────────────────────────────────────────────────────────────────────
function UsbC({ x, z }: { x: number; z: number }) {
  const W = 9.5;
  const D = 7.6;
  const T = 3.4;
  return (
    <group position={[mm(x), mm(-(PCB_T / 2) - T / 2 - 0.2), mm(z)]} castShadow>
      {/* Dark gunmetal shell — the real board's USB-C reads near-black */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[mm(W), mm(T), mm(D)]} />
        <meshPhysicalMaterial
          color="#33363c"
          roughness={0.6}
          metalness={0.7}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh position={[mm(-W / 2 + 0.55), 0, 0]}>
        <boxGeometry args={[mm(0.6), mm(T - 0.6), mm(D - 1.4)]} />
        <meshStandardMaterial color="#03030a" roughness={0.95} />
      </mesh>
      <mesh position={[mm(-W / 2 + 1.7), mm(0), 0]}>
        <boxGeometry args={[mm(1.4), mm(0.55), mm(D - 2.0)]} />
        <meshStandardMaterial color="#0c0c10" roughness={0.85} />
      </mesh>
      {Array.from({ length: 12 }).map((_, k) => {
        const dz = (k - 5.5) * 0.45;
        return (
          <mesh
            key={`tc-top-${k}`}
            position={[mm(-W / 2 + 1.5), mm(0.27), mm(dz)]}
          >
            <boxGeometry args={[mm(0.7), mm(0.06), mm(0.3)]} />
            <meshPhysicalMaterial
              color={COLOR.gold}
              roughness={0.22}
              metalness={0.95}
              clearcoat={0.3}
            />
          </mesh>
        );
      })}
      {Array.from({ length: 12 }).map((_, k) => {
        const dz = (k - 5.5) * 0.45;
        return (
          <mesh
            key={`tc-bot-${k}`}
            position={[mm(-W / 2 + 1.5), mm(-0.27), mm(dz)]}
          >
            <boxGeometry args={[mm(0.7), mm(0.06), mm(0.3)]} />
            <meshPhysicalMaterial
              color={COLOR.gold}
              roughness={0.22}
              metalness={0.95}
              clearcoat={0.3}
            />
          </mesh>
        );
      })}
      <mesh position={[mm(0.5), mm(T / 2 + 0.12), mm(D / 2 - 0.1)]}>
        <boxGeometry args={[mm(W - 2.5), mm(0.24), mm(0.3)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.32}
          metalness={1.0}
        />
      </mesh>
      <mesh position={[mm(0.5), mm(T / 2 + 0.12), mm(-D / 2 + 0.1)]}>
        <boxGeometry args={[mm(W - 2.5), mm(0.24), mm(0.3)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.32}
          metalness={1.0}
        />
      </mesh>
      <mesh position={[mm(W / 2 - 0.05), 0, 0]}>
        <boxGeometry args={[mm(0.1), mm(T - 0.2), mm(D - 0.2)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.4}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// BOOT / RST tactile switch — cream rectangular base inset on the back
// face with a raised white plunger bar across the middle (matches the
// switches on the real board's top-left).
// ─────────────────────────────────────────────────────────────────────
function TactButton({ x, z }: { x: number; z: number }) {
  const BW = 3.6; // along X
  const BD = 6.2; // along Z (long axis)
  const BH = 1.8; // base height off PCB
  return (
    <group position={[mm(x), 0, mm(z)]}>
      {/* Cream plastic base */}
      <mesh position={[0, mm(-(PCB_T / 2) - BH / 2), 0]} castShadow>
        <boxGeometry args={[mm(BW), mm(BH), mm(BD)]} />
        <meshPhysicalMaterial
          color={COLOR.jstShroud}
          roughness={0.55}
          metalness={0.0}
          clearcoat={0.3}
          clearcoatRoughness={0.5}
        />
      </mesh>
      {/* Raised white plunger bar across the middle */}
      <mesh position={[0, mm(-(PCB_T / 2) - BH - 0.55), 0]} castShadow>
        <boxGeometry args={[mm(1.6), mm(1.1), mm(3.6)]} />
        <meshPhysicalMaterial
          color={COLOR.jstShroudHi}
          roughness={0.45}
          metalness={0.0}
          clearcoat={0.4}
        />
      </mesh>
      {/* Nub on the edge-facing end */}
      <mesh position={[0, mm(-(PCB_T / 2) - BH + 0.35), mm(BD / 2 + 0.3)]}>
        <boxGeometry args={[mm(1.4), mm(0.9), mm(0.7)]} />
        <meshStandardMaterial
          color={COLOR.jstShroudShadow}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
      {/* Side solder tabs */}
      {[-1, 1].map((s) => (
        <mesh
          key={`tab-${s}`}
          position={[mm(s * (BW / 2 + 0.2)), mm(-(PCB_T / 2) - 0.35), 0]}
        >
          <boxGeometry args={[mm(0.4), mm(0.5), mm(BD - 1.8)]} />
          <meshStandardMaterial
            color={COLOR.icSilver}
            roughness={0.45}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SOT-23 transistor + SOT-223 LDO — small black packages
// ─────────────────────────────────────────────────────────────────────
function Sot23({ x, z }: { x: number; z: number }) {
  return (
    <mesh position={[mm(x), mm(-(PCB_T / 2) - 0.55), mm(z)]} castShadow>
      <boxGeometry args={[mm(1.6), mm(1.1), mm(2.9)]} />
      <meshPhysicalMaterial
        color={COLOR.ic}
        roughness={0.5}
        metalness={0.05}
        clearcoat={0.4}
      />
    </mesh>
  );
}

function Sot223({ x, z }: { x: number; z: number }) {
  // Body long axis along Z; wide metal tab toward -Z, 3 gull-wing pins +Z
  return (
    <group position={[mm(x), 0, mm(z)]}>
      <mesh position={[0, mm(-(PCB_T / 2) - 0.8), 0]} castShadow>
        <boxGeometry args={[mm(3.4), mm(1.6), mm(4.6)]} />
        <meshPhysicalMaterial
          color={COLOR.ic}
          roughness={0.5}
          metalness={0.05}
          clearcoat={0.4}
        />
      </mesh>
      {/* Tab */}
      <mesh position={[0, mm(-(PCB_T / 2) - 0.25), mm(-4.6 / 2 - 0.5)]}>
        <boxGeometry args={[mm(3.0), mm(0.4), mm(1.2)]} />
        <meshPhysicalMaterial
          color={COLOR.icSilver}
          roughness={0.4}
          metalness={1.0}
          envMapIntensity={0.9}
        />
      </mesh>
      {/* 3 pins */}
      {[-1.15, 0, 1.15].map((dx) => (
        <mesh
          key={`p-${dx}`}
          position={[mm(dx), mm(-(PCB_T / 2) - 0.25), mm(4.6 / 2 + 0.4)]}
        >
          <boxGeometry args={[mm(0.7), mm(0.35), mm(0.9)]} />
          <meshStandardMaterial
            color={COLOR.icSilver}
            roughness={0.45}
            metalness={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// Gull-wing pin rows for SOP packages. axis "x": rows off the ±Z sides
// (body long axis along X); axis "z": rows off the ±X sides.
function SopPins({
  x,
  z,
  count,
  span,
  offset,
  axis,
}: {
  x: number;
  z: number;
  count: number;
  span: number;
  offset: number;
  axis: "x" | "z";
}) {
  return (
    <group>
      {Array.from({ length: count }).flatMap((_, i) => {
        const t = -span / 2 + 0.7 + (i * (span - 1.4)) / (count - 1);
        return [-1, 1].map((s) => {
          const px = axis === "x" ? x + t : x + s * offset;
          const pz = axis === "x" ? z + s * offset : z + t;
          return (
            <mesh
              key={`sp-${i}-${s}`}
              position={[mm(px), mm(-(PCB_T / 2) - 0.3), mm(pz)]}
            >
              <boxGeometry
                args={
                  axis === "x"
                    ? [mm(0.42), mm(0.3), mm(0.9)]
                    : [mm(0.9), mm(0.3), mm(0.42)]
                }
              />
              <meshStandardMaterial
                color={COLOR.icSilver}
                roughness={0.4}
                metalness={0.85}
              />
            </mesh>
          );
        });
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// MicroSD slot — metal shell, card mouth flush with the -Z board edge
// ─────────────────────────────────────────────────────────────────────
function MicroSd({ x, z }: { x: number; z: number }) {
  const W = 15;
  const D = 17;
  const T = 1.9;
  return (
    <group>
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - T / 2), mm(z)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[mm(W), mm(T), mm(D)]} />
        <meshPhysicalMaterial
          color="#c6c9cf"
          roughness={0.62}
          metalness={0.4}
          envMapIntensity={0.85}
        />
      </mesh>
      {/* Card mouth at the -Z end (flush with board edge) */}
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - T / 2), mm(z - D / 2 + 0.05)]}
      >
        <boxGeometry args={[mm(W - 1), mm(T - 0.4), mm(0.4)]} />
        <meshStandardMaterial color="#040406" roughness={0.95} />
      </mesh>
      {Array.from({ length: 8 }).map((_, k) => (
        <mesh
          key={`sd-pin-${k}`}
          position={[
            mm(x - W / 2 + 2.0 + k * 1.3),
            mm(-(PCB_T / 2) - T + 0.1),
            mm(z - D / 2 + 1.5),
          ]}
        >
          <boxGeometry args={[mm(0.5), mm(0.06), mm(2.0)]} />
          <meshPhysicalMaterial
            color={COLOR.gold}
            roughness={0.28}
            metalness={0.95}
          />
        </mesh>
      ))}
      <mesh position={[mm(x), mm(-(PCB_T / 2) - T - 0.01), mm(z + 0.5)]}>
        <boxGeometry args={[mm(W - 0.4), mm(0.04), mm(D - 2)]} />
        <meshPhysicalMaterial
          color="#d4d6dc"
          roughness={0.3}
          metalness={1.0}
          envMapIntensity={0.9}
        />
      </mesh>
      <mesh
        position={[mm(x + W / 2 - 0.04), mm(-(PCB_T / 2) - T / 2 - 0.05), mm(z + 2)]}
      >
        <sphereGeometry args={[mm(0.3), 10, 8]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.4}
          metalness={1.0}
        />
      </mesh>
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - T - 0.04), mm(z + D / 2 - 0.5)]}
      >
        <boxGeometry args={[mm(W - 2), mm(0.06), mm(1.4)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.45}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ESP-WROOM-32 module — separate substrate soldered to the main PCB,
// shield can over the lower portion, meander antenna at the +Z end,
// castellation half-pads along the edges. Matches the real CYD: module
// flush at the +X board edge, long axis along Z, antenna toward +Z
// (board-left when viewing the back in portrait).
// ─────────────────────────────────────────────────────────────────────
function EspWroom32() {
  const { x, z, w, l, subT } = ESP;
  const CAN_L = w - ESP_ANT_LEN - 1.2; // shield length along X
  const CAN_T = 2.2;
  const canX = x - w / 2 + CAN_L / 2 + 0.4;
  const antX0 = x + w / 2 - ESP_ANT_LEN; // antenna zone start (overhangs board)
  const subY = -(PCB_T / 2) - subT / 2;

  return (
    <group>
      {/* Substrate under the shielded portion — dark module PCB */}
      <mesh
        position={[mm(canX), mm(subY), mm(z)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[mm(CAN_L + 1.2), mm(subT), mm(l)]} />
        <meshPhysicalMaterial
          color="#141619"
          roughness={0.6}
          metalness={0.05}
          clearcoat={0.3}
        />
      </mesh>

      {/* Antenna tab — the black PCB section overhanging the board edge,
          visible from BOTH sides on the real CYD */}
      <mesh
        position={[mm(antX0 + ESP_ANT_LEN / 2), mm(subY), mm(z)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[mm(ESP_ANT_LEN), mm(subT), mm(l)]} />
        <meshPhysicalMaterial
          color="#101216"
          roughness={0.55}
          metalness={0.05}
          clearcoat={0.35}
        />
      </mesh>

      {/* Castellation half-pads along both long edges of the shielded part */}
      {Array.from({ length: 10 }).flatMap((_, i) => {
        const cxp = x - w / 2 + 1.5 + (i * (CAN_L - 2)) / 9;
        return [-1, 1].map((s) => (
          <mesh
            key={`cast-${s}-${i}`}
            position={[mm(cxp), mm(subY), mm(z + s * (l / 2 - 0.15))]}
          >
            <boxGeometry args={[mm(0.8), mm(subT + 0.04), mm(0.3)]} />
            <meshPhysicalMaterial
              color={COLOR.icSilver}
              roughness={0.4}
              metalness={1.0}
            />
          </mesh>
        ));
      })}

      {/* RF shield can — bright silver like the real WROOM in the photos */}
      <mesh
        position={[mm(canX), mm(-(PCB_T / 2) - subT - CAN_T / 2), mm(z)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[mm(CAN_L), mm(CAN_T), mm(l - 1.6)]} />
        <meshPhysicalMaterial
          color="#b4b8c0"
          roughness={0.62}
          metalness={0.5}
          envMapIntensity={0.85}
        />
      </mesh>
      {/* Can lid inset */}
      <mesh
        position={[
          mm(canX),
          mm(-(PCB_T / 2) - subT - CAN_T - 0.01),
          mm(z),
        ]}
      >
        <boxGeometry args={[mm(CAN_L - 0.4), mm(0.04), mm(l - 2.0)]} />
        <meshPhysicalMaterial
          color="#c2c6cd"
          roughness={0.65}
          metalness={0.45}
          envMapIntensity={0.8}
        />
      </mesh>
      {/* "ESP-32" label printed dark on the lid (like the laser marking) */}
      <mesh
        position={[
          mm(canX - 3),
          mm(-(PCB_T / 2) - subT - CAN_T - 0.06),
          mm(z),
        ]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      >
        <planeGeometry args={[mm(11), mm(3.0)]} />
        <meshStandardMaterial
          color="#585d66"
          roughness={0.55}
          metalness={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* QR code patch on the lid's lower-right, like the real module */}
      <mesh
        position={[
          mm(canX + 4.5),
          mm(-(PCB_T / 2) - subT - CAN_T - 0.06),
          mm(z - 4),
        ]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[mm(4.2), mm(4.2)]} />
        <meshStandardMaterial
          color="#41454c"
          roughness={0.5}
          metalness={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Meander antenna on the overhanging tab (back side, gold) */}
      {(() => {
        const runs = 5;
        const runL = l - 5;
        const stepX = (ESP_ANT_LEN - 1.6) / (runs - 1);
        const traceY = -(PCB_T / 2) - subT - 0.04;
        const parts: React.ReactNode[] = [];
        for (let i = 0; i < runs; i++) {
          const tx = antX0 + 0.8 + i * stepX;
          parts.push(
            <mesh key={`ant-run-${i}`} position={[mm(tx), mm(traceY), mm(z)]}>
              <boxGeometry args={[mm(0.38), mm(0.06), mm(runL)]} />
              <meshPhysicalMaterial
                color={COLOR.gold}
                roughness={0.28}
                metalness={0.95}
                envMapIntensity={1.0}
              />
            </mesh>
          );
          if (i < runs - 1) {
            const side = i % 2 === 0 ? 1 : -1;
            parts.push(
              <mesh
                key={`ant-jog-${i}`}
                position={[
                  mm(tx + stepX / 2),
                  mm(traceY),
                  mm(z + (side * (runL - 0.38)) / 2),
                ]}
              >
                <boxGeometry args={[mm(stepX), mm(0.06), mm(0.38)]} />
                <meshPhysicalMaterial
                  color={COLOR.gold}
                  roughness={0.28}
                  metalness={0.95}
                  envMapIntensity={1.0}
                />
              </mesh>
            );
          }
        }
        return parts;
      })()}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Main board model
// ─────────────────────────────────────────────────────────────────────
function Board() {
  const backTex = usePcbBackComposite();
  const frontTex = usePcbFrontComposite();
  const roughTex = usePcbRoughness();

  const TFT_W = 70;
  const TFT_H = 50;
  const TFT_T = 2.8;
  const FOAM_T = 1.0;
  const TFT_BOTTOM_Y = PCB_T / 2 + FOAM_T;
  const TFT_TOP_Y = TFT_BOTTOM_Y + TFT_T;
  const SCR_W = 57.6;
  const SCR_H = 43.2;
  // The display module is NOT centered on the real board: it sits shifted
  // toward the USB end, leaving a wide yellow margin at the ESP end where
  // the antenna tab overhangs.
  const TFT_CX = -4;

  const baseMatProps = {
    color: COLOR.pcb,
    roughness: 0.62,
    metalness: 0.03,
    clearcoat: 0,
    clearcoatRoughness: 0.5,
  } as const;

  return (
    <group>
      {/* ─────────────────  PCB body  ──────────────── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[mm(PCB_W), mm(PCB_T), mm(PCB_H)]} />
        <meshPhysicalMaterial attach="material-0" {...baseMatProps} />
        <meshPhysicalMaterial attach="material-1" {...baseMatProps} />
        <meshPhysicalMaterial
          attach="material-2"
          color="#ffffff"
          map={frontTex ?? undefined}
          roughness={0.62}
          metalness={0.03}
          clearcoat={0.06}
          clearcoatRoughness={0.6}
        />
        <meshPhysicalMaterial
          attach="material-3"
          color="#ffffff"
          map={backTex ?? undefined}
          roughnessMap={roughTex ?? undefined}
          roughness={0.68}
          metalness={0.03}
          clearcoat={0.06}
          clearcoatRoughness={0.6}
        />
        <meshPhysicalMaterial attach="material-4" {...baseMatProps} />
        <meshPhysicalMaterial attach="material-5" {...baseMatProps} />
      </mesh>

      {/* 4 corner mounting holes (Ø3, 4mm insets → 78×42.5 grid) */}
      {[
        [39, 21.25],
        [-39, 21.25],
        [39, -21.25],
        [-39, -21.25],
      ].map(([x, z], i) => (
        <mesh key={`mh-${i}`} position={[mm(x), 0, mm(z)]}>
          <cylinderGeometry
            args={[mm(1.5), mm(1.5), mm(PCB_T + 0.15), 24]}
          />
          <meshStandardMaterial color={COLOR.hole} roughness={0.85} />
        </mesh>
      ))}
      {[
        [39, 21.25],
        [-39, 21.25],
        [39, -21.25],
        [-39, -21.25],
      ].map(([x, z], i) => (
        <mesh
          key={`mh-ring-${i}`}
          position={[mm(x), mm(-(PCB_T / 2) - 0.02), mm(z)]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[mm(1.5), mm(2.3), 32]} />
          <meshPhysicalMaterial
            color={COLOR.gold}
            roughness={0.3}
            metalness={0.95}
            side={THREE.DoubleSide}
            envMapIntensity={0.9}
          />
        </mesh>
      ))}
      {[
        [39, 21.25],
        [-39, 21.25],
        [39, -21.25],
        [-39, -21.25],
      ].map(([x, z], i) => (
        <mesh
          key={`mh-ringf-${i}`}
          position={[mm(x), mm(PCB_T / 2 + 0.02), mm(z)]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <ringGeometry args={[mm(1.5), mm(2.2), 32]} />
          <meshPhysicalMaterial
            color={COLOR.gold}
            roughness={0.3}
            metalness={0.95}
            side={THREE.DoubleSide}
            envMapIntensity={0.9}
          />
        </mesh>
      ))}

      {/* ─────────────────  FRONT — DISPLAY STACK  ──────────────── */}
      {/* Shifted toward the USB end (TFT_CX), silver metal frame like the
          real JC2432 display module. */}

      {/* Foam adhesive */}
      <mesh position={[mm(TFT_CX), mm(PCB_T / 2 + FOAM_T / 2), 0]}>
        <boxGeometry args={[mm(TFT_W - 6), mm(FOAM_T), mm(TFT_H - 6)]} />
        <meshStandardMaterial color={COLOR.foam} roughness={0.92} metalness={0} />
      </mesh>

      {/* TFT module frame — brushed silver metal (the real module's
          signature look; it was rendered all-black before) */}
      <mesh
        position={[mm(TFT_CX), mm(TFT_BOTTOM_Y + TFT_T / 2), 0]}
        castShadow
      >
        <boxGeometry args={[mm(TFT_W), mm(TFT_T), mm(TFT_H)]} />
        <meshPhysicalMaterial
          color="#c6cad1"
          roughness={0.6}
          metalness={0.6}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* Black glass sandwich on top of the metal frame */}
      <mesh position={[mm(TFT_CX), mm(TFT_TOP_Y + 0.02), 0]}>
        <boxGeometry args={[mm(TFT_W - 2.4), mm(0.06), mm(TFT_H - 2.4)]} />
        <meshPhysicalMaterial
          color={COLOR.bezel}
          roughness={0.62}
          metalness={0.08}
          clearcoat={0.1}
          clearcoatRoughness={0.55}
        />
      </mesh>

      {/* Black border around active area */}
      <mesh position={[mm(TFT_CX), mm(TFT_TOP_Y + 0.06), 0]}>
        <boxGeometry args={[mm(SCR_W + 4), mm(0.04), mm(SCR_H + 4)]} />
        <meshStandardMaterial color={COLOR.bezel} roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Active LCD surface — powered-off */}
      <mesh
        position={[mm(TFT_CX), mm(TFT_TOP_Y + 0.09), 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[mm(SCR_W), mm(SCR_H)]} />
        <meshStandardMaterial
          color={COLOR.screen}
          emissive={COLOR.screenGlow}
          emissiveIntensity={0.18}
          roughness={0.5}
          metalness={0}
        />
      </mesh>

      {/* Glass overlay — restrained reflectivity (studio env, no cityscape) */}
      <mesh
        position={[mm(TFT_CX), mm(TFT_TOP_Y + 0.2), 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[mm(SCR_W + 1.4), mm(SCR_H + 1.4)]} />
        <meshPhysicalMaterial
          color="#0a0d18"
          roughness={0.45}
          metalness={0.0}
          ior={1.45}
          clearcoat={0.15}
          clearcoatRoughness={0.5}
          envMapIntensity={0.25}
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* TFT FFC ribbon — exits the −X edge of the display */}
      <mesh
        position={[
          mm(TFT_CX - TFT_W / 2 - 0.2),
          mm(PCB_T / 2 + (TFT_BOTTOM_Y - PCB_T / 2) / 2),
          0,
        ]}
      >
        <boxGeometry
          args={[mm(0.25), mm(TFT_BOTTOM_Y - PCB_T / 2), mm(13)]}
        />
        <meshPhysicalMaterial
          color={COLOR.ffc}
          roughness={0.45}
          metalness={0.1}
          clearcoat={0.5}
        />
      </mesh>
      <mesh position={[mm(TFT_CX - TFT_W / 2 - 1.5), mm(PCB_T / 2 + 0.05), 0]}>
        <boxGeometry args={[mm(2.5), mm(0.08), mm(13)]} />
        <meshPhysicalMaterial
          color={COLOR.ffc}
          roughness={0.45}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>
      {Array.from({ length: 13 }).map((_, i) => (
        <mesh
          key={`ffc-c-${i}`}
          position={[
            mm(TFT_CX - TFT_W / 2 - 1.5),
            mm(PCB_T / 2 + 0.09),
            mm(-6 + i * 1),
          ]}
        >
          <boxGeometry args={[mm(2.2), mm(0.005), mm(0.32)]} />
          <meshPhysicalMaterial
            color={COLOR.ffcGold}
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
      ))}

      {/* Touch-panel flex — tan ribbon folding over the display's +Z edge
          (the wide flex visible at the display bottom on the real board) */}
      <mesh
        position={[mm(TFT_CX + 6), mm(TFT_TOP_Y - 0.6), mm(TFT_H / 2 + 0.12)]}
      >
        <boxGeometry args={[mm(9), mm(TFT_T + 0.9), mm(0.22)]} />
        <meshPhysicalMaterial
          color={COLOR.ffc}
          roughness={0.5}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>
      <mesh
        position={[mm(TFT_CX + 6), mm(TFT_TOP_Y + 0.16), mm(TFT_H / 2 - 1.2)]}
      >
        <boxGeometry args={[mm(9), mm(0.06), mm(2.6)]} />
        <meshPhysicalMaterial
          color={COLOR.ffc}
          roughness={0.5}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>

      {/* LDR — small SMD photoresistor on the front margin near the USB end */}
      <mesh position={[mm(-41), mm(PCB_T / 2 + 0.35), mm(14)]} castShadow>
        <boxGeometry args={[mm(2.0), mm(0.7), mm(1.25)]} />
        <meshPhysicalMaterial
          color={COLOR.ldrBody}
          roughness={0.45}
          metalness={0.1}
          clearcoat={0.4}
        />
      </mesh>
      <mesh position={[mm(-41), mm(PCB_T / 2 + 0.72), mm(14)]}>
        <boxGeometry args={[mm(1.4), mm(0.04), mm(0.8)]} />
        <meshStandardMaterial color="#8a7a3a" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ──────────────────  BACK — COMPONENTS  ────────────────── */}

      {/* Dual USB on the −X (bottom-in-portrait) edge, ~1mm proud.
          Real order along the edge: P1 JST · USB-C · micro-USB */}
      <UsbC x={POS.usbc.x} z={POS.usbc.z} />
      <MicroUsb x={POS.musb.x} z={POS.musb.z} />

      {/* P1 serial (VIN/TX/RX/GND) — 4P JST on the USB edge */}
      <JstConnector x={POS.p1.x} z={POS.p1.z} pins={4} facing="x-" />

      {/* ESP-WROOM-32 module flush at the +X edge */}
      <EspWroom32 />

      {/* U3 — CH340 USB-to-UART SOP-16, top-left under the buttons */}
      <ICBlock x={POS.ch340.x} z={POS.ch340.z} w={9} h={4} thick={1.5} />
      <SopPins x={POS.ch340.x} z={POS.ch340.z} count={8} span={9} offset={2.6} axis="x" />

      {/* U7 + U1 — SOT-223 LDO pair above the USB edge */}
      <Sot223 x={POS.u7.x} z={POS.u7.z} />
      <Sot223 x={POS.u1.x} z={POS.u1.z} />

      {/* U6 — SOP-16 below the TF slot */}
      <ICBlock x={POS.u6.x} z={POS.u6.z} w={4} h={10} thick={1.4} />
      <SopPins x={POS.u6.x} z={POS.u6.z} count={8} span={10} offset={2.6} axis="z" />

      {/* U5 — speaker amp SOP-8 */}
      <ICBlock x={POS.amp.x} z={POS.amp.z} w={5} h={4} thick={1.3} />
      <SopPins x={POS.amp.x} z={POS.amp.z} count={4} span={5} offset={2.6} axis="x" />

      {/* MicroSD (TF) slot — flush with the -Z edge */}
      <MicroSd x={POS.sd.x} z={POS.sd.z} />

      {/* LED1 — white 5050 RGB package with cross grooves, center-right */}
      <group position={[mm(POS.rgb.x), 0, mm(POS.rgb.z)]}>
        <mesh position={[0, mm(-(PCB_T / 2) - 0.8), 0]} castShadow>
          <boxGeometry args={[mm(5), mm(1.6), mm(5)]} />
          <meshPhysicalMaterial
            color={COLOR.ledRgbBody}
            roughness={0.3}
            metalness={0.0}
            clearcoat={0.7}
            clearcoatRoughness={0.2}
          />
        </mesh>
        {/* Cross grooves + lens dot */}
        <mesh position={[0, mm(-(PCB_T / 2) - 1.62), 0]}>
          <boxGeometry args={[mm(4.6), mm(0.04), mm(0.5)]} />
          <meshStandardMaterial color="#c9c9c2" roughness={0.6} />
        </mesh>
        <mesh position={[0, mm(-(PCB_T / 2) - 1.62), 0]}>
          <boxGeometry args={[mm(0.5), mm(0.04), mm(4.6)]} />
          <meshStandardMaterial color="#c9c9c2" roughness={0.6} />
        </mesh>
        <mesh
          position={[0, mm(-(PCB_T / 2) - 1.64), 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <circleGeometry args={[mm(1.1), 24]} />
          <meshPhysicalMaterial
            color="#8b90a0"
            roughness={0.15}
            metalness={0.2}
            clearcoat={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* BOOT + RST — inset tactiles at the top-left */}
      <TactButton x={POS.boot.x} z={POS.boot.z} />
      <TactButton x={POS.reset.x} z={POS.reset.z} />

      {/* Speak 2P + P3 + CN1 JST connectors */}
      <JstConnector x={POS.spk.x} z={POS.spk.z} pins={2} facing="z+" />
      <JstConnector x={POS.p3.x} z={POS.p3.z} pins={4} facing="z-" />
      <JstConnector x={POS.cn1.x} z={POS.cn1.z} pins={4} facing="z-" />

      {/* Q1–Q4 SOT-23 transistors */}
      <Sot23 x={POS.q1.x} z={POS.q1.z} />
      <Sot23 x={POS.q2.x} z={POS.q2.z} />
      <Sot23 x={POS.q3.x} z={POS.q3.z} />
      <Sot23 x={POS.q4.x} z={POS.q4.z} />

      {/* RN2 resistor network beside the TF slot */}
      <mesh
        position={[mm(POS.rn2.x), mm(-(PCB_T / 2) - 0.4), mm(POS.rn2.z)]}
        castShadow
      >
        <boxGeometry args={[mm(3.2), mm(0.8), mm(1.6)]} />
        <meshPhysicalMaterial
          color={COLOR.ic}
          roughness={0.5}
          metalness={0.05}
          clearcoat={0.4}
        />
      </mesh>

      {/* SOD-123 schottky diode (D1) */}
      <mesh
        position={[mm(POS.d1.x), mm(-(PCB_T / 2) - 0.55), mm(POS.d1.z)]}
        castShadow
      >
        <boxGeometry args={[mm(1.6), mm(1.1), mm(2.7)]} />
        <meshPhysicalMaterial
          color={COLOR.ic}
          roughness={0.7}
          metalness={0.1}
          clearcoat={0.3}
        />
      </mesh>

      {/* ──────────────  SMD passives (positions match texture pads) ── */}
      {PASSIVES.map(([x, z], i) => (
        <SmdPassive
          key={`pv-${i}`}
          x={x}
          z={z}
          color={i % 4 === 0 ? COLOR.smdBlack : COLOR.smdYellow}
        />
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Auto-orbit until user interaction — delta-time based so rotation
// speed is identical at any display refresh rate.
// ─────────────────────────────────────────────────────────────────────
function AutoOrbit({
  enabled,
  radPerSec = 0.13,
  children,
}: {
  enabled: boolean;
  radPerSec?: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (enabled && ref.current) {
      ref.current.rotation.y += radPerSec * Math.min(delta, 0.1);
    }
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────────────
// Renderer tone mapping (ACES Filmic) — matches Device3D
// ─────────────────────────────────────────────────────────────────────
function ToneMappingSetup() {
  const { gl } = useThree();
  React.useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
  }, [gl]);
  return null;
}

// ─────────────────────────────────────────────────────────────────────
// Error boundary — surfaces any render error so the canvas doesn't
// silently disappear
// ─────────────────────────────────────────────────────────────────────
class CanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error) {
    // eslint-disable-next-line no-console
    console.error("[Board3D] crash:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-xs font-mono text-red-500 dark:text-red-400 text-center">
          <div>
            <div className="font-semibold mb-1">Board3D failed to render</div>
            <pre className="whitespace-pre-wrap break-all opacity-80">
              {String(this.state.error?.message || this.state.error)}
            </pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────────────
// Public component
// ─────────────────────────────────────────────────────────────────────
export function Board3D() {
  const [interacted, setInteracted] = React.useState(false);

  return (
    <CanvasErrorBoundary>
      <Canvas
        shadows
        camera={{ position: [0, 0, 2.6], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        dpr={[1, 2.25]}
        onPointerDown={() => setInteracted(true)}
      >
        <ToneMappingSetup />

        {/* Lights — independent of HDRI so the scene is lit even before
            the environment loads. */}
        <ambientLight intensity={0.42} />
        <hemisphereLight args={["#a8c0e0", "#16161e", 0.6]} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.7}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={6}
          shadow-camera-left={-2}
          shadow-camera-right={2}
          shadow-camera-top={2}
          shadow-camera-bottom={-2}
          shadow-bias={-0.0006}
        />
        <directionalLight
          position={[-4, 2, -3]}
          intensity={0.85}
          color="#b9c9e8"
        />
        <directionalLight
          position={[2, -1, 2]}
          intensity={0.35}
          color="#ffd9a8"
        />
        <pointLight position={[3, -1, 2]} intensity={0.45} color="#a880d8" />
        <pointLight position={[-2, 2, 3]} intensity={0.4} color="#ffe8c8" />
        <pointLight position={[1, 0.5, -3]} intensity={0.55} color="#7c9cd8" />

        {/* Neutral studio environment — soft box reflections instead of
            the old "city" HDRI (which mirrored apartment buildings in
            the display glass). */}
        <React.Suspense fallback={null}>
          <Environment preset="studio" environmentIntensity={0.26} />
        </React.Suspense>

        <ContactShadows
          position={[0, -0.42, 0]}
          opacity={0.55}
          scale={3.2}
          blur={2.6}
          far={1.4}
          resolution={1024}
          color="#000000"
        />

        <AutoOrbit enabled={!interacted}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <Board />
          </group>
        </AutoOrbit>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={(Math.PI * 5) / 6}
          rotateSpeed={0.6}
          dampingFactor={0.08}
        />
      </Canvas>
    </CanvasErrorBoundary>
  );
}

export default Board3D;
