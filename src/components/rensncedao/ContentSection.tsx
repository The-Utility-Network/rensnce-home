'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

interface ContentSectionProps {
    id?: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    className?: string;
    background?: React.ReactNode;
}

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

export default function ContentSection({ id, title, subtitle, children, className = '', background }: ContentSectionProps) {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax for the title
    const titleY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section id={id} ref={sectionRef} className={`py-20 relative overflow-hidden ${className}`}>
            {background && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {background}
                </div>
            )}
            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="mb-12 text-center md:text-left">
                        <motion.h2 variants={fadeInUp} style={{ y: titleY }} className="text-3xl md:text-5xl font-bold text-white mb-2">{title}</motion.h2>
                        {subtitle && (
                            <motion.p variants={fadeInUp} className="font-mono-label text-utility-red-dark tracking-widest">{subtitle}</motion.p>
                        )}
                        <motion.div variants={fadeInUp} className="h-0.5 w-24 bg-gradient-to-r from-transparent via-utility-red to-transparent mt-4 md:mx-0 mx-auto opacity-50" />
                    </div>

                    <motion.div variants={fadeInUp} className="card text-foreground-muted text-lg leading-relaxed space-y-6">
                        {children}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
