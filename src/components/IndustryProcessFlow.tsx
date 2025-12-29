'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Stage {
    icon: string;
    title: string;
    desc: string;
}

interface Props {
    stages?: Stage[];
}

// Map icon names to Lucide components
const getIcon = (iconName: string): LucideIcon => {
    const iconMap: Record<string, LucideIcon> = {
        // Identity & Verification
        'fingerprint': LucideIcons.Fingerprint,
        'user-check': LucideIcons.UserCheck,
        'shield-check': LucideIcons.ShieldCheck,
        'scan': LucideIcons.Scan,
        'badge-check': LucideIcons.BadgeCheck,

        // AI & Analysis
        'bot': LucideIcons.Bot,
        'brain': LucideIcons.Brain,
        'sparkles': LucideIcons.Sparkles,
        'search': LucideIcons.Search,
        'eye': LucideIcons.Eye,

        // Documents & Contracts
        'file-text': LucideIcons.FileText,
        'file-signature': LucideIcons.FileSignature,
        'scroll-text': LucideIcons.ScrollText,
        'clipboard-check': LucideIcons.ClipboardCheck,

        // Finance & Transactions
        'wallet': LucideIcons.Wallet,
        'banknote': LucideIcons.Banknote,
        'coins': LucideIcons.Coins,
        'arrow-right-left': LucideIcons.ArrowRightLeft,
        'trending-up': LucideIcons.TrendingUp,
        'piggy-bank': LucideIcons.PiggyBank,

        // Logistics & Delivery
        'package': LucideIcons.Package,
        'truck': LucideIcons.Truck,
        'map-pin': LucideIcons.MapPin,
        'navigation': LucideIcons.Navigation,

        // Confirmation & Success
        'check-circle': LucideIcons.CheckCircle,
        'circle-check': LucideIcons.CircleCheck,
        'check': LucideIcons.Check,
        'award': LucideIcons.Award,

        // Governance & Voting
        'vote': LucideIcons.Vote,
        'users': LucideIcons.Users,
        'megaphone': LucideIcons.Megaphone,
        'bar-chart-3': LucideIcons.BarChart3,

        // Data & Security
        'database': LucideIcons.Database,
        'lock': LucideIcons.Lock,
        'key-round': LucideIcons.KeyRound,
        'shield': LucideIcons.Shield,
        'vault': LucideIcons.Lock, // No vault icon, use lock

        // Infrastructure
        'radio-tower': LucideIcons.RadioTower,
        'signal': LucideIcons.Signal,
        'cpu': LucideIcons.Cpu,
        'server': LucideIcons.Server,

        // Actions
        'handshake': LucideIcons.Handshake,
        'hammer': LucideIcons.Hammer,
        'settings': LucideIcons.Settings,
        'zap': LucideIcons.Zap,
        'rocket': LucideIcons.Rocket,

        // Blockchain
        'link': LucideIcons.Link,
        'blocks': LucideIcons.Blocks,
        'hexagon': LucideIcons.Hexagon,
    };

    return iconMap[iconName] || LucideIcons.Circle;
};

export default function IndustryProcessFlow({ stages }: Props) {
    const defaultStages: Stage[] = [
        { icon: 'file-text', title: 'Legacy Audit', desc: 'Manual Data Entry' },
        { icon: 'link', title: 'Tokenization', desc: 'Asset Digitization' },
        { icon: 'zap', title: 'Automation', desc: 'Smart Contract Logic' },
        { icon: 'rocket', title: 'Settlement', desc: 'Instant Value Transfer' }
    ];

    const activeStages = stages || defaultStages;

    return (
        <div className="w-full py-12">
            <h3 className="text-xl font-bold mb-8 text-center uppercase tracking-widest text-gray-500">The Transformation Process</h3>

            <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 max-w-5xl mx-auto">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10 hidden md:block" />

                {/* Stages */}
                {activeStages.map((stage, i) => {
                    const IconComponent = getIcon(stage.icon);
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex flex-col items-center bg-black/80 backdrop-blur-md border border-white/10 p-6 rounded-xl w-48 text-center hover:border-utility-red/50 transition-all group relative z-10"
                        >
                            {/* Grayscale Mesh Gradient Background */}
                            <div className="absolute inset-0 rounded-xl opacity-30" style={{
                                background: `radial-gradient(ellipse at ${30 + i * 20}% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
                            }} />

                            {/* Step Number Badge */}
                            <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-gray-500 font-mono group-hover:bg-utility-red group-hover:text-white transition-colors z-20">
                                {i + 1}
                            </div>

                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                                <IconComponent className="w-10 h-10 text-gray-400 group-hover:text-utility-red transition-colors" />
                            </div>
                            <div className="font-bold text-white mb-2 text-sm relative z-10">{stage.title}</div>
                            <div className="text-xs text-gray-500 leading-tight relative z-10">{stage.desc}</div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
