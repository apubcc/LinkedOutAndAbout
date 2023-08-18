import { useState } from "react";
import type { NextPage } from "next";
import { useAccount, useBalance } from "wagmi";
import { Button, Layout, Loader, WalletOptionsModal, Ethlogo } from "../../components";
import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

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
        <Canvas>
            <Stage environment="city" intensity={0.6} >
                <Ethlogo />
            </Stage>

            <OrbitControls enableZoom={false}/>
        </Canvas>

        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Welcome!
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
