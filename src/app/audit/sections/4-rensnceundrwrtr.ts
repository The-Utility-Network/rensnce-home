import { RENSNCEUNDRWRTR_SOURCE } from '@/assets/contracts';
import { ChapterData } from '../audit-chapters';

export const rensnceundrwrtr: ChapterData = {
    id: 'rensnceundrwrtr',
    number: '04',
    title: 'RENSNCEUNDRWRTR',
    subtitle: 'The Atelier of Proposals and Debt',
    color: '#10B981',
    symbol: 'TA.png',
    image: '/WhitePaperImages/3.webp',
    pullQuote: "In this age where human creativity flares against the dark, this facet stands as a forge of dreams and debts.",
    score: "10/10",
    riskLevel: "Medium",
    sections: [
        {
            heading: 'Contract Overview',
            content: `The \`RENSNCEUNDRWRTR\` (Underwriter) facet is the protocol's engine for **Proposal Lifecycle Management**. It is responsible for the birth of Debt Instrument Objects (DIOs). 

It enforces a rigorous "Separation of Concerns" through a three-party interaction:
1.  **Members**: Propose the vision.
2.  **Committees**: Judge the technical and creative merit.
3.  **The High Table**: Provides final financial authorization and acts as the ultimate guarantor of protocol safety.`
        },
        {
            heading: 'The Underwriting Workflow',
            content: `The underwriting process is a journey from a "Spark" (Proposal) to a "Form" (DIO).

### 1. Proposal Submission
Only those with a recognized **Member** title can seed the ledger with a new proposal.

\`\`\`solidity
function submitProposal(string memory documentLink) external onlyMember {
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
    uint256 proposalId = s.nextProposalId++; // A new mark upon the ledger
    RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
    proposal.submitter = msg.sender;
    proposal.documentLink = documentLink; // The dream, frail and bare
    emit ProposalSubmitted(proposalId, msg.sender, documentLink);
}
\`\`\`

### 2. Hierarchical Validation
The High Table assigns committees (Guilds) to review the proposal. All assigned committees must approve before a DIO can be birthed, unless a High Table override is performed.

\`\`\`solidity
function _checkCommitteeApprovals(RENSNCEDAOSTRG.Proposal storage proposal, uint256 proposalIdToDebug) 
    internal returns (bool) 
{
    uint256 assignedCount = proposal.assignedCommittees.length;
    if (assignedCount == 0) return true; // No committees, no need for song

    for (uint256 i = 0; i < assignedCount; i++) {
        string memory committeeNameInLoop = proposal.assignedCommittees[i];
        if (!proposal.committeeApprovals[committeeNameInLoop]) {
            return false; // A silence damns it
        }
    }
    return true; // The chorus sings in unison
}
\`\`\``
        },
        {
            heading: 'High Table Powers: Veto & Override',
            content: `Crucial to the security of the DAO are the High Table's administrative overrides. These are intended for emergency situations or to bypass social stagnation (gridlock).

### The Override Edict (Verbatim)
The High Table can bypass the committees, but only if they provide a permanent on-chain justification.

\`\`\`solidity
function overrideCommitteeApproval(uint256 proposalId, string memory justification) 
    external onlyHighTable proposalExists(proposalId) notInitialized(proposalId) notVetoed(proposalId) 
{
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
    RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
    require(bytes(justification).length > 0, "UNDRWRTR: Justification required"); 
    
    proposal.highTableOverride = true; // Their will overrides the chorus
    proposal.highTableJustification = justification; // Their words, a heavy mark
    emit HighTableOverride(proposalId, justification);
}
\`\`\`

**Educational Insight**: This pattern ensures that while the High Table has power, their actions are **Auditable**. A "Justification" is required by the code, meaning their reasons are etched into the blockchain forever alongside their signature.`
        },
        {
            heading: 'The Finalization Rite',
            content: `When conditions are met, the \`finalizeProposal\` function closes the underwriting chapter and officially births the DIO.

\`\`\`solidity
function finalizeProposal(
    uint256 proposalId,
    RENSNCEDAOSTRG.DIOParams memory params,
    address[] memory holders,
    uint256[] memory amounts
) external onlyHighTable proposalExists(proposalId) notVetoed(proposalId) {
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
    RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
    
    // Core Engine Logic: Override OR Full Chorus assent
    require(proposal.highTableOverride || _checkCommitteeApprovals(proposal, proposalId), 
        "UNDRWRTR: Neither committees nor High Table approved");
        
    _finalizeProposal(proposalId, params, holders, amounts); 
}
\`\`\`

**Educational Insight**: The \`block.timestamp\` is used as the \`dioId\`. This is a unique "Signature of Time" that marks the exact moment a debt moved from concept to reality.`
        },
        {
            heading: 'Audit Verification Result',
            content: `The \`RENSNCEUNDRWRTR\` facet is rated **Medium** risk primarily due to its authority-heavy nature. 
*   **Access Control**: Perfect implementation of the \`onlyMember\` and \`onlyHighTable\` modifiers.
*   **State Protection**: The \`notInitialized\` and \`notVetoed\` modifiers prevent double-birthing or reviving snuffed proposals.
*   **Debugability**: The inclusion of specific \`DebugCheckCommitteeApproval\` events demonstrates a high standard for on-chain observability.`
        },
        {
            heading: 'Full Source Code',
            content: `
\`\`\`solidity
${RENSNCEUNDRWRTR_SOURCE}
\`\`\`
`
        }
    ]
};
