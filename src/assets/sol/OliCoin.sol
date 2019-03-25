pragma solidity ^0.4.24;

import "./IERC20.sol";
import "./SafeMath.sol";

contract OliCoin is IERC20 {

using SafeMath for uint;
uint256 public totalTokenSupply;

/* custom functions stuff */
struct Producer {
  string owner;
  string deviceType;
  uint32 peakPowerPos;
  uint32 peakPowerNeg;
  uint32 latitude;
  uint32 longitude;
  uint32 voltageLevel;
  string location;
  string installDate;
}

struct EnergyProduction {
  uint enerTime;
  uint32 enerValue;
  uint blockNumber;
  bytes32 blockHash;
  uint txGasPrice;
}

struct ProducerTransaction {
  uint[] txTime;
  uint32[] txValue;
  uint[] blockNumber;
  bytes32[] blockHash;
  uint[] txGasPrice;
}

event ProducerRegistrationEvent (address pvAddr, string owner, string deviceType, uint32 peakPowerPos, uint32 peakPowerNeg, uint32 latitude, uint32 longitude, uint32 voltageLevel, string location, string installDate);
event EnergyProductionEvent (address oliAddr, uint256 eTime, uint32 enerAmount);
event ProducerTransactionEvent (address oliAddr, uint256 eTime, uint32 enerAmount, uint blockNumber, bytes32 blockHash, uint txGasPrice);
event TotalTokenSupplyEvent (uint256 totalTokens);
event TotalEnergyEvent (uint256 totalEnergy);

mapping (address => Producer) producers;
mapping (address => uint) accountIndexArray;
mapping (address => EnergyProduction) energyProductions;
mapping (address => uint) producerEnergyBalance;
mapping (address => ProducerTransaction) transactions;

address[] public producerAccountsList;
uint256 totalEnergyProduced;

constructor() public{
  producerAccountsList.push(0x0);
  totalTokenSupply = 1000000000;
}
/* transfer tokens function  */
  function transfer(address _to, uint256 _tokens) public returns (bool success) {
      /* check if sender has enough token to transfer */
      require(balances[msg.sender] >= _tokens && _tokens > 0);

      balances[msg.sender] = balances[msg.sender].sub(_tokens);
      balances[_to] = balances[_to].add(_tokens);

      emit Transfer(msg.sender, _to, _tokens);
      return true;
  }

  /* checking out the balances */
  function balanceOf(address _tokenOwner)public constant returns (uint256 _tokens) {
      return balances[_tokenOwner];
  }

  /* approve spender to spend tokens */
  function approve(address _spender, uint256 _tokens) public returns (bool success) {
      require(_tokens > 0
      && balances[msg.sender] > 0);

      allowances[msg.sender][_spender] = _tokens;
      emit Approval(msg.sender, _spender, _tokens);
      return true;
  }

  /* checking the amount of allowed tokens */
  function allowance(address _tokenOwner, address _spender) public constant returns (uint remaining) {
      return allowances[_tokenOwner][_spender];
  }

  /* spending allowed tokens on behalf of owner */
  function transferFrom(address _from, address _to, uint256 _tokens) public returns (bool success) {
      require(_tokens > 0
      && balances[_from] >= _tokens
      && allowances[_from][msg.sender] >= _tokens);

      balances[_from] = balances[_from].sub(_tokens);
      balances[_to] = balances[_to].add(_tokens);

      allowances[_from][msg.sender] = allowances[_from][msg.sender].sub(_tokens);
      emit Transfer(_from, _to, _tokens);
      return true;
  }

  /* custom functions */
  function setProducer(string _owner, string _deviceType, uint32 _peakPowerPos, uint32 _peakPowerNeg, uint32 _latitude, uint32 _longitude, uint32 _voltageLevel, string _location, string _installDate) public{
    if(!checkProducerRegistration(msg.sender)){
      // mapping address to index
      accountIndexArray[msg.sender] = producerAccountsList.length;
      producers[msg.sender] = Producer(_owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
      producerAccountsList.push(msg.sender);
      emit ProducerRegistrationEvent(msg.sender, _owner, _deviceType, _peakPowerPos, _peakPowerNeg, _latitude, _longitude, _voltageLevel, _location, _installDate);
    }

  }

  // check producer registration
  function checkProducerRegistration(address _producerAddress) public constant returns (bool) {
    if(_producerAddress != 0x0 && accountIndexArray[_producerAddress] > 0){
      return true;
    }
    return false;
  }

  // get registration details for individual producer
  function getProducerAccountDetails(address _producerAddress) public constant returns (string, string, uint32, string, uint32, uint32, string) {
    return (producers[_producerAddress].owner, producers[_producerAddress].deviceType, producers[_producerAddress].peakPowerPos, producers[_producerAddress].location, producers[_producerAddress].latitude, producers[_producerAddress].longitude, producers[_producerAddress].installDate);
  }

  // get producer accounts list
  function getProducerAccountsList() public constant returns (address[]) {
    return producerAccountsList;
  }

  /*
   * energy mapping setup
  */

  function setEnergyProduction(uint32 _energyValue) public {
    // check producer registration
    if(checkProducerRegistration(msg.sender)){
      energyProductions[msg.sender] = EnergyProduction(now, _energyValue, block.number, blockhash(block.number - 1), tx.gasprice);

      // energy balance
      producerEnergyBalance[msg.sender] = producerEnergyBalance[msg.sender].add(_energyValue);
      totalEnergyProduced = totalEnergyProduced.add(_energyValue);

      // producer transaction history
      transactions[msg.sender].txTime.push(now);
      transactions[msg.sender].txValue.push(_energyValue);
      transactions[msg.sender].blockNumber.push(block.number);
      transactions[msg.sender].blockHash.push(blockhash(block.number - 1));
      transactions[msg.sender].txGasPrice.push(tx.gasprice);

      emit ProducerTransactionEvent(msg.sender, now, _energyValue, block.number, blockhash(block.number - 1), tx.gasprice);
      emit EnergyProductionEvent(msg.sender, now, _energyValue);
      emit TotalEnergyEvent(totalEnergyProduced);
      // minting tokens
      mintToken(_energyValue);
    }
  }

  function getEnergyProduction() public constant returns (address, uint, uint32) {
        return (msg.sender, energyProductions[msg.sender].enerTime, energyProductions[msg.sender].enerValue);
    }

    // getting energy production details for individual accounts
    function getProducerEnergy(address _producerAccountAddress) public constant returns (address, uint[], uint32[], uint[], bytes32[], uint[]) {
        return (_producerAccountAddress, transactions[_producerAccountAddress].txTime, transactions[_producerAccountAddress].txValue, transactions[_producerAccountAddress].blockNumber, transactions[_producerAccountAddress].blockHash, transactions[_producerAccountAddress].txGasPrice);
    }

    // retrieving individula producer total amount of energy produced

    function getProducerEnergyBalance(address _proAccntAddr) public constant returns (uint) {
        return (producerEnergyBalance[_proAccntAddr]);
    }

  /* minting new coins */
  function mintToken(uint32 _energyValue) public {
    balances[msg.sender] = balances[msg.sender].add(_energyValue);
    totalTokenSupply = totalTokenSupply.sub(_energyValue);

    emit TotalTokenSupplyEvent(_energyValue);
  }

  function getTotalTokenSupply() public view returns (uint256) {
        return totalTokenSupply;
    }

}
