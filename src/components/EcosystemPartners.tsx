import Link from 'next/link';
import Image from 'next/image';

const partners = [
    {
        name: 'Ledger1',
        description: 'Providing neuromimetic AI architecture to optimize non-profit operations and resource distribution.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/Ledger1.png',
        url: 'https://theutilitycompany.co/ledger1',
        color: '#DC2626',
    },
    {
        name: 'The Graine Ledger',
        description: 'Contributing distillery assets and NFT technology to support community treasury initiatives.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/TGL.png',
        url: 'https://theutilitycompany.co/the-graine-ledger',
        color: '#F97316',
    },
    {
        name: 'Arthaneeti',
        description: 'Offering civic engagement platforms to amplify community voices and democratic participation.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/AR.png',
        url: 'https://theutilitycompany.co/arthaneeti',
        color: '#3B82F6',
    },
    {
        name: 'Requiem Electric',
        description: 'Providing EV infrastructure and energy assets to power sustainable community transport.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/RE.png',
        url: 'https://theutilitycompany.co/requiem-electric',
        color: '#FFD700',
    },
    {
        name: 'Cornucopia Robotics',
        description: 'Sharing robotic farming technology to ensure food security and local production.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/CornucopiaRobotics.png',
        url: 'https://theutilitycompany.co/cornucopia-robotics',
        color: '#EC4899',
    },
    {
        name: 'Osiris Protocol',
        description: 'Securing foundation data and transparency through enterprise-grade blockchain solutions.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/OP.png',
        url: 'https://theutilitycompany.co/osiris-protocol',
        color: '#A855F7',
    },
    {
        name: 'Vulcan Forge',
        description: 'Democratizing manufacturing capacity for local hardware and infrastructure needs.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/VulcanForge2.png',
        url: 'https://theutilitycompany.co/vulcan-forge',
        color: '#F97316',
    },
    {
        name: 'Elysium Athletica',
        description: 'Promoting community health and wellness through gamified fitness assets.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/Elysium.png',
        url: 'https://theutilitycompany.co/elysium-athletica',
        color: '#f54029',
    },
    {
        name: 'The Loch Ness Botanical Society',
        description: 'Supporting environmental conservation through sustainable yield appropriation models.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/TLN.png',
        url: 'https://theutilitycompany.co/lochness-botanical-society',
        color: '#2ECC71',
    },
    {
        name: 'DigiBazaar',
        description: 'Enabling asset discovery and economic circulation within partner communities.',
        image: 'https://engram1.blob.core.windows.net/tuc-homepage/Medallions/DigiBazaarMedallion.png',
        url: 'https://theutilitycompany.co/digibazaar',
        color: '#EF4444',
    }
];

export default function EcosystemPartners() {
    return (
        <section id="contributors" className="relative z-10 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="section-heading">ECOSYSTEM PARTNERS</span>
                    <h2 className="section-title mt-4">Empowering the Mission</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        These participating partners from <span className="text-[#F54029]">The Utility Network</span> contribute
                        a portion of their assets, services, and technology to support the Foundation&apos;s initiatives.
                    </p>
                </div>

                {/* Partners Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {partners.map((partner, index) => (
                        <a
                            key={partner.name}
                            href={partner.url}
                            target={partner.url.startsWith('http') ? '_blank' : undefined}
                            rel={partner.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="group relative flex flex-col items-center text-center"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Medallion Image */}
                            <div className="relative w-40 h-40 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                                <div
                                    className="absolute inset-4 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                                    style={{ background: partner.color }}
                                />
                                <img
                                    src={partner.image}
                                    alt={partner.name}
                                    className="relative w-full h-full object-contain drop-shadow-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="relative z-10 w-full max-w-sm glass-panel p-6 rounded-2xl border-t border-white/10 group-hover:border-[color:var(--color)] transition-colors duration-300 min-h-[180px] flex flex-col"
                                style={{ '--color': partner.color } as React.CSSProperties}>
                                <h3
                                    className="text-lg font-bold mb-3 transition-colors duration-300"
                                    style={{ color: partner.color }}
                                >
                                    {partner.name}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                                    {partner.description}
                                </p>

                                <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-wider text-gray-500 group-hover:text-white transition-colors mt-auto">
                                    <span>PARTNER PROFILE</span>
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
