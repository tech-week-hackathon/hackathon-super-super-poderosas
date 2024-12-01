import { ConnectOptions } from "@/pages/_app";
import FileSVG from "@/public/ssp.svg";
import { Box, Flex, Separator } from "@chakra-ui/react";
import { Lucid } from "lucid-txpipe";
import Image from "next/image";
import { ReactElement, useState } from "react";
import { Account, ConnectWallet } from "./ConnectWallet";

export const Header = ({
  provider,
  extra,
}: {
  provider: ConnectOptions;
  extra: ReactElement;
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lucidState, setLucidState] = useState<Lucid>();
  const [account, setAccountState] = useState<Account>();

  console.log(isConnected, account, lucidState);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex="10"
      display="flex"
      h="28"
      w="full"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="2px"
      borderStyle="dashed"
      borderColor="gray.300"
      bg="gray.800"
      px="4"
      pb="4"
      pt="6"
    >
      <Flex direction="column" align="center">
        <Image src={FileSVG} alt="<3" width={50} />
        S.S.P
      </Flex>
      <Flex gap="5" align={"center"}>
        <Separator orientation="vertical" height="10" size="lg" />
        {provider.testnetNetwork && provider.apiKey ? (
          <ConnectWallet
            setIsConnected={setIsConnected}
            setLucidState={setLucidState}
            setAccountState={setAccountState}
            options={provider}
          />
        ) : (
          "Missing provider"
        )}
        {extra}
      </Flex>
    </Box>
  );
};
