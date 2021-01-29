require("dotenv").config({ path: "../.env" });

var MyToken = artifacts.require("MyToken.sol");
let MyTokenSale = artifacts.require("MyTokenSale.sol");
require("dotenv").config({ path: "../.env" });


module.exports = async function(deployer) {
    let add = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.Initial_Tokens);
    let instance = await MyToken.deployed();
    await deployer.deploy(MyTokenSale, 1, add[1], MyToken.address);
    await instance.transfer(MyTokenSale.address, process.env.Initial_Tokens);

};
