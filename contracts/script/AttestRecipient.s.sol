// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {AttestRecipient} from "../src/AttestRecipient.sol";
import {SectorResolver} from "../src/SectorResolver.sol";
import {IEAS} from "../src/interfaces/IEAS.sol";

contract Deploy is Script {
    //define EAS contract address for Arbitrum testnet
    address internal constant EAS = 0xaEF4103A04090071165F78D45D83A0C0782c2B2a;

    bytes32 internal constant POST_SALT =
        bytes32(abi.encode(0x4c4f264142545f4154535452435054)); // ~ "LO&ABT_ATSTRCPT"

    function run() external {
        // set up deployer
        uint256 privKey = vm.envUint("PRIVATE_KEY");
        address deployer = vm.rememberKey(privKey);
        // log deployer data
        console2.log("Deployer: ", deployer);
        console2.log("Deployer Nonce: ", vm.getNonce(deployer));

        vm.startBroadcast(deployer);

        // deploy AttestRecipient contract
        AttestRecipient attestRecipient = new AttestRecipient(EAS);

        vm.stopBroadcast();

        // log deployment data
        console2.log("Post Contract Address: ", address(attestRecipient));
    }
}
