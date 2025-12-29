'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Gavel, Globe, FileText } from 'lucide-react';

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

export default function PrivacyPage() {
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
                            <Shield className="w-4 h-4" /> LEGAL FRAMEWORK
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                            Privacy Protocols
                        </h1>
                        <p className="text-xl text-gray-400 font-light">
                            Our commitment to Data Sovereignty and the protection of your digital autonomy.
                        </p>
                        <div className="mt-8 text-sm font-mono text-gray-500 uppercase tracking-widest">
                            Effective Date: December 28, 2025 | Version 2.0
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
                        {/* Introduction */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                1. Mission Statement
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                At <strong>RENSNCEDAO</strong>, we believe that privacy is a fundamental human right. Our privacy protocols are built upon the principles of <strong>Data Sovereignty</strong>—the concept that users should have absolute control over their own data, how it is stored, and who may access it. This document outlines our rigorous standards for data protection and transparency across our entire ecosystem.
                            </p>
                        </motion.div>

                        {/* Data Sovereignty Principles */}
                        <motion.div variants={fadeInUp}>
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-8">
                                2. Data Sovereignty Principles
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Lock className="w-5 h-5 text-gray-400" /> Ownership
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Your data belongs to you. We do not claim ownership of any information transmitted through our protocols.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-gray-400" /> Transparency
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Open-source architectures ensure that our data processing logic is verifiable by anyone, at any time.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-gray-400" /> Portability
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        Unimpeded ability to export and transfer your data across different systems within or outside the DAO.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl border border-white/10 bg-white/5">
                                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-gray-400" /> Security
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed">
                                        State-of-the-art cryptographic standards protecting information from unauthorized access.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Information Collection */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                3. Information Collection
                            </h2>
                            <p className="text-gray-300">
                                We categorize the information we handle into three distinct levels:
                            </p>
                            <ul className="space-y-4 text-gray-300">
                                <li>
                                    <strong className="text-white">Protocol Level:</strong> Public blockchain data (wallet addresses, transaction hashes, smart contract interactions). This data is inherent to the technology and is immutable.
                                </li>
                                <li>
                                    <strong className="text-white">Interface Level:</strong> Non-identifying telemetry (browser type, device type, region) used to optimize the user experience.
                                </li>
                                <li>
                                    <strong className="text-white">Personal Level:</strong> Information you explicitly provide (email, name, contact inquiries). This is treated with the highest level of confidentiality.
                                </li>
                            </ul>
                        </motion.div>

                        {/* How We Use Your Information */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                4. Utilization of Information
                            </h2>
                            <p className="text-gray-300">
                                Your information is utilized strictly for the following purposes:
                            </p>
                            <ol className="space-y-2 text-gray-300">
                                <li>Execution of smart contract protocols as requested.</li>
                                <li>Providing essential platform updates and security alerts.</li>
                                <li>Analyzing ecosystem performance to improve network stability.</li>
                                <li>Compliance with applicable legal and regulatory requirements.</li>
                            </ol>
                            <p className="text-gray-300 mt-4">
                                <strong className="text-white italic underline">We do not sell your personal data to third parties.</strong>
                            </p>
                        </motion.div>

                        {/* Data Governance */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                5. Data Governance and Sharing
                            </h2>
                            <p className="text-gray-300">
                                Sharing of information is limited to:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li>Authorized service providers essential for platform operations.</li>
                                <li>Subsidiaries within the RENSNCEDAO network, under identical privacy constraints.</li>
                                <li>Law enforcement or regulatory bodies when compelled by valid legal process.</li>
                            </ul>
                        </motion.div>

                        {/* User Rights */}
                        <motion.div variants={fadeInUp} className="prose prose-invert prose-lg max-w-none">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-white border-l-2 border-white pl-4 mb-6">
                                6. Your Rights (GDPR & CCPA Compliance)
                            </h2>
                            <p className="text-gray-300">
                                Regardless of your physical location, we afford you the following rights:
                            </p>
                            <ul className="space-y-2 text-gray-300">
                                <li><strong>Right to Access:</strong> Request a copy of the personal data we hold.</li>
                                <li><strong>Right to Rectification:</strong> Request correction of inaccurate data.</li>
                                <li><strong>Right to Erasure:</strong> Request deletion of your personal data ("Right to be Forgotten").</li>
                                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service.</li>
                            </ul>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div variants={fadeInUp} className="p-8 rounded-2xl border border-white/10 bg-white/5 text-center">
                            <h2 className="text-2xl font-bold mb-4 text-white uppercase tracking-wider">
                                Contact Privacy Officer
                            </h2>
                            <p className="text-gray-400 mb-6">
                                If you have any inquiries regarding our privacy protocols or wish to exercise your data rights, please contact us at:
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
