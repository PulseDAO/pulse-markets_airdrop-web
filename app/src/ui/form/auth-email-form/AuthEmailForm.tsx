import clsx from "clsx";
import dynamic from "next/dynamic";

import { Form } from "../Form";
import { Card } from "../../card/Card";
import { Button } from "../../button/Button";

import styles from "./AuthEmailForm.module.scss";
import { AuthEmailFormProps } from "./AuthEmailForm.types";

export const AuthEmailForm: React.FC<AuthEmailFormProps> = ({ className, autoFocus }) => (
  <Form className={clsx(styles["auth-email-form"], className)}>
    <div className={styles["auth-email-form__inline-wrapper"]}>
      <div className={styles["auth-email-form__inline-wrapper--form"]}>
        <Form.TextInput
          autoFocus={autoFocus}
          label="Correo Electrónico"
          id="email"
          type="email"
          className={styles["auth-email-form__input"]}
        />
      </div>
      <div className={styles["auth-email-form__inline-wrapper--button"]}>
        <Button variant="outlined" fullWidth>
          Ingresar
        </Button>
      </div>
    </div>
  </Form>
);
