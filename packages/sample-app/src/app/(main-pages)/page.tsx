"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ContinueReading from "../components/ContinueReading";
import StoriesDay from "../components/StoriesDay";
import WelcomeUser from "./WelcomeUser";
import GreenBean from "../components/GreenBean";
import PrivateRoute from "@repo/providers/auth/components/PrivateRoute";

const HomePage = () => {
  const { t } = useTranslation();
  return (
    <PrivateRoute>
      <Stack>
        <GreenBean />
        <WelcomeUser />
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: "medium",
            px: 2,
            pb: 2,
          }}
        >
          {t("todays_stories")}
        </Typography>
        <StoriesDay />
        <Box sx={{ px: 2, mt: 2 }}>
          <ContinueReading />
        </Box>
      </Stack>
    </PrivateRoute>
  );
};

export default HomePage;
