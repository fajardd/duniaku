"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function Particles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = [
      "rgba(232, 168, 124, 0.6)",
      "rgba(212, 165, 165, 0.5)",
      "rgba(192, 155, 216, 0.4)",
      "rgba(255, 255, 255, 0.3)",
      "rgba(240, 194, 127, 0.5)",
    ];

    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setParticles(generated);
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
