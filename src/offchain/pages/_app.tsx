import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import {
  Button,
  ChakraProvider,
  defaultSystem,
  Input,
  Theme,
  Flex,
} from "@chakra-ui/react";
import { MeshProvider } from "@meshsdk/react";
import type { AppProps } from "next/app";
import { useState } from "react";

import { Lucid } from "lucid-txpipe";
import { Account } from "../components/ConnectWallet";

type Networks = "Mainnet" | "Preprod" | "Preview";

export type ConnectOptions = {
  testnetNetwork: Networks;
  apiKey: string;
};

const options: ConnectOptions = {
  testnetNetwork: "Preprod",
  apiKey:
    process.env.NEXT_PUBLIC_BLOCKFROST_PROJECT_ID ||
    "preprodKwwErGQi5UWRmgLnJcK1UBb6K5I4nrFz",
};

function App({ Component, pageProps }: AppProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [lucidState, setLucidState] = useState<Lucid>();
  const [account, setAccountState] = useState<Account>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [policyId, setPolicyId] = useState("");
  const [tokenName, setTokenName] = useState("");

  const createMiniGov = async () => {
    setLoading(true);
    setError(null);

    if (!lucidState?.wallet.address()) {
      setError("Error connecting wallet");
      return;
    }
    const requestBody = {
      address: lucidState?.wallet.address(),
      name: name,
      // TODO: SOFI HACETE CARGO
      token: policyId + tokenName,
    };

    try {
      const response = await fetch("/api/createMiniGov", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error:", errorData.error);
        throw new Error(errorData.error || "Error creating MiniGov");
      }

      const data = await response.json();
      console.log("MiniGov creado:", JSON.parse(data.miniGov));
      alert(data.message);
    } catch (e: any) {
      console.error("Error:", e);
      setError(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>
        <Theme appearance="dark" colorPalette="pink">
          <Header
            provider={options}
            setAccountState={setAccountState}
            setIsConnected={setIsConnected}
            setLucidState={setLucidState}
            extra={
              <Modal
                title="Create your Organization"
                confirmText={loading ? "Creating..." : "Create MiniGov"}
                onClickFn={createMiniGov}
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
      </ChakraProvider>
    </MeshProvider>
  );
}

export default App;
