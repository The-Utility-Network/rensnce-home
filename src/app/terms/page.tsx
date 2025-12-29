'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import { motion } from 'framer-motion';
import { Scale, Gavel, FileText, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
            <Navbar themeColor="#E5E4E2" />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <span className="section-heading flex items-center justify-center gap-2 mb-4">
                            <Scale className="w-4 h-4" /> GOVERNANCE RULES
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-400 font-light">
                            The binding technical and legal agreement for participation in the RENSNCE DAO ecosystem.
                        </p>
                        <div className="mt-8 text-sm font-mono text-gray-500 uppercase tracking-widest">
                            Last Updated: December 28, 2025
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-32">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-16"
                    >
                        {/* 1. Acceptance */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                1. Acceptance of Terms
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                By accessing or using the RENSNCEDAO platform, its smart contracts, or any associated websites (collectively, the "Platform"), you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and <strong>RENSNCEDAO</strong>. If you do not agree to these terms, you must immediately cease all use of the Platform.
                            </p>
                        </motion.div>

                        {/* 2. Decentralized Nature */}
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-8">
                                2. Ecosystem Dynamics
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-400" /> Agency
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Participants act of their own volition, accepting all risks associated with cryptographic systems.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Gavel className="w-5 h-5 text-gray-400" /> Governance
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Strategic decisions are driven by collective stakeholder consensus as encoded in our facets.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-utility-red" /> Risk
                                    </h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Blockchain technology is experimental. Users acknowledge the potential for permanent loss of funds.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. Smart Contracts */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                3. Smart Contract Execution
                            </h2>
                            <p className="text-gray-300">
                                Much of the Platform operates via the <strong className="text-white">EIP-2535 Diamond Standard</strong> on the Base layer-2 network.
                            </p>
                            <ul className="space-y-4 text-gray-300">
                                <li><strong>Irreversibility:</strong> Transactions executed via smart contracts are immutable and cannot be reversed by RENSNCEDAO.</li>
                                <li><strong>Code is Law:</strong> The logic encoded within the smart contracts governs the distribution and redemption of the MKVLI token.</li>
                                <li><strong>Access:</strong> Users are responsible for maintaining the security of their private keys and wallet access.</li>
                            </ul>
                        </motion.div>

                        {/* 4. Intellectual Property */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                4. Intellectual Property
                            </h2>
                            <p className="text-gray-300">
                                All content, trademarks, logos, and software architectures associated with RENSNCEDAO are the exclusive property of RENSNCEDAO, unless otherwise noted for open-source components. Users are granted a limited, non-exclusive license for personal use of the Platform only.
                            </p>
                        </motion.div>

                        {/* 5. Prohibited Activities */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                5. Prohibited Activities
                            </h2>
                            <p className="text-gray-300">
                                Participants may not engage in:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li>Exploitation of smart contract vulnerabilities or "hacks."</li>
                                <li>Market manipulation or wash trading of MKVLI tokens.</li>
                                <li>Use of the Platform for illicit cross-border financial activities.</li>
                                <li>Interference with the governance mechanisms of the DAO.</li>
                            </ul>
                        </motion.div>

                        {/* 6. Disclaimers */}
                        <motion.div variants={fadeInUp}>
                            <div className="p-8 rounded-2xl border-2 border-utility-red/20 bg-utility-red/5">
                                <h2 className="text-xl font-bold flex items-center gap-3 text-white mb-4">
                                    <ShieldAlert className="w-6 h-6 text-utility-red" /> 6. Limitation of Liability
                                </h2>
                                <p className="text-sm text-gray-300 leading-relaxed uppercase font-mono">
                                    THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE." RENSNCEDAO DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED. IN NO EVENT SHALL THE DAO, ITS FACETS, OR ITS CONTRIBUTORS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING FROM THE USE OF CRYPTOGRAPHIC TOKENS OR SMART CONTRACTS.
                                </p>
                            </div>
                        </motion.div>

                        {/* 7. Governing Law */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                7. Governing Law
                            </h2>
                            <p className="text-gray-300">
                                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which RENSNCEDAO is incorporated, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration.
                            </p>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                            <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                                Legal Inquiries
                            </h2>
                            <p className="text-gray-400 mb-6">
                                For official legal inquiries or notices, please contact the Office of General Counsel at:
                            </p>
                            <a
                                href="mailto:info@rensnce.com"
                                className="text-xl md:text-2xl font-bold text-white hover:text-gray-300 transition-colors underline decoration-white/20 underline-offset-8"
                            >
                                info@rensnce.com
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
