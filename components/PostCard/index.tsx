import React from 'react';
import { useState } from 'react';

import { useContractRead, useContractWrite, useAccount, useNetwork } from "wagmi";
import { ethers } from 'ethers';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";

import { contractAddresses } from "../../constants";

import heartBlack from '../../public/images/heartBlack.svg';
import heartWhite from '../../public/images/heartWhite.svg';

export default function PostCard(props: {
    postNumber: number;
}) {
    const [showSuccessAttest, setShowSuccessAttest] = React.useState(false);
    const [attestTransactionLink, setAttestTransactionLink] = React.useState("");
    const [content, setContent] = React.useState({
        postAttestCount: BigInt(0),
        postContent: "",
        postCreator: "",
        postDate: BigInt(0),
        postSector: ""
    });

    const { chain } = useNetwork();

    var currentChainId = chain?.id;
  
    const postContractAddress = contractAddresses[currentChainId]?.Post.contractAddress;
    const postContractABI = contractAddresses[currentChainId]?.Post.abi;
  
    useContractRead({
        address: postContractAddress,
        abi: postContractABI,
        functionName: "getPost",
        args: [(props.postNumber)],
        onSuccess: (data) => {
          setContent(data)
        }
      });

    
    function getDateFromBigEpoc() {
        var date = new Date(0);
        date.setUTCSeconds(Number(content["postDate"]));
        var formattedDate = date.getDate() + " " + date.toLocaleString('default', { month: 'short' }) + " " + date.getFullYear();

        return formattedDate;
    }

    function getFullDateFromBigEpoc() {
        var date = new Date(0);
        date.setUTCSeconds(Number(content["postDate"]));
        
        return date;
    } 

    const {
    write: attestPost,
    } = useContractWrite({
    address: postContractAddress,
    abi: postContractABI,
    functionName: "updateAttestCount",
    args: [BigInt(props.postNumber)],
    onSuccess: () => {
        alert("Attested! EDIT ME!");
    },
    });

    async function clickMe() {
        const EASContractAddress = contractAddresses[currentChainId]?.EAS.contractAddress;
        const easABI = contractAddresses[currentChainId]?.EAS.abi;

        //json provider, hardcode for now
        const provider = new ethers.providers.JsonRpcProvider(
            "https://arb-goerli.g.alchemy.com/v2/WV-NUphenL-PYZXxYFeoLOz73EdWjPVU"
        );

        //create signer, hardcode for now
        const signer = new ethers.Wallet(
            process.env["NEXT_PUBLIC_PRIVATE_KEY"],
            provider
        );

        // Initialize the sdk with the address of the EAS Schema contract address
        const eas = new EAS(EASContractAddress);

        eas.connect(signer);

        //schema encoder, build a string containing " type key"
        const schemaString = `uint256 postId, string attesterSector`;
        const schemaEncoder = new SchemaEncoder(schemaString);

        const encodedData = schemaEncoder.encodeData([
            {
            name: "postId",
            type: "uint256",
            value: props.postNumber,
            },
            {
            name: "attesterSector",
            type: "string",
            value: "Blockchain",
            },
        ]);

        const tx = await eas.attest({
            schema: "0xbeec0a4053367f404ae11d8025ed30e1e20716134289ed2f2680a4e9fa083a00",
            data: {
            recipient: "0xe45d2776D7ff718Ee62DE28d23c16CcC0aE889a7",
            expirationTime: 0,
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
            },
        });

        const newAttestationUID = await tx.wait();

        setAttestTransactionLink(`https://goerli.arbiscan.io/tx/${tx.tx.hash}`)
        setShowSuccessAttest(true);
    }

    return (
        <>
            <div className="card bg-white/[0.3] p-10 rounded-xl snap-center shadow-sm">
                <div className="card-header mb-3 font-bold flex justify-between">
                    <div className="left">
                        <div className="card-username">{content["postCreator"]}</div>
                        <div className="card-sector text-xs">{content["postSector"]}</div>
                    </div>
                    <div className="right">
                        <div className="card-date" title={getFullDateFromBigEpoc().toString()}>{getDateFromBigEpoc()}</div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="card-content">
                        {content["postContent"]}
                    </div>
                </div>
                <div className="card-footer flex mt-5">
                    <div className="card-approveLove">
                        {/* <img className="w-[24px] hover:cursor-pointer" onClick={() => handleLoveClick()} src={isLoved ? heartBlack.src : heartWhite.src} alt="@" /> */}
                        <img className="w-[24px] hover:cursor-pointer" onClick={() => clickMe()} src={heartBlack.src} alt="@" />
                    </div>
                    <div className="card-approveLoveCount ml-1">{Number(content["postAttestCount"])}</div>
                </div>
            </div>
            {showSuccessAttest && (
                <div
                className="formCreate absolute h-screen w-screen top-0 left-0 flex items-center justify-center z-50"
                onClick={() => setShowSuccessAttest(false)}
                >
                    <div
                    onClick={(e) => e.stopPropagation()}
                    className="formCard flex flex-col px-[10%] py-3 bg-white/50 rounded-xl px-10 py-8"
                    >
                    <div className="formTitle text-2xl font-bold flex justify-center items-center">
                        Attest Success!
                    </div>
                    <div className="flex justify-around">
                        <button
                            onClick={() => window.open(attestTransactionLink, "_blank")}
                            className="formButtonSubmit mt-10 mr-5 px-8 py-3 text-lg rounded-xl duration-500 text-white font-bold bg-black hover:bg-black/80 hover:shadow-lg">
                            View on Arbiscan
                        </button>
                        <button
                            onClick={() => setShowSuccessAttest(false)}
                            className="formButtonSubmit mt-10 px-8 py-3 text-lg rounded-xl duration-500 text-white font-bold bg-black hover:bg-black/80 hover:shadow-lg">
                            Close
                        </button>
                    </div>
                </div>
                </div>
            )}
        </>
    )
}