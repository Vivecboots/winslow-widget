import { expect } from "chai";
import { ethers } from "hardhat";

describe("CrossChainSwap", function () {
  it("Should swap tokens", async function () {
    // Deploy the CrossChainSwap contract
    const CrossChainSwap = await ethers.getContractFactory("CrossChainSwap");
    const crossChainSwap = await CrossChainSwap.deploy(/* address of the deBridge contract */);

    // TODO: Mint some test tokens to the sender
    // You'll need to use a test token contract here
    const TestToken = await ethers.getContractFactory("TestToken");
    const testToken = await TestToken.deploy(/* Initial supply and other parameters */);
    await testToken.mint(/* Sender's address, Amount */);

    // Approve the CrossChainSwap contract to spend tokens
    await testToken.connect(sender).approve(crossChainSwap.address, /* Amount */);

    // Call the swap function
    await crossChainSwap.swap(testToken.address, /* Amount */);

    // TODO: Check the result
    // You might want to check if the token balance of this contract is 0, indicating that tokens are sent successfully.
    const balance = await testToken.balanceOf(crossChainSwap.address);
    expect(balance).to.equal(0);
  });
});
