import WalletConnectProvider from "@walletconnect/web3-provider";
import React, { useCallback, useMemo, useState } from "react";
import Web3Modal from "web3modal";
import { EVMWalletSelectorContext } from "./EVMWalletSelectorContext";
import { Provider, EVMWalletSelectorContextControllerProps, Web3ContextStatus } from "./EVMWalletSelectorContext.types";

export const EVMWalletSelectorContextController = ({ children }: EVMWalletSelectorContextControllerProps) => {
  const web3modal = useMemo(() => {
    if (typeof window !== "undefined") {
      //Should provider options come from props?
      return new Web3Modal({
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
            },
          },
        },
      });
    }
  }, []);

  const [provider, setProvider] = useState<Provider>({});
  const [status, setStatus] = useState<Web3ContextStatus>(() => {
    return web3modal?.cachedProvider ? Web3ContextStatus.Connecting : Web3ContextStatus.NotAsked;
  });

  const reset = useCallback(
    async (currentProvider: Provider) => {
      /*eslint no-underscore-dangle: ["error", { "allow": ["_web3Provider"] }]*/
      if (currentProvider?._web3Provider?.disconnect) {
        await currentProvider._web3Provider.disconnect();
      }

      if (currentProvider.close) {
        await currentProvider.close();
      }

      await web3modal?.clearCachedProvider();

      setStatus(Web3ContextStatus.NotAsked);
    },
    [setStatus, web3modal],
  );

  const connect = useCallback(async () => {
    try {
      if (status === Web3ContextStatus.Connected) {
        //Let know the user that is already connected?
        return;
      }

      const web3Provider = await web3modal?.connect();

      setProvider(web3Provider);
      setStatus(Web3ContextStatus.Connected);
    } catch (error) {
      web3modal?.clearCachedProvider();
      setStatus(Web3ContextStatus.Error);
    }
  }, [status, web3modal]);

  const disconnect = useCallback(async () => {
    try {
      if (status !== Web3ContextStatus.Connected) return;

      await reset(provider);
    } catch (error) {
      web3modal?.clearCachedProvider();
    }
  }, [status, provider, reset, web3modal]);

  return (
    <EVMWalletSelectorContext.Provider value={{ connect, disconnect, status, provider }}>
      {children}
    </EVMWalletSelectorContext.Provider>
  );
};
