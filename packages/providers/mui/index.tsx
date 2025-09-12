// @repo/providers/mui/index.tsx
"use client";


import React, { useEffect, useMemo, useState } from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import i18n from "../i18n/i18n";

export const MaterialUIProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [language, setLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  const isRTL = language === "ar";

  // Create RTL cache
  const rtlCache = useMemo(() => {
    return createCache({
      key: "muirtl",
      stylisPlugins: isRTL ? [rtlPlugin] : [],
    });
  }, [isRTL]);

  // Create LTR cache
  const ltrCache = useMemo(() => {
    return createCache({
      key: "mui",
      stylisPlugins: [],
    });
  }, []);

  return (
   
      <CacheProvider value={isRTL ? rtlCache : ltrCache}>
        {children}
      </CacheProvider>
   
  );
};