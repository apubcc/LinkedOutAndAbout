import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, arbitrumGoerli, avalancheFuji } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { infuraProvider } from "wagmi/providers/infura";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";

// Configure chains & providers with the Alchemy & infura provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, arbitrumGoerli, avalancheFuji],
  [
    alchemyProvider({ apiKey: "F9hACNJ_51OIVhWWxUKgdl5Qu6-EM8ZM" }),
    infuraProvider({ projectId: "3c331b01f7284899acacb6fcb21cf85b" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "LinkedOut",
  projectId: "f8001bbde7438d70814ffd4373f81cd6",
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
  );
}
