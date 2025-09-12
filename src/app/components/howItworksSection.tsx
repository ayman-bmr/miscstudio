"use client";

// import { Box, Container, Grid, Typography } from '@mui/material';
import {Box, Container,Grid,Typography} from '@mui/material';
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next';
import DownloadIcon from '@mui/icons-material/Download';
import PersonalizeIcon from '@mui/icons-material/Person';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AnimatedStep from './animatedstep';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <DownloadIcon sx={{ fontSize: 40 }} />,
      title: t("download_app"),
      description: t("download_app_desc"),
      color: '#25CED1',
    },
    {
      icon: <PersonalizeIcon sx={{ fontSize: 40 }} />,
      title: t("create_profile"),
      description: t("create_profile_desc"),
      color: '#FF8A5B',
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 40 }} />,
      title: t("choose_stories"),
      description: t("choose_stories_desc"),
      color: '#EA526F',
    },
    {
      icon: <TrackChangesIcon sx={{ fontSize: 40 }} />,
      title: t("track_progress"),
      description: t("track_progress_desc"),
      color: '#25CED1',
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
      }}
      dir='auto'
    >
      <Container>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6 }}
          >
            {t("how_it_works")}
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <AnimatedStep 
              key={step.title} 
              step={step} 
              index={index}
              totalSteps={steps.length}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;