import { ReactNode } from "react";

export type ThemeSelectorProps = {
  children?: ReactNode;
  className?: string;
};

export type ThemeState = {
  hasChanged: boolean;
  theme: "light" | "dark";
};
