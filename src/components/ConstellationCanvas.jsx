import React, { useEffect, useRef } from 'react';

export default function ConstellationCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = canvas.clientWidth * DPR;
      canvas.height = canvas.clientHeight * DPR;
    }

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.6,
      tw: Math.random() * 2 * Math.PI,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
    }));

    function draw() {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      // subtle nebula gradient
      const g = ctx.createRadialGradient(width * 0.7, height * 0.3, 0, width * 0.7, height * 0.3, Math.max(width, height) * 0.8);
      g.addColorStop(0, 'rgba(99,102,241,0.06)');
      g.addColorStop(0.5, 'rgba(236,72,153,0.05)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx + (Math.sin((Date.now() * 0.0002) + i) * 0.00005);
        s.y += s.vy + (Math.cos((Date.now() * 0.0003) + i) * 0.00005);
        if (s.x < 0) s.x = 1; if (s.x > 1) s.x = 0; if (s.y < 0) s.y = 1; if (s.y > 1) s.y = 0;

        const px = s.x * width;
        const py = s.y * height;

        const twinkle = 0.6 + Math.sin(s.tw + Date.now() * 0.004) * 0.4;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.6 * twinkle})`;
        ctx.arc(px, py, s.r * DPR, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw constellation-like connections
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < i + 12 && j < stars.length; j++) {
          const a = stars[i], b = stars[j];
          const ax = a.x * width, ay = a.y * height;
          const bx = b.x * width, by = b.y * height;
          const dx = ax - bx, dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140 * DPR) {
            const alpha = 0.06 * (1 - dist / (140 * DPR));
            ctx.strokeStyle = `rgba(167,139,250,${alpha})`;
            ctx.lineWidth = 0.7 * DPR;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    function onResize() {
      resize();
      // one frame after resize to avoid blur
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" />;
}
