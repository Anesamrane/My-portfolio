import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  theme: 'light' | 'dark';
}

export default function BackgroundCanvas({ theme }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Node representation
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseX: number;
      baseY: number;
    }

    const nodes: Node[] = [];
    const maxNodes = Math.min(65, Math.floor((width * height) / 22000)); // Responsive count
    const connectionDistance = 120;
    const mouse = { x: -1000, y: -1000, radius: 180 };

    // Initialize nodes
    for (let i = 0; i < maxNodes; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      nodes.push({
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        baseX: rx,
        baseY: ry,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      // Add multiple temporary burst particles
      for (let i = 0; i < 8; i++) {
        nodes.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 2 + 1,
          baseX: e.clientX,
          baseY: e.clientY,
        });
        if (nodes.length > maxNodes + 16) {
          nodes.shift(); // Keep limit capped
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleCanvasClick);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Set colors based on current active theme
      const nodeColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(10, 10, 10, 0.15)';
      const lineColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(10, 10, 10, 0.05)';
      const mouseConnectionColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(10, 10, 10, 0.12)';

      // Update and Draw nodes
      nodes.forEach((node) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce borders
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse interaction (gentle push/pull)
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          // Slowly push away from cursor
          node.x -= (dx / dist) * force * 1.5;
          node.y -= (dy / dist) * force * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = lineColor.replace('0.08', (alpha * 0.08).toString()).replace('0.05', (alpha * 0.05).toString());
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw line from mouse to node if close
        const dx = mouse.x - n1.x;
        const dy = mouse.y - n1.y;
        const dist = Math.hypot(dx, dy);
        if (dist < mouse.radius - 20) {
          const alpha = (1 - dist / (mouse.radius - 20)) * 0.5;
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);
          ctx.lineTo(n1.x, n1.y);
          ctx.strokeStyle = mouseConnectionColor.replace('0.2', (alpha * 0.2).toString()).replace('0.12', (alpha * 0.12).toString());
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleCanvasClick);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      id="neural-background-canvas"
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-1000"
      style={{ opacity: theme === 'dark' ? 0.35 : 0.6 }}
    />
  );
}
