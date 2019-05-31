# Real Estate Token

The purpose of this project is to create an ERC721 token which represent Real Estate that can be sold and listed in OpenSea.

## Installation

Clone this project

```
git clone https://github.com/albertsundjaja/eth_real_estate_marketplace.git
```

Go into the project folder, and install the dependency

```
npm install
```

### For deployment and testing in Ganache

Run Ganache on port `8545`

Go into the folder `eth-contracts`. Deploy the contract into Ganache

```
truffle migrate --reset
```

For minting, go to the `mint_script` folder
and uncomment this part in `mint.js`

```
//let config = Config['localhost'];
//let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));
```

and comment this part

```
let config = Config['rinkeby'];
const provider = new HDWalletProvider(mnemonic, infuraUrl);
let web3 = new Web3(provider);
```

Mint the first 10 tokens by running node

```
node mint.js
```

### Test the contracts 

```
truffle test ./test/TestERC721Mintable.js
truffle test ./test/TestSolnSquareVerifier.js
truffle test ./test/TestSquareVerifier.js
```

### For deployment in Rinkeby

Open `migrations/2_deploy_contracts.js` and fill out your Infura URL

```
rinkeby: {
    url:"YOUR INFURA",
    verifierAddress: SquareVerifier.address,
    appAddress: SolnSquareVerifier.address
}
```

Open `eth-contracts/truffle-config.js` and fill out your Infura and Mnemonic

```
const mnemonic = "YOUR MNEMONIC";
const infuraUrl = "YOUR INFURA";
```

Go to the main project folder and deploy it to Rinkeby and wait for deployment to finish

```
truffle migrate --reset --network rinkeby
```

To mint, first open `mint_script/mint.js`, and fill out your Infura Url and Mnemonic

```
const mnemonic = "YOUR MNEMONIC";
const infuraUrl = "YOUR INFURA";
```

make sure that relevant code blocks are commented and uncommented

```
/* this is for local ganache */
//let config = Config['localhost'];
//let web3 = new Web3(new Web3.providers.WebsocketProvider(config.url.replace('http', 'ws')));

/* this is for rinkeby */
let config = Config['rinkeby'];
const provider = new HDWalletProvider(mnemonic, infuraUrl);
let web3 = new Web3(provider);
```

run the script

```
node mint.js
```

## Contract Address and ABI

view it on Etherscan

```
https://rinkeby.etherscan.io/address/0x0467e44ea79F4125d417C67386EC9d471c23a21E
```

the abi is provided in this repo 

```
eth-contracts/build/contracts/SolnSquareVerifier.json
```

## OpenSea link

```
https://rinkeby.opensea.io/category/realestatetokenv4
```



## Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
