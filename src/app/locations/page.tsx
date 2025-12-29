'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import WorldMap from '@/components/WorldMap';
import { LOCATIONS } from '@/data/seo';
import { MapPin, Globe, ChevronRight, Building2 } from 'lucide-react';

export default function LocationsPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white">
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="section-heading flex items-center justify-center gap-2">
                        <Globe className="w-4 h-4" /> GLOBAL NETWORK
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold mt-4 mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 pb-2">
                        Citadels of <br /> The New Renaissance
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From the spiritual home in Florence to the financial engine of New York,
                        RENSNCE establishes its citadels in the most strategic nodes of the global economy.
                    </p>
                </div>

                {/* Map Section */}
                <div className="mb-24">
                    <WorldMap />
                </div>

                {/* Grid of Locations */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {LOCATIONS.map((loc, index) => (
                        <Link
                            key={loc.slug}
                            href={`/locations/${loc.slug}`}
                            className="group glass-panel rounded-2xl hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 block border border-white/5 hover:border-utility-red/30 overflow-hidden"
                        >
                            {/* Vintage Cover Image */}
                            <div className="h-32 relative overflow-hidden">
                                <img
                                    src={`/locations/${loc.slug}.png`}
                                    alt={`${loc.city} vintage illustration`}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
                                {/* Location Code Badge */}
                                <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-sm border border-white/10 rounded text-xs font-mono text-gray-400">
                                    {loc.code}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-utility-red" />
                                        <h2 className="text-2xl font-bold group-hover:text-utility-red transition-colors">{loc.city}</h2>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded">
                                        {loc.country}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {loc.description}
                                </p>

                                {/* Key Focus Badge */}
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
                                        <Building2 className="w-3 h-3" /> {loc.keyFocus}
                                    </span>
                                </div>

                                <div className="flex items-center text-utility-red text-sm font-semibold">
                                    Explore Citadel <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
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
