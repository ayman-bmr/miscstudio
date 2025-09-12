"use client";

import CodeIcon from "@mui/icons-material/Code";
import DevicesIcon from "@mui/icons-material/Devices";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import GroupsIcon from "@mui/icons-material/Groups";
import { Box, Container, Grid, Typography } from "@mui/material";
import AnimatedFeatureCard from "./animatedfuturedcard";
import { useTranslation } from "react-i18next";

const AboutUsSection = () => {
  const { t } = useTranslation();

  const aboutContent = [
    {
      icon: <CodeIcon sx={{ fontSize: 50 }} />,
      title: t("our_mission"),
      description: t("our_mission_desc"),
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 50 }} />,
      title: t("our_vision"),
      description: t("our_vision_desc"),
    },
    {
      icon: <RocketLaunchIcon sx={{ fontSize: 50 }} />,
      title: t("our_values"),
      description: t("our_values_desc"),
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 50 }} />,
      title: t("our_team"),
      description: t("our_team_desc"),
    },
  ];

  return (
    <Box
      id="about_us"
      component="section"
      sx={{
        py: 8,
        backgroundColor: "background.default",
      }}
    >
      <Container dir={t("direction") || "auto"}>
        <Typography
          variant="h2"
          component="h2"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            color: (theme) =>
              theme.palette.mode === "dark" ? "#fff" : theme.palette.text.primary,
          }}
        >
          {t("about_us")}
        </Typography>
        <Grid container spacing={4}>
          {aboutContent.map((item, index) => (
            <AnimatedFeatureCard key={item.title} feature={item} index={index} />
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
