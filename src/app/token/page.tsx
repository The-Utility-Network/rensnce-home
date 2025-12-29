'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import Link from 'next/link';
import {
    Coins,
    History,
    TrendingUp,
    Shield,
    Layers,
    ArrowRightLeft,
    Sparkles,
    Lock,
    Unlock,
    ChevronRight,
    Fingerprint,
    Package,
    Users,
    CircleDollarSign,
    BarChart3
} from 'lucide-react';

export default function MKVLIPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white font-sans">
            <Navbar themeColor="#E5E4E2" />

            {/* Hero Section */}
            <div className="relative pt-32 pb-24 px-6 overflow-hidden">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 opacity-40" style={{
                    background: 'radial-gradient(ellipse at 30% 20%, rgba(245, 64, 41, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 40%)'
                }} />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="section-heading flex items-center justify-center gap-2">
                            <Coins className="w-4 h-4" /> THE DUAL-VALUE TOKEN
                        </span>
                        <h1 className="text-4xl md:text-8xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight">
                            MKVLI
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-light">
                            Every token tells a story. MKVLI accrues unique history through VRDI participation,
                            creating both <span className="text-utility-red font-semibold">speculative value</span> and
                            <span className="text-green-400 font-semibold"> guaranteed liquidity</span>.
                        </p>
                        <div className="mt-8">
                            <a
                                href="https://portal.rensnce.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm tracking-wider rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                ACCESS PORTAL
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Dual Value Visualization */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
                        {/* Speculative Value Card */}
                        <div className="glass-panel rounded-3xl border border-utility-red/30 relative overflow-hidden group">
                            <div className="h-32 relative" style={{
                                background: 'radial-gradient(ellipse at 30% 30%, rgba(245, 64, 41, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(245, 64, 41, 0.15) 0%, transparent 40%), linear-gradient(135deg, rgba(60, 20, 20, 0.9) 0%, rgba(30, 10, 10, 0.95) 100%)'
                            }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <TrendingUp className="w-16 h-16 text-utility-red/50" />
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-utility-red">Speculative Value</h3>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Each MKVLI token carries a unique <strong>Provenance Chain</strong>—a cryptographic record of every VRDI it participated in.
                                    Tokens that funded life-saving medicine deliveries, verified ethical supply chains, or backed successful community projects
                                    become <em>collectible artifacts of impact</em>.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Sparkles className="w-4 h-4 text-utility-red mt-1 flex-shrink-0" />
                                        <span>NFT-like uniqueness with fungible liquidity</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <History className="w-4 h-4 text-utility-red mt-1 flex-shrink-0" />
                                        <span>Immutable history increases collector value</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Users className="w-4 h-4 text-utility-red mt-1 flex-shrink-0" />
                                        <span>Secondary market for "storied" tokens</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Reserve Value Card */}
                        <div className="glass-panel rounded-3xl border border-green-500/30 relative overflow-hidden group">
                            <div className="h-32 relative" style={{
                                background: 'radial-gradient(ellipse at 30% 30%, rgba(34, 197, 94, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 40%), linear-gradient(135deg, rgba(20, 60, 20, 0.9) 0%, rgba(10, 30, 10, 0.95) 100%)'
                            }}>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Shield className="w-16 h-16 text-green-500/50" />
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold mb-4 text-green-400">Reserve Value (Floor)</h3>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    Regardless of provenance, every MKVLI token can be redeemed against the Reserve at the <strong>guaranteed floor price of $1.11</strong>.
                                    This is the "atomic safety net"—the mathematical certainty that your token always has intrinsic value,
                                    backed by real assets in the Reserve.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Lock className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span>$1.11 floor backed by treasury assets</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <ArrowRightLeft className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span>Instant redemption, no slippage</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-gray-400">
                                        <Shield className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                                        <span>Proof of Reserve attestations on-chain</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="px-6 pb-24 max-w-7xl mx-auto">
                {/* Redemption Formula */}
                <section className="mb-32">
                    <div className="glass-panel rounded-3xl border border-white/5 relative overflow-hidden">
                        {/* Dark mesh gradient background */}
                        <div className="absolute inset-0" style={{
                            background: 'radial-gradient(ellipse at 30% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 70%, rgba(255, 255, 255, 0.03) 0%, transparent 40%), linear-gradient(180deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)'
                        }} />

                        <div className="relative z-10 text-center py-16 px-8">
                            <h3 className="text-xs font-mono tracking-[0.3em] text-gray-500 mb-6">REDEMPTION FORMULA</h3>
                            <p className="text-gray-400 max-w-xl mx-auto mb-12">
                                The immutable law governing value. A self-balancing equation binding price to reserves.
                                Unlike fiat, MKVLI is not decreed—it is <em className="text-white">derived</em>.
                            </p>

                            {/* Formula Display */}
                            <div className="flex items-center justify-center gap-8 mb-12">
                                <div className="text-center">
                                    <div className="text-6xl md:text-8xl font-serif text-gray-400">Ψ</div>
                                    <div className="text-xs font-mono text-gray-600 mt-2 tracking-widest">PRICE</div>
                                </div>
                                <div className="text-4xl md:text-6xl text-gray-600">=</div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-8xl font-serif text-gray-400">Ω</div>
                                    <div className="text-xs font-mono text-gray-600 mt-2 tracking-widest">RESERVE</div>
                                </div>
                                <div className="text-4xl md:text-6xl text-gray-600">/</div>
                                <div className="text-center">
                                    <div className="text-6xl md:text-8xl font-serif text-gray-400">Σ</div>
                                    <div className="text-xs font-mono text-gray-600 mt-2 tracking-widest">SUPPLY</div>
                                </div>
                            </div>

                            {/* Mastery of Value */}
                            <div className="border-t border-white/10 pt-8">
                                <h4 className="text-xs font-mono tracking-[0.3em] text-gray-600 mb-4">MASTERY OF VALUE</h4>
                                <p className="text-gray-500 max-w-2xl mx-auto text-sm italic leading-relaxed">
                                    "By binding token supply directly to reserves via this immutable equation, RENSNCE creates
                                    intrinsic liquidity. The price reflects the health of the underlying loan portfolio—
                                    <span className="text-white">transparency, not promises</span>."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Price Dynamics */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Phase-Based Lending',
                                desc: 'DIOs release funds in phases tied to milestones. If a borrower underperforms, remaining phases are frozen. This limits exposure and prevents catastrophic defaults.',
                                icon: Lock,
                                color: 'blue'
                            },
                            {
                                title: 'Community Freeze',
                                desc: 'If a DIO shows signs of distress, the community can vote to freeze further disbursements. This protects the Reserve and preserves the redemption price for all holders.',
                                icon: Shield,
                                color: 'green'
                            },
                            {
                                title: 'Price Reflects Health',
                                desc: 'Ψ can dip if loans underperform, but complete defaults are rare. As DIO interest flows into the Reserve, Ω grows and Ψ appreciates over time.',
                                icon: TrendingUp,
                                color: 'utility-red'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel rounded-2xl border border-white/5 p-6 hover:border-green-500/30 transition-all group">
                                <div className={`w-12 h-12 rounded-full bg-${item.color === 'utility-red' ? 'utility-red' : item.color + '-500'}/20 flex items-center justify-center mb-4`}>
                                    <item.icon className={`w-6 h-6 text-${item.color === 'utility-red' ? 'utility-red' : item.color + '-400'}`} />
                                </div>
                                <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How History Accrues */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-utility-red" />
                        How Token History Accrues
                    </h2>

                    <div className="grid lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: CircleDollarSign,
                                step: '01',
                                title: 'Token Minted',
                                desc: 'A new MKVLI token is minted with a clean slate—a "Genesis" token with no history.',
                                color: 'gray'
                            },
                            {
                                icon: Package,
                                step: '02',
                                title: 'VRDI Participation',
                                desc: 'The token is used to fund a VRDI (e.g., a vaccine delivery in Lagos). This event is recorded on-chain.',
                                color: 'blue'
                            },
                            {
                                icon: Fingerprint,
                                step: '03',
                                title: 'Provenance Recorded',
                                desc: 'The VRDI hash, recipient confirmation, and impact metrics are appended to the token\'s provenance chain.',
                                color: 'purple'
                            },
                            {
                                icon: Sparkles,
                                step: '04',
                                title: 'Value Accrued',
                                desc: 'Each participation adds to the token\'s "story." Collectors may pay premiums for tokens with rich histories.',
                                color: 'utility-red'
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative group">
                                {/* Connecting Line */}
                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-white/20 to-transparent z-0" />
                                )}

                                <div className="glass-panel rounded-2xl border border-white/5 hover:border-utility-red/30 transition-all overflow-hidden relative z-10">
                                    {/* Mini Mesh Gradient */}
                                    <div className="h-20 relative" style={{
                                        background: `radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 60%), linear-gradient(135deg, rgba(40, 40, 40, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)`
                                    }}>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <item.icon className="w-10 h-10 text-gray-500 group-hover:text-utility-red transition-colors" />
                                        </div>
                                        <div className="absolute top-2 right-4 text-xs font-mono text-gray-600">{item.step}</div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Token Anatomy */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-blue-500" />
                        Anatomy of a MKVLI Token
                    </h2>

                    <div className="glass-panel rounded-3xl border border-white/5 p-12 relative overflow-hidden">
                        {/* Mesh Gradient Background */}
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(150, 150, 150, 0.08) 0%, transparent 40%)'
                        }} />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16">
                            {/* Token Visual */}
                            <div className="flex items-center justify-center">
                                <div className="relative">
                                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-utility-red/20 via-transparent to-green-500/20 border border-white/10 flex items-center justify-center">
                                        <div className="w-48 h-48 rounded-full bg-black/80 border border-white/20 flex flex-col items-center justify-center">
                                            <Coins className="w-12 h-12 text-utility-red mb-2" />
                                            <span className="text-2xl font-bold">MKVLI</span>
                                            <span className="text-xs text-gray-500 font-mono">Token #4,892,301</span>
                                        </div>
                                    </div>
                                    {/* Orbiting badges */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-utility-red/20 border border-utility-red/50 rounded-full text-xs text-utility-red">
                                        3 VRDIs
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-xs text-green-400">
                                        $1.11 Floor
                                    </div>
                                    <div className="absolute top-1/2 -left-6 -translate-y-1/2 px-3 py-1 bg-blue-500/20 border border-blue-500/50 rounded-full text-xs text-blue-400">
                                        Lagos
                                    </div>
                                    <div className="absolute top-1/2 -right-6 -translate-y-1/2 px-3 py-1 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs text-purple-400">
                                        Singapore
                                    </div>
                                </div>
                            </div>

                            {/* Token Properties */}
                            <div className="space-y-6">
                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <h4 className="text-sm font-mono text-gray-500 mb-2">CORE PROPERTIES</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-xs text-gray-500">Token ID</span>
                                            <div className="font-mono text-sm">0x7f3a...4e21</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Mint Date</span>
                                            <div className="font-mono text-sm">2024-06-15</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Floor Value</span>
                                            <div className="font-mono text-sm text-green-400">$1.11 USDC</div>
                                        </div>
                                        <div>
                                            <span className="text-xs text-gray-500">Market Value</span>
                                            <div className="font-mono text-sm text-utility-red">$3.47 (3.1x)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                                    <h4 className="text-sm font-mono text-gray-500 mb-4">PROVENANCE CHAIN</h4>
                                    <div className="space-y-3">
                                        {[
                                            { vrdi: 'Vaccine Delivery', location: 'Lagos, Nigeria', date: '2024-08-12', impact: '120 doses' },
                                            { vrdi: 'Solar Panel Install', location: 'São Paulo, Brazil', date: '2024-09-03', impact: '2.4kW' },
                                            { vrdi: 'Grain Shipment', location: 'Singapore', date: '2024-11-22', impact: '500kg' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 bg-black/50 rounded-lg border border-white/5">
                                                <div className="w-8 h-8 rounded-full bg-utility-red/20 border border-utility-red/50 flex items-center justify-center text-xs font-mono">
                                                    #{i + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="font-semibold text-sm">{item.vrdi}</div>
                                                    <div className="text-xs text-gray-500">{item.location} • {item.date}</div>
                                                </div>
                                                <div className="text-xs text-gray-400 font-mono">{item.impact}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Market Dynamics */}
                <section className="mb-32">
                    <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
                        <span className="w-12 h-1 bg-purple-500" />
                        Market Dynamics
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Layers,
                                title: 'Tiered Markets',
                                desc: '"Genesis" tokens (no history) trade closest to the $1.11 floor. "Storied" tokens with impactful VRDIs command premiums. The most collectible tokens may trade at 10x+ floor.',
                                color: 'from-gray-500/20 to-gray-500/5'
                            },
                            {
                                icon: ArrowRightLeft,
                                title: 'Arbitrage Opportunity',
                                desc: 'If a storied token trades below floor, arbitrageurs can buy it, redeem against the Reserve for $1.11, and pocket the difference. This creates a hard floor.',
                                color: 'from-green-500/20 to-green-500/5'
                            },
                            {
                                icon: BarChart3,
                                title: 'Price Discovery',
                                desc: 'Speculative value is determined by supply/demand for specific provenance histories. Verified impact metrics create objective valuation signals.',
                                color: 'from-utility-red/20 to-utility-red/5'
                            }
                        ].map((item, i) => (
                            <div key={i} className="glass-panel rounded-2xl border border-white/5 hover:border-utility-red/30 transition-all overflow-hidden group">
                                <div className={`h-24 relative bg-gradient-to-br ${item.color}`}>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <item.icon className="w-12 h-12 text-gray-500 group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-xl mb-3">{item.title}</h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center">
                    <div className="glass-panel rounded-3xl p-12 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-30" style={{
                            background: 'radial-gradient(ellipse at 50% 0%, rgba(245, 64, 41, 0.2) 0%, transparent 50%)'
                        }} />
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Token's Story?</h3>
                            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                                Every MKVLI you hold or trade carries the potential for a unique history.
                                Participate in VRDIs to add provenance and value.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/initiatives" className="inline-flex items-center gap-2 px-8 py-4 bg-utility-red text-white font-bold rounded-full hover:bg-utility-red/80 transition-colors">
                                    Explore Initiatives <ChevronRight className="w-5 h-5" />
                                </Link>
                                <Link href="/codex/mkvli" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-colors border border-white/20">
                                    Read the Codex <ChevronRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
