'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import { INITIATIVES } from '@/data/seo';
import {
    DoorOpen,
    KeyRound,
    ScrollText,
    Bot,
    Cog,
    Link as LinkIcon,
    TrendingUp,
    ChevronRight
} from 'lucide-react';

export default function InitiativesPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white">
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <span className="section-heading">STRATEGIC INITIATIVES</span>
                    <h1 className="text-4xl md:text-7xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2">
                        Access. Agency. <br /> Accountability.
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Programs at the intersection of <span className="text-blue-400">AI</span>, <span className="text-green-400">Automation</span>, and <span className="text-purple-400">Blockchain</span> that
                        empower individuals and communities to participate in the new economy.
                    </p>
                </div>

                {/* Three Pillars Banner */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 relative overflow-hidden">
                        {/* Mesh Gradient Overlay */}
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)'
                        }} />
                        <div className="relative z-10">
                            <DoorOpen className="w-10 h-10 text-blue-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Access</h3>
                            <p className="text-sm text-gray-400">Removing barriers to financial services, data markets, and civic participation.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)'
                        }} />
                        <div className="relative z-10">
                            <KeyRound className="w-10 h-10 text-green-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Agency</h3>
                            <p className="text-sm text-gray-400">Putting control of data, identity, and assets in the hands of the individual.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(168, 85, 247, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)'
                        }} />
                        <div className="relative z-10">
                            <ScrollText className="w-10 h-10 text-purple-400 mb-4" />
                            <h3 className="text-xl font-bold mb-2">Accountability</h3>
                            <p className="text-sm text-gray-400">Creating transparent, auditable systems that hold institutions to their promises.</p>
                        </div>
                    </div>
                </div>

                {/* Technology Stack Banner */}
                <div className="mb-16 p-6 rounded-2xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
                    {/* Grayscale Mesh Gradient */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(ellipse at 10% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 90% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, rgba(100, 100, 100, 0.1) 0%, transparent 60%)'
                    }} />
                    <div className="relative z-10">
                        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Powered By The Convergence Of</span>
                        <div className="flex flex-wrap justify-center gap-8 mt-4">
                            <div className="flex items-center gap-2">
                                <Bot className="w-6 h-6 text-blue-400" />
                                <span className="font-bold text-blue-400">Artificial Intelligence</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Cog className="w-6 h-6 text-green-400" />
                                <span className="font-bold text-green-400">Automation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <LinkIcon className="w-6 h-6 text-purple-400" />
                                <span className="font-bold text-purple-400">Blockchain</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Initiatives Grid */}
                <div className="grid md:grid-cols-2 gap-8">
                    {INITIATIVES.map((initiative, index) => (
                        <Link
                            key={initiative.slug}
                            href={`/initiatives/${initiative.slug}`}
                            className="group glass-panel rounded-3xl hover:bg-white/5 transition-all duration-300 border border-white/5 hover:border-utility-red/30 relative overflow-hidden"
                        >
                            {/* Vintage Cover Image */}
                            <div className="h-36 relative overflow-hidden">
                                <img
                                    src={`/initiatives/${initiative.slug}.png`}
                                    alt={`${initiative.title} vintage illustration`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                                    onError={(e) => {
                                        // Fallback to mesh gradient if image doesn't exist
                                        const target = e.currentTarget;
                                        target.style.display = 'none';
                                        const parent = target.parentElement;
                                        if (parent) {
                                            parent.style.background = `
                                                radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
                                                radial-gradient(ellipse at 80% 70%, rgba(200, 200, 200, 0.08) 0%, transparent 40%),
                                                linear-gradient(135deg, rgba(40, 40, 40, 0.9) 0%, rgba(20, 20, 20, 0.95) 100%)
                                            `;
                                        }
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                {/* Decorative Number */}
                                <span className="absolute top-4 right-6 text-6xl font-black text-white/20 group-hover:text-utility-red/30 transition-colors">
                                    0{index + 1}
                                </span>
                            </div>

                            <div className="p-8">
                                <h2 className="text-3xl font-bold mb-4 group-hover:text-utility-red transition-colors">
                                    {initiative.title}
                                </h2>
                                <p className="text-gray-400 mb-6 line-clamp-3">
                                    {initiative.description}
                                </p>

                                {/* Impact Metrics Preview */}
                                {initiative.impactMetrics && (
                                    <div className="mb-6">
                                        <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2 block flex items-center gap-2">
                                            <TrendingUp className="w-3 h-3" /> Measured By
                                        </span>
                                        <div className="flex flex-wrap gap-2">
                                            {initiative.impactMetrics.slice(0, 2).map(metric => (
                                                <span key={metric} className="px-3 py-1 bg-utility-red/10 border border-utility-red/20 rounded-full text-xs text-utility-red">
                                                    {metric}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <span className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-2 block">DAO Facets</span>
                                    <div className="flex flex-wrap gap-2">
                                        {initiative.subsidiaries.map(sub => (
                                            <span key={sub} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 flex items-center text-utility-red text-sm font-semibold">
                                    Explore Initiative <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
