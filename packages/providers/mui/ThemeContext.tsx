"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { useMediaQuery, ThemeProvider as MUIThemeProvider } from "@mui/material";
import getTheme from "./theme"; // Import your theme function

export type ColorMode = "light" | "dark" | "system";

type ThemeContextType = {
  mode: ColorMode;
  effectiveMode: "light" | "dark";
  setMode: (mode: ColorMode) => void;
  isRTL: boolean;
  toggleDirection: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Use media query to detect system preference
  const systemTheme = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  // Safely retrieve the initial mode only on the client
  const getInitialMode = (): ColorMode => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("colorMode") as ColorMode | null;
      return savedMode || "system";
    }
    return "system"; // fallback on server
  };

  const [mode, setModeState] = useState<ColorMode>(getInitialMode());
  const [isRTL, setIsRTL] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const savedDirection = localStorage.getItem("direction") === "rtl";
      setIsRTL(savedDirection);
    }
  }, []);

  // effectiveMode returns system theme when mode is "system"
  const effectiveMode = mode === "system" ? systemTheme : mode;

  const setMode = (newMode: ColorMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("colorMode", newMode);
    }
  };

  const toggleDirection = () => {
    setIsRTL((prev) => {
      const newDirection = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("direction", newDirection ? "rtl" : "ltr");
      }
      return newDirection;
    });
  };

  // Create the MUI theme based on effectiveMode and RTL setting
  const theme = useMemo(() => {
    return getTheme({ isRTL, mode: effectiveMode });
  }, [isRTL, effectiveMode]);

  const value = useMemo(
    () => ({
      mode,
      effectiveMode,
      setMode,
      isRTL,
      toggleDirection,
    }),
    [mode, effectiveMode, isRTL]
  );

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <MUIThemeProvider theme={theme}>
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext);