  // providers.tsx
  import { ReactQueryProvider } from "@repo/providers/react-query";
  import { MaterialUIProvider } from "@repo/providers/mui";
  import { I18nextProvider } from "react-i18next";
  import i18n from "@repo/providers/i18n/i18n";
  import { ModalProvider } from "./context/ModalContext";
  import { ThemeProvider } from "../../../providers/mui/ThemeContext"; 

  export default function Providers({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ReactQueryProvider>
        <I18nextProvider i18n={i18n}>
          
              
                {children}
              
        </I18nextProvider>
      </ReactQueryProvider>
    );
  }