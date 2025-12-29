'use client';

import React from 'react';
import TransparentVideo from './TransparentVideo';

// --- Shared Wrapper ---
const FeatureWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden bg-black/40 rounded-lg border border-white/10 group-hover:border-utility-red/30 transition-colors">
        {children}
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
);

// 1. Debt Instrument Object (DIO) - Now playing Stochastic (Video 2)
export const DioAnimation = () => {
    return (
        <FeatureWrapper>
            <TransparentVideo src="/videos/feature-stochastic.mp4" className="opacity-90 grayscale hover:grayscale-0 transition-all duration-700" forceWhite={true} />
        </FeatureWrapper>
    );
};

// 2. Stochastic Staking - Now playing Tagging (Video 3)
export const StochasticAnimation = () => {
    return (
        <FeatureWrapper>
            <TransparentVideo src="/videos/feature-tagging.mp4" className="opacity-90 grayscale hover:grayscale-0 transition-all duration-700" forceWhite={true} />
        </FeatureWrapper>
    );
};

// 3. Tagging & Perpetual Returns - Now playing DIO (Video 1)
export const TaggingAnimation = () => {
    return (
        <FeatureWrapper>
            <TransparentVideo src="/videos/feature-dio.mp4" className="opacity-90 grayscale hover:grayscale-0 transition-all duration-700" forceWhite={true} />
        </FeatureWrapper>
    );
};
