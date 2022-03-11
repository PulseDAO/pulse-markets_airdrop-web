import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { ToastContextController } from "context/toast/ToastContextController";
import { LocaleSelector } from "ui/locale-selector/LocaleSelector";

import { AppLayoutProps } from "./AppLayout.types";

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { t } = useTranslation("head");
  const { locale } = useRouter();

  useEffect(() => {
    // @todo set with a toggle button from navbar or footer
    document.body.dataset.theme = "light";
  }, []);

  return (
    <>
      <Head>
        <title>{t("head.og.title")}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&display=swap" rel="stylesheet" />
        <meta name="description" content={t("head.og.description")} />
        <meta property="og:title" content={t("head.og.title")} />
        <meta property="og:description" content={t("head.og.description")} />
        <meta property="og:image" content={`/shared/og-image_${locale}.png`} />
        <meta property="og:url" content="https://aufacicenta.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        <link rel="preload" href="/icons/icomoon.eot" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/icons/icomoon.svg" as="font" crossOrigin="" />
      </Head>
      <ToastContextController>
        <LocaleSelector>
          <div id="modal-root" />
          <main>{children}</main>
        </LocaleSelector>
      </ToastContextController>
    </>
  );
};
