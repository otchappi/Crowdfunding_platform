// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
pragma experimental ABIEncoderV2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Crowdfunding.sol";

contract TestCrowdfunding {
    Crowdfunding crowdfunding = Crowdfunding(DeployedAddresses.Crowdfunding());

    uint256 constant goalAmount = 100 ether; // Montant cible pour les tests
    uint256 constant deadline = 3600; // Durée d'une heure pour les tests (en secondes)

    function testStartCampaign() public {
        uint16 result = crowdfunding.startCampaign(goalAmount, deadline);

        Assert.equal(result, 200, "Le demarrage de la campagne devrait avoir l'index 0");
    }

    function testContribute() public {
        uint256 initialBalance = address(this).balance;

        crowdfunding.startCampaign(goalAmount, deadline);

        // Contribution à la campagne index 0 avec un montant de 50 ethers
        crowdfunding.contribute{value: 50 ether}(0);

        Assert.equal(address(this).balance, initialBalance - 50 ether, "Le solde devrait etre reduit apres la contribution");
    }

    function testWithdrawFunds() public {
        crowdfunding.startCampaign(goalAmount, deadline);

        // Contribution à la campagne index 0 avec un montant de 100 ethers
        crowdfunding.contribute{value: 100 ether}(0);

        uint256 initialContractBalance = address(crowdfunding).balance;

        crowdfunding.withdrawFunds(0);

        uint256 finalContractBalance = address(crowdfunding).balance;

        Assert.equal(finalContractBalance, initialContractBalance - 100 ether, "Le solde du contrat devrait etre reduit apres le retrait des fonds");
    }

    function testCloseCampaign() public {
        crowdfunding.startCampaign(goalAmount, deadline);

        // Contribution à la campagne index 0 avec un montant de 50 ethers
        crowdfunding.contribute{value: 50 ether}(0);

        crowdfunding.closeCampaign(0);

        Assert.isFalse(crowdfunding.getCampaign(0).isOpen, "La campagne devrait etre fermee apres la date limite");
    }
}
