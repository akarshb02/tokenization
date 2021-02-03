const path = require("path");
require("dotenv").config({ path: "./.env" });
const hdWallet = require("@truffle/hdwallet-provider");
const Mnemonic = "fruit analyst achieve resemble effort quick pull hip syrup shift despair divert"


const AccountIndex = 0;


module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, "client/src/contracts"),
    networks: {
        development: {
            port: 7545,
            host: "127.0.0.1",
            network_id: '*'

        },
        ganache_local: {
            provider: function() {
                return new hdWallet(Mnemonic, "http://127.0.0.1:7545", AccountIndex);
            },
            network_id: "*"

        },
        goerli_infura: {
            provider: function() {
                return new hdWallet(Mnemonic, "https://goerli.infura.io/ws/v3/2b35c4f10ba34623a7cb5f34d0c1283a", AccountIndex);
            },
            network_id: 3

        }



    },

    compilers: {
        solc: {
            version: "0.7.4"
        }
    },


};
