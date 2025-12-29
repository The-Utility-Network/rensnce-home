// SPDX-License-Identifier: MIT
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
    uint256 public constant MIN_MINT_PRICE = 1_110_000; // $1.11 in USDC (6 decimals), a modest tithe for the muse's favor

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
event TokenIdReset(uint256 newId); // A rare reset, a new beginning