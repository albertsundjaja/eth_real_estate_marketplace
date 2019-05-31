// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
const fs = require('fs');

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier)
    .then(() => {
        return deployer.deploy(SolnSquareVerifier, SquareVerifier.address).then(() => {
          let config = {
            localhost:{
              url:"http://localhost:8545",
              verifierAddress: SquareVerifier.address,
              appAddress: SolnSquareVerifier.address
            },
            rinkeby: {
                url:"YOUR INFURA",
                verifierAddress: SquareVerifier.address,
                appAddress: SolnSquareVerifier.address
            }
        }
        fs.writeFileSync(__dirname + '/../../mint_script/config.json',JSON.stringify(config, null, '\t'), 'utf-8');
        });
    });
};
