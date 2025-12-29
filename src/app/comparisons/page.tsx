'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import { COMPARISONS } from '@/data/seo';
import {
    Scale,
    TrendingUp,
    Building2,
    Vote,
    Lightbulb,
    ChevronRight,
    Swords
} from 'lucide-react';

// Map category to icon
const categoryIcons: Record<string, React.ReactNode> = {
    'DeFi': <TrendingUp className="w-6 h-6" />,
    'TradFi': <Building2 className="w-6 h-6" />,
    'Governance': <Vote className="w-6 h-6" />,
    'Philosophy': <Lightbulb className="w-6 h-6" />,
};

export default function ComparisonsPage() {
    const categories = Array.from(new Set(COMPARISONS.map(c => c.category)));

    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white">
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="section-heading flex items-center justify-center gap-2">
                        <Scale className="w-4 h-4" /> MARKET POSITION
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2">
                        RENSNCE vs The World
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        In an era of mimics, we return to First Principles.
                        See how the Renaissance contrasts with the Status Quo.
                    </p>
                </div>

                <div className="space-y-16">
                    {categories.map((category) => (
                        <section key={category}>
                            <h3 className="text-3xl font-bold mb-8 border-b border-white/10 pb-4 flex items-center gap-4">
                                <span className="text-utility-red flex items-center gap-2">
                                    {categoryIcons[category]} {category}
                                </span>
                                Sector
                            </h3>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {COMPARISONS.filter(c => c.category === category).map((comp, index) => (
                                    <Link
                                        key={comp.slug}
                                        href={`/comparisons/${comp.slug}`}
                                        className="group glass-panel rounded-2xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-utility-red/30 flex flex-col overflow-hidden"
                                    >
                                        {/* Grayscale Mesh Gradient Cover */}
                                        <div className="h-20 relative" style={{
                                            background: `
                                                radial-gradient(ellipse at ${25 + index * 20}% ${35 + index * 10}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                                                radial-gradient(ellipse at ${75 - index * 15}% ${65 - index * 5}%, rgba(160, 160, 160, 0.07) 0%, transparent 40%),
                                                linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)
                                            `
                                        }}>
                                            {/* VS Badge */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full">
                                                <Swords className="w-4 h-4 text-utility-red" />
                                                <span className="text-xs font-mono text-gray-400">VS</span>
                                            </div>
                                            {/* Subtle Grid Pattern */}
                                            <div className="absolute inset-0 opacity-20" style={{
                                                backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                                                backgroundSize: '14px 14px'
                                            }} />
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="mb-4">
                                                <span className="text-xs font-mono text-gray-500 uppercase">Competitor</span>
                                                <h4 className="text-2xl font-bold group-hover:text-utility-red transition-colors">{comp.competitor}</h4>
                                            </div>

                                            <p className="text-gray-400 text-sm mb-6 flex-grow">
                                                {comp.description}
                                            </p>

                                            <div className="bg-utility-red/10 p-4 rounded-xl border border-utility-red/20 relative overflow-hidden">
                                                {/* Subtle gradient in advantage box */}
                                                <div className="absolute inset-0 opacity-30" style={{
                                                    background: 'radial-gradient(ellipse at 0% 0%, rgba(245, 64, 41, 0.2) 0%, transparent 50%)'
                                                }} />
                                                <span className="text-utility-red text-xs font-bold block mb-1 relative z-10">RENSNCE Advantage</span>
                                                <p className="text-sm text-gray-300 line-clamp-2 relative z-10">
                                                    {comp.tucAdvantage}
                                                </p>
                                            </div>

                                            <div className="mt-6 flex items-center justify-center text-sm font-mono text-gray-500 group-hover:text-utility-red transition-colors">
                                                READ STRATEGIC BRIEF <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
