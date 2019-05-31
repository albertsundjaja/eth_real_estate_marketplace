const SquareVerifier = require('../eth-contracts/build/contracts/SquareVerifier.json');
const SolnSquareVerifier = require('../eth-contracts/build/contracts/SolnSquareVerifier.json');
const Config = require('./config.json');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "YOUR MNEMONIC";
const infuraUrl = "YOUR INFURA";
const fs = require('fs');

/* this is for local ganache */
//let config = Config['localhost'];
//let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));

/* this is for rinkeby */
let config = Config['rinkeby'];
const provider = new HDWalletProvider(mnemonic, infuraUrl);
let web3 = new Web3(provider);

let squareVerifier = new web3.eth.Contract(SquareVerifier.abi, config.verifierAddress);
let solnSquareVerifier = new web3.eth.Contract(SolnSquareVerifier.abi, config.appAddress);

/* Mint 10 tokens to contract owner */
web3.eth.getAccounts().then(async (accounts) => {
    for (var i = 0; i < 10; i++) {
        var idx = (i+1).toString();
        let rawdata = fs.readFileSync(__dirname + '/proof' + idx + '.json');  
        let proof = JSON.parse(rawdata);  

        await solnSquareVerifier.methods
        .addSolution(proof['proof']['a'], proof['proof']['b'], proof['proof']['c'], proof['inputs'],
        i)
        .send({from:accounts[0],gasLimit: "4600000"})
        .then((res) => {
            let tokenId = i;
            console.log('minting ' + tokenId.toString());
            solnSquareVerifier.methods.mint(accounts[0], tokenId)
            .send({from:accounts[0],gasLimit: "4600000"})
            .catch((err) => {
                console.log("error minting");
                console.log(err);
            })
            .then((result) => {
                console.log("success minting " + tokenId.toString());
            });
        })
        .catch((err) => {
            console.log("error adding solution");
            console.log(err);
        });
    }
});

/* this is for checking correct balance and owner 
* After running the script, comment out the above block, and uncomment below
*/
/*
web3.eth.getAccounts().then((accounts) => {
    console.log(accounts[0]);
    solnSquareVerifier.methods.ownerOf(1).call()
    .then((res) => {console.log(res)})
    .catch((err) => {
        console.log(err);
    });
    solnSquareVerifier.methods.balanceOf(accounts[0]).call()
    .then((res) => {console.log(res)})
    .catch((err) => {
        console.log(err);
    });;
});
*/
