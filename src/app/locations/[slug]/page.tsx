'use client';

import { notFound } from 'next/navigation';
import { LOCATIONS } from '@/data/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import GeometricCyberGrid from '@/components/GeometricCyberGrid';
import { getMedallionUrl } from '@/utils/medallions';
import { use } from 'react';
import {
    ArrowLeft,
    MapPin,
    Globe,
    ShieldCheck,
    BarChart3,
    Building2,
    Factory,
    Zap,
    Wheat,
    ChevronRight,
    ExternalLink
} from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

// Asset type icons
const assetIcons = [
    { icon: Building2, label: 'Real Estate' },
    { icon: Factory, label: 'Industrial' },
    { icon: Zap, label: 'Energy' },
    { icon: Wheat, label: 'Commodities' },
];

export default function LocationPage({ params }: Props) {
    const { slug } = use(params);
    const location = LOCATIONS.find((loc) => loc.slug === slug);

    if (!location) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <Navbar themeColor="#E5E4E2" />

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Grayscale Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-40" style={{
                    background: 'radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(150, 150, 150, 0.08) 0%, transparent 40%)'
                }} />
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <GeometricCyberGrid />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="mb-12">
                        <Link href="/locations" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Global Network
                        </Link>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-utility-red mb-6">
                                <span className="w-2 h-2 rounded-full bg-utility-red animate-pulse" />
                                ACTIVE CITADEL: {location.code}
                            </div>
                            <h1 className="text-4xl md:text-8xl font-bold mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                                {location.city}
                            </h1>
                            <p className="text-2xl text-gray-300 leading-relaxed font-light mb-8">
                                {location.description}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                {location.activeSubsidiaries.map((sub, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                                        <div className="w-6 h-6 relative">
                                            <img src={getMedallionUrl(sub)} alt={sub} className="w-full h-full object-contain" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-400">{sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vintage Cover Image */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl lg:mt-12">
                            <img
                                src={`/locations/${location.slug}.png`}
                                alt={`${location.city} vintage illustration`}
                                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-utility-red" />
                                    <span className="text-lg font-bold">{location.city}, {location.country}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid Below */}
                    <div className="mt-16 grid md:grid-cols-4 gap-6">
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                            }} />
                            <div className="relative z-10">
                                <Globe className="w-5 h-5 text-gray-500 mb-2" />
                                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Region</div>
                                <div className="text-xl font-bold">{location.region}</div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                            }} />
                            <div className="relative z-10">
                                <MapPin className="w-5 h-5 text-gray-500 mb-2" />
                                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Coordinates</div>
                                <div className="text-xl font-bold font-mono">{location.coordinates.x.toFixed(2)}, {location.coordinates.y.toFixed(2)}</div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                            }} />
                            <div className="relative z-10">
                                <BarChart3 className="w-5 h-5 text-gray-500 mb-2" />
                                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Key Focus</div>
                                <div className="text-xl font-bold text-utility-red">{location.keyFocus}</div>
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                            }} />
                            <div className="relative z-10">
                                <ShieldCheck className="w-5 h-5 text-gray-500 mb-2" />
                                <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">Compliance</div>
                                <div className="text-xl font-bold text-green-500">100%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="px-6 pb-24 max-w-7xl mx-auto">
                {/* Regulatory Context */}
                <div className="mb-24">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-utility-red" />
                        Regulatory Landscape
                    </h2>

                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-8">
                            <div className="glass-panel p-8 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                                }} />
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-4 text-gray-200">The Challenge</h3>
                                    <p className="text-lg text-gray-400 leading-relaxed">
                                        {location.regulatoryContext}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-panel p-8 rounded-3xl border border-green-500/20 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
                            }} />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center gap-2">
                                    <ShieldCheck className="w-6 h-6" />
                                    The Compliance Engine
                                </h3>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {location.complianceNarrative}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Local Lexicon / Codex Integration */}
                <div className="mb-24">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" /> Regional Terminology
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {(() => {
                            const relatedTerms = require('@/data/codex').CODEX.filter((term: any) =>
                                term.relatedLocations.includes(location.slug)
                            );

                            if (relatedTerms.length === 0) return (
                                <p className="text-gray-600 text-sm col-span-4">No specific regional terms defined yet.</p>
                            );

                            return relatedTerms.slice(0, 4).map((term: any, index: number) => (
                                <Link key={term.slug} href={`/codex/${term.slug}`} className="group block rounded-2xl border border-white/5 hover:border-utility-red/30 transition-all hover:bg-white/5 overflow-hidden">
                                    {/* Mini Mesh Gradient */}
                                    <div className="h-12 relative" style={{
                                        background: `radial-gradient(ellipse at ${30 + index * 20}% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%), linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)`
                                    }} />
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-xs font-mono text-gray-500 uppercase">{term.category}</span>
                                            <ChevronRight className="w-4 h-4 text-utility-red opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <h4 className="font-bold text-lg mb-2 text-gray-200 group-hover:text-white">{term.term}</h4>
                                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{term.definition}</p>
                                    </div>
                                </Link>
                            ));
                        })()}
                    </div>
                </div>

                {/* Token Economy */}
                <div className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-blue-500" />
                        Local Token Economy
                    </h2>

                    <div className="glass-panel p-12 rounded-3xl border border-white/5 relative overflow-hidden">
                        {/* Mesh Gradient Background */}
                        <div className="absolute inset-0 opacity-40" style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(150, 150, 150, 0.08) 0%, transparent 40%)'
                        }} />
                        {/* Subtle Grid Pattern */}
                        <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '20px 20px'
                        }} />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h3 className="text-4xl font-bold mb-6 text-white">What's being traded?</h3>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    {location.localTokenizationEconomy}
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {assetIcons.map(({ icon: Icon, label }, i) => (
                                    <div key={label} className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors relative overflow-hidden group">
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity" style={{
                                            background: 'radial-gradient(ellipse at 50% 50%, rgba(245, 64, 41, 0.2) 0%, transparent 70%)'
                                        }} />
                                        <Icon className="w-8 h-8 mx-auto mb-2 text-gray-400 group-hover:text-utility-red transition-colors" />
                                        <div className="font-bold text-sm relative z-10">{label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex justify-center">
                    <Link href="/contact" className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden">
                        <span className="relative z-10">Launch in {location.city}</span>
                        <ExternalLink className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-gray-200 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    );
}
