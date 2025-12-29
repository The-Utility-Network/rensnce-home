'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import HeroGraph from './HeroGraph';

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3,
            delayChildren: 0.5
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const separatorVariants: Variants = {
    hidden: { scaleX: 0, opacity: 0 },
    show: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut" }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" }
    }
};

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24">

            {/* Graph Background */}
            <HeroGraph />

            {/* Bottom Vignette for smooth transition */}
            {/* Bottom Vignette for smooth transition */}
            <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-[5]" />

            {/* Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="hud-line-left top-1/3 opacity-50" />
                <div className="hud-line-right top-1/3 opacity-50" />
                <div className="hud-line-left bottom-1/3 opacity-50" />
                <div className="hud-line-right bottom-1/3 opacity-50" />
            </div>

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                {/* Medallion - Restored */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-8 relative"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 animate-float">
                        <div className="absolute inset-0 rounded-full border border-utility-red/30 animate-[spin_60s_linear_infinite]" />
                        <div className="absolute inset-4 rounded-full border border-utility-red/10 animate-[spin_40s_linear_reverse_infinite]" />
                        <Image
                            src="/Medallions/RENSNCESTNDGLSS.png"
                            alt="RENSCNEDAO Medallion"
                            fill
                            className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                            priority
                        />
                    </div>
                </motion.div>

                {/* Title Group */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="space-y-6 max-w-4xl"
                >
                    <div className="flex flex-col items-center gap-2">
                        <motion.span
                            variants={itemVariants}
                            className="font-mono-label text-silver tracking-[0.5em] text-sm md:text-base drop-shadow-md"
                        >
                            MINTING NOW
                        </motion.span>
                        <motion.h1
                            variants={titleVariants}
                            className="font-serif text-4xl md:text-7xl lg:text-8xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
                        >
                            RENSNCEDAO
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-foreground-muted tracking-wide italic drop-shadow-lg"
                        >
                            "Welcome to MKVLI"
                        </motion.p>
                    </div>

                    <motion.div variants={separatorVariants} className="h-px w-32 bg-gradient-to-r from-transparent via-utility-red-dark to-transparent mx-auto my-8" />

                    {/* Executive Summary Snippet - Enhanced Contrast */}
                    <motion.div variants={cardVariants} className="glass-panel p-8 rounded-lg border-t border-utility-red/20 max-w-2xl mx-auto backdrop-blur-md bg-black/60 shadow-2xl">
                        <p className="text-lg md:text-xl leading-relaxed text-balance text-foreground/90 drop-shadow-md">
                            A revolutionary step forward in decentralized finance and governance.
                            MKVLI is not just a token; it is the cornerstone of a new digital renaissance,
                            blending utility, governance, and reserve mechanics into a single, cohesive asset.
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
