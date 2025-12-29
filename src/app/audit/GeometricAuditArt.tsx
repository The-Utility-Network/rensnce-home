'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface GeometricAuditArtProps {
    color: string;
    chapterId: string;
}

// 0. Executive Summary: The Eye of Providence / Radar Scan
const AuditExecutive = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Scanning Radar */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 rounded-full border border-white/20"
            style={{
                background: `conic-gradient(from 0deg, transparent 0deg, ${color}20 60deg, transparent 60deg)`
            }}
        />
        {/* Central Eye / Lens */}
        <motion.div
            className="absolute w-24 h-24 border-2 rounded-full flex items-center justify-center"
            style={{ borderColor: color }}
            initial={{ scale: 0.8 }}
            animate={{ scale: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="w-16 h-16 border border-white/30 rounded-full" />
            <motion.div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
        </motion.div>

        {/* Data Points */}
        {[0, 90, 180, 270].map((deg, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-8 bg-white/20"
                style={{ rotate: `${deg}deg`, top: '50%', left: '50%', transformOrigin: 'top left' }}
            />
        ))}
    </div>
);

// 1. RENSNCEDAODMND: The Diamond
const AuditDiamond = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Rotating Octahedron Wireframe representation */}
        <motion.div
            className="relative w-32 h-32"
            animate={{ rotateY: 360, rotateZ: 180 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute inset-0 border-2 rotate-45" style={{ borderColor: color, transform: 'translateZ(20px)' }} />
            <div className="absolute inset-0 border-2 rotate-45" style={{ borderColor: `${color}80`, transform: 'translateZ(-20px)' }} />
            <div className="absolute inset-0 border border-white/20 rotate-45 bg-white/5" />
        </motion.div>

        {/* Refracting Light Rays */}
        {[0, 1, 2, 3].map(i => (
            <motion.div
                key={i}
                className="absolute w-48 h-[1px]"
                style={{
                    background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
                    rotate: `${i * 45}deg`
                }}
                animate={{ rotate: [`${i * 45}deg`, `${i * 45 + 360}deg`] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
        ))}
    </div>
);

// 2. RENSNCEDRCTRY: The Hierarchy / Tree
const AuditDirectory = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Concentric Rings representing Access Levels */}
        {[1, 2, 3].map(i => (
            <motion.div
                key={i}
                className="absolute rounded-full border border-dashed"
                style={{
                    width: `${i * 80}px`,
                    height: `${i * 80}px`,
                    borderColor: `${color}40`
                }}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
            >
                {/* Orbiting Nodes */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_10px_white]" />
            </motion.div>
        ))}
        {/* Central Authority */}
        <div className="w-4 h-4 bg-white/80 rotate-45 shadow-[0_0_15px_white]" />
    </div>
);

// 3. RENSNCERPSTRY: The Storage / Repository
const AuditRepository = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Grid of Data Blocks */}
        <div className="grid grid-cols-4 gap-2">
            {[...Array(16)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-8 h-8 border border-white/20 rounded-sm"
                    initial={{ opacity: 0.2 }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        backgroundColor: ['transparent', `${color}20`, 'transparent']
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    </div>
);

// 4. RENSNCEUNDRWRTR: The Scale / Logic Gate
const AuditUnderwriter = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Two Intersecting Circles */}
        <motion.div
            className="absolute w-32 h-32 rounded-full border-2 mix-blend-screen"
            style={{ borderColor: color, x: -30 }}
            animate={{ x: [-30, -20, -30] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
            className="absolute w-32 h-32 rounded-full border-2 border-white/50 mix-blend-screen"
            style={{ x: 30 }}
            animate={{ x: [30, 20, 30] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* The Checkmark / Gate in the middle */}
        <div className="relative z-10 w-16 h-16 border border-white/20 bg-black/50 rotate-45 backdrop-blur-sm flex items-center justify-center">
            <motion.div
                className="w-1 h-8 bg-white"
                animate={{ height: [0, 32] }}
                transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
                className="absolute w-8 h-1 bg-white"
                animate={{ width: [0, 32] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
        </div>
    </div>
);

// 5. MKVLIMNT: The Mint / Forge
const AuditMint = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Rotating Gear */}
        <motion.div
            className="w-40 h-40 border-4 border-dashed rounded-full flex items-center justify-center"
            style={{ borderColor: color }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
            <div className="w-32 h-32 border border-white/20 rounded-full" />
        </motion.div>

        {/* Emitting Particles (Coins) */}
        {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.div
                key={i}
                className="absolute w-4 h-4 rounded-full border border-white/80 bg-white/20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5],
                    x: [0, Math.cos(deg * Math.PI / 180) * 80],
                    y: [0, Math.sin(deg * Math.PI / 180) * 80]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />
        ))}
    </div>
);

// 6. RENSNCERSRV: The Shield / Vault
const AuditReserve = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Hexagonal Shield Layers */}
        {[0, 1, 2].map(i => (
            <motion.div
                key={i}
                className="absolute border-2"
                style={{
                    width: `${60 + i * 40}px`,
                    height: `${60 + i * 40}px`,
                    borderColor: i === 2 ? color : `${color}60`,
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 bg-white/5" />
            </motion.div>
        ))}
        {/* Locked Core */}
        <div className="w-8 h-12 border-2 border-white rounded-t-full mt-2" />
        <div className="absolute w-12 h-10 bg-white/20 backdrop-blur-md mt-6 rounded-sm border border-white/30" />
    </div>
);

export default function GeometricAuditArt({ color, chapterId }: GeometricAuditArtProps) {
    let Component = AuditExecutive;

    // Map ID to Component
    switch (chapterId) {
        case 'rensncedaodmnd': Component = AuditDiamond; break;
        case 'rensncedrctry': Component = AuditDirectory; break;
        case 'rensncerpstry': Component = AuditRepository; break;
        case 'rensnceundrwrtr': Component = AuditUnderwriter; break;
        case 'mkvlimnt': Component = AuditMint; break;
        case 'rensncersrv': Component = AuditReserve; break;
        case 'executive-summary':
        default:
            Component = AuditExecutive; break;
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto h-64 md:h-80 mb-12 flex items-center justify-center overflow-hidden rounded-3xl bg-black/40 border border-white/5 group">

            {/* Ambient Background Glow */}
            <div
                className="absolute inset-0 opacity-10 blur-3xl transition-opacity duration-700 group-hover:opacity-30"
                style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
            />

            {/* Render the specific art component */}
            <Component color={color} />

            {/* Technical Overlay Lines (Common Aesthetics) */}
            <div className="absolute inset-0 pointer-events-none opacity-20 hidden md:block">
                <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white" />
                <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white" />
                <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white" />
                <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white" />

                {/* ID Stamp */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    ID: {chapterId}
                </div>
            </div>
        </div>
    );
}
