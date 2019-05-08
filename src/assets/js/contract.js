// setting up the provider
const Web3 = require('web3');
const web3 = new Web3("ws://localhost:7546");
//const web3 = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:7546'));

// instance of energy production contract
const oliCoinContract = new web3.eth.Contract([{ "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_energyValue", "type": "uint32" }], "name": "mintToken", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_energyValue", "type": "uint32" }], "name": "setEnergyProduction", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_owner", "type": "string" }, { "name": "_deviceType", "type": "string" }, { "name": "_peakPowerPos", "type": "uint32" }, { "name": "_peakPowerNeg", "type": "uint32" }, { "name": "_latitude", "type": "uint32" }, { "name": "_longitude", "type": "uint32" }, { "name": "_voltageLevel", "type": "uint32" }, { "name": "_location", "type": "string" }, { "name": "_installDate", "type": "string" }], "name": "setProducer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "pvAddr", "type": "address" }, { "indexed": false, "name": "owner", "type": "string" }, { "indexed": false, "name": "deviceType", "type": "string" }, { "indexed": false, "name": "peakPowerPos", "type": "uint32" }, { "indexed": false, "name": "peakPowerNeg", "type": "uint32" }, { "indexed": false, "name": "latitude", "type": "uint32" }, { "indexed": false, "name": "longitude", "type": "uint32" }, { "indexed": false, "name": "voltageLevel", "type": "uint32" }, { "indexed": false, "name": "location", "type": "string" }, { "indexed": false, "name": "installDate", "type": "string" }], "name": "ProducerRegistrationEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oliAddr", "type": "address" }, { "indexed": false, "name": "eTime", "type": "uint256" }, { "indexed": false, "name": "enerAmount", "type": "uint32" }], "name": "EnergyProductionEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "totalMintedTokens", "type": "uint256" }], "name": "TotalMintedTokens", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "totalEnergy", "type": "uint256" }], "name": "TotalEnergyEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_tokenOwner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [{ "name": "_tokenOwner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "_tokens", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_producerAddress", "type": "address" }], "name": "checkProducerRegistration", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_producerAddress", "type": "address" }], "name": "getProducerAccountDetails", "outputs": [{ "name": "", "type": "string" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }, { "name": "", "type": "uint32" }, { "name": "", "type": "uint32" }, { "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getProducerAccountsList", "outputs": [{ "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "_proAccntAddr", "type": "address" }], "name": "getProducerEnergyBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "producerAccountsList", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalEnergyProduced", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalMintedCoins", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalTokenSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }], '0xf27c9ea22675b3d4497d3f019b8fd103c0160ea3');

export { oliCoinContract, web3 };
