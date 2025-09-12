"use client";

import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
// import i18n from "../providers/i18n/i18n"; 
// import { ThemeProvider } from "../providers/mui/ThemeContext"; 
import i18n from "../../packages/providers/i18n/i18n";
import { ThemeProvider } from "../../packages/providers/mui/ThemeContext";
// import other providers here if needed, e.g., ReactQueryProvider, ModalProvider, etc.

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </ThemeProvider>
  );
}
