"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 150;
const MOUSE_RADIUS = 200;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  baseAlpha: number;
}

export function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      width = canvas!.offsetWidth;
      height = canvas!.offsetHeight;
      canvas!.width = width;
      canvas!.height = height;
      createParticles();
    }

    function createParticles() {
      particlesRef.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          baseAlpha: Math.random() * 0.3 + 0.1,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.08;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(34, 197, 94, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      // Draw particles and mouse interaction
      for (const p of particles) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let alpha = p.baseAlpha;
        let radius = p.r;

        if (dist < MOUSE_RADIUS) {
          const factor = 1 - dist / MOUSE_RADIUS;
          alpha = Math.min(p.baseAlpha + factor * 0.5, 0.8);
          radius = p.r + factor * 1.5;

          // Line to mouse
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.strokeStyle = `rgba(34, 197, 94, ${factor * 0.12})`;
          ctx!.lineWidth = 0.5;
          ctx!.stroke();

          // Slight attraction
          p.vx += dx * 0.00003;
          p.vy += dy * 0.00003;
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(34, 197, 94, ${alpha})`;
        ctx!.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Dampen
        p.vx *= 0.999;
        p.vy *= 0.999;

        // Wrap edges
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    draw();

    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", handleMouse);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouse);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
