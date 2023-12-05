// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0 <0.9.0;
//pragma experimental ABIEncoderV2;

contract Crowdfunding {
    struct Campaign {
        uint256 code;
        address payable creator;
        uint256 goalAmount;
        uint256 raisedAmount;
        uint256 deadline;
        bool isOpen;
    }

    struct Creator {
        uint numCampaign;
        Campaign[] campaigns;
    }

    mapping(address => Creator) private creactorCampaigns;
    mapping(uint256 => mapping(address => uint256)) private campaignContributions;
    mapping(uint256 => Campaign) private codeCampaign;
    address[] private creators;

    Campaign[] public campaigns; // Tableau de toutes les campagnes créées

    // Fonction pour démarrer une nouvelle campagne
    function startCampaign(uint256 _goalAmount, uint256 _deadline, uint256 _code) external returns (uint16){
        require(_goalAmount > 0, "Le montant cible doit etre superieur a zero");

        Campaign memory newCampaign = Campaign({
            code: _code,
            creator: payable(msg.sender),
            goalAmount: _goalAmount,
            raisedAmount: 0,
            deadline: block.timestamp + _deadline,
            isOpen: true
        });

        Creator storage creator = creactorCampaigns[msg.sender];

        if (creator.numCampaign == 0) {
            creators.push(msg.sender);
        }

        creator.campaigns.push(newCampaign);
        creator.numCampaign = creator.campaigns.length;

        campaigns.push(newCampaign);
        codeCampaign[_code] = newCampaign;
        return 200;
    }

    // Fonction pour contribuer à une campagne
    function contribute(uint256 _code) external payable {
        campaignContributions[_code][msg.sender] += msg.value;
        for(uint i = 0; i<campaigns.length; i++) {
            if (campaigns[i].code == _code) {
                campaigns[i].raisedAmount += msg.value;
                codeCampaign[_code].raisedAmount = campaigns[i].raisedAmount;
            }
        }
    }

    // Fonction pour vérifier l'état de financement d'une campagne
    function getCampaign(uint256 _code) public view returns (Campaign memory) {
        return codeCampaign[_code];
    }

    // Fonction pour retirer les fonds récoltés si la campagne a atteint son objectif
    function withdrawFunds(uint256 _code) external {
        for(uint i = 0; i<campaigns.length; i++) {
            if (campaigns[i].code == _code) {
                require(codeCampaign[_code].isOpen == false, "La campagne est toujours ouverte");
                require(codeCampaign[_code].creator == msg.sender, "Seul le createur peut retirer les fonds");

                require(codeCampaign[_code].raisedAmount >= codeCampaign[_code].goalAmount, "La campagne n'a pas atteint son objectif");

                uint256 amountToTransfer = codeCampaign[_code].raisedAmount;
                campaigns[i].raisedAmount = 0;
                codeCampaign[_code].raisedAmount = campaigns[i].raisedAmount;

                payable(msg.sender).transfer(amountToTransfer);
            }
        }
    }

    // Fonction pour fermer une campagne si la date limite est dépassée sans atteindre l'objectif
    function closeCampaign(uint256 _code) external {
        for(uint i = 0; i<campaigns.length; i++) {
            if (campaigns[i].code == _code) {
                campaigns[i].isOpen = false;
                codeCampaign[_code].isOpen = campaigns[i].isOpen;
            }
        }
    }

    function getCreatorCampaign(address _creator) public view returns (Creator memory) {
        Creator memory creat = creactorCampaigns[_creator];
        return creat;
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        return campaigns;
    }

    function getAllCreators() public view returns (address[] memory) {
        return creators;
    }

}