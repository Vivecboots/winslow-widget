import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrossChainSwap", function () {
  it("Should swap tokens", async function () {
    // Deploy the CrossChainSwap contract
    const CrossChainSwap = await ethers.getContractFactory("CrossChainSwap");
    const crossChainSwap = await CrossChainSwap.deploy(/* address of the deBridge contract */);

    // TODO: Mint some test tokens to the sender

    // Call the swap function
    await crossChainSwap.swap(/* address of the token */, /* amount */);

    // TODO: Check the result
  });
});
