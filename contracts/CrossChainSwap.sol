// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@debridge-finance/desdk/contracts/DeBridgeGate.sol"; // Import DeBridgeGate contract

contract CrossChainSwap {
    // Address of the deBridge contract
    address private deBridge;

    constructor(address _deBridge) {
        deBridge = _deBridge;
    }

    function swap(address token, uint256 amount) public {
        // Transfer the tokens from the sender to this contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Approve the deBridge contract to spend the tokens
        IERC20(token).approve(deBridge, amount);

        // Call the deBridge contract to perform the swap
        DeBridgeGate(deBridge).send(/* parameters */);
    }
}
