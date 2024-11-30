import "../styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { CardanoWallet, MeshProvider } from "@meshsdk/react";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>
        <>
          <CardanoWallet />
          <Component {...pageProps} />
        </>
      </ChakraProvider>
    </MeshProvider>
  );
}

export default App;
