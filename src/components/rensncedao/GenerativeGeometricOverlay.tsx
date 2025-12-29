'use client';

import React, { useEffect, useRef } from 'react';

interface ComponentProps {
    className?: string;
}

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    connections: number[];
}

export default function GenerativeGeometricOverlay({ className = '' }: ComponentProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let animationFrameId: number;

        const nodes: Node[] = [];
        const isMobile = width < 768;
        // Reduce density: Divide area by larger number = fewer nodes
        const rawNodeCount = Math.floor((width * height) / 25000);
        // Hard cap node count to prevent exponential slowdown on huge screens
        const nodeCount = Math.min(rawNodeCount, isMobile ? 40 : 80);

        const connectionDistance = isMobile ? 100 : 150;
        const speed = 0.3;

        // Initialize nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                radius: Math.random() * 1.5 + 0.5,
                connections: []
            });
        }

        const draw = () => {
            // Clear with slight trail effect for "nervous system" feel
            ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent clear
            ctx.clearRect(0, 0, width, height);

            // Update and draw nodes
            nodes.forEach((node, index) => {
                // Movement
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                // Draw Node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(229, 228, 226, 0.6)'; // Silver
                ctx.fill();

                // Connections
                for (let j = index + 1; j < nodes.length; j++) {
                    const other = nodes[j];
                    const dx = node.x - other.x;
                    const dy = node.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(other.x, other.y);
                        // Silver lines
                        ctx.strokeStyle = `rgba(229, 228, 226, ${opacity * 0.15})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();

                        // Occasional "Data Packet" pulse along the line
                        if (Math.random() < 0.005) {
                            ctx.beginPath();
                            const t = Math.random(); // Position along line
                            ctx.arc(node.x + dx * t, node.y + dy * t, 1.5, 0, Math.PI * 2);
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                            ctx.fill();
                        }
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            // Re-initialize nodes on huge resize if needed, or just let them float back
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none z-10 ${className}`}
        />
    );
}
