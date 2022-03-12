import { ReactNode } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";

export enum Web3ContextStatus {
  NotAsked = "notAsked",
  WaitingForUser = "waitingForUser",
  Connecting = "connecting",
  Error = "error",
  WrongNetwork = "wrongNetwork",
  Connected = "connected",
}

export type Provider = WalletConnectProvider | Web3["givenProvider"];

export type ConnectedWeb3Context = {
  status: Web3ContextStatus;
  provider: Provider;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};

export type EVMWalletSelectorContextControllerProps = {
  children: ReactNode;
};
