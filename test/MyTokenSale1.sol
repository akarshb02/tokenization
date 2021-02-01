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
    });

    it("all tokens be in the TokenSale smart contract by default", async() => {
        let instance = await Token.deployed();
        let balanceofTokenSaleSmartContract = await instance.balanceOf(TokenSale.address);
        let total = await instance.totalSupply();
        return expect(balanceofTokenSaleSmartContract).to.eventually.be.a.bignumber.equal(total);
    })


    it("should be possible to buy tokens", async() => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        expect(tokenInstance.sendTransaction({ from: deployerAccount, value: web3.utils.toWei("1", "wei") })).to.be.fulfilled; //buy some tokens 
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(0)));
    })

})
