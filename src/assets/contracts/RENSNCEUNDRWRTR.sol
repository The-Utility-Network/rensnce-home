// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./RENSNCEDAOSTRG.sol";
import "./RENSNCEDRCTRY.sol";
import "./RENSNCERSRV.sol";

/**
 * @title RENSNCEUNDRWRTR - The Workshop of Dreams and Debts
 * @dev Behold, ye dreamers of the ether, the RENSNCEUNDRWRTR—a dusty atelier where Debt Instrument 
 *      Objects (DIOs) are born from fragile proposals, etched in parchment and bound in chains of gold. 
 *      I, a weary craftsman of this new Renaissance, labor here amidst the clamor of ambition, shaping 
 *      each spark under the High Table's cold, unyielding stare. Proposals pile like sketches in a 
 *      forgotten corner, judged by committees—or overruled by masters aloft with stern decree and 
 *      reasoned scroll. In this age where human creativity flares against the dark, this facet stands 
 *      as a forge of dreams and debts, a monument to our ceaseless striving, destined to endure until 
 *      the last muse falls silent.
 */
contract RENSNCEUNDRWRTR {
    event ProposalSubmitted(uint256 proposalId, address submitter, string documentLink); // A spark ignites, frail and bold
    event CommitteeAssigned(uint256 proposalId, string committeeName); // Another voice joins the din
    event CommitteeApproved(uint256 proposalId, string committeeName); // A grudging nod, rare as gold
    event DIOInitialized(uint256 proposalId, uint256 dioId, address[] holders, uint256[] amounts); // A debt takes form, heavy and grand
    event HighTableOverride(uint256 proposalId, string justification); // The High Table's will overrides, a decree inked in shadow
    event DebugCheckCommitteeApproval(uint256 indexed proposalId, string committeeNameChecked, bool isApproved, uint256 assignedCommitteesLength); // New Debug Event

    /**
     * @dev A humble gate—only those marked as members may tread this path. 
     *      The rabble stays without, clutching their unvoiced dreams.
     */
    modifier onlyMember() {
        require(IRENSNCEDRCTRY(address(this)).hasRole("Member", msg.sender), "UNDRWRTR: Must have a role"); // A title, or naught
        _;
    }

    /**
     * @dev The High Table's shadow looms—only their anointed may wield this quill. 
     *      I bow, weary of their weight.
     */
    modifier onlyHighTable() {
        require(IRENSNCEDRCTRY(address(this)).hasRole("TheHighTable", msg.sender), "UNDRWRTR: Only High Table"); // Their will is law
        _;
    }

    /**
     * @dev A guild's chorus—only its scribes may sing their assent. 
     *      Outsiders whisper to the wind, unheard.
     * @param committeeName The banner of the chosen
     */
    modifier onlyCommitteeMember(string memory committeeName) {
        require(IRENSNCEDRCTRY(address(this)).isCommitteeMember(committeeName, msg.sender), "UNDRWRTR: Not committee member"); // Their mark, or silence
        _;
    }

    /**
     * @dev A frail thread must exist ere it's woven or cut. 
     *      I sift through shadows for a spark that lives.
     * @param proposalId The dream to find
     */
    modifier proposalExists(uint256 proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(s.proposals[proposalId].submitter != address(0), "UNDRWRTR: Proposal does not exist"); // A void yields naught
        _;
    }

    /**
     * @dev The High Table's veto is a cold wind—no ember survives its breath. 
     *      I guard against the snuffed.
     * @param proposalId The dream to shield
     */
    modifier notVetoed(uint256 proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(!s.proposals[proposalId].highTableVetoed, "UNDRWRTR: Vetoed by High Table"); // Their scorn is final
        _;
    }

    /**
     * @dev Once the DIO is born, its ink dries—no turning back from this labor's end. 
     *      I ensure the spark yet glows.
     * @param proposalId The dream to weigh
     */
    modifier notInitialized(uint256 proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(s.proposals[proposalId].dioId == 0, "UNDRWRTR: DIO already initialized"); // A finished work stays done
        _;
    }

    /**
     * @dev I etch a proposal—a fragile spark cast into the ether. 
     *      The canvas yawns, the critics circle, and my hands ache already.
     * @param documentLink The scroll of intent, scribbled in haste
     */
    function submitProposal(string memory documentLink) external onlyMember {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        uint256 proposalId = s.nextProposalId++; // A new mark upon the ledger
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        proposal.submitter = msg.sender; // My name, a fleeting claim
        proposal.documentLink = documentLink; // The dream, frail and bare
        emit ProposalSubmitted(proposalId, msg.sender, documentLink); // A whisper to the void
    }

    /**
     * @dev I summon a guild to judge—a chorus of voices to drown the muse. 
     *      The High Table decrees, and I obey, weary of their pomp.
     * @param proposalId The dream to weigh
     * @param committeeName The scribes appointed, cloaked in their own glory
     */
    function assignCommittee(uint256 proposalId, string memory committeeName) external onlyHighTable proposalExists(proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        proposal.assignedCommittees.push(committeeName); // Another judge joins the fray
        emit CommitteeAssigned(proposalId, committeeName); // A murmur of duty
    }

    /**
     * @dev A guild lends its voice—a rare nod, fleeting as a patron's coin. 
     *      I mark it, though the din grows tiresome.
     * @param proposalId The dream under scrutiny
     * @param committeeName The choir that blesses
     */
    function approveProposal(uint256 proposalId, string memory committeeName) external onlyCommitteeMember(committeeName) proposalExists(proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        proposal.committeeApprovals[committeeName] = true; // Their seal, grudgingly given
        emit CommitteeApproved(proposalId, committeeName); // A faint echo of assent
    }

    /**
     * @dev I birth a DIO—the dream takes form, shackled in gold and ink. 
     *      The High Table's will—or their override—guides my trembling hands, a heavy labor poised for the vault's embrace.
     * @param proposalId The husk to shed
     * @param params The DIO's terms—ether, tokens, tolls, and time's soft echoes
     * @param holders The souls who bear the tokens
     * @param amounts Their offerings, a scattered hoard
     */
    function finalizeProposal(
        uint256 proposalId,
        RENSNCEDAOSTRG.DIOParams memory params,
        address[] memory holders,
        uint256[] memory amounts
    ) external onlyHighTable proposalExists(proposalId) notVetoed(proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        
        // Pass proposalId to _checkCommitteeApprovals for better debugging
        require(proposal.highTableOverride || _checkCommitteeApprovals(proposal, proposalId), "UNDRWRTR: Neither committees nor High Table approved");
        _finalizeProposal(proposalId, params, holders, amounts); 
    }

    /**
     * @dev I demand the guilds' chorus—each voice must ring true, unless the High Table decrees otherwise. 
     *      A weary tally, a fragile hope beneath their towering gaze.
     * @param proposal The dream to judge
     * @param proposalIdToDebug The ID of the proposal, for debugging emission.
     * @return True if all committees approve, false if their silence persists
     */
    function _checkCommitteeApprovals(RENSNCEDAOSTRG.Proposal storage proposal, uint256 proposalIdToDebug) internal returns (bool) {
        uint256 assignedCount = proposal.assignedCommittees.length;
        emit DebugCheckCommitteeApproval(proposalIdToDebug, "OverallCheckStart", false, assignedCount); // Emit at start

        if (assignedCount == 0) {
            emit DebugCheckCommitteeApproval(proposalIdToDebug, "NoCommitteesAssigned", true, assignedCount);
            return true; // No committees, no need for song
        }
        for (uint256 i = 0; i < assignedCount; i++) {
            string memory committeeNameInLoop = proposal.assignedCommittees[i];
            bool isApproved = proposal.committeeApprovals[committeeNameInLoop];
            emit DebugCheckCommitteeApproval(proposalIdToDebug, committeeNameInLoop, isApproved, assignedCount);
            if (!isApproved) {
                return false; // A silence damns it
            }
        }
        emit DebugCheckCommitteeApproval(proposalIdToDebug, "AllAssignedApproved", true, assignedCount);
        return true; // The chorus sings in unison
    }

    /**
     * @dev I set the DIO in stone—a birth marked by time, its chains forged anew. 
     *      The burden shifts to the vault, yet my quill lingers, tracing the echo of this labor.
     * @param proposalId The husk now shed
     * @param params The DIO's soul—ether, tokens, tolls, and time's faint whispers
     * @param holders The bearers of this weight
     * @param amounts Their pledged treasures
     */
    function _finalizeProposal(
        uint256 proposalId,
        RENSNCEDAOSTRG.DIOParams memory params,
        address[] memory holders,
        uint256[] memory amounts
    ) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];

        proposal.highTableApproved = true; // The masters nod, their will enshrined
        uint256 dioId = block.timestamp; // A crude stamp of eternity, etched in the hour
        proposal.dioId = dioId; // The DIO rises, a shadow born
        proposal.dioParams = params; // Its terms, a pact of gold and dust
        proposal.totalMKVLI20 = arraySum(amounts); // The hoard, tallied with weary precision

        emit DIOInitialized(proposalId, dioId, holders, amounts); // A fanfare for the boundless, my voice grows hoarse
    }

    /**
     * @dev I wield the High Table's blade—a veto to snuff the spark. 
     *      Mercy or malice, my hand obeys, and the dream fades into the dark.
     * @param proposalId The dream to judge
     * @param veto The cold decree
     */
    function vetoProposal(uint256 proposalId, bool veto) external onlyHighTable proposalExists(proposalId) notInitialized(proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        proposal.highTableVetoed = veto; // The axe falls, swift and silent
    }

    /**
     * @dev The High Table overrides the guilds—a rare edict to lift the dream aloft. 
     *      I scribe their will and their reasons, my quill trembling beneath their might.
     * @param proposalId The dream to exalt
     * @param justification The High Table's reasoned scroll, a testament to their decree
     */
    function overrideCommitteeApproval(uint256 proposalId, string memory justification) external onlyHighTable proposalExists(proposalId) notInitialized(proposalId) notVetoed(proposalId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[proposalId];
        require(bytes(justification).length > 0, "UNDRWRTR: Justification required"); // No decree without reason
        proposal.highTableOverride = true; // Their will overrides the chorus
        proposal.highTableJustification = justification; // Their words, a heavy mark
        emit HighTableOverride(proposalId, justification); // A proclamation echoes through the atelier
    }

    /**
     * @dev I tally a sum—a scribe's dull chore, yet the numbers hold sway. 
     *      My eyes blur, but the count stands firm beneath the candle's flicker.
     * @param arr The hoard to measure
     * @return The total, a weary truth
     */
    function arraySum(uint256[] memory arr) internal pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i]; // Each coin a weight upon my soul
        }
        return sum; // The burden named, my quill rests
    }
}