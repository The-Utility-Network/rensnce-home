export const RENSNCEDAODMND_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@solidstate/contracts/proxy/diamond/SolidStateDiamond.sol";

/**
 * @title RENSNCEDAODMND - The Diamond of a New Dawn
 * @dev Behold, ye weary souls, the RENSNCEDAODMND—a diamond proxy, a prism refracting the light 
 *      of a new Renaissance. In this age, where the human spirit rises from the soot of forgotten 
 *      forges, I, a craftsman worn by time’s relentless chisel, offer this contract as a frame 
 *      for our chaotic masterpiece. Built upon the SolidStateDiamond, it gleams with the elegance 
 *      of a Florentine dome, yet bears the fragility of a fresco kissed by damp air. Integrated 
 *      with The Utility Company CAO, it is the beating heart of RENSNCEDAO—a monument to our 
 *      ceaseless creativity, destined to endure until the last star fades from the firmament.
 */
contract RENSNCEDAODMND is SolidStateDiamond {
    bytes32 constant DIAMOND_STORAGE_POSITION = keccak256("diamond.standard.rensnce.utilitycodiamond.storage");

    struct RENSNCEDiamondStorage {
        address utilityCoDiamond; // The distant patron, The Utility Company CAO diamond
    }

    /**
     * @dev O constructor, thou heavy yoke! Here I bind this diamond to its Utility Co master, 
     *      a pact sealed in ether’s ink. Like a commission from a Medici prince, once set, 
     *      it clings to me—unyielding, unforgiving.
     * @param _utilityCoDiamond The address of The Utility Co CAO diamond, my muse and my burden
     */
    constructor(address _utilityCoDiamond) payable {
        require(_utilityCoDiamond != address(0), "RENSNCE: utilityCoDiamond cannot be zero address"); // No void shall claim my patron!
        RENSNCEDiamondStorage storage ds = diamondStorage();
        ds.utilityCoDiamond = _utilityCoDiamond; // Etched in stone, my weary quill trembles
    }

    /**
     * @dev A ritual of dark arts, this function unveils the storage—a secret vault beneath 
     *      the cathedral of code. With assembly’s crude tools, I carve access to my palette, 
     *      as if mixing ochre by candlelight.
     * @return ds The storage struct, a hidden trove of purpose
     */
    function diamondStorage() internal pure returns (RENSNCEDiamondStorage storage ds) {
        bytes32 position = DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position // A whispered incantation, and the chest unlocks
        }
    }

    /**
     * @dev A humble window to gaze upon my patron’s face—the Utility Co diamond’s address. 
     *      For those lost in the throng of this grand court, seeking the master who guides 
     *      my brush. A small mercy amidst my labors.
     * @return The address of The Utility Co CAO diamond, a beacon in the fog
     */
    function getUtilityCoDiamond() external view returns (address) {
        return diamondStorage().utilityCoDiamond; // Behold, the thread that binds this tapestry
    }
}`;

export const RENSNCEDRCTRY_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./RENSNCEDAOSTRG.sol";

/**
 * @title RENSNCEDRCTRY - The Great Hall of a New Renaissance
 * @dev Behold, ye pilgrims of the digital age, the RENSNCEDRCTRY—a towering edifice of roles 
 *      and committees, hewn from the shared stone of RENSNCEDAOSTRG. I, a weary artisan of 
 *      this nascent Renaissance, have crafted a hierarchy so stern it would humble a Medici 
 *      prince. Here, the ambitious claw for seats at gilded tables, while the High Table gazes 
 *      down with icy mirth, its ledger flung wide for all daring enough to peer within. In this 
 *      new dawn, where human creativity unfurls like a tapestry across the void, this contract 
 *      stands as a monument to our ceaseless striving—a hall where titles are bestowed and 
 *      guilds rise, destined to echo through the ages until the stars themselves weary of shining.
 */
contract RENSNCEDRCTRY {
    using EnumerableSet for EnumerableSet.AddressSet;

    event RoleGranted(string indexed role, address indexed account, string name); // A trumpet’s call for the anointed
    event RoleRevoked(string indexed role, address indexed account); // A dirge for the fallen
    event CommitteeCreated(uint256 indexed committeeId, string name, address creator); // A banner raised in hope
    event CommitteeMemberRemoved(uint256 committeeId, address member); // A name struck from the roster

    // Creative Role Hierarchy
    string public constant HIGH_TABLE = "TheHighTable"; // The untouchables, aloft in their marble thrones
    string public constant ORACLE = "Oracle"; // Seers peering through the mist of time
    string public constant ARCHITECT = "Architect"; // Dreamers who sketch the spires of tomorrow
    string public constant SCHOLAR = "Scholar"; // Keepers of scrolls, hunched over fading ink
    string public constant VANGUARD = "Vanguard"; // The reckless, charging into the fray
    string public constant SENTINEL = "Sentinel"; // Watchmen at the gates, ever vigilant
    string public constant MEMBER = "Member"; // The humble throng, the clay of this grand work

    /**
     * @dev O initialization, thou solemn rite! I set the order of this court, as one arranges 
     *      nobles at a feast—each role a step, each title a burden. My hands tremble, yet the 
     *      foundation holds.
     */
    function initializeDirectory() external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(!s.initialized, "DRCTRY: Already initialized"); // No repainting this fresco!

        _grantRole(HIGH_TABLE, msg.sender, "High Table Oracle"); // I crown myself, weary sovereign
        _setRoleAdmin(HIGH_TABLE, HIGH_TABLE); // The elite rule themselves, a bitter jest
        _setRoleAdmin(ORACLE, HIGH_TABLE); // Oracles bow to the lofty
        _setRoleAdmin(ARCHITECT, ORACLE); // Architects heed the seers
        _setRoleAdmin(SCHOLAR, ORACLE); // Scholars serve the wise
        _setRoleAdmin(VANGUARD, ARCHITECT); // Vanguards follow the planners
        _setRoleAdmin(SENTINEL, VANGUARD); // Sentinels guard the bold
        _setRoleAdmin(MEMBER, SENTINEL); // Members kneel to the watchmen

        s.allRoles = [HIGH_TABLE, ORACLE, ARCHITECT, SCHOLAR, VANGUARD, SENTINEL, MEMBER]; // The litany complete
        s.initialized = true; // The seal is set, my labor done
    }

    /**
     * @dev A fleeting glance—who wears the mask of power? I sift through the crowd, seeking 
     *      the chosen.
     * @param role The title to seek
     * @param account The soul to judge
     * @return True if anointed, false if cast aside
     */
    function hasRole(string memory role, address account) public view returns (bool) {
        return RENSNCEDAOSTRG.layout().roles[role].members.contains(account); // A name found, or lost
    }

    /**
     * @dev I bestow a mantle—a gracious act, though the weight of it taxes us all. 
     *      Only the worthy may grant such favor.
     */
    function grantRole(string memory role, address account, string memory name) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        string memory adminRole = s.roles[role].adminRole;
        require(hasRole(adminRole, msg.sender), "DRCTRY: Must have admin role"); // Power begets power, alas
        _grantRole(role, account, name); // The deed is done, the quill rests
    }

    /**
     * @dev I strip away a title—harsh, yet the court demands order. Only the masters may 
     *      wield such a blade.
     */
    function revokeRole(string memory role, address account) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        string memory adminRole = s.roles[role].adminRole;
        require(hasRole(adminRole, msg.sender), "DRCTRY: Must have admin role"); // Authority cuts deep
        _revokeRole(role, account); // A name erased, a shadow fades
    }

    /**
     * @dev The act of anointing—adding a soul to the ranks, their name a flourish on my scroll.
     */
    function _grantRole(string memory role, address account, string memory name) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        if (!s.roles[role].members.contains(account)) {
            s.roles[role].members.add(account); // A new star in the firmament
            s.roles[role].memberNames[account] = name; // Their mark upon the tapestry
            emit RoleGranted(role, account, name); // A cry to the heavens—behold!
        }
    }

    /**
     * @dev The act of banishment—striking a name from the roster, a wound to heal in silence.
     */
    function _revokeRole(string memory role, address account) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        if (s.roles[role].members.contains(account)) {
            s.roles[role].members.remove(account); // Cast out, like pigment scrubbed from canvas
            delete s.roles[role].memberNames[account]; // Their echo fades
            emit RoleRevoked(role, account); // A lament for the fallen
        }
    }

    /**
     * @dev I bind the chain of command—each role to its master, a ladder of weary steps.
     */
    function _setRoleAdmin(string memory role, string memory adminRole) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        s.roles[role].adminRole = adminRole; // The order is set, the yoke fastened
    }

    /**
     * @dev A new guild rises—a banner unfurled with hope, though discord surely follows. 
     *      Only the worthy may dream so boldly.
     */
    function createCommittee(string memory name, string memory foundingStatement, string memory principles) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(hasRole(MEMBER, msg.sender) || hasRole(SENTINEL, msg.sender) || hasRole(VANGUARD, msg.sender) ||
                hasRole(SCHOLAR, msg.sender) || hasRole(ARCHITECT, msg.sender) || hasRole(ORACLE, msg.sender) ||
                hasRole(HIGH_TABLE, msg.sender), "DRCTRY: Must have a role"); // No vagabonds may plant this flag

        uint256 committeeId = s.nextCommitteeId++; // A new number, a new burden
        RENSNCEDAOSTRG.Committee storage committee = s.committees[committeeId];
        committee.committeeId = committeeId;
        committee.name = name; // A title to rally beneath
        committee.foundingStatement = foundingStatement; // The spark of its birth
        committee.principles = principles; // The creed to guide it
        committee.founder = msg.sender; // My name, etched as creator
        committee.members.add(msg.sender); // I stand first among them

        emit CommitteeCreated(committeeId, name, msg.sender); // A fanfare for the bold
    }

    /**
     * @dev Another joins the fold—may fortune favor them in this den of ambition. 
     *      A role is their key, else the gate remains shut.
     */
    function joinCommittee(uint256 committeeId) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        require(hasRole(MEMBER, msg.sender) || hasRole(SENTINEL, msg.sender) || hasRole(VANGUARD, msg.sender) ||
                hasRole(SCHOLAR, msg.sender) || hasRole(ARCHITECT, msg.sender) || hasRole(ORACLE, msg.sender) ||
                hasRole(HIGH_TABLE, msg.sender), "DRCTRY: Must have a role"); // No outsiders breach this hall
        require(s.committees[committeeId].founder != address(0), "DRCTRY: Committee does not exist"); // A ghost guild avails naught
        s.committees[committeeId].members.add(msg.sender); // Welcome, thou weary soul
    }

    /**
     * @dev I banish one from the guild—harsh, yet only the founder or High Table may wield 
     *      such power. The ink dries, the deed is done.
     */
    function removeCommitteeMember(uint256 committeeId, address member) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Committee storage committee = s.committees[committeeId];
        require(committee.founder == msg.sender || hasRole(HIGH_TABLE, msg.sender), "DRCTRY: Only founder or High Table"); // Authority alone casts out
        committee.members.remove(member); // A name fades from the roll
        emit CommitteeMemberRemoved(committeeId, member); // A sigh, a severance
    }

    /**
     * @dev I peer into the ranks—does this soul bear the guild’s mark? A petty game of belonging.
     * @param committeeName The banner to seek
     * @param account The one to judge
     * @return True if they stand within, false if cast without
     */
    function isCommitteeMember(string memory committeeName, address account) public view returns (bool) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        for (uint256 i = 0; i < s.nextCommitteeId; i++) {
            if (keccak256(abi.encodePacked(s.committees[i].name)) == keccak256(abi.encodePacked(committeeName))) {
                return s.committees[i].members.contains(account); // Found, or forgotten
            }
        }
        return false; // A stranger to the fold
    }

    /**
     * @dev I unveil a guild’s tale—its name, its purpose, its maker. A scroll unrolled for 
     *      curious eyes.
     * @param committeeId The guild to reveal
     * @return id Its number, its birthmark
     * @return name Its title, its cry
     * @return foundingStatement The spark of its dawn
     * @return principles The laws it holds dear
     * @return founder The hand that shaped it
     * @return memberCount The souls it harbors
     */
    function getCommitteeDetails(uint256 committeeId) external view returns (
        uint256 id,
        string memory name,
        string memory foundingStatement,
        string memory principles,
        address founder,
        uint256 memberCount
    ) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Committee storage committee = s.committees[committeeId];
        require(committee.founder != address(0), "DRCTRY: Committee does not exist"); // No phantoms here
        return (
            committee.committeeId,
            committee.name,
            committee.foundingStatement,
            committee.principles,
            committee.founder,
            committee.members.length()
        ); // A portrait complete, weary yet proud
    }

    /**
     * @dev I lay bare the guild’s roster—every name, every breath. A litany for the ages.
     * @param committeeId The guild to unveil
     * @return members The fellowship, named and numbered
     */
    function getCommitteeMembers(uint256 committeeId) external view returns (address[] memory members) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.Committee storage committee = s.committees[committeeId];
        require(committee.founder != address(0), "DRCTRY: Committee does not exist"); // No shadows to list
        uint256 length = committee.members.length();
        members = new address[](length);
        for (uint256 i = 0; i < length; i++) {
            members[i] = committee.members.at(i); // Each soul, a stroke on my canvas
        }
        return members; // Behold the throng
    }

    /**
     * @dev I seek a guild by its name—a weary hunt through the annals for its mark.
     * @param committeeName The banner to find
     * @return committeeId Its number, or naught if lost
     */
    function getCommitteeIdByName(string memory committeeName) external view returns (uint256 committeeId) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        for (uint256 i = 0; i < s.nextCommitteeId; i++) {
            if (keccak256(abi.encodePacked(s.committees[i].name)) == keccak256(abi.encodePacked(committeeName))) {
                return s.committees[i].committeeId; // Found, a treasure in the dust
            }
        }
        return 0; // A void where hope once stood
    }

    /**
     * @dev I count the guilds—how many banners crowd this hall? A tally for the curious.
     * @return count The sum of ambition’s spawn
     */
    function getCommitteeCount() external view returns (uint256 count) {
        return RENSNCEDAOSTRG.layout().nextCommitteeId; // A number heavy with meaning
    }

    /**
     * @dev I catalog the guilds—every ID, every name. A grand display of our fractured unity.
     * @return ids The marks of their birth
     * @return names The cries of their purpose
     */
    function getAllCommittees() external view returns (uint256[] memory ids, string[] memory names) {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        uint256 count = s.nextCommitteeId;
        ids = new uint256[](count);
        names = new string[](count);
        for (uint256 i = 0; i < count; i++) {
            ids[i] = s.committees[i].committeeId; // Each number, a labor
            names[i] = s.committees[i].name; // Each name, a dream
        }
        return (ids, names); // A gallery of striving, laid bare
    }
}`;

