pragma solidity >=0.4.21 <0.6.0;

import "./ERC721Mintable.sol";

// verifier interface
contract SquareVerifier {
    function verifyTx(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[2] memory input
        ) public returns (bool r) {}
}


contract SolnSquareVerifier is ERC721MintableComplete {

    SquareVerifier verifierContract;

    constructor(address verifierAddress) public {
        verifierContract = SquareVerifier(verifierAddress);
    }

    // Store the id of token and address that the token is minted to (i.e. the sender of the proof)
    struct Solution {
        uint256 tokenId;
        address to;
    }

    // a mapping of hash of solution to its detail
    mapping(bytes32 => Solution) private _solutionsSubmitted;

    // mapping of tokenId to the hash of its solution
    mapping(uint256 => bytes32) private _tokenHashes;

    // event emitted when a new solution is added
    event SolutionAdded(address to, uint256 tokenId);

    /**
    * @dev add solution to mapping so that we can check that a solution has been used
    * @param a solution part
    * @param b solution part
    * @param c solution part
    * @param input solution part
    * @param tokenId token that will be granted proof
    */
    function addSolution(uint[2] memory a,
                    uint[2][2] memory b,
                    uint[2] memory c,
                    uint[2] memory input, uint256 tokenId) public {

        // check for unique solution
        bytes32 solHash = keccak256(abi.encodePacked(a, b, c, input));
        require(_solutionsSubmitted[solHash].to == address(0), "Solution has been used");

        bool verified = verifierContract.verifyTx(a, b, c, input);
        require(verified, "Proof is unverified");

        // store to the mapping
        Solution memory sol = Solution(tokenId, msg.sender);
        _solutionsSubmitted[solHash] = sol;
        _tokenHashes[tokenId] = solHash;
        emit SolutionAdded(msg.sender, tokenId);
    }

    /**
    * @dev mint token after it has been proved
    * @param to address of the token given to
    * @param tokenId id of the token that has been proved
    */

    function mint(address to, uint256 tokenId) public onlyOwner returns (bool) {
        bytes32 solHash = _tokenHashes[tokenId];
        require(_solutionsSubmitted[solHash].to == to, "Solution has not been submitted, or the to address is wrong");

        super.mint(to, tokenId);
    }

}


























