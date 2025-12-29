import Link from 'next/link';
import Image from 'next/image';

const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'MKVLI Token', href: '/token' },
    { label: 'Initiatives', href: '/initiatives' },
    { label: 'Codex', href: '/codex' },
    { label: 'Locations', href: '/locations' },
    { label: 'Comparisons', href: '/comparisons' },
    { label: 'Contact Us', href: '/contact' },
];

const ecosystemLinks = [
    { label: 'The Utility Company', href: 'https://theutilitycompany.co' },
    { label: 'DigiBazaar', href: 'https://digibazaar.io' },
    { label: 'The Graine Ledger', href: 'https://thegraineledger.com' },
    { label: 'Osiris Protocol', href: 'https://osiris.theutilitycompany.co' },
];

const connectLinks = [
    { label: 'Whitepaper', href: '/whitepaper' },
    { label: 'Security Audit', href: '/audit' },
    { label: 'Discord', href: 'https://discord.gg/scHwVByn9m' },
];


export default function Footer() {
    return (
        <footer className="relative py-16 px-6 border-t border-white/10 bg-black/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 relative">
                                <Image
                                    src="/Medallions/RENSNCESTNDGLSS.png"
                                    alt="RENSNCEDAO Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-white font-bold">RENSNCEDAO</span>
                                <p className="text-xs text-gray-500">Decentralized Finance Renaissance</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            <span className="text-utility-red font-semibold">Nos Sumus Iudex.</span> A pragmatic instrument for navigating the complex digital financial landscape.
                        </p>
                        <a
                            href="mailto:info@rensnce.com"
                            className="text-utility-red text-sm hover:underline"
                        >
                            info@rensnce.com
                        </a>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-xs font-mono tracking-wider text-gray-500 mb-4">NAVIGATE</h4>
                        <ul className="space-y-2">
                            {navigationLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 text-sm hover:text-white transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h4 className="text-xs font-mono tracking-wider text-gray-500 mb-4">ECOSYSTEM</h4>
                        <ul className="space-y-2">
                            {ecosystemLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-400 text-sm hover:text-white transition-colors flex items-center gap-1"
                                    >
                                        {link.label}
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 0 00-2 2v10a2 0 002 2h10a2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <h4 className="text-xs font-mono tracking-wider text-gray-500 mt-6 mb-4">RESOURCES</h4>
                        <ul className="space-y-2">
                            {connectLinks.map((link) => (
                                <li key={link.label}>
                                    {link.href.startsWith('/') ? (
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 text-sm hover:text-utility-red transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 text-sm hover:text-utility-red transition-colors"
                                        >
                                            {link.label}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Protocol Info */}
                    <div>
                        <h4 className="text-xs font-mono tracking-wider text-gray-500 mb-4">PROTOCOL</h4>
                        <div className="space-y-4">
                            {[
                                { label: 'Network', value: 'Base (Coinbase L2)' },
                                { label: 'Standard', value: 'EIP-2535 Diamond' },
                                { label: 'Token', value: 'MKVLI' },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col">
                                    <span className="text-white text-sm font-semibold">{item.value}</span>
                                    <span className="text-gray-500 text-xs">{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <a
                            href="/audit"
                            className="inline-block mt-6 text-xs font-mono text-utility-red hover:underline"
                        >
                            VIEW SECURITY AUDIT →
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} RENSNCEDAO. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-gray-500 text-xs hover:text-white transition-colors">
                            Privacy Protocols
                        </Link>
                        <Link href="/terms" className="text-gray-500 text-xs hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