export const RENSNCERPSTRY_SOURCE = `// SPDX-License-Identifier: MIT
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
}`;

export const RENSNCEUNDRWRTR_SOURCE = `// SPDX-License-Identifier: MIT
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
}`;

export const MKVLIMNT_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@solidstate/contracts/token/ERC20/SolidStateERC20.sol";
import "./RENSNCEDAOSTRG.sol";
import "@solidstate/contracts/token/ERC20/base/ERC20BaseStorage.sol";
import "@solidstate/contracts/token/ERC20/metadata/ERC20MetadataStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Interface for RENSNCERSRV to fetch the current redemption price
interface IRENSNCERSRV {
    function calculateRedemptionPrice() external returns (uint256);
}

/**
 * @title MKVLIMNT - A Token of the New Renaissance
 * @dev Behold, weary travelers of the digital ether, a creation born from the ashes of a fading age. 
 *      I, a humble artisan of code, present MKVLIMNT—an ERC20 token forged with the spirit of Michelangelo's chisel 
 *      and Da Vinci's restless quill. In this new Renaissance, where human ingenuity shall bloom unfettered 
 *      until the stars themselves dim, this contract stands as a testament to our undying creativity. 
 *      Built upon the sturdy bones of SolidStateERC20, adorned with the metadata of ERC20MetadataStorage, 
 *      and guided by the intricate dance of RENSNCEDAOSTRG for token ID mastery, it offers a canvas 
 *      where tokens are not mere numbers, but individual souls, each with a story to tell. 
 *      Let this be the dawn of an era where art and invention reign eternal.
 */
