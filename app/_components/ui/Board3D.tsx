"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const SCALE = 0.013;
const mm = (n: number) => n * SCALE;

const COLOR = {
  pcb: "#d2a82a",
  pcbDeep: "#a9821a",
  pcbCopper: "#b8901c",
  pcbGndShade: "rgba(140, 100, 12, 0.16)",
  pcbHigh: "rgba(228, 196, 90, 0.10)",
  bezel: "#0d0d0e",
  screen: "#070a14",
  screenGlow: "#0c1630",
  rfShield: "#9da3ac",
  rfShieldDark: "#7c828a",
  metal: "#bfc2c8",
  metalDark: "#7e8088",
  gold: "#cca435",
  goldDark: "#a08020",
  ic: "#1a1a1c",
  ic2: "#26252a",
  hole: "#0a0a0a",
  jstShroud: "#f0e8d8",
  ffc: "#a87a4a",
  ledRed: "#ff2828",
  ldr: "#3a3a3a",
  ldrFace: "#7a6a3a",
  rgbBody: "#f8f8f4",
  foam: "#e0d8c8",
  silk: "#f5f5f5",
  silkGreen: "#5fb56a",
  via: "#3a280a",
};

const PCB_W = 86;
const PCB_H = 50.5;
const PCB_T = 1.6;

const ESP_X = 22;
const ESP_W = 18.5;
const ESP_H = 18;
const ESP_T = 2.6;

// ─────────────────────────────────────────────────────────────────────
// Composite back-face texture: yellow soldermask + GND fill + power
// rails + signal traces + vias + gold pads + silkscreen, baked into
// one canvas, applied as `map` on material-3 of the PCB BoxGeometry.
// ─────────────────────────────────────────────────────────────────────

