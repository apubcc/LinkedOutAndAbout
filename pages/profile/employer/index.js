import { useState } from "react";
//import type { NextPage } from "next";
import { useAccount, useBalance, useEnsAvatar, useEnsResolver, useEnsName } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../../../components";
import  FrostedCard from "../../../components/FrostedCard";
import ProfileFrame from "../../../components/ProfileFrame";
import BackArrow from "../../../components/BackArrow"
import UserID from "../../../components/UserID";
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

  const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>
          <h1 className="mb-8 text-4xl font-bold">Profile Info:</h1>
          <BackArrow>Go Back</BackArrow>
          <div className="inline-flex place-items-center">
            <FrostedCard className="w-auto h-auto place-items-center">
              <ProfileFrame></ProfileFrame>
              <useEnsResolver></useEnsResolver>
              <h1 className="mb-8 text-3x1 font-bold">useEnsResolver</h1>
              <p>Sector: Tech</p>
              <p>Successful Hires:</p>
              <p>Looking for: Skills</p>
            </FrostedCard> 
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Employer Profile
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
