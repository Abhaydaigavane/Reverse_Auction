const hre = require("hardhat");

async function main() {
    // Get signers (default accounts provided by Hardhat)
    const [creator, bidder1, bidder2, bidder3] = await hre.ethers.getSigners();

    // Contract parameters
    const maxBidAmount = hre.ethers.utils.parseEther("1"); // 1 ETH max bid
    const numberOfWinners = 3; // 3 winners
    const lockedFunds = hre.ethers.utils.parseEther("3"); // N * maxBidAmount = 3 ETH

    // Deploy the contract
    console.log("Deploying the contract...");
    const ReverseAuction = await hre.ethers.getContractFactory("ReverseAuction");
    const reverseAuction = await ReverseAuction.deploy(maxBidAmount, numberOfWinners, {
        value: lockedFunds,
    });
    await reverseAuction.deployed();
    console.log(`Contract deployed at: ${reverseAuction.address}`);

    // Submit bids
    console.log("\nSubmitting bids...");
    const tx1 = await reverseAuction.connect(bidder1).submitBid({
        value: hre.ethers.utils.parseEther("0.8"),
    });
    await tx1.wait();
    console.log("Bidder 1 submitted a bid of 0.8 ETH.");

    const tx2 = await reverseAuction.connect(bidder2).submitBid({
        value: hre.ethers.utils.parseEther("0.9"),
    });
    await tx2.wait();
    console.log("Bidder 2 submitted a bid of 0.9 ETH.");

    const tx3 = await reverseAuction.connect(bidder3).submitBid({
        value: hre.ethers.utils.parseEther("0.7"),
    });
    await tx3.wait();
    console.log("Bidder 3 submitted a bid of 0.7 ETH.");

    // End the auction
    console.log("\nEnding the auction...");
    const endTx = await reverseAuction.connect(creator).endAuction();
    await endTx.wait();
    console.log("Auction ended successfully!");

    // Claim rewards
    console.log("\nClaiming rewards...");
    const claim1 = await reverseAuction.connect(bidder1).claimReward();
    await claim1.wait();
    console.log("Bidder 1 claimed their reward.");

    const claim2 = await reverseAuction.connect(bidder2).claimReward();
    await claim2.wait();
    console.log("Bidder 2 claimed their reward.");

    const claim3 = await reverseAuction.connect(bidder3).claimReward();
    await claim3.wait();
    console.log("Bidder 3 claimed their reward.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});