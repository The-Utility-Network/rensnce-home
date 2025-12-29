'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import GeometricAuditArt from './GeometricAuditArt';
import { auditChapters as chapters, ChapterData, ChapterSection } from './audit-chapters';
import Link from 'next/link';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

// Table of Contents Component
function TableOfContents({
    chapters: chapterList,
    activeChapter,
    onChapterClick
}: {
    chapters: ChapterData[],
    activeChapter: string,
    onChapterClick: (id: string) => void
}) {
    return (
        <nav className="space-y-1">
            <div className="text-xs font-rajdhani tracking-widest uppercase mb-4 text-white/40 font-bold">
                Table of Contents
            </div>
            {chapterList.map((chapter) => (
                <button
                    key={chapter.id}
                    onClick={() => onChapterClick(chapter.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all duration-300 group ${activeChapter === chapter.id
                        ? 'bg-white/10 border-l-2'
                        : 'hover:bg-white/5'
                        }`}
                    style={{
                        borderColor: activeChapter === chapter.id ? chapter.color : 'transparent'
                    }}
                >
                    <div className="flex items-center gap-3">
                        <span
                            className={`text-[10px] font-mono ${activeChapter === chapter.id ? 'opacity-100' : 'opacity-40'}`}
                            style={{ color: chapter.color }}
                        >
                            {chapter.number}
                        </span>
                        <span className={`text-xs font-medium font-rajdhani uppercase tracking-wider transition-colors ${activeChapter === chapter.id ? 'text-white' : 'text-gray-400 group-hover:text-white'
                            }`}>
                            {chapter.title}
                        </span>
                    </div>
                </button>
            ))}
        </nav>
    );
}

// Section Component
function Section({ section, color }: { section: ChapterSection, color: string }) {
    // Process markdown-like formatting
    const content = section.content;
    const parts = content.split(/(\`\`\`solidity[\s\S]*?\`\`\`)/g);

    const renderMarkdown = (text: string) => {
        // Split by newlines to handle blocks like lists
        const lines = text.split('\n');
        return lines.map((line, lineIndex) => {
            // Handle Lists
            if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
                const content = line.trim().substring(2);
                return (
                    <div key={lineIndex} className="flex items-start gap-2 mb-2 ml-4">
                        <span className="text-emerald-400 mt-1.5 text-xs">●</span>
                        <span className="text-gray-300">{parseInline(content)}</span>
                    </div>
                );
            }

            // Handle Headers
            if (line.trim().startsWith('### ')) {
                return <h4 key={lineIndex} className="text-lg font-bold text-white mt-6 mb-3">{line.trim().substring(4)}</h4>;
            }

            // Empty lines
            if (!line.trim()) return <div key={lineIndex} className="h-4" />;

            // Standard Paragraph
            return <p key={lineIndex} className="mb-2 leading-relaxed text-gray-300">{parseInline(line)}</p>;
        });
    };

    const parseInline = (text: string) => {
        // Simple parser for **bold** and `code`
        const parts = text.split(/(\*\*[^*]+\*\*|\`[^`]+\`)/g);
        return parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={i} className="bg-white/10 px-1 py-0.5 rounded text-emerald-300 font-mono text-sm">{part.slice(1, -1)}</code>;
            }
            return part;
        });
    };

    return (
        <motion.div variants={fadeInUp} className="mb-12">
            <h3 className="text-xl md:text-2xl font-bold mb-4 font-rajdhani uppercase tracking-wide" style={{ color }}>
                {section.heading}
            </h3>
            <div className="prose prose-invert prose-lg max-w-none text-gray-300 font-sans leading-relaxed">
                {parts.map((part, i) => {
                    if (part.startsWith('```solidity')) {
                        const code = part.replace('```solidity', '').replace('```', '').trim();
                        return (
                            <div key={i} className="my-6 rounded-lg overflow-hidden border border-white/10 shadow-lg text-sm bg-[#0f0f0f]">
                                <SyntaxHighlighter
                                    language="solidity"
                                    style={vscDarkPlus}
                                    customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent' }}
                                    showLineNumbers={true}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        );
                    }
                    return <div key={i}>{renderMarkdown(part)}</div>;
                })}
            </div>
        </motion.div>
    );
}

