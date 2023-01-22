// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./lib/GenesisUtils.sol";
import "./interfaces/ICircuitValidator.sol";
import "./verifiers/ZKPVerifier.sol";

contract Erc721Verifier is ERC721, ZKPVerifier {
    uint64 public constant TRANSFER_REQUEST_ID = 1;

    mapping(uint256 => address) public idToAddress;
    mapping(address => uint256) public addressToId;

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {}

    function _beforeProofSubmit(
        uint64, /* requestId */
        uint256[] memory inputs,
        ICircuitValidator validator
    ) internal view override {
        // check that challenge input of the proof is equal to the msg.sender
        address addr = GenesisUtils.int256ToAddress(
            inputs[validator.getChallengeInputIndex()]
        );
        require(
            _msgSender() == addr,
            "address in proof is not a sender address"
        );
    }
}
