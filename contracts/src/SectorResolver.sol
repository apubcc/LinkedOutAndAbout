// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {SchemaResolver} from "./SchemaResolver.sol";

import {IEAS, Attestation} from "./interfaces/IEAS.sol";

import {Post} from "./Post.sol";

/**
 * @title A sample schema resolver that checks whether the attestation is from a specific attester.
 */
contract SectorResolver is SchemaResolver {
    Post public postContract;

    constructor(IEAS _eas, address _postContractAddr) SchemaResolver(_eas) {
        postContract = Post(_postContractAddr);
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal override returns (bool) {
        (uint256 postId, string memory attesterSector) = abi.decode(
            attestation.data,
            (uint256, string)
        );

        // get post sector from post contract
        string memory retrievedPostSector = postContract.getPostSector(postId);

        // compare post sector with attester sector. if true, call updateAttestCount function in post contract by passing postId and also return true
        if (
            keccak256(abi.encodePacked(retrievedPostSector)) ==
            keccak256(abi.encodePacked(attesterSector))
        ) {
            postContract.updateAttestCount(postId);
            return true;
        } else {
            return false;
        }
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
    }

    //change post contract address
    function updatePostContractAddress(address _postContractAddr) external {
        postContract = Post(_postContractAddr);
    }
}
