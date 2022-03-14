import clsx from "clsx";

import styles from "./GenericLoader.module.scss";
import { GenericLoaderProps } from "./GenericLoader.types";

export const GenericLoader: React.FC<GenericLoaderProps> = ({ className }) => (
  <div className={clsx(styles["generic-loader"], className)}>
    <div className={clsx(styles["generic-loader__logo"], className)}>
      <h1>Pulse Logo</h1>
    </div>
  </div>
);
