'use client';

import { notFound } from 'next/navigation';
import { INITIATIVES } from '@/data/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import IndustryProcessFlow from '@/components/IndustryProcessFlow';
import { getMedallionUrl } from '@/utils/medallions';
import StructuredData from '@/components/StructuredData';
import { use } from 'react';
import {
    DoorOpen,
    KeyRound,
    ScrollText,
    Bot,
    Cog,
    Link as LinkIcon,
    TrendingUp,
    ArrowLeft,
    CheckCircle,
    BarChart3
} from 'lucide-react';

interface Props {
    params: Promise<{ slug: string }>;
}

export default function InitiativePage({ params }: Props) {
    const { slug } = use(params);
    const initiative = INITIATIVES.find((ind) => ind.slug === slug);

    if (!initiative) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: `Strategic Initiative: ${initiative.title}`,
        description: initiative.description,
        author: {
            '@type': 'Organization',
            name: 'RENSNCE DAO',
            url: 'https://dao.rensnce.com'
        },
        publisher: {
            '@type': 'Organization',
            name: 'RENSNCE DAO',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dao.rensnce.com/logo.png'
            }
        },
        datePublished: '2025-01-01',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://dao.rensnce.com/initiatives/${initiative.slug}`
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <StructuredData data={jsonLd} />
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <Link href="/initiatives" className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Initiatives
                    </Link>
                </div>

                {/* Hero Section with Mesh Gradient */}
                <div className="mb-16 relative">
                    {/* Grayscale Mesh Background */}
                    <div className="absolute -inset-6 rounded-3xl opacity-50" style={{
                        background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(150, 150, 150, 0.08) 0%, transparent 40%), radial-gradient(ellipse at 50% 50%, rgba(80, 80, 80, 0.12) 0%, transparent 60%)'
                    }} />
                    <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <span className="section-heading text-utility-red">STRATEGIC INITIATIVE</span>
                            <h1 className="text-4xl md:text-7xl font-bold mt-4 mb-8 leading-tight">
                                {initiative.title}
                            </h1>
                            <p className="text-2xl text-gray-300 leading-relaxed font-light">
                                {initiative.description}
                            </p>
                        </div>

                        {/* Vintage Cover Image */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                            <img
                                src={`/initiatives/${initiative.slug}.png`}
                                alt={`${initiative.title} vintage illustration`}
                                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-[filter] duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* The Three Pillars: Access, Agency, Accountability */}
                <section className="mb-24">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                        <span className="w-8 h-px bg-gradient-to-r from-utility-red to-transparent"></span>
                        The Three Pillars
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Access */}
                        <div className="glass-panel p-8 rounded-3xl border border-blue-500/20 relative overflow-hidden">
                            {/* Mesh Gradient */}
                            <div className="absolute inset-0" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(59, 130, 246, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)'
                            }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                        <DoorOpen className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-400">Access</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    {initiative.pillarAccess}
                                </p>
                            </div>
                        </div>

                        {/* Agency */}
                        <div className="glass-panel p-8 rounded-3xl border border-green-500/20 relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(34, 197, 94, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, transparent 100%)'
                            }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                                        <KeyRound className="w-6 h-6 text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-400">Agency</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    {initiative.pillarAgency}
                                </p>
                            </div>
                        </div>

                        {/* Accountability */}
                        <div className="glass-panel p-8 rounded-3xl border border-purple-500/20 relative overflow-hidden">
                            <div className="absolute inset-0" style={{
                                background: 'radial-gradient(ellipse at 0% 0%, rgba(168, 85, 247, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 100% 100%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), linear-gradient(135deg, rgba(168, 85, 247, 0.05) 0%, transparent 100%)'
                            }} />
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <ScrollText className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-purple-400">Accountability</h3>
                                </div>
                                <p className="text-gray-300 leading-relaxed">
                                    {initiative.pillarAccountability}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Technology Stack: AI, Automation, Blockchain */}
                <section className="mb-24">
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-8 flex items-center gap-2">
                        <span className="w-8 h-px bg-gradient-to-r from-utility-red to-transparent"></span>
                        The Technology Stack
                    </h2>
                    <div className="space-y-6">
                        {/* AI */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors relative overflow-hidden">
                            {/* Grayscale Mesh */}
                            <div className="absolute inset-0 opacity-40" style={{
                                background: 'radial-gradient(ellipse at 0% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 100% 50%, rgba(100, 100, 100, 0.08) 0%, transparent 40%)'
                            }} />
                            <div className="flex items-start gap-6 relative z-10">
                                <div className="w-16 h-16 flex items-center justify-center bg-blue-500/20 rounded-2xl flex-shrink-0">
                                    <Bot className="w-8 h-8 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-blue-400 mb-2">Artificial Intelligence</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {initiative.aiNarrative}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Automation */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40" style={{
                                background: 'radial-gradient(ellipse at 0% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 100% 50%, rgba(100, 100, 100, 0.08) 0%, transparent 40%)'
                            }} />
                            <div className="flex items-start gap-6 relative z-10">
                                <div className="w-16 h-16 flex items-center justify-center bg-green-500/20 rounded-2xl flex-shrink-0">
                                    <Cog className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-green-400 mb-2">Automation</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {initiative.automationNarrative}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Blockchain */}
                        <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors relative overflow-hidden">
                            <div className="absolute inset-0 opacity-40" style={{
                                background: 'radial-gradient(ellipse at 0% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 40%), radial-gradient(ellipse at 100% 50%, rgba(100, 100, 100, 0.08) 0%, transparent 40%)'
                            }} />
                            <div className="flex items-start gap-6 relative z-10">
                                <div className="w-16 h-16 flex items-center justify-center bg-purple-500/20 rounded-2xl flex-shrink-0">
                                    <LinkIcon className="w-8 h-8 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-purple-400 mb-2">Blockchain</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {initiative.blockchainNarrative}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Dynamic Process Flow */}
                {initiative.processStages && (
                    <section className="mb-24">
                        <IndustryProcessFlow stages={initiative.processStages} />
                    </section>
                )}

                {/* Impact Metrics & DAO Facets */}
                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    {/* Impact Metrics */}
                    {initiative.impactMetrics && (
                        <div className="lg:col-span-2 glass-panel p-10 rounded-3xl border border-utility-red/20 relative overflow-hidden">
                            {/* Mesh Gradient */}
                            <div className="absolute inset-0 opacity-30" style={{
                                background: 'radial-gradient(ellipse at 20% 30%, rgba(245, 64, 41, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 40%)'
                            }} />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6 text-utility-red flex items-center gap-2">
                                    <BarChart3 className="w-6 h-6" />
                                    Impact Metrics
                                </h3>
                                <p className="text-gray-400 mb-6">How we measure success for this initiative:</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {initiative.impactMetrics.map((metric, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 bg-black/30 rounded-xl border border-white/5">
                                            <div className="w-8 h-8 flex items-center justify-center bg-utility-red/20 rounded-full flex-shrink-0">
                                                <CheckCircle className="w-4 h-4 text-utility-red" />
                                            </div>
                                            <span className="text-gray-300">{metric}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* DAO Facets Sidebar */}
                    <div className="lg:col-span-1 glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden">
                        {/* Grayscale Mesh */}
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
                        }} />
                        <div className="relative z-10">
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-6">Operated By DAO Facets</h3>
                            <div className="space-y-4">
                                {initiative.subsidiaries.map((sub, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-4 rounded-xl transition-all border border-transparent hover:border-white/10">
                                        <div className="w-12 h-12 relative flex-shrink-0">
                                            <img
                                                src={getMedallionUrl(sub)}
                                                alt={sub}
                                                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                        </div>
                                        <span className="font-semibold text-gray-400 group-hover:text-white transition-colors">{sub}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center p-12 rounded-3xl border border-utility-red/20 relative overflow-hidden">
                    {/* Mesh Gradient */}
                    <div className="absolute inset-0" style={{
                        background: 'radial-gradient(ellipse at 0% 50%, rgba(245, 64, 41, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 50%, rgba(245, 64, 41, 0.1) 0%, transparent 50%)'
                    }} />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Join the Renaissance?</h2>
                        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                            The {initiative.title} initiative is actively building infrastructure for a more equitable world.
                        </p>
                        <Link href="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors inline-block">
                            Initiate Connection
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
