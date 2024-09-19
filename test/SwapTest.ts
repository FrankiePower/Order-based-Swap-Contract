import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("OrderBasedSwap", function () {
  async function deployToken() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const erc20Token = await hre.ethers.getContractFactory("SuperFranky");

    const token = await erc20Token.deploy();

    return { token, owner, otherAccount };
  }

  async function deployOrderBasedSwap() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const orderBasedSwapFactory = await hre.ethers.getContractFactory(
      "OrderBasedSwap"
    );

    const orderBasedSwap = await orderBasedSwapFactory.deploy();

    return { orderBasedSwap, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { orderBasedSwap, owner } = await loadFixture(deployOrderBasedSwap);
      expect(await orderBasedSwap.owner()).to.equal(owner.address);
    });

    it("Should allow deposit", async function () {
      const { orderBasedSwap, owner } = await loadFixture(deployOrderBasedSwap);
      const { token, otherAccount } = await loadFixture(deployToken);
      const amount = 10000;
      const returnToken = 1; // Replace with the enum value of the return token

      await orderBasedSwap.depositToken(token, amount, returnToken);
      expect(await orderBasedSwap.tokenBalances(token, owner.address)).to.equal(
        amount
      );
    });

    it("Should allow purchase", async function () {
      const { orderBasedSwap, owner } = await loadFixture(deployOrderBasedSwap);
      const tokenAddress = "0x..."; // Replace with the address of the token you want to purchase
      const amount = 100;
      const paymentTokenAddress = "0x..."; // Replace with the address of the payment token

      await orderBasedSwap.deposit(paymentTokenAddress, amount, 0);
      await orderBasedSwap.purchase(tokenAddress, amount, paymentTokenAddress);
      expect(
        await orderBasedSwap.tokenBalances(tokenAddress, owner.address)
      ).to.equal(amount);
    });

    it("Should allow withdraw", async function () {
      const { orderBasedSwap, owner } = await loadFixture(deployOrderBasedSwap);
      const tokenAddress = "0x..."; // Replace with the address of the token you want to withdraw
      const amount = 100;

      await orderBasedSwap.deposit(tokenAddress, amount, 0);
      await orderBasedSwap.withdraw(tokenAddress, amount);
      expect(
        await orderBasedSwap.tokenBalances(tokenAddress, owner.address)
      ).to.equal(0);
    });
  });
});
