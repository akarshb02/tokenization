pragma solidity ^0.7.4;
import "./Crowdsale.sol";
import "./KycContract.sol";
contract MyTokenSale is Crowdsale {
    
    kycContract kyc;

    constructor(
        uint256 rate,    // rate in TKNbits
        address payable wallet,
        IERC20 token,
        kycContract _kyc
    )
       
        Crowdsale(rate, wallet, token)
        public
    {  
            kyc = _kyc;
    }
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view  override{
        super._preValidatePurchase(beneficiary,weiAmount);
        require(kyc.KycCompleted(msg.sender),"KYCNot completed,purchase not allowed");
    }
}
