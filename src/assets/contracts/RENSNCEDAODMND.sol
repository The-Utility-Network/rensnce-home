// SPDX-License-Identifier: MIT
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
}