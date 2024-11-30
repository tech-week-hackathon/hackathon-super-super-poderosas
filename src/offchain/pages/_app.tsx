import "../styles/globals.css";
import "@meshsdk/react/styles.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import { ChakraProvider, defaultSystem, Theme } from "@chakra-ui/react";
import { Header } from "@/components/Header";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={defaultSystem}>
      <MeshProvider>
        <Theme appearance="dark" colorPalette="pink">
          <Header />
          <Component {...pageProps} />
        </Theme>
      </MeshProvider>
    </ChakraProvider>
  );
}

export default App;
