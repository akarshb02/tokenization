// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
import "./DappToken.sol";
import "./DaiToken.sol";



contract MyToken  {
    
        string public name = "Dapp Token";
        DappToken public dappToken;
        DaiToken public daiTokens;
        address public owner;
        

            address[] public stakers;
            mapping(address=>uint) public stakingBalance;
            mapping(address=>bool) public hasStacked;
             mapping(address=>bool) public isStacking;

        constructor(DappToken _dapp,DaiToken _dai) public {
             dappToken = _dapp;
             daiTokens = _dai;
             owner = msg.sender;
       }

       //stakes Tokens(Deposit)

       function stakeToken(uint _amount) public {
             daiTokens.transferFrom(msg.sender,address(this),_amount);

             //updating

             stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

             

             //Add user tostakers array only if they haven't staked already

             if(!hasStacked[msg.sender]){
                   stakers.push(msg.sender);

             }
            //  update staking
            isStacking[msg.sender]=true;
             hasStacked[msg.sender] =  true;


       }
       function unstackeToken() public {
            uint balance =stakingBalance[msg.sender];

            require(balance > 0,"staking balance cannot be 0");
            daiTokens.transfer(msg.sender,balance);

            stakingBalance[msg.sender] = 0;

            isStacking[msg.sender] = false;
       }

       function issueToken() public {

             require(msg.sender == owner,"caller must be the owner");
             for(uint i=0;i<stakers.length;i++){

                   address recipient = stakers[i];
                   uint balance = stakingBalance[recipient];
                   if(balance >0){
                   dappToken.transfer(recipient,balance);
                   }
             }
       }
}


