import clsx from "clsx";
import { useEffect, useState } from "react";

import { Grid } from "ui/grid/Grid";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";
import { useEvmContract } from "hooks/useEVMContract/useEvmContract";
import { useWalletSelectorContext } from "hooks/useWalletSelectorContext/useWalletSelectorContext";
import { Button } from "ui/button/Button";
import { useToastContext } from "hooks/useToastContext/useToastContext";
import { Typography } from "ui/typography/Typography";
import { GenericLoader } from "ui/generic-loader/GenericLoader";
import { Icon } from "ui/icon/Icon";

import { HomeProps } from "./Home.types";
import styles from "./Home2.module.scss";

export const Home2: React.FC<HomeProps> = ({ className }) => {
  const [contractData, setContractData] = useState<{ shares: string }>({
    shares: "0.00",
  });
  const [loading, setLoading] = useState(false);

  const contract = useEvmContract();
  const wallet = useWalletSelectorContext();
  const toast = useToastContext();

  useEffect(() => {
    if (!contract) {
      return;
    }

    (async () => {
      const shares = await contract.shares(wallet.address!);

      contract.subscribeToPaymentReleasedOnce(wallet.address!, (error, event) => {
        if (!error && event) {
          setLoading(false);
          toast.trigger({
            title: "Transaction Completed",
            variant: "info",
            position: "top",
            children: <Typography.Text>The transaction was completed successfully</Typography.Text>,
          });
        }
      });

      setContractData({ shares });
    })();
  }, [contract, toast, wallet.address]);

  const handleOnClaimClick = async () => {
    try {
      if (!contract) return;

      setLoading(true);
      await contract.release(wallet.address!);
    } catch {
      setLoading(false);

      toast.trigger({
        title: "Error",
        variant: "error",
        position: "bottom",
        withTimeout: true,
        children: (
          <Typography.Text>
            Something went wrong while claiming your available Aurora ETH. Please try again.
          </Typography.Text>
        ),
      });
    }
  };

  const getClaimAction = () => {
    if (Number(contractData.shares)) {
      return (
        <Button variant="gradient" onClick={handleOnClaimClick}>
          Claim
        </Button>
      );
    }

    return (
      <div className={styles["home__no-claim"]}>
        <Icon className={styles["home__no-claim--warning"]} name="icon-warning" />
        <Typography.Headline3>Sorry</Typography.Headline3>
        <Typography.Text>
          Account {wallet.address}
          <br />
          has no available claim.
        </Typography.Text>
      </div>
    );
  };

  if (loading) {
    return <GenericLoader />;
  }

  return (
    <>
      <WalletSelectorNavbar />
      <div className={clsx(styles.home, className)}>
        <section id="intro" className={clsx(styles.home__intro)}>
          <div className={styles["home__intro--linear-gradient"]}>
            <div />
          </div>
          <div>
            <Grid.Container>
              <Grid.Row>
                <Grid.Col lg={6} offset={{ lg: 3 }}>
                  <div className={styles["home__intro--box"]}>
                    <Typography.Headline1 className={styles["home__intro--headline"]}>Airdrop</Typography.Headline1>
                    <Typography.Text>Claim Aurora ETH</Typography.Text>
                    {wallet.address && getClaimAction()}
                  </div>
                </Grid.Col>
              </Grid.Row>
            </Grid.Container>
          </div>
        </section>
      </div>
    </>
  );
};
