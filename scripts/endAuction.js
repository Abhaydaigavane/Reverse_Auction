const hre = require("hardhat");

async function main() {
  const [creator] = await hre.ethers.getSigners();
  const auctionAddress = "<Deployed_Auction_Address>";

  const ReverseAuction = await hre.ethers.getContractAt("ReverseAuction", auctionAddress);

  const tx = await ReverseAuction.connect(creator).endAuction();
  await tx.wait();

  console.log("Auction ended successfully!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