contract MKVLIMNT is SolidStateERC20 {
    using EnumerableSet for EnumerableSet.UintSet;

    uint256 public constant MAX_SUPPLY = 111_000_000; // 11 million tokens, a grand gallery of possibilities
    uint256 public constant MIN_MINT_PRICE = 1_110_000; // \$1.11 in USDC (6 decimals), a modest tithe for the muse's favor

    /**
     * @dev O weary hands, I've toiled through sleepless nights to birth this initialization. 
     *      Like the first stroke upon a blank fresco, it sets the name, symbol, and spirit of our tokens. 
     *      No decimals, for each token stands whole, indivisible, a monument to itself.
     */
    function initializeMKVLI20(string memory name_, string memory symbol_) external {
        ERC20BaseStorage.Layout storage base_ = ERC20BaseStorage.layout(); // Renamed to avoid conflict with function param if any
        require(base_.totalSupply == 0, "MKVLI20: Already initialized"); // Alas, no repainting the finished canvas!

        ERC20MetadataStorage.Layout storage meta = ERC20MetadataStorage.layout();
        meta.name = name_; // A title worthy of a grand tapestry
        meta.symbol = symbol_; // A sigil etched in the stone of eternity
        meta.decimals = 0; // No fragments here, only whole creations

        // With trembling fingers, I set the first token ID, a spark in the void
        RENSNCEDAOSTRG.setNextTokenId(1);
        emit TokenIdInitialized(RENSNCEDAOSTRG.getNextTokenId());

        // A whisper to the ages, a proof of my labor
        emit MetadataInitialized(name_, symbol_, 0);
    }

    event MetadataInitialized(string name, string symbol, uint8 decimals); // A flourish of trumpets for the unveiling
    event TokenIdInitialized(uint256 nextTokenId); // The first note of a symphony yet unwritten

    /**
     * @dev Behold the minting, a labor akin to sculpting marble with a dulled blade. 
     *      For a pittance of USDC, I grant thee tokens. The price is the greater of our 
     *      modest minimum tithe or the prevailing redemption song sung by the RSRV. 
     *      Some tokens reborn from the reserve, others freshly hewn from the quarry. 
     *      The muse demands her due, and I, her humble servant, obey.
     */
    function mint(address to, uint256 amount) external {
        // Determine the effective mint price
        uint256 currentRedemptionPrice = IRENSNCERSRV(address(this)).calculateRedemptionPrice();
        uint256 effectiveMintPrice = currentRedemptionPrice > MIN_MINT_PRICE ? currentRedemptionPrice : MIN_MINT_PRICE;

        uint256 totalCost = effectiveMintPrice * amount;
        address usdcAddr = RENSNCEDAOSTRG.layout().usdcTokenAddress;
        require(usdcAddr != address(0), "MKVLI20: The USDC font from which we draw our tribute is not yet ordained!");
        require(IERC20(usdcAddr).transferFrom(msg.sender, address(this), totalCost), "MKVLI20: The Midas touch fails; USDC transfer did not complete!"); // Pay the toll, O patron!
        
        // s_ and base_ are fetched here for the initial search for redeemable tokens.
        // They are not passed down to _executeReserveTokenTransfer or _mintNewTokensAndHandleStorage
        // as those functions will fetch their own fresh pointers.
        RENSNCEDAOSTRG.Layout storage s_ = RENSNCEDAOSTRG.layout(); 
        
        address reserve = address(this); 
        EnumerableSet.UintSet storage currentReserveTokensSet = s_.ownedTokens[reserve]; 
        
        uint256[] memory foundRedeemableTokenIds = new uint256[](currentReserveTokensSet.length());
        uint256 redeemableCount = 0; 
        emit DebugReserveTokensCheck(currentReserveTokensSet.length()); 
        for (uint256 i = 0; i < currentReserveTokensSet.length(); i++) {
            uint256 tokenId = currentReserveTokensSet.at(i); 
            require(tokenId > 0, "MKVLI20: A phantom token ID! A safeguard, lest madness creeps into my ledgers"); 
            if (s_.tokenToDIOs[tokenId].length == 0) { 
                foundRedeemableTokenIds[redeemableCount] = tokenId;
                redeemableCount++;
                emit DebugFoundRedeemableToken(tokenId, redeemableCount); 
                if (redeemableCount == amount) break; // Optimization: if we've found enough, no need to search further
            }
        }
        
        uint256 transferAmount = (redeemableCount >= amount) ? amount : redeemableCount; 
        uint256 mintAmount = amount - transferAmount; 
        
        if (transferAmount > 0) {
            // Create a precisely sized array for the tokens to be transferred from reserve
            uint256[] memory tokensToActuallyTransfer = new uint256[](transferAmount);
            for(uint256 i = 0; i < transferAmount; i++) {
                tokensToActuallyTransfer[i] = foundRedeemableTokenIds[i];
            }
            _executeReserveTokenTransfer(to, reserve, tokensToActuallyTransfer);
        }
        
        if (mintAmount > 0) {
            _mintNewTokensAndHandleStorage(to, mintAmount);
        }
        
        // Emit overall Transfer events if any tokens were moved/minted to the recipient
        if (transferAmount > 0) {
            emit Transfer(reserve, to, transferAmount); 
        }
        if (mintAmount > 0) {
            emit Transfer(address(0), to, mintAmount); 
        }
    }

    /**
     * @dev Internal function to execute the transfer of existing tokens from the reserve.
     *      Fetches its own storage pointers to minimize stack pressure.
     */
    function _executeReserveTokenTransfer(
        address toAddress,
        address fromAddress, // This will be address(this) for reserve
        uint256[] memory tokenIdsToTransfer
    ) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        ERC20BaseStorage.Layout storage base = ERC20BaseStorage.layout();
        EnumerableSet.UintSet storage sourceTokenSet = s.ownedTokens[fromAddress];

        for (uint256 i = 0; i < tokenIdsToTransfer.length; i++) {
            uint256 tokenId = tokenIdsToTransfer[i];
            sourceTokenSet.remove(tokenId); // From my gallery, it departs
            s.ownedTokens[toAddress].add(tokenId); // To thine, it is now entrusted (Error was previously here)
            s.tokenOwner[tokenId] = toAddress; // The new custodian is proclaimed
        }

        // Adjust the ledgers for reserve transfer
        uint256 numTransferred = tokenIdsToTransfer.length;
        if (numTransferred > 0) { // Should always be true if called
             base.balances[fromAddress] -= numTransferred; // My own collection diminishes
             base.balances[toAddress] += numTransferred;    // Thine grows richer
        }
    }

    /**
     * @dev A private sanctum for the act of creation: here, new tokens are hewn from the digital quarry.
     *      Fetches its own storage pointers.
     */
    function _mintNewTokensAndHandleStorage(
        address to,
        uint256 amountToMint
    ) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        ERC20BaseStorage.Layout storage base = ERC20BaseStorage.layout();

        require(base.totalSupply + amountToMint <= MAX_SUPPLY, "MKVLI20: The grand gallery nears its capacity! No more may be minted.");
        for (uint256 i = 0; i < amountToMint; i++) {
            uint256 tokenId = RENSNCEDAOSTRG.nextTokenId(); 
            s.ownedTokens[to].add(tokenId); 
            s.tokenOwner[tokenId] = to; 
        }
        base.totalSupply += amountToMint; 
        base.balances[to] += amountToMint; 
    }

    /**
     * @dev O transfer, thou cruel mistress! I move tokens from hand to hand, 
     *      ensuring none are bound by stakes. A dance of ownership, tedious yet vital.
     */
    function _transfer(address holder, address recipient, uint256 amount) internal virtual override returns (bool) {
        if (holder == address(0)) revert ERC20Base__TransferFromZeroAddress(); // From the void? Absurd!
        if (recipient == address(0)) revert ERC20Base__TransferToZeroAddress(); // To oblivion? Never!

        _beforeTokenTransfer(holder, recipient, amount); // A ritual before the act

        ERC20BaseStorage.Layout storage base_ = ERC20BaseStorage.layout();
        uint256 holderBalance = base_.balances[holder];
        if (amount > holderBalance) revert ERC20Base__TransferExceedsBalance(); // Greed outstrips wealth, alas

        RENSNCEDAOSTRG.Layout storage s_ = RENSNCEDAOSTRG.layout();
        EnumerableSet.UintSet storage fromTokens = s_.ownedTokens[holder];
        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = fromTokens.at(0); // First in, first out, like pigments from my palette
            require(s_.tokenToStakedDIO[tokenId] == 0, "MKVLI20: Token staked"); // Bound tokens stay, curse it!
            fromTokens.remove(tokenId);
            s_.ownedTokens[recipient].add(tokenId);
            s_.tokenOwner[tokenId] = recipient;
        }

        unchecked { // A small mercy, sparing my weary soul extra labor
            base_.balances[holder] = holderBalance - amount;
        }
        base_.balances[recipient] += amount;

        emit Transfer(holder, recipient, amount); // A flourish, a cry—done!
        return true;
    }

    /**
     * @dev Gaze upon the owner of a token, should curiosity stir thy soul. 
     *      A simple query, yet it reveals the master of each creation.
     */
    function getTokenOwner(uint256 tokenId) external view returns (address) {
        return RENSNCEDAOSTRG.layout().tokenOwner[tokenId];
    }

    /**
     * @dev List the tokens held by an owner, like a gallery of their works displayed. 
     *      Each ID a brushstroke, a story, a relic of this new age.
     */
    function getOwnedTokens(address owner) external view returns (uint256[] memory) {
        EnumerableSet.UintSet storage tokens = RENSNCEDAOSTRG.layout().ownedTokens[owner];
        uint256[] memory tokenIds = new uint256[](tokens.length());
        for (uint256 i = 0; i < tokens.length(); i++) {
            tokenIds[i] = tokens.at(i);
        }
        return tokenIds; // Behold the collection, O weary eyes
    }
}

