import { useState } from "react";
//import type { NextPage } from "next";
import { useAccount, useBalance, useEnsAvatar, useEnsResolver, useEnsName } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../../../components";
import  FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";
import BackArrowButton from "../../../components/BackArrow";
import UserID from "../../../components/UserID";
import React from 'react'

function App() {
    //ts-ignore
      const { data, isError, isLoading } = useEnsResolver({
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

  const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>
          <h1 className="mb-8 text-4xl font-bold">Profile Info:</h1>
          <div className="inline-flex place-items-center">
            <FrostedCard className="w-auto h-auto place-items-center">
              <ProfileFrame></ProfileFrame>
              <h1 className="mb-8 text-3x1 font-bold">ENS NAME</h1>
              <p>Details:</p>
              <p>Sector: Tech</p>
              <p>Skills: HTML, CSS, TSX</p>
            </FrostedCard> 
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

  //back arrow button
  function App() {
    const handleBackClick = () => {
      // Handle going back or any other action
      console.log('Back button clicked');
    };
  
    return (
      <div className="relative h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Page Title</h1>
        <BackArrowButton onClick={handleBackClick} />
        {/* Other content */}
      </div>
    );
  }
  
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
