// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.19;

// import { SchemaResolver } from "./SchemaResolver.sol";

// import { IEAS, Attestation } from "./IEAS.sol";

// import {nftPost} from  './nftPost.sol';

// /**
//  * @title A sample schema resolver that checks whether the attestation is from a specific attester.
//  */
// contract AttesterResolver is SchemaResolver {

//     nftPost public nftPostContract;

//     //connect the above contract to this contract


//     constructor(IEAS eas, address nftPostContractAddr) SchemaResolver(eas) {
//         nftPostContract = nftPost(nftPostContractAddr);
//     }

//     function onAttest(Attestation calldata attestation, uint256 /*value*/, string postSector, uint256 postId) internal view override returns (bool) {
//         //replace with a way to check that the source sector is the same as the target sector contained in the NFT contract
//         return nftPostContract.getTweet(postId)['postSector'] == postSector;
//     }

//     function onRevoke(Attestation calldata /*attestation*/, uint256 /*value*/) internal pure override returns (bool) {
//         return true;
//     }
// }