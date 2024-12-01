import { Account } from "@/components/ConnectWallet";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Modal } from "@/components/Modal";
import { createMiniProp } from "@/contract/operations";
import { GovernanceActionId } from "@/contract/utils/types";
import {
  Button,
  ChakraProvider,
  defaultSystem,
  Input,
  Theme,
} from "@chakra-ui/react";
import { MeshProvider } from "@meshsdk/react";
import { Lucid } from "lucid-txpipe";
import type { AppProps } from "next/app";
import { createContext, useState } from "react";

type Networks = "Mainnet" | "Preprod" | "Preview";

export type ConnectOptions = {
  testnetNetwork: Networks;
  apiKey: string;
};

const options: ConnectOptions = {
  testnetNetwork: "Preprod",
  apiKey: "preprodKwwErGQi5UWRmgLnJcK1UBb6K5I4nrFz" ,
};

export const Context = createContext<{
  lucidState: Lucid | undefined
  setLucidState: React.Dispatch<React.SetStateAction<Lucid>> | undefined
  account: Account | undefined
  setAccountState: React.Dispatch<React.SetStateAction<Account>> | undefined
}>({
  lucidState: undefined,
  setLucidState: undefined,
  account: undefined,
  setAccountState: undefined
})

function App({ Component, pageProps}: AppProps) {
  const [lucidState, setLucidState] = useState<Lucid>();
  const onClick = (governanceActionId: GovernanceActionId) => {
    if (lucidState) {
      createMiniProp(lucidState, governanceActionId).then(
        (tx) => tx.sign().complete().then(
          (txSigned) => txSigned.submit().then(
            (hash) => console.log("transaction hash", hash))
        )
      )
    }
  }
  console.log("App -> options", options);
  return (
    <MeshProvider>
      <ChakraProvider value={defaultSystem}>
        <Theme appearance="dark" colorPalette="pink">
          <Header
            provider={options}
            setLucidState={setLucidState}
            extra={
              <>
                <Modal
                  title="Create your Mini Prop"
                  confirmText="Create"
                  start={
                    <Button px="4" py="2" borderRadius="md" variant={"outline"}>
                      Create MinProp
                    </Button>
                  }
                  >
                  <>
                    <Input placeholder="GovernanceActionId txHash" />
                    <Input placeholder="GovernanceActionId Index" />
                    <Button onClick={(
                      ) => onClick({txId: "372d688faa77e146798b581b322c0f2981a9023764736ade5d12e0e4e796af8c",
                        index:0
                    })}>
                      Create proposola
                      </ Button>
                    </>
                  </Modal>
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
              </>
            }
          />
          <Component {...pageProps} lucid={lucidState} />
          <Footer />
        </Theme>
      </ChakraProvider>
    </MeshProvider>
  );
}

export default App;
