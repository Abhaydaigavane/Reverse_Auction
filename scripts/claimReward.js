const hre = require("hardhat");

async function main() {
  const [winner] = await hre.ethers.getSigners();
  const auctionAddress = "<Deployed_Auction_Address>";

  const ReverseAuction = await hre.ethers.getContractAt("ReverseAuction", auctionAddress);

  const tx = await ReverseAuction.connect(winner).claimReward();
  await tx.wait();

  console.log("Reward claimed!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
