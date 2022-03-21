import { useEffect, useState } from "react";

import { Button } from "ui/button/Button";
import { Icon } from "ui/icon/Icon";
import { useLocalStorage } from "hooks/useLocalStorage/useLocalStorage";

import { ThemeSelectorProps, ThemeState } from "./ThemeSelector.types";

export const ThemeSelector: React.FC<ThemeSelectorProps> = () => {
  const localStorage = useLocalStorage();
  const [userTheme, setUserTheme] = useState<ThemeState>({ hasChanged: false, theme: "dark" });

  useEffect(() => {
    const localTheme = localStorage.get<ThemeState["theme"] | undefined>("theme");

    if (!localTheme) {
      localStorage.set("theme", userTheme.theme);
      document.body.dataset.theme = userTheme.theme;

      return;
    }

    document.body.dataset.theme = localTheme;
    setUserTheme({ ...userTheme, theme: localTheme });
  }, []);

  useEffect(() => {
    if (userTheme.hasChanged) {
      document.body.dataset.theme = userTheme.theme;
      localStorage.set("theme", userTheme.theme);
      setUserTheme({ ...userTheme, hasChanged: false });
    }
  }, [userTheme]);

  const handleOnThemeChange = () => {
    setUserTheme((currentTheme) => ({ hasChanged: true, theme: currentTheme.theme === "dark" ? "light" : "dark" }));
  };

  return (
    <Button variant="gradient" color="secondary" onClick={handleOnThemeChange}>
      {userTheme.theme === "light" ? <Icon name="icon-moon" /> : <Icon name="icon-sun" />}
    </Button>
  );
};
