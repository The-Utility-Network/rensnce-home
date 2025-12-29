'use client';

import { notFound } from 'next/navigation';
import { CODEX } from '@/data/codex';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { use } from 'react';
import {
    ArrowLeft,
    Layers,
    MapPin,
    BookOpen,
    ChevronRight
} from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export default function CodexPage({ params }: Props) {
    const { slug } = use(params);
    const term = CODEX.find((t) => t.slug === slug);

    if (!term) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'DefinedTerm',
        name: term.term,
        description: term.definition,
        inDefinedTermSet: 'https://dao.rensnce.com/codex'
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <StructuredData data={jsonLd} />
            <Navbar themeColor="#E5E4E2" />

            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Grayscale Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-50" style={{
                    background: 'radial-gradient(ellipse at 20% 20%, rgba(255, 255, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(150, 150, 150, 0.05) 0%, transparent 40%)'
                }} />
                <div className="absolute top-0 right-0 w-96 h-96 bg-utility-red/5 rounded-full blur-[100px] pointer-events-none" />

                <main className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-12">
                        <Link href="/codex" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Codex
                        </Link>
                    </div>

                    <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-utility-red mb-8">
                        {term.category.toUpperCase()}
                    </span>

                    <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        {term.term}
                    </h1>

                    {/* Definition Card with Mesh Gradient */}
                    <div className="relative mb-12 p-8 rounded-2xl border border-white/10 overflow-hidden">
                        <div className="absolute inset-0 opacity-40" style={{
                            background: 'radial-gradient(ellipse at 0% 0%, rgba(245, 64, 41, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
                        }} />
                        <div className="relative z-10 text-2xl text-white font-light leading-relaxed border-l-4 border-utility-red pl-6">
                            {term.definition}
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none text-gray-300">
                        <p className="text-lg leading-relaxed">{term.longDescription}</p>
                    </div>

                    <div className="mt-24 grid md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
                        {term.relatedInitiatives.length > 0 && (
                            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                                }} />
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <Layers className="w-4 h-4" /> Related Initiatives
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {term.relatedInitiatives.map(ind => (
                                            <Link key={ind} href={`/initiatives/${ind}`} className="group px-4 py-2 bg-white/5 hover:bg-utility-red/20 rounded-lg text-sm transition-colors flex items-center gap-1">
                                                {ind.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {term.relatedLocations.length > 0 && (
                            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20" style={{
                                    background: 'radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)'
                                }} />
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <MapPin className="w-4 h-4" /> Active Citadels
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {term.relatedLocations.map(loc => (
                                            <Link key={loc} href={`/locations/${loc}`} className="group px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-sm transition-colors flex items-center gap-1">
                                                {loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                                <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Related Concepts */}
                        <div className="md:col-span-2 mt-8">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" /> Related Concepts
                            </h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {CODEX
                                    .filter(t => t.category === term.category && t.slug !== term.slug)
                                    .slice(0, 3)
                                    .map((related, index) => (
                                        <Link key={related.slug} href={`/codex/${related.slug}`} className="group block rounded-xl bg-white/5 border border-white/5 hover:border-utility-red/30 transition-all overflow-hidden">
                                            {/* Mini Mesh Gradient */}
                                            <div className="h-8 relative" style={{
                                                background: `radial-gradient(ellipse at ${30 + index * 25}% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 60%), linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)`
                                            }} />
                                            <div className="p-4">
                                                <div className="text-utility-red text-xs mb-1 group-hover:text-white transition-colors">See also:</div>
                                                <div className="font-bold">{related.term}</div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{related.definition}</div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}
