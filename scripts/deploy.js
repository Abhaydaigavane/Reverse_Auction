const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  const ReverseAuction = await hre.ethers.getContractFactory("ReverseAuction");
  const maxBidAmount = ethers.parseEther("1");
  const numberOfWinners = 3;
  const initialFunds = maxBidAmount * BigInt(numberOfWinners);
  
  const reverseAuction = await ReverseAuction.deploy(
    maxBidAmount,
    numberOfWinners,
    { value: initialFunds }
  );

  await reverseAuction.waitForDeployment();
  console.log("ReverseAuction deployed to:", await reverseAuction.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
