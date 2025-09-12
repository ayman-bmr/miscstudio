import i18n from "i18next";
import { Preferences } from "@capacitor/preferences";
import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

const LANGUAGES_MAPPING: { [key: string]: string } = { en: "1", ar: "2" };

let currentLanguage: string;
const initCurrentLanguage = async () => {
  const capacitorLang = await Preferences.get({ key: "i18nextLng" });
  if (!capacitorLang.value) {
    currentLanguage =
      LANGUAGES_MAPPING[localStorage.getItem("i18nextLng") || "en"];
  } else {
    currentLanguage = LANGUAGES_MAPPING[capacitorLang.value];
  }
};
if (typeof window !== "undefined") {
  initCurrentLanguage();
}

export const useLanguage = () => {
  const [language, setLanguage] = useState<string>("");
  const handleLanguageChange = async (event: SelectChangeEvent<string>) => {
    const newLanguage = event.target.value;

    // Save to both Capacitor Preferences and localStorage
    try {
      await Preferences.set({
        key: "i18nextLng",
        value: newLanguage,
      });
    } catch {
      // Fallback for web
      localStorage.setItem("i18nextLng", newLanguage);
    }

    // Update state and i18n
    currentLanguage = LANGUAGES_MAPPING[newLanguage];
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  useEffect(() => {
    // Universal language loading method
    const loadLanguage = async () => {
      let storedLanguage;

      // Try Capacitor Preferences first (mobile)
      const capacitorLang = await Preferences.get({ key: "i18nextLng" });

      // Fallback to localStorage (web)
      if (!capacitorLang.value) {
        storedLanguage = localStorage.getItem("i18nextLng");
      } else {
        storedLanguage = capacitorLang.value;
      }
      if (storedLanguage) {
        setLanguage(storedLanguage);

        i18n.changeLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  return { language, handleLanguageChange };
};

export const getCurrentLanguage = () => {
  return currentLanguage;
};
