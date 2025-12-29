import { RENSNCERPSTRY_SOURCE } from '@/assets/contracts';
import { ChapterData } from '../audit-chapters';

export const rensncerpstry: ChapterData = {
    id: 'rensncerpstry',
    number: '03',
    title: 'RENSNCERPSTRY',
    subtitle: 'The Ledger of a Weary Scribe',
    color: '#8B5CF6',
    symbol: 'TA.png',
    image: '/WhitePaperImages/1.webp',
    pullQuote: "I etch here the tales of tokens, DIOs, and VRDIs—dry as dust, yet alive with the pulse of our striving.",
    score: "10/10",
    riskLevel: "None",
    sections: [
        {
            heading: 'Contract Overview',
            content: `The \`RENSNCERPSTRY\` (Repository) is the protocol's central data dissemination layer. It follows the **Data Hub Design Pattern**, serving as a dedicated facet for viewing complex internal states without modifying them. 

This contract is critical for transparency, allowing any soul to peer into the "Ledger" and verify the status of tokens, debts, and governance proposals direct from the blockchain's immutable storage.`
        },
        {
            heading: 'Detailed Return Schemas',
            content: `To ensure that external observers can digest the complex binary state, the Repository defines high-fidelity structs for its return values.

### The VRDIDetails Schema (Verbatim)
This struct encapsulates the entire lifecycle and financial parameters of a Vault-Reliant Debt Instrument (VRDI).

\`\`\`solidity
struct VRDIDetails {
    uint256 dioId;              // The DIO it serves, its shadow debt
    uint256 principalUSDC;       // The USDC sworn, a patron's ransom
    uint256 principalMKVLI20;   // The tokens pledged, a glittering hoard
    uint256 interestRate;       // Time's cruel tax, in basis points
    uint256 totalRepaymentAmount; // The full burden, principal and toll combined
    address debtor;             // The soul bound, their name a weight
    bool isFrozen;              // A frost upon its breath, motion stilled
    bool isClosed;              // A tale ended, its chapters sealed
    uint256 depositedUSDC;       // USDC repaid, a growing offering
    uint256 startTimestamp;     // The hour of its birth, time's first mark
    uint256 amortizationDuration; // Their dream of time, a soft horizon
    uint256 deferralPeriod;     // A grace before the storm, fleeting and frail
    uint256 activePhaseIndex;   // The chapter now alive, a flame in the dark
}
\`\`\`

### Governance Approval Schemas
\`\`\`solidity
struct PhaseCommitteeApprovalStatus {
    string committeeName;   // The name of the guild
    bool isApproved;        // Their judgment on this phase: a nod or a silence
}
\`\`\``
        },
        {
            heading: 'Meticulous Logic Analysis',
            content: `### 1. Unified Reserve Query
Checking the protocol's liquidity (Reserve) requires interacting with external ERC20 contracts. Note the precise requirement check.

\`\`\`solidity
function getUSDCReserve() external view returns (uint256 reserve) {
    address usdcAddr = RENSNCEDAOSTRG.layout().usdcTokenAddress;
    require(usdcAddr != address(0), "RPSTRY: USDC address not set in storage");
    return IERC20(usdcAddr).balanceOf(address(this)); 
}
\`\`\`

### 2. Multi-Facet Proposal Discovery
This function demonstrates "mad educational" logic—traversing an original Proposal's assigned judges to check current Phase approvals for a birthed VRDI.

\`\`\`solidity
function getVRDIPhaseAllCommitteeApprovals(uint256 vrId, uint256 phaseIndex) 
    external view returns (PhaseCommitteeApprovalStatus[] memory statuses) 
{
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();

    // Verbatim Requirement Checks
    require(s.vrdis[vrId].dioId != 0, "RPSTRY: VRDI does not exist or not initialized");
    require(phaseIndex < s.vrdis[vrId].phases.length, "RPSTRY: Phase index out of bounds for VRDI");
    require(s.proposals[vrId].submitter != address(0), "RPSTRY: Original proposal for VRDI not found");

    string[] storage assignedCommittees = s.proposals[vrId].assignedCommittees;
    uint256 committeeCount = assignedCommittees.length;
    statuses = new PhaseCommitteeApprovalStatus[](committeeCount);

    RENSNCEDAOSTRG.Phase storage phase = s.vrdis[vrId].phases[phaseIndex];

    for (uint256 i = 0; i < committeeCount; i++) {
        string storage committeeName = assignedCommittees[i];
        statuses[i] = PhaseCommitteeApprovalStatus({
            committeeName: committeeName,
            isApproved: phase.committeeApprovals[committeeName]
        });
    }
}
\`\`\`

### 3. Enumerated Ownership
Tracing "Owned Tokens" involves using the \`EnumerableSet\` library to convert storage sets into memory arrays for the UI.

\`\`\`solidity
function getOwnedTokens(address account) external view returns (uint256[] memory tokenIds) {
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
    uint256 length = EnumerableSet.length(s.ownedTokens[account]);
    tokenIds = new uint256[](length);
    for (uint256 i = 0; i < length; i++) {
        tokenIds[i] = EnumerableSet.at(s.ownedTokens[account], i); // Each piece named
    }
    return tokenIds;
}
\`\`\``
        },
        {
            heading: 'Educational Insight: Mapping to Detail',
            content: `The Repository uses a specific **Struct Mapping Pattern**. While the internal storage struct (\`VRDI\`) contains an array of \`Phases\`, it is prohibitively expensive (or impossible in some Solidity versions) to return a struct containing a nested dynamic array in a single call. 

The Repository solves this by extracting the "flat" metadata into \`VRDIDetails\` and providing a separate function, \`getVRDIPhases\`, to query the "chapter" data. This ensures maximum compatibility with all blockchain clients and lower-level execution environments.`
        },
        {
            heading: 'Audit Verification Result',
            content: `The \`RENSNCERPSTRY\` facet is architecturally sound and carries **Zero Financial Risk**. 
*   **Encapsulation**: It strictly adheres to "View-Only" patterns.
*   **Precision**: Data is surfaced with 1:1 fidelity to the internal storage layout.
*   **Verifiability**: It provides the ultimate "Audit-Trail" for every asset and proposal in the RENSNCEDAO ecosystem.`
        },
        {
            heading: 'Full Source Code',
            content: `
\`\`\`solidity
${RENSNCERPSTRY_SOURCE}
\`\`\`
`
        }
    ]
};
