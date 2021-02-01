const TokenSale = artifacts.require("MyTokenSale");
const Token = artifacts.require("MyToken")
const chai = require('./setupcchai.js');
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({ path: "../.env" });


contract("TokenSale Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    it("it should not have any tokens in my deployerAccount", async() => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    })

   

})
