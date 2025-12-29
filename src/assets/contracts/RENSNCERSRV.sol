// SPDX-License-Identifier: MIT
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
}