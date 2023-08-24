import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader } from "../../../components";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import { contractAddresses, schemas } from "../../../constants";

//Function to attest to a post verifying its validity
//values to submit are just the person who made the post, post ID and attester sector (all get automatically)
const attestPost = async (
  postId: number,
  postCreator: string,
  attesterSector: string
) => {
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

  //retreive the above schema from the constants file
  // const { schemaUID, type } = schemas[action];
  const schemaUID =
    "0xbeec0a4053367f404ae11d8025ed30e1e20716134289ed2f2680a4e9fa083a00";

  //schema encoder, build a string containing " type key"
  const schemaString = "uint256 postId, string attesterSector";
  const schemaEncoder = new SchemaEncoder(schemaString);

  const encodedData = schemaEncoder.encodeData([
    {
      name: "postId",
      type: "uint256",
      value: postId,
    },
    {
      name: "attesterSector",
      type: "string",
      value: attesterSector,
    },
  ]);

  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: postCreator,
      expirationTime: 0,
      revocable: true, // Be aware that if your schema is not revocable, this MUST be false
      data: encodedData,
    },
  });

  const newAttestationUID = await tx.wait();

  //if operation was metIRL or isTrue, explore using spruce to store the attestation UID in the recipient's spruce profile along with the operation

  console.log("New attestation UID:", newAttestationUID);
};

const Home: NextPage = () => {
  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="card-style relative p-6 border rounded-lg shadow-lg bg-gray-100 max-w-md">
          <div className="absolute top-2 right-2">
            <button
              onClick={() =>
                attestPost(
                  2,
                  "0x5FbDB2315678afecb367f032d93F642f64180aa3",
                  "Human Resource"
                )
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
