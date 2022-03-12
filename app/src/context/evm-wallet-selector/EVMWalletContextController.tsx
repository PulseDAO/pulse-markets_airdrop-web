import React, { useCallback, useMemo, useState } from "react";
import Web3Modal from "web3modal";
import { EVMWalletSelectorContext } from "./EVMWalletSelectorContext";
import { Provider, EVMWalletSelectorContextControllerProps, Web3ContextStatus } from "./EVMWalletSelectorContext.types";

export const EVMWalletSelectorContextController = ({ children }: EVMWalletSelectorContextControllerProps) => {
  //Should provider options come from props?
  const web3modal = useMemo(() => new Web3Modal({ providerOptions: {} }), []);

  const [provider, setProvider] = useState<Provider>({});
  const [status, setStatus] = useState<Web3ContextStatus>(() => {
    return web3modal.cachedProvider ? Web3ContextStatus.Connecting : Web3ContextStatus.NotAsked;
  });

  const reset = useCallback(
    async (currentProvider: Provider) => {
      if (currentProvider._web3Provider && currentProvider._web3Provider.disconnet) {
        await provider?._web3Provider?.disconnect();
      }

      if (currentProvider.close) {
        await currentProvider.close();
      }

      await web3modal.clearCachedProvider();

      setStatus(Web3ContextStatus.NotAsked);
    },
    [setStatus],
  );

  const connect = useCallback(async () => {
    try {
      if (status === Web3ContextStatus.Connected) return;

      const web3Provider = await web3modal.connect();
      setProvider(web3Provider);
    } catch (error) {
      web3modal.clearCachedProvider();
      setStatus(Web3ContextStatus.Error);
    }
  }, [status, reset]);

  const disconnect = useCallback(async () => {
    try {
      if (status !== Web3ContextStatus.Connected) return;

      await reset(provider);
    } catch (error) {
      web3modal.clearCachedProvider();
    }
  }, [status, provider, reset]);

  return (
    <EVMWalletSelectorContext.Provider value={{ connect, disconnect, status, provider }}>
      {children}
    </EVMWalletSelectorContext.Provider>
  );
};
