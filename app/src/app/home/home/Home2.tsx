import clsx from "clsx";
import { useEffect, useState } from "react";

import { Grid } from "ui/grid/Grid";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { useEvmContract } from "hooks/useEVMContract/useEvmContract";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";

import styles from "./Home2.module.scss";
import { HomeProps } from "./Home.types";

export const Home2: React.FC<HomeProps> = ({ className }) => {
  const [contractData, setContractData] = useState<{ shares: string }>({
    shares: "0.00",
  });

  const contract = useEvmContract();
  const wallet = useWalletSelectorContext();

  useEffect(() => {
    if (!contract) {
      return;
    }

    (async () => {
      const shares = await contract.shares(wallet.address!);

      setContractData({ shares });
    })();
  }, [contract, wallet.address]);

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles.home, className)}>
        <section id="intro" className={clsx(styles.home__section, styles.home__intro)}>
          <div className={styles["home__intro--linear-gradient"]} />
          <Grid.Container>
            <Grid.Row>
              <Grid.Col lg={6}>{contractData.shares}</Grid.Col>
            </Grid.Row>
          </Grid.Container>
        </section>
      </div>
    </>
  );
};
