pragma solidity ^0.7.4;



contract kycContract {
  mapping(address => bool) allowed;
  address  owner;
  constructor() public{
     owner = msg.sender;
    }

   modifier onlyOwner() {

    require(owner == msg.sender ,"You are not allowed");
    _;
   }
  

   function setKycCompleted(address _add) public onlyOwner {
    allowed[_add ] = true;

   }
  function setKycRevoked(address _add)public onlyOwner  {
    allowed[_add] = false;
  }
  function KycCompleted(address _add) public view returns(bool){
     return allowed[_add];
  }
}
