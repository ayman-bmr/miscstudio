"use client"

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import StarIcon from "@mui/icons-material/Star";
import { Box, Container, Grid, Typography } from "@mui/material";
//import AnimatedFeatureCard from "./AnimatedFeatureCard";
import AnimatedFeatureCard from "./animatedfuturedcard";
import { useTranslation } from 'react-i18next';

const FeaturesSection = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: <AutoStoriesIcon sx={{ fontSize: 50 }} />,
      title: t("interactive_stories"),
      description: t("interactive_stories_desc"),
    },
    {
      icon: <HeadphonesIcon sx={{ fontSize: 50 }} />,
      title: t("audio_narration"),
      description: t("audio_narration_desc"),
    },
    {
      icon: <StarIcon sx={{ fontSize: 50 }} />,
      title: t("personalized_content"),
      description: t("personalized_content_desc"),
    },
    {
      icon: <PersonalVideoIcon sx={{ fontSize: 50 }} />,
      title: t("visual_learning"),
      description: t("visual_learning_desc"),
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: "background.default",
      }}
    >
      <Container dir="auto">
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{ mb: 6,color: (theme) => theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary }}
        >
          {t("why_kids_love")}
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <AnimatedFeatureCard
              key={feature.title}
              feature={feature}
              index={index}
            />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
