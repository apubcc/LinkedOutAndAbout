import React, { useState } from 'react';
import Image from "next/image";
//import type { NextPage } from "next";
import dynamic from "next/dynamic";

import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { Button, Layout, Loader } from "../../../components";
import  FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";

const Home = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { data: ensName, isError: ensNameError, isLoading: ensNameLoading } = useEnsName({
    address: address,
  });
  const { data: ensAvatar, isError: ensAvatarError, isLoading: ensAvatarloading } = useEnsAvatar({
    name: ensName,
  })

  const renderContent = () => {
    if (isConnecting) return <Loader size={8} />;
    if (isConnected) {
      return (
        <>
          <h1 className = "mb-0.8 text-4xl font-semibold text-gray-800">Profile Info:</h1> {/* Typography enhancement */}
          <div className = "grid place-items-center">
            <FrostedCard className = "shadow-lg bg-white bg-opacity-50 w-auto h-auto p-6 space-y-4"> {/* Added shadow and subtle background */}
              <div className = "grid place-items-center space-x-6 mb-4">
              {ensAvatar ? 
                <Image
                  src={ensAvatar}
                  alt="ENS Avatar"
                  width={100}
                  height={100}
                  objectFit="cover"
                  className="rounded-full"
                />
                :
                <Image
                  src="/images/placeholder.png"
                  alt="ENS Avatar"
                  width={100}
                  height={100}
                  objectFit="cover"
                  className="rounded-full"
                />
                }
                <div className="text-lg text-gray-700">
                  <div style={{ marginTop: '0.5rem' }}></div>
                  <p style={{ fontSize: '0.8rem' }}>
                    <strong>Level:</strong> attestationFormat
                  </p>
                </div>
              </div>
              <div style={{ marginBottom: '2.5rem' }}></div>
              {ensName ?
                <h1 className="text-2xl font-semibold text-gray-800">{ensName}</h1>
                :
                <h1 className="text-2xl font-semibold text-gray-800">{address}</h1>
              }
              <p><strong>Details: </strong>details(tags suggestion)</p>
              <p><strong>Sector: </strong> Tech</p>
              <p><strong>Skills: </strong>skills(Community)</p>
              <p><strong>Languages: </strong>lang(HTML, CSS, Solidity)</p>
            </FrostedCard>
            <Button
              loading={false}
              onClick={() => attest("metIRL", "0x66263b35bae43592b4A46F4Fca4D8613987610d4")}
            >
              Attest
            </Button>
      </div>
    </>
  );
}

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Job Seeker Profile
        </h1>
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

export default dynamic (() => Promise.resolve(Home), {ssr: false});