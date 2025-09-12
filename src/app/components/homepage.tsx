"use client";

import {
  Box,
  Button,
  Typography,
  Link,
  Stack,
  Grid,
  Container,
  Chip,
} from "@mui/material";
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
          <Image
            src={iconSrc}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
          />
        }
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          px: 2,
          py: 1.5,
          borderRadius: "12px",
          "&:hover": {
            bgcolor: theme.palette.action.hover,
            transform: "translateY(-2px)",
            transition: "transform 0.2s ease-in-out",
          },
        }}
      >
        <Stack sx={{ textAlign: "left" }}>
          <Typography
            variant="caption"
            sx={{ opacity: 0.7, lineHeight: 1 }}
          >
            {captionText}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", lineHeight: 1.2 }}
          >
            {storeName}
          </Typography>
        </Stack>
      </Button>
    </Link>
  );
};

const MiscStudioHero = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container
      id="home"
      maxWidth={false}
      disableGutters
      sx={{ bgcolor: theme.palette.background.default, overflowX: "hidden" }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, md: 6 },
          py: 8,
        }}
      >
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              textAlign: { xs: "center", md: "left" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: { xs: "center", md: "flex-start" },
              gap: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Chip label={t("misc_studio_chip")} color="primary" sx={{ mb: 2, fontWeight: "bold" }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Typography
                variant="h2"
                color="primary"
                gutterBottom
                sx={{ fontWeight: "bold", fontSize: { xs: "2.5rem", md: "3.5rem" } }}
              >
                {t("hero_title")}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ mb: 4, maxWidth: "500px" }}
              >
                {t("hero_subtitle")}
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { xs: "center", md: "flex-start" },
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <StoreButton
                  href="https://play.google.com/store/apps/dev?id=6515640368437909512"
                  iconSrc="/google-play.svg"
                  iconAlt={t("google_play_store")}
                  iconWidth={24}
                  iconHeight={24}
                  captionText={t("google_play_caption")}
                  storeName={t("google_play_store")}
                />
                <StoreButton
                  href="https://apps.apple.com/developer/..."
                  iconSrc="/Apple_logo_black.svg"
                  iconAlt={t("app_store_name")}
                  iconWidth={24}
                  iconHeight={28}
                  captionText={t("app_store_caption")}
                  storeName={t("app_store_name")}
                />
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              style={{ marginTop: "2rem" }}
            >
              <Typography variant="body2" color="text.secondary">
                {t("additional_platforms")}
              </Typography>
            </motion.div>
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              style={{ width: "100%", maxWidth: 600 }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: { xs: 300, md: 500 },
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: theme.shadows[10],
                }}
              >
                <Image
                  src="/image_home.png"
                  alt={t("image_alt")}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 600px) 100vw, 50vw"
                  priority
                />
              </Box>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MiscStudioHero;