// Chapter Component
function Chapter({ chapter, index }: { chapter: ChapterData, index: number }) {
    const ref = useRef<HTMLElement>(null);

    return (
        <motion.section
            ref={ref}
            id={chapter.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="scroll-mt-32 mb-32 border-b border-white/5 pb-10 last:border-0"
        >
            {/* Chapter Art */}
            <GeometricAuditArt color={chapter.color} chapterId={chapter.id} />

            <motion.div variants={fadeInUp} className="mb-12">
                {/* Chapter Number/Badge */}
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-6"
                >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chapter.color }} />
                    <span className="font-mono text-xs tracking-widest text-white/60">AUDIT {chapter.number}</span>
                </div>

                {/* Title */}
                <h2
                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 font-rajdhani uppercase"
                    style={{
                        background: `linear-gradient(to right, #fff, ${chapter.color})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}
                >
                    {chapter.title}
                </h2>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-400 font-light font-rajdhani tracking-wide mb-8">
                    {chapter.subtitle}
                </p>

                {/* Audit Scorecard */}
                {chapter.score && (
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Audit Score</span>
                            <span className="text-2xl font-bold font-mono text-white">{chapter.score}</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Risk Level</span>
                            <span className={`text-2xl font-bold font-mono ${chapter.riskLevel === 'Low' ? 'text-emerald-400' :
                                chapter.riskLevel === 'None' ? 'text-blue-400' :
                                    chapter.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-red-500'
                                }`}>
                                {chapter.riskLevel || 'N/A'}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-lg bg-white/5 backdrop-blur-sm">
                            <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">Status</span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-sm font-bold font-mono text-emerald-400">PASSED</span>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Chapter Image - REMOVED for Geometric Purity, or can be kept if desired. 
                For now, keeping removal as per "Make a cool geometric animation INSTEAD" instruction.
            */}


            {/* Sections */}
            {chapter.sections.map((section, i) => (
                <Section key={i} section={section} color={chapter.color} />
            ))}

            {/* Pull Quote */}
            <motion.blockquote
                variants={fadeInUp}
                className="my-16 py-8 px-8 border-l-2 relative bg-gradient-to-r from-white/5 to-transparent rounded-r-xl"
                style={{ borderColor: chapter.color }}
            >
                <p
                    className="text-2xl font-light italic leading-relaxed text-gray-200"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                >
                    "{chapter.pullQuote}"
                </p>
            </motion.blockquote>
        </motion.section>
    );
}

export default function AuditPage() {
    const [activeChapter, setActiveChapter] = useState(chapters[0].id);
    const [showToc, setShowToc] = useState(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["start start", "end end"]
    });

    const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    // Determine active color
    const currentChapter = chapters.find(c => c.id === activeChapter) || chapters[0];
    const currentColor = currentChapter.color;

    // Scroll Spy
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveChapter(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0px -60% 0px' }
        );

        chapters.forEach((chapter) => {
            const element = document.getElementById(chapter.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToChapter = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setShowToc(false);
        }
    };

    return (
        <main ref={mainRef} className="bg-black text-white min-h-screen relative font-sans">
            <Navbar themeColor="#E5E4E2" />

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 z-[60]"
                style={{ width: progressWidth, backgroundColor: currentColor }}
            />

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
                <div className="flex gap-16 items-start">

                    {/* Desktop Sidebar (TOC) */}
                    <aside className="hidden lg:block w-72 shrink-0 sticky top-32">
                        <div className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                            <TableOfContents
                                chapters={chapters}
                                activeChapter={activeChapter}
                                onChapterClick={scrollToChapter}
                            />

                            <div className="mt-8 pt-8 border-t border-white/10">
                                <div className="text-[10px] font-mono text-gray-500 mb-2 uppercase tracking-wider">Now Reviewing</div>
                                <div className="font-bold font-rajdhani text-lg" style={{ color: currentColor }}>
                                    {currentChapter.title}
                                </div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/whitepaper"
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Whitepaper
                            </Link>
                        </div>
                    </aside>

                    {/* Main Feed */}
                    <article className="flex-1 max-w-3xl min-w-0">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-24 text-center"
                        >
                            <h1 className="text-4xl md:text-7xl font-black font-rajdhani uppercase tracking-tighter mb-6 bg-gradient-to-br from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                                Smart Contract Audit
                            </h1>
                            <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-8">
                                Comprehensive immutable source code verification for RENSNCEDAO.
                            </p>
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
                        </motion.div>

                        {/* Chapters */}
                        {chapters.map((chapter, index) => (
                            <Chapter key={chapter.id} chapter={chapter} index={index} />
                        ))}
                    </article>
                </div>
            </div>

            {/* Mobile TOC Button */}
            <button
                onClick={() => setShowToc(!showToc)}
                className="fixed bottom-8 right-8 z-50 lg:hidden w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            {/* Mobile TOC Drawer */}
            {showToc && (
                <div className="fixed inset-0 z-50 lg:hidden font-sans">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setShowToc(false)} />
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        className="absolute right-0 top-0 h-full w-80 bg-[#0a0a0a] border-l border-white/10 p-6 overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold font-rajdhani uppercase">Contents</h3>
                            <button onClick={() => setShowToc(false)}>
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <TableOfContents
                            chapters={chapters}
                            activeChapter={activeChapter}
                            onChapterClick={scrollToChapter}
                        />
                    </motion.div>
                </div>
            )}

            <Footer />
        </main>
    );
}
