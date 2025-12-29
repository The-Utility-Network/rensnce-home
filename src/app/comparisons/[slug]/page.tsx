'use client';

import { notFound } from 'next/navigation';
import { COMPARISONS } from '@/data/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import ComparisonChart from '@/components/ComparisonChart';
import { use } from 'react';
import {
    ArrowLeft,
    Swords,
    X,
    Check,
    Clock,
    Shield,
    Zap,
    TrendingUp,
    Building2,
    Vote,
    Lightbulb
} from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
    'DeFi': <TrendingUp className="w-5 h-5" />,
    'TradFi': <Building2 className="w-5 h-5" />,
    'Governance': <Vote className="w-5 h-5" />,
    'Philosophy': <Lightbulb className="w-5 h-5" />,
};

export default function ComparisonPage({ params }: Props) {
    const { slug } = use(params);
    const comparison = COMPARISONS.find((c) => c.slug === slug);

    if (!comparison) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/comparisons" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Comparisons
                    </Link>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Header & Overview */}
                    <div className="lg:col-span-2 text-center mb-8 relative">
                        {/* Mesh Gradient Background */}
                        <div className="absolute inset-0 -z-10 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 30% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(245, 64, 41, 0.1) 0%, transparent 50%)'
                        }} />

                        <span className="section-heading text-utility-red flex items-center justify-center gap-2">
                            <Swords className="w-4 h-4" /> HEAD-TO-HEAD
                        </span>
                        <h1 className="text-4xl md:text-7xl font-bold mt-4 mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                            RENSNCE <span className="text-gray-600 px-4 text-3xl align-middle">VS</span> {comparison.competitor}
                        </h1>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm">
                            {categoryIcons[comparison.category]}
                            <span className="text-gray-400">{comparison.category} Sector</span>
                        </div>
                    </div>

                    {/* Competitor Analysis Card */}
                    <div className="glass-panel rounded-3xl border border-white/5 overflow-hidden">
                        {/* Grayscale Mesh Cover */}
                        <div className="h-24 relative" style={{
                            background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(150, 150, 150, 0.08) 0%, transparent 40%), linear-gradient(135deg, rgba(50, 50, 50, 0.9) 0%, rgba(25, 25, 25, 0.95) 100%)'
                        }}>
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                backgroundSize: '16px 16px'
                            }} />
                            <div className="absolute bottom-4 left-8 text-gray-500 text-xs font-mono uppercase">Legacy Approach</div>
                        </div>

                        <div className="p-8">
                            <h2 className="text-2xl font-bold mb-2 text-gray-400">{comparison.competitor}</h2>
                            <span className="inline-block px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-400 mb-6 uppercase tracking-wide">
                                {comparison.category} Approach
                            </span>
                            <p className="text-lg text-gray-300 leading-relaxed min-h-[100px]">
                                {comparison.description}
                            </p>
                            <div className="mt-8 border-t border-white/10 pt-6">
                                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <X className="w-4 h-4 text-red-500" /> Structural Flaws
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Clock className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                        <span>Manual, periodic reporting (Quarterly/Annual)</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Shield className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                        <span>Compliance is post-trade & reactive</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Building2 className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                                        <span>Assets trapped in siloed databases</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* RENSNCE Advantage Card */}
                    <div className="glass-panel rounded-3xl border border-utility-red/30 overflow-hidden relative">
                        {/* Red-tinted Mesh Cover */}
                        <div className="h-24 relative" style={{
                            background: 'radial-gradient(ellipse at 30% 30%, rgba(245, 64, 41, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(245, 64, 41, 0.1) 0%, transparent 40%), linear-gradient(135deg, rgba(60, 30, 30, 0.9) 0%, rgba(30, 15, 15, 0.95) 100%)'
                        }}>
                            <div className="absolute inset-0 opacity-20" style={{
                                backgroundImage: 'linear-gradient(rgba(245, 64, 41, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 64, 41, 0.05) 1px, transparent 1px)',
                                backgroundSize: '16px 16px'
                            }} />
                            <div className="absolute bottom-4 left-8 text-utility-red text-xs font-mono uppercase">Renaissance Approach</div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-utility-red/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

                        <div className="p-8 relative z-10">
                            <h2 className="text-2xl font-bold mb-2 text-white">RENSNCE DAO</h2>
                            <span className="inline-block px-3 py-1 bg-utility-red/20 rounded-full text-xs text-utility-red mb-6 uppercase tracking-wide">
                                Renaissance Approach
                            </span>
                            <p className="text-lg text-white leading-relaxed min-h-[100px]">
                                {comparison.tucAdvantage}
                            </p>
                            <section className="mt-8 pt-6 border-t border-utility-red/20">
                                <h4 className="text-sm font-bold text-utility-red mb-4 uppercase tracking-widest flex items-center gap-2">
                                    <Check className="w-4 h-4" /> The RENSNCE Standard
                                </h4>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3 text-gray-200">
                                        <Zap className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong>Real-Time Reporting:</strong> Audit-grade data, block by block.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-200">
                                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong>Automated Compliance:</strong> Rules enforced by smart contract code.</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-200">
                                        <TrendingUp className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span><strong>Asset Fluidity:</strong> Tokenized for instant, global liquidity.</span>
                                    </li>
                                </ul>
                                <ComparisonChart competitorName={comparison.competitor} />
                            </section>
                        </div>
                    </div>
                </div>

                {/* Related Comparisons */}
                <div className="mt-24">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8">Related Comparisons</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {COMPARISONS.filter(c => c.category === comparison.category && c.slug !== comparison.slug).slice(0, 3).map((related, index) => (
                            <Link key={related.slug} href={`/comparisons/${related.slug}`} className="group block rounded-2xl border border-white/5 hover:border-utility-red/30 transition-all overflow-hidden">
                                {/* Mini Mesh Gradient */}
                                <div className="h-16 relative" style={{
                                    background: `radial-gradient(ellipse at ${30 + index * 25}% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%), linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)`
                                }}>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <Swords className="w-5 h-5 text-gray-600" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="text-xs text-gray-500 mb-1">VS</div>
                                    <div className="font-bold text-lg group-hover:text-utility-red transition-colors">{related.competitor}</div>
                                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{related.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
