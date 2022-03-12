import clsx from "clsx";
import { Button } from "../button/Button";

import styles from "./WalletSelector.module.scss";
import { WalletSelectorProps } from "./WalletSelector.types";
import { useEVMWalletSelectorContext } from "hooks/useEVMWalletSelectorContext/useEVMWalletSelectorContext";
import { Web3ContextStatus } from "context/evm-wallet-selector/EVMWalletSelectorContext.types";

export const WalletSelector: React.FC<WalletSelectorProps> = ({ className }) => {
  const { status, connect } = useEVMWalletSelectorContext();

  const handleOnConnectWalletClick = async () => {
    //Pending - add error handling logic
    await connect();
  };

  return (
    <div className={clsx(styles["wallet-selector"], className)}>
      <Button size="xs" variant="outlined" color="secondary" onClick={handleOnConnectWalletClick}>
        {status !== Web3ContextStatus.Connected ? "Connect Wallet" : ""}
      </Button>
    </div>
  );
};
