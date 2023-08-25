import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader } from "../../../components";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { contractAddresses, schemas } from "../../../constants";
//import ethers
var Web3 = require("web3");

//Function to attest that you met a person IRL or verifying that you met a person IRL
//values to submit as parameters are "metIRL" or "isTrue" and the recipient's address
const attest = async (action: any, recipient: string) => {
  //get contract address based on detected chainId, hardcode for now
  const chainId = 421613;

  //access EAS contract address in constants file based on chainId
  const EASContractAddress = contractAddresses[chainId].EAS.contractAddress;

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  //json provider, hardcode for now
  const provider = new ethers.providers.JsonRpcProvider(
    "https://arb-goerli.g.alchemy.com/v2/WV-NUphenL-PYZXxYFeoLOz73EdWjPVU"
  );

  //create signer, hardcode for now
  const signer = new ethers.Wallet(
    process.env["NEXT_PUBLIC_PRIVATE_KEY"],
    provider
  );

  eas.connect(signer);

  //action should be "metIRL" or "isTrue"
  //retreive the above schema from the constants file
  const { schemaUID, type } = schemas[action];

  //schema encoder, build a string containing " type key"
  const schemaString = `${type} ${action}`;
  const schemaEncoder = new SchemaEncoder(schemaString);

  const encodedData = schemaEncoder.encodeData([
    {
      name: action,
      type: type,
      value: true,
    },
  ]);

  // const tx = await eas.attest({
  //   schema: schemaUID,
  //   data: {
  //     recipient: recipient,
  //     expirationTime: 0,
  //     revocable: true, // Be aware that if your schema is not revocable, this MUST be false
  //     data: encodedData,
  //   },
  // });

  // const newAttestationUID = await tx.wait();

  //if operation was metIRL or isTrue, explore using spruce to store the attestation UID in the recipient's spruce profile along with the operation

  // console.log("New attestation UID:", newAttestationUID);

  console.log(schemaUID, recipient, encodedData);
  // Define the ABI for the contract
  const ABI = [
    "function sendAttestToEAS((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))",
  ];

  const iface = new ethers.utils.Interface(ABI);

  // You can simply use a hex string for bytes32 type
  const param1 =
    "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7";

  // Use an array for the inner tuple
  const param2 = [
    "0x66263b35bae43592b4A46F4Fca4D8613987610d4", // address
    ethers.BigNumber.from(0), // uint64
    true, // bool
    "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32
    ethers.utils.arrayify(
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ), // bytes
    ethers.BigNumber.from(0), // uint256
  ];

  const calldata = iface.encodeFunctionData("sendAttestToEAS", [
    [param1, param2],
  ]);
  console.log(`Calldata: ${calldata}`);
};

//Function to fetch attesttion data from user's spruce profile, and see if they have met a person IRL or verified that they met a person IRL

const Home: NextPage = () => {
  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="card-style relative p-6 border rounded-lg shadow-lg bg-gray-100 max-w-md">
          <div className="absolute top-2 right-2">
            <button
              onClick={() =>
                attest("metIRL", "0x66263b35bae43592b4A46F4Fca4D8613987610d4")
              }
              className="bg-blue-500 p-2 rounded-full hover:bg-blue-600 focus:outline-none"
            >
              <img src="/path-to-plus-icon.svg" alt="Plus Icon" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
