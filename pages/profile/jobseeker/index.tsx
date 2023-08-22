import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance, useEnsAvatar } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal } from "../../../components";
import { useEnsResolver } from "wagmi";
import { fetchEnsName } from '@wagmi/core'
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

const ensName = await fetchEnsName({
  address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
})

const Home: NextPage = () => {
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
          <h1 className="mb-8 text-4xl font-bold">My Wallet</h1>
          <div className="inline-flex place-items-center">
            <h6 className="ml-2 text-2xl">{`Ξ ${Number(
              balanceData?.formatted
            ).toFixed(4)} ${balanceData?.symbol}`}</h6>
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
