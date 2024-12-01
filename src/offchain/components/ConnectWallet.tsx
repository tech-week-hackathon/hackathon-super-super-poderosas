import {
  Box,
  Button,
  Flex,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Spinner,
} from "@chakra-ui/react";

import { Address, Blockfrost, Lucid, WalletApi } from "lucid-txpipe";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ConnectOptions } from "../pages/_app";
import { createUser, updateDB } from "@/dbRequest";

export type Account = { address?: string; rewardAddress?: string };

type ConnectProps = {
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  setLucidState: React.Dispatch<React.SetStateAction<Lucid | undefined>>;
  setAccountState: React.Dispatch<React.SetStateAction<Account | undefined>>;
  options: ConnectOptions;
};

export const ConnectWallet = ({
  setIsConnected,
  setLucidState,
  setAccountState,
  options,
}: ConnectProps) => {
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<WalletApi | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [lucid, setLucid] = useState<Lucid | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  const provider = new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0",
    options.apiKey,
  );

  const handleConnectClick = async (walletName: string) => {
    try {
      const lucid = await Lucid.new(provider, options.testnetNetwork);
      setLoading(true);
      const walletInitialAPI = getWalletInitialAPI(window, walletName);
      const walletInjectedFromBrowser = await walletInitialAPI.enable();
      if (!walletInjectedFromBrowser) {
        throw new Error("No wallet injected from browser");
      }
      lucid.selectWallet(walletInjectedFromBrowser);

      setLucid(lucid);
      setAddress(await lucid.wallet.address());
      setSelectedWallet(walletName);
    } catch (error) {
      console.error("Connection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    setAddress(null);
    setLucid(null);
    setButtonText("Connect");
    setSelectedWallet(null);
    setIsConnected(false);
  };

  useEffect(() => {
    if (address) {
      // updateDB("");
      createUser(address);
      const shortenedAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
      setButtonText(shortenedAddress);
    }
    if (lucid) {
      setLucidState(lucid);
      setAccountState({
        address: address!,
      });
      setIsConnected(!!address);
    }
  }, [address, lucid]);

  return (
    <MenuRoot>
      <MenuTrigger colorScheme="green" disabled={loading} asChild>
        <Box minWidth={"20"}>
          {loading ? (
            <Spinner size="sm" color={"pink"} />
          ) : selectedWallet ? (
            <Flex alignItems="center" gap={3}>
              <Image
                src={
                  selectedWallet == "eternl" ? "/eternl.jpg" : "/nami-logo.svg"
                }
                width={30}
                height={30}
                alt={selectedWallet == "eternl" ? "E" : "N"}
              />
              {buttonText}
            </Flex>
          ) : (
            <Button>{buttonText}</Button>
          )}
        </Box>
      </MenuTrigger>
      <MenuContent>
        {!selectedWallet ? (
          <>
            <MenuItem
              onClick={() => handleConnectClick("eternl")}
              value="Use Eternl"
            >
              Use Eternl
            </MenuItem>
            <MenuItem
              onClick={() => handleConnectClick("nami")}
              value="Use Nami"
            >
              Use Nami
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={handleDisconnect} value="Disconnect">
            Disconnect
          </MenuItem>
        )}
      </MenuContent>
    </MenuRoot>
  );
};

function getWalletInitialAPI(
  window: (Window & typeof globalThis) | null | undefined,
  walletName: string,
) {
  let _a;
  const walletInitialAPI =
    (_a = window === null || window === void 0 ? void 0 : window.cardano) ===
      null || _a === void 0
      ? void 0
      : _a[walletName];
  if (walletInitialAPI) {
    return walletInitialAPI;
  }
  throw new Error(`${walletName} extension not installed in your browser.`);
}
