"use strict";
const chai = require("chai");
const BN = web3.utils.BN;

const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);
const chaiAsPromised = require("chai-as-promised");
const { contracts_build_directory } = require("../truffle-config");
chai.use(chaiAsPromised);

module.exports = chai;
