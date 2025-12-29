'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
    { name: 'Animal & Plant Conservation', color: '#10B981', slug: 'animal-conservation', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { name: 'Children\'s Health', color: '#F472B6', slug: 'childrens-health', icon: 'M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z' },
    { name: 'Environmental Awareness', color: '#34D399', slug: 'environmental-awareness', icon: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418' },
    { name: 'Financial Literacy', color: '#FBBF24', slug: 'financial-literacy', icon: 'M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z' },
    { name: 'Gender Equality', color: '#A855F7', slug: 'gender-equality', icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z' },
    { name: 'Independent Artists & Creators', color: '#F97316', slug: 'artists-creators', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { name: 'Indigenous Rights & Access', color: '#EA580C', slug: 'indigenous-rights', icon: 'M2.25 21h19.5m-18-18v14.25A2.25 2.25 0 005.625 19.5h15M9.375 12.75c0 1.242 1.008 2.25 2.25 2.25s2.25-1.008 2.25-2.25-1.008-2.25-2.25-2.25-2.25 1.008-2.25 2.25zm0 0v-2.25m6.75 2.25c0 1.242 1.008 2.25 2.25 2.25s2.25-1.008 2.25-2.25-1.008-2.25-2.25-2.25-2.25 1.008-2.25 2.25zm0 0v-2.25m-9 0h12' },
    { name: 'Justice & Peace', color: '#3B82F6', slug: 'justice-peace', icon: 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z' },
    { name: 'Medical Access', color: '#EF4444', slug: 'medical-access', icon: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z' },
    { name: 'Mental Health & Wellness', color: '#14B8A6', slug: 'mental-health', icon: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18' },
    { name: 'Minority Rights & Access', color: '#6366F1', slug: 'minority-rights', icon: 'M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' },
    { name: 'Nature & Habitat', color: '#84CC16', slug: 'nature-habitat', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { name: 'Research Initiatives', color: '#0EA5E9', slug: 'research-initiatives', icon: 'M9.75 3.104v1.607a2 2 0 01-.578 1.415l-1.9 1.9a2 2 0 01-1.415.578H4.253a2 2 0 01-1.892-1.33l-.337-1.01a2 2 0 01.29-2.09l1.411-1.552a2 2 0 012.09-.29l1.01.337a2 2 0 011.33 1.892zM15 3.104v1.607a2 2 0 00.578 1.415l1.9 1.9a2 2 0 001.415.578h1.669a2 2 0 001.892-1.33l.337-1.01a2 2 0 00-.29-2.09l-1.411-1.552a2 2 0 00-2.09-.29l-1.01.337a2 2 0 00-1.33 1.892zM12 9v12m-4.5-5a4.5 4.5 0 119 0H7.5z' },
    { name: 'Spirituality & Self-Discovery', color: '#D8B4FE', slug: 'spirituality', icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75' },
    { name: 'Veterans Community', color: '#1E40AF', slug: 'veterans-community', icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z' },
];

const SUBSIDIARY_COLORS = ['#F54029', '#3B82F6', '#10B981', '#FBBF24', '#A855F7'];

export default function ImpactNexus({ detailed = false }: { detailed?: boolean }) {
    const [time, setTime] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        let frame: number;
        const animate = (t: number) => {
            setTime(t / 8000); // Slower speed (was 4000)
            frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    const projectedNodes = useMemo(() => {
        const radius = detailed ? 320 : 280; // Reduced radius (was 380:320)
        const tiltFactor = 0.45; // Elliptical perspective
        const centerX = 400;
        const centerY = 400;

        return categories.map((cat, i) => {
            const baseAngle = (i / categories.length) * Math.PI * 2;
            const currentAngle = baseAngle + time;

            const x = Number((centerX + Math.cos(currentAngle) * radius).toFixed(3));
            const y = Number((centerY + Math.sin(currentAngle) * (radius * tiltFactor)).toFixed(3));

            const depth = Math.sin(currentAngle);
            const scale = Number((0.75 + (depth + 1) * 0.15).toFixed(4));
            const opacity = Number((0.4 + (depth + 1) * 0.3).toFixed(4));
            const zIndex = depth > 0 ? 40 : 10; // Front half (depth > 0) is higher

            return { ...cat, x, y, scale, opacity, zIndex, currentAngle };
        });
    }, [detailed, time]);

    if (!mounted) return (
        <div className={`relative w-full mx-auto flex items-center justify-center overflow-visible ${detailed ? 'max-w-5xl h-[420px]' : 'max-w-4xl h-[340px]'}`} />
    );

    return (
        <div className={`relative w-full mx-auto flex items-center justify-center overflow-visible ${detailed ? 'max-w-5xl h-[420px]' : 'max-w-4xl h-[340px]'}`}>

            {/* Background Layer - Rays & Fixed Glow */}
            <svg viewBox="0 200 800 400" className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-5">
                <defs>
                    <radialGradient id="centralGlow">
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                {projectedNodes.map((node, i) => (
                    <React.Fragment key={`ray-${i}`}>
                        <line x1="400" y1="400" x2={node.x} y2={node.y} stroke={node.color} strokeWidth="1" strokeOpacity={Number((node.opacity * 0.1).toFixed(4))} />
                        {[0, 1].map((p) => {
                            const subColor = SUBSIDIARY_COLORS[(i + p) % SUBSIDIARY_COLORS.length];
                            return (
                                <motion.circle
                                    key={`packet-${i}-${p}`}
                                    r={Number((1.5 * node.scale).toFixed(3))}
                                    fill={subColor}
                                    initial={{ cx: 400, cy: 400, opacity: 0 }}
                                    animate={{ cx: [400, node.x], cy: [400, node.y], opacity: [0, node.opacity, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.1 + p * 1.5, ease: "easeOut" }}
                                    style={{ filter: `blur(1px) drop-shadow(0 0 4px ${subColor})` }}
                                />
                            );
                        })}
                    </React.Fragment>
                ))}
                <circle cx="400" cy="400" r="220" fill="url(#centralGlow)" opacity="0.05" />
            </svg>

            {/* Depth Composition - Merged Stacking Context */}
            <div className="absolute inset-0 z-20 pointer-events-none">

                {/* Central Medallion - Fixed at Depth Midpoint (Z:20) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 20 }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="w-[360px] h-[360px] relative flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full shadow-[0_0_200px_rgba(245,64,41,0.25)]" />
                        <div className="relative z-20 w-[240px] h-[240px] flex items-center justify-center">
                            <img src="/Medallions/TUF-op.png" alt="TUF" className="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(245,64,41,0.8)]" />
                        </div>
                        <div className="absolute inset-[-10%] border border-utility-red/5 rounded-full animate-[pulse_6s_easeInOut_infinite]" />
                    </motion.div>
                </div>

                {/* Nodes - Dynamic Z-Indexing (10 back, 40 front) */}
                {projectedNodes.map((node) => (
                    <div
                        key={node.name}
                        className="absolute pointer-events-auto"
                        style={{
                            left: `${(node.x / 800) * 100}%`,
                            top: `${((node.y - 200) / 400) * 100}%`,
                            transform: `translate(-50%, -50%) scale(${node.scale})`,
                            zIndex: node.zIndex,
                            opacity: node.opacity,
                        }}
                    >
                        <Link href="/initiatives" className="group block relative">
                            <motion.div
                                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center backdrop-blur-2xl border border-white/10 transition-all group-hover:border-white/40 shadow-2xl"
                                style={{ backgroundColor: `${node.color}25`, boxShadow: `0 0 35px ${node.color}50`, color: node.color }}
                                whileHover={{ scale: 1.15 }}
                            >
                                <svg className="w-6 h-6 filter drop-shadow-[0_0_8px_currentColor]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={node.icon} />
                                </svg>
                            </motion.div>

                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 scale-100 group-hover:scale-110 transition-all whitespace-nowrap text-center pointer-events-none">
                                <span className="text-[10px] md:text-[12px] font-mono tracking-widest uppercase font-black" style={{ color: node.color, textShadow: `0 0 15px ${node.color}` }}>
                                    {node.name.split(' ')[0]}
                                </span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-6 opacity-0 group-hover:opacity-100 transition-all bg-black/95 border border-white/10 p-5 rounded-[2rem] whitespace-nowrap pointer-events-none backdrop-blur-3xl z-50 shadow-2xl scale-95 group-hover:scale-100">
                                <div className="text-sm font-black text-white mb-2" style={{ color: node.color }}>{node.name}</div>
                                <div className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase mb-4">// PERSPECTIVE_V4 // DEPTH_ALIGNED</div>
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-[10px] text-gray-200 font-bold tracking-[0.2em]">CONNECTION_STABLE</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            {detailed && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[11px] text-gray-700 tracking-[1.5em] uppercase opacity-40 whitespace-nowrap select-none z-0 pointer-events-none">
                    NEUROMIMETIC_ORCHESTRATION_LAYER
                </div>
            )}
        </div>
    );
}
