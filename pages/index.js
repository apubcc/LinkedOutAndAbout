/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Button, Layout, Loader, WalletOptionsModal } from "../components";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from 'react'
import { useGLTF, useAnimations, PerspectiveCamera } from '@react-three/drei'
import { OrbitControls } from '@react-three/drei'
import { SSX } from '@spruceid/ssx';

const signInButtonHandler = async () => {
  const ssx = new SSX();
  const session = await ssx.signIn();
};

function EthLogo(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF('/scene.gltf');
  const { actions } = useAnimations(animations, group);

  //set for rotation
  const [rotation, setRotation] = React.useState(0);

  useFrame(() => {
    setRotation(oldRotation => oldRotation + 0.01);
  });

  return React.createElement(
    'group',
    {
      ref: group,
      ...props,
      dispose: null,
      rotation: [0, rotation, 0]
    },
    React.createElement(
      'group',
      { name: "Sketchfab_Scene" },
      React.createElement(
        'group',
        { name: "Sketchfab_model", rotation: [-Math.PI / 2, 0, 0], scale: 1.107 },
        React.createElement(
          'group',
          { name: "161ee2e266e94c7791940d78a5a83d04fbx", rotation: [Math.PI / 2, 0, 0], scale: 0.01 },
          React.createElement(
            'group',
            { name: "Object_2" },
            React.createElement(
              'group',
              { name: "RootNode" },
              React.createElement(
                'group',
                { name: "eth", rotation: [-Math.PI, -1.556, -Math.PI], scale: [1, 1, 1.145] },
                React.createElement(
                  'group',
                  { name: "Pyramid_3", position: [0.217, 73.807, 0.929], rotation: [0, Math.PI / 4, 0] },
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_3_lambert3_0", geometry: nodes.Pyramid_3_lambert3_0.geometry, material: materials.lambert3 }
                  ),
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_3_lambert4_0", geometry: nodes.Pyramid_3_lambert4_0.geometry, material: materials.lambert4 }
                  ),
                  React.createElement(
                    'mesh',
                    { name: "Pyramid_3_lambert2_0", geometry: nodes.Pyramid_3_lambert2_0.geometry, material: materials.lambert2 }
                  )
                ),
                React.createElement(
                  'group',
                  { name: "Pyramid_1", position: [-0.108, -36.302, 32.916], rotation: [-Math.PI / 2, 0, -Math.PI] },
                  React.createElement('group', { name: "transform1" })
                ),
                React.createElement(
                  'group',
                  { name: "Pyramid_2", position: [-0.108, -36.302, -33.845], rotation: [-Math.PI / 2, 0, 0] },
                  React.createElement('group', { name: "transform2" })
                )
              ),
              React.createElement(
                'group',
                { name: "Pyramid" },
                React.createElement(
                  'mesh',
                  { name: "Pyramid_Default_Material_0", geometry: nodes.Pyramid_Default_Material_0.geometry, material: materials.Default_Material }
                ),
                React.createElement(
                  'mesh',
                  { name: "Pyramid_lambert4_0", geometry: nodes.Pyramid_lambert4_0.geometry, material: materials.lambert4 }
                ),
                React.createElement(
                  'mesh',
                  { name: "Pyramid_lambert3_0", geometry: nodes.Pyramid_lambert3_0.geometry, material: materials.lambert3 }
                )
              )
            )
          )
        )
      )
    )
  );
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
    // if (balanceData) {
    //   return (
    //     <>
    //       <h1 className="mb-8 text-4xl font-bold">My Wallet</h1>
    //       <div className="inline-flex place-items-center">
    //         <h6 className="ml-2 text-2xl">{`Ξ ${Number(
    //           balanceData?.formatted
    //         ).toFixed(4)} ${balanceData?.symbol}`}</h6>
    //       </div>
    //     </>
    //   );
    // }

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
        <Button
          loading={accountLoading}
          onClick={() => signInButtonHandler(true)}
        >
          Sign-in With Ethereum
        </Button>
      </>
    );
  };

  return (
    <>
      <WalletOptionsModal open={showWalletOptions} setOpen={setShowWalletOptions} />

      <Layout showWalletOptions={showWalletOptions} setShowWalletOptions={setShowWalletOptions}>
        <div className="grid h-screen place-items-center">
          <div className="grid place-items-center">{renderContent()}</div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
