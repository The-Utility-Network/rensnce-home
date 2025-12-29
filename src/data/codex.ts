export interface CodexTerm {
    term: string;
    slug: string;
    definition: string;
    longDescription: string;
    category: 'Technology' | 'Economics' | 'Philosophy' | 'Infrastructure' | 'Security' | 'Cryptography' | 'Hardware' | 'Scaling' | 'Architecture' | 'DeFi' | 'Consensus' | 'Identity' | 'Governance';
    relatedInitiatives: string[]; // slugs of related initiatives
    relatedLocations: string[]; // slugs of related locations
}

export const CODEX: CodexTerm[] = [
    {
        term: 'MKVLI',
        slug: 'mkvli',
        definition: 'The native dual-value token of the RENSNCE ecosystem, featuring both a guaranteed floor price ($1.11) and speculative value based on its unique provenance history from VRDI participation.',
        longDescription: 'MKVLI is unlike any token in DeFi. Each token carries a cryptographic "Provenance Chain"—an immutable record of every VRDI it participated in. A token that funded vaccine deliveries in Lagos, solar panel installations in São Paulo, and grain shipments to Singapore becomes a collectible artifact of verified impact. Genesis tokens (no history) trade closest to the $1.11 floor, while "storied" tokens with rich histories command premiums in secondary markets. This creates dual value: speculative upside from collectors seeking provenance, plus guaranteed liquidity from the Reserve at any time.',
        category: 'Economics',
        relatedInitiatives: ['sovereign-finance', 'verified-resource-delivery', 'community-capital'],
        relatedLocations: ['zurich', 'new-york', 'florence']
    },
    {
        term: 'Provenance Chain',
        slug: 'provenance-chain',
        definition: 'A cryptographic record appended to each MKVLI token, documenting every VRDI participation, impact metric, and recipient confirmation—creating a unique "story" for each token.',
        longDescription: 'The Provenance Chain transforms fungible tokens into semi-fungible artifacts. When an MKVLI is used to fund a VRDI, the VRDI hash, recipient attestation, and impact data are appended to the token\'s on-chain metadata. This history is immutable and verifiable. Collectors and impact investors seek tokens with meaningful provenance—a token that helped deliver 120 vaccine doses is worth more than a "Genesis" token with no history. The Provenance Chain enables new market dynamics: tiered pricing, impact-weighted valuation, and verifiable philanthropy.',
        category: 'Technology',
        relatedInitiatives: ['verified-resource-delivery', 'data-sovereignty'],
        relatedLocations: ['lagos', 'sao-paulo', 'singapore']
    },
    {
        term: 'Debt Instrument Object',
        slug: 'dio',
        definition: 'A tokenized debt contract (DIO) representing a loan agreement, repayment schedule, and collateral terms, all encoded as an on-chain NFT.',
        longDescription: 'The Debt Instrument Object (DIO) is the atomic unit of credit in the RENSNCE ecosystem. Unlike a traditional loan document locked in a bank vault, a DIO is a living, tradeable smart contract. It can be fractionalized, sold into secondary markets, or used as collateral for further borrowing. The Underwriter AI assesses each DIO before minting, ensuring only creditworthy obligations enter the Reserve.',
        category: 'DeFi',
        relatedInitiatives: ['sovereign-finance'],
        relatedLocations: ['new-york', 'london']
    },
    {
        term: 'Verified Resource Delivery Instrument',
        slug: 'vrdi',
        definition: 'A tamper-proof on-chain certificate (VRDI) proving that a specific resource—aid, goods, or services—was delivered, verified, and received by the intended recipient.',
        longDescription: 'The Verified Resource Delivery Instrument (VRDI) solves the "last mile problem" in logistics and humanitarian aid. Every shipment, from warehouse to recipient, generates cryptographic proof at each checkpoint. AI verifies delivery photos and GPS metadata. The moment a recipient confirms receipt, a VRDI is minted on-chain, triggering automatic payment to the logistics provider. This creates an auditable, fraud-resistant supply chain.',
        category: 'Infrastructure',
        relatedInitiatives: ['verified-resource-delivery', 'depin-infrastructure'],
        relatedLocations: ['singapore', 'london']
    },
    {
        term: 'The Reserve',
        slug: 'reserve',
        definition: 'The on-chain treasury backing the MKVLI floor price, holding diversified assets (stablecoins, tokenized bonds, DIO interest) and providing instant liquidity at $1.11 per token.',
        longDescription: 'The Reserve is RENSNCE\'s central bank on-chain. It holds a diversified basket of assets: USDC, tokenized treasury bonds, and accrued interest from DIOs. Every MKVLI token can be redeemed against the Reserve at the $1.11 floor—no slippage, no waiting. Proof of Reserve attestations are published on-chain, allowing anyone to verify solvency. The Reserve grows through DIO interest payments, continuously strengthening the floor.',
        category: 'Economics',
        relatedInitiatives: ['sovereign-finance', 'community-capital'],
        relatedLocations: ['zurich', 'new-york']
    },
    {
        term: 'Underwriter AI',
        slug: 'underwriter-ai',
        definition: 'The algorithmic credit assessment engine that evaluates DIO proposals using alternative data, explainable AI, and real-time risk monitoring.',
        longDescription: 'The Underwriter AI replaces the biased loan officer with transparent algorithms. It ingests alternative data—utility payments, mobile top-ups, social commerce history, on-chain reputation—to build holistic risk profiles for individuals excluded from traditional credit systems. Every decision is explainable: borrowers can see exactly why they were approved or denied. The Underwriter monitors DIO health block-by-block, triggering automatic restructuring if collateral ratios drop.',
        category: 'Technology',
        relatedInitiatives: ['sovereign-finance'],
        relatedLocations: ['new-york', 'lagos', 'sao-paulo']
    },
    {
        term: 'Floor Price',
        slug: 'floor-price',
        definition: 'The guaranteed minimum value ($1.11) at which any MKVLI token can be redeemed against the Reserve, providing downside protection regardless of market conditions.',
        longDescription: 'The $1.11 Floor Price is the mathematical safety net of the RENSNCE ecosystem. It is maintained by a bonding curve backed by the Reserve. If market price drops below floor, arbitrageurs can buy tokens cheaply, redeem for $1.11, and pocket the difference—naturally pushing price back up. This creates a hard floor without central intervention. The floor appreciates over time as the Reserve grows from DIO interest payments.',
        category: 'Economics',
        relatedInitiatives: ['sovereign-finance'],
        relatedLocations: ['zurich', 'new-york']
    },
    {
        term: 'Neuromimetic Architecture',
        slug: 'neuromimetic-architecture',
        definition: 'A system design philosophy that mimics biological neural networks, allowing decentralized nodes to self-organize and optimize without central direction.',
        longDescription: 'Neuromimetic Architecture is the core design principle behind RENSNCE DAO. Unlike traditional hierarchical control systems, a neuromimetic network treats every node (initiative, facet, participant) as an autonomous neuron. These neurons communicate laterally to reach local consensus. The entire system "heals" itself—if one node fails, the network routes around it.',
        category: 'Technology',
        relatedInitiatives: ['depin-infrastructure', 'transparent-governance'],
        relatedLocations: ['florence', 'zurich']
    },
    {
        term: 'DePIN',
        slug: 'depin',
        definition: 'Decentralized Physical Infrastructure Networks—protocols that incentivize the rollout of real-world hardware (sensors, solar panels, wifi) using cryptographic tokens.',
        longDescription: 'DePIN represents the bridge between the digital world of crypto and the physical world of infrastructure. RENSNCE utilizes DePIN models to crowdsource infrastructure deployment. Instead of a centralized utility company owning everything, the network rewards individual participants for contributing hardware. Contributions are tracked as VRDIs, and rewards are distributed algorithmically.',
        category: 'Infrastructure',
        relatedInitiatives: ['depin-infrastructure'],
        relatedLocations: ['singapore', 'new-york']
    },
    {
        term: 'RWA Tokenization',
        slug: 'rwa-tokenization',
        definition: 'The process of creating a digital twin of a Real-World Asset (like real estate, gold, or debt) on a blockchain, allowing it to be traded globally 24/7.',
        longDescription: 'RWA (Real-World Asset) Tokenization transforms illiquid physical assets into liquid digital capital. The Sovereign Finance initiative uses RWA tokenization for DIOs—debt backed by real-world cash flows. Community Capital pools can tokenize shared assets (a tractor, a building) to enable fractional ownership. This unlocks trillions of dollars in previously inaccessible value.',
        category: 'Economics',
        relatedInitiatives: ['sovereign-finance', 'community-capital'],
        relatedLocations: ['new-york', 'london', 'singapore']
    },
    {
        term: 'Zero-Knowledge Proof',
        slug: 'zero-knowledge-proof',
        definition: 'A cryptographic method by which one party can prove to another that a statement is true without revealing any information apart from the fact that the statement is true.',
        longDescription: 'ZK-proofs are foundational to privacy in RENSNCE. In Sovereign Finance, a borrower can prove creditworthiness without revealing their entire financial history. In Transparent Governance, a voter can prove they are eligible without revealing their identity. In Data Sovereignty, analytics can run on encrypted data. Privacy is the default, not the exception.',
        category: 'Cryptography',
        relatedInitiatives: ['sovereign-finance', 'transparent-governance', 'data-sovereignty'],
        relatedLocations: ['zurich', 'london']
    },
    {
        term: 'Smart Legal Contract',
        slug: 'smart-legal-contract',
        definition: 'A legally binding agreement where natural language clauses are paired with executable code that automatically enforces the terms.',
        longDescription: 'Every DIO in the Sovereign Finance initiative is a Smart Legal Contract. The terms (principal, interest, duration, penalty) are both human-readable PDF and executable Solidity. If the code fails, the legal text stands in court. If the debtor defaults, the contract self-executes penalty clauses. This merges software efficiency with legal enforceability.',
        category: 'Infrastructure',
        relatedInitiatives: ['sovereign-finance', 'community-capital'],
        relatedLocations: ['new-york', 'singapore', 'london']
    },
    {
        term: 'Self-Sovereign Identity',
        slug: 'self-sovereign-identity',
        definition: 'A model of digital identity where the user retains full control over their data, sharing only what is necessary via cryptographic attestations.',
        longDescription: 'SSI is the identity layer for all RENSNCE initiatives. When you vote in Transparent Governance, you prove eligibility with a zero-knowledge attestation. When you access Sovereign Finance, your credit history travels with your wallet, not with a bank. You control what you share, with whom, and for how long. No more identity silos.',
        category: 'Identity',
        relatedInitiatives: ['transparent-governance', 'data-sovereignty', 'sovereign-finance'],
        relatedLocations: ['lagos', 'zurich']
    },
    {
        term: 'Token Engineering',
        slug: 'token-engineering',
        definition: 'The rigorous design of economic systems and incentives using optimization, control theory, and simulation.',
        longDescription: 'RENSNCE does not just "launch tokens." We engineer economies. Before any initiative goes live, we simulate its token dynamics under stress (bank runs, whale manipulation, regulatory shock). The Community Capital pools, the DePIN reward curves, the DIO interest rates—all are modeled in CADCAD before deployment.',
        category: 'Economics',
        relatedInitiatives: ['community-capital', 'depin-infrastructure'],
        relatedLocations: ['new-york', 'florence']
    },
    {
        term: 'Moloch Trap',
        slug: 'moloch-trap',
        definition: 'A game-theory concept where individual incentives lead to a collective negative outcome (e.g., tragedy of the commons, race to the bottom).',
        longDescription: '"Moloch" represents the coordination failures of legacy systems—everyone acting rationally as individuals, yet destroying collective value. RENSNCE initiatives are designed as "Moloch Slayers." Community Capital aligns individual savings with community investment. Transparent Governance ensures voter incentives match societal outcomes. We encode cooperation into the protocol.',
        category: 'Philosophy',
        relatedInitiatives: ['community-capital', 'transparent-governance'],
        relatedLocations: ['zurich', 'lagos']
    },
    {
        term: 'Zero-Knowledge Rollup',
        slug: 'zk-rollup',
        definition: 'A Layer 2 scaling solution that bundles hundreds of transactions off-chain and generates a cryptographic proof of validity.',
        longDescription: 'ZK-Rollups allow RENSNCE to process industrial-scale throughput. The DePIN Infrastructure initiative generates thousands of VRDI attestations per minute from sensors worldwide. ZK-Rollups batch these, prove their validity, and anchor them to Ethereum, ensuring both scalability and security.',
        category: 'Scaling',
        relatedInitiatives: ['depin-infrastructure', 'verified-resource-delivery'],
        relatedLocations: ['tel-aviv', 'toronto']
    },
    {
        term: 'Multi-Party Computation',
        slug: 'mpc',
        definition: 'A cryptographic protocol where multiple parties jointly compute a function over their inputs while keeping those inputs private.',
        longDescription: 'MPC is the backbone of "Sovereign Custody" in RENSNCE. Community Capital pools use MPC to manage multi-sig treasuries. No single keyholder can abscond with funds. DIO collateral is held in MPC vaults—the borrower, lender, and protocol must all cooperate to release it. Trust is distributed.',
        category: 'Security',
        relatedInitiatives: ['community-capital', 'sovereign-finance'],
        relatedLocations: ['new-york', 'zurich']
    },
    {
        term: 'Homomorphic Encryption',
        slug: 'homomorphic-encryption',
        definition: 'A form of encryption that permits users to perform computations on encrypted data without first decrypting it.',
        longDescription: 'In the Data Sovereignty initiative, Homomorphic Encryption allows AI to analyze your data without ever seeing it in plaintext. A health app can predict your risk of diabetes from encrypted records. A credit model can score you from encrypted financial history. You earn royalties; your data stays private.',
        category: 'Security',
        relatedInitiatives: ['data-sovereignty'],
        relatedLocations: ['toronto', 'zurich']
    },
    {
        term: 'Account Abstraction',
        slug: 'account-abstraction',
        definition: 'ERC-4337 standard that upgrades simple wallets into smart contract wallets with programmable logic, enabling gasless transactions, social recovery, and more.',
        longDescription: 'Account Abstraction removes crypto complexity from every RENSNCE initiative. Transparent Governance voters don\'t need to understand gas. Sovereign Finance borrowers can pay fees in their local stablecoin. Community Capital contributors can recover their wallet via trusted friends, not seed phrases. UX parity with Web2.',
        category: 'Infrastructure',
        relatedInitiatives: ['transparent-governance', 'sovereign-finance', 'community-capital'],
        relatedLocations: ['san-francisco', 'london']
    },
    {
        term: 'Federated Learning',
        slug: 'federated-learning',
        definition: 'A machine learning approach where models are trained across decentralized devices without raw data ever leaving the local environment.',
        longDescription: 'The Data Sovereignty initiative uses Federated Learning to train AI on data owned by millions of individuals—without centralizing that data. Your phone trains a local model on your data; only the model updates (not the data) are shared. The collective intelligence improves; your privacy is preserved.',
        category: 'Technology',
        relatedInitiatives: ['data-sovereignty'],
        relatedLocations: ['toronto', 'berlin']
    },
    {
        term: 'Liquid Democracy',
        slug: 'liquid-democracy',
        definition: 'A hybrid voting system where individuals can vote directly or delegate their vote to a trusted representative—and revoke that delegation at any time.',
        longDescription: 'Transparent Governance implements Liquid Democracy. If you don\'t have time to research every proposal, delegate your vote to an expert. If they start voting against your values, revoke instantly. Power is fluid, not locked into election cycles. Accountability is continuous.',
        category: 'Governance',
        relatedInitiatives: ['transparent-governance'],
        relatedLocations: ['florence', 'lagos']
    },
    {
        term: 'Quadratic Voting',
        slug: 'quadratic-voting',
        definition: 'A voting mechanism where voters can express the intensity of their preferences by spending "voice credits" quadratically (e.g., 1 vote = 1 credit, 2 votes = 4 credits).',
        longDescription: 'Community Capital pools use Quadratic Voting to allocate funds. This prevents whale domination—a few passionate voters cannot overrun the majority. It surfaces true community preferences. Combined with Sybil resistance, it creates genuinely democratic resource allocation.',
        category: 'Governance',
        relatedInitiatives: ['community-capital', 'transparent-governance'],
        relatedLocations: ['florence', 'new-york']
    },
    {
        term: 'Sybil Resistance',
        slug: 'sybil-resistance',
        definition: 'Mechanisms to prevent a single adversary from controlling multiple fake identities to manipulate a network.',
        longDescription: 'Every RENSNCE initiative requires Sybil resistance. Transparent Governance uses "Proof of Personhood" attestations. Community Capital requires staking. Sovereign Finance uses reputation scores. No one gets a thousand votes by spinning up a thousand wallets. One person, one voice.',
        category: 'Identity',
        relatedInitiatives: ['transparent-governance', 'community-capital', 'sovereign-finance'],
        relatedLocations: ['lagos', 'tallinn']
    },
    {
        term: 'Optimistic Oracle',
        slug: 'optimistic-oracle',
        definition: 'An oracle system that accepts data as true by default, unless challenged within a specific dispute window.',
        longDescription: 'The Verified Resource Delivery initiative uses Optimistic Oracles. When a VRDI is minted (claiming delivery), it is assumed true unless someone stakes a bond to dispute it. This balances speed (most deliveries are honest) with security (fraud is caught and punished). Disputes are resolved by a decentralized jury.',
        category: 'Infrastructure',
        relatedInitiatives: ['verified-resource-delivery'],
        relatedLocations: ['london', 'singapore']
    },
    {
        term: 'Data Availability Layer',
        slug: 'data-availability',
        definition: 'A specialized blockchain layer dedicated solely to storing transaction data to ensure it is retrievable for verification.',
        longDescription: 'DePIN Infrastructure generates massive amounts of sensor data. Storing it all on Ethereum would be prohibitively expensive. We use Data Availability Layers (Celestia, EigenDA) to store VRDI attestations cheaply, with hashes anchored on L1 for security. Decades of audit history at commodity prices.',
        category: 'Infrastructure',
        relatedInitiatives: ['depin-infrastructure', 'verified-resource-delivery'],
        relatedLocations: ['austin', 'singapore']
    },
    {
        term: 'Flash Loans',
        slug: 'flash-loans',
        definition: 'Unsecured loans that must be borrowed and repaid within the same transaction block, enabling instant arbitrage and capital efficiency.',
        longDescription: 'Sovereign Finance uses Flash Loans for instant refinancing. If a DIO borrower finds a better rate, they can flash-borrow funds to pay off the old DIO, mint a new one at the better rate, and repay the flash loan—all in one atomic transaction. Capital efficiency without capital requirements.',
        category: 'DeFi',
        relatedInitiatives: ['sovereign-finance'],
        relatedLocations: ['new-york', 'london']
    },
    {
        term: 'Atomic Swaps',
        slug: 'atomic-swaps',
        definition: 'A smart contract technology that enables the exchange of one cryptocurrency for another without using centralized intermediaries.',
        longDescription: 'Verified Resource Delivery uses Atomic Swaps for cross-border payments. A donor in USD pays for a delivery in Naira. The swap happens atomically—either both sides complete, or neither does. No counterparty risk, no forex desk, no delays. Instant, trustless, global settlement.',
        category: 'DeFi',
        relatedInitiatives: ['verified-resource-delivery', 'sovereign-finance'],
        relatedLocations: ['tokyo', 'dubai']
    },
    {
        term: 'Byzantine Fault Tolerance',
        slug: 'bft',
        definition: 'The ability of a system to continue operating correctly even if some of its components fail or act maliciously.',
        longDescription: 'Transparent Governance runs on BFT consensus. Even if a third of the validators are compromised or offline, the voting system produces correct results. The integrity of election outcomes is mathematically guaranteed, not dependent on trust in any single authority.',
        category: 'Consensus',
        relatedInitiatives: ['transparent-governance'],
        relatedLocations: ['zurich', 'berlin']
    },
    {
        term: 'Proof of Stake',
        slug: 'proof-of-stake',
        definition: 'A consensus mechanism where validators are chosen to create new blocks based on the amount of cryptocurrency they "stake" as collateral.',
        longDescription: 'RENSNCE DAO\'s governance utilizes Proof of Stake principles. Community Capital contributors stake their tokens to gain voting power. The more skin in the game, the more weight your vote carries—but quadratic mechanisms prevent plutocratic takeover. Staking also earns real yield from DIO interest payments.',
        category: 'Consensus',
        relatedInitiatives: ['community-capital', 'transparent-governance'],
        relatedLocations: ['zurich', 'new-york']
    },
    {
        term: 'DAO (Decentralized Autonomous Organization)',
        slug: 'dao',
        definition: 'An organization represented by rules encoded as a smart contract that is transparent, controlled by organization members, and not influenced by a central government.',
        longDescription: 'RENSNCE is itself a DAO—the "High Table" of decentralized finance. Key decisions (treasury allocation, initiative funding, parameter changes) are made through on-chain proposals and votes. There is no CEO to fire, no headquarters to raid. The organization exists as pure code and consensus.',
        category: 'Governance',
        relatedInitiatives: ['transparent-governance', 'community-capital'],
        relatedLocations: ['florence', 'zurich']
    },
    {
        term: 'Oracle',
        slug: 'oracle',
        definition: 'A service that provides smart contracts with external real-world data, bridging the gap between on-chain logic and off-chain information.',
        longDescription: 'DIO interest rates reference off-chain benchmarks (SOFR, inflation indices). VRDIs require GPS coordinates and timestamps. The RENSNCE ecosystem uses decentralized oracle networks (Chainlink, Pyth) to feed this data on-chain. Optimistic oracles with dispute windows catch errors before they become permanent.',
        category: 'Infrastructure',
        relatedInitiatives: ['sovereign-finance', 'verified-resource-delivery'],
        relatedLocations: ['london', 'singapore']
    },
    {
        term: 'Layer 2',
        slug: 'layer-2',
        definition: 'Secondary frameworks or protocols built on top of an existing blockchain (Layer 1) to improve scalability and transaction speed.',
        longDescription: 'RENSNCE deploys application-specific logic on Layer 2 (Arbitrum, Base, zkSync) while anchoring security to Ethereum mainnet. This allows for high-throughput VRDI attestations and micro-DIO payments without the gas costs of L1. Zero-Knowledge rollups provide both scalability and privacy.',
        category: 'Scaling',
        relatedInitiatives: ['depin-infrastructure', 'sovereign-finance'],
        relatedLocations: ['berlin', 'tokyo']
    },
    {
        term: 'Merkle Tree',
        slug: 'merkle-tree',
        definition: 'A data structure in which every leaf node contains a cryptographic hash, and every non-leaf node contains the hash of its child nodes, enabling efficient verification.',
        longDescription: 'The Repository uses Merkle Trees to prove data integrity. A single hash (the Merkle Root) can verify that a specific VRDI or DIO exists within a massive dataset without downloading the entire history. This enables light clients and mobile wallets to participate in verification.',
        category: 'Cryptography',
        relatedInitiatives: ['verified-resource-delivery', 'data-sovereignty'],
        relatedLocations: ['berlin', 'zurich']
    },
    {
        term: 'Gas',
        slug: 'gas',
        definition: 'A unit measuring the computational effort required to execute operations on a blockchain, paid in the network\'s native cryptocurrency.',
        longDescription: 'Every DIO mint, every VRDI attestation, every governance vote requires gas. RENSNCE abstracts this complexity through Account Abstraction—users can pay fees in stablecoins, or protocols can sponsor gas for new users. The friction of crypto is hidden; the benefits remain.',
        category: 'Infrastructure',
        relatedInitiatives: ['sovereign-finance', 'transparent-governance'],
        relatedLocations: ['new-york', 'london']
    },
    {
        term: 'Governance Token',
        slug: 'governance-token',
        definition: 'A cryptocurrency that grants holders voting rights in a decentralized protocol\'s decision-making processes.',
        longDescription: 'MKVLI is both a store of value and a governance token. Holders can vote on parameter changes, initiative funding, and even emergency protocol upgrades. Voting power is earned through contribution (staking, DIO purchases) not just capital—aligning incentives with long-term ecosystem health.',
        category: 'Governance',
        relatedInitiatives: ['transparent-governance', 'community-capital'],
        relatedLocations: ['florence', 'new-york']
    },
    {
        term: 'Bonding Curve',
        slug: 'bonding-curve',
        definition: 'A mathematical curve that defines the relationship between a token\'s price and its supply, enabling algorithmic pricing and liquidity.',
        longDescription: 'The MKVLI floor price ($1.11) is maintained by a bonding curve backed by the Reserve. As more value flows into the ecosystem through DIO interest payments, the curve shifts upward, creating organic price appreciation. Unlike speculative pumps, this growth is backed by real economic activity.',
        category: 'Economics',
        relatedInitiatives: ['sovereign-finance'],
        relatedLocations: ['zurich', 'new-york']
    },
];
