// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract ReverseAuction {
    address public auctionCreator;
    uint public maxBidAmount;
    uint public numberOfWinners;
    uint public totalLockedAmount;

    struct Bid {
        address bidder;
        uint amount;
    }

    Bid[] public bids;
    mapping(address => uint) public rewards;

    bool public auctionEnded;

    constructor(uint _maxBidAmount, uint _numberOfWinners) payable {
        require(_maxBidAmount > 0, "Maximum bid amount must be greater than zero");
        require(_numberOfWinners > 0, "Number of winners must be greater than zero");
        require(msg.value == _maxBidAmount * _numberOfWinners, "Insufficient funds locked");

        auctionCreator = msg.sender;
        maxBidAmount = _maxBidAmount;
        numberOfWinners = _numberOfWinners;
        totalLockedAmount = msg.value;
    }

    function submitBid() external payable {
        require(!auctionEnded, "Auction has ended");
        require(msg.value > 0 && msg.value <= maxBidAmount, "Invalid bid amount");

        bids.push(Bid({bidder: msg.sender, amount: msg.value}));
    }

    function endAuction() external {
        require(msg.sender == auctionCreator, "Only the auction creator can end the auction");
        require(!auctionEnded, "Auction already ended");

        // Sort bids by amount (ascending)
        sortBids();

        uint rewardAmount = bids.length > 0 ? bids[0].amount : 0;
        uint winnersCount = 0;

        for (uint i = 0; i < bids.length && winnersCount < numberOfWinners; i++) {
            Bid memory bid = bids[i];
            rewards[bid.bidder] += rewardAmount;
            winnersCount++;
        }

        uint remainingFunds = totalLockedAmount - (rewardAmount * winnersCount);
        payable(auctionCreator).transfer(remainingFunds);
        auctionEnded = true;
    }

    function claimReward() external {
        require(auctionEnded, "Auction is not yet ended");
        uint reward = rewards[msg.sender];
        require(reward > 0, "No reward to claim");

        rewards[msg.sender] = 0;
        payable(msg.sender).transfer(reward);
    }

    function sortBids() internal {
        for (uint i = 0; i < bids.length; i++) {
            for (uint j = i + 1; j < bids.length; j++) {
                if (bids[i].amount > bids[j].amount) {
                    Bid memory temp = bids[i];
                    bids[i] = bids[j];
                    bids[j] = temp;
                }
            }
        }
    }

    function getBids() external view returns (Bid[] memory) {
        return bids;
    }
}
