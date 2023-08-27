// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Post_V2} from "../src/Post_V2.sol";

contract Deploy is Script {
    address internal constant MAILBOX_ADDRESS =
        0xCC737a94FecaeC165AbCf12dED095BB13F037685;
    address internal constant INTERCHAIN_GAS_PAYMASTER_ADDRESS =
        0xF90cB82a76492614D07B82a7658917f3aC811Ac1;

    bytes32 internal constant POST_V2_SALT =
        bytes32(abi.encode(0x4c4f264142545f504f535433)); // ~ "LO&ABT_POST3"

    function run() external {
        // set up deployer
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.rememberKey(privKey);
        // log deployer data
        console2.log("Deployer: ", deployer);
        console2.log("Deployer Nonce: ", vm.getNonce(deployer));

        vm.startBroadcast(deployer);

        // deploy Post to a deterministic address via CREATE2
        Post_V2 postV2 = new Post_V2{salt: POST_V2_SALT}(
            INTERCHAIN_GAS_PAYMASTER_ADDRESS,
            MAILBOX_ADDRESS
        );

        //make a sample post
        postV2.createPost(
            "This is a sample post",
            block.timestamp,
            "Blockchain"
        );

        vm.stopBroadcast();

        // log deployment data
        console2.log("Post Contract Address: ", address(postV2));
    }
}
