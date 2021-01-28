pragma solidity ^0.7.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20Detailed("Star", "CAPPU") {
        _mint(msg.sender, initialSupply);
    }
}
