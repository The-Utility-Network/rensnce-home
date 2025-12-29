'use client';

import React from 'react';
import Link from 'next/link';

const categories = [
    {
        name: 'Animal & Plant Conservation',
        color: '#10B981',
        slug: 'animal-conservation',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        role: 'Environmental Stewardship',
        partners: 'Wildlife Sanctuaries, Conservation NGOs',
    },
    {
        name: 'Children\'s Health',
        color: '#F472B6',
        slug: 'childrens-health',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        role: 'Pediatric Healthcare Support',
        partners: 'Children\'s Hospitals, Healthcare Networks',
    },
    {
        name: 'Environmental Awareness',
        color: '#34D399',
        slug: 'environmental-awareness',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        role: 'Global Climate Education',
        partners: 'Climate Research Orgs, Education Centers',
    },
    {
        name: 'Financial Literacy',
        color: '#FBBF24',
        slug: 'financial-literacy',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM17 13v-3l-2-2h-3l-2 2v3" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        role: 'Economic Empowerment',
        partners: 'Education Foundations, Micro-finance Orgs',
    },
    {
        name: 'Gender Equality',
        color: '#A855F7',
        slug: 'gender-equality',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        role: 'Advancing Equality & Access',
        partners: 'Advocacy Groups, Economic Forums',
    },
    {
        name: 'Independent Artists & Creators',
        color: '#F97316',
        slug: 'artists-creators',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
        ),
        role: 'Creative Freedom & Royalties',
        partners: 'Arts Councils, Creative Collectives',
    },
    {
        name: 'Indigenous Rights & Access',
        color: '#EA580C',
        slug: 'indigenous-rights',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
        ),
        role: 'Preserving Cultural Heritage',
        partners: 'Tribal Councils, Heritage Foundations',
    },
    {
        name: 'Justice & Peace',
        color: '#3B82F6',
        slug: 'justice-peace',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
        ),
        role: 'Structural Integrity & Reform',
        partners: 'Legal Aid Groups, Human Rights NGOs',
    },
    {
        name: 'Medical Access',
        color: '#EF4444',
        slug: 'medical-access',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-1.577 1.48l-1.012.188a2 2 0 01-1.55-.42l-1.455-1.133a2 2 0 00-1.928-.306l-2.023.63a2 2 0 01-1.285-.027l-1.127-.473a2 2 0 01-1.134-2.158l.186-1.012a2 2 0 00-.712-1.914l-1.455-1.133a2 2 0 01-.42-1.55l.188-1.012a2 2 0 01.420-1.55l1.133-1.455a2 2 0 00.306-1.928l-.63-2.023a2 2 0 01.027-1.285l.473-1.127a2 2 0 012.158-1.134l1.012.186a2 2 0 001.914-.712l1.133-1.455a2 2 0 011.55-.42l1.012.188a2 2 0 011.55.42l1.455 1.133a2 2 0 001.928.306l2.023-.63a2 2 0 011.285.027l1.127.473a2 2 0 011.134 2.158l-.186 1.012a2 2 0 00.712 1.914l1.455-1.133a2 2 0 01.42 1.55l-.188-1.012a2 2 0 01-.42 1.55l-1.133 1.455a2 2 0 00-.306 1.928l.63 2.023a2 2 0 01-.027 1.285l-.473-1.127a2 2 0 01-2.158-1.134l-1.012-.186a2 2 0 00-1.914.712l-1.133 1.455a2 2 0 01-1.55.42z" />
            </svg>
        ),
        role: 'Healthcare Equity & Supply',
        partners: 'Medical Centers, Pharma Supply Chains',
    },
    {
        name: 'Mental Health & Wellness',
        color: '#14B8A6',
        slug: 'mental-health',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l.707.707M6.586 17a1 1 0 102.828 0 1 1 0 00-2.828 0z" />
            </svg>
        ),
        role: 'Accessibility for Counseling',
        partners: 'Wellness Groups, Support Organizations',
    },
    {
        name: 'Minority Rights & Access',
        color: '#6366F1',
        slug: 'minority-rights',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
        ),
        role: 'Promoting Economic Inclusion',
        partners: 'Community Leaders, Inclusive Networks',
    },
    {
        name: 'Nature & Habitat',
        color: '#84CC16',
        slug: 'nature-habitat',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        role: 'Habitat Preservation',
        partners: 'Land Trusts, Ecology Researchers',
    },
    {
        name: 'Research Initiatives',
        color: '#0EA5E9',
        slug: 'research-initiatives',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.727 2.903a2 2 0 01-1.577 1.48l-1.012.188a2 2 0 01-1.55-.42l-1.455-1.133a2 2 0 00-1.928-.306l-2.023.63a2 2 0 01-1.285-.027l-1.127-.473a2 2 0 01-1.134-2.158l.186-1.012a2 2 0 00-.712-1.914l-1.455-1.133a2 2 0 01-.42-1.55l.188-1.012a2 2 0 01.420-1.55l1.133-1.455a2 2 0 00.306-1.928l-.63-2.023a2 2 0 01.027-1.285l.473-1.127a2 2 0 012.158-1.134l1.012.186a2 2 0 001.914-.712l1.133-1.455a2 2 0 011.55-.42l1.012.188a2 2 0 011.55.42l1.455 1.133a2 2 0 001.928.306l2.023-.63a2 2 0 011.285.027l1.127.473a2 2 0 011.134 2.158l-.186 1.012a2 2 0 00.712 1.914l1.455-1.133a2 2 0 01.42 1.55l-.188-1.012a2 2 0 01.42 1.55l-1.133 1.455a2 2 0 00-.306 1.928l.63 2.023a2 2 0 01-.027 1.285l-.473-1.127a2 2 0 01-2.158-1.134l-1.012-.186a2 2 0 00-1.914.712l-1.133 1.455a2 2 0 01-1.55.42z" />
            </svg>
        ),
        role: 'Data-Driven Breakthroughs',
        partners: 'Universities, Tech Laboratories',
    },
    {
        name: 'Spirituality & Self-Discovery',
        color: '#D8B4FE',
        slug: 'spirituality',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
        ),
        role: 'Cultivating Growth & Connection',
        partners: 'Mindfulness Centers, Global Communes',
    },
    {
        name: 'Veterans Community',
        color: '#1E40AF',
        slug: 'veterans-community',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        role: 'Support & Transition Systems',
        partners: 'Veterans Affairs, Transition NGOs',
    },
];

