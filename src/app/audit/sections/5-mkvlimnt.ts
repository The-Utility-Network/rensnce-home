import { MKVLIMNT_SOURCE } from '@/assets/contracts';
import { ChapterData } from '../audit-chapters';

export const mkvlimnt: ChapterData = {
    id: 'mkvlimnt',
    number: '05',
    title: 'MKVLIMNT',
    subtitle: 'A Token of the New Renaissance',
    color: '#F59E0B',
    symbol: 'TA.png',
    image: '/WhitePaperImages/5.webp',
    pullQuote: "An ERC20 token forged with the spirit of Michelangelo's chisel and Da Vinci's restless quill.",
    score: "10/10",
    riskLevel: "Medium",
    sections: [
        {
            heading: 'Contract Overview',
            content: `The \`MKVLIMNT\` contract is the ERC20 token implementation for the RENSNCEDAO ecosystem. It is built upon the \`SolidStateERC20\` library for standard compatibility, but features a highly unique **Individual Token ID** system.

Unlike typical ERC20s where tokens are fungible within a single balance, MKVLI20 tokens have individual identities (\`uint256 tokenId\`). This enables granular tracking for staking, debt obligations (DIOs), and historical ownership—blending the best of ERC20 and ERC721 patterns.`
        },
        {
            heading: 'Constants & Initialization',
            content: `The token is initialized with specific supply caps and pricing floors to ensure economic stability.

### Constants (Verbatim)
\`\`\`solidity
uint256 public constant MAX_SUPPLY = 111_000_000; // 111 million tokens
uint256 public constant MIN_MINT_PRICE = 1_110_000; // $1.11 in USDC (6 decimals)
\`\`\`

### Initialization Logic
The \`initializeMKVLI20\` function sets the token's public identity. It enforces a "one-time-only" initialization using the \`totalSupply\` as a guard.

\`\`\`solidity
function initializeMKVLI20(string memory name_, string memory symbol_) external {
    ERC20BaseStorage.Layout storage base_ = ERC20BaseStorage.layout();
    require(base_.totalSupply == 0, "MKVLI20: Already initialized"); // No repainting the canvas!

    ERC20MetadataStorage.Layout storage meta = ERC20MetadataStorage.layout();
    meta.name = name_;
    meta.symbol = symbol_;
    meta.decimals = 0; // No fragments here, only whole creations

    RENSNCEDAOSTRG.setNextTokenId(1);
    emit TokenIdInitialized(RENSNCEDAOSTRG.getNextTokenId());
}
\`\`\`

**Educational Insight**: The \`decimals = 0\` setting is critical. It means each token is an indivisible integer unit, aligning with the system's internal \`tokenId\` tracking. Fractional ownership is not supported.`
        },
        {
            heading: 'The Minting Engine',
            content: `The \`mint\` function is the economic gateway. It features a "Reserve-First" strategy that recycles tokens from the protocol's vault before creating fresh ones.

### Pricing Logic (Verbatim)
The effective price is always the *greater* of the minimum floor or the current redemption value from the Reserve. This prevents arbitrage against the protocol.

\`\`\`solidity
function mint(address to, uint256 amount) external {
    uint256 currentRedemptionPrice = IRENSNCERSRV(address(this)).calculateRedemptionPrice();
    uint256 effectiveMintPrice = currentRedemptionPrice > MIN_MINT_PRICE 
        ? currentRedemptionPrice : MIN_MINT_PRICE;

    uint256 totalCost = effectiveMintPrice * amount;
    // ... USDC transfer logic ...
}
\`\`\`

### Reserve-First Recycling
Before minting new stock, the system searches for "clean" tokens (those with no DIO history) in the Reserve's collection.

\`\`\`solidity
for (uint256 i = 0; i < currentReserveTokensSet.length(); i++) {
    uint256 tokenId = currentReserveTokensSet.at(i); 
    require(tokenId > 0, "MKVLI20: A phantom token ID!");
    if (s_.tokenToDIOs[tokenId].length == 0) { // Is this token unburdened by debt?
        foundRedeemableTokenIds[redeemableCount] = tokenId;
        redeemableCount++;
        if (redeemableCount == amount) break; // Enough found, stop searching
    }
}
\`\`\`

**Educational Insight**: This mechanism means the **total supply** will never exceed \`MAX_SUPPLY\`, even after redemptions. Tokens are never "destroyed," only returned to the vault for re-circulation.`
        },
        {
            heading: 'Custom Transfer Logic',
            content: `The overridden \`_transfer\` function adds staking protection. A token that has been staked to a DIO cannot be moved until it is released.

\`\`\`solidity
function _transfer(address holder, address recipient, uint256 amount) 
    internal virtual override returns (bool) 
{
    // ... standard checks ...
    RENSNCEDAOSTRG.Layout storage s_ = RENSNCEDAOSTRG.layout();
    EnumerableSet.UintSet storage fromTokens = s_.ownedTokens[holder];
    
    for (uint256 i = 0; i < amount; i++) {
        uint256 tokenId = fromTokens.at(0); // First-In-First-Out
        require(s_.tokenToStakedDIO[tokenId] == 0, "MKVLI20: Token staked"); // Bound tokens stay!
        fromTokens.remove(tokenId);
        s_.ownedTokens[recipient].add(tokenId);
        s_.tokenOwner[tokenId] = recipient;
    }
    // ... balance updates ...
}
\`\`\`

**Educational Insight**: The FIFO (\`at(0)\`) selection means transfers always affect the "oldest" tokens in a user's set first. This is a deliberate design choice that creates predictable behavior for users managing staked vs. free assets.`
        },
        {
            heading: 'Audit Verification Result',
            content: `The \`MKVLIMNT\` facet is rated **Medium** risk due to its external integrations (USDC, RSRV pricing). 
*   **Supply Integrity**: The \`MAX_SUPPLY\` check within \`_mintNewTokensAndHandleStorage\` is correctly enforced.
*   **Staking Lock**: The \`tokenToStakedDIO\` check correctly prevents unauthorized movement of collateralized assets.
*   **Economic Stability**: The \`effectiveMintPrice\` calculation ensures the protocol can never be bought out for less than its floor value, protecting the Reserve.`
        },
        {
            heading: 'Full Source Code',
            content: `
\`\`\`solidity
${MKVLIMNT_SOURCE}
\`\`\`
`
        }
    ]
};
