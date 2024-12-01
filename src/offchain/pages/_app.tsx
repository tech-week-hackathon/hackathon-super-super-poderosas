import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import {
  Button,
  ChakraProvider,
  defaultSystem,
  Input,
  Theme,
} from "@chakra-ui/react";
import { MeshProvider } from "@meshsdk/react";
import type { AppProps } from "next/app";

type Networks = "Mainnet" | "Preprod" | "Preview";

export type ConnectOptions = {
  testnetNetwork: Networks;
  apiKey: string;
};

const options: ConnectOptions = {
  testnetNetwork: "Preprod",
  apiKey: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID || "",
};

function App({ Component, pageProps }: AppProps) {
  console.log("App -> options", options);
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>
        <Theme appearance="dark" colorPalette="pink">
          <Header
            provider={options}
            extra={
              <Modal
                title="Create your Organization"
                confirmText="Create"
                start={
                  <Button px="4" py="2" borderRadius="md" variant={"outline"}>
                    Create Organization
                  </Button>
                }
              >
                <Input placeholder="Organization Name" />
              </Modal>
            }
          />
          <Component {...pageProps} />
          <Footer />
        </Theme>
      </ChakraProvider>
    </MeshProvider>
  );
}

export default App;
