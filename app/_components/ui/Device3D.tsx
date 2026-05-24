"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";

// ── World scale ──────────────────────────────────────────────────
// 1 world unit = 1 mm × SCALE. Tuned so the case fills the canvas nicely.
const SCALE = 0.0095;
const mm = (n: number) => n * SCALE;

// ── Palette ──────────────────────────────────────────────────────
const COLOR = {
  pcb: "#cfa520",            // yellow CYD PCB
  pcbGreen: "#1a3b25",       // alt PCB (unused, kept as ref)
  case: "#16161a",           // matte black plastic, slight blue undertone
  caseHi: "#26262c",         // catch-light highlight tone
  shellInner: "#0c0c10",     // inside of shell (deeper black)
  screenBlack: "#040406",    // off-LCD glass
  steel: "#dadce2",          // stainless USB-C shell
  steelDeep: "#9ea2ac",      // shaded steel
  esp: "#c8ccd2",            // RF shield brushed steel
  espDark: "#3a3d44",        // RF shield etched text
  gold: "#caa54a",           // contact pad gold
  black: "#06070a",          // deep void
  rubber: "#101013",         // dust gasket
  silkWhite: "#f4ebd0",      // PCB silkscreen
};

// PayDeck theme colors INVERTED (firmware ships with tft.invertDisplay(true))
const TH = {
  BG: "#000000",
  TEXT: "#e8eae8",
  TEXT_SEC: "#808080",
  PRIMARY: "#8C5FAD",
  BORDER: "#2f2f2f",
};

