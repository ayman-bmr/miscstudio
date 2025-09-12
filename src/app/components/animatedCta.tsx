'use client';

import { Box, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { StoreButton } from './bodyHikaya';

const AnimatedCta = () => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        sx={{
          p: { xs: 4, md: 8 },
          textAlign: 'center',
          borderRadius: 4,
          background: 'linear-gradient(135deg, #EA526F 0%, #25CED1 100%)', // bright-pink-crayola to robin-egg-blue
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, #FF8A5B 25%, transparent 25%)', // coral accent
            opacity: 0.1,
          }
        }}
        elevation={4}
      >
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'white', mb: 3 }}
        >
          {t("start_adventure")}
        </Typography>
        
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          {t("join_families")}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <StoreButton
              href="https://apps.apple.com/app/storytelling"
              iconSrc="/Apple_logo_black.svg"
              iconAlt="App Store"
              iconWidth={24}
              iconHeight={28}
              captionText={t("download_app_store")}
              storeName={t("app_store")}
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.div>
        </Box>

        <Typography variant="body1" sx={{ mt: 3, opacity: 0.8 }}>
          {t("available_devices")}
        </Typography>
      </Paper>
    </motion.div>
  );
};

export default AnimatedCta;