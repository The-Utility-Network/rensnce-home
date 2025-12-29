// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "./RENSNCEDAOSTRG.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@solidstate/contracts/token/ERC20/metadata/ERC20MetadataStorage.sol";
import "@solidstate/contracts/token/ERC20/base/ERC20BaseStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title RENSNCERPSTRY - The Ledger of a Weary Scribe
 * @dev Behold, ye seekers of truth, the RENSNCERPSTRY—a brittle parchment where the DAO's secrets 
 *      are scrawled in fading ink. I, a weary scribe of this new Renaissance, etch here the tales 
 *      of tokens, DIOs, VRDIs, and proposals—dry as dust, yet alive with the pulse of our striving. 
 *      Each query unveils a fragment of our grand tapestry, a labor of patience destined to endure 
 *      until the last quill snaps and the muses fall silent.
 */
contract RENSNCERPSTRY {
    using EnumerableSet for EnumerableSet.UintSet;

    /**
     * @dev A tome within a tome—the full chronicle of a VRDI's life, bound in USDC's shadow. 
     *      I carve this vessel to bear its weight, lest the stack crumble beneath my toil.
     */
    struct VRDIDetails {
        uint256 dioId;              // The DIO it serves, its shadow debt
        uint256 principalUSDC;       // The USDC sworn, a patron's ransom
        uint256 principalMKVLI20;   // The tokens pledged, a glittering hoard
        uint256 interestRate;       // Time's cruel tax, in basis points
        uint256 totalRepaymentAmount; // The full burden, principal and toll combined (in USDC terms)
        address debtor;             // The soul bound, their name a weight
        bool isFrozen;              // A frost upon its breath, motion stilled
        bool isClosed;              // A tale ended, its chapters sealed
        uint256 depositedUSDC;       // USDC repaid, a growing offering
        uint256 startTimestamp;     // The hour of its birth, time's first mark
        uint256 amortizationDuration; // Their dream of time, a soft horizon
        uint256 deferralPeriod;     // A grace before the storm, fleeting and frail
        uint256 activePhaseIndex;   // The chapter now alive, a flame in the dark
    }

    /**
     * @dev I unveil a token's past—the DIOs it has served, each a mark upon its soul. 
     *      My quill trembles, tracing chains long forged in shadow.
     * @param tokenId The token to query, a relic of our craft
     * @return dioIds An array of DIO IDs, a dance of debts across its days
     */
    function getDIOMarkers(uint256 tokenId) external view returns (uint256[] memory dioIds) {
        return RENSNCEDAOSTRG.layout().tokenToDIOs[tokenId]; // A history unrolled, faint as memory
    }

    /**
     * @dev Is this token bound or free? A simple glance into its chains, my eyes weary from the task. 
     * @param tokenId The token to judge, its fate a single stroke
     * @return staked True if shackled, false if it roams the ether unbound
     */
    function isTokenStaked(uint256 tokenId) external view returns (bool staked) {
        return RENSNCEDAOSTRG.layout().tokenToStakedDIO[tokenId] != 0; // A yoke or none, a fleeting truth
    }

    /**
     * @dev Which DIO claims this token? I peer into its current master, my ledger groaning under scrutiny. 
     * @param tokenId The token to query, a servant or a free soul
     * @return dioId The DIO ID, or 0 if unbound, a name whispered or lost
     */
    function getStakedDIO(uint256 tokenId) external view returns (uint256 dioId) {
        return RENSNCEDAOSTRG.layout().tokenToStakedDIO[tokenId]; // A name, or silence in the vault
    }

    /**
     * @dev I gather the flock—tokens staked to a DIO, a legion under one banner. 
     *      My hands falter, counting each soul pledged to the shadow debt.
     * @param dioId The DIO to summon, its dominion laid bare
     * @return tokenIds An array of token IDs, bound in service to their lord
     */
    function getStakedTokensForDIO(uint256 dioId) external view returns (uint256[] memory tokenIds) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        uint256 length = EnumerableSet.length(s.dioToStakedTokens[dioId]);
        tokenIds = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            tokenIds[i] = EnumerableSet.at(s.dioToStakedTokens[dioId], i); // Each soul counted, a weary toll
        }
        return tokenIds; // The roll unfurls, a litany of servitude
    }

    /**
     * @dev I recount a holder's stakes—tokens pledged to a VRDI, call by call. 
     *      My quill scratches a labyrinth of loyalty, each mark a sacrifice.
     * @param vrId The VRDI to query, its tale enriched by offerings
     * @param holder The soul who offered, their name etched in the dust
     * @return tokenIdRecords A 2D array, each pledge a weary note in my endless tome
     */
    function getStakingRecords(uint256 vrId, address holder) external view returns (uint256[][] memory tokenIdRecords) {
        return RENSNCEDAOSTRG.layout().stakingRecords[vrId][holder]; // A ledger of sacrifice, heavy with intent
    }

    /**
     * @dev I lay bare a VRDI's tale—its debts, its masters, its state, its time-worn path. 
     *      No memory dares hold its maps, so I bind its essence in a single scroll, my voice a whisper.
     * @param vrId The VRDI to unveil, a pact carved in ether's fire
     * @return details The full chronicle, a tome of its existence borne from the vault
     */
    function getVRDIDetails(uint256 vrId) external view returns (VRDIDetails memory details) {
        RENSNCEDAOSTRG.VRDI storage vrdi = RENSNCEDAOSTRG.layout().vrdis[vrId]; // Direct from the vault
        details = VRDIDetails(
            vrdi.dioId,
            vrdi.principalUSDC,
            vrdi.principalMKVLI20,
            vrdi.interestRate,
            vrdi.totalRepaymentAmount,
            vrdi.debtor,
            vrdi.isFrozen,
            vrdi.isClosed,
            vrdi.depositedUSDC,
            vrdi.startTimestamp,
            vrdi.amortizationDuration,
            vrdi.deferralPeriod,
            vrdi.activePhaseIndex
        ); // A scroll unrolled, heavy with truth, its every line a labor
    }

    /**
     * @dev I glimpse a VRDI's phases—each step a labor, a proof, a judgment. 
     *      My quill falters, tracing the arc of toil across its chapters.
     * @param vrId The VRDI to query, its saga unfolded
     * @return phaseAmountsUSDC The USDC pledged per phase, a measure of intent
     * @return isActive Whether each phase yet burns, a living flame
     * @return isComplete Whether each phase lies finished, a tale concluded
     * @return evidenceLinks The proofs offered, fragile scrolls of effort
     * @return withdrawnAmountsUSDC USDC claimed, a tally of their grasp
     * @return completionTimestamps When each phase closed, or 0 if yet open
     */
    function getVRDIPhases(uint256 vrId) external view returns (
        uint256[] memory phaseAmountsUSDC,
        bool[] memory isActive,
        bool[] memory isComplete,
        string[] memory evidenceLinks,
        uint256[] memory withdrawnAmountsUSDC,
        uint256[] memory completionTimestamps
    ) {
        RENSNCEDAOSTRG.VRDI storage vrdi = RENSNCEDAOSTRG.layout().vrdis[vrId];
        uint256 phaseCount = vrdi.phases.length;
        phaseAmountsUSDC = new uint256[](phaseCount);
        isActive = new bool[](phaseCount);
        isComplete = new bool[](phaseCount);
        evidenceLinks = new string[](phaseCount);
        withdrawnAmountsUSDC = new uint256[](phaseCount);
        completionTimestamps = new uint256[](phaseCount);
        for (uint256 i = 0; i < phaseCount; i++) {
            phaseAmountsUSDC[i] = vrdi.phases[i].amountUSDC;
            isActive[i] = vrdi.phases[i].isActive;
            isComplete[i] = vrdi.phases[i].isComplete;
            evidenceLinks[i] = vrdi.phases[i].evidenceLink;
            withdrawnAmountsUSDC[i] = vrdi.phases[i].withdrawnUSDC;
            completionTimestamps[i] = vrdi.phases[i].completionTimestamp;
        }
        return (phaseAmountsUSDC, isActive, isComplete, evidenceLinks, withdrawnAmountsUSDC, completionTimestamps); // A chronicle of steps, etched in time
    }

    /**
     * @dev I peer at the next VRDI's birth—a number waiting in the shadows, my ledger poised. 
     * @return nextId The ledger's next mark, a tale yet unwritten
     */
    function getNextVRDIId() external view returns (uint256 nextId) {
        return RENSNCEDAOSTRG.layout().nextVRDIId; // A page yet unturned, heavy with promise
    }

    /**
     * @dev I unveil a proposal's husk—its dreams, its judges, its fate, its masters' override. 
     *      My hands tremble, recounting ambition's fragile arc.
     * @param proposalId The proposal to query, a dream scrawled in haste
     * @return submitter The dreamer's name, a fleeting claim
     * @return documentLink Their scribbled intent, a parchment frail
     * @return assignedCommittees The chorus of judges, voices raised
     * @return highTableApproved The masters' nod, rare and coveted
     * @return highTableVetoed Their cold refusal, swift as winter
     * @return dioId The DIO born, if any, a shadow debt
     * @return dioParams The debt's terms, a pact of ether and time
     * @return totalMKVLI20 The tokens pledged, a hoard amassed
     * @return highTableOverride The High Table's rare edict, overriding all
     * @return highTableJustification Their reasoned scroll, a testament to will
     */
    function getProposalDetails(uint256 proposalId) external view returns (
        address submitter,
        string memory documentLink,
        string[] memory assignedCommittees,
        bool highTableApproved,
        bool highTableVetoed,
        uint256 dioId,
        RENSNCEDAOSTRG.DIOParams memory dioParams,
        uint256 totalMKVLI20,
        bool highTableOverride,
        string memory highTableJustification
    ) {
        RENSNCEDAOSTRG.Proposal storage p = RENSNCEDAOSTRG.layout().proposals[proposalId];
        return (
            p.submitter,
            p.documentLink,
            p.assignedCommittees,
            p.highTableApproved,
            p.highTableVetoed,
            p.dioId,
            p.dioParams,
            p.totalMKVLI20,
            p.highTableOverride,
            p.highTableJustification
        ); // A fragile tale laid bare, its every stroke a labor
    }

    /**
     * @dev Did a guild assent? I check their mark upon the proposal's scroll, my eyes dim with dust. 
     * @param proposalId The dream to judge, its fate in question
     * @param committeeName The guild in question, its voice a whisper
     * @return approved Their nod, or silence, a faint echo in the hall
     */
    function getCommitteeApproval(uint256 proposalId, string memory committeeName) external view returns (bool approved) {
        return RENSNCEDAOSTRG.layout().proposals[proposalId].committeeApprovals[committeeName]; // A whisper of consent, or naught
    }

    /**
     * @dev I glimpse the next proposal's dawn—another tale awaits its ink, my quill poised in dread. 
     * @return nextId The scroll's next number, a burden yet to bear
     */
    function getNextProposalId() external view returns (uint256 nextId) {
        return RENSNCEDAOSTRG.layout().nextProposalId; // The ledger grows ever long, my rest deferred
    }

    /**
     * @dev I count the DAO's hoard—USDC piled in the vault (the diamond itself, via RSRV facet logic). 
     *      My hands falter, weighing wealth I cannot hold.
     * @return reserve The USDC amassed in the diamond, a gleam in the dark or a hollow echo
     */
    function getUSDCReserve() external view returns (uint256 reserve) {
        address usdcAddr = RENSNCEDAOSTRG.layout().usdcTokenAddress;
        require(usdcAddr != address(0), "RPSTRY: USDC address not set in storage");
        return IERC20(usdcAddr).balanceOf(address(this)); 
    }

    /**
     * @dev For a given VRDI and its phase, I seek the whispered assent of a specific guild.
     *      Did their named council lend its voice to this chapter of the VRDI's saga?
     * @param vrId The VRDI whose tale we inspect.
     * @param phaseIndex The chapter (phase) within the VRDI's chronicle.
     * @param committeeName The name of the guild whose judgment we seek.
     * @return approved True if their seal of approval is found, false if their voice is absent or dissenting.
     */
    function getVRDIPhaseCommitteeApproval(
        uint256 vrId,
        uint256 phaseIndex,
        string memory committeeName
    ) external view returns (bool approved) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(s.vrdis[vrId].dioId != 0, "RPSTRY: VRDI does not exist or not initialized");
        require(phaseIndex < s.vrdis[vrId].phases.length, "RPSTRY: Phase index out of bounds");

        return s.vrdis[vrId].phases[phaseIndex].committeeApprovals[committeeName];
    }

    /**
     * @dev A portrait of a phase's judgment: the guilds assigned to the VRDI's founding proposal,
     *      and the verdict each has cast upon this specific chapter of its labors.
     */
    struct PhaseCommitteeApprovalStatus {
        string committeeName;   // The name of the guild, as etched in the original proposal
        bool isApproved;        // Their judgment on this phase: a nod or a silence
    }

    /**
     * @dev I unveil the full chorus of judgment for a VRDI's phase, 
     *      listing all committees from its founding proposal and their verdict on this specific chapter.
     *      A grand tableau of assent or dissent, laid bare for all to see.
     * @param vrId The VRDI whose phase we scrutinize. This ID is assumed to match the original proposal ID.
     * @param phaseIndex The specific chapter (phase) of the VRDI's journey.
     * @return statuses An array detailing each assigned committee and their approval status for this phase.
     */
    function getVRDIPhaseAllCommitteeApprovals(
        uint256 vrId, 
        uint256 phaseIndex
    ) external view returns (PhaseCommitteeApprovalStatus[] memory statuses) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();

        // Ensure the VRDI itself has been initialized
        require(s.vrdis[vrId].dioId != 0, "RPSTRY: VRDI does not exist or not initialized");
        // Ensure the phase index is valid for the given VRDI
        require(phaseIndex < s.vrdis[vrId].phases.length, "RPSTRY: Phase index out of bounds for VRDI");
        // Ensure the corresponding Proposal exists, as it holds the list of assigned committees
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
        // The full scroll of judgments, returned for perusal.
    }

    /**
     * @dev I list a soul's treasures—tokens claimed, each a burden or a boast in my weary tally. 
     * @param account The holder to query, their name a mark in my tome
     * @return tokenIds An array of their hoard, relics of their striving
     */
    function getOwnedTokens(address account) external view returns (uint256[] memory tokenIds) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        uint256 length = EnumerableSet.length(s.ownedTokens[account]);
        tokenIds = new uint256[](length);
        for (uint256 i = 0; i < length; i++) {
            tokenIds[i] = EnumerableSet.at(s.ownedTokens[account], i); // Each piece named, a weight counted
        }
        return tokenIds; // A gallery of possession, etched in shadow
    }

    /**
     * @dev Who claims this token? I trace its master in the ledger's dust, my quill a weary guide. 
     * @param tokenId The token to seek, a relic of our craft
     * @return owner The soul who holds it, their name a seal upon its fate
     */
    function ownerOf(uint256 tokenId) external view returns (address owner) {
        return RENSNCEDAOSTRG.layout().tokenOwner[tokenId]; // A name etched deep, a bond unbroken
    }

    /**
     * @dev I unveil the token's marks—name, symbol, decimals—small truths of our craft, enduring as stone. 
     * @return name The title it bears, a whisper of its birth
     * @return symbol Its sigil, a mark upon the ether
     * @return decimals Its measure, a scale of its worth
     */
    function getTokenMetadata() external view returns (
        string memory name,
        string memory symbol,
        uint8 decimals
    ) {
        ERC20MetadataStorage.Layout storage e = ERC20MetadataStorage.layout();
        return (e.name, e.symbol, e.decimals); // A signature enduring, my quill's faint echo
    }

    /**
     * @dev I recount a DIO's tale—its mark and the tokens it binds, a shadow cast long. 
     *      My hands tremble, counting souls pledged to its will.
     * @param dioId The DIO to query, a debt's dark heart
     * @return id Its number, a crude stamp of eternity
     * @return stakedTokenCount The souls it claims, a weary tally
     * @return stakedTokens Their names, arrayed like vassals in a hall
     */
    function getDIOInfo(uint256 dioId) external view returns (
        uint256 id,
        uint256 stakedTokenCount,
        uint256[] memory stakedTokens
    ) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        id = dioId;
        stakedTokenCount = EnumerableSet.length(s.dioToStakedTokens[dioId]);
        stakedTokens = new uint256[](stakedTokenCount);
        for (uint256 i = 0; i < stakedTokenCount; i++) {
            stakedTokens[i] = EnumerableSet.at(s.dioToStakedTokens[dioId], i); // Each bound soul listed
        }
    }

    /**
     * @dev I tally a soul's wealth—their balance of tokens, a hoard amassed or squandered. 
     *      My ledger groans, counting what they clutch or cast aside.
     * @param account The holder to weigh, their name a stroke in my tome
     * @return balance Their total in tokens, a measure of their reach
     */
    function getTokenBalance(address account) external view returns (uint256 balance) {
        return ERC20BaseStorage.layout().balances[account]; // A sum of their striving, heavy or light
    }

    /**
     * @dev I count the tokens birthed—the total supply, a measure of our craft's reach. 
     *      My quill falters, numbering works I can scarce recall.
     * @return totalSupply The sum of all tokens, a legacy in ether's weave
     */
    function getTotalSupply() external view returns (uint256 totalSupply) {
        return ERC20BaseStorage.layout().totalSupply; // A legacy in numbers, vast or frail
    }

    /**
     * @dev I list the roles of power—a litany of titles, each a rung on the ladder of ambition. 
     *      My voice grows hoarse, reciting their pomp.
     * @return roles An array of all role names, a chorus of command
     */
    function getAllRoles() external view returns (string[] memory roles) {
        return RENSNCEDAOSTRG.layout().allRoles; // The hierarchy unveiled, a weighty scroll
    }

    /**
     * @dev I name a role's master—who wields its reins, a petty yet potent truth in this hall. 
     *      My quill scratches, tracing chains of power.
     * @param role The role to query, a mantle of duty
     * @return adminRole The title of its overseer, a higher rung in shadow
     */
    function getRoleAdmin(string memory role) external view returns (string memory adminRole) {
        return RENSNCEDAOSTRG.layout().roles[role].adminRole; // A chain of command, faint but firm
    }

    /**
     * @dev I list a role's bearers—those who wear its mantle, humble or proud beneath my gaze. 
     *      My hands ache, naming each soul in turn.
     * @param role The role to query, a title borne by many
     * @return members An array of their addresses, a fellowship revealed
     */
    function getRoleMembers(string memory role) external view returns (address[] memory members) {
        RENSNCEDAOSTRG.RoleData storage roleData = RENSNCEDAOSTRG.layout().roles[role];
        uint256 length = EnumerableSet.length(roleData.members);
        members = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            members[i] = EnumerableSet.at(roleData.members, i); // Each soul named, a mark in dust
        }
        return members; // A fellowship revealed, their names a litany
    }

    /**
     * @dev I fetch a member's name within their role—a flourish on the roster, faint as a whisper. 
     *      My quill hovers, seeking their mark.
     * @param role The role to query, a mantle they bear
     * @param member The soul to name, a shadow in the hall
     * @return memberName Their title, if any, a flourish or a void
     */
    function getMemberName(string memory role, address member) external view returns (string memory memberName) {
        return RENSNCEDAOSTRG.layout().roles[role].memberNames[member]; // A mark of identity, or silence
    }

    /**
     * @dev I count the guilds—how many banners rise in this hall, each a spire of ambition? 
     *      My eyes blur, tallying their pomp.
     * @return count The total of committees, a measure of our discord
     */
    function getCommitteeCount() external view returns (uint256 count) {
        return RENSNCEDAOSTRG.layout().nextCommitteeId; // A tally of ambition, my quill's lament
    }
}