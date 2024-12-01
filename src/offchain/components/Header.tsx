import { ConnectOptions } from "@/pages/_app";
import FileSVG from "@/public/ssp.svg";
import { Box, Flex, Separator } from "@chakra-ui/react";
import Image from "next/image";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { Account, ConnectWallet } from "./ConnectWallet";
import { useLucidProvider } from "@/context";

export const Header = ({
  provider,
  extra,
  setIsConnected,
  setAccountState,
}: {
  provider: ConnectOptions;
  extra: ReactElement;
  setIsConnected: Dispatch<SetStateAction<boolean>>;
  setAccountState: Dispatch<SetStateAction<Account | undefined>>;
}) => {
  const { setLucidState } = useLucidProvider();
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
      bg="black"
      px="4"
      pb="4"
      pt="6"
    >
      <Flex direction="column" align="center">
        <Image src={FileSVG} alt="<3" width={50} />
        S.S.P
      </Flex>
      <Flex gap="6" align={"center"}>
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
        <Separator orientation="vertical" height="10" size="lg" />
        {extra}
      </Flex>
    </Box>
  );
};
