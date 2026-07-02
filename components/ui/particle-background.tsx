"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 80;
const MOUSE_RADIUS = 200;
const MOUSE_FORCE = 0.06;
const FRICTION = 0.96;
const DRIFT_SPEED = 0.15;
const FLOAT_AMPLITUDE = 0.3;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  opacity: number;
  color: string;
  driftAngle: number;
  driftSpeed: number;
  floatPhase: number;
  floatSpeed: number;
}

const COLORS = [
  "rgba(76, 141, 255, ",
  "rgba(127, 172, 255, ",
  "rgba(245, 166, 35, ",
  "rgba(139, 148, 166, ",
];

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let pageHeight = window.innerHeight;

    const resize = () => {
      pageHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      canvas.width = window.innerWidth * dpr;
      canvas.height = pageHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${pageHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const createParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * pageHeight;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
          size: Math.random() * 2.5 + 1,
          opacity: Math.random() * 0.5 + 0.3,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() * 0.5 + 0.3) * 0.01,
          floatPhase: Math.random() * Math.PI * 2,
          floatSpeed: (Math.random() * 0.5 + 0.5) * 0.02,
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, window.innerWidth, pageHeight);

      const now = performance.now();

      for (const p of particlesRef.current) {
        p.driftAngle += p.driftSpeed;
        p.floatPhase += p.floatSpeed;

        const driftX = Math.cos(p.driftAngle) * FLOAT_AMPLITUDE;
        const driftY = Math.sin(p.driftAngle) * FLOAT_AMPLITUDE * 0.6;
        const floatY = Math.sin(p.floatPhase) * 0.4;

        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distSq = dx * dx + dy * dy;
        const radiusSq = MOUSE_RADIUS * MOUSE_RADIUS;

        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * MOUSE_FORCE;
          p.vy += (dy / dist) * force * MOUSE_FORCE;
        }

        p.vx += driftX * 0.01;
        p.vy += (driftY + floatY) * 0.01;
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = pageHeight + 20;
        if (p.y > pageHeight + 20) p.y = -20;

        const pulse = Math.sin(now * 0.001 + p.floatPhase) * 0.1 + 0.9;
        const currentOpacity = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
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
