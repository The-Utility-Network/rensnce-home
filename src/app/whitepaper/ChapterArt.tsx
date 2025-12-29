'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChapterArtProps {
    symbol: string; // Filename like 'ES.png'
    color: string;
}

export default function ChapterArt({ symbol, color }: ChapterArtProps) {
    return (
        <div className="relative w-full max-w-md mx-auto aspect-square mb-12 flex items-center justify-center overflow-hidden rounded-3xl bg-black/40 border border-white/5 group">

            {/* Ambient Background Glow */}
            <div
                className="absolute inset-0 opacity-20 blur-3xl transition-opacity duration-700 group-hover:opacity-40"
                style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
            />

            {/* Rotating Rings (Decorative) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[80%] h-[80%] rounded-full border border-dashed border-white/10"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[60%] h-[60%] rounded-full border border-dotted border-white/10"
                />
            </div>

            {/* The Symbol Image */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-3xl"
            >
                {/* Glow behind symbol */}
                <div
                    className="absolute inset-0 blur-2xl opacity-40"
                    style={{ backgroundColor: color }}
                />

                <img
                    src={`/NotionSymbols/${symbol}`}
                    alt="Chapter Symbol"
                    className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-3xl"
                />
            </motion.div>
        </div>
    );
}