// ─────────────────────────────────────────────────────────────────
//  Screen content (drawn to a CanvasTexture)
// ─────────────────────────────────────────────────────────────────
function useScreenTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 480;
    const H = 640;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.scale(2, 2);

    const BAR_TOP = 20;
    const BAR_BOTTOM = 36;
    const MARGIN = 8;
    const SW = 240;
    const SH = 320;
    const cx = SW / 2;

    ctx.fillStyle = TH.BG;
    ctx.fillRect(0, 0, SW, SH);

    // Menu pill
    ctx.strokeStyle = TH.BORDER;
    ctx.lineWidth = 1;
    roundRect(ctx, 8.5, 0.5, 52, 18, 3);
    ctx.stroke();
    ctx.fillStyle = TH.TEXT;
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Menu", 8 + 26, 9.5);

    // WiFi icon
    const wifiCx = SW - 17;
    const wifiCy = 14;
    ctx.strokeStyle = TH.PRIMARY;
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(wifiCx, wifiCy, 3 + i * 2.5, Math.PI * 1.18, Math.PI * 1.82);
      ctx.stroke();
    }
    ctx.fillStyle = TH.PRIMARY;
    ctx.beginPath();
    ctx.arc(wifiCx, wifiCy, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Title
    ctx.fillStyle = TH.TEXT;
    ctx.font = "13px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Awaiting payment", cx, BAR_TOP + 6);

    // Amount
    const numText = "12.50";
    const curText = "NEX";
    ctx.font = "bold 26px ui-sans-serif, system-ui, sans-serif";
    const numW = ctx.measureText(numText).width;
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    const curW = ctx.measureText(curText).width;
    const gap = 5;
    const totalW = numW + gap + curW;
    const startX = cx - totalW / 2;
    const amtY = BAR_TOP + 24;
    ctx.fillStyle = TH.TEXT;
    ctx.font = "bold 26px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(numText, startX, amtY);
    ctx.fillStyle = TH.TEXT_SEC;
    ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
    ctx.fillText(curText, startX + numW + gap, amtY + 26 - 12);

    // QR
    const headerBottom = amtY + 26 + 6;
    const areaY = headerBottom;
    const areaH = SH - BAR_BOTTOM - areaY - 8;
    const qrSize = Math.min(areaH - 16, SW - 2 * MARGIN - 24);
    const qrX = cx - qrSize / 2;
    const qrY = areaY + (areaH - qrSize) / 2;

    ctx.fillStyle = TH.BG;
    ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

    ctx.fillStyle = "#ffffff";
    const cells = 25;
    const cell = qrSize / cells;
    for (let y = 0; y < cells; y++) {
      for (let x = 0; x < cells; x++) {
        const inTL = x < 7 && y < 7;
        const inTR = x >= cells - 7 && y < 7;
        const inBL = x < 7 && y >= cells - 7;
        let on: boolean;
        if (inTL || inTR || inBL) {
          const lx = inTR ? x - (cells - 7) : x;
          const ly = inBL ? y - (cells - 7) : y;
          on =
            lx === 0 ||
            lx === 6 ||
            ly === 0 ||
            ly === 6 ||
            (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
        } else {
          const v = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          on = (((v % 1) + 1) % 1) > 0.55;
        }
        if (on) ctx.fillRect(qrX + x * cell, qrY + y * cell, cell, cell);
      }
    }

    // Bottom bar
    const barY = SH - BAR_BOTTOM;
    const btnH = 28;
    const btnY = barY + (BAR_BOTTOM - btnH) / 2;
    const btnGap = 4;
    const fullW = SW - 2 * MARGIN;
    const btnW = (fullW - 2 * btnGap) / 3;

    drawScreenButton(ctx, MARGIN, btnY, btnW, btnH, "Back", false);
    drawScreenButton(
      ctx,
      MARGIN + btnW + btnGap,
      btnY,
      btnW,
      btnH,
      "Refresh",
      true
    );
    drawScreenButton(
      ctx,
      MARGIN + 2 * (btnW + btnGap),
      btnY,
      btnW,
      btnH,
      "Cancel",
      false
    );

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawScreenButton(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  label: string,
  primary: boolean
) {
  if (primary) {
    ctx.fillStyle = TH.PRIMARY;
    roundRect(ctx, x, y, w, h, 4);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
  } else {
    ctx.fillStyle = TH.BG;
    roundRect(ctx, x, y, w, h, 4);
    ctx.fill();
    ctx.strokeStyle = TH.BORDER;
    ctx.lineWidth = 1;
    roundRect(ctx, x + 0.5, y + 0.5, w - 1, h - 1, 4);
    ctx.stroke();
    ctx.fillStyle = TH.TEXT;
  }
  ctx.font = "12px ui-sans-serif, system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x + w / 2, y + h / 2 + 0.5);
}

// ─────────────────────────────────────────────────────────────────
//  Geometry helpers
// ─────────────────────────────────────────────────────────────────

// Centered rounded-rectangle shape, in mm (caller wraps with `mm()`).
// Optional `bottomNotch` = { w, h } cuts a rectangular notch in the bottom edge.
function roundedRectShape(
  w: number,
  h: number,
  r: number,
  bottomNotch?: { w: number; h: number }
): THREE.Shape {
  const s = new THREE.Shape();
  const rr = Math.min(r, w / 2, h / 2);
  const x0 = -w / 2;
  const y0 = -h / 2;

  s.moveTo(x0 + rr, y0 + h);
  s.lineTo(x0 + w - rr, y0 + h);
  s.quadraticCurveTo(x0 + w, y0 + h, x0 + w, y0 + h - rr);
  s.lineTo(x0 + w, y0 + rr);
  s.quadraticCurveTo(x0 + w, y0, x0 + w - rr, y0);
  if (bottomNotch) {
    s.lineTo(bottomNotch.w / 2, y0);
    s.lineTo(bottomNotch.w / 2, y0 + bottomNotch.h);
    s.lineTo(-bottomNotch.w / 2, y0 + bottomNotch.h);
    s.lineTo(-bottomNotch.w / 2, y0);
  }
  s.lineTo(x0 + rr, y0);
  s.quadraticCurveTo(x0, y0, x0, y0 + rr);
  s.lineTo(x0, y0 + h - rr);
  s.quadraticCurveTo(x0, y0 + h, x0 + rr, y0 + h);
  return s;
}

function roundedRectPath(
  cx: number,
  cy: number,
  w: number,
  h: number,
  r: number,
  bottomNotch?: { w: number; h: number }
): THREE.Path {
  const p = new THREE.Path();
  const rr = Math.min(r, w / 2, h / 2);
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  p.moveTo(x0 + rr, y0);
  if (bottomNotch) {
    p.lineTo(-bottomNotch.w / 2, y0);
    p.lineTo(-bottomNotch.w / 2, y0 + bottomNotch.h);
    p.lineTo(bottomNotch.w / 2, y0 + bottomNotch.h);
    p.lineTo(bottomNotch.w / 2, y0);
  }
  p.lineTo(x0 + w - rr, y0);
  p.quadraticCurveTo(x0 + w, y0, x0 + w, y0 + rr);
  p.lineTo(x0 + w, y0 + h - rr);
  p.quadraticCurveTo(x0 + w, y0 + h, x0 + w - rr, y0 + h);
  p.lineTo(x0 + rr, y0 + h);
  p.quadraticCurveTo(x0, y0 + h, x0, y0 + h - rr);
  p.lineTo(x0, y0 + rr);
  p.quadraticCurveTo(x0, y0, x0 + rr, y0);
  return p;
}

function circlePath(cx: number, cy: number, r: number): THREE.Path {
  const p = new THREE.Path();
  p.absarc(cx, cy, r, 0, Math.PI * 2, true);
  return p;
}

// ─────────────────────────────────────────────────────────────────
//  Texture: ESP-WROOM-32 RF shield (brushed steel + laser etch).
//  The shield only covers the lower ~70% of the module — the top
//  ~30% holds the PCB antenna and is rendered separately.
// ─────────────────────────────────────────────────────────────────
function useEspShieldTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 512;
    const H = 360;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    // Base brushed-steel gradient
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#b9bcc4");
    g.addColorStop(0.5, "#d4d6dc");
    g.addColorStop(1, "#a6a9b1");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Brushed lines — finer grain
    for (let i = 0; i < 1400; i++) {
      const y = Math.random() * H;
      ctx.strokeStyle = `rgba(255,255,255,${0.03 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.4 + Math.random() * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + (Math.random() - 0.5) * 3);
      ctx.stroke();
    }
    for (let i = 0; i < 700; i++) {
      const y = Math.random() * H;
      ctx.strokeStyle = `rgba(0,0,0,${0.03 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + (Math.random() - 0.5) * 4);
      ctx.stroke();
    }

    // Subtle outer border (the punched-formed edge of the shield)
    ctx.strokeStyle = "rgba(0,0,0,0.45)";
    ctx.lineWidth = 5;
    ctx.strokeRect(3, 3, W - 6, H - 6);
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(7, 7, W - 14, H - 14);

    // Inner indentation — the rectangular indent stamped into the top of
    // an ESP-WROOM shield, gives the lid its characteristic recessed look.
    const indentX = 36;
    const indentY = 36;
    ctx.strokeStyle = "rgba(0,0,0,0.32)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(indentX, indentY, W - 2 * indentX, H - 2 * indentY);
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.strokeRect(indentX + 1.5, indentY + 1.5, W - 2 * indentX - 3, H - 2 * indentY - 3);

    // Espressif logo — concentric "atom" rings
    const logoX = W / 2;
    const logoY = H / 2 - 78;
    ctx.strokeStyle = "rgba(36,38,44,0.85)";
    ctx.lineWidth = 3.2;
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(logoX, logoY);
      ctx.rotate((i * Math.PI) / 3);
      ctx.beginPath();
      ctx.ellipse(0, 0, 24, 9.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.fillStyle = "rgba(36,38,44,0.9)";
    ctx.beginPath();
    ctx.arc(logoX, logoY, 4, 0, Math.PI * 2);
    ctx.fill();

    // ESPRESSIF wordmark
    ctx.fillStyle = "rgba(36,38,44,0.85)";
    ctx.font = "bold 38px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ESPRESSIF", W / 2, H / 2 - 24);

    // Module identifier
    ctx.font = "bold 26px ui-monospace, monospace";
    ctx.fillStyle = "rgba(36,38,44,0.78)";
    ctx.fillText("ESP-WROOM-32", W / 2, H / 2 + 18);

    // Compliance text (smaller)
    ctx.font = "14px ui-monospace, monospace";
    ctx.fillStyle = "rgba(36,38,44,0.55)";
    ctx.fillText("FCC ID: 2AC7Z-ESPWROOM32", W / 2, H / 2 + 56);
    ctx.fillText("IC: 21098-ESPWROOM32", W / 2, H / 2 + 80);
    ctx.fillText("CE  RoHS  REACH", W / 2, H / 2 + 104);

    // QR code corner marker (real shields have one)
    const qx = W - 78;
    const qy = H - 78;
    const qs = 56;
    ctx.fillStyle = "rgba(36,38,44,0.78)";
    const qcells = 11;
    const qcell = qs / qcells;
    for (let y = 0; y < qcells; y++) {
      for (let x = 0; x < qcells; x++) {
        const inTL = x < 3 && y < 3;
        const inTR = x >= qcells - 3 && y < 3;
        const inBL = x < 3 && y >= qcells - 3;
        let on: boolean;
        if (inTL || inTR || inBL) {
          const lx = inTR ? x - (qcells - 3) : x;
          const ly = inBL ? y - (qcells - 3) : y;
          on = lx === 0 || lx === 2 || ly === 0 || ly === 2 || lx + ly === 1;
        } else {
          const v = Math.sin(x * 7.31 + y * 41.7) * 9.5;
          on = (((v % 1) + 1) % 1) > 0.55;
        }
        if (on) ctx.fillRect(qx + x * qcell, qy + y * qcell, qcell, qcell);
      }
    }

    // Pin-1 mark — small dot in upper-left of compliance area
    ctx.fillStyle = "rgba(36,38,44,0.72)";
    ctx.beginPath();
    ctx.arc(60, 60, 4, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────
//  Texture: ESP-WROOM-32 PCB antenna section (top of module).
//  Shows the meandering trace antenna and matching network pads.
// ─────────────────────────────────────────────────────────────────
function useEspAntennaTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 512;
    const H = 220;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    // Base PCB substrate (matches CYD yellow)
    ctx.fillStyle = COLOR.pcb;
    ctx.fillRect(0, 0, W, H);

    // Faint copper hatching
    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // The signature meander-line antenna trace — silver/white tinned copper
    ctx.strokeStyle = "#e8eaee";
    ctx.fillStyle = "#e8eaee";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    // Trace winds back and forth across the upper portion of the module
    const ax0 = 70;
    const ax1 = W - 70;
    const ay0 = 40;
    const ay1 = H - 40;
    const turns = 6;
    const turnH = (ay1 - ay0) / turns;
    ctx.beginPath();
    ctx.moveTo(ax0, ay1);
    let dir = 1;
    for (let t = 0; t < turns; t++) {
      const yTop = ay1 - (t + 1) * turnH;
      ctx.lineTo(dir > 0 ? ax1 : ax0, ay1 - t * turnH);
      ctx.lineTo(dir > 0 ? ax1 : ax0, yTop);
      dir = -dir;
    }
    ctx.lineTo(ax0, ay0);
    ctx.stroke();

    // Feed pad (square)
    ctx.fillRect(ax0 - 16, ay1 - 8, 16, 16);
    // Antenna tip pad
    ctx.fillRect(ax0 - 6, ay0 - 6, 12, 12);

    // Solder mask outline (thin dark border around the trace area)
    ctx.strokeStyle = "rgba(0,0,0,0.18)";
    ctx.lineWidth = 1;
    ctx.strokeRect(20, 20, W - 40, H - 40);

    // White silkscreen text along the antenna edge
    ctx.fillStyle = COLOR.silkWhite;
    ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "left";
    ctx.fillText("ANT", 28, H - 18);
    ctx.textAlign = "right";
    ctx.fillText("2.4GHz", W - 28, H - 18);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────
//  Texture: Back panel of case (wordmark + faint mold lines)
// ─────────────────────────────────────────────────────────────────
function useBackPanelTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 1024;
    const H = 1664; // matches ~58×94 aspect
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    // Base matte black with very subtle gradient
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#1a1a1f");
    g.addColorStop(0.5, "#16161a");
    g.addColorStop(1, "#121216");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Subtle film grain — gives PBR textures something to bite
    const img = ctx.getImageData(0, 0, W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.random() - 0.5) * 12;
      d[i] = Math.max(0, Math.min(255, d[i] + n));
      d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
      d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
    }
    ctx.putImageData(img, 0, 0);

    // PayDeck wordmark — debossed (subtle, not loud)
    ctx.save();
    ctx.translate(W / 2, H * 0.78);
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.font = "300 110px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PayDeck", 0, 2);
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillText("PayDeck", 0, 0);

    // Tiny tagline below
    ctx.fillStyle = "rgba(180,180,190,0.18)";
    ctx.font = "300 28px ui-monospace, monospace";
    ctx.fillText("·  N E X A   P O S  ·", 0, 70);
    ctx.restore();

    // Compliance text bottom
    ctx.fillStyle = "rgba(180,180,190,0.18)";
    ctx.font = "20px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("MODEL  PD-01     v0.4.0     CE  FCC", W / 2, H - 84);

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 16;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────
//  PCB silkscreen texture (visible through vents)
// ─────────────────────────────────────────────────────────────────
function usePcbTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 512;
    const H = 880;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;

    // Yellow CYD substrate
    ctx.fillStyle = COLOR.pcb;
    ctx.fillRect(0, 0, W, H);

    // Copper ground-fill hatching (very subtle darker)
    ctx.strokeStyle = "rgba(0,0,0,0.06)";
    ctx.lineWidth = 1;
    for (let y = 0; y < H; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y);
      ctx.stroke();
    }

    // Silkscreen
    ctx.fillStyle = COLOR.silkWhite;
    ctx.font = "14px ui-monospace, monospace";
    ctx.textAlign = "left";
    ctx.fillText("ESP32-2432S028R", 30, 60);
    ctx.font = "10px ui-monospace, monospace";
    ctx.fillText("CYD  v1.4", 30, 78);

    // Random component pads
    for (let i = 0; i < 90; i++) {
      const x = Math.random() * W;
      const y = 100 + Math.random() * (H - 200);
      ctx.fillStyle = ["#cccccc", "#888888", "#222222"][i % 3];
      const w = 4 + Math.random() * 8;
      const h = 4 + Math.random() * 8;
      ctx.fillRect(x, y, w, h);
    }

    // Trace lines (silkscreen ref)
    ctx.strokeStyle = "rgba(255,255,255,0.18)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * W, Math.random() * H);
      ctx.lineTo(Math.random() * W, Math.random() * H);
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

