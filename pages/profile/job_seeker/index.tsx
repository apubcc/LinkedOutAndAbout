import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader } from "../../../components";
import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry,
} from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const Web3 = require("web3");

const createOffChainAttestation = async () => {
  const EASContractAddress = "0x4200000000000000000000000000000000000021"; //address for optimism goerli

  // Initialize the sdk with the address of the EAS Schema contract address
  const eas = new EAS(EASContractAddress);

  //json provider
  const provider = new ethers.providers.JsonRpcProvider(
    "https://opt-goerli.g.alchemy.com/v2/20IgrnOFlY15J9YITfJulGKwAIw_jCjw"
  );

  //create signer
  const signer = new ethers.Wallet(
    process.env["NEXT_PUBLIC_PRIVATE_KEY"],
    provider
  );

  eas.connect(signer);

  // Initialize SchemaEncoder with the schema string
  const schemaEncoder = new SchemaEncoder("bool metIRL");
  const encodedData = schemaEncoder.encodeData([
    {
      name: "metIRL",
      type: "bool",
      value: true,
    },
  ]);

  const schemaUID =
    "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7";

  console.log("encoded data", encodedData);

  const functionSignature = Web3.eth.abi.encodeFunctionSignature(
    "attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))"
  );

  const params = Web3.eth.abi.encodeParameters(
    ["bytes32", "(address,uint64,bool,bytes32,bytes,uint256)"],
    [
      "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
      [
        "0x66263b35bae43592b4A46F4Fca4D8613987610d4",
        0,
        true,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        0,
      ],
    ]
  );

  const callData = functionSignature + params.slice(2); // slice to remove the '0x' from params

  console.log(callData);

  // const tx = await eas.attest({
  //   schema: schemaUID,
  //   data: {
  //     recipient: "0x66263b35bae43592b4A46F4Fca4D8613987610d4",
  //     expirationTime: 0,
  //     revocable: true, // Be aware that if your schema is not revocable, this MUST be false
  //     data: encodedData,
  //   },
  // });

  // const newAttestationUID = await tx.wait();

  // console.log("New attestation UID:", newAttestationUID);
};

const Home: NextPage = () => {
  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="card-style relative p-6 border rounded-lg shadow-lg bg-gray-100 max-w-md">
          <div className="absolute top-2 right-2">
            <button
              onClick={createOffChainAttestation}
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
