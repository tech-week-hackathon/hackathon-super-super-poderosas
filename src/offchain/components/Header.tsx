import Image from "next/image";
import { CardanoWallet } from "@meshsdk/react";
import { Button, Flex } from "@chakra-ui/react";
import FileSVG from "@/public/ssp.svg";

export const Header = () => {
  return (
    <header className="sticky top-0 z-10 box-border bg-black flex h-28 w-full flex-row items-center justify-between px-4 pb-4 pt-6 align-middle border-b-2 border-b-gray-300">
      <Flex direction="column" align="center">
        <Image src={FileSVG} alt="<3" width={50} />
        S.S.P
      </Flex>
      <Flex gap="5">
        <CardanoWallet />
        <Button variant="outline">Create MiniGov</Button>
      </Flex>
    </header>
  );
};