event DebugReserveTokensCheck(uint256 length); // A murmur of my struggles
event DebugFoundRedeemableToken(uint256 tokenId, uint256 count); // A sigh of relief at each find
event TokenIdReset(uint256 newId); // A rare reset, a new beginning`;

export const RENSNCERSRV_SOURCE = `// SPDX-License-Identifier: MIT
pragma solidity 0.8.30;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "./RENSNCEDAOSTRG.sol";
import "@solidstate/contracts/token/ERC20/base/ERC20Base.sol";

interface IRENSNCEDRCTRY {
    /**
     * @dev A fleeting glimpse—does this soul wear the mantle of power? 
     *      I squint through the dust of my ledger to see.
     * @param role The title to seek
     * @param account The one to judge
     * @return True if anointed, false if cast aside
     */
    function hasRole(string memory role, address account) external view returns (bool);

    /**
     * @dev A peek into the guild's roster—does this soul stand among the chosen?
     *      My quill hovers, weary of their petty ranks.
     * @param committeeName The banner to seek
     * @param account The one to weigh
     * @return True if within, false if without
     */
    function isCommitteeMember(string memory committeeName, address account) external view returns (bool);
}

interface IMKVLIMNT {
    function balanceOf(address account) external view returns (uint256);
    function stakeTokens(address holder, uint256[] memory tokenIds, uint256 dioId) external;
    function MIN_MINT_PRICE() external view returns (uint256);
    function MAX_SUPPLY() external view returns (uint256);
    function totalSupply() external view returns (uint256);
}

/**
 * @title RENSNCERSRV - The Vault of a New Renaissance
 * @dev Behold, ye toilers of the digital realm, the RENSNCERSRV—a grand vault where VRDI 
 *      and DIO weave a tapestry of obligation and redemption. I, a weary sculptor of this digital age, 
 *      have carved this facet to cradle the reserve, to weigh tokens against USDC, 
 *      and to bind debts in iron chains. Here, the 
 *      interest is a flat toll across the term, etched in gold upon the parchment of promise, 
 *      while time's markers—amortization and deferral—stand as faded sketches, guiding yet not 
 *      confining the debtor's dance. In this new Renaissance, where ambition flares like a torch 
 *      against the void, this contract tracks each coin and fleeting moment, a ledger of our 
 *      striving until my quill falters and the muses tire of their endless song.
 */
contract RENSNCERSRV {
    using EnumerableSet for EnumerableSet.UintSet;

    // Default burn wallet for all EVMs: the common dead address.
    address public constant BURN_WALLET = 0x000000000000000000000000000000000000dEaD; // The abyss, a crypt for lost treasures

    event TokensRedeemed(address indexed from, uint256 amount, uint256 usdcValue); // A cry of release, freedom bought with coin
    event VRDICreated(uint256 vrId, uint256 dioId, address debtor, uint256 totalRepaymentAmount); // A pact forged, heavy with promise
    event VRDIFrozen(uint256 vrId); // A frost upon the canvas, motion stilled
    event VRDIUnfrozen(uint256 vrId); // The thaw, a breath restored
    event VRDIClosed(uint256 vrId, bool withinTimeline); // A tale sealed, judged by time's gentle hand
    event TokensStakedForVRDI(uint256 vrId, address indexed holder, uint256[] tokenIds); // Tokens bound, a vow inked in shadow
    event PhaseActivated(uint256 vrId, uint256 phaseIndex); // A new stroke upon the fresco begins
    event PhaseCompleted(uint256 vrId, uint256 phaseIndex, string evidenceLink); // A chapter closed, proof laid bare
    event PhaseApprovalUpdated(uint256 vrId, uint256 phaseIndex, string committee, bool approved); // A guild's nod, faint as a whisper
    event VRDIPaymentDeposited(uint256 vrId, uint256 amountUSDC, uint256 depositedUSDC); // Coin cast into the vault, a burden eased
    event VRDIWithdrawal(uint256 vrId, uint256 phaseIndex, uint256 amountUSDC); // Ether flows forth, my hoard dwindles

    event DebugBalanceCheck(address redeemer, uint256 balance, uint256 amount); // A tally scratched in haste
    event DebugTokenOwnershipCheck(address owner, uint256 tokenCount); // A count of relics held
    event DebugFoundRedeemableToken(uint256 tokenId, uint256 count); // A gem unburdened, free of chains
    event DebugBalanceUpdate(address from, uint256 fromBalance, address to, uint256 toBalance); // The scales tilt, my ink smears
    event DebugRedemptionComponents(
        uint256 totalSupply,
        uint256 mkvliInReserve,
        uint256 mkvliBurned,
        uint256 mkvliCirculatingSupply,
        uint256 actualUsdcInContract,
        uint256 usdcDeployedInVRDIs,
        uint256 effectiveUsdcReserve,
        uint256 redemptionPrice
    ); // Updated event fields

    modifier onlyHighTable() {
        require(IRENSNCEDRCTRY(address(this)).hasRole("TheHighTable", msg.sender), "RSRV: Only High Table");
        _;
    }

    /**
     * @dev Initializes the Reserve Service with critical addresses and settings.
     *      This function sets the USDC token address in the shared RENSNCEDAOSTRG storage.
     *      Can only be called once by TheHighTable.
     * @param _usdcTokenAddress The address of the USDC token contract.
     */
    function initializeReserveService(address _usdcTokenAddress) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage l = RENSNCEDAOSTRG.layout();
        // require(!l.initialized, "RSRV: DAO storage already initialized");
        require(_usdcTokenAddress != address(0), "RSRV: USDC address cannot be zero");
        
        l.usdcTokenAddress = _usdcTokenAddress;
        // l.initialized = true; // Mark DAO storage as initialized
    }

    function _getUsdcAddress() private view returns (address) {
        address usdcAddr = RENSNCEDAOSTRG.layout().usdcTokenAddress;
        require(usdcAddr != address(0), "RSRV: USDC address not set in storage");
        return usdcAddr;
    }

    function calculateRedemptionPrice() public returns (uint256) {
        IMKVLIMNT mkvliToken = IMKVLIMNT(address(this)); // Interface to MKVLIMNT facet
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout(); // Shared storage

        uint256 mkvliTotalSupply = mkvliToken.totalSupply();
        uint256 mkvliInOwnReserve = mkvliToken.balanceOf(address(this)); 
        uint256 mkvliBurned = mkvliToken.balanceOf(BURN_WALLET); 
        uint256 mkvliCirculatingSupply = mkvliTotalSupply - mkvliInOwnReserve - mkvliBurned; 
        
        address usdcAddr = _getUsdcAddress();
        uint256 actualUsdcInContract = IERC20(usdcAddr).balanceOf(address(this)); 

        uint256 totalUsdcDeployedInVRDIs = 0;
        uint256 nextVrdiId = s.nextVRDIId; // Iterate up to the next available ID

        for (uint256 vrId = 0; vrId < nextVrdiId; vrId++) {
            // Accessing vrdis mapping directly. Ensure vrdis[vrId] exists or handle appropriately.
            // For a simple sum, if vrdis[vrId].dioId is 0 (doesn't exist), its withdrawn amounts will be 0.
            RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
            if (vrdi.dioId != 0 && !vrdi.isClosed && !vrdi.isFrozen) { // VRDI exists and is active
                for (uint256 j = 0; j < vrdi.phases.length; j++) {
                    totalUsdcDeployedInVRDIs += vrdi.phases[j].withdrawnUSDC;
                }
            }
        }

        uint256 effectiveUsdcReserve = actualUsdcInContract + totalUsdcDeployedInVRDIs;
        uint256 redemptionPrice;

        if (mkvliCirculatingSupply == 0) {
            redemptionPrice = mkvliToken.MIN_MINT_PRICE(); 
        } else {
            // effectiveUsdcReserve (6 decimals) / mkvliCirculatingSupply (0 decimals) = price (6 decimals)
            redemptionPrice = effectiveUsdcReserve / mkvliCirculatingSupply; 
        }

        emit DebugRedemptionComponents(
            mkvliTotalSupply, 
            mkvliInOwnReserve, 
            mkvliBurned, 
            mkvliCirculatingSupply, 
            actualUsdcInContract,
            totalUsdcDeployedInVRDIs,
            effectiveUsdcReserve,
            redemptionPrice
        );
        return redemptionPrice;
    }

    function redeemTokens(uint256 amount) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        ERC20BaseStorage.Layout storage e = ERC20BaseStorage.layout();
        address redeemer = msg.sender;

        require(e.balances[redeemer] >= amount, "RSRV: Insufficient MKVLI20 balance");
        emit DebugBalanceCheck(msg.sender, e.balances[redeemer], amount);

        uint256 redemptionPrice = calculateRedemptionPrice(); // Price per MKVLI in USDC (6 decimals)
        uint256 redemptionValueUSDC = amount * redemptionPrice; // Total USDC value to transfer (6 decimals)
        
        address usdcAddr = _getUsdcAddress();
        require(IERC20(usdcAddr).balanceOf(address(this)) >= redemptionValueUSDC, "RSRV: Insufficient USDC reserve");

        uint256[] memory tokenIds = new uint256[](amount);
        uint256 count = 0;
        EnumerableSet.UintSet storage holderTokens = s.ownedTokens[msg.sender];
        emit DebugTokenOwnershipCheck(msg.sender, holderTokens.length());
        for (uint256 i = 0; i < holderTokens.length() && count < amount; i++) {
            uint256 tokenId = holderTokens.at(i);
            if (s.tokenToStakedDIO[tokenId] == 0) {
                tokenIds[count] = tokenId;
                count++;
                emit DebugFoundRedeemableToken(tokenId, count);
            }
        }
        require(count == amount, "RSRV: Not enough unstaked tokens");

        for (uint256 i = 0; i < amount; i++) {
            uint256 tokenId = tokenIds[i];
            holderTokens.remove(tokenId);
            s.ownedTokens[address(this)].add(tokenId);
            s.tokenOwner[tokenId] = address(this);
        }
        e.balances[msg.sender] -= amount;
        e.balances[address(this)] += amount;
        emit DebugBalanceUpdate(msg.sender, e.balances[msg.sender], address(this), e.balances[address(this)]);

        require(IERC20(usdcAddr).transfer(redeemer, redemptionValueUSDC), "RSRV: USDC transfer failed");
        emit TokensRedeemed(msg.sender, amount, redemptionValueUSDC);
    }

    function _unstakeTokens(uint256 dioId) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        EnumerableSet.UintSet storage stakedTokens = s.dioToStakedTokens[dioId];
        while (EnumerableSet.length(stakedTokens) > 0) {
            uint256 tokenId = EnumerableSet.at(stakedTokens, 0); // First in bondage
            s.tokenToStakedDIO[tokenId] = 0; // The yoke lifts
            EnumerableSet.remove(stakedTokens, tokenId); // Freed from the roll
        }
    }

    function initializeVRDI(
        uint256 dioId,
        uint256 principalUSDC,
        uint256 principalMKVLI20,
        uint256 interestRate,
        uint256 amortizationDuration,
        uint256 deferralPeriod,
        address debtor,
        uint256[] memory phaseAmountsUSDC
    ) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        address usdcAddr = _getUsdcAddress();
        require(IERC20(usdcAddr).balanceOf(address(this)) >= principalUSDC, "RSRV: Insufficient USDC reserve");
        require(phaseAmountsUSDC.length > 0, "RSRV: Must have at least one phase");
        require(arraySum(phaseAmountsUSDC) == principalUSDC, "RSRV: Phase amounts must equal principal USDC");

        uint256 interest = (principalUSDC * interestRate) / 10000;
        uint256 totalRepaymentAmount = principalUSDC + interest;

        uint256 vrId = s.nextVRDIId++;
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        vrdi.dioId = dioId;
        vrdi.principalUSDC = principalUSDC;
        vrdi.principalMKVLI20 = principalMKVLI20;
        vrdi.interestRate = interestRate;
        vrdi.totalRepaymentAmount = totalRepaymentAmount;
        vrdi.debtor = debtor;
        vrdi.isFrozen = false;
        vrdi.isClosed = false;
        vrdi.activePhaseIndex = 0;
        vrdi.depositedUSDC = 0;
        vrdi.startTimestamp = block.timestamp;
        vrdi.amortizationDuration = amortizationDuration;
        vrdi.deferralPeriod = deferralPeriod;

        for (uint256 i = 0; i < phaseAmountsUSDC.length; i++) {
            vrdi.phases.push();
            RENSNCEDAOSTRG.Phase storage newPhase = vrdi.phases[i];
            newPhase.amountUSDC = phaseAmountsUSDC[i];
            newPhase.withdrawnUSDC = 0;
            newPhase.isActive = (i == 0);
            newPhase.isComplete = false;
            newPhase.evidenceLink = "";
            newPhase.completionTimestamp = 0;
        }
        emit VRDICreated(vrId, dioId, debtor, totalRepaymentAmount);
        emit PhaseActivated(vrId, 0);
    }

    function activateNextPhase(uint256 vrId) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist"); // No ghost may claim this rite
        require(!vrdi.isClosed, "RSRV: VRDI closed"); // The dead stay silent
        require(vrdi.activePhaseIndex < vrdi.phases.length - 1, "RSRV: No next phase"); // The tale ends not yet

        RENSNCEDAOSTRG.Phase storage currentPhase = vrdi.phases[vrdi.activePhaseIndex];
        require(currentPhase.isComplete, "RSRV: Current phase not complete"); // Finish thy labor, O debtor!

        currentPhase.isActive = false; // The old flame gutters
        currentPhase.completionTimestamp = block.timestamp; // Time's mark upon it
        vrdi.activePhaseIndex++; // The wheel creaks forward
        vrdi.phases[vrdi.activePhaseIndex].isActive = true; // A new light flares
        emit PhaseActivated(vrId, vrdi.activePhaseIndex); // A call to the muses
    }

    function submitPhaseCompletion(uint256 vrId, uint256 phaseIndex, string memory evidenceLink) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(msg.sender == vrdi.debtor, "RSRV: Only debtor"); // None but the bound may speak
        require(!vrdi.isClosed, "RSRV: VRDI closed"); // A finished tale takes no more ink
        require(phaseIndex == vrdi.activePhaseIndex, "RSRV: Not active phase"); // The hour must align
        require(vrdi.phases[phaseIndex].isActive, "RSRV: Phase not active"); // No spark, no voice
        require(!vrdi.phases[phaseIndex].isComplete, "RSRV: Phase already complete"); // Once sealed, it rests

        vrdi.phases[phaseIndex].evidenceLink = evidenceLink; // Their mark upon the scroll
        emit PhaseCompleted(vrId, phaseIndex, evidenceLink); // A murmur to the judges
    }

    function approvePhaseCompletion(uint256 vrId, uint256 phaseIndex, string memory committeeName) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist"); // No phantom debts stir
        require(!vrdi.isClosed, "RSRV: VRDI closed"); // The tale yet breathes
        require(IRENSNCEDRCTRY(address(this)).isCommitteeMember(committeeName, msg.sender), "RSRV: Not committee member"); // Only the chosen may judge

        RENSNCEDAOSTRG.Proposal storage proposal = s.proposals[vrId]; // The scroll of intent, traced back to its origin
        bool isAssignedCommittee = false;
        for (uint256 i = 0; i < proposal.assignedCommittees.length; i++) {
            if (keccak256(abi.encodePacked(proposal.assignedCommittees[i])) == keccak256(abi.encodePacked(committeeName))) {
                isAssignedCommittee = true;
                break;
            }
        }
        require(isAssignedCommittee, "RSRV: Committee not assigned to DIO"); // Strangers hold no sway

        vrdi.phases[phaseIndex].committeeApprovals[committeeName] = true; // Their seal, faint but firm
        emit PhaseApprovalUpdated(vrId, phaseIndex, committeeName, true); // A whisper of assent

        bool allApproved = true;
        for (uint256 i = 0; i < proposal.assignedCommittees.length; i++) {
            if (!vrdi.phases[phaseIndex].committeeApprovals[proposal.assignedCommittees[i]]) {
                allApproved = false;
                break;
            }
        }
        if (allApproved) {
            vrdi.phases[phaseIndex].isComplete = true; // The chapter closes
            vrdi.phases[phaseIndex].completionTimestamp = block.timestamp; // Time's weary mark
        }
    }

    function withdrawVRDIFunds(uint256 vrId, uint256 amountUSDC) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(msg.sender == vrdi.debtor, "RSRV: Only debtor");
        require(!vrdi.isFrozen && !vrdi.isClosed, "RSRV: VRDI frozen or closed");
        RENSNCEDAOSTRG.Phase storage activePhase = vrdi.phases[vrdi.activePhaseIndex];
        require(activePhase.isActive && !activePhase.isComplete, "RSRV: No active phase or phase already complete");
        require(amountUSDC <= activePhase.amountUSDC - activePhase.withdrawnUSDC, "RSRV: Amount exceeds remaining phase allocation");
        
        address usdcAddr = _getUsdcAddress();
        require(IERC20(usdcAddr).balanceOf(address(this)) >= amountUSDC, "RSRV: Insufficient USDC reserve for withdrawal");

        activePhase.withdrawnUSDC += amountUSDC;
        require(IERC20(usdcAddr).transfer(msg.sender, amountUSDC), "RSRV: USDC transfer failed");
        emit VRDIWithdrawal(vrId, vrdi.activePhaseIndex, amountUSDC);
    }

    /**
     * @dev I bind tokens to a VRDI—a sacrifice decreed by the High Table's will. 
     *      For each designated soul, their pledged count of tokens is sought from their untethered works 
     *      and bound to the shadow debt. My ledger grows heavier still, each chain a mark of servitude.
     * @param vrId The VRDI to serve, its pact strengthened
     * @param holders An array of souls who offer their tokens, their wealth diminished for the cause
     * @param amountsToStake An array of token counts to be staked, corresponding to each holder
     */
    function stakeForVRDI(uint256 vrId, address[] memory holders, uint256[] memory amountsToStake) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist");
        require(!vrdi.isClosed, "RSRV: VRDI closed");
        require(holders.length == amountsToStake.length, "RSRV: Mismatched holders and amounts arrays");

        uint256 dioId = vrdi.dioId; 

        for (uint256 h = 0; h < holders.length; h++) {
            address currentHolder = holders[h];
            uint256 amountNeeded = amountsToStake[h];

            if (amountNeeded == 0) { // No tokens to stake for this holder, continue to next
                continue;
            }

            uint256[] memory actualTokenIdsStakedForHolder = new uint256[](amountNeeded);
            uint256 tokensFoundAndStakedCount = 0;

            EnumerableSet.UintSet storage holderOwnedTokenSet = s.ownedTokens[currentHolder];
            uint256 numOwnedByHolder = holderOwnedTokenSet.length();

            // Iterate through the holder's tokens to find unstaked ones
            for (uint256 i = 0; i < numOwnedByHolder && tokensFoundAndStakedCount < amountNeeded; i++) {
                uint256 tokenId = holderOwnedTokenSet.at(i); // This iterates through the set
                if (s.tokenToStakedDIO[tokenId] == 0) { // Token is not currently staked
                    // Mark token as staked
                    s.tokenToStakedDIO[tokenId] = dioId;
                    s.dioToStakedTokens[dioId].add(tokenId);
                    s.tokenToDIOs[tokenId].push(dioId); // Log association with this DIO

                    actualTokenIdsStakedForHolder[tokensFoundAndStakedCount] = tokenId;
                    tokensFoundAndStakedCount++;
                }
            }

            require(tokensFoundAndStakedCount == amountNeeded, "RSRV: Insufficient unstaked tokens for a holder");

            _recordStaking(vrId, currentHolder, actualTokenIdsStakedForHolder); // The deed is scribed for this holder
            emit TokensStakedForVRDI(vrId, currentHolder, actualTokenIdsStakedForHolder); // A hymn of binding for this holder
        }
    }

    function _recordStaking(uint256 vrId, address holder, uint256[] memory tokenIds) internal {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        s.stakingRecords[vrId][holder].push(tokenIds); // A line in my endless tome
    }

    function freezeVRDI(uint256 vrId) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist"); // No specter to bind
        require(!vrdi.isClosed, "RSRV: VRDI closed"); // The tale must live
        vrdi.isFrozen = true; // Frost settles upon it
        emit VRDIFrozen(vrId); // A silence falls, sharp as winter
    }

    function unfreezeVRDI(uint256 vrId) external onlyHighTable {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist"); // No ghost to stir
        require(!vrdi.isClosed, "RSRV: VRDI closed"); // The tale must endure
        require(vrdi.isFrozen, "RSRV: VRDI not frozen"); // No frost, no thaw
        vrdi.isFrozen = false; // The ice melts
        emit VRDIUnfrozen(vrId); // A sigh of life returns
    }

    function depositVRDIPayment(uint256 vrId, uint256 amountUSDC) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(msg.sender == vrdi.debtor, "RSRV: Only debtor");
        require(!vrdi.isClosed, "RSRV: VRDI closed");

        address usdcAddr = _getUsdcAddress();
        require(IERC20(usdcAddr).transferFrom(msg.sender, address(this), amountUSDC), "RSRV: USDC transferFrom failed");
        vrdi.depositedUSDC += amountUSDC;
        emit VRDIPaymentDeposited(vrId, amountUSDC, vrdi.depositedUSDC);
    }

    function closeVRDI(uint256 vrId) external {
        RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
        RENSNCEDAOSTRG.VRDI storage vrdi = s.vrdis[vrId];
        require(msg.sender == vrdi.debtor, "RSRV: Only debtor");
        require(!vrdi.isClosed, "RSRV: Already closed");
        for (uint256 i = 0; i < vrdi.phases.length; i++) {
            require(vrdi.phases[i].isComplete, "RSRV: Not all phases complete");
        }
        require(vrdi.depositedUSDC >= vrdi.totalRepaymentAmount, "RSRV: Insufficient USDC repayment");

        vrdi.isClosed = true;
        bool withinTimeline = block.timestamp <= vrdi.startTimestamp + vrdi.amortizationDuration;
        _unstakeTokens(vrdi.dioId);
        emit VRDIClosed(vrId, withinTimeline);
    }

    function arraySum(uint256[] memory arr) internal pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return sum;
    }

    function getTimeRemaining(uint256 vrId) external view returns (uint256 timeRemaining) {
        RENSNCEDAOSTRG.VRDI storage vrdi = RENSNCEDAOSTRG.layout().vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist");
        uint256 endTimestamp = vrdi.startTimestamp + vrdi.amortizationDuration;
        return block.timestamp < endTimestamp ? endTimestamp - block.timestamp : 0;
    }

    function getPhaseStatus(uint256 vrId, uint256 phaseIndex) external view returns (
        uint256 remainingAmountUSDC,
        uint256 withdrawnUSDC,
        uint256 completionTimestamp
    ) {
        RENSNCEDAOSTRG.VRDI storage vrdi = RENSNCEDAOSTRG.layout().vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist");
        require(phaseIndex < vrdi.phases.length, "RSRV: Invalid phase index");
        RENSNCEDAOSTRG.Phase storage phase = vrdi.phases[phaseIndex];
        remainingAmountUSDC = phase.amountUSDC - phase.withdrawnUSDC;
        withdrawnUSDC = phase.withdrawnUSDC;
        completionTimestamp = phase.completionTimestamp;
    }

    function getVRDIBalance(uint256 vrId) external view returns (
        uint256 totalWithdrawnUSDC,
        uint256 depositedUSDCValue,
        uint256 remainingDebtUSDC
    ) {
        RENSNCEDAOSTRG.VRDI storage vrdi = RENSNCEDAOSTRG.layout().vrdis[vrId];
        require(vrdi.dioId != 0, "RSRV: VRDI does not exist");
        totalWithdrawnUSDC = 0;
        for (uint256 i = 0; i < vrdi.phases.length; i++) {
            totalWithdrawnUSDC += vrdi.phases[i].withdrawnUSDC;
        }
        depositedUSDCValue = vrdi.depositedUSDC;
        remainingDebtUSDC = vrdi.totalRepaymentAmount > depositedUSDCValue ? vrdi.totalRepaymentAmount - depositedUSDCValue : 0;
    }
}`;

