"use client";

import { Box, Button, Typography, Link, Stack, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface StoreButtonProps {
  href: string;
  iconSrc: string;
  iconAlt: string;
  iconWidth: number;
  iconHeight: number;
  captionText: string;
  storeName: string;
}

export const StoreButton = ({
  href,
  iconSrc,
  iconAlt,
  iconWidth,
  iconHeight,
  captionText,
  storeName,
}: StoreButtonProps) => {
  const theme = useTheme();

  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" underline="none">
      <Button
        variant="contained"
        size="large"
        color="primary"
        startIcon={
          <Image src={iconSrc} alt={iconAlt} width={iconWidth} height={iconHeight} />
        }
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          px: 2,
          borderRadius: "12px",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
          },
        }}
      >
        <Stack sx={{ textAlign: "left" }}>
          <Typography variant="caption" display="block" sx={{ opacity: 0.7 }}>
            {captionText}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", lineHeight: "1.2" }}>
            {storeName}
          </Typography>
        </Stack>
      </Button>
    </Link>
  );
};

const AnimatedHeroContent = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Grid
      container
      spacing={4}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        bgcolor: theme.palette.background.default, // theme-aware background
      }}
    >
      {/* Text Section */}
      <Box
        sx={{
          flex: "1 1 400px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          px: 2,
          ml:5
        }}
      >
        <Typography
          component={motion.h1}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.2 }}
          variant="h2"
          color="primary"
          gutterBottom
        >
          {t("magical_stories_for_kids")}
        </Typography>

        <Typography
          component={motion.p}
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ delay: 0.4 }}
          variant="h5"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          {t("hero_description")}
        </Typography>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
            }}
          >
            <StoreButton
              href="https://play.google.com/store/apps/details?id=com.lazone.kidoStory"
              iconSrc="/google-play.svg"
              iconAlt="Play Store"
              iconWidth={24}
              iconHeight={24}
              captionText={t("get_it_play_store")}
              storeName={t("play_store")}
            />
            <StoreButton
              href="https://apps.apple.com/app/storytelling"
              iconSrc="/Apple_logo_black.svg"
              iconAlt="App Store"
              iconWidth={24}
              iconHeight={28}
              captionText={t("download_app_store")}
              storeName={t("app_store")}
            />
          </Box>
        </motion.div>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          flex: "1 1 400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ width: "100%", maxWidth: 500, height: "100%" }}
        >
          <Box sx={{ position: "relative", width: "100%", height: { xs: 300, md: 500 } }}>
            <Image
              src="/hero-illustration.png"
              alt="Children reading magical stories"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 600px) 100vw, 50vw"
              priority
            />
          </Box>
        </motion.div>
      </Box>
    </Grid>
  );
};

export default AnimatedHeroContent;
