import clsx from "clsx";

import { Grid } from "ui/grid/Grid";

import styles from "./Home2.module.scss";
import { HomeProps } from "./Home.types";
import { WalletSelectorNavbar } from "ui/wallet-selector-navbar/WalletSelectorNavbar";

export const Home2: React.FC<HomeProps> = ({ className }) => (
  <>
    <WalletSelectorNavbar />
    <div className={clsx(styles.home, className)}>
      <section id="intro" className={clsx(styles.home__section, styles.home__intro)}>
        <div className={styles["home__intro--linear-gradient"]} />
        <Grid.Container>
          <Grid.Row>
            <Grid.Col lg={6}>home</Grid.Col>
          </Grid.Row>
        </Grid.Container>
      </section>
    </div>
  </>
);
