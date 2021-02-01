const { default: Web3 } = require("web3");

let MyToken = artifacts.require('MyToken.sol');
let MyTokenSale = artifacts.require('MyTokenSale.sol');
let MyKyc = artifacts.require('KycContract')
require("dotenv").config({ path: "../.env" });

module.exports = async function(deployer) {
    let add = await web3.eth.getAccounts();
    await deployer.deploy(MyToken, process.env.INIT_TOKEN);
    await deployer.deploy(MyKyc);
    await deployer.deploy(MyTokenSale, 1, add[0], MyToken.address, MyTokenSale.address);
    let instance = await MyToken.deployed();
    await instance.transfer(MyTokenSale.address, process.env.INIT_TOKEN);



};
