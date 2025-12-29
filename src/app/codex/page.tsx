'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import { CODEX } from '@/data/codex';
import StructuredData from '@/components/StructuredData';
import Web3Wizard from '@/components/Web3Wizard';
import { BookOpen, ChevronRight, Layers } from 'lucide-react';

// Map category to color
const categoryColors: Record<string, string> = {
    'Technology': 'from-blue-500/20 to-blue-500/5',
    'Economics': 'from-green-500/20 to-green-500/5',
    'Philosophy': 'from-purple-500/20 to-purple-500/5',
    'Infrastructure': 'from-orange-500/20 to-orange-500/5',
    'Security': 'from-red-500/20 to-red-500/5',
    'Cryptography': 'from-cyan-500/20 to-cyan-500/5',
    'Hardware': 'from-yellow-500/20 to-yellow-500/5',
    'Scaling': 'from-pink-500/20 to-pink-500/5',
    'Architecture': 'from-indigo-500/20 to-indigo-500/5',
    'DeFi': 'from-emerald-500/20 to-emerald-500/5',
    'Consensus': 'from-violet-500/20 to-violet-500/5',
    'Identity': 'from-teal-500/20 to-teal-500/5',
    'Governance': 'from-amber-500/20 to-amber-500/5',
};

export default function CodexIndex() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <StructuredData data={{
                '@context': 'https://schema.org',
                '@type': 'CollectionPage',
                name: 'The RENSNCE Codex',
                description: 'The definitive lexicon for the machine age.',
                publisher: {
                    '@type': 'Organization',
                    name: 'RENSNCE DAO'
                }
            }} />
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 max-w-7xl mx-auto">
                <div className="text-center px-6 mb-16">
                    <span className="section-heading text-utility-red flex items-center justify-center gap-2">
                        <BookOpen className="w-4 h-4" /> KNOWLEDGE GRAPH
                    </span>
                    <h1 className="text-4xl md:text-8xl font-bold mt-4 mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                        THE CODEX
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Decoding the language of the machine economy.
                    </p>
                </div>

                {/* Web3 Education Wizard Banner */}
                <Web3Wizard />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 mt-16">
                    {CODEX.map((term, index) => (
                        <Link
                            key={term.slug}
                            href={`/codex/${term.slug}`}
                            className="group glass-panel rounded-2xl border border-white/5 hover:border-utility-red/30 transition-all duration-300 hover:bg-white/5 overflow-hidden"
                        >
                            {/* Grayscale Mesh Gradient Cover */}
                            <div className="h-16 relative" style={{
                                background: `
                                    radial-gradient(ellipse at ${20 + (index % 5) * 15}% ${30 + (index % 3) * 15}%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                                    radial-gradient(ellipse at ${80 - (index % 4) * 10}% ${70 - (index % 3) * 10}%, rgba(150, 150, 150, 0.08) 0%, transparent 40%),
                                    linear-gradient(135deg, rgba(40, 40, 40, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)
                                `
                            }}>
                                {/* Category Badge */}
                                <div className={`absolute top-3 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-gradient-to-r ${categoryColors[term.category] || 'from-gray-500/20 to-gray-500/5'} border border-white/10`}>
                                    {term.category}
                                </div>
                                {/* Arrow indicator */}
                                <div className="absolute top-3 right-4 text-utility-red opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                                {/* Subtle Grid Pattern */}
                                <div className="absolute inset-0 opacity-15" style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                    backgroundSize: '12px 12px'
                                }} />
                            </div>

                            <div className="p-6">
                                <h2 className="text-xl font-bold mb-3 group-hover:text-utility-red transition-colors">
                                    {term.term}
                                </h2>
                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                                    {term.definition}
                                </p>

                                {/* Related Initiatives Preview */}
                                {term.relatedInitiatives.length > 0 && (
                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Layers className="w-3 h-3" />
                                        <span>{term.relatedInitiatives.length} related initiative{term.relatedInitiatives.length > 1 ? 's' : ''}</span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
