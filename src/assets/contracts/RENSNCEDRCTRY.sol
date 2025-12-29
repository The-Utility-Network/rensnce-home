// SPDX-License-Identifier: MIT
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
}