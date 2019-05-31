var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});

            // TODO: mint multiple tokens
            this.contract.mint(account_two, 1, {from:account_one, gasLimit: "4600000"})
            .catch((err) => console.log(err));
            this.contract.mint(account_two, 2, {from:account_one, gasLimit: "4600000"})
            .catch((err) => console.log(err));
        })

        it('should return total supply', async function () { 
           let supply = await this.contract.totalSupply();
           assert.equal(supply, 2, "supply should be 2");
        })

        it('should get token balance', async function () { 
            let balance = await this.contract.balanceOf(account_two);
            assert.equal(balance, 2, "balance should be 2");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.tokenURI(1);
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Uri should be https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_two, account_one, 1, {from:account_two});
            let owner = await this.contract.ownerOf(1);
            assert.equal(owner, account_one, "Token should have been transferred to account_one");
        })
        
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let error = null;
            await this.contract.mint(account_two, 3, {from:account_two, gasLimit: "4600000"})
            .catch((err) => {
                error = err;
            })
            assert.notEqual(error, null, "It should throw an error when caller is not contract owner");
        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.owner();
            assert.equal(owner, account_one, "It should return contract owner");
        })

    });
})