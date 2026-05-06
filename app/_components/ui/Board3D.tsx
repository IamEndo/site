"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const SCALE = 0.013;
const mm = (n: number) => n * SCALE;

const COLOR = {
  pcb: "#d4ad2a",
  bezel: "#0d0d0e",
  screen: "#070a14",
  metal: "#c2c2c8",
  esp: "#d8d8da",
  espPad: "#888892",
  header: "#0a0a0a",
  pin: "#c79a3a",
  hole: "#0a0a0a",
  button: "#d8d8dc",
};

function Board() {
  // CYD physical dimensions (mm)
  const PCB_W = 86;
  const PCB_H = 50.5;
  const PCB_T = 1.6;

  const SCR_W = 60;
  const SCR_H = 44;
  const BEZEL_W = 67;
  const BEZEL_H = 48;
  const BEZEL_T = 2.2;

  const USB_W = 9;
  const USB_T = 3.4;
  const USB_DEPTH = 7;

  const ESP_W = 18;
  const ESP_H = 25.5;
  const ESP_T = 2.6;

  const BTN_R = 1.6;
  const BTN_T = 1.2;

  const HEADER_PINS = 16;
  const HEADER_PITCH = 2.54;
  const HEADER_LEN = HEADER_PINS * HEADER_PITCH;

  return (
    <group>
      {/* PCB — yellow, rounded corners */}
      <RoundedBox
        args={[mm(PCB_W), mm(PCB_T), mm(PCB_H)]}
        radius={mm(2)}
        smoothness={3}
        creaseAngle={0.4}
      >
        <meshStandardMaterial
          color={COLOR.pcb}
          roughness={0.55}
          metalness={0.08}
        />
      </RoundedBox>

      {/* Mounting holes — 4 corners */}
      {[
        [PCB_W / 2 - 4, PCB_H / 2 - 4],
        [-(PCB_W / 2 - 4), PCB_H / 2 - 4],
        [PCB_W / 2 - 4, -(PCB_H / 2 - 4)],
        [-(PCB_W / 2 - 4), -(PCB_H / 2 - 4)],
      ].map(([x, z], i) => (
        <mesh key={`hole-${i}`} position={[mm(x), 0, mm(z)]}>
          <cylinderGeometry args={[mm(1.6), mm(1.6), mm(PCB_T + 0.1), 16]} />
          <meshStandardMaterial color={COLOR.hole} roughness={0.7} />
        </mesh>
      ))}

      {/* Black bezel sitting on top of PCB, around the screen */}
      <RoundedBox
        args={[mm(BEZEL_W), mm(BEZEL_T), mm(BEZEL_H)]}
        radius={mm(0.8)}
        smoothness={2}
        position={[0, mm(PCB_T / 2 + BEZEL_T / 2), 0]}
      >
        <meshStandardMaterial
          color={COLOR.bezel}
          roughness={0.85}
          metalness={0.05}
        />
      </RoundedBox>

      {/* Screen surface (off — slight cool glow) */}
      <mesh position={[0, mm(PCB_T / 2 + BEZEL_T + 0.05), 0]}>
        <boxGeometry args={[mm(SCR_W), mm(0.1), mm(SCR_H)]} />
        <meshStandardMaterial
          color={COLOR.screen}
          emissive="#0c1630"
          emissiveIntensity={0.18}
          roughness={0.4}
          metalness={0}
        />
      </mesh>

      {/* USB-C connector poking out the left short edge */}
      <mesh
        position={[
          mm(-(PCB_W / 2) - USB_DEPTH / 2 + 0.5),
          mm(PCB_T / 2 + USB_T / 2),
          0,
        ]}
      >
        <boxGeometry args={[mm(USB_DEPTH), mm(USB_T), mm(USB_W)]} />
        <meshStandardMaterial
          color={COLOR.metal}
          roughness={0.3}
          metalness={0.88}
        />
      </mesh>
      <mesh
        position={[
          mm(-(PCB_W / 2) - USB_DEPTH + 0.6),
          mm(PCB_T / 2 + USB_T / 2),
          0,
        ]}
      >
        <boxGeometry args={[mm(0.4), mm(USB_T - 1.2), mm(USB_W - 2.4)]} />
        <meshStandardMaterial color="#050505" roughness={0.95} />
      </mesh>

      {/* ESP-WROOM-32 module on PCB back, near right edge */}
      <mesh
        position={[
          mm(PCB_W / 2 - ESP_W / 2 - 4),
          mm(-(PCB_T / 2) - ESP_T / 2),
          0,
        ]}
      >
        <boxGeometry args={[mm(ESP_W), mm(ESP_T), mm(ESP_H)]} />
        <meshStandardMaterial
          color={COLOR.esp}
          roughness={0.45}
          metalness={0.65}
        />
      </mesh>
      {/* ESP module solder-pad outline (subtle hint underneath) */}
      <mesh
        position={[
          mm(PCB_W / 2 - ESP_W / 2 - 4),
          mm(-(PCB_T / 2) - ESP_T - 0.1),
          0,
        ]}
      >
        <boxGeometry args={[mm(ESP_W - 1.2), mm(0.2), mm(ESP_H - 1.2)]} />
        <meshStandardMaterial
          color={COLOR.espPad}
          roughness={0.55}
          metalness={0.5}
        />
      </mesh>

      {/* Pin headers along the two long edges (back side) */}
      {[-1, 1].map((sign) => (
        <group
          key={`hdr-${sign}`}
          position={[0, mm(-(PCB_T / 2)), mm(sign * (PCB_H / 2 - 2.2))]}
        >
          {/* Header housing (black plastic block) */}
          <mesh position={[0, mm(-1.2), 0]}>
            <boxGeometry args={[mm(HEADER_LEN), mm(2.4), mm(2.4)]} />
            <meshStandardMaterial
              color={COLOR.header}
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
          {/* Individual gold-ish pins protruding below */}
          {Array.from({ length: HEADER_PINS }).map((_, k) => (
            <mesh
              key={k}
              position={[
                mm(-HEADER_LEN / 2 + (k + 0.5) * HEADER_PITCH),
                mm(-2.6),
                0,
              ]}
            >
              <boxGeometry args={[mm(0.6), mm(2.4), mm(0.6)]} />
              <meshStandardMaterial
                color={COLOR.pin}
                roughness={0.4}
                metalness={0.85}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* MicroSD card slot — silver cage on the back, near the bottom long edge */}
      <mesh
        position={[mm(-3), mm(-(PCB_T / 2) - 0.9), mm(-(PCB_H / 2 - 7))]}
      >
        <boxGeometry args={[mm(15), mm(1.8), mm(14)]} />
        <meshStandardMaterial
          color="#a8a8b0"
          roughness={0.45}
          metalness={0.75}
        />
      </mesh>
      {/* SD card opening (dark slit at the board edge) */}
      <mesh
        position={[mm(-3), mm(-(PCB_T / 2) - 0.9), mm(-(PCB_H / 2 - 0.5))]}
      >
        <boxGeometry args={[mm(13), mm(1.4), mm(0.6)]} />
        <meshStandardMaterial color="#050505" roughness={0.95} />
      </mesh>

      {/* Speaker — round, on the back, left-center */}
      <mesh
        position={[mm(-25), mm(-(PCB_T / 2) - 2), mm(0)]}
      >
        <cylinderGeometry args={[mm(7), mm(7), mm(4), 28]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.7} metalness={0.4} />
      </mesh>
      {/* Speaker membrane inset */}
      <mesh
        position={[mm(-25), mm(-(PCB_T / 2) - 4 - 0.05), mm(0)]}
      >
        <cylinderGeometry args={[mm(5), mm(5), mm(0.3), 28]} />
        <meshStandardMaterial color="#5a5a64" roughness={0.55} metalness={0.55} />
      </mesh>

      {/* AMS1117 voltage regulator — back, near USB edge */}
      <mesh
        position={[mm(-32), mm(-(PCB_T / 2) - 0.9), mm(9)]}
      >
        <boxGeometry args={[mm(6.5), mm(1.8), mm(5)]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} metalness={0.1} />
      </mesh>
      {/* AMS1117 metal heatsink tab */}
      <mesh
        position={[mm(-32 - 1.6), mm(-(PCB_T / 2) - 0.7), mm(9)]}
      >
        <boxGeometry args={[mm(2.5), mm(0.3), mm(4)]} />
        <meshStandardMaterial color="#c0c0c8" roughness={0.4} metalness={0.85} />
      </mesh>

      {/* CP2102 USB-to-serial chip — back, near USB */}
      <mesh
        position={[mm(-32), mm(-(PCB_T / 2) - 0.5), mm(-8)]}
      >
        <boxGeometry args={[mm(5), mm(1.0), mm(4)]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Crystal oscillator — back, near ESP module */}
      <mesh
        position={[mm(15), mm(-(PCB_T / 2) - 0.5), mm(9)]}
      >
        <boxGeometry args={[mm(5), mm(1.0), mm(3.2)]} />
        <meshStandardMaterial color="#a8a8b0" roughness={0.35} metalness={0.85} />
      </mesh>

      {/* BOOT and RST tactile buttons — back side, between ESP and top header */}
      {[
        { x: 11, k: "boot" },
        { x: 22, k: "rst" },
      ].map((b) => (
        <group key={`btn-${b.k}`}>
          {/* Button body (black plastic) */}
          <mesh
            position={[mm(b.x), mm(-(PCB_T / 2) - 1.7), mm(17)]}
          >
            <boxGeometry args={[mm(3.5), mm(3.4), mm(3.5)]} />
            <meshStandardMaterial color="#1a1a1c" roughness={0.7} />
          </mesh>
          {/* Round actuator on top */}
          <mesh
            position={[mm(b.x), mm(-(PCB_T / 2) - 3.4 - 0.4), mm(17)]}
          >
            <cylinderGeometry args={[mm(0.9), mm(0.9), mm(0.8), 16]} />
            <meshStandardMaterial color="#3a3a3c" roughness={0.5} />
          </mesh>
        </group>
      ))}

      {/* LDR / photoresistor — front, top-right corner outside bezel */}
      <mesh
        position={[mm(36), mm(PCB_T / 2 + 0.75), mm(20)]}
      >
        <cylinderGeometry args={[mm(2.2), mm(2.2), mm(1.5), 24]} />
        <meshStandardMaterial color="#2a2a2e" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* LDR sensor face (slight zig-zag look via concentric ring) */}
      <mesh
        position={[mm(36), mm(PCB_T / 2 + 1.5 + 0.01), mm(20)]}
      >
        <cylinderGeometry args={[mm(1.6), mm(1.6), mm(0.05), 24]} />
        <meshStandardMaterial color="#8a7a4a" roughness={0.4} metalness={0.55} />
      </mesh>

      {/* Power LED (red SMD) — front, top-left */}
      <mesh
        position={[mm(-36), mm(PCB_T / 2 + 0.3), mm(20)]}
      >
        <boxGeometry args={[mm(1.6), mm(0.6), mm(0.8)]} />
        <meshStandardMaterial
          color="#ff2a2a"
          emissive="#ff1010"
          emissiveIntensity={0.4}
          roughness={0.5}
        />
      </mesh>

      {/* Activity LED (green SMD) — front, top-left below power LED */}
      <mesh
        position={[mm(-36), mm(PCB_T / 2 + 0.3), mm(16)]}
      >
        <boxGeometry args={[mm(1.6), mm(0.6), mm(0.8)]} />
        <meshStandardMaterial
          color="#22dd22"
          emissive="#22dd22"
          emissiveIntensity={0.35}
          roughness={0.5}
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
        <group rotation={[-0.35, 0.4, 0]}>
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
  );
}

export default Board3D;
