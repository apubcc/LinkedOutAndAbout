import React, { useState } from "react";
import Image from "next/image";
//import type { NextPage } from "next";
import {
  useAccount,
  useEnsAvatar,
  useEnsName,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  Address,
} from "wagmi";
import { Button, Layout, Loader } from "../../../components";
import FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";
import { contractAddresses, schemas } from "../../../constants";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from "ethers";
import Popup from "reactjs-popup";

const getAttestData = async (chainId: number, action: any, type: any) => {
  if (chainId === 421613) {
    //schema encoder, build a string containing " type key"
    const schemaString = `${type} ${action}`;
    const schemaEncoder = new SchemaEncoder(schemaString);

    return schemaEncoder.encodeData([
      {
        name: action,
        type: type,
        value: true,
      },
    ]);
  }
  if (chainId === 43113) {
    // Your code for Post_V2 interchain call
    // Initialize SDK, create signer, etc.
    // ...
    // const tx = await contract.sendInterchainCall(
    //   destinationDomain,
    //   recipientAddress,
    //   ethers.utils.toUtf8Bytes(messageBody)
    // );
    // await tx.wait();
    // // Log or use the transaction hash
    // // ...
  }
};

export const Home = () => {
  const [recipientAddress, setRecipientAddress] = useState("");

  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const {
    data: ensName,
    isError: ensNameError,
    isLoading: ensNameLoading,
  } = useEnsName({
    address: address,
  });
  const {
    data: ensAvatar,
    isError: ensAvatarError,
    isLoading: ensAvatarloading,
  } = useEnsAvatar({
    name: ensName,
  });

  const { chain } = useNetwork();
  const chainId = chain?.id;

  const handleAttestClick = async (action, recipient) => {
    if (chainId === 421613) {
      const EASContractAddress =
        contractAddresses[chainId]?.EAS.contractAddress;
      const easABI = contractAddresses[chainId]?.EAS.abi;

      console.log("EASContractAddress", EASContractAddress);

      //json provider, hardcode for now
      const provider = new ethers.providers.JsonRpcProvider(
        "https://arb-goerli.g.alchemy.com/v2/WV-NUphenL-PYZXxYFeoLOz73EdWjPVU"
      );

      //create signer, hardcode for now
      const signer = new ethers.Wallet(
        process.env["NEXT_PUBLIC_PRIVATE_KEY"],
        provider
      );
      //do a popup to get the recipient address
      //do a popup to get the action

      // Initialize the sdk with the address of the EAS Schema contract address
      const eas = new EAS(EASContractAddress);

      eas.connect(signer);

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

      const tx = await eas.attest({
        schema: schemaUID,
        data: {
          recipient: recipient,
          expirationTime: 0,
          revocable: true, // Be aware that if your schema is not revocable, this MUST be false
          data: encodedData,
        },
      });
      console.log(tx.tx.hash);

      const newAttestationUID = await tx.wait();

      alert(`https://goerli.arbiscan.io/tx/${tx.tx.hash}`);
    }
  };

  if (chainId === 43113) {
    const postV2ContractAddress =
      contractAddresses[chainId]?.Post_V2.contractAddress;
    const postV2ABI = contractAddresses[chainId]?.Post_V2.abi;
    const attestReceipientContractAddress =
      contractAddresses[421613].AttestRecipient.contractAddress;
    console.log("postV2ContractAddress", postV2ContractAddress);
    console.log("postV2ABI", postV2ABI);

    const ABI = [
      "function attest((bytes32,(address,uint64,bool,bytes32,bytes,uint256)))",
    ];

    const iface = new ethers.utils.Interface(ABI);

    // You can simply use a hex string for bytes32 type
    const param1 =
      "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7";

    // Use an array for the inner tuple
    const param2 = [
      "0x07e96f02d57a1f0eace103028d0b26fd2d5f283e", // address
      ethers.BigNumber.from(0), // uint64
      true, // bool
      "0x0000000000000000000000000000000000000000000000000000000000000000", // bytes32
      ethers.utils.arrayify(
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ), // bytes
      ethers.BigNumber.from(0), // uint256
    ];

    const calldata = iface.encodeFunctionData("attest", [[param1, param2]]);
    console.log(`Calldata: ${calldata}`);

    const { data, write } = useContractWrite({
      address: postV2ContractAddress,
      abi: postV2ABI,
      functionName: "sendInterchainCall",
      args: [421613, attestReceipientContractAddress, calldata],
    });

    write();
  }

  const handleRecipientChange = (e) => {
    setRecipientAddress(e.target.value);
  };

  const renderContent = () => {
    if (isConnecting) return <Loader size={8} />;
    if (isConnected) {
      return (
        <>
          <h1 className="mb-0.8 text-4xl font-semibold text-gray-800">
            Profile Info:
          </h1>{" "}
          {/* Typography enhancement */}
          <div className="grid place-items-center">
            <FrostedCard className="shadow-lg bg-white bg-opacity-50 w-auto h-auto p-6 space-y-4">
              {" "}
              {/* Added shadow and subtle background */}
              <div className="grid place-items-center space-x-6 mb-4">
                {ensAvatar ? (
                  <Image
                    src={ensAvatar}
                    alt="ENS Avatar"
                    width={100}
                    height={100}
                    objectFit="cover"
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/placeholder.png"
                    alt="ENS Avatar"
                    width={100}
                    height={100}
                    objectFit="cover"
                    className="rounded-full"
                  />
                )}
                <div className="text-lg text-gray-700">
                  <div style={{ marginTop: "0.5rem" }}></div>
                  {/* <p style={{ fontSize: "0.8rem" }}>
                    <strong>Level:</strong> Novice
                  </p> */}
                </div>
              </div>
              <div style={{ marginBottom: "2.5rem" }}></div>
              {ensName ? (
                <h1 className="text-2xl font-semibold text-gray-800">
                  {ensName}
                </h1>
              ) : (
                <h1 className="text-2xl font-semibold text-gray-800">
                  {address}
                </h1>
              )}
              <p>
                <strong>Details: </strong> Avid coder
              </p>
              <p>
                <strong>Sector: </strong> Tech
              </p>
              <p>
                <strong>Skills: </strong>Community, Coding
              </p>
              <p>
                <strong>Languages: </strong>HTML, CSS, Solidity
              </p>
            </FrostedCard>
            <Button>
              <Popup
                trigger={<button> I met someone IRL!</button>}
                position="right center"
              >
                <div>
                  <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipientAddress}
                    onChange={handleRecipientChange}
                  />
                  <div>
                    <Button
                      loading={false}
                      onClick={() =>
                        handleAttestClick("metIRL", recipientAddress)
                      }
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Popup>
            </Button>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">Job Seeker Profile</h1>
      </>
    );
  };

  return (
    <>
      <Layout>
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
