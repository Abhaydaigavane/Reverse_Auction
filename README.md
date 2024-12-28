Reverse Auction
Overview
This project implements a Reverse Auction smart contract using Solidity. In a reverse auction:

Participants compete to submit the lowest bids.
The creator sets a maximum bid amount (M) and the number of winners (N).
At the end of the auction, the N lowest bids are chosen as winners.
All winners are rewarded with the highest winning bid amount, and any remaining funds are returned to the auction creator.
This project uses Hardhat for contract development, deployment, and testing.

Features
Deploy a Reverse Auction with:
Maximum bid amount (M).
Number of winners (N).
Locked funds equal to N * M.
Accept bids from participants.
Automatically sort bids to select the N lowest bids.
Reward winners with the highest winning bid amount.
Return leftover funds to the auction creator.
Allow winners to claim their rewards.
Prerequisites
Make sure you have the following installed:

Node.js (v14 or later)
Hardhat
MetaMask (for testnets or mainnet interaction)
Test Ether (if deploying on a testnet)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Abhaydaigavane/Reverse_Auction.git
cd Reverse_Auction
Install dependencies:

bash
Copy code
npm install
Create an .env file to store sensitive data:

bash
Copy code
PRIVATE_KEY=your_private_key
ALCHEMY_API_URL=https://eth-goerli.alchemyapi.io/v2/your_alchemy_api_key
Usage
1. Compile the Contract
Run the following command to compile the Solidity contract:

bash
Copy code
npx hardhat compile
2. Deploy the Contract
To deploy the contract to a local blockchain (Hardhat Network):

bash
Copy code
npx hardhat run scripts/deploy.js --network localhost
To deploy on Goerli (or other testnets):

bash
Copy code
npx hardhat run scripts/deploy.js --network goerli
3. Interact with the Contract
Use the following scripts to interact with the deployed contract:

Submit a Bid
Run the submitBid.js script to submit a bid:

bash
Copy code
npx hardhat run scripts/submitBid.js --network localhost
End the Auction
Run the endAuction.js script to end the auction and calculate winners:

bash
Copy code
npx hardhat run scripts/endAuction.js --network localhost
Claim Rewards
Run the claimReward.js script to claim rewards for a winning bidder:

bash
Copy code
npx hardhat run scripts/claimReward.js --network localhost
4. Test the Contract
Run all tests to validate the functionality:

bash
Copy code
npx hardhat test
Folder Structure
plaintext
Copy code
Reverse_Auction/
│
├── contracts/
│   └── ReverseAuction.sol        # Smart contract
│
├── scripts/
│   ├── deploy.js                 # Script to deploy the contract
│   ├── submitBid.js              # Script to submit bids
│   ├── endAuction.js             # Script to end the auction
│   └── claimReward.js            # Script to claim rewards
│
├── test/
│   └── ReverseAuction.test.js    # Test cases for the contract
│
├── abi/
│   └── ReverseAuction.json       # ABI file for the contract
│
├── .env                          # Environment variables (private keys, RPC URLs)
├── hardhat.config.js             # Hardhat configuration file
├── package.json                  # Project dependencies
└── README.md                     # Documentation
Example Interaction
Deployment
Deploy the contract with:
Maximum bid amount = 1 ETH.
Number of winners = 3.
Locked funds = 3 ETH.
Output:

bash
Copy code
ReverseAuction deployed to: 0xYourContractAddress
Submitting Bids
Bidder 1 submits 0.8 ETH.
Bidder 2 submits 0.9 ETH.
Bidder 3 submits 0.7 ETH.
Ending the Auction
Winners: Bidder 3, Bidder 1, and Bidder 2.
Reward: All winners receive 0.9 ETH (the highest winning bid amount).
Remaining funds are returned to the creator.
Claiming Rewards
Each winner calls claimReward() to withdraw their rewards.
Deployment on a Testnet
Fund your wallet with test ETH from a faucet.
Update your .env file with your private key and Alchemy API URL.
Deploy the contract:
bash
Copy code
npx hardhat run scripts/deploy.js --network goerli
Notes
Ensure the auction creator has enough ETH to lock funds during deployment.
Use test accounts for testing; never expose mainnet private keys.
Add .env to .gitignore to avoid exposing sensitive data.
