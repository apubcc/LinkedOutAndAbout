import { useState } from "react";
//import type { NextPage } from "next";
import { useAccount, useBalance, useEnsAvatar, useEnsResolver, useEnsName } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal, MeetAttestation } from "../../../components";
import  FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";
import React from 'react'

function ensName() {
    //ts-ignore
      const { data, isError, isLoading } = ({
        name: 'awkweb.eth',
      })
     
      if (isLoading) return <div>Fetching resolver…</div>
      if (isError) return <div>Error fetching resolver</div>
      return <div>Resolver: {JSON.stringify(data)}</div>
    }

const Home = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    watch: true,
  });

  const { data: ensResolverData, loading: ensLoading } = useEnsResolver(accountData?.address);

  const displayAddressOrEns = () => {
    if (ensLoading) return "Resolving ENS...";
    // Assuming ensResolverData contains the ENS name; adjust if the structure is different
    const userId = ensResolverData?.ensName || accountData?.address || "Address not found";
    return (
      <div>
        <strong>User ID:</strong> {userId}
      </div>
    );
  };
  
  const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;


    if (balanceData) {
      return (
        <>
          <h1 className = "mb-0.8 text-4xl font-semibold text-gray-800">Profile Info:</h1> {/* Typography enhancement */}
          <div className = "grid place-items-center">
            <FrostedCard className = "shadow-lg bg-white bg-opacity-50 w-auto h-auto p-6 space-y-4"> {/* Added shadow and subtle background */}
              <div className = "flex items-center space-x-6 mb-4">
                {/* Pass ensResolverData.ensName and ensResolverData.ensAvatar to ProfileFrame */}
                <ProfileFrame
                  address={ensResolverData?.ensName || accountData?.address}
                  ensAvatar={ensResolverData?.ensAvatar} 
                  size={102} // Set the size for Jazzicon
                />
                <div className="text-lg text-gray-700">{displayAddressOrEns()}</div>
              </div>
              <p><strong>Details: </strong>details(tags suggestion)</p>
              <p><strong>Sector: </strong> Tech</p>
              <p><strong>Skills: </strong>skills(Community)</p>
              <p><strong>Languages: </strong>lang(HTML, CSS, Solidity)</p>
            </FrostedCard>
            <Button
              loading={false}
              onClick={() => MeetAttestation("metIRL", "0x66263b35bae43592b4A46F4Fca4D8613987610d4")}
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
        <Button
          loading={accountLoading}
          onClick={() => setShowWalletOptions(true)}
        >
          Connect to Wallet
        </Button>
      </>
    );
  };
  
  return (
    <>
      <WalletOptionsModal
        open={showWalletOptions}
        setOpen={setShowWalletOptions}
      />

      <Layout
        showWalletOptions={showWalletOptions}
        setShowWalletOptions={setShowWalletOptions}
      >
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
