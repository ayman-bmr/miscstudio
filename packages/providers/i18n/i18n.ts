"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import your translation JSON files
import enTranslation from "./en/translation.json";
import arTranslation from "./ar/translation.json";
import enAuthTranslation from "./en/auth.json";
import arAuthTranslation from "./ar/auth.json";

// Define resources
const resources = {
  en: {
    translation: enTranslation,
    auth: enAuthTranslation,
  },
  ar: {
    translation: arTranslation,
    auth: arAuthTranslation,
  },
};

// Initialize i18next only once
if (!i18n.isInitialized) {
  // Use LanguageDetector only in the browser
  if (typeof window !== "undefined") {
    i18n.use(LanguageDetector);
  }

  i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",       // fallback language for SSR or missing keys
      lng: "en",               // default language for SSR
      defaultNS: "translation", 
      ns: ["translation", "auth"],

      // Only set detection options for browser
      detection:
        typeof window !== "undefined"
          ? {
              order: ["localStorage", "navigator", "htmlTag"],
              caches: ["localStorage"],
            }
          : undefined,

      interpolation: {
        escapeValue: false, // React already does escaping
      },
    });
}

// Sync language direction (ltr/rtl) and html lang attribute
i18n.on("languageChanged", (lng) => {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lng;
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  }
});

export default i18n;
