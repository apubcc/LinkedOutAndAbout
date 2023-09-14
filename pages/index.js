/* eslint-disable react/no-unknown-property */
import React, { Suspense, useEffect, useState } from "react";
import { useAccount, useBalance, useEnsName } from "wagmi";
import { Button, Layout, Loader } from "../components";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { SSX } from '@spruceid/ssx';
import EthLogo from '../components/EthLogo';

const signInButtonHandler = async () => {
  const ssx = new SSX();
  const session = await ssx.signIn();
  // store session into localstorage
  localStorage.setItem('session', JSON.stringify(session));
};

const SignOutButtonHandler = async () => {
  // remove session from localstorage
  localStorage.removeItem('session');
}

const Home = () => {
  const [userWallet, setUserWallet] = useState(null); 
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { balanceData, isError, isLoading } = useBalance({
    address: address,
  })

  const { data: ensName, isError: ensError, isLoading: ensLoading } = useEnsName({
    address: address,
  })

  async function signInOnClick() {
    await signInButtonHandler();
    
    var session2 = localStorage.getItem('session');
    if (session2) {
      setUserWallet(session2);
    }
  }

  function getWalletAddress(stringJson) {
    var obj = JSON.parse(stringJson);
    return obj.address;
  }

  function signOutOnClick() {
    SignOutButtonHandler();
    setUserWallet(null);
  }

  useEffect(() => {
    var session2 = localStorage.getItem('session');
    if (session2) {
      setUserWallet(session2);
    }
    // read localstorage session and set userWallet
  }, [userWallet]);

  // const loading = (accountLoading || balanceLoading) && !balanceData;

  const renderContent = () => {
    if (isLoading) return <Loader size={8} />;
    if (isConnected) {
      return (
        <>
          <div className="w-[350px] h-[350px]">
            <Canvas>
              <PerspectiveCamera position={[0, 0, 5]} makeDefault={true} />
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <EthLogo position={[0,-1,0]} scale={[1.25,1.25,1.25]}/>
                <OrbitControls target={[0,0,0]} enableZoom={false}/>
              </Suspense>
            </Canvas>
          </div>
  
          <h1 className="mb-8 text-4xl font-bold">
            Wallet Connected! Sign-in With Ethereum to Verify Your Identity
          </h1>

          { userWallet ? 
          <div className="flex items-center justify-between">
            { ensName ?
            <h2 className="mr-8 text-2xl font-semi-bold">Signed in as {ensName}</h2>
            :
            <h2 className="mr-8 text-2xl font-semi-bold">Signed in as { getWalletAddress(userWallet) }</h2>
            }
            <Button loading={isConnecting} onClick={() => signOutOnClick()}>
              Sign-out
            </Button>
            </div>
            :
            <Button loading={isConnecting} onClick={() => signInOnClick()}>
              Sign-in With Ethereum
            </Button>
          }
        </>
      );
    }

    return (
      <>
        <div className="w-[350px] h-[350px]">
          <Canvas>
            <PerspectiveCamera position={[0, 0, 5]} makeDefault={true} />
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />
              <EthLogo position={[0,-1,0]} scale={[1.25,1.25,1.25]}/>
              <OrbitControls target={[0,0,0]} enableZoom={false}/>
            </Suspense>
          </Canvas>
        </div>

        <h1 className="mb-8 text-4xl font-bold">
          Welcome to LinkedOutAndAbout!
        </h1>
        <h2 className="mb-8 text-2xl font-semi-bold">
          Connect Your Wallet to Get Started
        </h2>
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