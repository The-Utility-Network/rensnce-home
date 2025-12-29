import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'MKVLI Whitepaper | RENSNCEDAO',
    description: 'The philosophical and technical foundations of the MKVLI token and the RENSNCEDAO ecosystem.',
}

export default function WhitepaperLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="antialiased text-slate-200 bg-black min-h-screen selection:bg-cyan-500/30 selection:text-cyan-100">
            {children}
        </div>
    )
}
