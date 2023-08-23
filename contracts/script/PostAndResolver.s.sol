// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Post} from "../src/Post.sol";
import {SectorResolver} from "../src/SectorResolver.sol";
import {IEAS} from "../src/interfaces/IEAS.sol";
import {ISchemaRegistry} from "../src/interfaces/ISchemaRegistry.sol";
import {ISchemaResolver} from "../src/interfaces/ISchemaResolver.sol";

contract Deploy is Script {
    //define EAS contract address for Arbitrum testnet
    IEAS internal constant EAS =
        IEAS(0xaEF4103A04090071165F78D45D83A0C0782c2B2a);

    //define schema registry contract address for Arbitrum testnet
    ISchemaRegistry internal constant SCHEMA_REGISTRY =
        ISchemaRegistry(0x55D26f9ae0203EF95494AE4C170eD35f4Cf77797);

    bytes32 internal constant POST_SALT =
        bytes32(abi.encode(0x4c4f264142545f504f535433)); // ~ "LO&ABT_POST3"

    bytes32 internal constant SECTOR_RESOLVER_SALT =
        bytes32(abi.encode(0x4c4f264142545f53454352534c565234)); // ~ "LO&ABT_SECRSLVR4"

    function run() external {
        // set up deployer
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.rememberKey(privKey);
        // log deployer data
        console2.log("Deployer: ", deployer);
        console2.log("Deployer Nonce: ", vm.getNonce(deployer));

        vm.startBroadcast(deployer);

        // deploy Post to a deterministic address via CREATE2
        Post post = new Post{salt: POST_SALT}();

        //make a sample post
        post.createPost("This is a sample post", block.timestamp, "Blockchain");

        // deploy SectorResolver to a deterministic address via CREATE2
        SectorResolver sectorResolver = new SectorResolver{
            salt: SECTOR_RESOLVER_SALT
        }(EAS, address(post));

        // update sector resolver address in post contract
        post.updateSectorResolverAddress(address(sectorResolver));

        // register sector resolver in schema registry
        SCHEMA_REGISTRY.register(
            "uint256 postId, string attesterSector",
            ISchemaResolver(sectorResolver),
            true
        );

        vm.stopBroadcast();

        // log deployment data
        console2.log("Post Contract Address: ", address(post));
        console2.log(
            "Sector Resolver Contract Address: ",
            address(sectorResolver)
        );
    }
}
