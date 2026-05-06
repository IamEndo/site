"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const SCALE = 0.011;
const mm = (n: number) => n * SCALE;

const COLOR = {
  pcb: "#d4ad2a",
  case: "#15151a",
  screen: "#000000",
  metal: "#c2c2c8",
  esp: "#d8d8da",
  black: "#0a0a0a",
};

// PayDeck theme.h colors INVERTED (firmware ships with tft.invertDisplay(true))
const TH = {
  BG: "#000000",        // 0x0000 (was 0xFFFF)
  TEXT: "#e8eae8",      // ~0xEF7D (was 0x1082)
  TEXT_SEC: "#808080",  // ~0x8410 (was 0x7BEF)
  PRIMARY: "#8C5FAD",   // ~0x8AF5 (was 0x750A) — matches site dark accent
  BORDER: "#2f2f2f",    // ~0x2965 (was 0xD69A)
};

function useScreenTexture() {
  return React.useMemo(() => {
    if (typeof document === "undefined") return null;

    // Portrait: 240×320 (matches firmware's default rotation 0)
    // Drawn at 2× for crispness.
    const W = 480;
    const H = 640;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.scale(2, 2); // logical 240×320

    const BAR_TOP = 20;
    const BAR_BOTTOM = 36;
    const MARGIN = 8;
    const SW = 240; // logical screen width
    const SH = 320; // logical screen height
    const cx = SW / 2;

    // Background
    ctx.fillStyle = TH.BG;
    ctx.fillRect(0, 0, SW, SH);

    // ── Top bar ────────────────────────────────────────────
    // "Menu" pill (8, 0, 52, 18) — outlined secondary button
    ctx.strokeStyle = TH.BORDER;
    ctx.lineWidth = 1;
    roundRect(ctx, 8.5, 0.5, 52, 18, 3);
    ctx.stroke();
    ctx.fillStyle = TH.TEXT;
    ctx.font = "11px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Menu", 8 + 26, 9.5);

    // WiFi icon at top-right
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

    // ── Title ──────────────────────────────────────────────
    ctx.fillStyle = TH.TEXT;
    ctx.font = "13px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText("Awaiting payment", cx, BAR_TOP + 6);

    // ── Amount: bold "12.50" + small "NEX" ──────────────────
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

    // ── QR code ────────────────────────────────────────────
    const headerBottom = amtY + 26 + 6;
    const areaY = headerBottom;
    const areaH = SH - BAR_BOTTOM - areaY - 8;
    const qrSize = Math.min(areaH - 16, SW - 2 * MARGIN - 24);
    const qrX = cx - qrSize / 2;
    const qrY = areaY + (areaH - qrSize) / 2;

    // QR background quiet zone (still BLACK in inverted mode — was white)
    ctx.fillStyle = TH.BG;
    ctx.fillRect(qrX - 4, qrY - 4, qrSize + 8, qrSize + 8);

    // Modules WHITE on BLACK (was black-on-white pre-invert)
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

    // ── Bottom bar: 3 buttons ──────────────────────────────
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
    tex.anisotropy = 8;
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

function Device() {
  const screenTex = useScreenTexture();

  // --- Portrait coordinate system ---
  // X = short edge of board (horizontal in scene)
  // Y = long edge of board (vertical in scene)
  // Z = thickness / screen-normal (toward camera)
  const PCB_X = 50.5;
  const PCB_Y = 86;
  const PCB_Z = 1.6;

  const SCR_X = 46;
  const SCR_Y = 62;

  const CASE_X = 58;
  const CASE_Y = 94;
  const CASE_Z = 14;
  const WALL = 2;
  const FRAME_T = 2;
  const RADIUS = 2;

  const CASE_FRONT_Z = 5;
  const CASE_BACK_Z = CASE_FRONT_Z - CASE_Z;
  const SCREEN_Z = CASE_FRONT_Z - FRAME_T - 0.05;
  const BACK_PANEL_Z = CASE_BACK_Z + WALL / 2;
  const WALLS_CENTER_Z = (CASE_FRONT_Z + CASE_BACK_Z) / 2;
  const FRAME_CENTER_Z = CASE_FRONT_Z - FRAME_T / 2;

  const FRAME_TOP_HEIGHT = (CASE_Y - SCR_Y) / 2;
  const FRAME_TOP_OFFSET_Y = (CASE_Y + SCR_Y) / 4;
  const FRAME_SIDE_WIDTH = (CASE_X - SCR_X) / 2;
  const FRAME_SIDE_OFFSET_X = (CASE_X + SCR_X) / 4;

  // USB-C on bottom edge (-Y) — the natural "cable goes down" location
  const USB_X = 9;
  const USB_Y_OUT = 7; // depth out from the edge
  const USB_T = 3.4;

  // ESP-WROOM-32 module on the back, at the top
  const ESP_LONG = 25.5;
  const ESP_SHORT = 18;
  const ESP_T = 2.6;

  return (
    <group>
      {/* PCB (mostly hidden inside case) */}
      <RoundedBox
        args={[mm(PCB_X), mm(PCB_Y), mm(PCB_Z)]}
        radius={mm(1.5)}
        smoothness={3}
        creaseAngle={0.4}
      >
        <meshStandardMaterial
          color={COLOR.pcb}
          roughness={0.55}
          metalness={0.06}
        />
      </RoundedBox>

      {/* ESP-WROOM-32 module on PCB back, near top */}
      <mesh
        position={[
          0,
          mm(PCB_Y / 2 - ESP_SHORT / 2 - 4),
          mm(-(PCB_Z / 2) - ESP_T / 2),
        ]}
      >
        <boxGeometry args={[mm(ESP_LONG), mm(ESP_SHORT), mm(ESP_T)]} />
        <meshStandardMaterial
          color={COLOR.esp}
          roughness={0.45}
          metalness={0.65}
        />
      </mesh>

      {/* USB-C on bottom edge, poking out the case */}
      <mesh
        position={[
          0,
          mm(-(CASE_Y / 2) - USB_Y_OUT / 2 + 1.5),
          mm(PCB_Z / 2 + USB_T / 2),
        ]}
      >
        <boxGeometry args={[mm(USB_X), mm(USB_Y_OUT), mm(USB_T)]} />
        <meshStandardMaterial
          color={COLOR.metal}
          roughness={0.3}
          metalness={0.88}
        />
      </mesh>
      <mesh
        position={[
          0,
          mm(-(CASE_Y / 2) - USB_Y_OUT + 1.7),
          mm(PCB_Z / 2 + USB_T / 2),
        ]}
      >
        <boxGeometry args={[mm(USB_X - 2.4), mm(0.4), mm(USB_T - 1.2)]} />
        <meshStandardMaterial color={COLOR.black} roughness={0.95} />
      </mesh>

      {/* Dark well filling the entire screen cavity — from just above the PCB
         up to just behind the screen surface. From any angle through the
         0.75 mm screen-window border, you see only black box faces. */}
      <mesh
        position={[
          0,
          0,
          mm((PCB_Z / 2 + 0.5 + (SCREEN_Z - 0.05)) / 2),
        ]}
      >
        <boxGeometry
          args={[
            mm(SCR_X),
            mm(SCR_Y),
            mm(SCREEN_Z - 0.05 - (PCB_Z / 2 + 0.5)),
          ]}
        />
        <meshStandardMaterial
          color={COLOR.screen}
          roughness={0.85}
          metalness={0}
        />
      </mesh>

      {/* Screen surface — sized exactly to the window, sits 0.05 mm in front
         of the well. Black diffuse base means lighting can't add a white rim;
         the emissive map carries 100% of the visible brightness. */}
      <mesh position={[0, 0, mm(SCREEN_Z)]}>
        <planeGeometry args={[mm(SCR_X), mm(SCR_Y)]} />
        <meshStandardMaterial
          color="#000000"
          map={screenTex}
          emissive="#ffffff"
          emissiveMap={screenTex}
          emissiveIntensity={0.85}
          roughness={1}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* CASE: Back panel */}
      <RoundedBox
        args={[mm(CASE_X), mm(CASE_Y), mm(WALL)]}
        radius={mm(RADIUS)}
        smoothness={3}
        position={[0, 0, mm(BACK_PANEL_Z)]}
      >
        <meshStandardMaterial
          color={COLOR.case}
          roughness={0.88}
          metalness={0.04}
        />
      </RoundedBox>

      {/* CASE: 4 side walls */}
      {[1, -1].map((sign) => (
        <mesh
          key={`yw-${sign}`}
          position={[
            0,
            mm(sign * (CASE_Y / 2 - WALL / 2)),
            mm(WALLS_CENTER_Z),
          ]}
        >
          <boxGeometry args={[mm(CASE_X), mm(WALL), mm(CASE_Z)]} />
          <meshStandardMaterial
            color={COLOR.case}
            roughness={0.88}
            metalness={0.04}
          />
        </mesh>
      ))}
      {[1, -1].map((sign) => (
        <mesh
          key={`xw-${sign}`}
          position={[mm(sign * (CASE_X / 2 - WALL / 2)), 0, mm(WALLS_CENTER_Z)]}
        >
          <boxGeometry
            args={[mm(WALL), mm(CASE_Y - 2 * WALL), mm(CASE_Z)]}
          />
          <meshStandardMaterial
            color={COLOR.case}
            roughness={0.88}
            metalness={0.04}
          />
        </mesh>
      ))}

      {/* CASE: Front frame strips around screen window */}
      {/* Top strip (+Y) */}
      <mesh position={[0, mm(FRAME_TOP_OFFSET_Y), mm(FRAME_CENTER_Z)]}>
        <boxGeometry args={[mm(CASE_X), mm(FRAME_TOP_HEIGHT), mm(FRAME_T)]} />
        <meshStandardMaterial
          color={COLOR.case}
          roughness={0.85}
          metalness={0.04}
        />
      </mesh>
      {/* Bottom strip (-Y) */}
      <mesh position={[0, mm(-FRAME_TOP_OFFSET_Y), mm(FRAME_CENTER_Z)]}>
        <boxGeometry args={[mm(CASE_X), mm(FRAME_TOP_HEIGHT), mm(FRAME_T)]} />
        <meshStandardMaterial
          color={COLOR.case}
          roughness={0.85}
          metalness={0.04}
        />
      </mesh>
      {/* Left strip (-X) */}
      <mesh position={[mm(-FRAME_SIDE_OFFSET_X), 0, mm(FRAME_CENTER_Z)]}>
        <boxGeometry args={[mm(FRAME_SIDE_WIDTH), mm(SCR_Y), mm(FRAME_T)]} />
        <meshStandardMaterial
          color={COLOR.case}
          roughness={0.85}
          metalness={0.04}
        />
      </mesh>
      {/* Right strip (+X) */}
      <mesh position={[mm(FRAME_SIDE_OFFSET_X), 0, mm(FRAME_CENTER_Z)]}>
        <boxGeometry args={[mm(FRAME_SIDE_WIDTH), mm(SCR_Y), mm(FRAME_T)]} />
        <meshStandardMaterial
          color={COLOR.case}
          roughness={0.85}
          metalness={0.04}
        />
      </mesh>
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

export function Device3D() {
  const [interacted, setInteracted] = React.useState(false);

  return (
    <Canvas
      camera={{ position: [0.7, 0.25, 1.7], fov: 32 }}
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
      <directionalLight position={[3, 4, 5]} intensity={1.4} />
      <directionalLight position={[-3, 1, 2]} intensity={0.55} />
      <directionalLight position={[0, -3, 2]} intensity={0.25} />
      <pointLight position={[2, 4, 4]} intensity={0.3} />

      <AutoOrbit enabled={!interacted}>
        <group rotation={[0, 0.25, 0]}>
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
  );
}

export default Device3D;
