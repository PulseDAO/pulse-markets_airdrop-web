import { WalletConnection as NEARWalletConnection } from "near-api-js";
import { ReactNode } from "react";

export type WalletSelectorContextControllerProps = {
  children: ReactNode;
} & WalletSelectorContextType;

export enum WalletSelectorChain {
  near = "near",
}

export type WalletSelectorContextType = {
  address?: string | null;
  network?: string;
  balance: string;
  chain?: WalletSelectorChain;
  isConnected: boolean;
  onSetChain: (chain: WalletSelectorChain) => void;
  onClickConnect: () => void;
  context: {
    connection: NEARWalletConnection | undefined;
  };
};
