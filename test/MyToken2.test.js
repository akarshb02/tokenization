const Token = artifacts.require('MyToken');


const { expect } = require("chai");
var chai = require("chai");
const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
const { contracts_build_directory } = require("../truffle-config");
chai.use(chaiAsPromised);

const expact = chai.expect;



contract("Token Test", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.Initial_Tokens);
    })


    it("all tokens shouls be in my account", async() => {
        let instance = await Token.deployed()
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(account[0]);

        //assert.equal(balance.valueOf(), initialSupply.valueOf(), "this balance was not the same");

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("it is possible to send tokens between accounts", async() => {
        const sendTokens = 1;
        let instance = await Token.deployed();
        let totalSuppy = await instance.totalSupply();
        expact(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSuppy);
        expact(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expact(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSuppy.sub(new BN(sendTokens)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens)); //failed test by adding  +1
    });
    it("is not possible to send more tokens then available in total", async() => {
        let instance = await Token.deployed();
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 1))).to.eventually.be.rejected;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })
});