// ─────────────────────────────────────────────────────────────────
//  USB-C female receptacle (SMD type, USB4105-GF-A class)
//  All inner dims in raw mm; outer wrapper scales by SCALE.
//
//  Local frame (before rotation):
//    X = long axis (W ≈ 8.94 mm)
//    Y = thin axis (T ≈ 3.26 mm)
//    Z = depth (0 at mouth, +D at sealed back)
//
//  After rotation [-π/2, 0, π]:
//    local +Z (extrude) → world +Y (up — body extends into case)
//    local +Y (top)    → world +Z (toward screen / front)
//    local -Y (bottom) → world -Z (toward back panel)
// ─────────────────────────────────────────────────────────────────
function UsbCReceptacle({ position }: { position: [number, number, number] }) {
  // ── Real-world dimensions (USB Type-C SMD female receptacle) ──
  const W = 8.94;
  const D = 7.35;
  const T = 3.26;

  // Inner cavity (rounded "stadium" — full half-rad on short edges)
  const INNER_W = 8.34;
  const INNER_T = 2.56;
  const INNER_R = INNER_T / 2; // 1.28 — true oval ends
  const INNER_HW = INNER_W / 2 - INNER_R;

  // Tongue (thin daughter PCB inside)
  const TONGUE_W = 6.65;
  const TONGUE_T = 0.7;
  const TONGUE_LEN = 6.4;
  const TONGUE_FRONT_Z = 0.85;                       // setback from mouth
  const TONGUE_BACK_Z = TONGUE_FRONT_Z + TONGUE_LEN;
  const TONGUE_CENTER_Z = (TONGUE_FRONT_Z + TONGUE_BACK_Z) / 2;

  // Sealed plastic insert at back of cavity
  const BACK_WALL_Z = D - 0.6;
  const BACK_WALL_T = 0.55;

  // Stadium-shape helper: outline made of a rectangle with two semicircular
  // end caps — the shape every real USB-C steel shell tapers into.
  const stadiumShape = (hw: number, hh: number, r: number): THREE.Shape => {
    const s = new THREE.Shape();
    s.moveTo(-hw + r, -hh);
    s.lineTo(hw - r, -hh);
    s.absarc(hw - r, 0, hh, -Math.PI / 2, Math.PI / 2, false);
    s.lineTo(-hw + r, hh);
    s.absarc(-hw + r, 0, hh, Math.PI / 2, (3 * Math.PI) / 2, false);
    return s;
  };

  const stadiumPath = (hw: number, hh: number, r: number): THREE.Path => {
    const p = new THREE.Path();
    p.moveTo(-hw + r, -hh);
    p.lineTo(hw - r, -hh);
    p.absarc(hw - r, 0, hh, -Math.PI / 2, Math.PI / 2, false);
    p.lineTo(-hw + r, hh);
    p.absarc(-hw + r, 0, hh, Math.PI / 2, (3 * Math.PI) / 2, false);
    return p;
  };

  // ── Outer steel shell ──
  // Pill-shaped outline (full half-radius on the short edges = T/2). The
  // cavity is a slightly smaller stadium hole. This matches the actual
  // forming of a stamped-steel USB-C shell far better than the previous
  // flat rectangle did.
  const shellGeom = React.useMemo(() => {
    const outer = stadiumShape(W / 2, T / 2, T / 2);
    outer.holes.push(stadiumPath(INNER_W / 2, INNER_T / 2, INNER_R));

    return new THREE.ExtrudeGeometry(outer, {
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.14,
      bevelOffset: 0,
      bevelSegments: 4,
      curveSegments: 36,
    });
  }, []);

  // ── Mouth lip ring ──
  // A thin ring of steel at the very front of the cavity that gives the
  // entrance a subtle chamfered flare — the lead-in surface visible just
  // inside the mouth on a real receptacle.
  const lipGeom = React.useMemo(() => {
    const ring = stadiumShape(
      INNER_W / 2 + 0.18,
      INNER_T / 2 + 0.13,
      INNER_R + 0.13,
    );
    ring.holes.push(
      stadiumPath(INNER_W / 2 - 0.06, INNER_T / 2 - 0.06, INNER_R - 0.06),
    );
    return new THREE.ExtrudeGeometry(ring, {
      depth: 0.4,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 2,
      curveSegments: 28,
    });
  }, []);

  // ── Inner cavity walls (visible inside the mouth past the lip) ──
  // A short tube running from just inside the lip to the back wall, in a
  // darker shaded steel — gives proper depth to the cavity.
  const innerWallGeom = React.useMemo(() => {
    const outer = stadiumShape(
      INNER_W / 2 + 0.04,
      INNER_T / 2 + 0.04,
      INNER_R + 0.04,
    );
    outer.holes.push(
      stadiumPath(INNER_W / 2 - 0.02, INNER_T / 2 - 0.02, INNER_R - 0.02),
    );
    return new THREE.ExtrudeGeometry(outer, {
      depth: D - 0.7,
      bevelEnabled: false,
      curveSegments: 28,
    });
  }, []);

  // ── Sealed plastic back wall ──
  const backWallGeom = React.useMemo(() => {
    const s = stadiumShape(
      INNER_W / 2 - 0.04,
      INNER_T / 2 - 0.04,
      INNER_R - 0.04,
    );
    return new THREE.ExtrudeGeometry(s, {
      depth: BACK_WALL_T,
      bevelEnabled: false,
      curveSegments: 28,
    });
  }, [BACK_WALL_T]);

  // ── Tongue with rounded ends (real tongues are pill-shaped, not rectangular) ──
  const tongueGeom = React.useMemo(() => {
    const t = stadiumShape(TONGUE_W / 2, TONGUE_T / 2, TONGUE_T / 2);
    return new THREE.ExtrudeGeometry(t, {
      depth: TONGUE_LEN,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 2,
      curveSegments: 16,
    });
  }, []);

  // 12 contact pad positions along the tongue (6 top + 6 bottom)
  const contactStride = (TONGUE_W - 1.6) / 5;
  const contactStartX = -(TONGUE_W - 1.6) / 2;

  return (
    <group position={position} scale={SCALE}>
      <group rotation={[-Math.PI / 2, 0, Math.PI]}>
        {/* ── Steel outer shell (pill profile) ── */}
        <mesh geometry={shellGeom} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={COLOR.steel}
            roughness={0.18}
            metalness={1.0}
            clearcoat={0.55}
            clearcoatRoughness={0.18}
            envMapIntensity={1.6}
          />
        </mesh>

        {/* ── Mouth lip ring (chamfered lead-in) ── */}
        <mesh geometry={lipGeom} position={[0, 0, -0.05]} castShadow>
          <meshPhysicalMaterial
            color={COLOR.steelDeep}
            roughness={0.32}
            metalness={1.0}
            clearcoat={0.4}
            clearcoatRoughness={0.3}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* ── Darker inner cavity surface (visible past the lip) ── */}
        <mesh geometry={innerWallGeom} position={[0, 0, 0.4]}>
          <meshPhysicalMaterial
            color="#5a5d66"
            roughness={0.5}
            metalness={1.0}
            envMapIntensity={1.0}
          />
        </mesh>

        {/* ── Sealed plastic back wall ── */}
        <mesh
          geometry={backWallGeom}
          position={[0, 0, BACK_WALL_Z]}
          receiveShadow
        >
          <meshStandardMaterial
            color="#08080c"
            roughness={0.95}
            metalness={0}
          />
        </mesh>

        {/* ── Tongue assembly (pill-shaped daughter PCB with gold contacts) ── */}
        <group position={[0, 0, TONGUE_FRONT_Z]}>
          {/* Tongue body */}
          <mesh geometry={tongueGeom} castShadow receiveShadow>
            <meshPhysicalMaterial
              color="#15151a"
              roughness={0.5}
              metalness={0.05}
              clearcoat={0.18}
              clearcoatRoughness={0.55}
            />
          </mesh>

          {/* 12 gold contact pads — proud of the tongue surface */}
          {[1, -1].flatMap((sign) =>
            Array.from({ length: 6 }).map((_, i) => {
              const x = contactStartX + i * contactStride;
              return (
                <mesh
                  key={`pad-${sign}-${i}`}
                  position={[
                    x,
                    sign * (TONGUE_T / 2 + 0.025),
                    TONGUE_LEN / 2,
                  ]}
                  castShadow
                >
                  <boxGeometry args={[0.4, 0.07, TONGUE_LEN - 1.4]} />
                  <meshPhysicalMaterial
                    color={COLOR.gold}
                    roughness={0.22}
                    metalness={1.0}
                    clearcoat={0.7}
                    clearcoatRoughness={0.18}
                    envMapIntensity={1.5}
                  />
                </mesh>
              );
            }),
          )}

          {/* Tiny dark separator strips between every other gold pad — the
              molded plastic ridges of a real USB-C tongue. */}
          {[1, -1].flatMap((sign) =>
            Array.from({ length: 5 }).map((_, i) => {
              const x = contactStartX + (i + 0.5) * contactStride;
              return (
                <mesh
                  key={`gap-${sign}-${i}`}
                  position={[
                    x,
                    sign * (TONGUE_T / 2 + 0.012),
                    TONGUE_LEN / 2,
                  ]}
                >
                  <boxGeometry args={[0.16, 0.04, TONGUE_LEN - 1.0]} />
                  <meshStandardMaterial
                    color="#0a0a0e"
                    roughness={0.85}
                    metalness={0}
                  />
                </mesh>
              );
            }),
          )}
        </group>

        {/* ── Spring detents — small steel bumps on the long flanks of the
            shell that grip the male plug. Visible from the outside as tiny
            domes. ── */}
        {[-1, 1].flatMap((side) =>
          [-1.6, 1.6].map((offset, i) => (
            <mesh
              key={`detent-${side}-${i}`}
              position={[offset, side * (T / 2 - 0.02), 1.6]}
              scale={[1, 0.5, 1]}
            >
              <sphereGeometry args={[0.22, 12, 8]} />
              <meshPhysicalMaterial
                color={COLOR.steel}
                roughness={0.22}
                metalness={1.0}
                envMapIntensity={1.5}
              />
            </mesh>
          )),
        )}

        {/* ── Mid-line seam (where the stamped shell halves meet) ── */}
        {[-1, 1].map((side) => (
          <mesh
            key={`seam-${side}`}
            position={[0, side * (T / 2 + 0.001), D / 2]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[W - 0.6, D - 0.4]} />
            <meshStandardMaterial
              color="#7c8088"
              roughness={0.35}
              metalness={1.0}
              transparent
              opacity={0}
            />
          </mesh>
        ))}

        {/* ── Side mounting tabs (the wing tabs that solder to the PCB) ── */}
        {[-1, 1].map((sign) => {
          const tabGeom = (() => {
            const s = new THREE.Shape();
            const tw = 1.4;
            const tl = 1.6;
            const r = 0.3;
            s.moveTo(-tw / 2 + r, -tl / 2);
            s.lineTo(tw / 2 - r, -tl / 2);
            s.quadraticCurveTo(tw / 2, -tl / 2, tw / 2, -tl / 2 + r);
            s.lineTo(tw / 2, tl / 2 - r);
            s.quadraticCurveTo(tw / 2, tl / 2, tw / 2 - r, tl / 2);
            s.lineTo(-tw / 2 + r, tl / 2);
            s.quadraticCurveTo(-tw / 2, tl / 2, -tw / 2, tl / 2 - r);
            s.lineTo(-tw / 2, -tl / 2 + r);
            s.quadraticCurveTo(-tw / 2, -tl / 2, -tw / 2 + r, -tl / 2);
            return new THREE.ExtrudeGeometry(s, {
              depth: T - 0.4,
              bevelEnabled: true,
              bevelThickness: 0.06,
              bevelSize: 0.05,
              bevelSegments: 2,
              curveSegments: 8,
            });
          })();
          return (
            <mesh
              key={`tab-${sign}`}
              geometry={tabGeom}
              position={[sign * (W / 2 + 0.65), -(T - 0.4) / 2, D - 1.7]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
            >
              <meshPhysicalMaterial
                color={COLOR.steelDeep}
                roughness={0.32}
                metalness={1.0}
                envMapIntensity={1.4}
              />
            </mesh>
          );
        })}

        {/* ── Solder feet (4) on the bottom rear of the shell ── */}
        {[-2.6, -1.0, 1.0, 2.6].map((x, i) => (
          <mesh
            key={`foot-${i}`}
            position={[x, -(T / 2 + 0.18), D - 0.9]}
            castShadow
          >
            <boxGeometry args={[0.7, 0.36, 1.5]} />
            <meshPhysicalMaterial
              color={COLOR.steelDeep}
              roughness={0.4}
              metalness={1.0}
              envMapIntensity={1.2}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ESP-WROOM-32 module visible through the back vent.
//
//  Module layout (long axis = X, antenna tip at +X end):
//    [PCB antenna section ~7 mm] [RF shielded section ~18.5 mm]
//
//  The shield only covers the lower ~73% of the module — the rest is
//  exposed PCB with the meander-line antenna trace.
// ─────────────────────────────────────────────────────────────────
function EspModule({
  position,
  shieldTex,
  antennaTex,
}: {
  position: [number, number, number];
  shieldTex: THREE.Texture | null;
  antennaTex: THREE.Texture | null;
}) {
  // Real ESP-WROOM-32 dimensions (mm)
  const ESP_LONG = 25.5;
  const ESP_SHORT = 18.0;
  const PCB_T = 0.8;
  const SHIELD_T = 0.85; // shield wall + lid above PCB
  const ANTENNA_LEN = 6.5;       // top portion: exposed PCB with antenna
  const SHIELD_LEN = ESP_LONG - ANTENNA_LEN;

  // Castellation pads — half-circle copper plates around the module edge.
  // ESP-WROOM-32 has 38 pins arranged: 9 on each long side + 10 on the
  // antenna-end short side (plus an extra row of 9 SMT-only pads inset
  // from each long side, but we approximate visible ones).
  const longPinCount = 9;
  const longPitch = 1.27;
  const longPinSpan = (longPinCount - 1) * longPitch;
  const longPinStartX = -SHIELD_LEN / 2 + (SHIELD_LEN - longPinSpan) / 2;

  // Shield mesh sits on the PCB and runs from the bottom edge up to
  // ANTENNA_START.
  const shieldX = ESP_LONG / 2 - SHIELD_LEN / 2; // shield centered on lower portion
  const antennaX = -ESP_LONG / 2 + ANTENNA_LEN / 2;

  return (
    <group position={position}>
      {/* ── Main PCB tail of the module ── */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[mm(ESP_LONG), mm(ESP_SHORT), mm(PCB_T)]} />
        <meshStandardMaterial
          color={COLOR.pcb}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      {/* ── Antenna section: PCB top with meander trace painted on it ── */}
      <mesh
        position={[mm(antennaX), 0, mm(PCB_T / 2 + 0.005)]}
        receiveShadow
      >
        <planeGeometry args={[mm(ANTENNA_LEN), mm(ESP_SHORT)]} />
        <meshStandardMaterial
          color="#ffffff"
          map={antennaTex || undefined}
          roughness={0.65}
          metalness={0.05}
        />
      </mesh>

      {/* ── Solder-mask separator stripe between antenna and shield ── */}
      <mesh
        position={[
          mm(-ESP_LONG / 2 + ANTENNA_LEN),
          0,
          mm(PCB_T / 2 + 0.01),
        ]}
      >
        <boxGeometry args={[mm(0.3), mm(ESP_SHORT - 0.4), mm(0.06)]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.92}
          metalness={0}
        />
      </mesh>

      {/* ── RF shield wall (the raised metal frame on the PCB) ── */}
      <mesh
        position={[mm(shieldX), 0, mm(PCB_T / 2 + SHIELD_T / 2 - 0.18)]}
        castShadow
        receiveShadow
      >
        <boxGeometry
          args={[mm(SHIELD_LEN - 0.3), mm(ESP_SHORT - 0.3), mm(SHIELD_T - 0.36)]}
        />
        <meshPhysicalMaterial
          color="#9da0a8"
          roughness={0.4}
          metalness={1.0}
          envMapIntensity={1.3}
        />
      </mesh>

      {/* ── RF shield lid (laser-etched top with branding/QR) ── */}
      <mesh
        position={[mm(shieldX), 0, mm(PCB_T / 2 + SHIELD_T - 0.16)]}
        castShadow
      >
        <boxGeometry args={[mm(SHIELD_LEN - 0.1), mm(ESP_SHORT - 0.1), mm(0.18)]} />
        <meshPhysicalMaterial
          color="#d8dadf"
          map={shieldTex || undefined}
          roughness={0.32}
          metalness={0.94}
          clearcoat={0.25}
          clearcoatRoughness={0.45}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* ── Castellations: half-cylinders along the two long sides
            of the shielded portion (visible silver pin pads) ── */}
      {Array.from({ length: longPinCount }).flatMap((_, i) =>
        [-1, 1].map((side) => (
          <mesh
            key={`cast-long-${side}-${i}`}
            position={[
              mm(longPinStartX + i * longPitch + shieldX),
              mm(side * (ESP_SHORT / 2 - 0.05)),
              mm(0),
            ]}
            rotation={[0, 0, side > 0 ? 0 : Math.PI]}
          >
            <cylinderGeometry
              args={[mm(0.42), mm(0.42), mm(PCB_T + 0.02), 12, 1, false, 0, Math.PI]}
            />
            <meshPhysicalMaterial
              color="#cdd0d6"
              roughness={0.42}
              metalness={1.0}
              envMapIntensity={1.3}
            />
          </mesh>
        )),
      )}

      {/* ── Castellations on the antenna-end short edge ── */}
      {Array.from({ length: 6 }).map((_, i) => {
        const stride = (ESP_SHORT - 3) / 5;
        const y = -(ESP_SHORT - 3) / 2 + i * stride;
        return (
          <mesh
            key={`cast-end-${i}`}
            position={[mm(-ESP_LONG / 2), mm(y), mm(0)]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry
              args={[mm(0.42), mm(0.42), mm(PCB_T + 0.02), 12, 1, false, 0, Math.PI]}
            />
            <meshPhysicalMaterial
              color="#cdd0d6"
              roughness={0.42}
              metalness={1.0}
              envMapIntensity={1.3}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Main device assembly
// ─────────────────────────────────────────────────────────────────
function Device() {
  const screenTex = useScreenTexture();
  const shieldTex = useEspShieldTexture();
  const antennaTex = useEspAntennaTexture();
  const backTex = useBackPanelTexture();
  const pcbTex = usePcbTexture();

  // ── Dimensions (in mm) ──────────────────────────────────────────
  const PCB_X = 50.5;
  const PCB_Y = 86;
  const PCB_Z = 1.6;

  const SCR_X = 49.6; // screen visible window
  const SCR_Y = 64.2;

  // Slight asymmetric bezel (more on bottom for the touch area)
  const BEZ_TOP = 12;
  const BEZ_BOT = 16;
  const BEZ_SIDE = 5;

  const CASE_X = SCR_X + 2 * BEZ_SIDE;
  const CASE_Y = SCR_Y + BEZ_TOP + BEZ_BOT;
  const CASE_Z = 14.0; // overall depth
  const CORNER_R = 4; // outer rounded corner radius

  const FRAME_T = 1.6; // front bezel thickness
  const WALL = 1.5; // back panel thickness
  const WALL_T = 1.6; // side wall thickness

  // PCB sits with its front (LCD) side toward +Z. Leave 3.5 mm of gap between
  // PCB back face and back-panel front face so the 2.6 mm ESP-WROOM module
  // and a small air gap fit cleanly.
  const PCB_BACK_GAP = 3.5;

  // Z layout: device centered on origin in Z
  const Z_FRONT = CASE_Z / 2;
  const Z_BACK = -CASE_Z / 2;
  const Z_PCB_CENTER = Z_BACK + WALL + PCB_BACK_GAP + PCB_Z / 2;
  const Z_PCB_FRONT = Z_PCB_CENTER + PCB_Z / 2;
  const Z_PCB_BACK = Z_PCB_CENTER - PCB_Z / 2;
  const Z_SCREEN_GLASS = Z_FRONT - 0.1;
  const Z_SCREEN_LCD = Z_FRONT - FRAME_T - 0.6;

  // USB-C cutout in the bottom edge of the shell
  const USB_NOTCH_W = 9.6;
  const USB_NOTCH_H = 3.8;

  // ── Outer shell (front + walls) — extruded shape with chamfer ──
  // Shape coords are pre-scaled to world units so the extruded geometry can be
  // dropped into the scene as-is (no mesh scaling needed).
  const shellGeom = React.useMemo(() => {
    const outer = roundedRectShape(mm(CASE_X), mm(CASE_Y), mm(CORNER_R), {
      w: mm(USB_NOTCH_W),
      h: mm(WALL_T - 0.1),
    });
    const inner = roundedRectPath(
      0,
      0,
      mm(CASE_X - 2 * WALL_T),
      mm(CASE_Y - 2 * WALL_T),
      mm(Math.max(CORNER_R - WALL_T, 1))
    );
    outer.holes.push(inner);
    return new THREE.ExtrudeGeometry(outer, {
      depth: mm(CASE_Z - WALL),
      bevelEnabled: true,
      bevelThickness: mm(1.0),
      bevelSize: mm(0.7),
      bevelOffset: mm(-0.1),
      bevelSegments: 5,
      curveSegments: 24,
    });
  }, []);

  // ── Front bezel (the closed front face with screen window) ──
  // Sized just slightly smaller than the outer outline so it nests cleanly.
  const frontBezelGeom = React.useMemo(() => {
    const outer = roundedRectShape(
      mm(CASE_X - 0.6),
      mm(CASE_Y - 0.6),
      mm(CORNER_R - 0.3)
    );
    // Screen window — offset upward so bottom bezel is taller (matches BEZ_TOP/BEZ_BOT split)
    const winCY = (BEZ_BOT - BEZ_TOP) / 2;
    const win = roundedRectPath(
      0,
      mm(winCY),
      mm(SCR_X + 0.4),
      mm(SCR_Y + 0.4),
      mm(1.6)
    );
    outer.holes.push(win);
    return new THREE.ExtrudeGeometry(outer, {
      depth: mm(FRAME_T),
      bevelEnabled: true,
      bevelThickness: mm(0.6),
      bevelSize: mm(0.45),
      bevelOffset: mm(-0.05),
      bevelSegments: 4,
      curveSegments: 24,
    });
  }, []);

  // ── Back panel: stamped vent grid + speaker grille + screw cutouts ──
  //
  // Vent layout: a true triangular (close-packed) lattice of round holes
  // positioned over the ESP-WROOM module. Real molded cases have proper
  // hex spacing, not a square grid with a half-step offset.
  const VENT_AREA_X = 32;
  const VENT_AREA_Y = 22;
  const VENT_CY = CASE_Y / 2 - VENT_AREA_Y / 2 - 6;
  const VENT_HOLE_R = 0.78;                          // slightly larger
  const VENT_PITCH = 2.25;                           // column pitch
  const VENT_ROW_PITCH = (VENT_PITCH * Math.sqrt(3)) / 2; // 1.95 mm
  const ventCols = Math.floor(VENT_AREA_X / VENT_PITCH);
  const ventRows = Math.floor(VENT_AREA_Y / VENT_ROW_PITCH);
  const VENT_X_START = -((ventCols - 1) * VENT_PITCH) / 2;
  const VENT_Y_START = VENT_CY - ((ventRows - 1) * VENT_ROW_PITCH) / 2;
  const ventCenters = React.useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let r = 0; r < ventRows; r++) {
      for (let c = 0; c < ventCols; c++) {
        const offset = r % 2 === 0 ? 0 : VENT_PITCH / 2;
        const x = VENT_X_START + c * VENT_PITCH + offset;
        const y = VENT_Y_START + r * VENT_ROW_PITCH;
        if (Math.abs(x) > VENT_AREA_X / 2) continue;
        if (Math.abs(y - VENT_CY) > VENT_AREA_Y / 2) continue;
        arr.push({ x, y });
      }
    }
    return arr;
  }, [VENT_PITCH, VENT_ROW_PITCH, VENT_X_START, VENT_Y_START, ventRows, ventCols]);

  // Speaker grille — denser circular arrangement, looks like a tiny
  // perforated speaker mesh (concentric rings).
  const speakerCenters = React.useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    const SP_CY = -CASE_Y / 2 + 16;
    arr.push({ x: 0, y: SP_CY });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      arr.push({ x: Math.cos(a) * 1.6, y: SP_CY + Math.sin(a) * 1.6 });
    }
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      arr.push({ x: Math.cos(a) * 3.0, y: SP_CY + Math.sin(a) * 3.0 });
    }
    return arr;
  }, [CASE_Y]);

  const backPanelGeom = React.useMemo(() => {
    const outer = roundedRectShape(
      mm(CASE_X - 0.6),
      mm(CASE_Y - 0.6),
      mm(CORNER_R - 0.3)
    );

    // Vent holes (round, hex-packed)
    for (const c of ventCenters) {
      outer.holes.push(circlePath(mm(c.x), mm(c.y), mm(VENT_HOLE_R)));
    }

    // Speaker grille (small perforations)
    for (const s of speakerCenters) {
      outer.holes.push(circlePath(mm(s.x), mm(s.y), mm(0.48)));
    }

    // 4 corner screws (countersunk bolt-head circles)
    const SCREW_INSET = 4.2;
    const screwR = 1.1;
    [
      [-CASE_X / 2 + SCREW_INSET, -CASE_Y / 2 + SCREW_INSET],
      [CASE_X / 2 - SCREW_INSET, -CASE_Y / 2 + SCREW_INSET],
      [-CASE_X / 2 + SCREW_INSET, CASE_Y / 2 - SCREW_INSET],
      [CASE_X / 2 - SCREW_INSET, CASE_Y / 2 - SCREW_INSET],
    ].forEach(([x, y]) => {
      outer.holes.push(circlePath(mm(x), mm(y), mm(screwR)));
    });

    return new THREE.ExtrudeGeometry(outer, {
      depth: mm(WALL),
      bevelEnabled: true,
      bevelThickness: mm(0.45),
      bevelSize: mm(0.32),
      bevelOffset: mm(-0.08),
      bevelSegments: 4,
      curveSegments: 22,
    });
  }, [ventCenters, speakerCenters]);

  // ── Inner dust mesh visible through vent holes ──
  // A thin dark plate just inside the case, giving the holes visible depth
  // (so you don't see straight to the bright shield — there's a "fabric"
  // separator in real cases). Punched with the same vent pattern but
  // slightly smaller holes so a thin rim of dark material is visible.
  const ventScrimGeom = React.useMemo(() => {
    const scrim = roundedRectShape(
      mm(VENT_AREA_X + 1.2),
      mm(VENT_AREA_Y + 1.2),
      mm(1.5),
    );
    for (const c of ventCenters) {
      scrim.holes.push(
        circlePath(mm(c.x), mm(c.y - VENT_CY), mm(VENT_HOLE_R - 0.18)),
      );
    }
    return new THREE.ExtrudeGeometry(scrim, {
      depth: mm(0.18),
      bevelEnabled: false,
      curveSegments: 16,
    });
  }, [ventCenters, VENT_AREA_X, VENT_AREA_Y, VENT_HOLE_R, VENT_CY]);

  // USB-C cutout on shell bottom — represented as a tiny black void plus the receptacle
  // poking through. The shell already has the inner cavity, but we add a clean
  // black rectangle to hide any seam at the cutout. The receptacle protrudes ~1.5 mm.

  // ── Screen LCD plane geometry ──
  // (centered on the screen window which is itself offset upward by winCY)
  const SCR_OFFSET_Y = (BEZ_BOT - BEZ_TOP) / 2;

  // Screws — black, slightly recessed Phillips heads behind the back panel cutouts
  const ScrewHead = ({
    pos,
  }: {
    pos: [number, number, number];
  }) => (
    <group position={pos}>
      {/* Recessed body */}
      <mesh>
        <cylinderGeometry args={[mm(0.95), mm(0.95), mm(WALL * 0.9), 24]} />
        <meshPhysicalMaterial
          color="#3a3a40"
          roughness={0.45}
          metalness={0.85}
          envMapIntensity={1.3}
        />
      </mesh>
      {/* Phillips cross */}
      <mesh position={[0, 0, mm(WALL * 0.46)]}>
        <boxGeometry args={[mm(0.18), mm(1.2), mm(0.2)]} />
        <meshStandardMaterial color="#0a0a0e" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0, mm(WALL * 0.46)]}>
        <boxGeometry args={[mm(1.2), mm(0.18), mm(0.2)]} />
        <meshStandardMaterial color="#0a0a0e" roughness={0.95} />
      </mesh>
    </group>
  );

  return (
    <group>
      {/* ── PCB ──────────────────────────────────────────────────── */}
      <mesh
        position={[0, 0, mm(Z_PCB_CENTER)]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[mm(PCB_X), mm(PCB_Y), mm(PCB_Z)]} />
        <meshStandardMaterial
          color={COLOR.pcb}
          map={pcbTex || undefined}
          roughness={0.55}
          metalness={0.06}
        />
      </mesh>

      {/* ── ESP-WROOM-32 on PCB back side, at top — visible through vents.
            The module is rotated so its long axis runs vertically (along world
            Y) with the antenna pointing up toward the case top, and flipped
            so the RF shield faces the back panel (visible through the vent
            holes). The PCB face that solders to the CYD board sits flush on
            CYD PCB back face; shield top sits ~1.0 mm short of the back
            panel inner surface. ── */}
      <group
        position={[
          0,
          mm(PCB_Y / 2 - 25.5 / 2 - 1.5),
          mm(Z_PCB_BACK - 0.8 / 2),
        ]}
        rotation={[Math.PI, 0, -Math.PI / 2]}
      >
        <EspModule
          position={[0, 0, 0]}
          shieldTex={shieldTex}
          antennaTex={antennaTex}
        />
      </group>

      {/* ── Interior back-side PCB components ─────────────────────────
          A small set of characteristic CYD board components on the back
          side of the PCB, sized and placed so they read clearly when seen
          through the vent holes and around the ESP module. */}

      {/* AMS1117-3.3 voltage regulator (SOT-223 package: 6.5×3.5×1.5 mm)
          with a silver tab on top — typically sits between USB-C and ESP. */}
      <group
        position={[
          mm(11),
          mm(-2),
          mm(Z_PCB_BACK - 1.5 / 2),
        ]}
      >
        <mesh castShadow>
          <boxGeometry args={[mm(6.5), mm(3.5), mm(1.5)]} />
          <meshStandardMaterial color="#101013" roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Silver heat-dissipation tab on the top face */}
        <mesh position={[mm(0.6), 0, mm(-1.5 / 2 - 0.05)]}>
          <boxGeometry args={[mm(3.0), mm(2.4), mm(0.12)]} />
          <meshPhysicalMaterial
            color="#c0c4cc"
            roughness={0.32}
            metalness={1.0}
            envMapIntensity={1.3}
          />
        </mesh>
      </group>

      {/* CP2102 USB-UART (SSOP-28 — small black IC ~10×4×1.4 mm). */}
      <group
        position={[
          mm(-13),
          mm(-2),
          mm(Z_PCB_BACK - 1.4 / 2),
        ]}
      >
        <mesh castShadow>
          <boxGeometry args={[mm(10), mm(4), mm(1.4)]} />
          <meshPhysicalMaterial
            color="#0c0c10"
            roughness={0.55}
            metalness={0.04}
            clearcoat={0.4}
            clearcoatRoughness={0.5}
          />
        </mesh>
        {/* Pin-1 dot */}
        <mesh position={[mm(-3.6), mm(1.2), mm(-1.4 / 2 - 0.02)]}>
          <cylinderGeometry args={[mm(0.32), mm(0.32), mm(0.04), 16]} />
          <meshStandardMaterial color="#888" roughness={0.5} metalness={0.6} />
        </mesh>
      </group>

      {/* Reset & Boot tactile buttons — square black plastic bodies only.
          Sized to fit fully inside the case interior so nothing pokes
          through the back panel. */}
      {[
        { x: -8, y: 14, label: "rst" },
        { x: -8, y: 6, label: "boot" },
      ].map(({ x, y, label }) => (
        <mesh
          key={`btn-${label}`}
          position={[mm(x), mm(y), mm(Z_PCB_BACK - 2.0 / 2)]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[mm(6), mm(6), mm(2.0)]} />
          <meshPhysicalMaterial
            color="#0a0a0e"
            roughness={0.55}
            metalness={0.04}
            clearcoat={0.3}
            clearcoatRoughness={0.55}
          />
        </mesh>
      ))}

      {/* SD card slot (back side metal cover, sticking out the right side). */}
      <mesh
        position={[
          mm(PCB_X / 2 - 14),
          mm(-PCB_Y / 2 + 18),
          mm(Z_PCB_BACK - 1.4 / 2),
        ]}
        castShadow
      >
        <boxGeometry args={[mm(15), mm(11.5), mm(1.4)]} />
        <meshPhysicalMaterial
          color="#a8acb4"
          roughness={0.32}
          metalness={1.0}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* Tantalum/electrolytic capacitor (small barrel, near LDO). */}
      <mesh
        position={[
          mm(15),
          mm(2),
          mm(Z_PCB_BACK - 2.5 / 2),
        ]}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
      >
        <cylinderGeometry args={[mm(1.3), mm(1.3), mm(2.0), 24]} />
        <meshPhysicalMaterial
          color="#9d6b1f"
          roughness={0.45}
          metalness={0.3}
          clearcoat={0.4}
        />
      </mesh>

      {/* A handful of 0805 SMD capacitors scattered near the ESP module
          (small tan rectangles). */}
      {[
        { x: -2.5, y: 12 },
        { x: 2.5, y: 12 },
        { x: -2.5, y: 16 },
        { x: 8, y: 18 },
        { x: -8, y: 22 },
        { x: 6, y: 4 },
        { x: -2, y: -8 },
        { x: 4, y: -10 },
      ].map(({ x, y }, i) => (
        <mesh
          key={`cap-${i}`}
          position={[mm(x), mm(y), mm(Z_PCB_BACK - 0.5 / 2)]}
          castShadow
        >
          <boxGeometry args={[mm(2.0), mm(1.25), mm(0.5)]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? "#7a5a2c" : "#1a1d24"}
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
      ))}

      {/* Resistor pack — small black 0805s in a row */}
      {[
        { x: -16, y: 8 },
        { x: -16, y: 10 },
        { x: -16, y: 12 },
        { x: 16, y: 14 },
        { x: 16, y: 16 },
      ].map(({ x, y }, i) => (
        <mesh
          key={`res-${i}`}
          position={[mm(x), mm(y), mm(Z_PCB_BACK - 0.5 / 2)]}
          castShadow
        >
          <boxGeometry args={[mm(2.0), mm(1.25), mm(0.5)]} />
          <meshStandardMaterial color="#08080c" roughness={0.5} metalness={0.05} />
        </mesh>
      ))}

      {/* ── Black inner cavity well (so screen window doesn't reveal PCB) ── */}
      {(() => {
        const wellTopZ = Z_SCREEN_LCD - 0.05;
        const wellBotZ = Z_PCB_FRONT + 0.1;
        const wellH = wellTopZ - wellBotZ;
        const wellCZ = (wellTopZ + wellBotZ) / 2;
        return (
          <mesh position={[0, mm(SCR_OFFSET_Y), mm(wellCZ)]}>
            <boxGeometry args={[mm(SCR_X - 1), mm(SCR_Y - 1), mm(wellH)]} />
            <meshStandardMaterial
              color={COLOR.screenBlack}
              roughness={0.9}
              metalness={0}
            />
          </mesh>
        );
      })()}

      {/* ── LCD panel (emissive) ─────────────────────────────────── */}
      <mesh position={[0, mm(SCR_OFFSET_Y), mm(Z_SCREEN_LCD)]}>
        <planeGeometry args={[mm(SCR_X), mm(SCR_Y)]} />
        <meshStandardMaterial
          color="#000000"
          map={screenTex || undefined}
          emissive="#ffffff"
          emissiveMap={screenTex || undefined}
          emissiveIntensity={0.95}
          roughness={1}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* ── Glass cover above the LCD (slight reflectivity) ──────── */}
      <mesh position={[0, mm(SCR_OFFSET_Y), mm(Z_SCREEN_GLASS)]}>
        <planeGeometry args={[mm(SCR_X + 0.2), mm(SCR_Y + 0.2)]} />
        <meshPhysicalMaterial
          color="#0a0c12"
          transparent
          opacity={0.18}
          roughness={0.04}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.04}
          transmission={0.0}
          ior={1.45}
          envMapIntensity={1.6}
        />
      </mesh>

      {/* ── Outer shell (back wraps around to front, with bevel) ── */}
      {/* The extrude depth covers most of CASE_Z; placed flush with back panel front. */}
      <mesh
        geometry={shellGeom}
        position={[0, 0, mm(Z_BACK + WALL)]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={COLOR.case}
          roughness={0.62}
          metalness={0.04}
          clearcoat={0.45}
          clearcoatRoughness={0.55}
          envMapIntensity={0.85}
          sheen={0.2}
          sheenColor="#3a3a45"
          sheenRoughness={0.8}
        />
      </mesh>

      {/* The shell notch is small (1.5 mm tall) so any tiny Z gap left around
         the connector reads as a dark sliver, not a hole through the case. */}

      {/* ── Front bezel plate, sits flush with shell front opening ── */}
      <mesh
        geometry={frontBezelGeom}
        position={[0, 0, mm(Z_FRONT - FRAME_T)]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={COLOR.case}
          roughness={0.55}
          metalness={0.04}
          clearcoat={0.5}
          clearcoatRoughness={0.5}
          envMapIntensity={0.95}
          sheen={0.18}
          sheenColor="#34343c"
        />
      </mesh>

      {/* ── Back panel with vents, speaker grille, screw holes ── */}
      <mesh
        geometry={backPanelGeom}
        position={[0, 0, mm(Z_BACK)]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={COLOR.case}
          map={backTex || undefined}
          roughness={0.7}
          metalness={0.04}
          clearcoat={0.35}
          clearcoatRoughness={0.62}
          envMapIntensity={0.7}
        />
      </mesh>

      {/* ── Vent scrim: a thin dark dust mesh just INSIDE the back panel
            (sits flush against the panel's inner face with vent holes
            slightly inset) — adds proper visual depth so the eye doesn't
            read the holes as flat 2D punches ── */}
      <mesh
        geometry={ventScrimGeom}
        position={[0, mm(VENT_CY), mm(Z_BACK + WALL) - 0.0006]}
      >
        <meshStandardMaterial
          color="#04040a"
          roughness={0.96}
          metalness={0}
        />
      </mesh>

      {/* Screws (heads recessed in the back panel cutouts) */}
      {[
        [-CASE_X / 2 + 4.2, -CASE_Y / 2 + 4.2],
        [CASE_X / 2 - 4.2, -CASE_Y / 2 + 4.2],
        [-CASE_X / 2 + 4.2, CASE_Y / 2 - 4.2],
        [CASE_X / 2 - 4.2, CASE_Y / 2 - 4.2],
      ].map(([x, y], i) => (
        <group
          key={`s-${i}`}
          rotation={[Math.PI / 2, 0, 0]}
          position={[mm(x), mm(y), mm(Z_BACK + WALL * 0.5)]}
        >
          <ScrewHead pos={[0, 0, 0]} />
        </group>
      ))}

      {/* ── USB-C female receptacle on bottom edge ────────────────── */}
      {/* Group origin sits at the connector's MOUTH center. The shell extrudes
          UP from there into the case interior. The mouth pokes ~1 mm below the
          case bottom outline through the notch we cut in the shell shape. */}
      <UsbCReceptacle
        position={[
          0,
          mm(-CASE_Y / 2 - 0.8),
          mm(Z_PCB_FRONT + 3.26 / 2),
        ]}
      />

      {/* ── Status LED next to the connector ──────────────────────── */}
      <mesh
        position={[
          mm(8.5),
          mm(-CASE_Y / 2 + 2),
          mm(Z_PCB_FRONT + 0.4),
        ]}
      >
        <sphereGeometry args={[mm(0.5), 16, 12]} />
        <meshStandardMaterial
          color="#5dffae"
          emissive="#3aff95"
          emissiveIntensity={1.4}
          roughness={0.4}
        />
      </mesh>

      {/* ── SD card slot bump on right side (silver metal lid visible from side) ── */}
      <mesh
        position={[
          mm(CASE_X / 2 - WALL_T / 2 - 0.1),
          mm(8),
          mm(Z_PCB_FRONT + 1.1),
        ]}
      >
        <boxGeometry args={[mm(0.5), mm(15), mm(2.2)]} />
        <meshPhysicalMaterial
          color={COLOR.steelDeep}
          roughness={0.32}
          metalness={1.0}
          envMapIntensity={1.3}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Auto-orbit until the user interacts
// ─────────────────────────────────────────────────────────────────
function AutoOrbit({
  enabled,
  speed = 0.0021,
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

function ToneMappingSetup() {
  const { gl } = useThree();
  React.useEffect(() => {
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.05;
  }, [gl]);
  return null;
}

// ─────────────────────────────────────────────────────────────────
//  Error boundary — surfaces any render error so the canvas doesn't
//  silently disappear. Shows the message in-page.
// ─────────────────────────────────────────────────────────────────
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
    // Forward to the browser console so it's visible in dev tools too.
    // eslint-disable-next-line no-console
    console.error("[Device3D] crash:", error);
  }
  render() {
    if (this.state.error) {
      return (
        <div className="absolute inset-0 flex items-center justify-center p-4 text-xs font-mono text-red-500 dark:text-red-400 text-center">
          <div>
            <div className="font-semibold mb-1">Device3D failed to render</div>
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

// ─────────────────────────────────────────────────────────────────
//  Public component
// ─────────────────────────────────────────────────────────────────
export function Device3D() {
  const [interacted, setInteracted] = React.useState(false);

  return (
    <CanvasErrorBoundary>
    <Canvas
      shadows
      camera={{ position: [0.95, 0.4, 2.05], fov: 30 }}
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

      {/* Lights — these alone fully light the scene; the HDRI below only adds
          reflective sparkle and is wrapped in Suspense so its CDN load
          doesn't block the canvas. */}
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#a8c0e0", "#15151a", 0.55]} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.6}
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
      <directionalLight position={[-4, 2, 1]} intensity={0.6} color="#b9c9e8" />
      <directionalLight position={[0, -3, 1]} intensity={0.22} color="#5d4a73" />
      <pointLight position={[2, 3, 3]} intensity={0.35} color="#ffe8c8" />
      <pointLight position={[-2, -2, 2]} intensity={0.18} color="#9c7ec0" />

      <React.Suspense fallback={null}>
        <Environment preset="city" environmentIntensity={0.5} />
      </React.Suspense>

      {/* Soft contact shadow under the device */}
      <ContactShadows
        position={[0, -0.46, 0]}
        opacity={0.5}
        scale={3.2}
        blur={2.6}
        far={1.4}
        resolution={1024}
        color="#000000"
      />

      <AutoOrbit enabled={!interacted}>
        <group rotation={[0, 0.28, 0]}>
          <Device />
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

export default Device3D;

