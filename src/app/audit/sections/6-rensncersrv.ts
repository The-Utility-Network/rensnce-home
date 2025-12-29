import { RENSNCERSRV_SOURCE } from '@/assets/contracts';
import { ChapterData } from '../audit-chapters';

export const rensncersrv: ChapterData = {
    id: 'rensncersrv',
    number: '06',
    title: 'RENSNCERSRV',
    subtitle: 'The Vault of a New Renaissance',
    color: '#EC4899',
    symbol: 'TA.png',
    image: '/WhitePaperImages/6.webp',
    pullQuote: "A grand vault where VRDI and DIO weave a tapestry of obligation and redemption.",
    score: "10/10",
    riskLevel: "High",
    sections: [
        {
            heading: 'Contract Overview',
            content: `The \`RENSNCERSRV\` (Reserve) facet is the treasury and operational engine of the RENSNCEDAO. It manages the protocol's USDC reserves, the lifecycle of VRDIs (Vault-Reliant Debt Instruments), and the economic equilibrium between minting and redemption.

As the most complex and high-stakes facet, it requires meticulous attention. Understanding its logic is critical for any party interacting with or investing in the DAO ecosystem.`
        },
        {
            heading: 'Core Constants & Initialization',
            content: `The Reserve is anchored by a single critical constant and an initialization function that sets the economic backbone.

### Burn Wallet (Verbatim)
\`\`\`solidity
address public constant BURN_WALLET = 0x000000000000000000000000000000000000dEaD; 
// The abyss, a crypt for lost treasures
\`\`\`

### Initialization (Verbatim)
\`\`\`solidity
function initializeReserveService(address _usdcTokenAddress) external onlyHighTable {
    RENSNCEDAOSTRG.Layout storage l = RENSNCEDAOSTRG.layout();
    require(_usdcTokenAddress != address(0), "RSRV: USDC address cannot be zero");
    l.usdcTokenAddress = _usdcTokenAddress;
}
\`\`\`

**Educational Insight**: The \`BURN_WALLET\` address (\`0x...dEaD\`) is a standard EVM convention. Tokens sent there are permanently unrecoverable.`
        },
        {
            heading: 'Dynamic Redemption Pricing',
            content: `The \`calculateRedemptionPrice\` function determines the fair value of each MKVLI token. It is designed to reflect the real backing of the circulating supply.

### Calculation Logic (Verbatim)
\`\`\`solidity
function calculateRedemptionPrice() public returns (uint256) {
    IMKVLIMNT mkvliToken = IMKVLIMNT(address(this));
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();

    uint256 mkvliTotalSupply = mkvliToken.totalSupply();
    uint256 mkvliInOwnReserve = mkvliToken.balanceOf(address(this)); 
    uint256 mkvliBurned = mkvliToken.balanceOf(BURN_WALLET); 
    uint256 mkvliCirculatingSupply = mkvliTotalSupply - mkvliInOwnReserve - mkvliBurned; 
    
    address usdcAddr = _getUsdcAddress();
    uint256 actualUsdcInContract = IERC20(usdcAddr).balanceOf(address(this)); 

    uint256 totalUsdcDeployedInVRDIs = 0;
    for (uint256 vrId = 0; vrId < s.nextVRDIId; vrId++) {
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        if (vrdi.dioId != 0 && !vrdi.isClosed && !vrdi.isFrozen) { 
            for (uint256 j = 0; j < vrdi.phases.length; j++) {
                totalUsdcDeployedInVRDIs += vrdi.phases[j].withdrawnUSDC;
            }
        }
    }

    uint256 effectiveUsdcReserve = actualUsdcInContract + totalUsdcDeployedInVRDIs;
    if (mkvliCirculatingSupply == 0) {
        return mkvliToken.MIN_MINT_PRICE(); 
    } else {
        return effectiveUsdcReserve / mkvliCirculatingSupply; 
    }
}
\`\`\`

**Educational Insight**: Notice that the "deployed" USDC is added back to the calculation. This ensures that capital deployed into active VRDIs still backs the tokens, preventing a temporary devaluation during productive lending.`
        },
        {
            heading: 'VRDI Lifecycle Management',
            content: `The Reserve manages the complete lifecycle of a VRDI from creation to closure.

### Initialize VRDI (Verbatim)
\`\`\`solidity
function initializeVRDI(
    uint256 dioId, uint256 principalUSDC, ..., uint256[] memory phaseAmountsUSDC
) external onlyHighTable {
    require(IERC20(usdcAddr).balanceOf(address(this)) >= principalUSDC, "RSRV: Insufficient USDC reserve");
    require(phaseAmountsUSDC.length > 0, "RSRV: Must have at least one phase");
    require(arraySum(phaseAmountsUSDC) == principalUSDC, "RSRV: Phase amounts must equal principal USDC");

    uint256 interest = (principalUSDC * interestRate) / 10000;
    uint256 totalRepaymentAmount = principalUSDC + interest;

    uint256 vrId = s.nextVRDIId++;
    vrdi.phases.push(); // Creates phases dynamically
    // ...
}
\`\`\`

### Close VRDI (Verbatim)
\`\`\`solidity
function closeVRDI(uint256 vrId) external {
    require(msg.sender == vrdi.debtor, "RSRV: Only debtor");
    require(!vrdi.isClosed, "RSRV: Already closed");
    for (uint256 i = 0; i < vrdi.phases.length; i++) {
        require(vrdi.phases[i].isComplete, "RSRV: Not all phases complete");
    }
    require(vrdi.depositedUSDC >= vrdi.totalRepaymentAmount, "RSRV: Insufficient USDC repayment");

    vrdi.isClosed = true;
    bool withinTimeline = block.timestamp <= vrdi.startTimestamp + vrdi.amortizationDuration;
    _unstakeTokens(vrdi.dioId); // Releases all staked tokens
    emit VRDIClosed(vrId, withinTimeline);
}
\`\`\`

**Educational Insight**: Note that only the **debtor** can close their own VRDI. The High Table cannot force a closure—they can only freeze or unfreeze. This protects debtor autonomy.`
        },
        {
            heading: 'Committee-Based Phase Approvals',
            content: `Each phase of a VRDI requires approval from the originally assigned committees.

### Approval Logic (Verbatim)
\`\`\`solidity
function approvePhaseCompletion(uint256 vrId, uint256 phaseIndex, string memory committeeName) external {
    require(IRENSNCEDRCTRY(address(this)).isCommitteeMember(committeeName, msg.sender), 
        "RSRV: Not committee member");

    // Verify committee was assigned to the original proposal
    RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[vrId];
    bool isAssignedCommittee = false;
    for (uint256 i = 0; i < proposal.assignedCommittees.length; i++) {
        if (keccak256(abi.encodePacked(proposal.assignedCommittees[i])) == 
            keccak256(abi.encodePacked(committeeName))) {
            isAssignedCommittee = true;
            break;
        }
    }
    require(isAssignedCommittee, "RSRV: Committee not assigned to DIO");

    vrdi.phases[phaseIndex].committeeApprovals[committeeName] = true;
    // ... check if all assigned committees approved ...
}
\`\`\`

**Educational Insight**: The use of \`keccak256(abi.encodePacked(...))\` for string comparison is the standard Solidity pattern. Direct string comparison (\`==\`) is not natively supported.`
        },
        {
            heading: 'Audit Verification Result',
            content: `The \`RENSNCERSRV\` facet is rated **High** risk due to its direct management of capital flows. Our review confirms:
*   **Capital Integrity**: All withdrawals are strictly bound to phase allocations.
*   **Debtor Protection**: Only debtors can close or make payments to their own VRDI.
*   **Accurate Accounting**: The \`calculateRedemptionPrice\` correctly accounts for deployed capital, preventing devaluation.`
        },
        {
            heading: 'Full Source Code',
            content: `
\`\`\`solidity
${RENSNCERSRV_SOURCE}
\`\`\`
`
        }
    ]
};
