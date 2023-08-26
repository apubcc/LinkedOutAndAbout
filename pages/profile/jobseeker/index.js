import React, { useState } from 'react';
//import type { NextPage } from "next";
import { useAccount, useBalance, useEnsAvatar, useEnsResolver, useEnsLookup } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../../../components";
import  FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";

const Home = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [{ data: accountData, loading: accountLoading }] = useAccount();
  
  const [{ data: balanceData, loading: balanceLoading }] = useBalance({
    addressOrName: accountData?.address,
    watch: true,
  });
  
  const [{ data, error, loading1 }] = useEnsLookup({
    address: accountData?.address
  });

  const renderEnsName = () => {
    if (loading1) return <div>Fetching name…</div>
    if (error || !data) return <div>Error fetching name</div>
    return <div>{data}</div>
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
                  // address={ensResolverData?.ensName || accountData?.address}
                  // ensAvatar={ensResolverData?.ensAvatar} 
                  size={102} // Set the size for Jazzicon
                />
                <div className="text-lg text-gray-700">
                  <div style={{ marginTop: '0.5rem' }}></div>
                  {/* call displayAddressOrEns */}
                  {renderEnsName()}
                  <p style={{ fontSize: '0.8rem' }}>
                    <strong>Level:</strong> attestationFormat
                  </p>
                </div>
              </div>
              <div style={{ marginBottom: '2.5rem' }}></div>
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
