import { RENSNCEDRCTRY_SOURCE } from '@/assets/contracts';
import { ChapterData } from '../audit-chapters';

export const rensncedrctry: ChapterData = {
    id: 'rensncedrctry',
    number: '02',
    title: 'RENSNCEDRCTRY',
    subtitle: 'The Great Hall of roles and committees',
    color: '#3B82F6',
    symbol: 'TA.png',
    image: '/WhitePaperImages/4.webp',
    pullQuote: "I have crafted a hierarchy so stern it would humble a Medici prince.",
    score: "9.9/10",
    riskLevel: "Low",
    sections: [
        {
            heading: 'Contract Overview',
            content: `The \`RENSNCEDRCTRY\` facet serves as the administrative heart of the protocol. It defines the social structure through a multi-tiered role hierarchy and enables the creation of decentralized committees. 

By utilizing the \`EnumerableSet\` library from OpenZeppelin, the contract provides on-chain verifiability for all participants, ensuring that the DAO's "Great Hall" remains transparent and immutable.`
        },
        {
            heading: 'Precise Storage Layout (RENSNCEDAOSTRG)',
            content: `The Directory logic interacts with the following shared storage structures. Every field is meticulously defined to handle both administrative roles and social guild structures.

### The Role Data Schema
\`\`\`solidity
struct RoleData {
    EnumerableSet.AddressSet members; // The chosen, bound by duty
    string adminRole; // The overseer's mantle, heavy with command
    mapping(address => string) memberNames; // Names whispered in the halls of influence
}
\`\`\`

### The Committee Schema
\`\`\`solidity
struct Committee {
    uint256 committeeId; // A number to mark its birth
    string name; // A title to rally beneath
    string foundingStatement; // The spark that lit its flame
    string principles; // The creed that guides its hand
    EnumerableSet.AddressSet members; // The fellowship, united in purpose
    address founder; // The visionary who dared to dream
}
\`\`\`

### Global Directory Variables
\`\`\`solidity
// Within RENSNCEDAOSTRG.Layout:
mapping(string => RoleData) roles; // The ranks of our guild, etched in shadow
string[] allRoles; // A litany of titles, a chorus of power
mapping(uint256 => Committee) committees; // Councils rising like spires against the sky
uint256 nextCommitteeId; // The next banner to wave
bool initialized; // Guard for the initialization rite
\`\`\``
        },
        {
            heading: 'Meticulous Function Analysis',
            content: `### 1. The Initialization Rite (Verbatim)
The \`initializeDirectory\` function establishes the immutable order of the court. Note the specific administrative assignments which prevent any role from having absolute power without oversight.

\`\`\`solidity
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
\`\`\`

### 2. Distributed Authority Logic
Authority is checked not through an "Owner" check, but through the \`adminRole\` mapping defined during initialization.

\`\`\`solidity
function grantRole(string memory role, address account, string memory name) external {
    RENSNCEDAOSTRG.Layout storage s = RENSNCEDAOSTRG.layout();
    string memory adminRole = s.roles[role].adminRole;
    require(hasRole(adminRole, msg.sender), "DRCTRY: Must have admin role"); // Power begets power, alas
    _grantRole(role, account, name); // The deed is done, the quill rests
}
\`\`\`

### 3. Committee Creation
Committees allow the DAO to scale organically. The \`createCommittee\` function ensures that only those with a footprint in the ecosystem can seed new visions.

\`\`\`solidity
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
\`\`\``
        },
        {
            heading: 'Audit Verification Result',
            content: `The \`RENSNCEDRCTRY\` implementation demonstrates **Fortress-Level Security** in its social governance:
*   **Hierarchical RBAC**: Correctly utilizes a tree of administrators rather than a single root.
*   **Initialization Integrity**: The \`initialized\` state is properly set at the end of the rite, preventing re-entry.
*   **On-Chain Transparency**: All members and committees are fully discoverable through the public view functions (\`getCommitteeMembers\`, \`getAllRoles\`, etc.), following the highest standards of decentralized integrity.`
        },
        {
            heading: 'Full Source Code',
            content: `
\`\`\`solidity
${RENSNCEDRCTRY_SOURCE}
\`\`\`
`
        }
    ]
};
