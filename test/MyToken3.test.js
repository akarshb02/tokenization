const Token = artifacts.require("MyToken.sol");
const chai = require('./setupcchai.js');
const BN = web3.utils.BN;
const expect = chai.expect;
require("dotenv").config({ path: "../.env" });


contract("Token Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => { //call every Time when one of the test suite runs 
        this.myToken = await Token.new(process.env.INIT_TOKEN);
    })


    it("all token should be in my account", async() => {
        let instance = this.myToken;
        let total = await instance.totalSupply();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(total);
    })

    it("it is possible to send tokens betweeen accounts", async() => {
        const sendToken = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendToken)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendToken)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendToken)); /// +1 for failed test


    })


    it("is not possible to send more tokens then available in total", async() => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })
})
