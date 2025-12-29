import React from 'react';
import Image from 'next/image';
import HeroSection from '@/components/rensncedao/HeroSection';
import ContentSection from '@/components/rensncedao/ContentSection';
import Navbar from '@/components/Navbar';
import GenerativeGeometricOverlay from '@/components/rensncedao/GenerativeGeometricOverlay';
import { DioAnimation, StochasticAnimation, TaggingAnimation } from '@/components/rensncedao/FeatureAnimations';
import Footer from '@/components/rensncedao/Footer';
import TransparentVideo from '@/components/rensncedao/TransparentVideo';
import ContractAddresses from '@/components/rensncedao/ContractAddresses';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/rensnce_hero_bg.png"
          alt="Renaissance Landscape with Decentralized Data"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <GenerativeGeometricOverlay className="opacity-70" />
      </div>

      <div className="relative z-10">
        <Navbar themeColor="#E5E4E2" />
        <HeroSection />

        <ContentSection
          id="introduction"
          title="About Us"
          subtitle="Innovation & Empowerment"
          background={
            <>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-utility-red/10 via-transparent to-utility-red/5" />
              </div>
              <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black via-black/80 to-transparent" />
            </>
          }
        >
          <p>
            In an environment of technological disruption and complex economic landscapes, RENSNCEDAO identified the need for an innovative financial system that aligns with our core values of empowerment, sustainability, and innovation. MKVLI emerges as a response to this need, offering a stable, secure, and multifunctional financial tool.
          </p>
          <p>
            Designed to integrate seamlessly into our diverse ecosystem, MKVLI addresses the challenges of traditional financial systems by providing a decentralized, transparent, and equitable economic model.
          </p>
          <p>
            Machiavelli’s life story, filled with political intrigues and strategic maneuvering, serves as a potent source of inspiration for the MKVLI token. Much like how Machiavelli navigated the complex and often unpredictable world of Renaissance politics, MKVLI is designed to operate within the intricate and rapidly evolving landscape of digital finance.
          </p>
          <p>
            Through this lens, the MKVLI token can be viewed as a Machiavellian tool, designed to adapt to and prosper within the unpredictable world of digital finance. 'The Prince' was written as a practical guide for leadership... In a similar vein, MKVLI is intended as a pragmatic instrument for navigating through the complex digital financial landscape.
          </p>
        </ContentSection>

        <ContentSection id="features" title="Features" subtitle="Innovative Financial Systems">
          <div className="grid md:grid-cols-3 gap-8">

            {/* Feature 1 */}
            <div className="space-y-6 group">
              <DioAnimation />
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-utility-red transition-colors">Debt Instrument Object (DIO)</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  A DIO is a proposal approved by the Underwriter that spawns a VRDI (Vault-Reliant Debt Instrument). Each VRDI defines: principal in USDC, interest rate, amortization duration, deferral period, and phased disbursement schedules—all managed by committee consensus on-chain.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="space-y-6 group">
              <StochasticAnimation />
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-utility-red transition-colors">Stochastic Staking Mechanism</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Tokens staked to a VRDI are cryptographically locked via the Reserve facet—they cannot be transferred until the debt obligation is fully repaid and all phases are committee-approved. This creates genuine "skin in the game" for participants.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="space-y-6 group">
              <TaggingAnimation />
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-white group-hover:text-utility-red transition-colors">DIO Tagging & Perpetual Returns</h3>
                <p className="text-foreground-muted text-sm leading-relaxed">
                  Once a token is staked to a DIO which contains a perpetual returns component, that token is forever tagged with a unique identifier for the DIO. The perpetual return benefits of the token are transferrable with it once the DIO matures and it is unstaked.
                </p>
              </div>
            </div>

          </div>
        </ContentSection>

        <ContentSection id="facts" title="Facts and Figures" subtitle="The MKVLI Standard">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4 glass-panel border border-utility-red/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">111</div>
              <div className="text-xs font-mono tracking-widest text-silver">Million Tokens<br />Fixed Supply</div>
            </div>
            <div className="p-4 glass-panel border border-utility-red/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$1.11</div>
              <div className="text-xs font-mono tracking-widest text-silver">Reserve Buy-Back<br />Value secured in I3AS</div>
            </div>
            <div className="p-4 glass-panel border border-utility-red/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1:1</div>
              <div className="text-xs font-mono tracking-widest text-silver">Unstaked tokens<br />sold to Reserve</div>
            </div>
            <div className="p-4 glass-panel border border-utility-red/20 rounded-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1</div>
              <div className="text-xs font-mono tracking-widest text-silver">Financially-Stable<br />Community</div>
            </div>
          </div>
        </ContentSection>

        <ContentSection id="use-cases" title="Use Cases" subtitle="The Utility Ecosystem">
          <p>
            MKVLI is the lifeblood of the ecosystem. It serves multiple critical functions:
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 border border-glass-border rounded hover:border-utility-red transition-colors">
              <h4 className="text-lg font-serif text-white mb-2">Reserve Redemption</h4>
              <p className="text-sm">Any unstaked MKVLI token can be redeemed through the Reserve at the dynamic redemption price, which is calculated as: (USDC in Reserve + Deployed Capital) ÷ Circulating Supply.</p>
            </div>
            <div className="p-4 border border-glass-border rounded hover:border-utility-red transition-colors">
              <h4 className="text-lg font-serif text-white mb-2">VRDI Collateral</h4>
              <p className="text-sm">Tokens can be staked to VRDIs as collateral. Once staked, they are locked until the debtor completes all phases and repays principal + interest in USDC. Only then are tokens released.</p>
            </div>
            <div className="p-4 border border-glass-border rounded hover:border-utility-red transition-colors">
              <h4 className="text-lg font-serif text-white mb-2">Governance Participation</h4>
              <p className="text-sm">MKVLI holders can join committees, vote on proposals, and participate in phase approvals. The Directory facet manages a hierarchical role system from Member to High Table.</p>
            </div>
          </div>
        </ContentSection>

        <ContentSection id="architecture" title="Technical Architecture" subtitle="EIP-2535 Diamond Standard on Base">
          <p>
            Security and modularity are paramount. The RENSNCEDAO smart contract system leverages Ethereum's security through <strong className="text-white">Base (Coinbase L2)</strong> optimistic rollups while maintaining low transaction costs.
          </p>
          <p>
            The protocol implements the <strong className="text-white">EIP-2535 Diamond Standard</strong>, enabling unlimited storage, modular upgradability, and gas-efficient multi-facet architecture. Core facets include: <em>Directory</em> (role-based access), <em>Repository</em> (transparent data layer), <em>Underwriter</em> (proposal lifecycle), <em>Mint</em> (token issuance), and <em>Reserve</em> (treasury management).
          </p>

          {/* Contract Addresses */}
          <ContractAddresses />

          {/* Audit CTA */}
          <div className="flex items-center justify-between mt-8 p-4 border border-utility-red/20 rounded-lg bg-utility-red/5">
            <div>
              <p className="text-white font-medium">Security Audit Complete</p>
              <p className="text-sm text-gray-400">All contracts scored <strong className="text-white">59.9/60</strong> with zero critical issues.</p>
            </div>
            <a
              href="/audit"
              className="px-6 py-3 bg-utility-red text-black font-bold text-sm font-mono tracking-wider rounded hover:opacity-90 transition-opacity"
            >
              VIEW AUDIT
            </a>
          </div>
        </ContentSection>

        <ContentSection
          id="roadmap"
          title="Roadmap"
          subtitle="The Path Forward"
          background={
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-t from-utility-red/10 via-transparent to-transparent" />
            </div>
          }
        >
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-utility-red before:to-transparent">

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-utility-red bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_20px_var(--glow-color)]">
                <div className="w-3 h-3 bg-utility-red rounded-full animate-pulse" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 glass-panel rounded border border-utility-red/20">
                <h4 className="font-serif text-white text-lg">Phase 1: Foundation</h4>
                <p className="text-sm text-foreground-muted">Token generation, smart contract audit, and initial seed round funding.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-glass-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-foreground-muted rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 glass-panel rounded border border-glass-border">
                <h4 className="font-serif text-white text-lg">Phase 2: Integration</h4>
                <p className="text-sm text-foreground-muted">Launch of DigiBazaar beta, I3AS integration, and public token sale.</p>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-glass-border bg-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-foreground-muted rounded-full" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 glass-panel rounded border border-glass-border">
                <h4 className="font-serif text-white text-lg">Phase 3: Expansion</h4>
                <p className="text-sm text-foreground-muted">Governance DAO launch, cross-chain bridges, and global marketing campaign.</p>
              </div>
            </div>

          </div>
        </ContentSection>

        <ContentSection
          id="conclusion"
          title=""
          subtitle=""
        >
          {/* Custom header with inline video */}
          <div className="flex items-center justify-between mb-8 -mt-4">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">Join the RENSNCE</h2>
              <p className="font-mono-label text-utility-red-dark tracking-widest">Conclusion</p>
              <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-utility-red to-transparent mt-4 opacity-50" />
            </div>
            <div className="w-32 md:w-48 lg:w-56 aspect-square opacity-70 flex-shrink-0 ml-4">
              <TransparentVideo
                src="/videos/scraped/video_7.mp4"
                className="object-contain grayscale hover:grayscale-0 transition-all duration-700"
                forceWhite={true}
              />
            </div>
          </div>
          {/* Hero Quote */}
          <div className="text-center mb-12 relative z-10">
            <div className="inline-block relative">
              <span className="absolute -left-8 -top-4 text-6xl text-utility-red/30 font-serif">"</span>
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed max-w-3xl">
                The future is not just about technology; it is about purpose.
              </p>
              <span className="absolute -right-8 -bottom-4 text-6xl text-utility-red/30 font-serif">"</span>
            </div>
            <p className="mt-6 text-lg font-mono tracking-widest text-utility-red uppercase">
              The Future is Accessible
            </p>
          </div>

          {/* Philosopher Quotes */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 relative z-10">
            {/* Quote 1 */}
            <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-utility-red/30 transition-all duration-300">
              <div className="text-4xl text-utility-red/40 font-serif mb-4">"</div>
              <p className="text-sm md:text-base text-gray-300 italic leading-relaxed mb-4">
                It's a form of human love to accept our complicated, messy humanity and not run away from it.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-mono tracking-wider text-utility-red">MARTHA NUSSBAUM</p>
                <p className="text-xs text-gray-500 mt-1">Philosopher, University of Chicago</p>
              </div>
            </div>

            {/* Quote 2 */}
            <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-utility-red/30 transition-all duration-300">
              <div className="text-4xl text-utility-red/40 font-serif mb-4">"</div>
              <p className="text-sm md:text-base text-gray-300 italic leading-relaxed mb-4">
                While I am interested both in economics and in philosophy, the union of my interests in the two fields far exceeds their intersection.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-mono tracking-wider text-utility-red">AMARTYA SEN</p>
                <p className="text-xs text-gray-500 mt-1">Nobel Laureate, Economist</p>
              </div>
            </div>

            {/* Quote 3 */}
            <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-utility-red/30 transition-all duration-300">
              <div className="text-4xl text-utility-red/40 font-serif mb-4">"</div>
              <p className="text-sm md:text-base text-gray-300 italic leading-relaxed mb-4">
                Where the willingness is great, the difficulties cannot be great.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-mono tracking-wider text-utility-red">NICCOLÒ MACHIAVELLI</p>
                <p className="text-xs text-gray-500 mt-1">Renaissance Political Philosopher</p>
              </div>
            </div>
          </div>

          {/* Motto & CTA */}
          <div className="mt-16 text-center relative z-10">
            <div className="inline-block px-8 py-4 border border-utility-red/20 rounded-lg bg-utility-red/5">
              <p className="font-mono text-lg tracking-[0.3em] text-white mb-2">NOS SUMUS IUDEX</p>
              <p className="text-xs text-gray-400 italic">Isola delle Stinche, Florence</p>
            </div>
          </div>
          <div className="flex justify-center mt-8 relative z-10">
            <button className="btn-primary">
              Initialize Sequence
            </button>
          </div>
        </ContentSection>

        <Footer />
      </div>
    </main>
  );
}
