'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
    { label: 'INITIATIVES', href: '/initiatives' },
    { label: 'LOCATIONS', href: '/locations' },
    { label: 'COMPARISONS', href: '/comparisons' },
    { label: 'TOKENOMICS', href: '/token' },
    { label: 'CODEX', href: '/codex' },
];

export default function RensnceNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const themeColor = '#E5E4E2'; // Platinum

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                    ? 'bg-black/60 backdrop-blur-2xl border-b shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3'
                    : 'py-5 bg-transparent'
                    }`}
                style={scrolled ? { borderBottomColor: `rgba(229, 228, 226, 0.2)`, boxShadow: `0 4px 30px rgba(229, 228, 226, 0.1)` } : { borderBottomColor: 'transparent' }}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col group">
                        <span className="hidden md:block text-xs font-mono tracking-widest opacity-80 transition-colors" style={{ color: themeColor }}>
                            DAO.ONLINE
                        </span>
                        <span className="text-lg font-bold text-white tracking-widest font-serif group-hover:opacity-80 transition-opacity">
                            RENSNCEDAO
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="px-4 py-2 text-xs font-mono tracking-wider text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/whitepaper"
                            className="hidden md:block px-4 py-2 text-xs font-mono tracking-wider text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                            WHITEPAPER
                        </Link>
                        <Link
                            href="/audit"
                            className="hidden md:block px-4 py-2 text-xs font-mono tracking-wider text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                        >
                            AUDIT
                        </Link>
                        <div className="hidden md:block px-3 py-1 border border-utility-red/30 rounded text-xs font-mono text-utility-red">
                            $1.11 FLOOR
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-white transition-colors"
                            style={{ color: mobileMenuOpen ? themeColor : 'white' }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-black/90 backdrop-blur-xl mt-2 mx-4 rounded-xl p-4 border border-utility-red/20">
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-3 text-sm font-mono tracking-wider text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="border-t border-white/10 my-2" />
                            <Link
                                href="/whitepaper"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-sm font-mono tracking-wider text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                WHITEPAPER
                            </Link>
                            <Link
                                href="/audit"
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-4 py-3 text-sm font-mono tracking-wider text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                            >
                                AUDIT
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}
