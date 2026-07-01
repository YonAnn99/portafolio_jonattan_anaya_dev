"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 100;
const MOUSE_RADIUS = 150;
const MOUSE_FORCE = 0.025;
const FRICTION = 0.96;
const BASE_SPEED = 0.25;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

const COLORS = [
  "rgba(76, 141, 255, ",
  "rgba(127, 172, 255, ",
  "rgba(245, 166, 35, ",
  "rgba(139, 148, 166, ",
  "rgba(91, 100, 114, ",
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const getPageHeight = () => Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const pageHeight = getPageHeight();
      canvas.width = window.innerWidth * dpr;
      canvas.height = pageHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${pageHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticles = () => {
      const pageHeight = getPageHeight();
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * pageHeight,
          vx: (Math.random() - 0.5) * BASE_SPEED,
          vy: (Math.random() - 0.5) * BASE_SPEED,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.08,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
      return particles;
    };

    particlesRef.current = createParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const pageHeight = getPageHeight();
      ctx.clearRect(0, 0, window.innerWidth, pageHeight);

      for (const p of particlesRef.current) {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * MOUSE_FORCE;
          p.vy += (dy / dist) * force * MOUSE_FORCE;
        }

        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = window.innerWidth;
        if (p.x > window.innerWidth) p.x = 0;
        if (p.y < 0) p.y = pageHeight;
        if (p.y > pageHeight) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    />
  );
}