function usePcbBackComposite(): THREE.CanvasTexture | null {
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
    // Box -Y face UV: canvas (0,0) → world (-PCB_W/2, +PCB_H/2)
    const cx = (xMm: number) => (xMm + PCB_W / 2) * PX;
    const cy = (zMm: number) => (PCB_H / 2 - zMm) * PX;

    // Cheap deterministic PRNG so traces/vias don't reshuffle on re-render
    const prng = (seed: number) => {
      const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return ((v % 1) + 1) % 1;
    };

    // ── Layer 0: yellow soldermask base ────────────────────────────
    ctx.fillStyle = COLOR.pcb;
    ctx.fillRect(0, 0, W, H);

    // GND copper plane fill (slightly darker tone bleeding through mask)
    ctx.fillStyle = COLOR.pcbGndShade;
    ctx.fillRect(0, 0, W, H);

    // Subtle uneven mask: a few light/dark patches across the board
    for (let i = 0; i < 36; i++) {
      const r = prng(i + 1);
      const r2 = prng(i + 101);
      const x = (r * 2 - 1) * (PCB_W / 2 - 4);
      const z = (r2 * 2 - 1) * (PCB_H / 2 - 4);
      ctx.fillStyle = i % 2 ? COLOR.pcbHigh : COLOR.pcbGndShade;
      ctx.beginPath();
      ctx.ellipse(
        cx(x),
        cy(z),
        PX * (3 + r * 6),
        PX * (2 + r2 * 5),
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // Cross-hatch (very faint) to imply copper grid
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = "#5c4008";
    ctx.lineWidth = PX * 0.12;
    for (let i = -PCB_W; i < PCB_W; i += 1.4) {
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

    // ── Layer 1: trace helper ──────────────────────────────────────
    const trace = (
      pts: [number, number][],
      width: number,
      color = COLOR.pcbCopper
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

    // ── Layer 2: wide power rails ──────────────────────────────────
    // 5V from USB-C → 5V bus → AMS1117 #1 input
    trace(
      [
        [-43, 5],
        [-37, 5],
        [-37, 12],
        [-26, 12],
        [-26, 19],
        [21, 19],
      ],
      1.6,
      COLOR.pcbDeep
    );
    // 5V from Micro-USB join
    trace(
      [
        [-43, -6],
        [-39, -6],
        [-39, 5],
        [-37, 5],
      ],
      1.4,
      COLOR.pcbDeep
    );
    // 3V3 rail from AMS1117 → ESP module top pin row
    trace(
      [
        [18, 18],
        [15, 18],
        [15, 11],
        [13, 9.5],
      ],
      1.3,
      COLOR.pcbCopper
    );
    // 3V3 to ESP bottom row
    trace(
      [
        [15, 11],
        [15, -8],
        [12, -9.5],
      ],
      1.2,
      COLOR.pcbCopper
    );
    // 3V3 to LCD FFC area
    trace(
      [
        [15, 11],
        [-26, 11],
        [-26, -2],
        [-30, -3],
      ],
      1.0,
      COLOR.pcbCopper
    );
    // GND rail along bottom
    trace(
      [
        [-40, -3],
        [-15, -3],
        [-15, -8],
        [40, -8],
      ],
      1.7,
      COLOR.pcbDeep
    );
    // GND from USB outer → JSTs
    trace(
      [
        [-43, 8],
        [-32, 8],
        [-32, 22],
      ],
      1.0,
      COLOR.pcbDeep
    );
    trace(
      [
        [-43, -8],
        [-30, -8],
        [-30, -22],
      ],
      1.0,
      COLOR.pcbDeep
    );
    // Backlight power → MOSFET → LCD strip
    trace(
      [
        [18, 19],
        [-25, 19],
        [-25, -5],
      ],
      1.0,
      COLOR.pcbCopper
    );
    trace(
      [
        [-25, -8],
        [-30, -8],
        [-30, -3],
      ],
      0.9,
      COLOR.pcbCopper
    );
    // 5V tap → backlight
    trace(
      [
        [-26, 12],
        [-26, -5],
        [-25, -7],
      ],
      0.9,
      COLOR.pcbDeep
    );

    // ── Layer 3: dense signal traces ───────────────────────────────
    // ESP UART → CH340
    trace([[28, 9], [28, 14], [25, 16], [25, 18]], 0.45);
    trace([[30, 9], [30, 14], [27, 16], [27, 18]], 0.45);
    trace([[26, 9], [26, 13], [22, 15], [22, 18]], 0.45);

    // CH340 → USB-C data lines (D+/D−)
    trace(
      [
        [25, 18],
        [-10, 18],
        [-10, 14],
        [-30, 14],
        [-35, 9],
        [-43, 4],
      ],
      0.45
    );
    trace(
      [
        [27, 18],
        [-12, 16],
        [-12, 12],
        [-32, 12],
        [-37, 7],
        [-43, 5],
      ],
      0.45
    );

    // CH340 → Micro-USB data
    trace(
      [
        [29, 18],
        [-8, 16],
        [-8, -7],
        [-37, -7],
        [-43, -7],
      ],
      0.4
    );

    // ESP → BOOT button (IO0)
    trace([[31, 9], [31, 13], [33, 14]], 0.42);
    // EN → RST button
    trace([[14, 9], [16, 12], [33, 12.5]], 0.42);

    // ESP GPIO → SD card lanes
    for (let i = 0; i < 6; i++) {
      const ox = ESP_X - ESP_W / 2 + 2 + i * 2.5;
      trace(
        [
          [ox, -9],
          [ox, -12],
          [3 + i * 2, -14],
          [6 - 6 + i * 2, -16],
        ],
        0.4
      );
    }

    // ESP GPIO row → LCD FFC fan-out
    for (let i = 0; i < 14; i++) {
      const ox = ESP_X - ESP_W / 2 + 1 + i * 1.25;
      const wig = (i % 2) * 0.6;
      trace(
        [
          [ox, -9],
          [ox, -11 - i * 0.15],
          [-15 + i * 0.4 + wig, -11.5 - i * 0.15],
          [-30, -3 + (i - 7) * 0.5],
        ],
        0.36
      );
    }

    // ESP GPIO bottom row → P1/P3/P4 right-edge stack (z=-22)
    for (let i = 0; i < 10; i++) {
      const ox = ESP_X - ESP_W / 2 + 1 + i * 1.7;
      const targetX = i < 4 ? 16 : i < 8 ? 8 : 1; // land near P1, P3, P4
      trace(
        [
          [ox, -9],
          [ox, -11 - i * 0.2],
          [targetX, -16 - (i % 4) * 0.3],
          [targetX + (i % 4 - 1.5) * 1.2, -20.5],
        ],
        0.36
      );
    }
    // ESP top row → CN1 (4-pin I2C) at bottom-left
    for (let i = 0; i < 4; i++) {
      const ox = ESP_X - ESP_W / 2 + 4 + i * 2;
      trace(
        [
          [ox, 9],
          [ox, 12 + i * 0.4],
          [-15 - i * 2, 16 + i * 0.2],
          [-34 + (i - 1.5) * 1.2, 20.5],
        ],
        0.4
      );
    }

    // ESP → audio amp → speaker conn P4 (now at right edge, x≈+1)
    trace(
      [
        [10, -9],
        [-2, -10],
        [-22, -10],
      ],
      0.45
    );
    trace(
      [
        [-22, -8],
        [-12, -8],
        [-2, -14],
        [0, -20],
      ],
      0.5
    );
    trace(
      [
        [-22, -10],
        [-10, -10],
        [0, -16],
        [2, -20],
      ],
      0.5
    );

    // ESP → XPT2046 touch
    trace([[10, 9], [12, 12], [14, 13]], 0.4);
    trace([[12, 9], [13, 11], [14, 13]], 0.4);
    trace([[14, 9], [14, 11], [14, 13]], 0.4);
    trace([[16, 9], [15, 11], [15, 13]], 0.4);

    // XPT2046 → LCD FFC
    for (let i = 0; i < 4; i++) {
      trace(
        [
          [13 + i * 0.5, 13],
          [13 + i * 0.5, 8 - i * 0.4],
          [-15, 6 - i * 0.5],
          [-30, 0 - i * 0.4],
        ],
        0.32
      );
    }

    // ── Layer 4: vias (dark dots with thin gold annulus) ───────────
    const placeVia = (x: number, z: number, r = 0.16) => {
      ctx.fillStyle = COLOR.via;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * (r + 0.06), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.gold;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * (r + 0.16), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = COLOR.via;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), PX * r, 0, Math.PI * 2);
      ctx.fill();
    };

    // Sparser scattered vias — avoid components and the ESP module
    const isInsideComponent = (x: number, z: number) => {
      // ESP module body
      if (Math.abs(x - ESP_X) < ESP_W / 2 + 0.5 && Math.abs(z) < ESP_H / 2 + 0.5)
        return true;
      // CH340
      if (Math.abs(x - 30) < 6 && Math.abs(z - 18) < 2.6) return true;
      // AMS1117 #1
      if (Math.abs(x - 21) < 4 && Math.abs(z - 18) < 2.2) return true;
      // AMS1117 #2
      if (Math.abs(x - 17) < 4 && Math.abs(z - 14) < 2.2) return true;
      // XPT2046
      if (Math.abs(x - 14) < 3 && Math.abs(z - 14) < 2.7) return true;
      // MicroSD
      if (Math.abs(x - 6) < 7.5 && Math.abs(z + 17) < 8) return true;
      // Audio amp
      if (Math.abs(x + 22) < 2 && Math.abs(z + 10) < 2) return true;
      // RGB LED
      if (Math.abs(x - 8) < 3 && Math.abs(z + 9) < 3) return true;
      // Mounting holes
      if (Math.abs(Math.abs(x) - 39) < 3 && Math.abs(Math.abs(z) - 21.25) < 3)
        return true;
      return false;
    };

    for (let i = 0; i < 130; i++) {
      const r1 = prng(i + 5);
      const r2 = prng(i + 137);
      const x = (r1 * 2 - 1) * (PCB_W / 2 - 4);
      const z = (r2 * 2 - 1) * (PCB_H / 2 - 4);
      if (isInsideComponent(x, z)) continue;
      placeVia(x, z, 0.1 + r1 * 0.05);
    }

    // GND stitching vias along board perimeter (thinner band)
    for (let xi = -36; xi <= 36; xi += 4) {
      placeVia(xi, 23.5, 0.12);
      placeVia(xi, -23.5, 0.12);
    }

    // ── Layer 5: gold pads at component pin positions ──────────────
    const goldPad = (xMm: number, zMm: number, w: number, h: number) => {
      ctx.fillStyle = COLOR.gold;
      ctx.fillRect(
        cx(xMm) - (w * PX) / 2,
        cy(zMm) - (h * PX) / 2,
        w * PX,
        h * PX
      );
    };

    // ESP-WROOM-32 pad rows (19 pins per long edge in scene scale)
    const ESP_PINS = 19;
    for (let i = 0; i < ESP_PINS; i++) {
      const x = ESP_X - ESP_W / 2 + 1 + (i * (ESP_W - 2)) / (ESP_PINS - 1);
      goldPad(x, ESP_H / 2 - 0.4, 0.55, 1.5);
      goldPad(x, -ESP_H / 2 + 0.4, 0.55, 1.5);
    }
    // ESP castellations on +X end
    for (let i = 0; i < 6; i++) {
      const z = -ESP_H / 2 + 2 + (i * (ESP_H - 4)) / 5;
      goldPad(ESP_X + ESP_W / 2 - 0.3, z, 1.0, 0.55);
    }

    // CH340 SOIC-16 pads
    for (let i = 0; i < 8; i++) {
      const x = 30 - 11 / 2 + 0.7 + (i * (11 - 1.4)) / 7;
      goldPad(x, 18 + 4 / 2 - 0.45, 0.55, 1.0);
      goldPad(x, 18 - 4 / 2 + 0.45, 0.55, 1.0);
    }

    // AMS1117 pads (3 small + 1 tab)
    [
      [21, 18],
      [17, 14],
    ].forEach(([cxm, czm]) => {
      goldPad(cxm + 6.5 / 2 - 0.4, czm - 1.0, 0.7, 0.7);
      goldPad(cxm + 6.5 / 2 - 0.4, czm, 0.7, 0.7);
      goldPad(cxm + 6.5 / 2 - 0.4, czm + 1.0, 0.7, 0.7);
      goldPad(cxm - 6.5 / 2 + 1.5, czm, 3.0, 1.6);
    });

    // XPT2046 TSSOP pads
    for (let i = 0; i < 8; i++) {
      const x = 14 - 5 / 2 + 0.3 + (i * (5 - 0.6)) / 7;
      goldPad(x, 14 + 4.5 / 2 - 0.3, 0.45, 0.85);
      goldPad(x, 14 - 4.5 / 2 + 0.3, 0.45, 0.85);
    }

    // Audio amp MSOP-8
    for (let i = 0; i < 4; i++) {
      const x = -22 - 3 / 2 + 0.4 + (i * (3 - 0.8)) / 3;
      goldPad(x, -10 + 3 / 2 - 0.25, 0.36, 0.55);
      goldPad(x, -10 - 3 / 2 + 0.25, 0.36, 0.55);
    }

    // U4 PSRAM SOIC-8 unpopulated footprint
    for (let i = 0; i < 4; i++) {
      const x = -1 - 1.905 + i * 1.27;
      goldPad(x, -19 + 1.27, 0.6, 1.2);
      goldPad(x, -19 - 1.27, 0.6, 1.2);
    }

    // Small generic pad pairs for SMD passives (so each cap visible has gold under it)
    const padPair = (x: number, z: number) => {
      goldPad(x - 0.6, z, 0.5, 0.7);
      goldPad(x + 0.6, z, 0.5, 0.7);
    };
    const passivePadList: [number, number][] = [
      // ESP decoupling
      [10, 6],
      [10, -6],
      [10, 0],
      [33, 8],
      [33, -8],
      [13, 5],
      [13, -5],
      [11, 3],
      [11, -3],
      // CH340 support
      [25, 21],
      [35, 21],
      [30, 14],
      [27, 14],
      [33, 14.5],
      [22, 14],
      // LDO support
      [14, 21],
      [14, 18],
      [11, 14],
      [25, 14],
      [12, 16],
      // R10–R14
      [30, -16],
      [27, -16],
      [24, -16],
      [21, -16],
      [18, -16],
      // backlight
      [-22, -7],
      [-28, -7],
      [-30, -10],
      [-22, -4],
      // misc
      [-10, 10],
      [-10, -10],
      [-5, 5],
      [-5, -5],
      [-2, 18],
      [-2, -18],
      [-22, 5],
      [-22, -5],
      [-26, 10],
      [-26, -8],
      [13, 12],
      [13, -12],
      [22, -14],
      [37, 0],
      [37, 12],
      [37, -12],
      [-12, 17],
      [-12, -17],
      [-7, 13],
      [-7, -13],
      [-19, -15],
      [-15, -16],
      [3, -10],
      [-2, -10],
      [-2, 8],
      [-7, 4],
      [-7, -4],
      [3, 14],
      [-25, 0],
      [-30, 5],
      [-30, -5],
    ];
    passivePadList.forEach(([x, z]) => padPair(x, z));

    // Test pad rounds (S1–S5, RT1–RT3) — already gold rings on board
    const round = (x: number, z: number, r: number) => {
      ctx.fillStyle = COLOR.gold;
      ctx.beginPath();
      ctx.arc(cx(x), cy(z), r * PX, 0, Math.PI * 2);
      ctx.fill();
    };
    [3, 0, -3, -6, -10].forEach((z) => round(-32, z, 0.7));
    [12, 9, 6].forEach((z) => round(12, z, 0.6));

    // JP0/JP3 jumper pad rectangles
    [
      [-7, 9.4],
      [-7, 8.4],
      [-7, -8.4],
      [-7, -9.4],
    ].forEach(([x, z]) => goldPad(x as number, z as number, 1.0, 0.7));

    // ── Layer 6: silkscreen (white) on top ─────────────────────────
    ctx.fillStyle = COLOR.silk;
    ctx.strokeStyle = COLOR.silk;
    ctx.lineCap = "round";

    // Big board name running vertical along +Z edge
    ctx.save();
    ctx.translate(cx(0), cy(20));
    ctx.rotate(-Math.PI / 2);
    ctx.font = `700 ${PX * 2.6}px ui-sans-serif, system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ESP32-2432S028", 0, 0);
    ctx.restore();

    // Pb-free symbol
    {
      const pbX = cx(-4);
      const pbY = cy(0);
      ctx.lineWidth = PX * 0.18;
      ctx.beginPath();
      ctx.arc(pbX, pbY, PX * 1.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pbX - PX * 0.95, pbY + PX * 0.95);
      ctx.lineTo(pbX + PX * 0.95, pbY - PX * 0.95);
      ctx.stroke();
      ctx.font = `700 ${PX * 0.95}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Pb", pbX, pbY);
    }

    // ESD warning triangle
    {
      const ex = cx(-1);
      const ey = cy(0);
      ctx.beginPath();
      ctx.moveTo(ex, ey - PX * 1.3);
      ctx.lineTo(ex - PX * 1.3, ey + PX * 0.95);
      ctx.lineTo(ex + PX * 1.3, ey + PX * 0.95);
      ctx.closePath();
      ctx.stroke();
      ctx.font = `700 ${PX * 0.85}px sans-serif`;
      ctx.fillText("!", ex, ey + PX * 0.2);
    }

    // Designator helper
    const desig = (text: string, xMm: number, zMm: number, sz = 0.7, rot = 0) => {
      ctx.save();
      ctx.translate(cx(xMm), cy(zMm));
      if (rot) ctx.rotate(rot);
      ctx.font = `${PX * sz}px ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 0, 0);
      ctx.restore();
    };

    desig("U1", 22, 11);
    desig("U2", 30, 21);
    desig("U3", 14, 17);
    desig("U4", -1, -22);
    desig("U5", -22, -7);
    desig("U6", 21, 21, 0.55);
    desig("U7", 17, 17, 0.55);

    desig("Q1", -16, 8.5, 0.5);
    desig("Q2", -16, 5.5, 0.5);
    desig("Q3", -16, 2.5, 0.5);

    desig("Y1", 30, 14, 0.55);
    desig("D1", -34, -10, 0.55);

    [30, 27, 24, 21, 18].forEach((x, i) =>
      desig(`R${10 + i}`, x, -16, 0.45)
    );

    const capDesigs: [string, number, number][] = [
      ["C5", 16, 6],
      ["C8", 16, -6],
      ["C9", 30, 8],
      ["C10", 30, -8],
      ["C12", -8, 15],
      ["C14", -8, -15],
      ["C17", 22, 14],
      ["C16", 26, 14],
      ["C11", -14, 12],
      ["C13", -16, -12],
      ["C15", -2, 10],
      ["C7", 32, 10],
      ["C6", 36, 0],
      ["C4", 4, 14],
    ];
    capDesigs.forEach(([t, x, z]) => desig(t, x, z, 0.42));

    desig("BOOT", 33, 19.5, 0.5);
    desig("RST", 33, 11, 0.5);

    // 3 stacked on right (-Z) edge per photo, 1 on bottom-left
    desig("P1", 16, -18.5, 0.55);
    desig("P3", 8, -18.5, 0.55);
    desig("P4", 1, -18.5, 0.45);
    desig("CN1", -34, 18.5, 0.55);

    [3, 0, -3, -6, -10].forEach((z, i) => desig(`S${i + 1}`, -32, z + 0.9, 0.42));
    [12, 9, 6].forEach((z, i) => desig(`RT${i + 1}`, 12.5, z + 0.7, 0.42));

    desig("JP0", -7, 11, 0.42);
    desig("JP3", -7, -11, 0.42);

    desig("USB1", -38, -1.5, 0.55);
    ctx.font = `${PX * 0.4}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ["5V", "D−", "D+", "G"].forEach((l, i) =>
      ctx.fillText(l, cx(-38 + (i - 1.5) * 1.4), cy(-3))
    );

    desig("TF", 8, -9, 0.55);
    desig("v1.2", 0, -3, 0.45);

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
    outline(22, 0, 25.5, 18); // ESP module
    outline(30, 18, 11.5, 4.5); // CH340
    outline(14, 14, 5.4, 4.8); // XPT2046
    outline(21, 18, 7.0, 3.8); // AMS1117 #1
    outline(17, 14, 7.0, 3.8); // AMS1117 #2
    outline(-22, -10, 3.4, 3.4); // audio amp
    outline(-1, -19, 6.8, 3.6); // U4 footprint
    outline(33, 18, 4.0, 4.0); // BOOT
    outline(33, 14, 4.0, 4.0); // RST
    outline(8, -9, 5.4, 5.4); // RGB LED
    outline(6, -17, 14.5, 15.5); // MicroSD

    // Green silk box around audio amp area
    ctx.strokeStyle = COLOR.silkGreen;
    ctx.lineWidth = PX * 0.16;
    ctx.strokeRect(
      cx(-22) - (8 * PX) / 2,
      cy(-7) - (10 * PX) / 2,
      8 * PX,
      10 * PX
    );

    // Pin labels at JST connectors (silk)
    ctx.fillStyle = COLOR.silk;
    ctx.font = `${PX * 0.42}px ui-monospace, monospace`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    // P1 (UART) — right-edge stack, top
    ["GND", "RX", "TX", "VIN"].forEach((l, i) =>
      ctx.fillText(l, cx(16 + (i - 1.5) * 1.25), cy(-20.5))
    );
    // P3 (Extension) — right-edge stack, middle
    ["3V3", "IO21", "IO22", "GND"].forEach((l, i) =>
      ctx.fillText(l, cx(8 + (i - 1.5) * 1.25), cy(-20.5))
    );
    // P4 (Speaker, 2-pin) — right-edge stack, bottom
    ["SPK+", "SPK−"].forEach((l, i) =>
      ctx.fillText(l, cx(1 + (i - 0.5) * 1.25), cy(-20.5))
    );
    // CN1 (I2C) — bottom-left near USB
    ["GND", "IO22", "IO27", "3V3"].forEach((l, i) =>
      ctx.fillText(l, cx(-34 + (i - 1.5) * 1.25), cy(20.5))
    );
    desig("SPEAK", 1, -17, 0.4);

    // Polarity dot near ESP pin 1
    ctx.fillStyle = COLOR.silk;
    ctx.beginPath();
    ctx.arc(cx(11), cy(-8.5), PX * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // ── Apply ──
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
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
      <mesh position={[mm(x), mm(-(PCB_T / 2) - thick / 2), mm(z)]}>
        <boxGeometry args={[mm(w), mm(thick), mm(h)]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0.1} />
      </mesh>
      {pinDot && (
        <mesh
          position={[
            mm(x - w / 2 + 0.6),
            mm(-(PCB_T / 2) - thick - 0.04),
            mm(z - h / 2 + 0.6),
          ]}
        >
          <cylinderGeometry args={[mm(0.25), mm(0.25), mm(0.05), 12]} />
          <meshStandardMaterial color="#fcfcfc" roughness={0.7} />
        </mesh>
      )}
    </group>
  );
}

function SmdPassive({
  x,
  z,
  color = "#15151c",
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
    <mesh position={[mm(x), mm(-(PCB_T / 2) - dims[1] / 2), mm(z)]}>
      <boxGeometry args={[mm(dims[0]), mm(dims[1]), mm(dims[2])]} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

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
  const W_pin = pins * PITCH + 1.4;
  const H = 3.4;
  const D = 4;
  const yCenter = -(PCB_T / 2) - H / 2;
  let rotY = 0;
  if (facing === "z+") rotY = Math.PI;
  if (facing === "x-") rotY = Math.PI / 2;
  if (facing === "x+") rotY = -Math.PI / 2;

  return (
    <group position={[mm(x), mm(yCenter), mm(z)]} rotation={[0, rotY, 0]}>
      <mesh>
        <boxGeometry args={[mm(W_pin), mm(H), mm(D)]} />
        <meshStandardMaterial color={COLOR.jstShroud} roughness={0.7} metalness={0} />
      </mesh>
      <mesh position={[0, 0, mm(D / 2 - 0.3)]}>
        <boxGeometry args={[mm(W_pin - 1.2), mm(H - 1), mm(0.4)]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.95} />
      </mesh>
      {Array.from({ length: pins }).map((_, k) => (
        <mesh
          key={k}
          position={[
            mm(-W_pin / 2 + 0.7 + (k + 0.5) * PITCH),
            0,
            mm(D / 2 - 0.5),
          ]}
        >
          <boxGeometry args={[mm(0.35), mm(H - 1.4), mm(0.25)]} />
          <meshStandardMaterial color={COLOR.gold} roughness={0.4} metalness={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function MicroUsb({ x, z }: { x: number; z: number }) {
  const W = 7.5;
  const D = 5.6;
  const T = 2.5;
  return (
    <group position={[mm(x), mm(-(PCB_T / 2) - T / 2 - 0.2), mm(z)]}>
      <mesh>
        <boxGeometry args={[mm(W), mm(T), mm(D)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.3} metalness={0.88} />
      </mesh>
      <mesh position={[mm(-W / 2 + 0.6), 0, 0]}>
        <boxGeometry args={[mm(0.6), mm(1.6), mm(D - 1.2)]} />
        <meshStandardMaterial color="#040404" roughness={0.95} />
      </mesh>
      <mesh position={[mm(-W / 2 + 1.5), 0, 0]}>
        <boxGeometry args={[mm(0.8), mm(1.0), mm(D - 1.6)]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function UsbC({ x, z }: { x: number; z: number }) {
  const W = 9;
  const D = 7;
  const T = 3.4;
  return (
    <group position={[mm(x), mm(-(PCB_T / 2) - T / 2 - 0.2), mm(z)]}>
      <mesh>
        <boxGeometry args={[mm(W), mm(T), mm(D)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.3} metalness={0.88} />
      </mesh>
      <mesh position={[mm(-W / 2 + 0.6), 0, 0]}>
        <boxGeometry args={[mm(0.7), mm(1.6), mm(D - 2)]} />
        <meshStandardMaterial color="#040404" roughness={0.95} />
      </mesh>
      <mesh position={[mm(-W / 2 + 1.4), 0, 0]}>
        <boxGeometry args={[mm(0.5), mm(0.6), mm(D - 2.4)]} />
        <meshStandardMaterial color={COLOR.gold} roughness={0.4} metalness={0.85} />
      </mesh>
    </group>
  );
}

function TactButton({
  x,
  z,
  color = "#f4f4f4",
}: {
  x: number;
  z: number;
  color?: string;
}) {
  return (
    <group>
      <mesh position={[mm(x), mm(-(PCB_T / 2) - 1.6), mm(z)]}>
        <boxGeometry args={[mm(3.5), mm(3.2), mm(3.5)]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.05} />
      </mesh>
      <mesh position={[mm(x), mm(-(PCB_T / 2) - 3.2 - 0.3), mm(z)]}>
        <cylinderGeometry args={[mm(0.9), mm(0.9), mm(0.6), 16]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.5} />
      </mesh>
    </group>
  );
}

function MicroSd({ x, z }: { x: number; z: number }) {
  return (
    <group>
      <mesh position={[mm(x), mm(-(PCB_T / 2) - 1.5 / 2), mm(z)]}>
        <boxGeometry args={[mm(14), mm(1.5), mm(15)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.45} metalness={0.78} />
      </mesh>
      <mesh
        position={[mm(x), mm(-(PCB_T / 2) - 1.5 / 2), mm(z - 7.5 + 0.4)]}
      >
        <boxGeometry args={[mm(13), mm(1.2), mm(0.6)]} />
        <meshStandardMaterial color="#040404" roughness={0.95} />
      </mesh>
      {/* metal flap detail on top */}
      <mesh position={[mm(x), mm(-(PCB_T / 2) - 1.55), mm(z + 0.5)]}>
        <boxGeometry args={[mm(13.4), mm(0.15), mm(13)]} />
        <meshStandardMaterial color="#d4d6dc" roughness={0.35} metalness={0.9} />
      </mesh>
    </group>
  );
}

// ═════════════════════════════════════════════════════════════════════
// Main board model
// ═════════════════════════════════════════════════════════════════════

function Board() {
  const backTex = usePcbBackComposite();

  const TFT_W = 70;
  const TFT_H = 50;
  const TFT_T = 2.8;
  const FOAM_T = 1.0;
  const TFT_BOTTOM_Y = PCB_T / 2 + FOAM_T;
  const TFT_TOP_Y = TFT_BOTTOM_Y + TFT_T;
  const SCR_W = 57.6;
  const SCR_H = 43.2;

  // PCB base material props (yellow soldermask) — used for 5 of 6 faces
  const baseMatProps = {
    color: COLOR.pcb,
    roughness: 0.55,
    metalness: 0.06,
  } as const;

  return (
    <group>
      {/* ─────────────────  PCB body (6-face BoxGeometry)  ──────────────── */}
      <mesh>
        <boxGeometry args={[mm(PCB_W), mm(PCB_T), mm(PCB_H)]} />
        {/* +X */}
        <meshStandardMaterial attach="material-0" {...baseMatProps} />
        {/* -X */}
        <meshStandardMaterial attach="material-1" {...baseMatProps} />
        {/* +Y top (front, mostly hidden by display) */}
        <meshStandardMaterial attach="material-2" {...baseMatProps} />
        {/* -Y back: composite trace + silkscreen texture */}
        <meshStandardMaterial
          attach="material-3"
          color="#ffffff"
          map={backTex ?? undefined}
          roughness={0.55}
          metalness={0.06}
        />
        {/* +Z */}
        <meshStandardMaterial attach="material-4" {...baseMatProps} />
        {/* -Z */}
        <meshStandardMaterial attach="material-5" {...baseMatProps} />
      </mesh>

      {/* 4 corner mounting holes — dark cylinders to imply through-holes */}
      {[
        [39, 21.25],
        [-39, 21.25],
        [39, -21.25],
        [-39, -21.25],
      ].map(([x, z], i) => (
        <mesh key={`mh-${i}`} position={[mm(x), 0, mm(z)]}>
          <cylinderGeometry
            args={[mm(1.25), mm(1.25), mm(PCB_T + 0.15), 20]}
          />
          <meshStandardMaterial color={COLOR.hole} roughness={0.85} />
        </mesh>
      ))}
      {/* gold pad rings around mounting holes */}
      {[
        [39, 21.25],
        [-39, 21.25],
        [39, -21.25],
        [-39, -21.25],
      ].map(([x, z], i) => (
        <mesh
          key={`mh-ring-${i}`}
          position={[mm(x), mm(-(PCB_T / 2) - 0.02), mm(z)]}
        >
          <ringGeometry args={[mm(1.25), mm(2.0), 28]} />
          <meshStandardMaterial
            color={COLOR.gold}
            roughness={0.4}
            metalness={0.85}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* ─────────────────  FRONT — DISPLAY STACK  ──────────────── */}

      {/* Foam adhesive */}
      <mesh position={[0, mm(PCB_T / 2 + FOAM_T / 2), 0]}>
        <boxGeometry args={[mm(TFT_W - 6), mm(FOAM_T), mm(TFT_H - 6)]} />
        <meshStandardMaterial color={COLOR.foam} roughness={0.92} metalness={0} />
      </mesh>

      {/* TFT module body */}
      <mesh position={[0, mm(TFT_BOTTOM_Y + TFT_T / 2), 0]}>
        <boxGeometry args={[mm(TFT_W), mm(TFT_T), mm(TFT_H)]} />
        <meshStandardMaterial color={COLOR.bezel} roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Active screen surface — OFF state: dark with subtle cool emissive glow */}
      <mesh
        position={[0, mm(TFT_TOP_Y + 0.05), 0]}
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
      {/* TFT FFC ribbon — exits −X edge of display, folds onto PCB */}
      <mesh
        position={[
          mm(-TFT_W / 2 - 0.2),
          mm(PCB_T / 2 + (TFT_BOTTOM_Y - PCB_T / 2) / 2),
          0,
        ]}
      >
        <boxGeometry
          args={[mm(0.25), mm(TFT_BOTTOM_Y - PCB_T / 2), mm(13)]}
        />
        <meshStandardMaterial color={COLOR.ffc} roughness={0.7} />
      </mesh>
      <mesh position={[mm(-TFT_W / 2 - 1.5), mm(PCB_T / 2 + 0.05), 0]}>
        <boxGeometry args={[mm(2.5), mm(0.08), mm(13)]} />
        <meshStandardMaterial color={COLOR.ffc} roughness={0.7} />
      </mesh>

      {/* LDR/photoresistor on front */}
      <mesh position={[mm(38), mm(PCB_T / 2 + 0.75), mm(20)]}>
        <cylinderGeometry args={[mm(2.4), mm(2.4), mm(1.5), 24]} />
        <meshStandardMaterial color={COLOR.ldr} roughness={0.55} metalness={0.2} />
      </mesh>
      <mesh position={[mm(38), mm(PCB_T / 2 + 1.5 + 0.02), mm(20)]}>
        <cylinderGeometry args={[mm(1.8), mm(1.8), mm(0.05), 24]} />
        <meshStandardMaterial color={COLOR.ldrFace} roughness={0.5} metalness={0.55} />
      </mesh>

      {/* ──────────────────  BACK — COMPONENTS  ────────────────── */}

      {/* Dual USB connectors on −X edge */}
      <UsbC x={-PCB_W / 2 - 1} z={5} />
      <MicroUsb x={-PCB_W / 2 - 1} z={-6} />

      {/* ESP-WROOM-32 RF module body */}
      <mesh position={[mm(ESP_X), mm(-(PCB_T / 2) - ESP_T / 2), 0]}>
        <boxGeometry args={[mm(ESP_W), mm(ESP_T), mm(ESP_H)]} />
        <meshStandardMaterial color={COLOR.rfShield} roughness={0.5} metalness={0.65} />
      </mesh>
      {/* RF can lid seam (slight inset) */}
      <mesh
        position={[mm(ESP_X), mm(-(PCB_T / 2) - ESP_T - 0.02), mm(0)]}
      >
        <boxGeometry args={[mm(ESP_W - 0.4), mm(0.05), mm(ESP_H - 0.4)]} />
        <meshStandardMaterial color={COLOR.rfShieldDark} roughness={0.55} metalness={0.7} />
      </mesh>
      {/* "ESP32" silk plate on top of can */}
      <mesh
        position={[mm(ESP_X - 3), mm(-(PCB_T / 2) - ESP_T - 0.05), mm(0)]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[mm(8), mm(2.2)]} />
        <meshStandardMaterial color={COLOR.silk} roughness={0.7} toneMapped={false} />
      </mesh>
      {/* Espressif logo dot */}
      <mesh
        position={[mm(ESP_X + 3), mm(-(PCB_T / 2) - ESP_T - 0.05), mm(0)]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <circleGeometry args={[mm(1), 24]} />
        <meshStandardMaterial color={COLOR.silk} roughness={0.7} toneMapped={false} />
      </mesh>
      {/* Antenna meander zone at +X end of ESP module */}
      <mesh
        position={[mm(ESP_X + ESP_W / 2 + 3.5), mm(-(PCB_T / 2) - 0.04), 0]}
      >
        <boxGeometry args={[mm(7), mm(0.08), mm(ESP_H)]} />
        <meshStandardMaterial color="#a78420" roughness={0.65} metalness={0.3} />
      </mesh>
      {/* Antenna gold trace path */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={`ant-${i}`}
          position={[
            mm(ESP_X + ESP_W / 2 + 1.5 + i * 1.2),
            mm(-(PCB_T / 2) - 0.07),
            mm(((i % 2) - 0.5) * 5),
          ]}
        >
          <boxGeometry args={[mm(0.9), mm(0.06), mm(6)]} />
          <meshStandardMaterial color={COLOR.gold} roughness={0.45} metalness={0.85} />
        </mesh>
      ))}

      {/* CH340 USB-to-UART chip */}
      <ICBlock x={30} z={18} w={11} h={4} thick={1.5} />

      {/* 12 MHz crystal next to CH340 */}
      <mesh position={[mm(30), mm(-(PCB_T / 2) - 0.7 / 2), mm(13)]}>
        <boxGeometry args={[mm(3.2), mm(0.7), mm(2.5)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.4} metalness={0.85} />
      </mesh>

      {/* AMS1117-3.3 LDOs */}
      <ICBlock x={21} z={18} w={6.5} h={3.5} thick={1.6} pinDot={false} />
      <mesh
        position={[mm(21 - 1.6), mm(-(PCB_T / 2) - 1.6 - 0.15), mm(18)]}
      >
        <boxGeometry args={[mm(2.3), mm(0.3), mm(3)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.4} metalness={0.85} />
      </mesh>
      <ICBlock x={17} z={14} w={6.5} h={3.5} thick={1.6} pinDot={false} />
      <mesh
        position={[mm(17 - 1.6), mm(-(PCB_T / 2) - 1.6 - 0.15), mm(14)]}
      >
        <boxGeometry args={[mm(2.3), mm(0.3), mm(3)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.4} metalness={0.85} />
      </mesh>

      {/* Electrolytic caps */}
      {[
        [-15, 18],
        [-22, -18],
        [-8, 18],
      ].map(([x, z], i) => (
        <group key={`ec-${i}`}>
          <mesh
            position={[mm(x), mm(-(PCB_T / 2) - 1.5), mm(z)]}
          >
            <cylinderGeometry args={[mm(2), mm(2), mm(3), 24]} />
            <meshStandardMaterial color="#1a1a1c" roughness={0.7} metalness={0.2} />
          </mesh>
          {/* polarity strip */}
          <mesh
            position={[mm(x - 2), mm(-(PCB_T / 2) - 1.5), mm(z)]}
            rotation={[0, 0, 0]}
          >
            <boxGeometry args={[mm(0.05), mm(2.6), mm(0.7)]} />
            <meshStandardMaterial color="#bababa" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {/* XPT2046 touch controller */}
      <ICBlock x={14} z={14} w={5} h={4.5} thick={1.2} />

      {/* LCD FFC ZIF connector socket */}
      <mesh position={[mm(-32), mm(-(PCB_T / 2) - 0.75), mm(-3)]}>
        <boxGeometry args={[mm(11), mm(1.5), mm(3)]} />
        <meshStandardMaterial color="#3a2820" roughness={0.7} />
      </mesh>
      <mesh position={[mm(-32), mm(-(PCB_T / 2) - 1.4), mm(-2.2)]}>
        <boxGeometry args={[mm(10.5), mm(0.2), mm(1.4)]} />
        <meshStandardMaterial color={COLOR.metal} roughness={0.4} metalness={0.85} />
      </mesh>

      {/* MicroSD slot */}
      <MicroSd x={6} z={-17} />

      {/* RGB LED 5050 with red emissive dome */}
      <mesh position={[mm(8), mm(-(PCB_T / 2) - 1.5 / 2), mm(-9)]}>
        <boxGeometry args={[mm(5), mm(1.5), mm(5)]} />
        <meshStandardMaterial color={COLOR.rgbBody} roughness={0.5} />
      </mesh>
      <mesh position={[mm(8), mm(-(PCB_T / 2) - 1.5 - 0.1), mm(-9)]}>
        <cylinderGeometry args={[mm(2.2), mm(2.2), mm(0.2), 24]} />
        <meshStandardMaterial
          color="#888"
          emissive="#ff5511"
          emissiveIntensity={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Power LED red 0603 */}
      <mesh position={[mm(-25), mm(-(PCB_T / 2) - 0.45 / 2), mm(13)]}>
        <boxGeometry args={[mm(1.6), mm(0.45), mm(0.8)]} />
        <meshStandardMaterial
          color={COLOR.ledRed}
          emissive={COLOR.ledRed}
          emissiveIntensity={0.55}
          roughness={0.5}
        />
      </mesh>

      {/* Audio amp MSOP-8 */}
      <ICBlock x={-22} z={-10} w={3} h={3} thick={1} />

      {/* BOOT + RST tactile buttons (upper-right cluster) */}
      <TactButton x={33} z={18} />
      <TactButton x={33} z={14} />

      {/* SOD-123 schottky diode (D1) */}
      <mesh position={[mm(-34), mm(-(PCB_T / 2) - 0.55), mm(-10)]}>
        <boxGeometry args={[mm(2.7), mm(1.1), mm(1.6)]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} metalness={0.1} />
      </mesh>
      <mesh
        position={[mm(-34 + 0.85), mm(-(PCB_T / 2) - 1.1 - 0.04), mm(-10)]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[mm(0.4), mm(1.4)]} />
        <meshStandardMaterial color={COLOR.silk} roughness={0.7} toneMapped={false} />
      </mesh>

      {/* Q1, Q2, Q3 SOT-23 transistors */}
      {[8, 5, 2].map((z, i) => (
        <mesh
          key={`sot-${i}`}
          position={[mm(-16), mm(-(PCB_T / 2) - 1.1 / 2), mm(z)]}
        >
          <boxGeometry args={[mm(2.9), mm(1.1), mm(1.3)]} />
          <meshStandardMaterial color={COLOR.ic} roughness={0.85} />
        </mesh>
      ))}

      {/* Backlight MOSFET (SOT-23) */}
      <mesh position={[mm(-25), mm(-(PCB_T / 2) - 1.1 / 2), mm(-7)]}>
        <boxGeometry args={[mm(2.9), mm(1.1), mm(1.3)]} />
        <meshStandardMaterial color={COLOR.ic} roughness={0.85} />
      </mesh>

      {/* JST-PH 1.25 mm connectors — 3 stacked on -Z right edge per photo,
          1 on +Z bottom-left near USB */}
      <JstConnector x={16} z={-22} pins={4} facing="z-" /> {/* P1 UART */}
      <JstConnector x={8} z={-22} pins={4} facing="z-" />  {/* P3 GPIO */}
      <JstConnector x={1} z={-22} pins={2} facing="z-" />  {/* P4 Speaker */}
      <JstConnector x={-34} z={22} pins={4} facing="z+" /> {/* CN1 I2C */}

      {/* JP0/JP3 solder jumper pad pairs (small bumps over canvas pads) */}
      {[
        [-7, 9.4],
        [-7, 8.4],
        [-7, -8.4],
        [-7, -9.4],
      ].map(([x, z], i) => (
        <mesh
          key={`jp-${i}`}
          position={[mm(x), mm(-(PCB_T / 2) - 0.04), mm(z)]}
        >
          <boxGeometry args={[mm(0.95), mm(0.06), mm(0.6)]} />
          <meshStandardMaterial color={COLOR.gold} roughness={0.4} metalness={0.85} />
        </mesh>
      ))}

      {/* ──────────────  SMD passives — 60+ ───────────── */}
      {/* ESP module decoupling caps */}
      {[
        [10, 6],
        [10, -6],
        [10, 0],
        [33, 8],
        [33, -8],
        [13, 5],
        [13, -5],
        [11, 3],
        [11, -3],
      ].map(([x, z], i) => (
        <SmdPassive key={`esp-c-${i}`} x={x} z={z} color="#d8c890" />
      ))}

      {/* CH340 support passives */}
      {[
        [25, 21],
        [35, 21],
        [30, 14],
        [27, 14],
        [33, 14.5],
        [22, 14],
      ].map(([x, z], i) => (
        <SmdPassive key={`ch-c-${i}`} x={x} z={z} color="#d8c890" />
      ))}

      {/* LDO support caps */}
      {[
        [14, 21],
        [14, 18],
        [11, 14],
        [25, 14],
        [12, 16],
      ].map(([x, z], i) => (
        <SmdPassive key={`ldo-c-${i}`} x={x} z={z} color="#d8c890" />
      ))}

      {/* R10–R14 resistor cluster (black 0603) */}
      {[30, 27, 24, 21, 18].map((x, i) => (
        <SmdPassive key={`r-cluster-${i}`} x={x} z={-15} color="#15151c" />
      ))}

      {/* Backlight + power filter passives */}
      {[
        [-22, -7],
        [-28, -7],
        [-30, -10],
        [-22, -4],
      ].map(([x, z], i) => (
        <SmdPassive key={`bl-c-${i}`} x={x} z={z} color="#15151c" />
      ))}

      {/* U4 unpopulated PSRAM SOIC-8 footprint pads (raised slightly) */}
      {Array.from({ length: 8 }).map((_, i) => {
        const side = i < 4 ? -1 : 1;
        const k = i < 4 ? i : i - 4;
        return (
          <mesh
            key={`u4-${i}`}
            position={[
              mm(-1 + (-1.905 + k * 1.27)),
              mm(-(PCB_T / 2) - 0.03),
              mm(-19 + side * 1.27),
            ]}
          >
            <boxGeometry args={[mm(0.6), mm(0.05), mm(1.2)]} />
            <meshStandardMaterial
              color={COLOR.gold}
              roughness={0.4}
              metalness={0.85}
            />
          </mesh>
        );
      })}

      {/* Misc scattered SMD passives — many */}
      {(
        [
          [-10, 10],
          [-10, -10],
          [-5, 5],
          [-5, -5],
          [-2, 18],
          [-2, -18],
          [-22, 5],
          [-22, -5],
          [-26, 10],
          [-26, -8],
          [13, 12],
          [13, -12],
          [22, -14],
          [37, 0],
          [37, 12],
          [37, -12],
          [-12, 17],
          [-12, -17],
          [-7, 13],
          [-7, -13],
          [-19, -15],
          [-15, -16],
          [3, -10],
          [-2, -10],
          [-2, 8],
          [-7, 4],
          [-7, -4],
          [3, 14],
          [-25, 0],
          [-30, 5],
          [-30, -5],
          [36, 14],
          [36, -14],
          [-32, 14],
          [-32, -14],
          [16, -18],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <SmdPassive
          key={`misc-${i}`}
          x={x}
          z={z}
          color={i % 4 === 0 ? "#15151c" : "#d8c890"}
        />
      ))}

      {/* extra few 0805 caps for size variety */}
      {(
        [
          [-18, 20],
          [-22, 20],
          [-30, 10],
          [-30, -10],
          [4, -20],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <SmdPassive key={`b-${i}`} x={x} z={z} size="0805" color="#d8c890" />
      ))}
    </group>
  );
}

function AutoOrbit({
  enabled,
  speed = 0.0025,
  children,
}: {
  enabled: boolean;
  speed?: number;
  children: React.ReactNode;
}) {
  const ref = React.useRef<THREE.Group>(null);
  useFrame(() => {
    if (enabled && ref.current) {
      ref.current.rotation.y += speed;
    }
  });
  return <group ref={ref}>{children}</group>;
}

export function Board3D() {
  const [interacted, setInteracted] = React.useState(false);

  return (
    <Canvas
      camera={{ position: [1.6, 1.1, 1.6], fov: 35 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 1.75]}
      onPointerDown={() => setInteracted(true)}
    >
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#a8c0e0", "#15151a", 0.55]} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} />
      <directionalLight position={[0, -3, 1]} intensity={0.25} />
      <pointLight position={[2, 4, 4]} intensity={0.3} />

      <AutoOrbit enabled={!interacted}>
        <group rotation={[0.18, 0, 0]}>
          <group rotation={[0, 0, Math.PI / 2]}>
            <Board />
          </group>
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
  );
}

export default Board3D;
