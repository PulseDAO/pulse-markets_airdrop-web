import { useContext } from "react";
import { EVMWalletSelectorContext } from "context/evm-wallet-selector/EVMWalletSelectorContext";

export const useEVMWalletSelectorContext = () => {
  const context = useContext(EVMWalletSelectorContext);

  if (context === undefined) {
    throw new Error("useEVMWalletSelectorContext must be used within a EVMWalletSelectorContext");
  }

  return context;
};
