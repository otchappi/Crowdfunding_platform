import Web3 from "web3";
import ContractABI from '../ContractABI.js';

// Initialisez Web3 avec votre fournisseur Ethereum (comme Metamask)
const web3 = new Web3("HTTP://127.0.0.1:7545");

// Adresse du contrat
const contractAddress = "0x48B847B14caD75679dDcb0CAf29A1439106EB22e";

// Instance du contrat
const CrowdfundingContract = new web3.eth.Contract(ContractABI, contractAddress);

export default CrowdfundingContract;
