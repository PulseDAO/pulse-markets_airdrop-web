import { createContext } from "react";
import { ConnectedWeb3Context } from "./EVMWalletSelectorContext.types";

export const EVMWalletSelectorContext = createContext<ConnectedWeb3Context | undefined>(undefined);
