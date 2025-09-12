"use client";
import { useEffect } from "react";
import Providers from "./Providers";
import StoryDetailModal from "./components/StoryDetailModal";
import { Box } from "@mui/material";
import i18n from "@repo/providers/i18n/i18n";
import { Capacitor } from "@capacitor/core";
import useOnlineStatus from "../utils/useOnlineStatus";
import OfflinePage from "./OfflinePage";
import { StaticImageData } from "next/image";

export default function RootLayout({
  offlineImage,
  children,
}: Readonly<{
  offlineImage: StaticImageData;
  children: React.ReactNode;
}>) {
  const platform = Capacitor.getPlatform();

  useEffect(() => {
    document.body.className = `platform-${platform}`;
  }, [platform]);

  const direction = i18n.language === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction]);

  const isOnline = useOnlineStatus();

  return (
    <html lang={i18n.language} dir={direction}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body>
        <Providers>
          <Box
            sx={{
              p: 0,
              bgcolor: "background.default",
            }}
            className="ios-padding"
          >
            {isOnline ? children : <OfflinePage offlineImage={offlineImage} />}
          </Box>
          <StoryDetailModal />
        </Providers>
      </body>
    </html>
  );
}