export default function ImpactCategories() {
    return (
        <section id="impact" className="relative z-10 py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="section-heading">GLOBAL INITIATIVES</span>
                    <h2 className="section-title mt-4">15 Key Impact Categories</h2>
                    <p className="text-gray-400 mt-4 max-w-3xl mx-auto">
                        Explore our structural engagement model across 15 critical sectors.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href="/initiatives"
                            className="group glass-panel p-6 rounded-2xl border-l-4 hover:bg-white/5 transition-all group hover:scale-[1.02] active:scale-[0.98]"
                            style={{ borderLeftColor: category.color }}
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div
                                    className="p-3 rounded-full bg-white/5 text-white group-hover:scale-110 transition-transform"
                                    style={{ color: category.color }}
                                >
                                    {category.icon}
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg leading-tight mb-1">
                                        {category.name}
                                    </h3>
                                    <span
                                        className="text-xs font-mono tracking-wider opacity-60 uppercase"
                                        style={{ color: category.color }}
                                    >
                                        Active Initiative
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Our Role</p>
                                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                                        {category.role}
                                    </p>
                                </div>
                                <div className="pt-4 flex items-center justify-between text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span style={{ color: category.color }}>SYSTEM_TRANSFORMATION</span>
                                    <span className="text-white">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <p className="text-gray-400 mb-6">
                        Do you represent an organization in one of these fields?
                    </p>
                    <a
                        href="/contact"
                        className="btn-primary"
                    >
                        CONTACT US
                    </a>
                </div>
            </div>
        </section>
    );
}
