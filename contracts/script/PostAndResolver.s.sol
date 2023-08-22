// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Post} from "../src/Post.sol";
import {SectorResolver} from "../src/SectorResolver.sol";
import {IEAS} from "../src/interfaces/IEAS.sol";

contract Deploy is Script {
    //define EAS contract address for Arbitrum testnet
    IEAS internal constant EAS =
        IEAS(0xaEF4103A04090071165F78D45D83A0C0782c2B2a);

    bytes32 internal constant POST_SALT =
        bytes32(abi.encode(0x4c4f264142545f504f5354)); // ~ "LO&ABT_POST"

    bytes32 internal constant SECTOR_RESOLVER_SALT =
        bytes32(abi.encode(0x4c4f264142545f53454352534c5652)); // ~ "LNKDOUT&ABT_SECRSLVR"

    function run() external {
        // set up deployer
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.rememberKey(privKey);
        // log deployer data
        console2.log("Deployer: ", deployer);
        console2.log("Deployer Nonce: ", vm.getNonce(deployer));

        vm.startBroadcast(deployer);

        // deploy Post to a deterministic address via CREATE2
        Post post = new Post();

        // deploy SectorResolver to a deterministic address via CREATE2
        SectorResolver sectorResolver = new SectorResolver(EAS, address(post));

        // update sector resolver address in post contract
        post.updateSectorResolverAddress(address(sectorResolver));

        vm.stopBroadcast();

        // log deployment data
        console2.log("Post Contract Address: ", address(post));
        console2.log(
            "Sector Resolver Contract Address: ",
            address(sectorResolver)
        );
    }
}
