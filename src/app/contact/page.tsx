import Navbar from '@/components/Navbar';
import Footer from '@/components/rensncedao/Footer';
import ContactForm from '@/components/ContactForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | RENSNCE DAO',
    description: 'Get in touch with RENSNCE DAO. We are here to answer your questions about the MKVLI token, DIO financing, VRDI instruments, and the new financial renaissance.',
};

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-utility-red selection:text-white">
            <Navbar themeColor="#E5E4E2" />

            <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Info */}
                    <div className="space-y-12">
                        <div>
                            <span className="section-heading text-utility-red">GET IN TOUCH</span>
                            <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6">
                                Join The <br />
                                <span className="text-gray-500">Renaissance.</span>
                            </h1>
                            <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                                Whether you're exploring DIO financing, interested in MKVLI tokenomics,
                                or want to partner with the DAO, we're here to guide your journey
                                into the new financial renaissance.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="glass-panel p-6 rounded-xl border border-white/5">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">General Inquiries</h3>
                                <a href="mailto:info@rensnce.com" className="text-2xl font-mono text-white hover:text-utility-red transition-colors">
                                    info@rensnce.com
                                </a>
                            </div>

                            <div className="glass-panel p-6 rounded-xl border border-white/5">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Join the Community</h3>
                                <div className="flex gap-4">
                                    <a href="https://discord.gg/scHwVByn9m" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-utility-red hover:text-white transition-colors">
                                        Discord
                                    </a>
                                    <a href="https://twitter.com/rensncedao" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-utility-red hover:text-white transition-colors">
                                        Twitter / X
                                    </a>
                                </div>
                            </div>

                            <div className="glass-panel p-6 rounded-xl border border-white/5">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Learn More</h3>
                                <div className="flex flex-wrap gap-3">
                                    <a href="/codex" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                                        Codex
                                    </a>
                                    <a href="/token" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                                        MKVLI Token
                                    </a>
                                    <a href="/initiatives" className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-sm">
                                        Initiatives
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="relative">
                        {/* Decorative Glow */}
                        <div className="absolute -inset-4 bg-utility-red/20 blur-3xl opacity-20 rounded-full pointer-events-none" />

                        <div className="relative z-10">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
