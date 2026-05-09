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
//  Texture: ESP-WROOM-32 RF shield (brushed steel + laser etch)
// ─────────────────────────────────────────────────────────────────
function useEspShieldTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;
    const W = 512;
    const H = 360; // matches ~25.5×18 aspect
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

    // Brushed lines
    for (let i = 0; i < 800; i++) {
      const y = Math.random() * H;
      ctx.strokeStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.05})`;
      ctx.lineWidth = 0.6 + Math.random() * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + (Math.random() - 0.5) * 4);
      ctx.stroke();
    }
    for (let i = 0; i < 400; i++) {
      const y = Math.random() * H;
      ctx.strokeStyle = `rgba(0,0,0,${0.05 + Math.random() * 0.06})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(W, y + (Math.random() - 0.5) * 6);
      ctx.stroke();
    }

    // Subtle inner border (the punched edge of the shield)
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, W - 4, H - 4);

    // Laser etch: ESPRESSIF logo + text
    ctx.fillStyle = "rgba(50,52,58,0.85)";

    ctx.font = "bold 60px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("ESPRESSIF", W / 2, H / 2 - 50);

    // Small spaceship-style logo above text
    ctx.beginPath();
    ctx.arc(W / 2, H / 2 - 130, 22, 0, Math.PI * 2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(50,52,58,0.85)";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(W / 2 - 22, H / 2 - 130);
    ctx.lineTo(W / 2 + 22, H / 2 - 130);
    ctx.stroke();

    ctx.font = "22px ui-monospace, monospace";
    ctx.fillStyle = "rgba(50,52,58,0.7)";
    ctx.fillText("ESP-WROOM-32", W / 2, H / 2 + 12);

    ctx.font = "16px ui-monospace, monospace";
    ctx.fillStyle = "rgba(50,52,58,0.55)";
    ctx.fillText("FCC ID: 2AC7Z-ESPWROOM32", W / 2, H / 2 + 50);
    ctx.fillText("IC: 21098-ESPWROOM32", W / 2, H / 2 + 76);

    // QR code corner marker
    const qx = W - 80;
    const qy = H - 80;
    const qs = 60;
    ctx.fillStyle = "rgba(50,52,58,0.7)";
    const qcells = 8;
    const qcell = qs / qcells;
    for (let y = 0; y < qcells; y++) {
      for (let x = 0; x < qcells; x++) {
        const v = Math.sin(x * 7.31 + y * 41.7) * 9.5;
        if (((v % 1) + 1) % 1 > 0.5) ctx.fillRect(qx + x * qcell, qy + y * qcell, qcell, qcell);
      }
    }

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
//  USB-C female receptacle (multi-part)
//  All inner dims in raw mm; outer wrapper scales by SCALE.
//  Orientation after rotation:
//    - long axis along world X (8.94 mm wide)
//    - mouth opens toward world -Y (downward)
//    - body extends toward world +Y (up into case)
//    - mounting face on world -Z side (toward back panel)
//    - top face on world +Z side (toward screen front)
// ─────────────────────────────────────────────────────────────────
function UsbCReceptacle({ position }: { position: [number, number, number] }) {
  // Real USB-C receptacle dims (mm): housing 8.94 × 7.35 × 3.26
  const W = 8.94;
  const D = 7.35;
  const T = 3.26;
  const INNER_W = 7.5;
  const INNER_T = 2.4;
  const INNER_R = 1.2; // oval radius
  const INNER_HW = INNER_W / 2 - INNER_R;

  // Outer shell — rectangle with oval through-hole, extruded along Z
  const shellGeom = React.useMemo(() => {
    const outer = new THREE.Shape();
    outer.moveTo(-W / 2, -T / 2);
    outer.lineTo(W / 2, -T / 2);
    outer.lineTo(W / 2, T / 2);
    outer.lineTo(-W / 2, T / 2);
    outer.lineTo(-W / 2, -T / 2);

    const hole = new THREE.Path();
    const ht = INNER_T / 2;
    hole.moveTo(-INNER_HW, -ht);
    hole.lineTo(INNER_HW, -ht);
    hole.absarc(INNER_HW, 0, ht, -Math.PI / 2, Math.PI / 2, false);
    hole.lineTo(-INNER_HW, ht);
    hole.absarc(-INNER_HW, 0, ht, Math.PI / 2, (3 * Math.PI) / 2, false);
    outer.holes.push(hole);

    return new THREE.ExtrudeGeometry(outer, {
      depth: D,
      bevelEnabled: true,
      bevelThickness: 0.2,
      bevelSize: 0.15,
      bevelOffset: 0,
      bevelSegments: 2,
      curveSegments: 18,
    });
  }, []);

  // Inner dark cavity — solid extrusion that fills the tunnel from inside,
  // so when looking down the mouth you see only black void.
  const cavityGeom = React.useMemo(() => {
    const s = new THREE.Shape();
    const ht = INNER_T / 2 - 0.05; // tiny inset so it doesn't z-fight with shell tunnel
    s.moveTo(-INNER_HW, -ht);
    s.lineTo(INNER_HW, -ht);
    s.absarc(INNER_HW, 0, ht, -Math.PI / 2, Math.PI / 2, false);
    s.lineTo(-INNER_HW, ht);
    s.absarc(-INNER_HW, 0, ht, Math.PI / 2, (3 * Math.PI) / 2, false);
    return new THREE.ExtrudeGeometry(s, {
      depth: D - 0.6,
      bevelEnabled: false,
      curveSegments: 18,
    });
  }, []);

  // Inner geometry frame:
  //   X = long axis (8.94 wide)
  //   Y = thin axis (3.26 tall)
  //   Z = depth into body (0 at mouth, +D at back)
  // Apply rotation X by -π/2 then Z by π so:
  //   local +Z (extrude) → world +Y (up — body extends into case)
  //   local +Y (top) → world +Z (toward screen front)
  //   local -Y (mounting) → world -Z (toward back panel)
  return (
    <group position={position} scale={SCALE}>
      <group rotation={[-Math.PI / 2, 0, Math.PI]}>
        {/* Steel outer shell */}
        <mesh geometry={shellGeom} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={COLOR.steel}
            roughness={0.22}
            metalness={1.0}
            clearcoat={0.4}
            clearcoatRoughness={0.25}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Inner cavity — recessed ~0.3 mm from mouth so a slight steel lip is visible */}
        <mesh geometry={cavityGeom} position={[0, 0, 0.3]}>
          <meshStandardMaterial color={COLOR.black} roughness={0.95} metalness={0} />
        </mesh>

        {/* Center tongue — sits centered along the thin (Y) axis */}
        <group position={[0, 0, 0.6]}>
          <mesh>
            <boxGeometry args={[INNER_W - 1.4, 0.7, D - 1.5]} />
            <meshStandardMaterial color="#15151a" roughness={0.7} metalness={0.05} />
          </mesh>
          {/* 12 gold contact strips (6 top + 6 bottom of tongue) */}
          {[
            { sign: 1, key: "t" },
            { sign: -1, key: "b" },
          ].map(({ sign, key }) => (
            <React.Fragment key={key}>
              {Array.from({ length: 6 }).map((_, i) => {
                const stride = (INNER_W - 2.4) / 5;
                const x = -((INNER_W - 2.4) / 2) + i * stride;
                return (
                  <mesh
                    key={`${key}-${i}`}
                    position={[x, sign * 0.36, -0.3]}
                  >
                    <boxGeometry args={[0.35, 0.04, D - 2.6]} />
                    <meshStandardMaterial
                      color={COLOR.gold}
                      roughness={0.32}
                      metalness={0.95}
                    />
                  </mesh>
                );
              })}
            </React.Fragment>
          ))}
        </group>

        {/* Two side mounting tabs sticking out at the back */}
        {[-1, 1].map((sign) => (
          <mesh
            key={`tab-${sign}`}
            position={[sign * (W / 2 + 0.6), 0, D - 1.0]}
            castShadow
          >
            <boxGeometry args={[1.2, T - 0.6, 1.4]} />
            <meshPhysicalMaterial
              color={COLOR.steelDeep}
              roughness={0.3}
              metalness={1.0}
              envMapIntensity={1.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ESP-WROOM-32 module visible through the back vent
// ─────────────────────────────────────────────────────────────────
function EspModule({
  position,
  shieldTex,
}: {
  position: [number, number, number];
  shieldTex: THREE.Texture | null;
}) {
  const ESP_LONG = 25.5;
  const ESP_SHORT = 18;
  const ESP_T = 2.6;
  const SHIELD_T = 0.4;

  return (
    <group position={position}>
      {/* Main body (PCB tail of the module) */}
      <mesh castShadow receiveShadow>
        <boxGeometry
          args={[mm(ESP_LONG), mm(ESP_SHORT), mm(ESP_T - SHIELD_T)]}
        />
        <meshStandardMaterial
          color={COLOR.pcb}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>
      {/* Brushed steel RF shield with etched logo on top */}
      <mesh position={[0, 0, mm((ESP_T - SHIELD_T) / 2 + SHIELD_T / 2)]}>
        <boxGeometry args={[mm(ESP_LONG - 0.6), mm(ESP_SHORT - 0.6), mm(SHIELD_T)]} />
        <meshPhysicalMaterial
          color="#d6d8de"
          map={shieldTex || undefined}
          roughness={0.34}
          metalness={0.92}
          envMapIntensity={1.4}
        />
      </mesh>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Main device assembly
// ─────────────────────────────────────────────────────────────────
function Device() {
  const screenTex = useScreenTexture();
  const shieldTex = useEspShieldTexture();
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

  // ── Back panel (with vents and USB-C cutout) ──
  // Vent layout: a grid of round holes positioned over the ESP module area
  // (top region of back panel, above center).
  const VENT_AREA_X = 30;
  const VENT_AREA_Y = 20;
  const VENT_CY = CASE_Y / 2 - VENT_AREA_Y / 2 - 7; // 7 mm in from top edge
  const VENT_HOLE_R = 0.65;
  const VENT_PITCH = 2.2;
  const ventCols = Math.floor(VENT_AREA_X / VENT_PITCH);
  const ventRows = Math.floor(VENT_AREA_Y / VENT_PITCH);
  const VENT_X_START = -((ventCols - 1) * VENT_PITCH) / 2;
  const VENT_Y_START = VENT_CY - ((ventRows - 1) * VENT_PITCH) / 2;
  const ventCenters = React.useMemo(() => {
    const arr: { x: number; y: number }[] = [];
    for (let r = 0; r < ventRows; r++) {
      for (let c = 0; c < ventCols; c++) {
        // staggered honeycomb-ish: every other row offset by half pitch
        const offset = r % 2 === 0 ? 0 : VENT_PITCH / 2;
        const x = VENT_X_START + c * VENT_PITCH + offset;
        const y = VENT_Y_START + r * VENT_PITCH;
        // Skip hole that would land past the right edge after offset
        if (Math.abs(x) > VENT_AREA_X / 2) continue;
        arr.push({ x, y });
      }
    }
    return arr;
  }, [VENT_PITCH, VENT_X_START, VENT_Y_START, ventRows, ventCols]);

  const backPanelGeom = React.useMemo(() => {
    const outer = roundedRectShape(
      mm(CASE_X - 0.6),
      mm(CASE_Y - 0.6),
      mm(CORNER_R - 0.3)
    );

    // Vent holes (round)
    for (const c of ventCenters) {
      outer.holes.push(circlePath(mm(c.x), mm(c.y), mm(VENT_HOLE_R)));
    }

    // Speaker grille on lower back (a small cluster of holes)
    const SP_CX = 0;
    const SP_CY = -CASE_Y / 2 + 16;
    for (let i = 0; i < 7; i++) {
      const angle = (i / 7) * Math.PI * 2;
      const sx = SP_CX + Math.cos(angle) * 2.4;
      const sy = SP_CY + Math.sin(angle) * 2.4;
      outer.holes.push(circlePath(mm(sx), mm(sy), mm(0.55)));
    }
    outer.holes.push(circlePath(mm(SP_CX), mm(SP_CY), mm(0.55)));

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
      bevelThickness: mm(0.3),
      bevelSize: mm(0.22),
      bevelOffset: mm(-0.05),
      bevelSegments: 3,
      curveSegments: 18,
    });
  }, [ventCenters]);

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

      {/* ESP-WROOM-32 on PCB back side, at top — visible through vents.
          Its top face (Z = ESP_TOP) sits 0.9 mm above the back panel front face,
          giving an air gap that reads as depth through the vent holes. */}
      <EspModule
        position={[
          0,
          mm(PCB_Y / 2 - 18 / 2 - 4),
          mm(Z_PCB_BACK - 2.6 / 2),
        ]}
        shieldTex={shieldTex}
      />

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

