import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import MyToken from "./contracts/MyToken.json";
import MyTokenSale from "./contracts/MyTokenSale.json";
import kycContract from "./contracts/kycContract.json";
import "./App.css";

class App extends Component {
    state = { loaded: false }; //defauly kyc address

    componentDidMount = async() => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            this.tokeninstance = new this.web3.eth.Contract(
                MyToken.abi,
                MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
            );

            this.tokenSaleinstance = new this.web3.eth.Contract(
                MyTokenSale.abi,
                MyTokenSale.networks[this.networkId] && MyTokenSale.networks[this.networkId].address,
            );

            this.kycContractInstance = new this.web3.eth.Contract(
                kycContract.abi,
                kycContract.networks[this.networkId] && kycContract.networks[this.networkId].address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ loaded: true });
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handlekycwhitelisting = async() => {
        await this.kycContractInstance.methods.setKycCompletedy(this.state.kycAddress).send({ from: this.accounts[0] });
        alert("KYC for" + this.state.kycAddress + "is completed")
    }

    render() {
        if (!this.state.loaded) {
            return <div > Loading Web3, accounts, and contract... < /div>;
        }
        return ( < div className = "App" >
            <
            h1 > Star Tokens Sale < /h1>  <
            p > Get Your Token Today < /p>  <
            h2 > Kyc Whitelisting < /h2> 
            Address to allow: < input type = "text"
            name = "kycaddress"
            value = { this.state.kycAddress }
            onChange = { this.handleInputChange }
            /> <
            button type = "button"
            onClick = { this.handlekycwhitelisting } > Add to Whitelist < /button> < /
            div >
        );
    }
}

export default App;
