import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import {
  Button,
  ChakraProvider,
  defaultSystem,
  Flex,
  Input,
  Theme,
} from "@chakra-ui/react";
import { MeshProvider } from "@meshsdk/react";
import type { AppProps } from "next/app";
import { useState } from "react";

import { LucidProvider, useLucidProvider } from "@/context";
import { createMiniGov } from "@/dbRequest";
import { useRouter } from "next/router";
import { Account } from "../components/ConnectWallet";

type Networks = "Mainnet" | "Preprod" | "Preview";

export type ConnectOptions = {
  testnetNetwork: Networks;
  apiKey: string;
};

const options: ConnectOptions = {
  testnetNetwork: "Preprod",
  apiKey: process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID as string,
};

function App({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(false);
  const { lucidState } = useLucidProvider();
  const [account, setAccountState] = useState<Account>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [tokenName, setTokenName] = useState("");

  const router = useRouter();
  const parseMiniGov = async () => {
    setLoading(true);
    setError(null);

    if (!lucidState?.wallet.address()) {
      setError("Error connecting wallet");
      return;
    }

    try {
      const address = await lucidState?.wallet.address();
      await createMiniGov(address, name, policyId + tokenName, 7);
    } catch (e: any) {
      console.error("Error:", e);
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
      router.push(`/org/${name}`);
    }
  };
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>
        <LucidProvider>
          <Theme appearance="dark" colorPalette="pink">
            <Header
              provider={options}
              setAccountState={setAccountState}
              setIsConnected={setIsConnected}
              extra={
                <Modal
                  title="Create your Organization"
                  confirmText={loading ? "Creating..." : "Create MiniGov"}
                  onClickFn={parseMiniGov}
                  start={
                    <Button px="4" py="2" borderRadius="md" variant={"outline"}>
                      Create Organization
                    </Button>
                  }
                  error={error}
                >
                  <Flex>
                    <Input
                      placeholder="Organization Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      placeholder="Token PolicyId"
                      value={policyId}
                      onChange={(e) => setPolicyId(e.target.value)}
                    />
                    <Input
                      placeholder="Token Name"
                      value={tokenName}
                      onChange={(e) => setTokenName(e.target.value)}
                    />
                  </Flex>
                </Modal>
              }
            />
            <Component {...pageProps} />
            <Footer />
          </Theme>
        </LucidProvider>
      </ChakraProvider>
    </MeshProvider>
  );
}

export default App;
