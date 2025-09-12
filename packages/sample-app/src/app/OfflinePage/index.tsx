import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

export default function OfflinePage({ offlineImage }: { offlineImage: StaticImageData }) {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{ minHeight: "100dvh", p: 4 }}
      alignItems="center"
      justifyContent="center"
      gap={4}
    >
      <Box
        sx={{
          position: 'relative', // Needed for fill prop
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          width: 300,
          aspectRatio: "1"
        }}
      >
        <Image
          src={offlineImage}
          alt="Offline"
          fill // width and height are 100%
          placeholder="blur"
          priority
        />
      </Box>
      <Stack gap={2} alignItems="center" justifyContent="center">
        <Typography variant="h4">{t("youAreOffline")}</Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {t("youAreOfflineDescription")}
        </Typography>
      </Stack>
    </Stack>
  );
}