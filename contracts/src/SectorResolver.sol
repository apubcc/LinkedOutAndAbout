// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

import {SchemaResolver} from "./SchemaResolver.sol";

import {IEAS, Attestation} from "./interfaces/IEAS.sol";

import {Post} from "./Post.sol";

/**
 * @title A sample schema resolver that checks whether the attestation is from a specific attester.
 */
contract AttesterResolver is SchemaResolver {
    Post public postContract;

    //connect the above contract to this contract

    constructor(IEAS eas, address postContractAddr) SchemaResolver(eas) {
        postContract = Post(postContractAddr);
    }

    function onAttest(
        Attestation calldata attestation,
        uint256 /*value*/
    ) internal view override returns (bool) {
        //replace with a way to check that the source sector is the same as the target sector contained in the NFT contract
        return true;
    }

    function onRevoke(
        Attestation calldata /*attestation*/,
        uint256 /*value*/
    ) internal pure override returns (bool) {
        return true;
    }
}
