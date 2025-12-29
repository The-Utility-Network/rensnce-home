'use client';

interface ContractAddressProps {
    network: string;
    address: string;
    explorerUrl: string;
    isMainnet?: boolean;
}

function ContractAddressCard({ network, address, explorerUrl, isMainnet }: ContractAddressProps) {
    const handleCopy = () => {
        navigator.clipboard.writeText(address);
    };

    return (
        <div className={`p-4 border ${isMainnet ? 'border-utility-red/30' : 'border-glass-border'} rounded-lg bg-black/30`}>
            <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-mono tracking-wider ${isMainnet ? 'text-utility-red' : 'text-gray-400'}`}>
                    {network}
                </span>
                <span
                    className={`w-2 h-2 ${isMainnet ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'} rounded-full`}
                    title={isMainnet ? 'Live' : 'Testnet'}
                />
            </div>
            <div className="flex items-center gap-2 bg-black/50 rounded px-3 py-2">
                <code className="text-xs text-white font-mono flex-1 truncate">{address}</code>
                <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-white/10 rounded transition-colors group"
                    title="Copy address"
                >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </button>
                <a
                    href={explorerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 hover:bg-white/10 rounded transition-colors group"
                    title="View on Basescan"
                >
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </a>
            </div>
        </div>
    );
}

export default function ContractAddresses() {
    return (
        <div className="grid md:grid-cols-2 gap-4 mt-8">
            <ContractAddressCard
                network="BASE MAINNET"
                address="0x389dfbCB6Ee872efa97bb5713d76DdA8419Af8CC"
                explorerUrl="https://basescan.org/address/0x389dfbCB6Ee872efa97bb5713d76DdA8419Af8CC"
                isMainnet
            />
            <ContractAddressCard
                network="BASE SEPOLIA TESTNET"
                address="0xDA146e3A30BC3d4f3Bf23b374EfE21650ceD01C9"
                explorerUrl="https://sepolia.basescan.org/address/0xDA146e3A30BC3d4f3Bf23b374EfE21650ceD01C9"
            />
        </div>
    );
}
