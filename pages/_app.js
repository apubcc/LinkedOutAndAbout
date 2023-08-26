import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import {mainnet, arbitrumGoerli, avalancheFuji } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

// Configure chains & providers with the Alchemy & infura provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrumGoerli, avalancheFuji],
  [alchemyProvider({ apiKey: 'WV-NUphenL-PYZXxYFeoLOz73EdWjPVU' }), 
    infuraProvider({ projectId: '688aab67fe3b42ed81a381edba65956e' }),
  publicProvider()],
);

const {connectors} = getDefaultWallets({
  appName: 'LinkedOut',
  projectId: 'f8001bbde7438d70814ffd4373f81cd6',
  chains,
});

const wagmiClient = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

