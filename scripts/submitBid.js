const hre = require("hardhat");

async function main() {
  const [bidder] = await hre.ethers.getSigners();
  const auctionAddress = "<Deployed_Auction_Address>";

  const ReverseAuction = await hre.ethers.getContractAt("ReverseAuction", auctionAddress);

  const bidAmount = hre.ethers.utils.parseEther("0.8"); // Example: 0.8 ETH

  const tx = await ReverseAuction.connect(bidder).submitBid({ value: bidAmount });
  await tx.wait();

  console.log("Bid submitted!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
